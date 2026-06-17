import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useBrandPalette } from './hooks/useBrandPalette';
import { useAssetUploads } from './hooks/useAssetUploads';
import { useGymName } from './hooks/useGymName';
import { downloadAndroidColorsKt } from './lib/exportAndroidColors';
import { delay, exportElementAsPng, waitForPaint } from './lib/exportCanvas';
import { downloadIosPaletteJson } from './lib/exportIosPalette';
import {
  EXPORT_OPTIONS,
  isScreenshotOption,
  type ExportOptionId,
  type ScreenshotExportOption,
} from './lib/exportOptions';
import {
  extractAccentColorFromDataUrl,
  pickBrandColorSource,
} from './lib/extractAccentColor';
import { deriveMaterialTheme } from './engine/materialThemeEngine';
import { applyMaterialThemeVars } from './engine/cssVars';
import { ControlPanel } from './components/ControlPanel';
import { ExportAllDialog } from './components/ExportAllDialog';
import { IPhoneFrame } from './components/IPhoneFrame';
import { AndroidFrame } from './components/AndroidFrame';
import {
  previewsForPlatform,
  renderPreviewScreen,
  resolvePreviewLabel,
  type PreviewContext,
} from './previewRegistry';
import type { Platform, PreviewMode } from './types';
import './styles.css';
import './android-screens.css';

export default function App() {
  const { primaryHex, setPrimaryHex, palette } = useBrandPalette();
  const { gymName, setGymName } = useGymName();
  const {
    assets,
    logoScale,
    setLogoScale,
    uploadLogo,
    uploadSplash,
    uploadAppIcon,
    clearLogo,
    clearSplash,
    clearAppIcon,
  } = useAssetUploads();
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light');
  const [platform, setPlatform] = useState<Platform>('ios');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exportingAll, setExportingAll] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  const materialTheme = useMemo(
    () => deriveMaterialTheme(primaryHex),
    [primaryHex],
  );

  useLayoutEffect(() => {
    applyMaterialThemeVars(materialTheme[previewMode]);
  }, [materialTheme, previewMode]);

  const previewContext = useMemo<PreviewContext>(
    () => ({
      mode: previewMode,
      assets: {
        logoDataUrl: assets.logoDataUrl,
        splashDataUrl: assets.splashDataUrl,
        appIconDataUrl: assets.appIconDataUrl,
      },
      logoScale,
      gymName,
    }),
    [previewMode, assets.logoDataUrl, assets.splashDataUrl, assets.appIconDataUrl, logoScale, gymName],
  );

  const previewEntries = useMemo(
    () => previewsForPlatform(platform),
    [platform],
  );

  const runSelectedExports = useCallback(async (selected: ExportOptionId[]) => {
    const node = canvasRef.current;
    if (!node || exportingAll || selected.length === 0) return;

    const selectedSet = new Set(selected);
    const screenshotVariants = EXPORT_OPTIONS.filter(
      (option): option is ScreenshotExportOption =>
        selectedSet.has(option.id) && isScreenshotOption(option),
    );
    const exportIosPalette = selectedSet.has('ios-palette');
    const exportAndroidColors = selectedSet.has('android-colors');

    const originalMode = previewMode;
    const originalPlatform = platform;

    setExportDialogOpen(false);
    setExportingAll(true);
    try {
      for (const variant of screenshotVariants) {
        flushSync(() => {
          setPreviewMode(variant.mode);
          setPlatform(variant.platform);
        });
        await waitForPaint();
        await exportElementAsPng(node, variant.filename);
        await delay(250);
      }

      if (exportIosPalette) {
        downloadIosPaletteJson(palette, gymName);
      }
      if (exportAndroidColors) {
        downloadAndroidColorsKt(materialTheme, gymName);
      }
    } catch (err) {
      console.error('Export all failed', err);
    } finally {
      if (screenshotVariants.length > 0) {
        flushSync(() => {
          setPreviewMode(originalMode);
          setPlatform(originalPlatform);
        });
      }
      setExportingAll(false);
    }
  }, [
    exportingAll,
    previewMode,
    platform,
    palette,
    gymName,
    materialTheme,
  ]);

  const runBrandColorExtraction = useCallback(async (dataUrl: string) => {
    try {
      const accent = await extractAccentColorFromDataUrl(dataUrl);
      if (accent) setPrimaryHex(accent);
    } catch (err) {
      console.warn('Could not extract accent color from uploaded asset', err);
    }
  }, [setPrimaryHex]);

  const handleExtractBrandColor = useCallback(async () => {
    const sourceDataUrl = pickBrandColorSource(
      assets.logoDataUrl,
      assets.appIconDataUrl,
    );
    if (!sourceDataUrl) return;
    await runBrandColorExtraction(sourceDataUrl);
  }, [assets.logoDataUrl, assets.appIconDataUrl, runBrandColorExtraction]);

  const handleLogoUpload = useCallback(async (file: File) => {
    const dataUrl = await uploadLogo(file);
    await runBrandColorExtraction(dataUrl);
  }, [uploadLogo, runBrandColorExtraction]);

  const handleSplashUpload = useCallback(async (file: File) => {
    await uploadSplash(file);
  }, [uploadSplash]);

  const handleAppIconUpload = useCallback(async (file: File) => {
    const dataUrl = await uploadAppIcon(file);
    await runBrandColorExtraction(dataUrl);
  }, [uploadAppIcon, runBrandColorExtraction]);

  const Frame = platform === 'ios' ? IPhoneFrame : AndroidFrame;
  const platformLabel = platform === 'ios' ? 'iOS previews' : 'Android previews';

  return (
    <div className={`app-layout${sidebarOpen ? '' : ' app-layout--sidebar-collapsed'}`}>
      <div className="control-panel-shell">
        <ControlPanel
          gymName={gymName}
          onGymNameChange={setGymName}
          primaryHex={primaryHex}
          onPrimaryChange={setPrimaryHex}
          palette={palette}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
          platform={platform}
          onPlatformChange={setPlatform}
          logoDataUrl={assets.logoDataUrl}
          logoScale={logoScale}
          onLogoScaleChange={setLogoScale}
          splashDataUrl={assets.splashDataUrl}
          appIconDataUrl={assets.appIconDataUrl}
          onLogoUpload={handleLogoUpload}
          onSplashUpload={handleSplashUpload}
          onAppIconUpload={handleAppIconUpload}
          onLogoClear={clearLogo}
          onSplashClear={clearSplash}
          onAppIconClear={clearAppIcon}
          onExtractBrandColor={handleExtractBrandColor}
          materialTheme={materialTheme}
        />
        <button
          type="button"
          className="control-panel-shell__toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-expanded={sidebarOpen}
          aria-label={sidebarOpen ? 'Hide controls' : 'Show controls'}
        >
          <span className="control-panel-shell__toggle-icon" aria-hidden>
            {sidebarOpen ? '‹' : '›'}
          </span>
        </button>
      </div>
      <div className="export-actions">
        <div className="export-all-menu" ref={exportMenuRef}>
          <button
            type="button"
            className="export-all-btn"
            onClick={() => setExportDialogOpen((open) => !open)}
            disabled={exportingAll}
            aria-busy={exportingAll}
            aria-expanded={exportDialogOpen}
            aria-haspopup="dialog"
          >
            {exportingAll && <span className="export-all-btn__spinner" aria-hidden />}
            {exportingAll ? 'Exporting…' : 'Export all'}
          </button>
          {exportDialogOpen && (
            <ExportAllDialog
              exporting={exportingAll}
              anchorRef={exportMenuRef}
              onClose={() => setExportDialogOpen(false)}
              onConfirm={runSelectedExports}
            />
          )}
        </div>
      </div>
      <main
        className="preview-panel"
      >
        <div className="preview-panel__canvas" ref={canvasRef}>
          <section className="preview-platform" aria-label={platformLabel}>
            <div className="preview-panel__inner">
              {previewEntries.map((entry) => (
                <Frame
                  key={entry.id}
                  label={resolvePreviewLabel(entry, previewContext)}
                  variant={entry.variant}
                >
                  {renderPreviewScreen(entry, platform, previewContext)}
                </Frame>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

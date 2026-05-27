import { useCallback, useRef, useState } from 'react';
import { useBrandPalette } from './hooks/useBrandPalette';
import { useAssetUploads } from './hooks/useAssetUploads';
import { exportElementAsPng } from './lib/exportCanvas';
import { ControlPanel } from './components/ControlPanel';
import { IPhoneFrame } from './components/IPhoneFrame';
import { HomepageScreen } from './components/screens/HomepageScreen';
import { ShowPass } from './components/screens/ShowPass';
import { SplashScreen } from './components/screens/SplashScreen';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { BookingsScreenCopy } from './components/screens/BookingsScreenCopy';
import { PlaceholderScreen } from './components/screens/PlaceholderScreen';
import type { PreviewMode } from './types';
import './styles.css';

export default function App() {
  const { primaryHex, setPrimaryHex, palette } = useBrandPalette();
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exporting, setExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExportAll = useCallback(async () => {
    const node = canvasRef.current;
    if (!node || exporting) return;
    setExporting(true);
    try {
      await exportElementAsPng(node, 'membr-mockups.png');
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setExporting(false);
    }
  }, [exporting]);

  return (
    <div className={`app-layout${sidebarOpen ? '' : ' app-layout--sidebar-collapsed'}`}>
      <div className="control-panel-shell">
        <ControlPanel
          primaryHex={primaryHex}
          onPrimaryChange={setPrimaryHex}
          palette={palette}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
          logoDataUrl={assets.logoDataUrl}
          logoScale={logoScale}
          onLogoScaleChange={setLogoScale}
          splashDataUrl={assets.splashDataUrl}
          appIconDataUrl={assets.appIconDataUrl}
          onLogoUpload={uploadLogo}
          onSplashUpload={uploadSplash}
          onAppIconUpload={uploadAppIcon}
          onLogoClear={clearLogo}
          onSplashClear={clearSplash}
          onAppIconClear={clearAppIcon}
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
      <button
        type="button"
        className="export-all-btn"
        onClick={handleExportAll}
        disabled={exporting}
        aria-busy={exporting}
      >
        {exporting && <span className="export-all-btn__spinner" aria-hidden />}
        {exporting ? 'Exporting…' : 'Export all'}
      </button>
      <main className="preview-panel">
        <div className="preview-panel__inner" ref={canvasRef}>
          <IPhoneFrame label={previewMode === 'dark' ? 'Dark Mode' : 'Light Mode'}>
            <HomepageScreen mode={previewMode} />
          </IPhoneFrame>
          <IPhoneFrame label="Show Pass">
            <ShowPass mode={previewMode} />
          </IPhoneFrame>
          <IPhoneFrame label="Splash Screen" variant="splash">
            <SplashScreen
              mode={previewMode}
              hasLogo={!!assets.logoDataUrl}
              logoScale={logoScale}
              splashDataUrl={assets.splashDataUrl}
            />
          </IPhoneFrame>
          <IPhoneFrame label="Bookings page">
            <BookingsScreen mode={previewMode} />
          </IPhoneFrame>
          <IPhoneFrame label="Class preview">
            <BookingsScreenCopy mode={previewMode} />
          </IPhoneFrame>
          <IPhoneFrame label="app icon">
            <PlaceholderScreen mode={previewMode} logoScale={logoScale} />
          </IPhoneFrame>
        </div>
      </main>
    </div>
  );
}

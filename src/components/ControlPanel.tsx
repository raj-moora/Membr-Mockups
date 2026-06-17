import { useRef, useState } from 'react';
import {
  clampLogoScale,
  LOGO_SCALE_DEFAULT,
  LOGO_SCALE_MAX,
  LOGO_SCALE_MIN,
} from '../lib/brandStorage';
import {
  MATERIAL_PALETTE_CHIPS,
  type MaterialTheme,
} from '../engine/materialThemeEngine';
import { downloadAndroidColorsKt } from '../lib/exportAndroidColors';
import { downloadIosPaletteJson } from '../lib/exportIosPalette';
import type { BrandPalette, Platform, PreviewMode } from '../types';
import { PaletteChip } from './PaletteChip';

interface ControlPanelProps {
  gymName: string;
  onGymNameChange: (name: string) => void;
  primaryHex: string;
  onPrimaryChange: (hex: string) => void;
  palette: BrandPalette;
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
  logoDataUrl: string | null;
  logoScale: number;
  onLogoScaleChange: (scale: number) => void;
  splashDataUrl: string | null;
  appIconDataUrl: string | null;
  onLogoUpload: (file: File) => void;
  onSplashUpload: (file: File) => void;
  onAppIconUpload: (file: File) => void;
  onLogoClear: () => void;
  onSplashClear: () => void;
  onAppIconClear: () => void;
  onExtractBrandColor: () => Promise<void>;
  materialTheme: MaterialTheme;
}

export function ControlPanel({
  gymName,
  onGymNameChange,
  primaryHex,
  onPrimaryChange,
  palette,
  previewMode,
  onPreviewModeChange,
  platform,
  onPlatformChange,
  logoDataUrl,
  logoScale = LOGO_SCALE_DEFAULT,
  onLogoScaleChange,
  splashDataUrl,
  appIconDataUrl,
  onLogoUpload,
  onSplashUpload,
  onAppIconUpload,
  onLogoClear,
  onSplashClear,
  onAppIconClear,
  onExtractBrandColor,
  materialTheme,
}: ControlPanelProps) {
  const canExtractBrandColor = Boolean(logoDataUrl || appIconDataUrl);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const splashInputRef = useRef<HTMLInputElement>(null);
  const appIconInputRef = useRef<HTMLInputElement>(null);
  const [iosPaletteOpen, setIosPaletteOpen] = useState(true);
  const [materialPaletteOpen, setMaterialPaletteOpen] = useState(platform === 'android');
  const [extractingColor, setExtractingColor] = useState(false);

  function handlePlatformChange(next: Platform) {
    onPlatformChange(next);
    if (next === 'android') {
      setMaterialPaletteOpen(true);
    }
  }

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    // Accept as typed; validate on blur / when it looks like a full hex
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      onPrimaryChange(val);
    }
  }

  function handleHexBlur(e: React.FocusEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      onPrimaryChange(val);
    } else {
      // Reset to current valid value
      e.target.value = primaryHex;
    }
  }

  return (
    <aside className="control-panel">
      <div className="control-panel__header">
        <h1 className="control-panel__title">Brand Preview</h1>
        <p className="control-panel__subtitle">Upload assets and choose a brand color to see the app update instantly.</p>
      </div>

      <section className="control-section">
        <h2 className="control-section__heading">Gym Name</h2>
        <input
          type="text"
          value={gymName}
          onChange={(e) => onGymNameChange(e.target.value)}
          className="control-text-input"
          aria-label="Gym name"
          placeholder="Enter gym name"
        />
      </section>

      <section className="control-section">
        <h2 className="control-section__heading">Preview</h2>
        <div className="preview-toggles-row">
        <div className="preview-mode-toggle preview-mode-toggle--icon" role="group" aria-label="Preview mode">
          <button
            type="button"
            className={`preview-mode-toggle__btn${previewMode === 'light' ? ' preview-mode-toggle__btn--active' : ''}`}
            aria-pressed={previewMode === 'light'}
            aria-label="Light mode"
            onClick={() => onPreviewModeChange('light')}
          >
            <span className="material-symbols-rounded preview-mode-toggle__icon" aria-hidden>
              light_mode
            </span>
          </button>
          <button
            type="button"
            className={`preview-mode-toggle__btn${previewMode === 'dark' ? ' preview-mode-toggle__btn--active' : ''}`}
            aria-pressed={previewMode === 'dark'}
            aria-label="Dark mode"
            onClick={() => onPreviewModeChange('dark')}
          >
            <span className="material-symbols-rounded preview-mode-toggle__icon" aria-hidden>
              dark_mode
            </span>
          </button>
        </div>
        <div className="preview-mode-toggle preview-mode-toggle--icon" role="group" aria-label="Preview platform">
          <button
            type="button"
            className={`preview-mode-toggle__btn${platform === 'ios' ? ' preview-mode-toggle__btn--active' : ''}`}
            aria-pressed={platform === 'ios'}
            aria-label="iOS"
            onClick={() => handlePlatformChange('ios')}
          >
            <svg
              className="preview-mode-toggle__icon preview-mode-toggle__icon--svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </button>
          <button
            type="button"
            className={`preview-mode-toggle__btn${platform === 'android' ? ' preview-mode-toggle__btn--active' : ''}`}
            aria-pressed={platform === 'android'}
            aria-label="Android"
            onClick={() => handlePlatformChange('android')}
          >
            <span className="material-symbols-rounded preview-mode-toggle__icon" aria-hidden>
              android
            </span>
          </button>
        </div>
        </div>
      </section>

      {/* App Icon Upload */}
      <section className="control-section">
        <h2 className="control-section__heading">App Icon</h2>
        <div className="asset-upload">
          {appIconDataUrl ? (
            <div className="asset-preview">
              <img src={appIconDataUrl} alt="App icon preview" className="asset-preview__img" />
              <button className="asset-clear-btn" onClick={onAppIconClear} aria-label="Remove app icon">
                ✕
              </button>
            </div>
          ) : (
            <button
              className="asset-upload-btn"
              onClick={() => appIconInputRef.current?.click()}
            >
              <span className="asset-upload-btn__icon">↑</span>
              Upload app icon
            </button>
          )}
          <input
            ref={appIconInputRef}
            type="file"
            accept="image/*,.svg"
            className="asset-input-hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onAppIconUpload(file);
            }}
            aria-label="Upload app icon file"
          />
        </div>
      </section>

      {/* Splash Upload */}
      <section className="control-section">
        <h2 className="control-section__heading">Splash Image</h2>
        <div className="asset-upload">
          {splashDataUrl ? (
            <div className="asset-preview">
              <img src={splashDataUrl} alt="Splash preview" className="asset-preview__img asset-preview__img--wide" />
              <button className="asset-clear-btn" onClick={onSplashClear} aria-label="Remove splash image">✕</button>
            </div>
          ) : (
            <button
              className="asset-upload-btn"
              onClick={() => splashInputRef.current?.click()}
            >
              <span className="asset-upload-btn__icon">↑</span>
              Upload splash image
            </button>
          )}
          <input
            ref={splashInputRef}
            type="file"
            accept="image/*"
            className="asset-input-hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onSplashUpload(file);
            }}
            aria-label="Upload splash image file"
          />
        </div>
      </section>

      {/* Logo Upload */}
      <section className="control-section">
        <h2 className="control-section__heading">Splash Logo</h2>
        <div className="asset-upload">
          {logoDataUrl ? (
            <div className="asset-preview">
              <img src={logoDataUrl} alt="Logo preview" className="asset-preview__img" />
              <button className="asset-clear-btn" onClick={onLogoClear} aria-label="Remove logo">✕</button>
            </div>
          ) : (
            <button
              className="asset-upload-btn"
              onClick={() => logoInputRef.current?.click()}
            >
              <span className="asset-upload-btn__icon">↑</span>
              Upload logo
            </button>
          )}
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="asset-input-hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onLogoUpload(file);
            }}
            aria-label="Upload logo file"
          />
        </div>
        {logoDataUrl && (
          <div className="logo-scale-control">
            <div className="logo-scale-control__header">
              <span className="logo-scale-control__label">Logo size</span>
              <span className="logo-scale-control__value" aria-live="polite">
                {Math.round(clampLogoScale(logoScale) * 100)}%
              </span>
            </div>
            <input
              type="range"
              className="logo-scale-slider"
              min={LOGO_SCALE_MIN}
              max={LOGO_SCALE_MAX}
              step={0.05}
              value={clampLogoScale(logoScale)}
              onChange={(e) => onLogoScaleChange(Number(e.target.valueAsNumber))}
              aria-label="Logo size on splash screen"
            />
          </div>
        )}
      </section>

      <hr
        className="control-panel__divider"
        aria-hidden
        style={{ border: 'none', borderTop: '1px solid #e0e0e6', margin: 0 }}
      />

      <section className="control-section">
        <h2 className="control-section__heading">Brand Color</h2>
        <div className="color-picker-row">
          <label className="color-picker-swatch" style={{ background: primaryHex }}>
            <input
              type="color"
              value={primaryHex}
              onChange={(e) => onPrimaryChange(e.target.value)}
              className="color-picker-native"
              aria-label="Pick brand color"
            />
          </label>
          <input
            type="text"
            defaultValue={primaryHex}
            key={primaryHex}
            onChange={handleHexInput}
            onBlur={handleHexBlur}
            maxLength={7}
            className="color-picker-hex"
            aria-label="Brand color hex code"
            spellCheck={false}
          />
        </div>
        <button
          type="button"
          className="palette-export-btn"
          disabled={!canExtractBrandColor || extractingColor}
          aria-busy={extractingColor}
          onClick={async () => {
            setExtractingColor(true);
            try {
              await onExtractBrandColor();
            } finally {
              setExtractingColor(false);
            }
          }}
        >
          {extractingColor ? 'Extracting…' : 'Extract color from uploaded asset'}
        </button>
      </section>

      {/* iOS palette */}
      <section className="control-section palette-accordion">
        <div className="palette-accordion__header">
          <button
            type="button"
            className="palette-accordion__trigger"
            aria-expanded={iosPaletteOpen}
            aria-controls="ios-palette-accordion-content"
            onClick={() => setIosPaletteOpen((open) => !open)}
          >
            <h2 className="control-section__heading">iOS palette</h2>
            <span className={`palette-accordion__chevron${iosPaletteOpen ? ' palette-accordion__chevron--open' : ''}`} aria-hidden>
              ›
            </span>
          </button>
          <button
            type="button"
            className="palette-export-btn"
            onClick={() => downloadIosPaletteJson(palette, gymName)}
            aria-label="Export iOS palette colors as JSON"
          >
            Export JSON
          </button>
        </div>
        <div
          id="ios-palette-accordion-content"
          className={`palette-accordion__content${iosPaletteOpen ? ' palette-accordion__content--open' : ''}`}
          aria-hidden={!iosPaletteOpen}
        >
          <div className="palette-accordion__content-inner">
            <div className="palette-group">
              <p className="palette-group__mode">Light Mode</p>
              <PaletteChip color={palette.brandBgLight} label="Brand BG" surface="#FFFFFF" />
              <PaletteChip color={palette.textOnBrandLight} label="Text on Brand" surface={palette.brandBgLight} />
              <PaletteChip color={palette.brandTextLight} label="Brand Text" surface="#FFFFFF" />
            </div>
            <div className="palette-group">
              <p className="palette-group__mode">Dark Mode</p>
              <PaletteChip color={palette.brandBgDark} label="Brand BG" surface="#1C1C1E" />
              <PaletteChip color={palette.textOnBrandDark} label="Text on Brand" surface={palette.brandBgDark} />
              <PaletteChip color={palette.brandTextDark} label="Brand Text" surface="#1C1C1E" />
            </div>
          </div>
        </div>
      </section>

      {/* Android Material palette */}
      <section className="control-section palette-accordion">
        <div className="palette-accordion__header">
          <button
            type="button"
            className="palette-accordion__trigger"
            aria-expanded={materialPaletteOpen}
            aria-controls="material-palette-accordion-content"
            onClick={() => setMaterialPaletteOpen((open) => !open)}
          >
            <h2 className="control-section__heading">Android palette (Material 3)</h2>
            <span className={`palette-accordion__chevron${materialPaletteOpen ? ' palette-accordion__chevron--open' : ''}`} aria-hidden>
              ›
            </span>
          </button>
          <button
            type="button"
            className="palette-export-btn"
            onClick={() => downloadAndroidColorsKt(materialTheme, gymName)}
            aria-label="Export Android Material 3 colors as Colors.kt"
          >
            Export Colors
          </button>
        </div>
        <div
          id="material-palette-accordion-content"
          className={`palette-accordion__content${materialPaletteOpen ? ' palette-accordion__content--open' : ''}`}
          aria-hidden={!materialPaletteOpen}
        >
          <div className="palette-accordion__content-inner">
            <div className="palette-group">
              <p className="palette-group__mode">Light Mode</p>
              {MATERIAL_PALETTE_CHIPS.map((chip) => (
                <PaletteChip
                  key={`light-${chip.label}`}
                  label={chip.label}
                  color={materialTheme.light[chip.colorKey]}
                  surface={materialTheme.light[chip.contrastSurfaceKey]}
                  showContrast={chip.showContrast !== false}
                />
              ))}
            </div>
            <div className="palette-group">
              <p className="palette-group__mode">Dark Mode</p>
              {MATERIAL_PALETTE_CHIPS.map((chip) => (
                <PaletteChip
                  key={`dark-${chip.label}`}
                  label={chip.label}
                  color={materialTheme.dark[chip.colorKey]}
                  surface={materialTheme.dark[chip.contrastSurfaceKey]}
                  showContrast={chip.showContrast !== false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}

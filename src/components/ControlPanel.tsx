import { useRef, useState } from 'react';
import {
  clampLogoScale,
  LOGO_SCALE_DEFAULT,
  LOGO_SCALE_MAX,
  LOGO_SCALE_MIN,
} from '../lib/brandStorage';
import type { BrandPalette, PreviewMode } from '../types';
import { PaletteChip } from './PaletteChip';

interface ControlPanelProps {
  primaryHex: string;
  onPrimaryChange: (hex: string) => void;
  palette: BrandPalette;
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
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
}

export function ControlPanel({
  primaryHex,
  onPrimaryChange,
  palette,
  previewMode,
  onPreviewModeChange,
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
}: ControlPanelProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const splashInputRef = useRef<HTMLInputElement>(null);
  const appIconInputRef = useRef<HTMLInputElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(true);

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
        <h2 className="control-section__heading">Preview</h2>
        <div className="preview-mode-toggle" role="group" aria-label="Preview mode">
          <button
            type="button"
            className={`preview-mode-toggle__btn${previewMode === 'light' ? ' preview-mode-toggle__btn--active' : ''}`}
            aria-pressed={previewMode === 'light'}
            onClick={() => onPreviewModeChange('light')}
          >
            Light
          </button>
          <button
            type="button"
            className={`preview-mode-toggle__btn${previewMode === 'dark' ? ' preview-mode-toggle__btn--active' : ''}`}
            aria-pressed={previewMode === 'dark'}
            onClick={() => onPreviewModeChange('dark')}
          >
            Dark
          </button>
        </div>
      </section>

      {/* Color Picker */}
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
      </section>

      {/* Logo Upload */}
      <section className="control-section">
        <h2 className="control-section__heading">Logo</h2>
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

      {/* Palette */}
      <section className="control-section palette-accordion">
        <button
          type="button"
          className="palette-accordion__trigger"
          aria-expanded={paletteOpen}
          aria-controls="palette-accordion-content"
          onClick={() => setPaletteOpen((open) => !open)}
        >
          <h2 className="control-section__heading">Derived Palette</h2>
          <span className={`palette-accordion__chevron${paletteOpen ? ' palette-accordion__chevron--open' : ''}`} aria-hidden>
            ›
          </span>
        </button>
        <div
          id="palette-accordion-content"
          className={`palette-accordion__content${paletteOpen ? ' palette-accordion__content--open' : ''}`}
          aria-hidden={!paletteOpen}
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
    </aside>
  );
}

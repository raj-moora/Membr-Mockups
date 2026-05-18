import type { BrandPalette } from './colorEngine';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CSS VARIABLE CONTRACT  (do not rename — all screen mockups consume these)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Color variables (derived from primary input by colorEngine.ts):
 *
 *   --brand-bg-light        Brand background, light mode
 *   --text-on-brand-light   Text/icon on --brand-bg-light  (target 6.5:1)
 *   --brand-text-light      Brand-colored text on white    (target 4.5:1)
 *
 *   --brand-bg-dark         Brand background, dark mode
 *   --text-on-brand-dark    Text/icon on --brand-bg-dark   (target 6.5:1)
 *   --brand-text-dark       Brand-colored text on #1C1C1E  (target 4.5:1)
 *
 * Asset variables (set by useAssetUploads hook):
 *
 *   --asset-logo            url("dataURL")  or  none
 *   --asset-splash          url("dataURL")  or  none
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function applyPaletteVars(palette: BrandPalette): void {
  const root = document.documentElement;
  root.style.setProperty('--brand-bg-light', palette.brandBgLight);
  root.style.setProperty('--text-on-brand-light', palette.textOnBrandLight);
  root.style.setProperty('--brand-text-light', palette.brandTextLight);
  root.style.setProperty('--brand-bg-dark', palette.brandBgDark);
  root.style.setProperty('--text-on-brand-dark', palette.textOnBrandDark);
  root.style.setProperty('--brand-text-dark', palette.brandTextDark);
}

export function applyAssetVar(name: 'logo' | 'splash', dataUrl: string | null): void {
  const root = document.documentElement;
  const value = dataUrl ? `url("${dataUrl}")` : 'none';
  root.style.setProperty(`--asset-${name}`, value);
}

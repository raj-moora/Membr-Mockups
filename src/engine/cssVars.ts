import type { BrandPalette } from './colorEngine';
import type { MaterialSchemeColors } from './materialThemeEngine';

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
 *   --asset-app-icon        url("dataURL")  or  none
 *
 * Material 3 variables (Android — derived by materialThemeEngine.ts, active scheme):
 *
 *   --md-primary, --md-on-primary, --md-primary-container, --md-on-primary-container
 *   --md-background, --md-on-background, --md-surface, --md-on-surface
 *   --md-surface-variant, --md-on-surface-variant, --md-outline, --md-outline-variant
 *   --md-error, --md-on-error, --md-tertiary, --md-on-tertiary
 *   --md-secondary, --md-on-secondary, --md-secondary-container, --md-on-secondary-container
 *   --md-surface-container, --md-surface-container-low
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

const MATERIAL_CSS_KEYS: { css: string; key: keyof MaterialSchemeColors }[] = [
  { css: '--md-primary', key: 'primary' },
  { css: '--md-on-primary', key: 'onPrimary' },
  { css: '--md-primary-container', key: 'primaryContainer' },
  { css: '--md-on-primary-container', key: 'onPrimaryContainer' },
  { css: '--md-background', key: 'background' },
  { css: '--md-on-background', key: 'onBackground' },
  { css: '--md-surface', key: 'surface' },
  { css: '--md-on-surface', key: 'onSurface' },
  { css: '--md-surface-variant', key: 'surfaceVariant' },
  { css: '--md-on-surface-variant', key: 'onSurfaceVariant' },
  { css: '--md-outline', key: 'outline' },
  { css: '--md-outline-variant', key: 'outlineVariant' },
  { css: '--md-error', key: 'error' },
  { css: '--md-on-error', key: 'onError' },
  { css: '--md-tertiary', key: 'tertiary' },
  { css: '--md-on-tertiary', key: 'onTertiary' },
  { css: '--md-secondary', key: 'secondary' },
  { css: '--md-on-secondary', key: 'onSecondary' },
  { css: '--md-secondary-container', key: 'secondaryContainer' },
  { css: '--md-on-secondary-container', key: 'onSecondaryContainer' },
  { css: '--md-surface-container', key: 'surfaceContainer' },
  { css: '--md-surface-container-low', key: 'surfaceContainerLow' },
];

export function applyPaletteVars(palette: BrandPalette): void {
  const root = document.documentElement;
  root.style.setProperty('--brand-bg-light', palette.brandBgLight);
  root.style.setProperty('--text-on-brand-light', palette.textOnBrandLight);
  root.style.setProperty('--brand-text-light', palette.brandTextLight);
  root.style.setProperty('--brand-bg-dark', palette.brandBgDark);
  root.style.setProperty('--text-on-brand-dark', palette.textOnBrandDark);
  root.style.setProperty('--brand-text-dark', palette.brandTextDark);
}

export function applyMaterialThemeVars(scheme: MaterialSchemeColors): void {
  const root = document.documentElement;
  for (const { css, key } of MATERIAL_CSS_KEYS) {
    root.style.setProperty(css, scheme[key]);
  }
}

export function applyAssetVar(name: 'logo' | 'splash' | 'app-icon', dataUrl: string | null): void {
  const root = document.documentElement;
  const value = dataUrl ? `url("${dataUrl}")` : 'none';
  root.style.setProperty(`--asset-${name}`, value);
}

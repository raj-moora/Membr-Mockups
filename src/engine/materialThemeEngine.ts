import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  type Scheme,
  type TonalPalette,
} from '@material/material-color-utilities';

export const MATERIAL_FALLBACK_SEED = '#6750A4';

/** M3 scheme roles used by Android mockups and the control panel. */
export interface MaterialSchemeColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  error: string;
  onError: string;
  tertiary: string;
  onTertiary: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  surfaceContainer: string;
  surfaceContainerLow: string;
}

export interface MaterialTheme {
  light: MaterialSchemeColors;
  dark: MaterialSchemeColors;
}

export type MaterialSchemeColorKey = keyof MaterialSchemeColors;

export interface MaterialPaletteChipDef {
  label: string;
  colorKey: MaterialSchemeColorKey;
  contrastSurfaceKey: MaterialSchemeColorKey;
  /** Hide AA badge when contrast vs the same fill is not meaningful. */
  showContrast?: boolean;
}

/** Control panel chip rows (light + dark schemes). */
export const MATERIAL_PALETTE_CHIPS: MaterialPaletteChipDef[] = [
  { label: 'Primary', colorKey: 'primary', contrastSurfaceKey: 'surface', showContrast: false },
  { label: 'On primary', colorKey: 'onPrimary', contrastSurfaceKey: 'primary' },
  { label: 'Primary container', colorKey: 'primaryContainer', contrastSurfaceKey: 'surface', showContrast: false },
  { label: 'On primary container', colorKey: 'onPrimaryContainer', contrastSurfaceKey: 'primaryContainer' },
  { label: 'Background', colorKey: 'background', contrastSurfaceKey: 'surface', showContrast: false },
  { label: 'On background', colorKey: 'onBackground', contrastSurfaceKey: 'background' },
  { label: 'Surface', colorKey: 'surface', contrastSurfaceKey: 'background', showContrast: false },
  { label: 'On surface', colorKey: 'onSurface', contrastSurfaceKey: 'surface' },
  { label: 'Surface variant', colorKey: 'surfaceVariant', contrastSurfaceKey: 'surface', showContrast: false },
  { label: 'On surface variant', colorKey: 'onSurfaceVariant', contrastSurfaceKey: 'surfaceVariant' },
  { label: 'Outline', colorKey: 'outline', contrastSurfaceKey: 'surface', showContrast: false },
  {
    label: 'Outline variant',
    colorKey: 'outlineVariant',
    contrastSurfaceKey: 'surface',
    showContrast: false,
  },
  { label: 'Error', colorKey: 'error', contrastSurfaceKey: 'surface', showContrast: false },
  { label: 'On error', colorKey: 'onError', contrastSurfaceKey: 'error' },
  { label: 'Tertiary', colorKey: 'tertiary', contrastSurfaceKey: 'surface', showContrast: false },
  { label: 'On tertiary', colorKey: 'onTertiary', contrastSurfaceKey: 'tertiary' },
];

const HEX_PATTERN = /^#?[0-9a-fA-F]{6}$/i;

function normalizeHex(hex: string): string {
  const trimmed = hex.trim();
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  return withHash.toUpperCase();
}

function argbToCssHex(argb: number): string {
  const hex = hexFromArgb(argb);
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
    return hex.toUpperCase();
  }
  if (/^#[0-9a-fA-F]{8}$/.test(hex)) {
    return (`#${hex.slice(3)}`).toUpperCase();
  }
  return hex.toUpperCase();
}

function surfaceContainerTone(neutral: TonalPalette, isDark: boolean): string {
  return argbToCssHex(neutral.tone(isDark ? 12 : 94));
}

function surfaceContainerLowTone(neutral: TonalPalette, isDark: boolean): string {
  return argbToCssHex(neutral.tone(isDark ? 10 : 96));
}

function secondaryContainerTone(secondary: TonalPalette, isDark: boolean): string {
  return argbToCssHex(secondary.tone(isDark ? 30 : 90));
}

function onSecondaryContainerTone(secondary: TonalPalette, isDark: boolean): string {
  return argbToCssHex(secondary.tone(isDark ? 90 : 10));
}

function schemeToColors(
  scheme: Scheme,
  neutral: TonalPalette,
  secondary: TonalPalette,
  isDark: boolean,
): MaterialSchemeColors {
  return {
    primary: argbToCssHex(scheme.primary),
    onPrimary: argbToCssHex(scheme.onPrimary),
    primaryContainer: argbToCssHex(scheme.primaryContainer),
    onPrimaryContainer: argbToCssHex(scheme.onPrimaryContainer),
    background: argbToCssHex(scheme.background),
    onBackground: argbToCssHex(scheme.onBackground),
    surface: argbToCssHex(scheme.surface),
    onSurface: argbToCssHex(scheme.onSurface),
    surfaceVariant: argbToCssHex(scheme.surfaceVariant),
    onSurfaceVariant: argbToCssHex(scheme.onSurfaceVariant),
    outline: argbToCssHex(scheme.outline),
    outlineVariant: argbToCssHex(scheme.outlineVariant),
    error: argbToCssHex(scheme.error),
    onError: argbToCssHex(scheme.onError),
    tertiary: argbToCssHex(scheme.tertiary),
    onTertiary: argbToCssHex(scheme.onTertiary),
    secondary: argbToCssHex(scheme.secondary),
    onSecondary: argbToCssHex(scheme.onSecondary),
    secondaryContainer: secondaryContainerTone(secondary, isDark),
    onSecondaryContainer: onSecondaryContainerTone(secondary, isDark),
    surfaceContainer: surfaceContainerTone(neutral, isDark),
    surfaceContainerLow: surfaceContainerLowTone(neutral, isDark),
  };
}

function isValidHex(hex: string): boolean {
  return HEX_PATTERN.test(hex.trim());
}

/**
 * Derive light + dark Material 3 schemes from a source color (Theme Builder algorithm).
 */
export function deriveMaterialTheme(primaryHex: string): MaterialTheme {
  const seed = isValidHex(primaryHex) ? normalizeHex(primaryHex) : MATERIAL_FALLBACK_SEED;
  const theme = themeFromSourceColor(argbFromHex(seed));
  return {
    light: schemeToColors(
      theme.schemes.light,
      theme.palettes.neutral,
      theme.palettes.secondary,
      false,
    ),
    dark: schemeToColors(
      theme.schemes.dark,
      theme.palettes.neutral,
      theme.palettes.secondary,
      true,
    ),
  };
}

import type { BrandPalette } from '../engine/colorEngine';

export interface IosPaletteExport {
  light: {
    'brand-bg': string;
    'text-on-brand': string;
    'brand-text': string;
  };
  dark: {
    'brand-bg': string;
    'text-on-brand': string;
    'brand-text': string;
  };
}

export function toIosPaletteExport(palette: BrandPalette): IosPaletteExport {
  return {
    light: {
      'brand-bg': palette.brandBgLight,
      'text-on-brand': palette.textOnBrandLight,
      'brand-text': palette.brandTextLight,
    },
    dark: {
      'brand-bg': palette.brandBgDark,
      'text-on-brand': palette.textOnBrandDark,
      'brand-text': palette.brandTextDark,
    },
  };
}

function toExportFilename(gymName: string): string {
  const sanitized = gymName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  const base = sanitized || 'gym';
  return `${base}-ios_colors.json`;
}

export function downloadIosPaletteJson(palette: BrandPalette, gymName: string): void {
  const json = JSON.stringify(toIosPaletteExport(palette), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = toExportFilename(gymName);
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

import type { BrandPalette } from './engine/colorEngine';

export type { BrandPalette };

export type PreviewMode = 'light' | 'dark';

export interface AssetState {
  logoDataUrl: string | null;
  splashDataUrl: string | null;
  appIconDataUrl: string | null;
  logoScale: number;
}

export interface BrandConfig {
  primaryHex: string;
  palette: BrandPalette;
  assets: AssetState;
}

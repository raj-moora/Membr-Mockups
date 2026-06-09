import type { BrandPalette } from './engine/colorEngine';

export type { BrandPalette };

export type PreviewMode = 'light' | 'dark';

export type Platform = 'ios' | 'android';

/** Shared prop for screens that respond to light/dark preview mode. */
export interface ScreenModeProps {
  mode: PreviewMode;
}

/** Brand text props passed from the control panel into preview screens. */
export interface ScreenBrandProps {
  gymName?: string;
}

/** Optional asset props passed from the control panel into splash / app-icon screens. */
export interface ScreenAssetProps {
  hasLogo?: boolean;
  logoScale?: number;
  splashDataUrl?: string | null;
  appIconScale?: number;
}

export type FrameVariant = 'default' | 'splash';

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

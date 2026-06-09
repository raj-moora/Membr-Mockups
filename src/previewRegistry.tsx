import type { ComponentType, ReactNode } from 'react';
import { HomepageScreen } from './components/screens/HomepageScreen';
import { ShowPass } from './components/screens/ShowPass';
import { SplashScreen } from './components/screens/SplashScreen';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { ClassPreviewScreen } from './components/screens/ClassPreviewScreen';
import { PlaceholderScreen } from './components/screens/PlaceholderScreen';
import { HomepageScreenAndroid } from './components/screens/android/HomepageScreenAndroid';
import { ShowPassScreenAndroid } from './components/screens/android/ShowPassScreenAndroid';
import { SplashScreenAndroid } from './components/screens/android/SplashScreenAndroid';
import { BookingsScreenAndroid } from './components/screens/android/BookingsScreenAndroid';
import { PlaceholderScreenAndroid } from './components/screens/android/PlaceholderScreenAndroid';
import type { AssetState, FrameVariant, Platform, PreviewMode, ScreenAssetProps, ScreenBrandProps, ScreenModeProps } from './types';

export interface PreviewContext {
  mode: PreviewMode;
  assets: Pick<AssetState, 'logoDataUrl' | 'splashDataUrl' | 'appIconDataUrl'>;
  logoScale: number;
  gymName: string;
}

type PreviewScreenComponent = ComponentType<ScreenModeProps & ScreenAssetProps & ScreenBrandProps>;

export interface PreviewEntry {
  id: string;
  label: string | ((ctx: PreviewContext) => string);
  variant?: FrameVariant;
  ios?: PreviewScreenComponent;
  android?: PreviewScreenComponent;
  /** Extra props merged into the screen (splash assets, app icon scale, etc.). */
  screenProps?: (ctx: PreviewContext) => Partial<ScreenAssetProps>;
}

export const PREVIEW_REGISTRY: PreviewEntry[] = [
  {
    id: 'home',
    label: (ctx) => (ctx.mode === 'dark' ? 'Dark Mode' : 'Light Mode'),
    ios: HomepageScreen,
    android: HomepageScreenAndroid,
  },
  {
    id: 'show-pass',
    label: 'Show Pass',
    ios: ShowPass,
    android: ShowPassScreenAndroid,
  },
  {
    id: 'splash',
    label: 'Splash Screen',
    variant: 'splash',
    ios: SplashScreen,
    android: SplashScreenAndroid,
    screenProps: (ctx) => ({
      hasLogo: !!ctx.assets.logoDataUrl,
      logoScale: ctx.logoScale,
      splashDataUrl: ctx.assets.splashDataUrl,
    }),
  },
  {
    id: 'bookings',
    label: 'Bookings page',
    ios: BookingsScreen,
    android: BookingsScreenAndroid,
  },
  {
    id: 'class-preview',
    label: 'Class preview',
    ios: ClassPreviewScreen,
  },
  {
    id: 'app-icon',
    label: 'app icon',
    ios: PlaceholderScreen,
    android: PlaceholderScreenAndroid,
    screenProps: (ctx) => ({
      appIconScale: ctx.logoScale,
    }),
  },
];

export function previewsForPlatform(platform: Platform): PreviewEntry[] {
  return PREVIEW_REGISTRY.filter((entry) =>
    platform === 'ios' ? entry.ios != null : entry.android != null,
  );
}

export function resolvePreviewLabel(
  entry: PreviewEntry,
  ctx: PreviewContext,
): string {
  return typeof entry.label === 'function' ? entry.label(ctx) : entry.label;
}

export function renderPreviewScreen(
  entry: PreviewEntry,
  platform: Platform,
  ctx: PreviewContext,
): ReactNode {
  const Component = platform === 'ios' ? entry.ios : entry.android;
  if (!Component) return null;

  const extra = entry.screenProps?.(ctx) ?? {};
  return <Component mode={ctx.mode} gymName={ctx.gymName} {...extra} />;
}

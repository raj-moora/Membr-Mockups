/**
 * PlaceholderScreenAndroid — Android launcher with app icon preview.
 */

import type { CSSProperties } from 'react';
import type { ScreenAssetProps, ScreenModeProps } from '../../../types';
import { AndroidStatusBar } from './AndroidStatusBar';

export interface PlaceholderScreenAndroidProps extends ScreenModeProps, ScreenAssetProps {}

export function PlaceholderScreenAndroid({
  mode,
  appIconScale = 1,
}: PlaceholderScreenAndroidProps) {
  return (
    <div className={`aph-screen${mode === 'dark' ? ' aph-screen--dark' : ''}`}>
      <div className="aph-wallpaper" aria-hidden />

      <AndroidStatusBar invertIcons />

      <div className="aph-dock">
        <div className="aph-search" aria-hidden>
          <span className="aph-search__icon">G</span>
          <span className="aph-search__label">Search</span>
        </div>
      </div>

      <div
        className="aph-app-icon"
        style={{ '--aph-logo-scale': String(appIconScale) } as CSSProperties}
      >
        <div className="aph-app-icon__tile">
          <div
            className="aph-app-icon__graphic"
            style={{ backgroundImage: 'var(--asset-app-icon, none)' }}
            role="img"
            aria-label="App icon graphic"
          />
        </div>
        <p className="aph-app-icon__label">My App</p>
      </div>

      <div className="aph-nav-bar" aria-hidden>
        <span className="aph-nav-bar__handle" />
      </div>
    </div>
  );
}

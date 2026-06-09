/**
 * SplashScreenAndroid — Material splash with sign-in bottom sheet.
 * Reuses --asset-logo and splash upload from control panel.
 */

import type { CSSProperties } from 'react';
import type { ScreenAssetProps, ScreenBrandProps, ScreenModeProps } from '../../../types';
import { DEFAULT_GYM_NAME } from '../../../lib/brandStorage';
import { AndroidStatusBar } from './AndroidStatusBar';

export interface SplashScreenAndroidProps extends ScreenModeProps, ScreenAssetProps, ScreenBrandProps {}

export function SplashScreenAndroid({
  mode,
  hasLogo = false,
  logoScale = 1,
  splashDataUrl = null,
  gymName = DEFAULT_GYM_NAME,
}: SplashScreenAndroidProps) {
  return (
    <div className={`asp-screen${mode === 'dark' ? ' asp-screen--dark' : ''}`}>
      <div className="asp-bg" aria-hidden>
        {!splashDataUrl && <div className="asp-bg__fallback" />}
        {splashDataUrl && <img src={splashDataUrl} alt="" className="asp-bg__photo" />}
      </div>

      <AndroidStatusBar invertIcons />

      {hasLogo && (
        <div
          className="asp-logo-wrap"
          style={{ '--asp-logo-scale': String(logoScale) } as CSSProperties}
        >
          <div
            className="asp-logo"
            style={{ backgroundImage: 'var(--asset-logo, none)' }}
            role="img"
            aria-label="Brand logo"
          />
        </div>
      )}

      <div className="asp-footer">
        <div className="asp-sheet">
          <div className="asp-sheet__surface" />
          <div className="asp-sheet__content">
            <button type="button" className="asp-sign-in-btn">
              Sign in
            </button>
            <p className="asp-sheet__footnote">This app is for {gymName} members only.</p>
          </div>
        </div>
      </div>

      <div className="asp-nav-bar" aria-hidden>
        <span className="asp-nav-bar__handle" />
      </div>
    </div>
  );
}

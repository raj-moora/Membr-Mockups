/**
 * SplashScreen — static mockup ported from Figma node 4069:6281.
 *
 * User assets (from control panel via App props / CSS variables):
 *   splashDataUrl   full-bleed background on .sp-bg__photo
 *   --asset-logo    centered brand logo
 *
 * Brand tokens on .sp-screen: --sp-brand-bg, --sp-text-on-brand (swap via .sp-screen--dark).
 */

import type { CSSProperties } from 'react';
import type { ScreenAssetProps, ScreenBrandProps, ScreenModeProps } from '../../types';
import { DEFAULT_GYM_NAME } from '../../lib/brandStorage';
import { IOSHomeIndicator } from './shared/IOSHomeIndicator';
import { IOSStatusBar } from './shared/IOSStatusBar';

export interface SplashScreenProps extends ScreenModeProps, ScreenAssetProps, ScreenBrandProps {}

export function SplashScreen({
  mode,
  hasLogo = false,
  logoScale = 1,
  splashDataUrl = null,
  gymName = DEFAULT_GYM_NAME,
}: SplashScreenProps) {
  return (
    <div className={`sp-screen${mode === 'dark' ? ' sp-screen--dark' : ''}`}>
      <div className="sp-bg" aria-hidden>
        {!splashDataUrl && <div className="sp-bg__fallback" />}
        {splashDataUrl && <img src={splashDataUrl} alt="" className="sp-bg__photo" />}
      </div>

      <IOSStatusBar variant="sp" />

      {hasLogo && (
        <div
          className="sp-logo-wrap"
          style={{ '--sp-logo-scale': String(logoScale) } as CSSProperties}
        >
          <div
            className="sp-logo"
            style={{
              backgroundImage: 'var(--asset-logo, none)',
            }}
            role="img"
            aria-label="Brand logo"
          />
        </div>
      )}

      <div className="sp-footer">
        <div className="sp-sheet">
          <div className="sp-sheet__surface" />
          <div className="sp-sheet__content">
            <button type="button" className="sp-sign-in-btn">
              Sign in
            </button>
            <p className="sp-sheet__footnote">This app is for {gymName} members only.</p>
          </div>
          <IOSHomeIndicator variant="sp" />
        </div>
      </div>
    </div>
  );
}

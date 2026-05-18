/**
 * SplashScreen — static mockup ported from Figma node 4069:6281.
 *
 * User assets (from control panel via App props / CSS variables):
 *   splashDataUrl   full-bleed background on .sp-bg__photo
 *   --asset-logo    centered brand logo
 *
 * Brand tokens on .sp-screen: --sp-brand-bg, --sp-text-on-brand (swap via .sp-screen--dark).
 */

import type { PreviewMode } from '../../types';
import cellularConnection from '../../assets/cellular_connection.svg';
import wifi from '../../assets/wifi.svg';
import battery from '../../assets/battery.svg';

interface SplashScreenProps {
  mode: PreviewMode;
  hasLogo?: boolean;
  splashDataUrl?: string | null;
}

export function SplashScreen({ mode, hasLogo = false, splashDataUrl = null }: SplashScreenProps) {
  return (
    <div className={`sp-screen${mode === 'dark' ? ' sp-screen--dark' : ''}`}>
      <div className="sp-bg" aria-hidden>
        {!splashDataUrl && <div className="sp-bg__fallback" />}
        {splashDataUrl && (
          <img src={splashDataUrl} alt="" className="sp-bg__photo" />
        )}
      </div>

      <div className="sp-status-bar">
        <span className="sp-status-time">9:41</span>
        <div className="sp-status-island" />
        <div className="sp-status-icons">
          <img src={cellularConnection} alt="" className="sp-status-icon" />
          <img src={wifi} alt="" className="sp-status-icon" />
          <img src={battery} alt="" className="sp-status-icon sp-status-icon--battery" />
        </div>
      </div>

      <div className="sp-logo-wrap">
        <div
          className="sp-logo"
          style={{
            backgroundImage: 'var(--asset-logo, none)',
          }}
          role="img"
          aria-label="Brand logo"
        >
          {!hasLogo && <span className="sp-logo__placeholder">Logo</span>}
        </div>
      </div>

      <div className="sp-footer">
        <div className="sp-sheet">
          <div className="sp-sheet__surface" />
          <div className="sp-sheet__content">
            <button type="button" className="sp-sign-in-btn">
              Sign in
            </button>
            <p className="sp-sheet__footnote">
              This app is for Xplor Gym members only.
            </p>
          </div>
          <div className="sp-home-indicator" aria-hidden>
            <span className="sp-home-indicator__pill" />
          </div>
        </div>
      </div>
    </div>
  );
}

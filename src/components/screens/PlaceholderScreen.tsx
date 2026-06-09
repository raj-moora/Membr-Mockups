/**
 * PlaceholderScreen — iOS home screen with app icon preview (Figma 17816:179488).
 *
 * Background: app_icon.png (full home screen mockup).
 * Overlay: custom app icon tile + label, positioned over the Games slot.
 *
 * User assets (from control panel via CSS variables):
 *   --asset-app-icon    custom graphic inside the icon tile
 *
 * Brand tokens on .ph-screen: --ph-brand-bg (swap via .ph-screen--dark).
 * Icon tile: subtle diagonal gradient from --ph-brand-bg (.ph-app-icon__tile).
 */

import type { CSSProperties } from 'react';
import homeScreenBg from '../../assets/app_icon.png';
import type { ScreenAssetProps, ScreenModeProps } from '../../types';

export interface PlaceholderScreenProps extends ScreenModeProps, ScreenAssetProps {}

export function PlaceholderScreen({
  mode,
  appIconScale = 1,
}: PlaceholderScreenProps) {
  return (
    <div className={`ph-screen${mode === 'dark' ? ' ph-screen--dark' : ''}`}>
      <img src={homeScreenBg} alt="" className="ph-screen__bg" />
      <div
        className="ph-app-icon"
        style={{ '--ph-logo-scale': String(appIconScale) } as CSSProperties}
      >
        <div className="ph-app-icon__tile">
          <div
            className="ph-app-icon__graphic"
            style={{ backgroundImage: 'var(--asset-app-icon, none)' }}
            role="img"
            aria-label="App icon graphic"
          />
        </div>
        <p className="ph-app-icon__label">My App</p>
      </div>
    </div>
  );
}

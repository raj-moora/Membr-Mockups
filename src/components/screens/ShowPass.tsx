/**
 * ShowPass — member pass modal (Figma 17882:222190).
 *
 * Brand tokens on .shp-screen: --shp-brand-bg, --shp-text-on-brand
 * (swap via .shp-screen--dark).
 */

import type { ScreenBrandProps, ScreenModeProps } from '../../types';
import { DEFAULT_GYM_NAME } from '../../lib/brandStorage';
import showPassQr from '../../assets/show_pass_qr.png';
import showPassAvatar from '../../assets/show_pass_avatar.png';
import appleWalletIcon from '../../assets/apple_wallet_icon.png';
import { MEMBER_PASS_MOCK } from './shared/mockData';
import { IOSHomeIndicator } from './shared/IOSHomeIndicator';
import { IOSStatusBar } from './shared/IOSStatusBar';

export type ShowPassProps = ScreenModeProps & ScreenBrandProps;

export function ShowPass({ mode, gymName = DEFAULT_GYM_NAME }: ShowPassProps) {
  const member = MEMBER_PASS_MOCK;

  return (
    <div className={`shp-screen${mode === 'dark' ? ' shp-screen--dark' : ''}`}>
      <div className="shp-backdrop" aria-hidden />

      <IOSStatusBar variant="shp" />

      <div className="shp-glow" aria-hidden />

      <article className="shp-card">
        <div className="shp-card__material" aria-hidden />

        <div className="shp-card__code">
          <div className="shp-qr-wrap">
            <img src={showPassQr} alt="" className="shp-qr" />
          </div>

          <div className="shp-pin">
            <p className="shp-pin__label">Pin</p>
            <p className="shp-pin__value">{member.pin}</p>
          </div>

          <button type="button" className="shp-wallet-btn">
            <img src={appleWalletIcon} alt="" className="shp-wallet-btn__icon" />
            <span className="shp-wallet-btn__label">Add to Apple Wallet</span>
          </button>
        </div>

        <div className="shp-member">
          <div className="shp-member__info">
            <p className="shp-member__name">{member.name}</p>
            <p className="shp-member__meta">{gymName}</p>
            <p className="shp-member__meta">{member.joined}</p>
          </div>
          <div className="shp-avatar">
            <span className="shp-avatar__initials" aria-hidden>
              {member.initials}
            </span>
            <img src={showPassAvatar} alt="" className="shp-avatar__photo" />
          </div>
        </div>
      </article>

      <button type="button" className="shp-done-btn">
        Done
      </button>

      <IOSHomeIndicator variant="shp" />
    </div>
  );
}

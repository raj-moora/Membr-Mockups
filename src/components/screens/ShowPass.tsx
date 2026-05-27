/**
 * ShowPass — member pass modal (Figma 17882:222190).
 *
 * Brand tokens on .shp-screen: --shp-brand-bg, --shp-text-on-brand
 * (swap via .shp-screen--dark).
 */

import type { PreviewMode } from '../../types';
import cellularConnection from '../../assets/cellular_connection.svg';
import wifi from '../../assets/wifi.svg';
import battery from '../../assets/battery.svg';
import showPassQr from '../../assets/show_pass_qr.png';
import showPassAvatar from '../../assets/show_pass_avatar.png';
import appleWalletIcon from '../../assets/apple_wallet_icon.png';

interface ShowPassProps {
  mode: PreviewMode;
}

export function ShowPass({ mode }: ShowPassProps) {
  return (
    <div className={`shp-screen${mode === 'dark' ? ' shp-screen--dark' : ''}`}>
      <div className="shp-backdrop" aria-hidden />

      <div className="shp-status-bar">
        <span className="shp-status-time">9:41</span>
        <div className="shp-status-island" />
        <div className="shp-status-icons">
          <img src={cellularConnection} alt="" className="shp-status-icon" />
          <img src={wifi} alt="" className="shp-status-icon" />
          <img src={battery} alt="" className="shp-status-icon shp-status-icon--battery" />
        </div>
      </div>

      <div className="shp-glow" aria-hidden />

      <article className="shp-card">
        <div className="shp-card__material" aria-hidden />

        <div className="shp-card__code">
          <div className="shp-qr-wrap">
            <img src={showPassQr} alt="" className="shp-qr" />
          </div>

          <div className="shp-pin">
            <p className="shp-pin__label">Pin</p>
            <p className="shp-pin__value">775489</p>
          </div>

          <button type="button" className="shp-wallet-btn">
            <img src={appleWalletIcon} alt="" className="shp-wallet-btn__icon" />
            <span className="shp-wallet-btn__label">Add to Apple Wallet</span>
          </button>
        </div>

        <div className="shp-member">
          <div className="shp-member__info">
            <p className="shp-member__name">Jane Doe</p>
            <p className="shp-member__meta">Xplor Gyms</p>
            <p className="shp-member__meta">Joined June 2020</p>
          </div>
          <div className="shp-avatar">
            <span className="shp-avatar__initials" aria-hidden>
              JD
            </span>
            <img src={showPassAvatar} alt="" className="shp-avatar__photo" />
          </div>
        </div>
      </article>

      <button type="button" className="shp-done-btn">
        Done
      </button>

      <div className="shp-home-indicator" aria-hidden>
        <span className="shp-home-indicator__pill" />
      </div>
    </div>
  );
}

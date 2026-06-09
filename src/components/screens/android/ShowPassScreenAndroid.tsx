/**
 * ShowPassScreenAndroid — member pass (Figma 4640:10851).
 * Colors: Material 3 tokens via --md-* (materialThemeEngine).
 */

import type { PreviewMode } from '../../../types';
import { DEFAULT_GYM_NAME } from '../../../lib/brandStorage';
import showPassQr from '../../../assets/show_pass_qr.png';
import showPassAvatar from '../../../assets/show_pass_avatar.png';
import androidGoogleWalletBadge from '../../../assets/android_google_wallet_badge.svg';
import { MEMBER_PASS_MOCK } from '../shared/mockData';
import { AndroidStatusBar } from './AndroidStatusBar';

interface ShowPassScreenAndroidProps {
  mode: PreviewMode;
  gymName?: string;
}

export function ShowPassScreenAndroid({
  mode,
  gymName = DEFAULT_GYM_NAME,
}: ShowPassScreenAndroidProps) {
  const member = MEMBER_PASS_MOCK;

  return (
    <div className={`apss-screen${mode === 'dark' ? ' apss-screen--dark' : ''}`}>
      <AndroidStatusBar />

      <div className="apss-view">
        <article className="apss-pass">
          <div className="apss-code">
            <div className="apss-qr-wrap">
              <img src={showPassQr} alt="" className="apss-qr" />
            </div>

            <div className="apss-pin">
              <p className="apss-pin__label">PIN</p>
              <p className="apss-pin__value">{member.pin}</p>
            </div>

            <button type="button" className="apss-wallet-btn">
              <img
                src={androidGoogleWalletBadge}
                alt="Add to Google Wallet"
                className="apss-wallet-btn__badge"
              />
            </button>
          </div>

          <div className="apss-member">
            <div className="apss-member__info">
              <p className="apss-member__name">{member.name}</p>
              <p className="apss-member__meta">{gymName}</p>
              <p className="apss-member__meta">{member.joined}</p>
            </div>
            <div className="apss-avatar" aria-hidden>
              <span className="apss-avatar__initials">{member.initials}</span>
              <img src={showPassAvatar} alt="" className="apss-avatar__photo" />
            </div>
          </div>
        </article>

        <div className="apss-fab-wrap">
          <button type="button" className="apss-fab" aria-label="Done">
            <span className="material-symbols-rounded apss-fab__icon" aria-hidden>
              check
            </span>
            <span className="apss-fab__label">Done</span>
          </button>
        </div>
      </div>

      <div className="apss-nav-bar" aria-hidden>
        <span className="apss-nav-bar__handle" />
      </div>
    </div>
  );
}

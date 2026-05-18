/**
 * HomepageScreen — static mockup ported from Figma.
 *   Light: node 8676:16948
 *   Dark:  node 17658:79765
 *
 * Brand tokens are aliased on .hp-screen as --hp-brand-bg, --hp-brand-text,
 * --hp-text-on-brand (swap via .hp-screen--dark). --asset-logo is the avatar.
 */

import type { PreviewMode } from '../../types';
import cellularConnection from '../../assets/cellular_connection.svg';
import wifi from '../../assets/wifi.svg';
import battery from '../../assets/battery.svg';
import iphoneBevel from '../../assets/iphone-bevel.svg';
import qrScan from '../../assets/qr_scan.svg';

// ─── Day picker strip ──────────────────────────────────────────────────────────

interface DayItemProps {
  day: string;
  date: string;
  status: 'booked' | 'empty' | 'past';
}

function DayItem({ day, date, status }: DayItemProps) {
  return (
    <div className={`day-item ${status === 'past' ? 'day-item--past' : ''}`}>
      <div className="day-item__label">{day}</div>
      <div className="day-item__date">{date}</div>
      <div className="day-item__status">
        {status === 'booked' && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="var(--hp-brand-text, #6923f4)">
            <circle cx="9" cy="9" r="9" />
            <path d="M5 9l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        )}
      </div>
    </div>
  );
}

// ─── Waiting list card ─────────────────────────────────────────────────────────

interface WaitingCardProps {
  className: string;
  time: string;
  message: string;
}

function WaitingCard({ className: gymClass, time, message }: WaitingCardProps) {
  return (
    <div className="waiting-card">
      <div className="waiting-card__row">
        <div className="waiting-card__info">
          <span className="waiting-card__class">{gymClass}</span>
          <span className="waiting-card__time">{time}</span>
        </div>
        <div className="waiting-card__tag">
          <span className="waiting-card__tag-text">Waiting</span>
        </div>
      </div>
      <p className="waiting-card__message">{message}</p>
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

interface HomepageScreenProps {
  mode: PreviewMode;
}

export function HomepageScreen({ mode }: HomepageScreenProps) {
  return (
    <div className={`hp-screen${mode === 'dark' ? ' hp-screen--dark' : ''}`}>
      {/* Gradient background (brand bg) */}
      <div className="hp-gradient" />

      {/* Status bar */}
      <div className="hp-status-bar">
        <span className="hp-status-time">9:41</span>
        <div className="hp-status-island" />
        <div className="hp-status-icons">
          <img src={cellularConnection} alt="" className="hp-status-icon" />
          <img src={wifi} alt="" className="hp-status-icon" />
          <img src={battery} alt="" className="hp-status-icon hp-status-icon--battery" />
        </div>
      </div>

      {/* Nav bar: title + avatar */}
      <div className="hp-nav">
        <h1 className="hp-nav__title">Home</h1>
        <div className="hp-nav__avatar">
          <div
            className="hp-avatar-img"
            style={{
              backgroundImage: 'var(--asset-logo, none)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-label="Account avatar"
          >
            {/* Fallback initials when no logo uploaded */}
            <span className="hp-avatar-fallback">A</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="hp-content">

        {/* ── Next class section ── */}
        <section className="hp-section">
          <h2 className="hp-section__heading">Your next class</h2>
          <div className="next-class-card">
            <div className="next-class-card__header">
              <div className="next-class-card__event-info">
                <span className="next-class-card__morning">This morning</span>
                <span className="next-class-card__time">7:30 am</span>
              </div>
              <span className="next-class-card__location">Fitness Studio A</span>
            </div>
            <div className="next-class-card__divider" />
            <div className="next-class-card__body">
              <div className="next-class-card__class-info">
                <span className="next-class-card__class-name">Spin Express</span>
                <span className="next-class-card__instructor">with Jane Doe</span>
              </div>
              <div className="next-class-card__avatar-circle">JD</div>
            </div>
            <div className="next-class-card__tag">
              <span className="next-class-card__tag-dot" />
              Starts in 25 minutes
            </div>
          </div>
        </section>

        {/* ── Waiting list section ── */}
        <section className="hp-section">
          <h2 className="hp-section__heading">You're on the waiting list</h2>
          <div className="hp-card-stack">
            <WaitingCard
              className="Stretch"
              time="10:00 am, Thursday 3 April"
              message="You're next in line."
            />
            <WaitingCard
              className="Weight lifting"
              time="12:30 pm, Thursday 3 April"
              message="You're in position 2."
            />
          </div>
        </section>

        {/* ── Browse classes section ── */}
        <section className="hp-section hp-section--browse">
          <h2 className="hp-section__heading">Browse classes</h2>
          <div className="day-strip">
            <DayItem day="Today" date="3rd Apr" status="booked" />
            <DayItem day="Fri" date="4th Apr" status="empty" />
            <DayItem day="Sat" date="5th Apr" status="empty" />
            <DayItem day="Sun" date="6th Apr" status="past" />
            <DayItem day="Mon" date="7th Apr" status="empty" />
          </div>
          <div className="show-all-row">
            <span className="show-all-row__label">Show all classes</span>
            <span className="show-all-row__chevron">›</span>
          </div>
        </section>

      </div>

      {/* ── Bevel + Show pass (fixed footer, outside scroll area) ── */}
      <div className="hp-pass-footer">
        <img src={iphoneBevel} alt="" className="hp-pass-bevel" />
        <div className="hp-pass-bar">
          <button className="hp-pass-btn" aria-label="Show pass">
            <span
              className="hp-pass-btn__icon"
              style={{ maskImage: `url(${qrScan})`, WebkitMaskImage: `url(${qrScan})` }}
              aria-hidden
            />
            <span className="hp-pass-btn__label">Show pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}

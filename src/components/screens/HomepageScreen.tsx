/**
 * HomepageScreen — static mockup ported from Figma.
 *   Light: node 8676:16948
 *   Dark:  node 17658:79765
 *
 * Brand tokens are aliased on .hp-screen as --hp-brand-bg, --hp-brand-text,
 * --hp-text-on-brand (swap via .hp-screen--dark). --asset-logo is the avatar.
 */

import type { PreviewMode } from '../../types';
import iphoneBevel from '../../assets/iphone-bevel.svg';

// ─── Status bar icons (inline SVG to avoid Figma dev-server dependency) ───────

function CellularIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
      <rect x="0" y="7" width="3" height="5" rx="1" />
      <rect x="4.5" y="5" width="3" height="7" rx="1" />
      <rect x="9" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="13.5" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
      <path d="M8.5 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      <path d="M4.5 6.5C5.8 5.2 7 4.6 8.5 4.6s2.7.6 4 1.9l1.4-1.4C12.2 3.4 10.5 2.6 8.5 2.6S4.8 3.4 3.1 5.1l1.4 1.4Z" />
      <path d="M1.5 3.5C3.3 1.7 5.8.6 8.5.6s5.2 1.1 7 2.9L17 2.1C14.8.8 11.8 0 8.5 0S2.2.8 0 2.1l1.5 1.4Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="1.5" y="1.5" width="18" height="10" rx="2" fill="currentColor" />
      <path d="M23.5 4.5v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

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
          <CellularIcon />
          <WifiIcon />
          <BatteryIcon />
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
            <svg width="22" height="22" viewBox="0 0 22 22" fill="var(--hp-text-on-brand, #eee7fe)">
              <rect x="3" y="3" width="16" height="16" rx="2" stroke="var(--hp-text-on-brand, #eee7fe)" strokeWidth="1.5" fill="none" />
              <rect x="6" y="6" width="4" height="4" fill="var(--hp-text-on-brand, #eee7fe)" />
              <rect x="12" y="6" width="4" height="4" fill="var(--hp-text-on-brand, #eee7fe)" />
              <rect x="6" y="12" width="4" height="4" fill="var(--hp-text-on-brand, #eee7fe)" />
              <rect x="12" y="12" width="4" height="4" fill="var(--hp-text-on-brand, #eee7fe)" />
            </svg>
            <span className="hp-pass-btn__label">Show pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * HomepageScreen — static mockup ported from Figma.
 *   Light: node 8676:16948
 *   Dark:  node 17658:79765
 *
 * Brand tokens are aliased on .hp-screen as --hp-brand-bg, --hp-brand-text,
 * --hp-text-on-brand (swap via .hp-screen--dark).
 */

import type { PreviewMode } from '../../types';
import iphoneBevel from '../../assets/iphone-bevel.svg';
import qrScan from '../../assets/qr_scan.svg';
import {
  HOMEPAGE_DAY_ITEMS,
  HOMEPAGE_NEXT_CLASS,
  HOMEPAGE_WAITING_LIST,
  type HomeDayItem,
} from './shared/mockData';
import { IOSStatusBar } from './shared/IOSStatusBar';

type DayItemProps = HomeDayItem;

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

interface HomepageScreenProps {
  mode: PreviewMode;
}

export function HomepageScreen({ mode }: HomepageScreenProps) {
  const next = HOMEPAGE_NEXT_CLASS;

  return (
    <div className={`hp-screen${mode === 'dark' ? ' hp-screen--dark' : ''}`}>
      <div className="hp-gradient" />

      <IOSStatusBar variant="hp" />

      <div className="hp-nav">
        <h1 className="hp-nav__title">Home</h1>
        <div className="hp-nav__avatar">
          <div className="hp-avatar-img" aria-label="Account avatar">
            <span className="hp-avatar-fallback">A</span>
          </div>
        </div>
      </div>

      <div className="hp-content">
        <section className="hp-section">
          <h2 className="hp-section__heading">Your next class</h2>
          <div className="next-class-card">
            <div className="next-class-card__header">
              <div className="next-class-card__event-info">
                <span className="next-class-card__morning">{next.dayLabel}</span>
                <span className="next-class-card__time">{next.time}</span>
              </div>
              <span className="next-class-card__location">{next.location}</span>
            </div>
            <div className="next-class-card__divider" />
            <div className="next-class-card__body">
              <div className="next-class-card__class-info">
                <span className="next-class-card__class-name">{next.className}</span>
                <span className="next-class-card__instructor">with {next.instructor}</span>
              </div>
              <div className="next-class-card__avatar-circle">{next.instructorInitials}</div>
            </div>
            <div className="next-class-card__tag">
              <span className="next-class-card__tag-dot" />
              {next.startsInLabel}
            </div>
          </div>
        </section>

        <section className="hp-section">
          <h2 className="hp-section__heading">You're on the waiting list</h2>
          <div className="hp-card-stack">
            {HOMEPAGE_WAITING_LIST.map((card) => (
              <WaitingCard
                key={`${card.className}-${card.time}`}
                className={card.className}
                time={card.time}
                message={card.message}
              />
            ))}
          </div>
        </section>

        <section className="hp-section hp-section--browse">
          <h2 className="hp-section__heading">Browse classes</h2>
          <div className="day-strip">
            {HOMEPAGE_DAY_ITEMS.map((item) => (
              <DayItem key={`${item.day}-${item.date}`} {...item} />
            ))}
          </div>
          <div className="show-all-row">
            <span className="show-all-row__label">Show all classes</span>
            <span className="show-all-row__chevron">›</span>
          </div>
        </section>
      </div>

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

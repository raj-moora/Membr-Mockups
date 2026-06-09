/**
 * BookingsScreenAndroid — Figma 5659:34054 (All classes [Android]).
 * Colors: Material 3 tokens via --md-* (materialThemeEngine).
 */

import type { PreviewMode } from '../../../types';
import fireIcon from '../../../assets/fire_icon.svg';
import {
  ANDROID_BOOKING_SCHEDULE,
  BOOKING_DATES,
  WEEKDAYS,
  type ClassBadge,
  type ClassRowData,
  type TimeSectionData,
} from '../shared/mockData';
import { AndroidStatusBar } from './AndroidStatusBar';

function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClassTagView({ badge }: { badge: ClassBadge }) {
  if (badge.type === 'spaces') {
    return (
      <span className="abk-tag abk-tag--spaces">
        <img src={fireIcon} alt="" className="abk-tag__flame" aria-hidden />
        <span>Only {badge.count} spaces left</span>
      </span>
    );
  }
  if (badge.type === 'full') {
    return <span className="abk-tag abk-tag--full">Class full</span>;
  }
  return null;
}

function ClassRow({ title, subtitle, badge, dimmed }: ClassRowData) {
  return (
    <div
      className={`abk-row${dimmed ? ' abk-row--dimmed' : ''}${badge ? ' abk-row--has-tag' : ''}`}
    >
      <div className="abk-row__content">
        <span className="abk-row__title">{title}</span>
        <span className="abk-row__subtitle">{subtitle}</span>
      </div>
      {badge && (
        <div className="abk-row__tag">
          <ClassTagView badge={badge} />
        </div>
      )}
    </div>
  );
}

function TimeSection({ time, rows }: TimeSectionData) {
  return (
    <section className="abk-section">
      <div className="abk-section__header">
        <h2 className="abk-section__time">{time}</h2>
        <div className="abk-section__divider" aria-hidden />
      </div>
      <div className="abk-section__list">
        {rows.map((row, index) => (
          <ClassRow key={`${time}-${row.title}-${index}`} {...row} />
        ))}
      </div>
    </section>
  );
}

interface BookingsScreenAndroidProps {
  mode: PreviewMode;
}

export function BookingsScreenAndroid({ mode }: BookingsScreenAndroidProps) {
  return (
    <div className={`abk-screen${mode === 'dark' ? ' abk-screen--dark' : ''}`}>
      <header className="abk-header">
        <AndroidStatusBar />

        <div className="abk-app-bar">
          <button type="button" className="abk-back" aria-label="Back">
            <BackArrow />
          </button>
          <h1 className="abk-app-bar__title">All classes</h1>
          <div className="abk-app-bar__trailing" aria-hidden />
        </div>

        <div className="abk-date-picker">
          <div className="abk-date-picker__weekdays">
            {WEEKDAYS.map((day, i) => (
              <span key={`${day}-${i}`} className="abk-weekday">
                {day}
              </span>
            ))}
          </div>
          <div className="abk-date-picker__dates">
            {BOOKING_DATES.map(({ value, state }) => (
              <div key={value} className="abk-date-cell">
                <div className="abk-date-wrap">
                  <span
                    className={`abk-date${state === 'selected' ? ' abk-date--selected' : ''}${state === 'past' ? ' abk-date--past' : ''}`}
                  >
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <p className="abk-date-label">Today - 3 April</p>

      <div className="abk-list">
        {ANDROID_BOOKING_SCHEDULE.map((section) => (
          <TimeSection key={section.time} {...section} />
        ))}
        <p className="abk-end-label">End of results for Thursday, 3 April</p>
      </div>

      <div className="abk-nav-bar" aria-hidden>
        <span className="abk-nav-bar__handle" />
      </div>
    </div>
  );
}

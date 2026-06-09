import fireIcon from '../../../../assets/fire_icon.svg';
import { IOSStatusBar } from '../IOSStatusBar';
import {
  BOOKING_DATES,
  BOOKING_SCHEDULE,
  WEEKDAYS,
  type ClassBadge,
  type ClassRowData,
  type TimeSectionData,
} from '../mockData';

function BackChevron() {
  return (
    <svg className="bk-back__chevron" width="13" height="21" viewBox="0 0 13 21" fill="none" aria-hidden>
      <path
        d="M11.5 1.5L2 10.5l9.5 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookedCheck() {
  return (
    <svg className="bk-tag__check" width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
      <path
        d="M1 5l3.5 3.5L11 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClassBadgeView({ badge }: { badge: ClassBadge }) {
  if (badge.type === 'booked') {
    return (
      <span className="bk-tag bk-tag--booked">
        <BookedCheck />
        <span>Booked</span>
      </span>
    );
  }
  if (badge.type === 'spaces') {
    return (
      <span className="bk-tag bk-tag--spaces">
        <img src={fireIcon} alt="" className="bk-tag__flame" aria-hidden />
        <span>{badge.count} spaces left</span>
      </span>
    );
  }
  return <span className="bk-tag bk-tag--full">Class full</span>;
}

function ClassRow({ title, subtitle, badge, dimmed }: ClassRowData) {
  return (
    <div className={`bk-row${dimmed ? ' bk-row--dimmed' : ''}${badge ? ' bk-row--has-badge' : ''}`}>
      <div className="bk-row__inner">
        <div className="bk-row__text">
          <span className="bk-row__title">{title}</span>
          <span className="bk-row__subtitle">{subtitle}</span>
        </div>
      </div>
      {badge && (
        <div className="bk-row__badge">
          <ClassBadgeView badge={badge} />
        </div>
      )}
    </div>
  );
}

function TimeSection({ time, rows }: TimeSectionData) {
  return (
    <section className="bk-section">
      <h2 className="bk-section__time">{time}</h2>
      <div className="bk-section__list">
        {rows.map((row) => (
          <ClassRow key={`${time}-${row.title}`} {...row} />
        ))}
      </div>
    </section>
  );
}

export function BookingsScheduleHeader() {
  return (
    <header className="bk-header">
      <div className="bk-nav-material" aria-hidden />
      <IOSStatusBar variant="bk" />

      <div className="bk-nav">
        <button type="button" className="bk-back">
          <BackChevron />
          <span>Back</span>
        </button>
        <h1 className="bk-nav__title">All classes</h1>
      </div>

      <div className="bk-date-picker">
        <div className="bk-date-picker__weekdays">
          {WEEKDAYS.map((day, i) => (
            <span key={`${day}-${i}`} className="bk-weekday">
              {day}
            </span>
          ))}
        </div>
        <div className="bk-date-picker__dates">
          {BOOKING_DATES.map(({ value, state }) => (
            <div key={value} className="bk-date-cell">
              <span
                className={`bk-date${state === 'selected' ? ' bk-date--selected' : ''}${state === 'past' ? ' bk-date--past' : ''}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export function BookingsScheduleBody() {
  return (
    <>
      <p className="bk-date-label">Today - 3 April</p>
      <div className="bk-list">
        {BOOKING_SCHEDULE.map((section) => (
          <TimeSection key={section.time} {...section} />
        ))}
      </div>
    </>
  );
}

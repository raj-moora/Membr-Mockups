/**
 * BookingsScreen — "All classes" schedule list ported from Figma node 5370:32616.
 *
 * Brand tokens on .bk-screen: --bk-brand-bg, --bk-brand-text, --bk-text-on-brand
 * (swap via .bk-screen--dark).
 */

import type { PreviewMode } from '../../types';
import cellularConnection from '../../assets/cellular_connection.svg';
import wifi from '../../assets/wifi.svg';
import battery from '../../assets/battery.svg';

type ClassBadge =
  | { type: 'booked' }
  | { type: 'spaces'; count: number }
  | { type: 'full' };

interface ClassRowData {
  title: string;
  subtitle: string;
  badge?: ClassBadge;
  dimmed?: boolean;
}

interface TimeSectionData {
  time: string;
  rows: ClassRowData[];
}

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

const DATES: { value: number; state: 'past' | 'selected' | 'future' }[] = [
  { value: 30, state: 'past' },
  { value: 1, state: 'past' },
  { value: 2, state: 'past' },
  { value: 3, state: 'selected' },
  { value: 4, state: 'future' },
  { value: 5, state: 'future' },
  { value: 6, state: 'future' },
];

const SCHEDULE: TimeSectionData[] = [
  {
    time: '10 am',
    rows: [
      { title: 'Weight lifting', subtitle: '45 mins, Adam West' },
      { title: 'Stretch', subtitle: '45 mins, John Sega', badge: { type: 'booked' } },
      { title: 'Yoga', subtitle: '45 mins, Sarah Bright', badge: { type: 'spaces', count: 2 } },
    ],
  },
  {
    time: '10:30 am',
    rows: [
      {
        title: 'Weight lifting',
        subtitle: '45 mins, Emma Sanford',
        badge: { type: 'full' },
        dimmed: true,
      },
    ],
  },
  {
    time: '11 am',
    rows: [{ title: 'Meet the team', subtitle: '30 mins, Marcus Knight' }],
  },
  {
    time: '12 pm',
    rows: [{ title: 'Meditation', subtitle: '1 hr 45 mins, Camilla Walker' }],
  },
  {
    time: '1 pm',
    rows: [{ title: 'Weight lifting', subtitle: '45 mins, Adam West' }],
  },
];

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

function FlameIcon() {
  return (
    <svg className="bk-tag__flame" width="11" height="14" viewBox="0 0 11 14" fill="currentColor" aria-hidden>
      <path d="M5.5 0C5.5 3.2 3.2 4.8 2 7.2 0.8 9.4 1.6 12 3.4 13.2 2.6 11.6 2.8 9.8 4 8.4 3 7.2 3.4 4.6 5.5 2.4V0ZM5.5 14C8.3 14 10.5 11.5 10.5 8.6 10.5 5.4 7.8 3.2 5.5 0 3.2 3.2 0.5 5.4 0.5 8.6 0.5 11.5 2.7 14 5.5 14Z" />
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
        <FlameIcon />
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

interface BookingsScreenProps {
  mode: PreviewMode;
}

export function BookingsScreen({ mode }: BookingsScreenProps) {
  return (
    <div className={`bk-screen${mode === 'dark' ? ' bk-screen--dark' : ''}`}>
      <header className="bk-header">
        <div className="bk-nav-material" aria-hidden />
        <div className="bk-status-bar">
          <span className="bk-status-time">9:41</span>
          <div className="bk-status-island" />
          <div className="bk-status-icons">
            <img src={cellularConnection} alt="" className="bk-status-icon" />
            <img src={wifi} alt="" className="bk-status-icon" />
            <img src={battery} alt="" className="bk-status-icon bk-status-icon--battery" />
          </div>
        </div>

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
            {DATES.map(({ value, state }) => (
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

      <p className="bk-date-label">Today - 3 April</p>

      <div className="bk-list">
        {SCHEDULE.map((section) => (
          <TimeSection key={section.time} {...section} />
        ))}
      </div>

      <div className="bk-home-indicator" aria-hidden>
        <span className="bk-home-indicator__pill" />
      </div>
    </div>
  );
}

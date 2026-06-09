/**
 * HomepageScreenAndroid — Figma 8457:62780 (Homepage [Android]).
 * Colors: Material 3 tokens via --md-* (materialThemeEngine).
 * Exception: .ahp-gradient uses iOS brand palette (--brand-bg-*) in android-screens.css.
 */

import type { PreviewMode } from '../../../types';
import androidHomeAvatar from '../../../assets/android_home_avatar.png';
import androidSearchActivity from '../../../assets/android_search_activity.svg';
import androidChevronRight from '../../../assets/android_chevron_right.svg';
import androidSchedule from '../../../assets/android_schedule.svg';
import androidSchedulePrimary from '../../../assets/android_schedule_primary.svg';
import {
  ANDROID_HOMEPAGE_DAYS,
  HOMEPAGE_NEXT_CLASS,
  HOMEPAGE_WAITING_LIST,
  type AndroidHomeDayItem,
} from '../shared/mockData';
import { AndroidStatusBar } from './AndroidStatusBar';

interface WaitingCardProps {
  className: string;
  time: string;
  message: string;
}

function NextClassCard() {
  const next = HOMEPAGE_NEXT_CLASS;
  return (
    <article className="ahp-next-class-card">
      <div className="ahp-next-class-card__top">
        <div className="ahp-next-class-card__event">
          <p className="ahp-next-class-card__day">{next.dayLabel}</p>
          <p className="ahp-next-class-card__time">{next.time}</p>
        </div>
        <p className="ahp-next-class-card__location">{next.location}</p>
      </div>
      <hr className="ahp-next-class-card__divider" />
      <div className="ahp-next-class-card__body">
        <div className="ahp-next-class-card__details">
          <p className="ahp-next-class-card__class-name">{next.className}</p>
          <p className="ahp-next-class-card__instructor">with {next.instructor}</p>
        </div>
        <div className="ahp-next-class-card__avatar" aria-hidden>
          <span className="ahp-next-class-card__avatar-initials">{next.instructorInitials}</span>
        </div>
      </div>
      <div className="ahp-next-class-card__tag">
        <img src={androidSchedule} alt="" className="ahp-next-class-card__tag-icon" />
        <span className="ahp-next-class-card__tag-label">{next.startsInLabelAndroid}</span>
      </div>
    </article>
  );
}

function WaitingCard({ className: gymClass, time, message }: WaitingCardProps) {
  return (
    <article className="ahp-waiting-card">
      <div className="ahp-waiting-card__header">
        <div className="ahp-waiting-card__titles">
          <p className="ahp-waiting-card__class">{gymClass}</p>
          <p className="ahp-waiting-card__time">{time}</p>
        </div>
        <span className="ahp-waiting-card__tag">Waiting</span>
      </div>
      <p className="ahp-waiting-card__message">{message}</p>
    </article>
  );
}

function DayItem({ day, date, variant }: AndroidHomeDayItem) {
  if (variant === 'more') {
    return (
      <div className="ahp-day ahp-day--more">
        <button type="button" className="ahp-day__more-btn">
          <span className="ahp-day__more-label">More</span>
          <img src={androidChevronRight} alt="" className="ahp-day__more-icon" />
        </button>
      </div>
    );
  }

  const dayClass =
    variant === 'disabled'
      ? ' ahp-day--disabled'
      : variant === 'booked'
        ? ' ahp-day--booked'
        : '';

  return (
    <div className={`ahp-day${dayClass}`}>
      <div className="ahp-day__text">
        <p className="ahp-day__name">{day}</p>
        {date && <p className="ahp-day__date">{date}</p>}
      </div>
      <div
        className={`ahp-day__status${variant === 'booked' ? ' ahp-day__status--booked' : ''}`}
      >
        {variant === 'booked' && (
          <>
            <span className="ahp-day__status-shape" aria-hidden />
            <img
              src={androidSchedulePrimary}
              alt=""
              className="ahp-day__status-icon ahp-day__status-icon--schedule"
            />
          </>
        )}
        {variant === 'disabled' && (
          <img src={androidSearchActivity} alt="" className="ahp-day__status-icon" />
        )}
      </div>
    </div>
  );
}

interface HomepageScreenAndroidProps {
  mode: PreviewMode;
}

export function HomepageScreenAndroid({ mode }: HomepageScreenAndroidProps) {
  return (
    <div className={`ahp-screen${mode === 'dark' ? ' ahp-screen--dark' : ''}`}>
      <div className="ahp-gradient" aria-hidden />

      <header className="ahp-header">
        <AndroidStatusBar />

        <div className="ahp-app-bar">
          <div className="ahp-app-bar__leading" aria-hidden />
          <h1 className="ahp-app-bar__title">Home</h1>
          <div className="ahp-avatar" aria-hidden>
            <img src={androidHomeAvatar} alt="" className="ahp-avatar__img" />
          </div>
        </div>
      </header>

      <main className="ahp-main">
        <section className="ahp-section ahp-section--next-class">
          <h2 className="ahp-section__title">Your next class</h2>
          <NextClassCard />
        </section>

        <section className="ahp-section ahp-section--waiting">
          <h2 className="ahp-section__title">You&apos;re on the waiting list</h2>
          <div className="ahp-waiting-list">
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

        <section className="ahp-section ahp-section--browse">
          <h2 className="ahp-section__title">Browse classes</h2>
          <div className="ahp-day-strip">
            {ANDROID_HOMEPAGE_DAYS.map((item, index) => (
              <DayItem key={`${item.variant}-${item.day}-${item.date ?? index}`} {...item} />
            ))}
          </div>
          <div className="ahp-section__spacer" aria-hidden />
          <button type="button" className="ahp-schedule-btn">
            Show full schedule
          </button>
        </section>
      </main>

      <div className="ahp-fab-wrap">
        <button type="button" className="ahp-fab" aria-label="Show pass">
          <span className="material-symbols-rounded ahp-fab__icon" aria-hidden>
            qr_code
          </span>
          <span className="ahp-fab__label">Show pass</span>
        </button>
      </div>

      <div className="ahp-nav-bar" aria-hidden>
        <span className="ahp-nav-bar__handle" />
      </div>
    </div>
  );
}

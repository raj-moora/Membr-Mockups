/**
 * ClassPreviewScreen — bookings list with class preview bottom sheet (Figma 5338:4709).
 *
 * Brand tokens on .bk-screen: --bk-brand-bg, --bk-brand-text, --bk-text-on-brand
 * Sheet tokens on .cp-sheet: --cp-brand-bg, --cp-text-on-brand
 */

import type { CSSProperties } from 'react';
import type { PreviewMode } from '../../types';
import classPreviewAvatar from '../../assets/class_preview_avatar.png';
import fireIcon from '../../assets/fire_icon.svg';
import calendarAddIcon from '../../assets/calender_add.svg';
import { CLASS_PREVIEW_SHEET } from './shared/mockData';
import { BookingsScheduleBody, BookingsScheduleHeader } from './shared/bookings/BookingsSchedule';

function RoomDetailIcon() {
  return (
    <svg className="cp-detail__icon cp-detail__icon--room" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path
        d="M5.74219 12.6055H6.86328V7.66309C6.86328 7.40788 6.93848 7.21191 7.08887 7.0752C7.23926 6.93848 7.44661 6.87012 7.71094 6.87012H12.5986V5.74902H7.69043C7.07975 5.74902 6.60124 5.91309 6.25488 6.24121C5.91309 6.56934 5.74219 7.02507 5.74219 7.6084V12.6055ZM2.15332 12.5986C1.43783 12.5986 0.900065 12.4209 0.540039 12.0654C0.180013 11.71 0 11.1813 0 10.4795V2.12598C0 1.4196 0.180013 0.888672 0.540039 0.533203C0.900065 0.177734 1.43783 0 2.15332 0H10.4453C11.1654 0 11.7031 0.180013 12.0586 0.540039C12.4186 0.895508 12.5986 1.42415 12.5986 2.12598V10.4795C12.5986 11.1813 12.4186 11.71 12.0586 12.0654C11.7031 12.4209 11.1654 12.5986 10.4453 12.5986H2.15332Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PeopleDetailIcon() {
  return (
    <svg className="cp-detail__icon cp-detail__icon--people" viewBox="0 0 19 13" fill="none" aria-hidden>
      <path
        d="M8.59277 12.291C8.05501 12.291 7.67676 12.2135 7.45801 12.0586C7.23926 11.9082 7.12988 11.6826 7.12988 11.3818C7.12988 10.9398 7.26204 10.4772 7.52637 9.99414C7.79069 9.50651 8.1735 9.05078 8.6748 8.62695C9.18066 8.19857 9.78678 7.85221 10.4932 7.58789C11.2041 7.31901 12.0016 7.18457 12.8857 7.18457C13.7744 7.18457 14.5719 7.31901 15.2783 7.58789C15.9893 7.85221 16.5931 8.19857 17.0898 8.62695C17.5911 9.05078 17.974 9.50651 18.2383 9.99414C18.5072 10.4772 18.6416 10.9398 18.6416 11.3818C18.6416 11.6826 18.5322 11.9082 18.3135 12.0586C18.0947 12.2135 17.7142 12.291 17.1719 12.291H8.59277ZM12.8926 5.96094C12.3958 5.96094 11.9401 5.82878 11.5254 5.56445C11.1107 5.29557 10.778 4.93555 10.5273 4.48438C10.2767 4.02865 10.1514 3.51823 10.1514 2.95312C10.1514 2.39714 10.2767 1.89583 10.5273 1.44922C10.7826 1.0026 11.1175 0.649414 11.5322 0.389648C11.9469 0.129883 12.4004 0 12.8926 0C13.3802 0 13.8314 0.127604 14.2461 0.382812C14.6608 0.638021 14.9935 0.988932 15.2441 1.43555C15.4948 1.8776 15.6201 2.37891 15.6201 2.93945C15.6201 3.50911 15.4948 4.02181 15.2441 4.47754C14.9935 4.93327 14.6608 5.29557 14.2461 5.56445C13.8314 5.82878 13.3802 5.96094 12.8926 5.96094ZM1.20996 12.291C0.772461 12.291 0.460286 12.2067 0.273438 12.0381C0.0911458 11.874 0 11.6348 0 11.3203C0 10.8509 0.116211 10.3724 0.348633 9.88477C0.581055 9.39714 0.913737 8.94824 1.34668 8.53809C1.78418 8.12793 2.31055 7.79753 2.92578 7.54688C3.54557 7.29167 4.24056 7.16406 5.01074 7.16406C5.64876 7.16406 6.21387 7.24837 6.70605 7.41699C7.2028 7.58105 7.64258 7.78841 8.02539 8.03906C7.65169 8.33073 7.32357 8.66569 7.04102 9.04395C6.76302 9.41764 6.54427 9.80501 6.38477 10.2061C6.22526 10.6071 6.14095 10.9899 6.13184 11.3545C6.12728 11.7191 6.21387 12.0312 6.3916 12.291H1.20996ZM5.01074 6.11816C4.58691 6.11816 4.19271 6.00195 3.82812 5.76953C3.4681 5.53711 3.17871 5.22266 2.95996 4.82617C2.74121 4.42969 2.63184 3.98763 2.63184 3.5C2.63184 3.01237 2.74121 2.57487 2.95996 2.1875C3.18327 1.80013 3.47493 1.49479 3.83496 1.27148C4.19954 1.04362 4.59147 0.929688 5.01074 0.929688C5.43457 0.929688 5.8265 1.04134 6.18652 1.26465C6.55111 1.4834 6.84277 1.78646 7.06152 2.17383C7.28483 2.55664 7.39648 2.99414 7.39648 3.48633C7.39648 3.97852 7.28711 4.42513 7.06836 4.82617C6.84961 5.22266 6.55794 5.53711 6.19336 5.76953C5.83333 6.00195 5.43913 6.11816 5.01074 6.11816Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ClassPreviewSheet() {
  const sheet = CLASS_PREVIEW_SHEET;
  return (
    <div className="cp-sheet" role="dialog" aria-label="Class preview">
      <div className="cp-sheet__material" aria-hidden />
      <div className="cp-sheet__grabber" aria-hidden />

      <div className="cp-sheet__main">
        <header className="cp-sheet__header">
          <div className="cp-sheet__title-block">
            <h2 className="cp-sheet__title">{sheet.title}</h2>
            <p className="cp-sheet__meta">{sheet.instructor}</p>
            <p className="cp-sheet__meta">{sheet.datetime}</p>
            <p className="cp-sheet__meta">{sheet.duration}</p>
          </div>
          <div className="cp-sheet__avatar">
            <span className="cp-sheet__avatar-initials" aria-hidden>
              {sheet.initials}
            </span>
            <img src={classPreviewAvatar} alt="" className="cp-sheet__avatar-photo" />
          </div>
        </header>

        <div className="cp-sheet__tag">
          <img src={fireIcon} alt="" className="bk-tag__flame" aria-hidden />
          <span>{sheet.spacesLabel}</span>
        </div>

        <div className="cp-sheet__footer">
          <button
            type="button"
            className="cp-book-btn"
            style={{ '--cp-book-btn-icon': `url(${calendarAddIcon})` } as CSSProperties}
          >
            <span className="cp-book-btn__icon" aria-hidden />
            <span>Book class</span>
          </button>

          <div className="cp-sheet__details">
            <div className="cp-detail">
              <span className="cp-detail__label">Location</span>
              <div className="cp-detail__value">
                <RoomDetailIcon />
                <span>{sheet.location}</span>
              </div>
            </div>
            <div className="cp-detail cp-detail--with-divider">
              <span className="cp-detail__label">Attendees</span>
              <div className="cp-detail__value">
                <PeopleDetailIcon />
                <span>{sheet.attendees}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cp-sheet__home-indicator" aria-hidden>
        <span className="cp-sheet__home-indicator-pill" />
      </div>
    </div>
  );
}

interface ClassPreviewScreenProps {
  mode: PreviewMode;
}

export function ClassPreviewScreen({ mode }: ClassPreviewScreenProps) {
  return (
    <div className={`bk-screen bk-screen--class-preview${mode === 'dark' ? ' bk-screen--dark' : ''}`}>
      <BookingsScheduleHeader />
      <BookingsScheduleBody />
      <div className="cp-scrim" aria-hidden />
      <ClassPreviewSheet />
    </div>
  );
}

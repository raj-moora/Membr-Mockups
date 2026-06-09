/**
 * BookingsScreen — "All classes" schedule list ported from Figma node 5370:32616.
 *
 * Brand tokens on .bk-screen: --bk-brand-bg, --bk-brand-text, --bk-text-on-brand
 * (swap via .bk-screen--dark).
 */

import type { PreviewMode } from '../../types';
import { IOSHomeIndicator } from './shared/IOSHomeIndicator';
import { BookingsScheduleBody, BookingsScheduleHeader } from './shared/bookings/BookingsSchedule';

interface BookingsScreenProps {
  mode: PreviewMode;
}

export function BookingsScreen({ mode }: BookingsScreenProps) {
  return (
    <div className={`bk-screen${mode === 'dark' ? ' bk-screen--dark' : ''}`}>
      <BookingsScheduleHeader />
      <BookingsScheduleBody />
      <IOSHomeIndicator variant="bk" />
    </div>
  );
}

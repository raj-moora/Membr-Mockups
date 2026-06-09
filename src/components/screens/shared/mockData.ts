export type ClassBadge =
  | { type: 'booked' }
  | { type: 'spaces'; count: number }
  | { type: 'full' };

export interface ClassRowData {
  title: string;
  subtitle: string;
  badge?: ClassBadge;
  dimmed?: boolean;
}

export interface TimeSectionData {
  time: string;
  rows: ClassRowData[];
}

export const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export const BOOKING_DATES: { value: number; state: 'past' | 'selected' | 'future' }[] = [
  { value: 30, state: 'past' },
  { value: 1, state: 'past' },
  { value: 2, state: 'past' },
  { value: 3, state: 'selected' },
  { value: 4, state: 'future' },
  { value: 5, state: 'future' },
  { value: 6, state: 'future' },
];

/** Android bookings schedule (Figma 5659:34054). */
export const ANDROID_BOOKING_SCHEDULE: TimeSectionData[] = [
  {
    time: '10 am',
    rows: [
      { title: 'Weight lifting', subtitle: '45 mins, Adam West' },
      { title: 'Weight lifting', subtitle: '45 mins, Adam West', badge: { type: 'spaces', count: 2 } },
      { title: 'Weight lifting', subtitle: '45 mins, Adam West', badge: { type: 'spaces', count: 2 } },
    ],
  },
  {
    time: '10:30 am',
    rows: [
      {
        title: 'Weight lifting',
        subtitle: '45 mins, Adam West',
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
    rows: [
      { title: 'Weight lifting', subtitle: '45 mins, Adam West' },
      { title: 'Group cycle', subtitle: '45 mins, John Sega' },
      { title: 'Yoga', subtitle: '45 mins, Sarah Bright' },
    ],
  },
  {
    time: '3 pm',
    rows: [
      { title: 'Weight lifting', subtitle: '45 mins, Adam West' },
      { title: 'Yoga', subtitle: '50 mins, Sarah Bright' },
    ],
  },
  {
    time: '3:15 pm',
    rows: [{ title: 'Meditation', subtitle: '1 hr 45 mins, Camilla Walker' }],
  },
  {
    time: '5 pm',
    rows: [
      { title: 'Weight lifting', subtitle: '45 mins, Adam West' },
      { title: 'Yoga', subtitle: '50 mins, Sarah Bright' },
    ],
  },
];

export const BOOKING_SCHEDULE: TimeSectionData[] = [
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

export type HomeDayStatus = 'booked' | 'empty' | 'past';

export interface HomeDayItem {
  day: string;
  date: string;
  status: HomeDayStatus;
}

export const HOMEPAGE_DAY_ITEMS: HomeDayItem[] = [
  { day: 'Today', date: '3rd Apr', status: 'booked' },
  { day: 'Fri', date: '4th Apr', status: 'empty' },
  { day: 'Sat', date: '5th Apr', status: 'empty' },
  { day: 'Sun', date: '6th Apr', status: 'past' },
  { day: 'Mon', date: '7th Apr', status: 'empty' },
];

export const HOMEPAGE_NEXT_CLASS = {
  dayLabel: 'This morning',
  time: '7:30 am',
  location: 'Fitness Studio A',
  className: 'Spin Express',
  instructor: 'Jane Doe',
  instructorInitials: 'JD',
  startsInLabel: 'Starts in 25 minutes',
  startsInLabelAndroid: 'Starts in 25 mins',
} as const;

export interface WaitingListCard {
  className: string;
  time: string;
  message: string;
}

export const HOMEPAGE_WAITING_LIST: WaitingListCard[] = [
  {
    className: 'Stretch',
    time: '10:00 am, Thursday 3 April',
    message: "You're next in line.",
  },
  {
    className: 'Weight lifting',
    time: '12:30 pm, Thursday 3 April',
    message: "You're in position 2.",
  },
];

export const MEMBER_PASS_MOCK = {
  pin: '775489',
  name: 'Jane Doe',
  initials: 'JD',
  joined: 'Joined June 2020',
  iosGymName: 'Xplor Gyms',
  androidGymName: 'Pulse Gyms',
} as const;

export const CLASS_PREVIEW_SHEET = {
  title: 'Stretch',
  instructor: 'John Sega',
  datetime: '10:00 am, Thursday 3 April',
  duration: '45 minutes',
  initials: 'JS',
  spacesLabel: 'Only 2 spaces left',
  location: 'Studio A',
  attendees: '18 / 20',
} as const;

/** Android homepage day strip (Figma 8457:48376 / 9051:28556). */
export type AndroidHomeDayVariant = 'default' | 'disabled' | 'booked' | 'more';

export interface AndroidHomeDayItem {
  day: string;
  date?: string;
  variant: AndroidHomeDayVariant;
}

export const ANDROID_HOMEPAGE_DAYS: AndroidHomeDayItem[] = [
  { day: 'Today', date: '22nd Sept', variant: 'booked' },
  { day: 'Thu', date: '8th Jul', variant: 'default' },
  { day: 'Fri', date: '23rd Jul', variant: 'default' },
  { day: 'Sat', date: '12th Jul', variant: 'booked' },
  { day: 'Sun', date: '13th Jul', variant: 'disabled' },
  { day: 'Mon', date: '14th Jul', variant: 'default' },
  { day: 'Tue', date: '15th Jul', variant: 'default' },
  { day: 'Wed', date: '16th Jul', variant: 'default' },
  { day: 'Thu', date: '17th Jul', variant: 'default' },
  { day: 'Fri', date: '18th Jul', variant: 'default' },
  { day: 'Sat', date: '19th Jul', variant: 'default' },
  { day: 'Sun', date: '20th Jul', variant: 'default' },
  { day: 'Mon', date: '21st Jul', variant: 'default' },
  { day: '', date: '21st Jul', variant: 'default' },
  { day: '', variant: 'more' },
];

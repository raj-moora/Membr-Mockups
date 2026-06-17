import type { Platform, PreviewMode } from '../types';

export type ExportOptionId =
  | 'ios-light'
  | 'ios-dark'
  | 'android-light'
  | 'android-dark'
  | 'ios-palette'
  | 'android-colors';

export type ExportOptionKind = 'screenshot' | 'ios-palette' | 'android-colors';

interface ExportOptionBase {
  id: ExportOptionId;
  label: string;
}

export interface ScreenshotExportOption extends ExportOptionBase {
  kind: 'screenshot';
  mode: PreviewMode;
  platform: Platform;
  filename: string;
}

export interface FileExportOption extends ExportOptionBase {
  kind: 'ios-palette' | 'android-colors';
}

export type ExportOption = ScreenshotExportOption | FileExportOption;

export const EXPORT_OPTIONS: ExportOption[] = [
  {
    id: 'ios-light',
    label: 'iOS light screenshot',
    kind: 'screenshot',
    mode: 'light',
    platform: 'ios',
    filename: 'membr-mockups-ios-light.png',
  },
  {
    id: 'ios-dark',
    label: 'iOS dark screenshot',
    kind: 'screenshot',
    mode: 'dark',
    platform: 'ios',
    filename: 'membr-mockups-ios-dark.png',
  },
  {
    id: 'android-light',
    label: 'Android light screenshot',
    kind: 'screenshot',
    mode: 'light',
    platform: 'android',
    filename: 'membr-mockups-android-light.png',
  },
  {
    id: 'android-dark',
    label: 'Android dark screenshot',
    kind: 'screenshot',
    mode: 'dark',
    platform: 'android',
    filename: 'membr-mockups-android-dark.png',
  },
  {
    id: 'ios-palette',
    label: 'iOS palette JSON',
    kind: 'ios-palette',
  },
  {
    id: 'android-colors',
    label: 'Android Colors.kt',
    kind: 'android-colors',
  },
];

export const DEFAULT_EXPORT_SELECTION: ExportOptionId[] = EXPORT_OPTIONS.map(
  (option) => option.id,
);

export function isScreenshotOption(
  option: ExportOption,
): option is ScreenshotExportOption {
  return option.kind === 'screenshot';
}

import type { MaterialSchemeColors, MaterialTheme } from '../engine/materialThemeEngine';

const COLOR_SCHEME_KEYS: (keyof MaterialSchemeColors)[] = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'surfaceContainer',
  'surfaceContainerLow',
  'outline',
  'outlineVariant',
  'error',
  'onError',
];

function hexToComposeColor(hex: string): string {
  const normalized = hex.replace('#', '').toUpperCase();
  return `Color(0xFF${normalized})`;
}

function formatColorScheme(scheme: MaterialSchemeColors, indent: string): string {
  return COLOR_SCHEME_KEYS.map(
    (key) => `${indent}${key} = ${hexToComposeColor(scheme[key])},`,
  ).join('\n');
}

function toExportFilename(gymName: string): string {
  const sanitized = gymName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  const base = sanitized || 'gym';
  return `${base}-Colors.kt`;
}

export function toColorsKt(materialTheme: MaterialTheme): string {
  return `package com.example.ui.theme

import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color

val LightColorScheme = lightColorScheme(
${formatColorScheme(materialTheme.light, '    ')}
)

val DarkColorScheme = darkColorScheme(
${formatColorScheme(materialTheme.dark, '    ')}
)
`;
}

export function downloadAndroidColorsKt(materialTheme: MaterialTheme, gymName: string): void {
  const kt = toColorsKt(materialTheme);
  const blob = new Blob([kt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = toExportFilename(gymName);
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

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

function toThemeName(gymName: string): string {
  const words = gymName
    .trim()
    .replace(/[/\\:*?"<>|]/g, '')
    .split(/[\s_]+/)
    .filter(Boolean);

  const pascal =
    words.length > 0
      ? words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
      : 'Gym';

  return `${pascal}Theme`;
}

function toExportFilename(gymName: string): string {
  const sanitized = gymName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  const base = sanitized || 'gym';
  return `${base}-Theme.kt`;
}

export function toThemeKt(materialTheme: MaterialTheme, gymName: string): string {
  const themeName = toThemeName(gymName);

  return `package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
${formatColorScheme(materialTheme.light, '    ')}
)

private val DarkColorScheme = darkColorScheme(
${formatColorScheme(materialTheme.dark, '    ')}
)

@Composable
fun ${themeName}(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content,
    )
}
`;
}

export function downloadAndroidThemeKt(materialTheme: MaterialTheme, gymName: string): void {
  const kt = toThemeKt(materialTheme, gymName);
  const blob = new Blob([kt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = toExportFilename(gymName);
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

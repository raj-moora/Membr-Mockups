import { describe, it, expect } from 'vitest';
import {
  deriveMaterialTheme,
  MATERIAL_FALLBACK_SEED,
  MATERIAL_PALETTE_CHIPS,
} from './materialThemeEngine';

const HEX_REGEX = /^#[0-9A-F]{6}$/;

describe('deriveMaterialTheme', () => {
  it('returns valid hex for all roles for a brand seed', () => {
    const theme = deriveMaterialTheme('#6923f4');
    for (const scheme of [theme.light, theme.dark]) {
      for (const key of Object.keys(scheme) as (keyof typeof scheme)[]) {
        expect(scheme[key]).toMatch(HEX_REGEX);
      }
    }
  });

  it('uses fallback seed for invalid input', () => {
    const invalid = deriveMaterialTheme('not-a-color');
    const fallback = deriveMaterialTheme(MATERIAL_FALLBACK_SEED);
    expect(invalid.light.primary).toBe(fallback.light.primary);
    expect(invalid.dark.surface).toBe(fallback.dark.surface);
  });

  it('accepts hex without hash', () => {
    const withHash = deriveMaterialTheme('#74FBD0');
    const withoutHash = deriveMaterialTheme('74FBD0');
    expect(withoutHash.light.primary).toBe(withHash.light.primary);
  });

  it('exports palette chip manifest with unique labels', () => {
    const labels = MATERIAL_PALETTE_CHIPS.map((c) => c.label);
    expect(labels.length).toBe(16);
    expect(new Set(labels).size).toBe(16);
  });
});

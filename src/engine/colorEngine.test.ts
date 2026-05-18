import { describe, it, expect } from 'vitest';
import chroma from 'chroma-js';
import { derivePalette } from './colorEngine';

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

describe('derivePalette', () => {
  // ── Test 1: #000000 returns hardcoded special-case values ─────────────────
  it('returns hardcoded values for #000000 without running the algorithm', () => {
    const palette = derivePalette('#000000');
    expect(palette.brandBgLight).toBe('#F2F2F2');
    expect(palette.textOnBrandLight).toBe('#000000');
    expect(palette.brandTextLight).toBe('#000000');
    expect(palette.brandBgDark).toBe('#1A1A1A');
    expect(palette.textOnBrandDark).toBe('#FFFFFF');
    expect(palette.brandTextDark).toBe('#FFFFFF');
  });

  // ── Test 2: input that already passes is returned unchanged ──────────────
  it('returns brand-text-light unchanged when it already meets the 4.5:1 ratio on white', () => {
    // #000000 is the special case, so use a very dark color that clearly passes
    const darkColor = '#1a1a2e';
    const palette = derivePalette(darkColor);
    // brand-text-light must pass 4.5:1 against white
    const ratio = chroma.contrast(palette.brandTextLight, '#FFFFFF');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
    // When input passes, the function should return it unchanged
    const inputRatio = chroma.contrast(darkColor, '#FFFFFF');
    if (inputRatio >= 4.5) {
      expect(palette.brandTextLight.toLowerCase()).toBe(darkColor.toLowerCase());
    }
  });

  // ── Test 3: #74FBD0 — all 6 colors hit their target ratios ───────────────
  it('all 6 derived colors for #74FBD0 hit their respective target ratios', () => {
    const palette = derivePalette('#74FBD0');

    // Light mode checks
    expect(chroma.contrast(palette.textOnBrandLight, palette.brandBgLight))
      .toBeGreaterThanOrEqual(6.5);
    expect(chroma.contrast(palette.brandTextLight, '#FFFFFF'))
      .toBeGreaterThanOrEqual(4.5);

    // Dark mode checks
    expect(chroma.contrast(palette.textOnBrandDark, palette.brandBgDark))
      .toBeGreaterThanOrEqual(6.5);
    expect(chroma.contrast(palette.brandTextDark, '#1C1C1E'))
      .toBeGreaterThanOrEqual(4.5);
  });

  // ── Test 4: achromatic/gray input — no NaN, all outputs are valid hex ─────
  it('handles achromatic gray input (#808080) without throwing or returning NaN', () => {
    const palette = derivePalette('#808080');
    const allColors = [
      palette.brandBgLight,
      palette.textOnBrandLight,
      palette.brandTextLight,
      palette.brandBgDark,
      palette.textOnBrandDark,
      palette.brandTextDark,
    ];
    for (const color of allColors) {
      expect(color).toMatch(HEX_REGEX);
      // Ensure no NaN leaked into the color via chroma
      const [r, g, b] = chroma(color).rgb();
      expect(Number.isNaN(r)).toBe(false);
      expect(Number.isNaN(g)).toBe(false);
      expect(Number.isNaN(b)).toBe(false);
    }
  });
});

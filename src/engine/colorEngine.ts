import chroma from 'chroma-js';

export interface BrandPalette {
  brandBgLight: string;
  textOnBrandLight: string;
  brandTextLight: string;
  brandBgDark: string;
  textOnBrandDark: string;
  brandTextDark: string;
}

// Special-case hardcoded values for #000000 — algorithm would produce poor results
const BLACK_PALETTE: BrandPalette = {
  brandBgLight: '#F2F2F2',
  textOnBrandLight: '#000000',
  brandTextLight: '#000000',
  brandBgDark: '#1A1A1A',
  textOnBrandDark: '#FFFFFF',
  brandTextDark: '#FFFFFF',
};

// Light and dark surfaces against which text contrast is measured
const SURFACE_LIGHT = '#FFFFFF';
const SURFACE_DARK = '#1C1C1E';

// Target contrast ratios
const RATIO_ON_BRAND = 6.5; // text-on-brand vs brand-bg
const RATIO_BRAND_TEXT = 4.5; // brand-text vs surface

/**
 * Sweep lightness 0.05 → 0.95 in 0.01 steps and pick the passing candidate
 * whose ratio is closest to targetRatio (without going below it).
 * Falls back to max-contrast color if nothing passes.
 * Input already passing → returned unchanged.
 */
function findAccessibleTint(
  color: string,
  surface: string,
  targetRatio: number,
): string {
  const base = chroma(color);
  if (chroma.contrast(base, surface) >= targetRatio) {
    return color;
  }

  let best: chroma.Color | null = null;
  let bestDelta = Infinity;

  for (let l = 5; l <= 95; l++) {
    const lightness = l / 100;
    let candidate: chroma.Color;
    try {
      // Use set with hsl.l — safe even when hue is NaN (achromatic)
      candidate = base.set('hsl.l', lightness);
    } catch {
      continue;
    }
    const ratio = chroma.contrast(candidate, surface);
    if (ratio >= targetRatio) {
      const delta = ratio - targetRatio;
      if (delta < bestDelta) {
        best = candidate;
        bestDelta = delta;
      }
    }
  }

  if (best) return best.hex();

  // Fallback: whichever pole gives higher contrast
  const contrastWhite = chroma.contrast(color, '#FFFFFF');
  const contrastBlack = chroma.contrast(color, '#000000');
  return contrastBlack >= contrastWhite ? '#000000' : '#FFFFFF';
}

/**
 * HSP perceived brightness: sqrt(0.299*R² + 0.587*G² + 0.114*B²), range 0–255.
 */
function hspBrightness(color: chroma.Color): number {
  const [r, g, b] = color.rgb();
  return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
}

/**
 * Darken a color by `fraction` of its HSP perceived brightness.
 * Result lightness is clamped to [minL, maxL].
 */
function darkenByHSP(
  color: chroma.Color,
  fraction: number,
  minL = 0.20,
  maxL = 1.00,
): string {
  const currentHSP = hspBrightness(color);
  const targetHSP = currentHSP * (1 - fraction);

  // Binary search over hsl lightness to match target HSP
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2;
    const candidate = color.set('hsl.l', mid);
    const candidateHSP = hspBrightness(candidate);
    if (candidateHSP > targetHSP) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  const rawL = (lo + hi) / 2;
  const clampedL = Math.max(minL, Math.min(maxL, rawL));
  return color.set('hsl.l', clampedL).hex();
}

/**
 * Derive a full accessible 6-color brand palette from a single primary hex.
 *
 * Light mode:
 *   brand-bg-light    — brand background; text-on-brand-light must hit 6.5:1 against it
 *   text-on-brand-light — text on brand bg; aims for 6.5:1 against brand-bg-light
 *   brand-text-light  — brand-colored text on white (#FFF); aims for 4.5:1
 *
 * Dark mode:
 *   brand-bg-dark     — brand bg darkened 30% HSP, lightness clamped 0.20–1.00
 *   text-on-brand-dark — text on dark brand bg; aims for 6.5:1 against brand-bg-dark
 *   brand-text-dark   — brand-colored text on #1C1C1E; seed darkened 18%, then tint sweep
 */
export function derivePalette(primaryHex: string): BrandPalette {
  const normalised = primaryHex.trim().toLowerCase();

  // Special case for black
  if (normalised === '#000000' || normalised === '#000') {
    return BLACK_PALETTE;
  }

  let base: chroma.Color;
  try {
    base = chroma(normalised);
  } catch {
    return BLACK_PALETTE;
  }

  // --- Light mode ---
  // brandBgLight: the primary itself — it IS the brand background color
  const brandBgLight = normalised;

  // textOnBrandLight: sweep primary's lightness to find a tint that achieves 6.5:1 against brandBgLight
  const textOnBrandLight = findAccessibleTint(normalised, brandBgLight, RATIO_ON_BRAND);

  // brandTextLight: sweep primary's lightness to find a tint that achieves 4.5:1 on white
  const brandTextLight = findAccessibleTint(normalised, SURFACE_LIGHT, RATIO_BRAND_TEXT);

  // --- Dark mode ---
  // brandBgDark: primary darkened by 30% HSP perceived brightness
  const brandBgDarkHex = darkenByHSP(base, 0.30, 0.20, 1.00);

  // textOnBrandDark: sweep primary's lightness to find a tint that achieves 6.5:1 against dark brand bg
  const textOnBrandDark = findAccessibleTint(normalised, brandBgDarkHex, RATIO_ON_BRAND);

  // brandTextDark: seed is primary darkened 18% HSP, then sweep to 4.5:1 against dark surface
  const brandTextDarkSeed = darkenByHSP(base, 0.18, 0.20, 1.00);
  const brandTextDark = findAccessibleTint(brandTextDarkSeed, SURFACE_DARK, RATIO_BRAND_TEXT);

  return {
    brandBgLight,
    textOnBrandLight,
    brandTextLight,
    brandBgDark: brandBgDarkHex,
    textOnBrandDark,
    brandTextDark,
  };
}

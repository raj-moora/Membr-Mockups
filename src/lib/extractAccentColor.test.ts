import { describe, it, expect } from 'vitest';
import { isNeutralOrExtreme, pickBrandColorSource } from './extractAccentColor';

describe('pickBrandColorSource', () => {
  it('prefers splash logo when both are uploaded', () => {
    expect(pickBrandColorSource('logo.png', 'icon.png')).toBe('logo.png');
  });

  it('uses app icon when only app icon is uploaded', () => {
    expect(pickBrandColorSource(null, 'icon.png')).toBe('icon.png');
  });

  it('returns null when no assets are uploaded', () => {
    expect(pickBrandColorSource(null, null)).toBeNull();
  });
});

describe('isNeutralOrExtreme', () => {
  it('flags black, white, and gray', () => {
    expect(isNeutralOrExtreme('#000000')).toBe(true);
    expect(isNeutralOrExtreme('#ffffff')).toBe(true);
    expect(isNeutralOrExtreme('#808080')).toBe(true);
  });

  it('allows saturated accent colors', () => {
    expect(isNeutralOrExtreme('#6923f4')).toBe(false);
    expect(isNeutralOrExtreme('#e63946')).toBe(false);
    expect(isNeutralOrExtreme('#2a9d8f')).toBe(false);
  });
});

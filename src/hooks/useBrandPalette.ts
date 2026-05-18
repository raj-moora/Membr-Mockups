import { useState, useEffect } from 'react';
import { derivePalette, type BrandPalette } from '../engine/colorEngine';
import { applyPaletteVars } from '../engine/cssVars';

const DEFAULT_PRIMARY = '#6923f4';

export function useBrandPalette() {
  const [primaryHex, setPrimaryHex] = useState<string>(DEFAULT_PRIMARY);
  const [palette, setPalette] = useState<BrandPalette>(() => derivePalette(DEFAULT_PRIMARY));

  useEffect(() => {
    const derived = derivePalette(primaryHex);
    setPalette(derived);
    applyPaletteVars(derived);
  }, [primaryHex]);

  // Apply on mount
  useEffect(() => {
    applyPaletteVars(derivePalette(DEFAULT_PRIMARY));
  }, []);

  return { primaryHex, setPrimaryHex, palette };
}

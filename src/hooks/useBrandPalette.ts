import { useState, useEffect } from 'react';
import { derivePalette, type BrandPalette } from '../engine/colorEngine';
import { applyPaletteVars } from '../engine/cssVars';
import { loadStoredPrimary, saveStoredPrimary } from '../lib/brandStorage';

const DEFAULT_PRIMARY = '#6923f4';

export function useBrandPalette() {
  const [primaryHex, setPrimaryHex] = useState<string>(() =>
    loadStoredPrimary(DEFAULT_PRIMARY),
  );
  const [palette, setPalette] = useState<BrandPalette>(() =>
    derivePalette(loadStoredPrimary(DEFAULT_PRIMARY)),
  );

  useEffect(() => {
    const derived = derivePalette(primaryHex);
    setPalette(derived);
    applyPaletteVars(derived);
    saveStoredPrimary(primaryHex);
  }, [primaryHex]);

  return { primaryHex, setPrimaryHex, palette };
}

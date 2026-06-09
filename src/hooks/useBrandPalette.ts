import { useLayoutEffect, useMemo, useState } from 'react';
import { derivePalette } from '../engine/colorEngine';
import { applyPaletteVars } from '../engine/cssVars';
import { loadStoredPrimary, saveStoredPrimary } from '../lib/brandStorage';

const DEFAULT_PRIMARY = '#6923f4';

export function useBrandPalette() {
  const [primaryHex, setPrimaryHex] = useState<string>(() =>
    loadStoredPrimary(DEFAULT_PRIMARY),
  );

  const palette = useMemo(() => derivePalette(primaryHex), [primaryHex]);

  useLayoutEffect(() => {
    applyPaletteVars(palette);
    saveStoredPrimary(primaryHex);
  }, [palette, primaryHex]);

  return { primaryHex, setPrimaryHex, palette };
}

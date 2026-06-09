import chroma from 'chroma-js';

interface PaletteChipProps {
  color: string;
  label: string;
  surface: string;
  showContrast?: boolean;
}

export function PaletteChip({
  color,
  label,
  surface,
  showContrast = true,
}: PaletteChipProps) {
  const ratio = chroma.contrast(color, surface);
  const passes = ratio >= 4.5;

  return (
    <div className="palette-chip">
      <div className="palette-chip__swatch" style={{ background: color }} />
      <div className="palette-chip__info">
        <span className="palette-chip__label">{label}</span>
        <span className="palette-chip__hex">{color.toUpperCase()}</span>
        {showContrast && (
          <span className={`palette-chip__badge ${passes ? 'palette-chip__badge--pass' : 'palette-chip__badge--fail'}`}>
            {ratio.toFixed(1)}:1 {passes ? 'AA' : '✗'}
          </span>
        )}
      </div>
    </div>
  );
}

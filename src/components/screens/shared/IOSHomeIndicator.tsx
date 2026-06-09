export type IOSHomeIndicatorVariant = 'sp' | 'shp' | 'bk';

interface IOSHomeIndicatorProps {
  variant: IOSHomeIndicatorVariant;
}

export function IOSHomeIndicator({ variant }: IOSHomeIndicatorProps) {
  return (
    <div className={`${variant}-home-indicator`} aria-hidden>
      <span className={`${variant}-home-indicator__pill`} />
    </div>
  );
}

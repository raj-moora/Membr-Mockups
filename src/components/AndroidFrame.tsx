import { useId, type ReactNode } from 'react';

interface AndroidFrameProps {
  label?: string;
  variant?: 'default' | 'splash';
  children: ReactNode;
}

/** Pixel-style frame (440 × 920) with 412 × 915 logical screen content scaled to fit. */
export function AndroidFrame({ label, variant = 'default', children }: AndroidFrameProps) {
  const cutoutMaskId = `android-bezel-cutout-${useId().replace(/:/g, '')}`;
  const frameClass =
    variant === 'splash' ? 'android-frame android-frame--splash' : 'android-frame';

  return (
    <div className="android-wrapper">
      {label && <p className="android-label">{label}</p>}
      <div className={frameClass}>
        <div className="android-screen">
          <div className="android-screen-content">{children}</div>
        </div>
        <svg
          className="android-frame-overlay"
          xmlns="http://www.w3.org/2000/svg"
          width="440"
          height="920"
          viewBox="0 0 440 920"
          fill="none"
          aria-hidden
        >
          <defs>
            <mask id={cutoutMaskId}>
              <rect width="440" height="920" fill="white" />
              <rect x="14" y="18" width="412" height="892" rx="36" fill="black" />
            </mask>
          </defs>
          <rect
            width="440"
            height="920"
            rx="48"
            className="android-frame-overlay__bezel"
            mask={`url(#${cutoutMaskId})`}
          />
          <circle cx="220" cy="36" r="5" className="android-frame-overlay__camera" />
        </svg>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import pixel9aFrame from '../assets/pixel9a_frame.png';

interface AndroidFrameProps {
  label?: string;
  variant?: 'default' | 'splash';
  children: ReactNode;
}

/** Pixel 9a frame asset (440 × 920) with 412 × 915 logical screen content scaled to fit. */
export function AndroidFrame({ label, variant = 'default', children }: AndroidFrameProps) {
  const frameClass =
    variant === 'splash' ? 'android-frame android-frame--splash' : 'android-frame';

  return (
    <div className="android-wrapper">
      {label && <p className="android-label">{label}</p>}
      <div className={frameClass}>
        <div className="android-screen">
          <div className="android-screen-content">{children}</div>
        </div>
        <img
          src={pixel9aFrame}
          alt=""
          className="android-frame-overlay"
          draggable={false}
        />
      </div>
    </div>
  );
}

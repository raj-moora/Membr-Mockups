import type { ReactNode } from 'react';
import iphone16Frame from '../assets/iphone16_frame.png';

interface IPhoneFrameProps {
  label?: string;
  variant?: 'default' | 'splash';
  children: ReactNode;
}

/** iPhone 16 Pro frame asset (450 × 920) with 393 × 852 logical screen content scaled to fit. */
export function IPhoneFrame({ label, variant = 'default', children }: IPhoneFrameProps) {
  const frameClass =
    variant === 'splash' ? 'iphone-frame iphone-frame--splash' : 'iphone-frame';

  return (
    <div className="iphone-wrapper">
      {label && <p className="iphone-label">{label}</p>}
      <div className={frameClass}>
        <div className="iphone-screen">
          <div className="iphone-screen-content">{children}</div>
        </div>
        <img
          src={iphone16Frame}
          alt=""
          className="iphone-frame-overlay"
          draggable={false}
        />
      </div>
    </div>
  );
}

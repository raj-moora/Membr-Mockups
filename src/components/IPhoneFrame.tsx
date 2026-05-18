import type { ReactNode } from 'react';

interface IPhoneFrameProps {
  label?: string;
  children: ReactNode;
}

/**
 * CSS-only iPhone frame (393 × 852px, 44px corner radius, Dynamic Island, home indicator).
 * The screen content renders inside the clipped content area.
 */
export function IPhoneFrame({ label, children }: IPhoneFrameProps) {
  return (
    <div className="iphone-wrapper">
      {label && <p className="iphone-label">{label}</p>}
      <div className="iphone-frame">
        {/* Dynamic Island */}
        <div className="iphone-dynamic-island" />
        {/* Screen content */}
        <div className="iphone-screen">
          {children}
        </div>
        {/* Home indicator */}
        <div className="iphone-home-indicator">
          <div className="iphone-home-bar" />
        </div>
      </div>
    </div>
  );
}

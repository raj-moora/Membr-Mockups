import cellularConnection from '../../../assets/cellular_connection.svg';
import wifi from '../../../assets/wifi.svg';
import battery from '../../../assets/battery.svg';

interface AndroidStatusBarProps {
  invertIcons?: boolean;
  time?: string;
  showCameraCutout?: boolean;
}

export function AndroidStatusBar({
  invertIcons = false,
  time = '9:30',
  showCameraCutout = false,
}: AndroidStatusBarProps) {
  return (
    <div
      className={`and-status-bar${invertIcons ? ' and-status-bar--inverted' : ''}`}
      role="presentation"
    >
      <span className="and-status-bar__time">{time}</span>
      {showCameraCutout && <div className="and-status-bar__cutout" aria-hidden />}
      <div className="and-status-bar__icons" aria-hidden>
        <img src={wifi} alt="" className="and-status-bar__icon and-status-bar__icon--wifi" />
        <img
          src={cellularConnection}
          alt=""
          className="and-status-bar__icon and-status-bar__icon--signal"
        />
        <img src={battery} alt="" className="and-status-bar__icon and-status-bar__icon--battery" />
      </div>
    </div>
  );
}

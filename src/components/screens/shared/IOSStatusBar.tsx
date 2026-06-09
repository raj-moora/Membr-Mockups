import cellularConnection from '../../../assets/cellular_connection.svg';
import wifi from '../../../assets/wifi.svg';
import battery from '../../../assets/battery.svg';

/** Screen prefix matching existing CSS (hp-, sp-, shp-, bk-). */
export type IOSStatusBarVariant = 'hp' | 'sp' | 'shp' | 'bk';

interface IOSStatusBarProps {
  variant: IOSStatusBarVariant;
  time?: string;
}

export function IOSStatusBar({ variant, time = '9:41' }: IOSStatusBarProps) {
  const prefix = variant;
  return (
    <div className={`${prefix}-status-bar`}>
      <span className={`${prefix}-status-time`}>{time}</span>
      <div className={`${prefix}-status-island`} aria-hidden />
      <div className={`${prefix}-status-icons`} aria-hidden>
        <img src={cellularConnection} alt="" className={`${prefix}-status-icon`} />
        <img src={wifi} alt="" className={`${prefix}-status-icon`} />
        <img
          src={battery}
          alt=""
          className={`${prefix}-status-icon ${prefix}-status-icon--battery`}
        />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useBrandPalette } from './hooks/useBrandPalette';
import { useAssetUploads } from './hooks/useAssetUploads';
import { ControlPanel } from './components/ControlPanel';
import { IPhoneFrame } from './components/IPhoneFrame';
import { HomepageScreen } from './components/screens/HomepageScreen';
import { SplashScreen } from './components/screens/SplashScreen';
import type { PreviewMode } from './types';
import './styles.css';

export default function App() {
  const { primaryHex, setPrimaryHex, palette } = useBrandPalette();
  const { assets, uploadLogo, uploadSplash, clearLogo, clearSplash } = useAssetUploads();
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light');

  return (
    <div className="app-layout">
      <ControlPanel
        primaryHex={primaryHex}
        onPrimaryChange={setPrimaryHex}
        palette={palette}
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
        logoDataUrl={assets.logoDataUrl}
        splashDataUrl={assets.splashDataUrl}
        onLogoUpload={uploadLogo}
        onSplashUpload={uploadSplash}
        onLogoClear={clearLogo}
        onSplashClear={clearSplash}
      />
      <main className="preview-panel">
        <div className="preview-panel__inner">
          <IPhoneFrame label={previewMode === 'dark' ? 'Dark Mode' : 'Light Mode'}>
            <HomepageScreen mode={previewMode} />
          </IPhoneFrame>
          <IPhoneFrame label="Splash Screen" variant="splash">
            <SplashScreen
              mode={previewMode}
              hasLogo={!!assets.logoDataUrl}
              splashDataUrl={assets.splashDataUrl}
            />
          </IPhoneFrame>
        </div>
      </main>
    </div>
  );
}

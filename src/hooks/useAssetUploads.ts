import { useState, useCallback, useEffect } from 'react';
import { applyAssetVar } from '../engine/cssVars';
import {
  clampLogoScale,
  loadStoredLogo,
  loadStoredLogoScale,
  loadStoredSplash,
  loadStoredAppIcon,
  saveStoredLogo,
  saveStoredLogoScale,
  saveStoredSplash,
  saveStoredAppIcon,
  clearStoredLogo,
  clearStoredSplash,
  clearStoredAppIcon,
} from '../lib/brandStorage';
import type { AssetState } from '../types';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadAssetState(): AssetState {
  return {
    logoDataUrl: loadStoredLogo(),
    splashDataUrl: loadStoredSplash(),
    appIconDataUrl: loadStoredAppIcon(),
    logoScale: loadStoredLogoScale(),
  };
}

export function useAssetUploads() {
  const [assets, setAssets] = useState<AssetState>(() => loadAssetState());

  useEffect(() => {
    applyAssetVar('logo', assets.logoDataUrl);
    applyAssetVar('splash', assets.splashDataUrl);
    applyAssetVar('app-icon', assets.appIconDataUrl);
  }, [assets.logoDataUrl, assets.splashDataUrl, assets.appIconDataUrl]);

  const uploadLogo = useCallback(async (file: File): Promise<string> => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, logoDataUrl: dataUrl }));
    saveStoredLogo(dataUrl);
    return dataUrl;
  }, []);

  const uploadSplash = useCallback(async (file: File): Promise<string> => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, splashDataUrl: dataUrl }));
    saveStoredSplash(dataUrl);
    return dataUrl;
  }, []);

  const clearLogo = useCallback(() => {
    setAssets((prev) => ({ ...prev, logoDataUrl: null }));
    clearStoredLogo();
  }, []);

  const clearSplash = useCallback(() => {
    setAssets((prev) => ({ ...prev, splashDataUrl: null }));
    clearStoredSplash();
  }, []);

  const uploadAppIcon = useCallback(async (file: File): Promise<string> => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, appIconDataUrl: dataUrl }));
    saveStoredAppIcon(dataUrl);
    return dataUrl;
  }, []);

  const clearAppIcon = useCallback(() => {
    setAssets((prev) => ({ ...prev, appIconDataUrl: null }));
    clearStoredAppIcon();
  }, []);

  const setLogoScale = useCallback((scale: number) => {
    const next = clampLogoScale(scale);
    setAssets((prev) => ({ ...prev, logoScale: next }));
    saveStoredLogoScale(next);
  }, []);

  return {
    assets,
    logoScale: assets.logoScale,
    setLogoScale,
    uploadLogo,
    uploadSplash,
    uploadAppIcon,
    clearLogo,
    clearSplash,
    clearAppIcon,
  };
}

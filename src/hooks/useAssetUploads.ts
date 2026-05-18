import { useState, useCallback, useEffect } from 'react';
import { applyAssetVar } from '../engine/cssVars';
import {
  clampLogoScale,
  loadStoredLogo,
  loadStoredLogoScale,
  loadStoredSplash,
  saveStoredLogo,
  saveStoredLogoScale,
  saveStoredSplash,
  clearStoredLogo,
  clearStoredSplash,
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
    logoScale: loadStoredLogoScale(),
  };
}

export function useAssetUploads() {
  const [assets, setAssets] = useState<AssetState>(() => loadAssetState());

  useEffect(() => {
    applyAssetVar('logo', assets.logoDataUrl);
    applyAssetVar('splash', assets.splashDataUrl);
  }, [assets.logoDataUrl, assets.splashDataUrl]);

  const uploadLogo = useCallback(async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, logoDataUrl: dataUrl }));
    saveStoredLogo(dataUrl);
  }, []);

  const uploadSplash = useCallback(async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, splashDataUrl: dataUrl }));
    saveStoredSplash(dataUrl);
  }, []);

  const clearLogo = useCallback(() => {
    setAssets((prev) => ({ ...prev, logoDataUrl: null }));
    clearStoredLogo();
  }, []);

  const clearSplash = useCallback(() => {
    setAssets((prev) => ({ ...prev, splashDataUrl: null }));
    clearStoredSplash();
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
    clearLogo,
    clearSplash,
  };
}

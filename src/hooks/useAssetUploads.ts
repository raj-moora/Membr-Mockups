import { useState, useCallback, useEffect } from 'react';
import { applyAssetVar } from '../engine/cssVars';
import {
  loadStoredLogo,
  loadStoredSplash,
  saveStoredLogo,
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
  };
}

export function useAssetUploads() {
  const [assets, setAssets] = useState<AssetState>(loadAssetState);

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

  return { assets, uploadLogo, uploadSplash, clearLogo, clearSplash };
}

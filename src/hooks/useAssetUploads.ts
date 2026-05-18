import { useState, useCallback, useEffect } from 'react';
import { applyAssetVar } from '../engine/cssVars';
import type { AssetState } from '../types';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function useAssetUploads() {
  const [assets, setAssets] = useState<AssetState>({
    logoDataUrl: null,
    splashDataUrl: null,
  });

  const uploadLogo = useCallback(async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, logoDataUrl: dataUrl }));
    applyAssetVar('logo', dataUrl);
  }, []);

  const uploadSplash = useCallback(async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => ({ ...prev, splashDataUrl: dataUrl }));
    applyAssetVar('splash', dataUrl);
  }, []);

  const clearLogo = useCallback(() => {
    setAssets((prev) => ({ ...prev, logoDataUrl: null }));
    applyAssetVar('logo', null);
  }, []);

  const clearSplash = useCallback(() => {
    setAssets((prev) => ({ ...prev, splashDataUrl: null }));
    applyAssetVar('splash', null);
  }, []);

  // Set initial none values on mount
  useEffect(() => {
    applyAssetVar('logo', null);
    applyAssetVar('splash', null);
  }, []);

  return { assets, uploadLogo, uploadSplash, clearLogo, clearSplash };
}

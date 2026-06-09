import {
  QuantizerCelebi,
  Score,
  hexFromArgb,
} from '@material/material-color-utilities';
import chroma from 'chroma-js';

const SAMPLE_SIZE = 128;

/** Prefer splash logo, then app icon. Splash background image is excluded. */
export function pickBrandColorSource(
  splashLogoDataUrl: string | null,
  appIconDataUrl: string | null,
): string | null {
  return splashLogoDataUrl ?? appIconDataUrl;
}

export function isNeutralOrExtreme(hex: string): boolean {
  const color = chroma(hex);
  if (color.get('hsl.s') < 0.12) return true;
  const l = color.get('hsl.l');
  return l < 0.08 || l > 0.92;
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

async function dataUrlToArgbPixels(dataUrl: string): Promise<number[]> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

  const pixels: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue;

    pixels.push((255 << 24) | (r << 16) | (g << 8) | b);
  }
  return pixels;
}

export async function extractAccentColorFromDataUrl(
  dataUrl: string,
): Promise<string | null> {
  const pixels = await dataUrlToArgbPixels(dataUrl);
  if (pixels.length === 0) return null;

  const colorToPopulation = QuantizerCelebi.quantize(pixels, 128);
  const ranked = Score.score(colorToPopulation, {
    desired: 6,
    filter: true,
  });

  for (const argb of ranked) {
    const hex = hexFromArgb(argb);
    if (!isNeutralOrExtreme(hex)) return hex;
  }

  return null;
}

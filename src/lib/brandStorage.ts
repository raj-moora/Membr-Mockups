const KEYS = {
  primary: 'membr-brand-primary',
  logo: 'membr-logo',
  splash: 'membr-splash',
} as const;

const HEX_RE = /^#?[0-9A-Fa-f]{6}$/;

function normalizeHex(hex: string): string | null {
  const trimmed = hex.trim();
  if (!HEX_RE.test(trimmed)) return null;
  return trimmed.startsWith('#') ? trimmed.toLowerCase() : `#${trimmed.toLowerCase()}`;
}

function isImageDataUrl(value: string): boolean {
  return value.startsWith('data:image/');
}

function readItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // private browsing or disabled storage
  }
}

export function loadStoredPrimary(defaultHex: string): string {
  const raw = readItem(KEYS.primary);
  if (!raw) return defaultHex;
  return normalizeHex(raw) ?? defaultHex;
}

export function saveStoredPrimary(hex: string): void {
  writeItem(KEYS.primary, hex);
}

export function loadStoredLogo(): string | null {
  const raw = readItem(KEYS.logo);
  return raw && isImageDataUrl(raw) ? raw : null;
}

export function saveStoredLogo(dataUrl: string): boolean {
  return writeItem(KEYS.logo, dataUrl);
}

export function clearStoredLogo(): void {
  removeItem(KEYS.logo);
}

export function loadStoredSplash(): string | null {
  const raw = readItem(KEYS.splash);
  return raw && isImageDataUrl(raw) ? raw : null;
}

export function saveStoredSplash(dataUrl: string): boolean {
  return writeItem(KEYS.splash, dataUrl);
}

export function clearStoredSplash(): void {
  removeItem(KEYS.splash);
}

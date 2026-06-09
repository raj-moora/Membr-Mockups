# Membr Mockups

High-fidelity iOS and Android gym-app screen mockups for design review and brand demos. Pick a primary brand color, upload logo / splash / app icon assets, and preview multiple screens side-by-side in light or dark mode.

**Live demo:** [GitHub Pages](https://github.com/marianatek/Membr-Mockups) (see `base` in `vite.config.ts` for the deploy path).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (theme engines) |
| `npm run typecheck` | TypeScript project references only |

## Project layout

- `src/App.tsx` — layout, export, theme application
- `src/previewRegistry.tsx` — which screens appear per platform
- `src/components/screens/` — iOS screens
- `src/components/screens/android/` — Android screens
- `src/components/screens/shared/` — mock data, `IOSStatusBar`, shared bookings UI
- `src/engine/` — iOS brand palette + Android Material 3 theme derivation
- `src/styles.css` — app chrome, iPhone frame, iOS screen styles
- `src/android-screens.css` — Android screen styles

## Theming

- **iOS:** `useBrandPalette` → `derivePalette` → CSS `--brand-*` tokens on `:root`
- **Android:** `deriveMaterialTheme` → `--md-*` tokens via `applyMaterialThemeVars`

Screens alias brand/Material tokens per namespace (e.g. `--hp-brand-bg`, `--abk-surface`).

## Adding a screen

1. Implement the screen component under `src/components/screens/` (and `android/` if needed).
2. Add styles with a unique BEM prefix in `styles.css` or `android-screens.css`.
3. Register an entry in `src/previewRegistry.tsx`.

## Assets

Place static assets in `src/assets/`. User-uploaded logo, splash, and app icon are injected via CSS variables (`--asset-logo`, `--asset-splash`, `--asset-app-icon`) from the control panel.

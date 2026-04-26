// Minecraft Java Edition pack_format values
// Sources: minecraft.wiki/w/Pack_format
// "guaranteed" = tested/official, "likely" = structurally compatible (path layout unchanged)

export const PACK_FORMATS = [
  // ── LEGACY (1.6–1.12) ────────────────────────────────────────────────────
  // GUI path: assets/minecraft/textures/gui/*.png  (NO container/ subfolder)
  // Note: pre-1.13 uses different texture paths for many GUIs!
  { label: '1.8.9',           format: 1,  support: 'maybe',       note: 'Pre-1.9, legacy GUI paths' },
  { label: '1.9 – 1.10.2',   format: 2,  support: 'maybe',       note: 'Legacy GUI paths' },
  { label: '1.11 – 1.12.2',  format: 3,  support: 'maybe',       note: 'Legacy GUI paths, last before 1.13 rename' },
  // ── TRANSITIONAL (1.13–1.15) ─────────────────────────────────────────────
  // 1.13 introduced container/ subfolder and renamed many textures
  { label: '1.13 – 1.14.4',  format: 4,  support: 'likely',      note: '1.13 texture rename, container/ added' },
  { label: '1.15 – 1.16.1',  format: 5,  support: 'likely',      note: '' },
  { label: '1.16.2 – 1.16.5',format: 6,  support: 'likely',      note: '' },
  // ── MODERN (1.17–1.20) ───────────────────────────────────────────────────
  { label: '1.17 – 1.17.1',  format: 7,  support: 'likely',      note: '' },
  { label: '1.18 – 1.18.2',  format: 8,  support: 'likely',      note: '' },
  { label: '1.19 – 1.19.2',  format: 9,  support: 'likely',      note: '' },
  { label: '1.19.3',         format: 12, support: 'likely',      note: '' },
  { label: '1.19.4',         format: 13, support: 'likely',      note: '' },
  { label: '1.20 – 1.20.1',  format: 15, support: 'likely',      note: '' },
  { label: '1.20.2',         format: 18, support: 'likely',      note: '' },
  { label: '1.20.3 – 1.20.4',format: 22, support: 'likely',      note: '' },
  { label: '1.20.5 – 1.20.6',format: 32, support: 'likely',      note: '' },
  // ── GUARANTEED (last 5 major releases) ───────────────────────────────────
  { label: '1.21 – 1.21.1',  format: 34, support: 'guaranteed',  note: '' },
  { label: '1.21.2 – 1.21.3',format: 42, support: 'guaranteed',  note: '' },
  { label: '1.21.4',         format: 46, support: 'guaranteed',  note: '' },
  { label: '1.21.5',         format: 55, support: 'guaranteed',  note: '' },
  { label: '1.21.6',         format: 63, support: 'guaranteed',  note: '' },
  { label: '1.21.7 – 1.21.8',format: 64, support: 'guaranteed',  note: 'Latest stable' },
]

// Quick lookup by label string (backward compat with ExportPanel)
export const PACK_FORMATS_MAP = Object.fromEntries(
  PACK_FORMATS.map(v => [v.label, v.format])
)

// Default format (latest guaranteed)
export const DEFAULT_PACK_FORMAT = 64

// Versions that use legacy (pre-1.13) GUI texture paths
export const LEGACY_VERSIONS = new Set(['1.8.9', '1.9 – 1.10.2', '1.11 – 1.12.2'])

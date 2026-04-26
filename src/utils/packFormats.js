// Minecraft Java Edition pack_format values
// Sources: minecraft.wiki/w/Pack_format
// "guaranteed" = tested/official, "likely" = structurally compatible
// "repositioned" = GUI layout változott – újrapozicionálás szükséges lehet!

// Verziók ahol BIZONYÍTOTTAN változott a GUI textúra elrendezése
// (slot koordináták, texture atlas megváltozott)
export const REPOSITIONED_VERSIONS = new Set([
  '1.8.9',
  '1.9 – 1.10.2',
  '1.11 – 1.12.2',
  '1.13 – 1.14.4',  // 1.13: nagy texture rename + container/ subfolder bevezetés
  '1.17 – 1.17.1',  // 1.17: inventory módosítások
  '1.21.2 – 1.21.3', // 1.21.2: HUD/inventory változások
])

export const PACK_FORMATS = [
  // ── LEGACY (1.6–1.12) ────────────────────────────────────────────────────
  { label: '1.8.9',            format: 1,  support: 'maybe',      repositioned: true,  note: 'Legacy GUI paths, pre-1.9' },
  { label: '1.9 – 1.10.2',    format: 2,  support: 'maybe',      repositioned: true,  note: 'Legacy GUI paths' },
  { label: '1.11 – 1.12.2',   format: 3,  support: 'maybe',      repositioned: true,  note: 'Legacy, utolsó pre-1.13' },
  // ── TRANSITIONAL (1.13–1.16) ─────────────────────────────────────────────
  { label: '1.13 – 1.14.4',   format: 4,  support: 'likely',     repositioned: true,  note: '1.13 texture rename, container/ bevezetés' },
  { label: '1.15 – 1.16.1',   format: 5,  support: 'likely',     repositioned: false, note: '' },
  { label: '1.16.2 – 1.16.5', format: 6,  support: 'likely',     repositioned: false, note: '' },
  // ── MODERN (1.17–1.20) ───────────────────────────────────────────────────
  { label: '1.17 – 1.17.1',   format: 7,  support: 'likely',     repositioned: true,  note: 'Inventory layout módosítások' },
  { label: '1.18 – 1.18.2',   format: 8,  support: 'likely',     repositioned: false, note: '' },
  { label: '1.19 – 1.19.2',   format: 9,  support: 'likely',     repositioned: false, note: '' },
  { label: '1.19.3',          format: 12, support: 'likely',     repositioned: false, note: '' },
  { label: '1.19.4',          format: 13, support: 'likely',     repositioned: false, note: '' },
  { label: '1.20 – 1.20.1',   format: 15, support: 'likely',     repositioned: false, note: '' },
  { label: '1.20.2',          format: 18, support: 'likely',     repositioned: false, note: '' },
  { label: '1.20.3 – 1.20.4', format: 22, support: 'likely',     repositioned: false, note: '' },
  { label: '1.20.5 – 1.20.6', format: 32, support: 'likely',     repositioned: false, note: '' },
  // ── GUARANTEED (1.21+) ───────────────────────────────────────────────────
  { label: '1.21 – 1.21.1',   format: 34, support: 'guaranteed', repositioned: false, note: '' },
  { label: '1.21.2 – 1.21.3', format: 42, support: 'guaranteed', repositioned: true,  note: 'HUD módosítások' },
  { label: '1.21.4',          format: 46, support: 'guaranteed', repositioned: false, note: '' },
  { label: '1.21.5',          format: 55, support: 'guaranteed', repositioned: false, note: '' },
  { label: '1.21.6',          format: 61, support: 'guaranteed', repositioned: false, note: 'Legújabb stabil' },
]

// Quick lookup by label string
export const PACK_FORMATS_MAP = Object.fromEntries(
  PACK_FORMATS.map(v => [v.label, v.format])
)

// Főverziók hierarchikus struktúrája az accordion menühöz
export const VERSION_MAJOR_GROUPS = [
  {
    major: '1.21',
    label: 'Java 1.21.x',
    icon: '🟢',
    versions: ['1.21 – 1.21.1', '1.21.2 – 1.21.3', '1.21.4', '1.21.5', '1.21.6'],
  },
  {
    major: '1.20',
    label: 'Java 1.20.x',
    icon: '🟡',
    versions: ['1.20 – 1.20.1', '1.20.2', '1.20.3 – 1.20.4', '1.20.5 – 1.20.6'],
  },
  {
    major: '1.17-1.19',
    label: 'Java 1.17–1.19.x',
    icon: '🟡',
    versions: ['1.17 – 1.17.1', '1.18 – 1.18.2', '1.19 – 1.19.2', '1.19.3', '1.19.4'],
  },
  {
    major: '1.13-1.16',
    label: 'Java 1.13–1.16.x',
    icon: '🟠',
    versions: ['1.13 – 1.14.4', '1.15 – 1.16.1', '1.16.2 – 1.16.5'],
  },
  {
    major: 'legacy',
    label: 'Legacy (pre-1.13)',
    icon: '🔴',
    versions: ['1.8.9', '1.9 – 1.10.2', '1.11 – 1.12.2'],
  },
]

// Default version label (must match a label above exactly)
export const DEFAULT_VERSION = '1.21.6'

// Default format (latest guaranteed)
export const DEFAULT_PACK_FORMAT = 61

// Versions that use legacy (pre-1.13) GUI texture paths
export const LEGACY_VERSIONS = new Set(['1.8.9', '1.9 – 1.10.2', '1.11 – 1.12.2'])

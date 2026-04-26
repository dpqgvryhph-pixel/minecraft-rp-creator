// Official Minecraft GUI mask definitions
// Coordinates match vanilla texture layout (256x256 canvas)
// Containers: 176px wide, various heights, centered on 256x256 sheet

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export const GUI_CATEGORIES = [
  { id: 'storage',    label: '📦 Tárolók' },
  { id: 'crafting',  label: '🔨 Kézműves' },
  { id: 'smelting',  label: '🔥 Olvasztás' },
  { id: 'utility',   label: '⚙️ Eszközök' },
  { id: 'mob',       label: '🐴 Élőlények' },
  { id: 'menu',      label: '🖥️ Menük' },
]

// ─── TEXTURE PATHS ────────────────────────────────────────────────────────────
// Pre-1.13: assets/minecraft/textures/gui/*.png (flat, no container/ subfolder)
// 1.13+:    assets/minecraft/textures/gui/container/*.png
export const GUI_TEXTURE_PATHS = {
  // Storage
  inventory:        'gui/container/inventory.png',
  chest:            'gui/container/generic_54.png',
  chest_small:      'gui/container/generic_27.png',
  shulker_box:      'gui/container/shulker_box.png',
  ender_chest:      'gui/container/generic_27.png',
  barrel:           'gui/container/generic_54.png',
  // Crafting
  crafting:         'gui/container/crafting_table.png',
  loom:             'gui/container/loom.png',
  cartography:      'gui/container/cartography_table.png',
  stonecutter:      'gui/container/stonecutter.png',
  grindstone:       'gui/container/grindstone.png',
  anvil:            'gui/container/anvil.png',
  smithing:         'gui/container/smithing.png',
  // Smelting
  furnace:          'gui/container/furnace.png',
  blast_furnace:    'gui/container/blast_furnace.png',
  smoker:           'gui/container/smoker.png',
  // Utility
  enchanting:       'gui/container/enchanting_table.png',
  brewing:          'gui/container/brewing_stand.png',
  beacon:           'gui/container/beacon.png',
  dispenser:        'gui/container/dispenser.png',
  dropper:          'gui/container/dispenser.png',
  hopper:           'gui/container/hopper.png',
  crafter:          'gui/container/crafter.png',
  // Mob
  horse:            'gui/container/horse.png',
  villager:         'gui/container/villager2.png',
  // Menu / Title
  title_bg:         'gui/title/background/panorama_overlay.png',
  widgets:          'gui/widgets.png',
  icons:            'gui/icons.png',
  hotbar:           'gui/hotbar.png',
}

// ─── GUI MASK METADATA ────────────────────────────────────────────────────────
// category: which group this belongs to
// since: earliest MC version string that has this GUI (for export filtering)
// path_pre113: override path for pre-1.13 packs (flat gui/ folder)
export const GUI_META = {
  inventory:     { category: 'storage',  since: '1.0',    label: 'Inventory (176×166)' },
  chest:         { category: 'storage',  since: '1.0',    label: 'Large Chest (176×222)' },
  chest_small:   { category: 'storage',  since: '1.0',    label: 'Small Chest / Ender Chest (176×166)' },
  shulker_box:   { category: 'storage',  since: '1.11',   label: 'Shulker Box (176×166)' },
  barrel:        { category: 'storage',  since: '1.14',   label: 'Barrel (176×222)' },
  crafting:      { category: 'crafting', since: '1.0',    label: 'Crafting Table (176×166)' },
  loom:          { category: 'crafting', since: '1.14',   label: 'Loom (176×166)' },
  cartography:   { category: 'crafting', since: '1.14',   label: 'Cartography Table (176×166)' },
  stonecutter:   { category: 'crafting', since: '1.14',   label: 'Stonecutter (176×166)' },
  grindstone:    { category: 'crafting', since: '1.14',   label: 'Grindstone (176×166)' },
  anvil:         { category: 'crafting', since: '1.4',    label: 'Anvil (176×166)' },
  smithing:      { category: 'crafting', since: '1.16',   label: 'Smithing Table (176×166)' },
  furnace:       { category: 'smelting', since: '1.0',    label: 'Furnace (176×166)' },
  blast_furnace: { category: 'smelting', since: '1.14',   label: 'Blast Furnace (176×166)' },
  smoker:        { category: 'smelting', since: '1.14',   label: 'Smoker (176×166)' },
  enchanting:    { category: 'utility',  since: '1.0',    label: 'Enchanting Table (176×166)' },
  brewing:       { category: 'utility',  since: '1.0',    label: 'Brewing Stand (176×166)' },
  beacon:        { category: 'utility',  since: '1.4',    label: 'Beacon (230×219)' },
  dispenser:     { category: 'utility',  since: '1.0',    label: 'Dispenser / Dropper (176×166)' },
  hopper:        { category: 'utility',  since: '1.5',    label: 'Hopper (176×133)' },
  crafter:       { category: 'utility',  since: '1.21',   label: 'Crafter (176×166)' },
  horse:         { category: 'mob',      since: '1.6',    label: 'Horse / Donkey (176×166)' },
  villager:      { category: 'mob',      since: '1.14',   label: 'Villager Trade (276×166)' },
  title_bg:      { category: 'menu',     since: '1.0',    label: 'Főmenü háttér overlay' },
  widgets:       { category: 'menu',     since: '1.0',    label: 'Widgets (játékon belüli UI sáv)' },
  icons:         { category: 'menu',     since: '1.0',    label: 'Icons (szív, étel, XP bar)' },
  hotbar:        { category: 'menu',     since: '1.0',    label: 'Hotbar' },
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const SLOT_W = 18
const SLOT_H = 18
const SLOT_FILL    = 'rgba(55,55,55,0.6)'
const SLOT_STROKE  = 'rgba(139,139,139,0.7)'
const OUTPUT_FILL  = 'rgba(55,55,55,0.5)'
const OUTPUT_STROKE= 'rgba(200,180,100,0.8)'
const FUEL_FILL    = 'rgba(80,40,10,0.5)'
const PANEL_FILL   = 'rgba(198,198,198,0.10)'
const PANEL_STROKE = 'rgba(198,198,198,0.45)'
const LABEL_COLOR  = 'rgba(64,64,64,0.9)'
const LABEL_FONT   = '7px "Minecraft", monospace'

function slots(startX, startY, cols, rows, fill = SLOT_FILL, stroke = SLOT_STROKE) {
  const result = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result.push({
        type: 'rect',
        x: startX + c * SLOT_W,
        y: startY + r * SLOT_H,
        w: SLOT_W - 1,
        h: SLOT_H - 1,
        fill,
        color: stroke,
        fillAlpha: 0.7,
      })
    }
  }
  return result
}

// Standard player inventory + hotbar rows (3×9 + hotbar, common offset)
function playerInv(ox, oy) {
  return [
    { type: 'text', text: 'Inventory', x: ox + 8, y: oy - 5, color: LABEL_COLOR, font: LABEL_FONT },
    ...slots(ox + 8, oy, 9, 3),
    ...slots(ox + 8, oy + 58, 9, 1),
  ]
}

// ─── BASE OFFSETS ─────────────────────────────────────────────────────────────
const X = 40   // default horizontal centering for 176-wide GUIs on 256 canvas
const Y = 45   // default vertical for standard 166-height GUIs

// ─── MASK DEFINITIONS ─────────────────────────────────────────────────────────
export const GUI_MASKS = {

  // ── STORAGE ──────────────────────────────────────────────────────────────
  inventory: {
    label: GUI_META.inventory.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      // Player model box
      { type: 'rect', x: X+54, y: Y+16, w: 56, h: 72, fill: 'rgba(100,100,180,0.08)', color: 'rgba(100,100,180,0.3)', fillAlpha: 0.5 },
      // Armor slots
      ...slots(X+8, Y+8, 1, 4),
      // Crafting 2×2
      ...slots(X+98, Y+18, 2, 2),
      // Crafting output
      { type: 'rect', x: X+154, y: Y+28, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      { type: 'rect', x: X+122, y: Y+32, w: 26, h: 9, fill: 'rgba(200,200,200,0.12)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.5 },
      // Offhand
      { type: 'rect', x: X+77, y: Y+100, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      ...playerInv(X, Y+84),
    ]
  },

  chest: {
    label: GUI_META.chest.label,
    elements: [
      { type: 'rect', x: X, y: 17, w: 176, h: 222, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Large Chest', x: X+8, y: 29, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, 35, 9, 6),
      { type: 'rect', x: X+8, y: 146, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
      ...playerInv(X, 151),
    ]
  },

  chest_small: {
    label: GUI_META.chest_small.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Chest', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, Y+18, 9, 3),
      ...playerInv(X, Y+84),
    ]
  },

  shulker_box: {
    label: GUI_META.shulker_box.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Shulker Box', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, Y+18, 9, 3),
      ...playerInv(X, Y+84),
    ]
  },

  barrel: {
    label: GUI_META.barrel.label,
    elements: [
      { type: 'rect', x: X, y: 17, w: 176, h: 222, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Barrel', x: X+8, y: 29, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, 35, 9, 6),
      { type: 'rect', x: X+8, y: 146, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
      ...playerInv(X, 151),
    ]
  },

  // ── CRAFTING ─────────────────────────────────────────────────────────────
  crafting: {
    label: GUI_META.crafting.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Crafting', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+30, Y+17, 3, 3),
      { type: 'rect', x: X+90, y: Y+32, w: 24, h: 10, fill: 'rgba(200,200,200,0.1)', color: 'rgba(200,200,200,0.35)', fillAlpha: 0.4 },
      { type: 'rect', x: X+124, y: Y+28, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  anvil: {
    label: GUI_META.anvil.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Repair & Name', x: X+60, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Input slots
      { type: 'rect', x: X+27, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+76, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Plus sign area
      { type: 'rect', x: X+50, y: Y+50, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      // Output
      { type: 'rect', x: X+134, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      // Arrow
      { type: 'rect', x: X+99, y: Y+50, w: 28, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'text', text: 'Cost', x: X+8, y: Y+75, color: 'rgba(255,80,80,0.8)', font: LABEL_FONT },
      ...playerInv(X, Y+84),
    ]
  },

  smithing: {
    label: GUI_META.smithing.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Upgrade Gear', x: X+60, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Template slot
      { type: 'rect', x: X+8, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,40,140,0.4)', color: 'rgba(180,100,255,0.6)', fillAlpha: 0.7 },
      // Gear slot
      { type: 'rect', x: X+26, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Material slot
      { type: 'rect', x: X+44, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Arrow
      { type: 'rect', x: X+67, y: Y+50, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      // Output
      { type: 'rect', x: X+98, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  loom: {
    label: GUI_META.loom.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Loom', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Banner + dye + pattern slots
      { type: 'rect', x: X+13, y: Y+27, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+13, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(200,100,200,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+13, y: Y+67, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(100,200,100,0.6)', fillAlpha: 0.7 },
      // Pattern grid (4x4 preview area)
      { type: 'rect', x: X+60, y: Y+14, w: 56, h: 56, fill: 'rgba(40,40,80,0.15)', color: 'rgba(150,150,200,0.4)', fillAlpha: 0.5 },
      // Output
      { type: 'rect', x: X+143, y: Y+58, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  cartography: {
    label: GUI_META.cartography.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Cartography Table', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Map + paper slots
      { type: 'rect', x: X+15, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+15, y: Y+39, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Arrow
      { type: 'rect', x: X+44, y: Y+33, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      // Output
      { type: 'rect', x: X+80, y: Y+17, w: 64, h: 64, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.4 },
      ...playerInv(X, Y+84),
    ]
  },

  stonecutter: {
    label: GUI_META.stonecutter.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Stonecutter', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Input
      { type: 'rect', x: X+20, y: Y+33, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Recipe scroll area
      { type: 'rect', x: X+52, y: Y+14, w: 90, h: 54, fill: 'rgba(40,40,60,0.2)', color: 'rgba(150,150,180,0.35)', fillAlpha: 0.4 },
      // Arrow
      { type: 'rect', x: X+40, y: Y+36, w: 8, h: 10, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      // Output
      { type: 'rect', x: X+148, y: Y+33, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  grindstone: {
    label: GUI_META.grindstone.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Repair & Disenchant', x: X+40, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+49, y: Y+19, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+49, y: Y+40, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+73, y: Y+29, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: X+106, y: Y+24, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── SMELTING ─────────────────────────────────────────────────────────────
  furnace: {
    label: GUI_META.furnace.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Furnace', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+56, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+57, y: Y+37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(255,100,20,0.6)', fillAlpha: 0.6 },
      { type: 'rect', x: X+56, y: Y+53, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(255,100,20,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      { type: 'rect', x: X+116, y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  blast_furnace: {
    label: GUI_META.blast_furnace.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Blast Furnace', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+56, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+57, y: Y+37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(255,150,20,0.6)', fillAlpha: 0.6 },
      { type: 'rect', x: X+56, y: Y+53, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(255,150,20,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      { type: 'rect', x: X+116, y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  smoker: {
    label: GUI_META.smoker.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Smoker', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+56, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(180,220,100,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+57, y: Y+37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(200,220,80,0.6)', fillAlpha: 0.6 },
      { type: 'rect', x: X+56, y: Y+53, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(200,220,80,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      { type: 'rect', x: X+116, y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── UTILITY ──────────────────────────────────────────────────────────────
  enchanting: {
    label: GUI_META.enchanting.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Enchant', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Item slot
      { type: 'rect', x: X+15, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(100,100,255,0.7)', fillAlpha: 0.7 },
      // Lapis slot
      { type: 'rect', x: X+35, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(20,40,120,0.5)', color: 'rgba(60,100,255,0.6)', fillAlpha: 0.7 },
      // 3 enchantment rows
      { type: 'rect', x: X+60, y: Y+14, w: 108, h: 19, fill: 'rgba(60,10,100,0.35)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.5 },
      { type: 'rect', x: X+60, y: Y+35, w: 108, h: 19, fill: 'rgba(60,10,100,0.35)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.5 },
      { type: 'rect', x: X+60, y: Y+56, w: 108, h: 19, fill: 'rgba(60,10,100,0.35)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.5 },
      ...playerInv(X, Y+84),
    ]
  },

  brewing: {
    label: GUI_META.brewing.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Brewing Stand', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Ingredient slot (top center)
      { type: 'rect', x: X+79, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(180,100,255,0.6)', fillAlpha: 0.7 },
      // Fuel slot (blaze powder)
      { type: 'rect', x: X+17, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(255,160,0,0.6)', fillAlpha: 0.7 },
      // 3 potion slots bottom
      { type: 'rect', x: X+47, y: Y+57, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,20,120,0.4)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+64, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,20,120,0.4)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+111, y: Y+57, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,20,120,0.4)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.7 },
      ...playerInv(X, Y+84),
    ]
  },

  beacon: {
    label: GUI_META.beacon.label,
    elements: [
      // Beacon GUI is 230×219, offset accordingly
      { type: 'rect', x: 13, y: 18, w: 230, h: 219, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Beacon', x: 20, y: 30, color: LABEL_COLOR, font: LABEL_FONT },
      // Beacon beam preview area
      { type: 'rect', x: 20, y: 35, w: 82, h: 78, fill: 'rgba(255,255,180,0.05)', color: 'rgba(255,255,100,0.3)', fillAlpha: 0.5 },
      // Primary power grid (tier 1-3)
      { type: 'rect', x: 116, y: 35, w: 58, h: 78, fill: 'rgba(40,40,80,0.2)', color: 'rgba(100,100,200,0.3)', fillAlpha: 0.5 },
      // Secondary power
      { type: 'rect', x: 182, y: 55, w: 24, h: 38, fill: 'rgba(40,40,80,0.2)', color: 'rgba(100,100,200,0.3)', fillAlpha: 0.5 },
      // Payment slot
      { type: 'rect', x: 116, y: 142, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
    ]
  },

  dispenser: {
    label: GUI_META.dispenser.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Dispenser', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // 3×3 grid
      ...slots(X+53, Y+17, 3, 3),
      ...playerInv(X, Y+84),
    ]
  },

  hopper: {
    label: GUI_META.hopper.label,
    elements: [
      // Hopper GUI 176×133
      { type: 'rect', x: X, y: 62, w: 176, h: 133, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Hopper', x: X+8, y: 74, color: LABEL_COLOR, font: LABEL_FONT },
      // 1×5 slots
      ...slots(X+44, 80, 5, 1),
      ...playerInv(X, 101),
    ]
  },

  crafter: {
    label: GUI_META.crafter.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Crafter', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // 3×3 crafting grid
      ...slots(X+30, Y+17, 3, 3),
      // Arrow + output
      { type: 'rect', x: X+90, y: Y+32, w: 24, h: 10, fill: 'rgba(200,200,200,0.1)', color: 'rgba(200,200,200,0.35)', fillAlpha: 0.4 },
      { type: 'rect', x: X+124, y: Y+28, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── MOB ──────────────────────────────────────────────────────────────────
  horse: {
    label: GUI_META.horse.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Horse', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Saddle slot
      { type: 'rect', x: X+7, y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(180,120,60,0.6)', fillAlpha: 0.7 },
      // Armor slot
      { type: 'rect', x: X+7, y: Y+54, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(180,180,60,0.6)', fillAlpha: 0.7 },
      // Horse inventory 3×5
      ...slots(X+80, Y+17, 5, 3),
      ...playerInv(X, Y+84),
    ]
  },

  villager: {
    label: GUI_META.villager.label,
    elements: [
      // Villager trade GUI: 276×166
      { type: 'rect', x: 0, y: Y, w: 256, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Trade', x: 8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // Trade input slots
      { type: 'rect', x: 136, y: Y+37, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: 160, y: Y+37, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Arrow
      { type: 'rect', x: 181, y: Y+40, w: 22, h: 10, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      // Output
      { type: 'rect', x: 211, y: Y+37, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      // Trade list scroll area
      { type: 'rect', x: 5, y: Y+18, w: 124, h: 130, fill: 'rgba(40,40,60,0.2)', color: 'rgba(150,150,200,0.3)', fillAlpha: 0.4 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── MENU ─────────────────────────────────────────────────────────────────
  title_bg: {
    label: GUI_META.title_bg.label,
    elements: [
      // Full canvas – panorama overlay is 1920×1080 typically, scaled to 256×256 here
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0.0)', color: 'rgba(100,150,255,0.5)', fillAlpha: 0 },
      // Minecraft logo rough area
      { type: 'rect', x: 48, y: 30, w: 160, h: 40, fill: 'rgba(200,50,50,0.1)', color: 'rgba(255,100,100,0.5)', fillAlpha: 0.3 },
      { type: 'text', text: 'MINECRAFT', x: 78, y: 56, color: 'rgba(255,100,100,0.7)', font: '12px "Minecraft", monospace' },
      // Menu buttons area
      { type: 'rect', x: 68, y: 100, w: 120, h: 14, fill: 'rgba(100,100,100,0.2)', color: 'rgba(200,200,200,0.4)', fillAlpha: 0.3 },
      { type: 'rect', x: 68, y: 118, w: 120, h: 14, fill: 'rgba(100,100,100,0.2)', color: 'rgba(200,200,200,0.4)', fillAlpha: 0.3 },
      { type: 'rect', x: 68, y: 136, w: 120, h: 14, fill: 'rgba(100,100,100,0.2)', color: 'rgba(200,200,200,0.4)', fillAlpha: 0.3 },
      { type: 'text', text: 'Singleplayer', x: 90, y: 111, color: 'rgba(255,255,255,0.6)', font: LABEL_FONT },
      { type: 'text', text: 'Multiplayer',  x: 93, y: 129, color: 'rgba(255,255,255,0.6)', font: LABEL_FONT },
      { type: 'text', text: 'Options / Quit', x: 84, y: 147, color: 'rgba(255,255,255,0.6)', font: LABEL_FONT },
      { type: 'text', text: 'Panorama overlay – gui/title/background/panorama_overlay.png', x: 4, y: 250, color: 'rgba(100,200,255,0.7)', font: '6px monospace' },
    ]
  },

  widgets: {
    label: GUI_META.widgets.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,200,255,0.3)', fillAlpha: 0 },
      // Hotbar (bottom)
      { type: 'rect', x: 8, y: 230, w: 182, h: 22, fill: 'rgba(40,40,40,0.3)', color: 'rgba(180,180,180,0.5)', fillAlpha: 0.4 },
      // Button examples
      { type: 'rect', x: 0, y: 46, w: 200, h: 20, fill: 'rgba(60,60,60,0.3)', color: 'rgba(150,150,150,0.5)', fillAlpha: 0.4 },
      { type: 'rect', x: 0, y: 66, w: 200, h: 20, fill: 'rgba(60,60,60,0.3)', color: 'rgba(150,150,150,0.5)', fillAlpha: 0.4 },
      { type: 'text', text: 'widgets.png – hotbar, buttons, scrollbar', x: 4, y: 10, color: 'rgba(100,200,255,0.8)', font: '6px monospace' },
    ]
  },

  icons: {
    label: GUI_META.icons.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,200,255,0.3)', fillAlpha: 0 },
      { type: 'text', text: 'icons.png – hearts, hunger, XP bar, armor, air', x: 4, y: 10, color: 'rgba(100,200,255,0.8)', font: '6px monospace' },
      // Hearts row
      { type: 'rect', x: 8, y: 30, w: 9, h: 9, fill: 'rgba(200,30,30,0.5)', color: 'rgba(255,80,80,0.7)', fillAlpha: 0.7 },
      { type: 'rect', x: 18, y: 30, w: 9, h: 9, fill: 'rgba(200,30,30,0.5)', color: 'rgba(255,80,80,0.7)', fillAlpha: 0.7 },
      { type: 'rect', x: 28, y: 30, w: 9, h: 9, fill: 'rgba(200,30,30,0.5)', color: 'rgba(255,80,80,0.7)', fillAlpha: 0.7 },
      { type: 'text', text: '♥ ♥ ♥  health', x: 42, y: 38, color: 'rgba(255,100,100,0.8)', font: '7px monospace' },
      // Hunger row
      { type: 'rect', x: 8, y: 50, w: 9, h: 9, fill: 'rgba(160,100,30,0.5)', color: 'rgba(220,160,80,0.7)', fillAlpha: 0.7 },
      { type: 'text', text: '🍗 hunger', x: 22, y: 58, color: 'rgba(220,160,80,0.8)', font: '7px monospace' },
      // XP bar
      { type: 'rect', x: 8, y: 70, w: 182, h: 5, fill: 'rgba(50,200,50,0.3)', color: 'rgba(100,255,100,0.6)', fillAlpha: 0.5 },
      { type: 'text', text: 'XP bar', x: 195, y: 75, color: 'rgba(100,255,100,0.8)', font: '6px monospace' },
    ]
  },

  hotbar: {
    label: GUI_META.hotbar.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,200,255,0.3)', fillAlpha: 0 },
      { type: 'text', text: 'hotbar.png – bottom action bar', x: 4, y: 10, color: 'rgba(100,200,255,0.8)', font: '6px monospace' },
      // 9-slot hotbar
      ...slots(37, 118, 9, 1, 'rgba(40,40,40,0.3)', 'rgba(180,180,180,0.5)'),
      // Selected slot highlight
      { type: 'rect', x: 37, y: 118, w: 23, h: 23, fill: 'rgba(255,255,255,0)', color: 'rgba(255,255,255,0.8)', fillAlpha: 0 },
    ]
  },
}

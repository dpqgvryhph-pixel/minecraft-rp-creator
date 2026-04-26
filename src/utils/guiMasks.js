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
  chest:            'gui/container/generic_27.png',       // small chest (3×9 = 27 slots)
  chest_large:      'gui/container/generic_54.png',       // large/double chest (6×9 = 54 slots)
  ender_chest:      'gui/container/generic_27.png',       // ender chest uses same layout as small chest
  shulker_box:      'gui/container/shulker_box.png',
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

// ─── GUI META ────────────────────────────────────────────────────────────────
// guiW / guiH: the actual pixel size of the GUI texture on the 256×256 sheet
// guiX / guiY: top-left corner of the GUI panel on the 256×256 sheet
// These are used by calcMaskCenteredTransform() to fit-center the uploaded
// image precisely inside the GUI area.
export const GUI_META = {
  inventory:     { category: 'storage',  since: '1.0',   label: 'Inventory',                    guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  chest:         { category: 'storage',  since: '1.0',   label: 'Small Chest (27 slots)',        guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  chest_large:   { category: 'storage',  since: '1.0',   label: 'Large Chest (54 slots)',        guiX: 40, guiY: 17, guiW: 176, guiH: 222 },
  ender_chest:   { category: 'storage',  since: '1.3',   label: 'Ender Chest',                   guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  shulker_box:   { category: 'storage',  since: '1.11',  label: 'Shulker Box',                   guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  barrel:        { category: 'storage',  since: '1.14',  label: 'Barrel (54 slots)',              guiX: 40, guiY: 17, guiW: 176, guiH: 222 },
  crafting:      { category: 'crafting', since: '1.0',   label: 'Crafting Table',                guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  loom:          { category: 'crafting', since: '1.14',  label: 'Loom',                          guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  cartography:   { category: 'crafting', since: '1.14',  label: 'Cartography Table',             guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  stonecutter:   { category: 'crafting', since: '1.14',  label: 'Stonecutter',                   guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  grindstone:    { category: 'crafting', since: '1.14',  label: 'Grindstone',                    guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  anvil:         { category: 'crafting', since: '1.4',   label: 'Anvil',                         guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  smithing:      { category: 'crafting', since: '1.16',  label: 'Smithing Table',                guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  furnace:       { category: 'smelting', since: '1.0',   label: 'Furnace',                       guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  blast_furnace: { category: 'smelting', since: '1.14',  label: 'Blast Furnace',                 guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  smoker:        { category: 'smelting', since: '1.14',  label: 'Smoker',                        guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  enchanting:    { category: 'utility',  since: '1.0',   label: 'Enchanting Table',              guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  brewing:       { category: 'utility',  since: '1.0',   label: 'Brewing Stand',                 guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  beacon:        { category: 'utility',  since: '1.4',   label: 'Beacon',                        guiX: 13, guiY: 18, guiW: 230, guiH: 219 },
  dispenser:     { category: 'utility',  since: '1.0',   label: 'Dispenser / Dropper',           guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  hopper:        { category: 'utility',  since: '1.5',   label: 'Hopper',                        guiX: 40, guiY: 62, guiW: 176, guiH: 133 },
  crafter:       { category: 'utility',  since: '1.21',  label: 'Crafter',                       guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  horse:         { category: 'mob',      since: '1.6',   label: 'Horse / Donkey',                guiX: 40, guiY: 45, guiW: 176, guiH: 166 },
  villager:      { category: 'mob',      since: '1.14',  label: 'Villager Trade',                guiX:  0, guiY: 45, guiW: 256, guiH: 166 },
  title_bg:      { category: 'menu',     since: '1.0',   label: 'Főmenü háttér overlay',         guiX:  0, guiY:  0, guiW: 256, guiH: 256 },
  widgets:       { category: 'menu',     since: '1.0',   label: 'Widgets (UI sáv)',              guiX:  0, guiY:  0, guiW: 256, guiH: 256 },
  icons:         { category: 'menu',     since: '1.0',   label: 'Icons (szív, étel, XP)',        guiX:  0, guiY:  0, guiW: 256, guiH: 256 },
  hotbar:        { category: 'menu',     since: '1.0',   label: 'Hotbar',                        guiX:  0, guiY:  0, guiW: 256, guiH: 256 },
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

// Standard player inventory + hotbar (3×9 + hotbar)
// ox/oy = top-left corner of the player inventory section
function playerInv(ox, oy) {
  return [
    { type: 'text', text: 'Inventory', x: ox + 8, y: oy - 5, color: LABEL_COLOR, font: LABEL_FONT },
    ...slots(ox + 8, oy, 9, 3),
    ...slots(ox + 8, oy + 58, 9, 1),
  ]
}

// Vanilla 176-wide GUIs are centered on a 256-wide sheet:
//   offsetX = (256 - 176) / 2 = 40
// For standard 166-high GUIs:
//   offsetY = (256 - 166) / 2 = 45
const X = 40
const Y = 45

// ─── MASK DEFINITIONS ─────────────────────────────────────────────────────────
export const GUI_MASKS = {

  // ── STORAGE ──────────────────────────────────────────────────────────────
  inventory: {
    label: GUI_META.inventory.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'rect', x: X+54, y: Y+16, w: 56, h: 72, fill: 'rgba(100,100,180,0.08)', color: 'rgba(100,100,180,0.3)', fillAlpha: 0.5 },
      ...slots(X+8,  Y+8,  1, 4),            // armor
      ...slots(X+98, Y+18, 2, 2),            // 2×2 crafting
      { type: 'rect', x: X+154, y: Y+28, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      { type: 'rect', x: X+122, y: Y+32, w: 26, h: 9,  fill: 'rgba(200,200,200,0.12)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.5 },
      { type: 'rect', x: X+77,  y: Y+100, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 }, // offhand
      ...playerInv(X, Y+84),
    ]
  },

  // Small chest: generic_27.png  –  176×166 GUI, same layout as shulker_box
  chest: {
    label: GUI_META.chest.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Small Chest', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, Y+18, 9, 3),   // 3 rows × 9 = 27 slots
      { type: 'rect', x: X+8, y: Y+74, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
      ...playerInv(X, Y+84),
    ]
  },

  // Large / double chest: generic_54.png  –  176×222 GUI
  chest_large: {
    label: GUI_META.chest_large.label,
    elements: [
      { type: 'rect', x: X, y: 17, w: 176, h: 222, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Large Chest', x: X+8, y: 29, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, 35, 9, 6),     // 6 rows × 9 = 54 slots
      { type: 'rect', x: X+8, y: 146, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
      ...playerInv(X, 151),
    ]
  },

  // Ender chest: also generic_27.png layout, but distinct identity
  ender_chest: {
    label: GUI_META.ender_chest.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Ender Chest', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      // subtle purple tint to distinguish from small chest
      { type: 'rect', x: X+8, y: Y+18, w: 162, h: 54, fill: 'rgba(80,20,120,0.08)', color: 'rgba(0,0,0,0)', fillAlpha: 0.4 },
      ...slots(X+8, Y+18, 9, 3),
      { type: 'rect', x: X+8, y: Y+74, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
      ...playerInv(X, Y+84),
    ]
  },

  shulker_box: {
    label: GUI_META.shulker_box.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Shulker Box', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+8, Y+18, 9, 3),
      { type: 'rect', x: X+8, y: Y+74, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
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
      { type: 'rect', x: X+90,  y: Y+32, w: 24, h: 10, fill: 'rgba(200,200,200,0.1)',  color: 'rgba(200,200,200,0.35)', fillAlpha: 0.4 },
      { type: 'rect', x: X+124, y: Y+28, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  anvil: {
    label: GUI_META.anvil.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Repair & Name', x: X+60, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+27,  y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: X+76,  y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: X+50,  y: Y+50, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: X+134, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      { type: 'rect', x: X+99,  y: Y+50, w: 28, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'text', text: 'Cost', x: X+8, y: Y+75, color: 'rgba(255,80,80,0.8)', font: LABEL_FONT },
      ...playerInv(X, Y+84),
    ]
  },

  smithing: {
    label: GUI_META.smithing.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Upgrade Gear', x: X+60, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+8,  y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,40,140,0.4)', color: 'rgba(180,100,255,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+26, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: X+44, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: X+67, y: Y+50, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: X+98, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  loom: {
    label: GUI_META.loom.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Loom', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+13, y: Y+27, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: SLOT_STROKE,            fillAlpha: 0.7 },
      { type: 'rect', x: X+13, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: 'rgba(200,100,200,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+13, y: Y+67, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: 'rgba(100,200,100,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+60, y: Y+14, w: 56, h: 56, fill: 'rgba(40,40,80,0.15)',   color: 'rgba(150,150,200,0.4)', fillAlpha: 0.5 },
      { type: 'rect', x: X+143,y: Y+58, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE,          fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  cartography: {
    label: GUI_META.cartography.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Cartography Table', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+15, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+15, y: Y+39, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+44, y: Y+33, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: X+80, y: Y+17, w: 64, h: 64, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.4 },
      ...playerInv(X, Y+84),
    ]
  },

  stonecutter: {
    label: GUI_META.stonecutter.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Stonecutter', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+20, y: Y+33, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      { type: 'rect', x: X+52, y: Y+14, w: 90, h: 54, fill: 'rgba(40,40,60,0.2)',  color: 'rgba(150,150,180,0.35)', fillAlpha: 0.4 },
      { type: 'rect', x: X+40, y: Y+36, w:  8, h: 10, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: X+148,y: Y+33, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  grindstone: {
    label: GUI_META.grindstone.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Repair & Disenchant', x: X+40, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+49, y: Y+19, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: X+49, y: Y+40, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: X+73, y: Y+29, w: 22, h: 12, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: X+106,y: Y+24, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── SMELTING ─────────────────────────────────────────────────────────────
  furnace: {
    label: GUI_META.furnace.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Furnace', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+56, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: SLOT_STROKE,              fillAlpha: 0.7 },
      { type: 'rect', x: X+57, y: Y+37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(255,100,20,0.6)',              fillAlpha: 0.6 },
      { type: 'rect', x: X+56, y: Y+53, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(255,100,20,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      { type: 'rect', x: X+116,y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  blast_furnace: {
    label: GUI_META.blast_furnace.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Blast Furnace', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+56, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: SLOT_STROKE,               fillAlpha: 0.7 },
      { type: 'rect', x: X+57, y: Y+37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(255,150,20,0.6)',               fillAlpha: 0.6 },
      { type: 'rect', x: X+56, y: Y+53, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(255,150,20,0.5)',  fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      { type: 'rect', x: X+116,y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  smoker: {
    label: GUI_META.smoker.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Smoker', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+56, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: 'rgba(180,220,100,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+57, y: Y+37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(200,220,80,0.6)',               fillAlpha: 0.6 },
      { type: 'rect', x: X+56, y: Y+53, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL, color: 'rgba(200,220,80,0.5)',  fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      { type: 'rect', x: X+116,y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── UTILITY ──────────────────────────────────────────────────────────────
  enchanting: {
    label: GUI_META.enchanting.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Enchant', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: X+15, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,             color: 'rgba(100,100,255,0.7)', fillAlpha: 0.7 },
      { type: 'rect', x: X+35, y: Y+47, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(20,40,120,0.5)', color: 'rgba(60,100,255,0.6)',  fillAlpha: 0.7 },
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
      { type: 'rect', x: X+79, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,  color: 'rgba(180,100,255,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+17, y: Y+17, w: SLOT_W-1, h: SLOT_H-1, fill: FUEL_FILL,  color: 'rgba(255,160,0,0.6)',   fillAlpha: 0.7 },
      { type: 'rect', x: X+47, y: Y+57, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,20,120,0.4)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+79, y: Y+64, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,20,120,0.4)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.7 },
      { type: 'rect', x: X+111,y: Y+57, w: SLOT_W-1, h: SLOT_H-1, fill: 'rgba(80,20,120,0.4)', color: 'rgba(160,80,255,0.5)', fillAlpha: 0.7 },
      ...playerInv(X, Y+84),
    ]
  },

  beacon: {
    label: GUI_META.beacon.label,
    elements: [
      { type: 'rect', x: 13, y: 18, w: 230, h: 219, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Beacon', x: 20, y: 30, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: 20,  y: 35, w:  82, h: 78, fill: 'rgba(255,255,180,0.05)', color: 'rgba(255,255,100,0.3)', fillAlpha: 0.5 },
      { type: 'rect', x: 116, y: 35, w:  58, h: 78, fill: 'rgba(40,40,80,0.2)',    color: 'rgba(100,100,200,0.3)',  fillAlpha: 0.5 },
      { type: 'rect', x: 182, y: 55, w:  24, h: 38, fill: 'rgba(40,40,80,0.2)',    color: 'rgba(100,100,200,0.3)',  fillAlpha: 0.5 },
      { type: 'rect', x: 116, y: 142,w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
    ]
  },

  dispenser: {
    label: GUI_META.dispenser.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Dispenser', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+53, Y+17, 3, 3),
      ...playerInv(X, Y+84),
    ]
  },

  hopper: {
    label: GUI_META.hopper.label,
    elements: [
      { type: 'rect', x: X, y: 62, w: 176, h: 133, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Hopper', x: X+8, y: 74, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+44, 80, 5, 1),
      ...playerInv(X, 101),
    ]
  },

  crafter: {
    label: GUI_META.crafter.label,
    elements: [
      { type: 'rect', x: X, y: Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Crafter', x: X+8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(X+30, Y+17, 3, 3),
      { type: 'rect', x: X+90,  y: Y+32, w: 24, h: 10, fill: 'rgba(200,200,200,0.1)',  color: 'rgba(200,200,200,0.35)', fillAlpha: 0.4 },
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
      { type: 'rect', x: X+7, y: Y+35, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(180,120,60,0.6)', fillAlpha: 0.7 },
      { type: 'rect', x: X+7, y: Y+54, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL, color: 'rgba(180,180,60,0.6)', fillAlpha: 0.7 },
      ...slots(X+80, Y+17, 5, 3),
      ...playerInv(X, Y+84),
    ]
  },

  villager: {
    label: GUI_META.villager.label,
    elements: [
      { type: 'rect', x: 0, y: Y, w: 256, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Trade', x: 8, y: Y+12, color: LABEL_COLOR, font: LABEL_FONT },
      { type: 'rect', x: 136, y: Y+37, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: 160, y: Y+37, w: SLOT_W-1, h: SLOT_H-1, fill: SLOT_FILL,   color: SLOT_STROKE,   fillAlpha: 0.7 },
      { type: 'rect', x: 181, y: Y+40, w: 22, h: 10, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.3 },
      { type: 'rect', x: 211, y: Y+37, w: SLOT_W-1, h: SLOT_H-1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      { type: 'rect', x:   5, y: Y+18, w: 124, h: 130, fill: 'rgba(40,40,60,0.2)', color: 'rgba(150,150,200,0.3)', fillAlpha: 0.4 },
      ...playerInv(X, Y+84),
    ]
  },

  // ── MENU ─────────────────────────────────────────────────────────────────
  title_bg: {
    label: GUI_META.title_bg.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,150,255,0.5)', fillAlpha: 0 },
      { type: 'rect', x: 48, y: 30, w: 160, h: 40,  fill: 'rgba(200,50,50,0.1)',  color: 'rgba(255,100,100,0.5)', fillAlpha: 0.3 },
      { type: 'text', text: 'MINECRAFT', x: 78, y: 56, color: 'rgba(255,100,100,0.7)', font: '12px "Minecraft", monospace' },
      { type: 'rect', x: 68, y: 100, w: 120, h: 14, fill: 'rgba(100,100,100,0.2)', color: 'rgba(200,200,200,0.4)', fillAlpha: 0.3 },
      { type: 'rect', x: 68, y: 118, w: 120, h: 14, fill: 'rgba(100,100,100,0.2)', color: 'rgba(200,200,200,0.4)', fillAlpha: 0.3 },
      { type: 'rect', x: 68, y: 136, w: 120, h: 14, fill: 'rgba(100,100,100,0.2)', color: 'rgba(200,200,200,0.4)', fillAlpha: 0.3 },
      { type: 'text', text: 'Singleplayer', x:  90, y: 111, color: 'rgba(255,255,255,0.6)', font: LABEL_FONT },
      { type: 'text', text: 'Multiplayer',  x:  93, y: 129, color: 'rgba(255,255,255,0.6)', font: LABEL_FONT },
      { type: 'text', text: 'Options / Quit', x: 84, y: 147, color: 'rgba(255,255,255,0.6)', font: LABEL_FONT },
      { type: 'text', text: 'Panorama overlay – gui/title/background/panorama_overlay.png', x: 4, y: 250, color: 'rgba(100,200,255,0.7)', font: '6px monospace' },
    ]
  },

  widgets: {
    label: GUI_META.widgets.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,200,255,0.3)', fillAlpha: 0 },
      { type: 'rect', x: 8,   y: 230, w: 182, h: 22, fill: 'rgba(40,40,40,0.3)',  color: 'rgba(180,180,180,0.5)', fillAlpha: 0.4 },
      { type: 'rect', x: 0,   y:  46, w: 200, h: 20, fill: 'rgba(60,60,60,0.3)',  color: 'rgba(150,150,150,0.5)', fillAlpha: 0.4 },
      { type: 'rect', x: 0,   y:  66, w: 200, h: 20, fill: 'rgba(60,60,60,0.3)',  color: 'rgba(150,150,150,0.5)', fillAlpha: 0.4 },
      { type: 'text', text: 'widgets.png – hotbar, buttons, scrollbar', x: 4, y: 10, color: 'rgba(100,200,255,0.8)', font: '6px monospace' },
    ]
  },

  icons: {
    label: GUI_META.icons.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,200,255,0.3)', fillAlpha: 0 },
      { type: 'text', text: 'icons.png – hearts, hunger, XP bar, armor, air', x: 4, y: 10, color: 'rgba(100,200,255,0.8)', font: '6px monospace' },
      { type: 'rect', x:  8, y: 30, w: 9, h: 9, fill: 'rgba(200,30,30,0.5)', color: 'rgba(255,80,80,0.7)',  fillAlpha: 0.7 },
      { type: 'rect', x: 18, y: 30, w: 9, h: 9, fill: 'rgba(200,30,30,0.5)', color: 'rgba(255,80,80,0.7)',  fillAlpha: 0.7 },
      { type: 'rect', x: 28, y: 30, w: 9, h: 9, fill: 'rgba(200,30,30,0.5)', color: 'rgba(255,80,80,0.7)',  fillAlpha: 0.7 },
      { type: 'text', text: '♥ ♥ ♥  health', x: 42, y: 38, color: 'rgba(255,100,100,0.8)', font: '7px monospace' },
      { type: 'rect', x:  8, y: 50, w: 9, h: 9, fill: 'rgba(160,100,30,0.5)', color: 'rgba(220,160,80,0.7)', fillAlpha: 0.7 },
      { type: 'text', text: '🍗 hunger', x: 22, y: 58, color: 'rgba(220,160,80,0.8)', font: '7px monospace' },
      { type: 'rect', x:  8, y: 70, w: 182, h: 5, fill: 'rgba(50,200,50,0.3)', color: 'rgba(100,255,100,0.6)', fillAlpha: 0.5 },
      { type: 'text', text: 'XP bar', x: 195, y: 75, color: 'rgba(100,255,100,0.8)', font: '6px monospace' },
    ]
  },

  hotbar: {
    label: GUI_META.hotbar.label,
    elements: [
      { type: 'rect', x: 0, y: 0, w: 256, h: 256, fill: 'rgba(0,0,0,0)', color: 'rgba(100,200,255,0.3)', fillAlpha: 0 },
      { type: 'text', text: 'hotbar.png – bottom action bar', x: 4, y: 10, color: 'rgba(100,200,255,0.8)', font: '6px monospace' },
      ...slots(37, 118, 9, 1, 'rgba(40,40,40,0.3)', 'rgba(180,180,180,0.5)'),
      { type: 'rect', x: 37, y: 118, w: 23, h: 23, fill: 'rgba(255,255,255,0)', color: 'rgba(255,255,255,0.8)', fillAlpha: 0 },
    ]
  },
}

// ─── UTILITY: bounding box of a mask's GUI panel ──────────────────────────────
// Returns { x, y, w, h } of the outermost panel rect for a given mask ID.
// CanvasEditor uses this to fit-center the uploaded image inside the GUI area.
export function getMaskBounds(maskId) {
  const meta = GUI_META[maskId]
  if (!meta) return { x: 0, y: 0, w: 256, h: 256 }
  return { x: meta.guiX, y: meta.guiY, w: meta.guiW, h: meta.guiH }
}

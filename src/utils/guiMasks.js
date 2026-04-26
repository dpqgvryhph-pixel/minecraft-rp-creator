// Official Minecraft GUI mask definitions
// Coordinates match vanilla 1.21 texture layout (256x256 canvas)
// Inventory GUI is 176x166 px, centered at ~(40, 45) on the 256x256 sheet

export const GUI_TEXTURE_PATHS = {
  inventory: 'gui/container/inventory.png',
  chest: 'gui/container/generic_54.png',
  crafting: 'gui/container/crafting_table.png',
  furnace: 'gui/container/furnace.png',
}

// Slot size in vanilla Minecraft is 18x18 (16px icon + 1px border each side)
const SLOT_W = 18
const SLOT_H = 18
const SLOT_FILL = 'rgba(55,55,55,0.6)'
const SLOT_STROKE = 'rgba(139,139,139,0.7)'
const OUTPUT_FILL = 'rgba(55,55,55,0.5)'
const OUTPUT_STROKE = 'rgba(200,180,100,0.8)'
const FUEL_FILL = 'rgba(80,40,10,0.5)'
const PANEL_FILL = 'rgba(198,198,198,0.10)'
const PANEL_STROKE = 'rgba(198,198,198,0.45)'
const LABEL_COLOR = 'rgba(64,64,64,0.9)'
const LABEL_FONT = '7px "Minecraft", monospace'

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

// All GUIs are rendered centered on the 256x256 canvas
// Inventory GUI (176x166): offset X=40, Y=45
const INV_X = 40
const INV_Y = 45

// Chest GUI (176x222): offset X=40, Y=17
const CHEST_X = 40
const CHEST_Y = 17

// Crafting Table GUI (176x166): same as inventory
const CRAFT_X = 40
const CRAFT_Y = 45

// Furnace GUI (176x166): same
const FURN_X = 40
const FURN_Y = 45

export const GUI_MASKS = {
  inventory: {
    label: 'Inventory (176×166)',
    elements: [
      // Panel background
      { type: 'rect', x: INV_X, y: INV_Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      // Player model box (left side)
      { type: 'rect', x: INV_X + 54, y: INV_Y + 16, w: 56, h: 72, fill: 'rgba(100,100,180,0.08)', color: 'rgba(100,100,180,0.3)', fillAlpha: 0.5 },
      // Armor slots (4 slots on left)
      ...slots(INV_X + 8, INV_Y + 8, 1, 4),
      // Crafting 2x2
      ...slots(INV_X + 98, INV_Y + 18, 2, 2),
      // Crafting output
      { type: 'rect', x: INV_X + 154, y: INV_Y + 28, w: SLOT_W - 1, h: SLOT_H - 1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      // Arrow →
      { type: 'rect', x: INV_X + 122, y: INV_Y + 32, w: 26, h: 9, fill: 'rgba(200,200,200,0.12)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.5 },
      // Offhand slot
      { type: 'rect', x: INV_X + 77, y: INV_Y + 100, w: SLOT_W - 1, h: SLOT_H - 1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Inventory (3 rows of 9)
      ...slots(INV_X + 8, INV_Y + 84, 9, 3),
      // Hotbar (1 row of 9)
      ...slots(INV_X + 8, INV_Y + 142, 9, 1),
      // Labels
      { type: 'text', text: 'Inventory', x: INV_X + 8, y: INV_Y + 79, color: LABEL_COLOR, font: LABEL_FONT },
    ]
  },

  chest: {
    label: 'Large Chest (176×222)',
    elements: [
      // Panel background
      { type: 'rect', x: CHEST_X, y: CHEST_Y, w: 176, h: 222, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      // Chest label
      { type: 'text', text: 'Large Chest', x: CHEST_X + 8, y: CHEST_Y + 12, color: LABEL_COLOR, font: LABEL_FONT },
      // Chest inventory (6 rows of 9)
      ...slots(CHEST_X + 8, CHEST_Y + 18, 9, 6),
      // Divider line suggestion
      { type: 'rect', x: CHEST_X + 8, y: CHEST_Y + 129, w: 160, h: 1, fill: 'rgba(150,150,150,0.3)', color: 'rgba(150,150,150,0.3)', fillAlpha: 0.5 },
      // Player inventory label
      { type: 'text', text: 'Inventory', x: CHEST_X + 8, y: CHEST_Y + 138, color: LABEL_COLOR, font: LABEL_FONT },
      // Player inventory (3 rows of 9)
      ...slots(CHEST_X + 8, CHEST_Y + 144, 9, 3),
      // Hotbar
      ...slots(CHEST_X + 8, CHEST_Y + 202, 9, 1),
    ]
  },

  crafting: {
    label: 'Crafting Table (176×166)',
    elements: [
      { type: 'rect', x: CRAFT_X, y: CRAFT_Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Crafting', x: CRAFT_X + 8, y: CRAFT_Y + 12, color: LABEL_COLOR, font: LABEL_FONT },
      // 3x3 crafting grid
      ...slots(CRAFT_X + 30, CRAFT_Y + 17, 3, 3),
      // Arrow
      { type: 'rect', x: CRAFT_X + 90, y: CRAFT_Y + 32, w: 24, h: 10, fill: 'rgba(200,200,200,0.1)', color: 'rgba(200,200,200,0.35)', fillAlpha: 0.4 },
      // Output
      { type: 'rect', x: CRAFT_X + 124, y: CRAFT_Y + 28, w: SLOT_W - 1, h: SLOT_H - 1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      { type: 'text', text: 'Inventory', x: CRAFT_X + 8, y: CRAFT_Y + 79, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(CRAFT_X + 8, CRAFT_Y + 84, 9, 3),
      ...slots(CRAFT_X + 8, CRAFT_Y + 142, 9, 1),
    ]
  },

  furnace: {
    label: 'Furnace (176×166)',
    elements: [
      { type: 'rect', x: FURN_X, y: FURN_Y, w: 176, h: 166, fill: PANEL_FILL, color: PANEL_STROKE, fillAlpha: 0.12 },
      { type: 'text', text: 'Furnace', x: FURN_X + 8, y: FURN_Y + 12, color: LABEL_COLOR, font: LABEL_FONT },
      // Input slot (top)
      { type: 'rect', x: FURN_X + 56, y: FURN_Y + 17, w: SLOT_W - 1, h: SLOT_H - 1, fill: SLOT_FILL, color: SLOT_STROKE, fillAlpha: 0.7 },
      // Flame indicator box
      { type: 'rect', x: FURN_X + 57, y: FURN_Y + 37, w: 14, h: 14, fill: FUEL_FILL, color: 'rgba(255,100,20,0.6)', fillAlpha: 0.6 },
      // Fuel slot (bottom)
      { type: 'rect', x: FURN_X + 56, y: FURN_Y + 53, w: SLOT_W - 1, h: SLOT_H - 1, fill: FUEL_FILL, color: 'rgba(255,100,20,0.5)', fillAlpha: 0.7 },
      // Progress arrow
      { type: 'rect', x: FURN_X + 79, y: FURN_Y + 34, w: 24, h: 17, fill: 'rgba(200,200,200,0.08)', color: 'rgba(200,200,200,0.3)', fillAlpha: 0.4 },
      // Output slot
      { type: 'rect', x: FURN_X + 116, y: FURN_Y + 35, w: SLOT_W - 1, h: SLOT_H - 1, fill: OUTPUT_FILL, color: OUTPUT_STROKE, fillAlpha: 0.6 },
      { type: 'text', text: 'Inventory', x: FURN_X + 8, y: FURN_Y + 79, color: LABEL_COLOR, font: LABEL_FONT },
      ...slots(FURN_X + 8, FURN_Y + 84, 9, 3),
      ...slots(FURN_X + 8, FURN_Y + 142, 9, 1),
    ]
  }
}

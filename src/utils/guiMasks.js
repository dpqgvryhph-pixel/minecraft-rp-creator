// Official Minecraft GUI mask definitions with element coordinates
// Based on vanilla 256x256 texture layout

export const GUI_TEXTURE_PATHS = {
  inventory: 'gui/container/inventory.png',
  chest: 'gui/container/generic_54.png',
  crafting: 'gui/container/crafting_table.png',
  furnace: 'gui/container/furnace.png',
}

const SLOT = { w: 18, h: 18 }
const SLOT_COLOR = 'rgba(139,139,139,0.6)'
const DARK_SLOT = 'rgba(55,55,55,0.5)'
const PANEL_FILL = 'rgba(198,198,198,0.12)'
const PANEL_STROKE = 'rgba(198,198,198,0.5)'

function makeSlots(startX, startY, cols, rows, label) {
  const slots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      slots.push({
        type: 'rect',
        x: startX + c * SLOT.w,
        y: startY + r * SLOT.h,
        w: SLOT.w - 1,
        h: SLOT.h - 1,
        fill: DARK_SLOT,
        color: SLOT_COLOR,
      })
    }
  }
  return slots
}

export const GUI_MASKS = {
  inventory: {
    label: 'Inventory (176x166)',
    elements: [
      // Main panel background
      { type: 'rect', x: 2, y: 2, w: 172, h: 162, fill: PANEL_FILL, color: PANEL_STROKE },
      // Crafting grid (2x2) at top left
      ...makeSlots(54, 18, 2, 2),
      // Crafting output
      { type: 'rect', x: 112, y: 23, w: 18, h: 18, fill: 'rgba(255,215,0,0.15)', color: 'rgba(255,215,0,0.5)' },
      // Armor slots (column)
      ...makeSlots(8, 8, 1, 4),
      // Inventory slots (3 rows of 9)
      ...makeSlots(8, 84, 9, 3),
      // Hotbar (1 row of 9)
      ...makeSlots(8, 142, 9, 1),
      // Labels
      { type: 'text', text: 'Inventory', x: 8, y: 79, color: '#404040', font: '6px monospace' },
      { type: 'text', text: 'Crafting', x: 57, y: 14, color: '#404040', font: '6px monospace' },
    ]
  },
  chest: {
    label: 'Large Chest (176x222)',
    elements: [
      // Panel background
      { type: 'rect', x: 2, y: 2, w: 172, h: 218, fill: PANEL_FILL, color: PANEL_STROKE },
      // Chest inventory (6 rows of 9)
      ...makeSlots(8, 18, 9, 6),
      // Player inventory (3 rows of 9)
      ...makeSlots(8, 140, 9, 3),
      // Hotbar
      ...makeSlots(8, 198, 9, 1),
      // Labels
      { type: 'text', text: 'Large Chest', x: 8, y: 14, color: '#404040', font: '6px monospace' },
      { type: 'text', text: 'Inventory', x: 8, y: 135, color: '#404040', font: '6px monospace' },
    ]
  },
  crafting: {
    label: 'Crafting Table (176x166)',
    elements: [
      { type: 'rect', x: 2, y: 2, w: 172, h: 162, fill: PANEL_FILL, color: PANEL_STROKE },
      // Crafting grid (3x3)
      ...makeSlots(30, 17, 3, 3),
      // Output slot
      { type: 'rect', x: 124, y: 26, w: 18, h: 18, fill: 'rgba(255,215,0,0.2)', color: 'rgba(255,215,0,0.6)' },
      // Arrow
      { type: 'rect', x: 100, y: 30, w: 22, h: 10, fill: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
      // Player inventory
      ...makeSlots(8, 84, 9, 3),
      ...makeSlots(8, 142, 9, 1),
      { type: 'text', text: 'Craft', x: 8, y: 14, color: '#404040', font: '6px monospace' },
    ]
  },
  furnace: {
    label: 'Furnace (176x166)',
    elements: [
      { type: 'rect', x: 2, y: 2, w: 172, h: 162, fill: PANEL_FILL, color: PANEL_STROKE },
      // Input slot
      { type: 'rect', x: 56, y: 17, w: 18, h: 18, fill: DARK_SLOT, color: SLOT_COLOR },
      // Fuel slot
      { type: 'rect', x: 56, y: 53, w: 18, h: 18, fill: 'rgba(255,100,0,0.2)', color: 'rgba(255,100,0,0.5)' },
      // Output slot
      { type: 'rect', x: 116, y: 35, w: 18, h: 18, fill: 'rgba(255,215,0,0.2)', color: 'rgba(255,215,0,0.6)' },
      // Progress bar
      { type: 'rect', x: 79, y: 36, w: 24, h: 16, fill: 'rgba(255,165,0,0.1)', color: 'rgba(255,165,0,0.3)' },
      // Flame indicator
      { type: 'rect', x: 57, y: 37, w: 14, h: 14, fill: 'rgba(255,50,0,0.2)', color: 'rgba(255,50,0,0.4)' },
      // Player inventory
      ...makeSlots(8, 84, 9, 3),
      ...makeSlots(8, 142, 9, 1),
      { type: 'text', text: 'Furnace', x: 8, y: 14, color: '#404040', font: '6px monospace' },
    ]
  }
}

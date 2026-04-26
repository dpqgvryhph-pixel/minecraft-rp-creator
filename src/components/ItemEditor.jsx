import { useState } from 'react'
import { Upload, RotateCcw, Plus, Trash2, Search, CheckCircle } from 'lucide-react'

// Előre definiált gyakori textúra útvonalak (items, blocks, entities, environment)
const PRESET_PATHS = [
  { id: 'item/diamond_sword', label: 'Diamond Sword', path: 'item/diamond_sword.png' },
  { id: 'item/iron_pickaxe', label: 'Iron Pickaxe', path: 'item/iron_pickaxe.png' },
  { id: 'item/golden_apple', label: 'Golden Apple', path: 'item/golden_apple.png' },
  { id: 'item/bow', label: 'Bow', path: 'item/bow.png' },
  { id: 'item/arrow', label: 'Arrow', path: 'item/arrow.png' },
  { id: 'entity/chest/normal', label: 'Small Chest (Block)', path: 'entity/chest/normal.png' },
  { id: 'entity/chest/normal_double', label: 'Double Chest (Block)', path: 'entity/chest/normal_double.png' },
  { id: 'entity/chest/ender', label: 'Ender Chest (Block)', path: 'entity/chest/ender.png' },
  { id: 'environment/sun', label: 'Sky: Sun', path: 'environment/sun.png' },
  { id: 'environment/moon_phases', label: 'Sky: Moon Phases', path: 'environment/moon_phases.png' },
  { id: 'environment/clouds', label: 'Sky: Clouds', path: 'environment/clouds.png' },
  { id: 'environment/end_sky', label: 'Sky: End Sky', path: 'environment/end_sky.png' },
]

export default function ItemEditor({ itemsState, setItemsState }) {
  const [selectedItemId, setSelectedItemId] = useState('item/diamond_sword')
  const [customPath, setCustomPath] = useState('')

  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setItemsState(prev => ({
          ...prev,
          [selectedItemId]: {
            ...prev[selectedItemId],
            uploadedImage: img,
            opacity: 1, brightness: 1, contrast: 1, saturation: 1
          }
        }))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleAddCustom = () => {
    if (!customPath.trim()) return
    let p = customPath.trim()
    if (!p.endsWith('.png')) p += '.png'
    setItemsState(prev => ({
      ...prev,
      [p]: { uploadedImage: null, opacity: 1, brightness: 1, contrast: 1, saturation: 1, customPath: p }
    }))
    setSelectedItemId(p)
    setCustomPath('')
  }

  const updateItem = (key, val) => {
    setItemsState(prev => ({
      ...prev,
      [selectedItemId]: { ...prev[selectedItemId], [key]: val }
    }))
  }

  const currentItem = itemsState[selectedItemId] || {
    opacity: 1, brightness: 1, contrast: 1, saturation: 1, uploadedImage: null
  }

  // Összeállítjuk az elérhető listát (presets + felvett custom pathok)
  const availableItems = [
    ...PRESET_PATHS,
    ...Object.keys(itemsState)
      .filter(id => !PRESET_PATHS.some(p => p.id === id || p.path === id))
      .map(id => ({ id, label: `Custom: ${id}`, path: id }))
  ]

  return (
    <div className="flex h-full bg-gray-950 text-white overflow-hidden">
      <div className="flex-1 flex flex-col p-6 gap-6 overflow-auto">
        <div>
          <h1 className="text-2xl font-bold mb-1">Texture Editor</h1>
          <p className="text-sm text-gray-400">Items, Blocks, Entities (Chest), Environment (Sky) textúrák szerkesztése</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Válassz textúrát</h3>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
              >
                <optgroup label="Presets">
                  {PRESET_PATHS.map(item => (
                    <option key={item.id} value={item.id}>{item.label} ({item.path}) {itemsState[item.id]?.uploadedImage ? '✓' : ''}</option>
                  ))}
                </optgroup>
                <optgroup label="Custom Paths">
                  {Object.keys(itemsState).filter(id => !PRESET_PATHS.some(p => p.id === id || p.path === id)).map(id => (
                    <option key={id} value={id}>{id} {itemsState[id]?.uploadedImage ? '✓' : ''}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Egyedi textúra útvonal hozzáadása</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customPath}
                  onChange={e => setCustomPath(e.target.value)}
                  placeholder="pl. block/diamond_block.png"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleAddCustom}
                  className="px-3 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Használd a Minecraft vanilla mappaszerkezetét (pl. item/apple.png)</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Feltöltés ide: <span className="text-cyan-400 font-mono text-xs">{selectedItemId}</span></h3>
              {currentItem.uploadedImage ? (
                <div className="flex items-center gap-3 bg-green-950/40 border border-green-800/50 rounded-xl p-3 mb-4">
                  <CheckCircle size={16} className="text-green-400" />
                  <p className="text-sm text-green-300">Kép sikeresen feltöltve!</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">Nincs még kép feltöltve ehhez a textúrához.</p>
              )}
            </div>
            
            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 rounded-xl cursor-pointer transition-all font-bold">
              <Upload size={18} />
              <span>{currentItem.uploadedImage ? 'Új kép feltöltése (Csere)' : 'Kép kiválasztása'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {currentItem.uploadedImage && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Visual FX</h3>
              <button
                onClick={() => { updateItem('brightness', 1); updateItem('contrast', 1); updateItem('saturation', 1); updateItem('opacity', 1); }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 transition-all"
              >
                <RotateCcw size={11} /> Reset FX
              </button>
            </div>
            {[['Brightness', 'brightness', 0.1, 3],
              ['Contrast', 'contrast', 0.1, 3],
              ['Saturation', 'saturation', 0, 3],
              ['Opacity', 'opacity', 0, 1]].map(([label, key, min, max]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">{label}: <span className="text-gray-200">{currentItem[key].toFixed(2)}</span></label>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={0.01}
                  value={currentItem[key]}
                  onChange={(e) => updateItem(key, Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: 'linear-gradient(to right, #7c3aed, #06b6d4)' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

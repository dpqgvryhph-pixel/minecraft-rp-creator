import { useState } from 'react'
import { Upload, RotateCcw } from 'lucide-react'

export default function ItemEditor() {
  const [selectedItem, setSelectedItem] = useState('diamond_sword')
  const [itemImage, setItemImage] = useState(null)
  const [brightness, setBrightness] = useState(1)
  const [contrast, setContrast] = useState(1)
  const [saturation, setSaturation] = useState(1)
  const [opacity, setOpacity] = useState(1)

  // Simplified item list (full list can be added later)
  const items = [
    { id: 'diamond_sword', label: 'Diamond Sword' },
    { id: 'iron_pickaxe', label: 'Iron Pickaxe' },
    { id: 'golden_apple', label: 'Golden Apple' },
    { id: 'bow', label: 'Bow' },
    { id: 'arrow', label: 'Arrow' },
  ]

  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => setItemImage(img)
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <div className="flex-1 flex flex-col p-6 gap-6 overflow-auto">
        <div>
          <h1 className="text-2xl font-bold mb-1">Item Editor</h1>
          <p className="text-sm text-gray-400">Upload and customize Minecraft item textures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Select Item</h3>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Upload Texture</h3>
            <label className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg cursor-pointer transition-all">
              <Upload size={16} />
              <span className="text-sm">Choose File</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {itemImage && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-300">Adjustments</h3>
            {[['Brightness', brightness, setBrightness, 0.1, 3],
              ['Contrast', contrast, setContrast, 0.1, 3],
              ['Saturation', saturation, setSaturation, 0, 3],
              ['Opacity', opacity, setOpacity, 0, 1]].map(([label, val, setter, min, max]) => (
              <div key={label}>
                <label className="text-xs text-gray-400">{label}: {val.toFixed(2)}</label>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={0.01}
                  value={val}
                  onChange={(e) => setter(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: 'linear-gradient(to right, #7c3aed, #06b6d4)' }}
                />
              </div>
            ))}
            <button
              onClick={() => { setBrightness(1); setContrast(1); setSaturation(1); setOpacity(1); }}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-all"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

import { useRef, useEffect, useState, useCallback } from 'react'
import { Upload, Eye, EyeOff, RotateCcw } from 'lucide-react'
import { GUI_MASKS } from '../utils/guiMasks'

export default function CanvasEditor({ editorState, setEditorState }) {
  const canvasRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, imgX: 0, imgY: 0 })

  const updateState = (updates) => setEditorState(prev => ({ ...prev, ...updates }))

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 256)

    // Checkerboard background
    const size = 16
    for (let y = 0; y < 256; y += size) {
      for (let x = 0; x < 256; x += size) {
        ctx.fillStyle = ((x / size + y / size)) % 2 === 0 ? '#1a1a2e' : '#16213e'
        ctx.fillRect(x, y, size, size)
      }
    }

    // Draw uploaded image with correct CSS filter syntax
    if (editorState.uploadedImage) {
      ctx.save()
      const { x, y, width, height, rotation } = editorState.imageTransform
      ctx.globalAlpha = editorState.opacity
      // FIXED: saturate() not saturation()
      ctx.filter = `brightness(${editorState.brightness}) contrast(${editorState.contrast}) saturate(${editorState.saturation})`
      ctx.translate(x + width / 2, y + height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.drawImage(editorState.uploadedImage, -width / 2, -height / 2, width, height)
      ctx.restore()
    }

    // Draw GUI mask overlay
    if (editorState.showMaskOverlay) {
      const maskData = GUI_MASKS[editorState.selectedMask]
      if (maskData) {
        ctx.save()
        ctx.filter = 'none'
        maskData.elements.forEach(el => {
          if (el.type === 'rect') {
            ctx.globalAlpha = el.fillAlpha ?? 0.85
            ctx.fillStyle = el.fill || 'rgba(0,0,0,0)'
            ctx.fillRect(el.x, el.y, el.w, el.h)
            ctx.globalAlpha = 1
            ctx.strokeStyle = el.color || '#aaaaaa'
            ctx.lineWidth = 1
            ctx.strokeRect(el.x + 0.5, el.y + 0.5, el.w - 1, el.h - 1)
          } else if (el.type === 'text') {
            ctx.globalAlpha = 1
            ctx.fillStyle = el.color || '#ffffff'
            ctx.font = el.font || '7px monospace'
            ctx.fillText(el.text, el.x, el.y)
          }
        })
        ctx.restore()
      }
    }
  }, [editorState])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => updateState({ uploadedImage: img })
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files[0])
  }

  const getCanvasScale = () => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 1, y: 1 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: 256 / rect.width,
      y: 256 / rect.height
    }
  }

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      imgX: editorState.imageTransform.x,
      imgY: editorState.imageTransform.y
    })
  }

  const handleCanvasMouseMove = (e) => {
    if (e.buttons !== 1 || !editorState.uploadedImage) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    // FIXED: actually apply scale
    const scale = getCanvasScale()
    const dx = (e.clientX - rect.left - dragStart.x) * scale.x
    const dy = (e.clientY - rect.top - dragStart.y) * scale.y
    updateState({
      imageTransform: {
        ...editorState.imageTransform,
        x: Math.round(dragStart.imgX + dx),
        y: Math.round(dragStart.imgY + dy)
      }
    })
  }

  const masks = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'chest', label: 'Large Chest' },
    { id: 'crafting', label: 'Crafting Table' },
    { id: 'furnace', label: 'Furnace' },
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
      {/* Canvas Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-bold text-white">GUI Editor</h2>
          <div className="flex gap-2">
            <button
              onClick={() => updateState({ showMaskOverlay: !editorState.showMaskOverlay })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                editorState.showMaskOverlay
                  ? 'bg-purple-700 hover:bg-purple-600 text-white border-purple-500'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600'
              }`}
            >
              {editorState.showMaskOverlay ? <Eye size={14}/> : <EyeOff size={14}/>}
              Mask Overlay
            </button>
            {editorState.uploadedImage && (
              <button
                onClick={() => updateState({
                  uploadedImage: null,
                  imageTransform: { x: 0, y: 0, width: 256, height: 256, rotation: 0 }
                })}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-700 hover:bg-red-600 text-white border border-red-500 transition-all"
              >
                <RotateCcw size={14}/> Reset
              </button>
            )}
          </div>
        </div>

        {/* Mask selector */}
        <div className="flex gap-2 flex-wrap">
          {masks.map(m => (
            <button
              key={m.id}
              onClick={() => updateState({ selectedMask: m.id })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                editorState.selectedMask === m.id
                  ? 'bg-cyan-700 text-cyan-100 border border-cyan-500'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div
          className={`relative border-2 rounded-xl overflow-hidden transition-all ${
            isDragging ? 'border-purple-400' : 'border-gray-700'
          }`}
          style={{ background: '#0a0a16' }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            className="w-full max-w-[512px] mx-auto block cursor-move"
            style={{ imageRendering: 'pixelated' }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
          />
          {!editorState.uploadedImage && (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-950/20 transition-colors">
              <Upload size={32} className="text-gray-500 mb-3" />
              <p className="text-gray-400 font-medium">Drop image or click to upload</p>
              <p className="text-gray-600 text-sm mt-1">PNG, JPG, WEBP – max 4MB</p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </label>
          )}
        </div>

        <p className="text-xs text-gray-600">
          Tip: Drag the image on the canvas to reposition it. Use the sliders for fine-tuning.
        </p>
      </div>

      {/* Controls Panel */}
      <div className="space-y-4">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Transform</h3>
          {[
            ['X Position', 'x', -256, 256, 1, 'px'],
            ['Y Position', 'y', -256, 256, 1, 'px'],
            ['Width', 'width', 32, 512, 1, 'px'],
            ['Height', 'height', 32, 512, 1, 'px'],
            ['Rotation', 'rotation', -180, 180, 1, '°'],
          ].map(([label, key, min, max, step, unit]) => (
            <div key={key}>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
                {label}: <span className="text-gray-200">{editorState.imageTransform[key]}{unit}</span>
              </label>
              <input
                type="range" min={min} max={max} step={step}
                value={editorState.imageTransform[key]}
                onChange={(e) => updateState({
                  imageTransform: { ...editorState.imageTransform, [key]: Number(e.target.value) }
                })}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: 'linear-gradient(to right, #7c3aed, #06b6d4)' }}
              />
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Visual FX</h3>
          {[
            ['Opacity', 'opacity', 0, 1, 0.01],
            ['Brightness', 'brightness', 0.1, 3, 0.05],
            ['Contrast', 'contrast', 0.1, 3, 0.05],
            ['Saturation', 'saturation', 0, 3, 0.05],
          ].map(([label, key, min, max, step]) => (
            <div key={key}>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
                {label}: <span className="text-gray-200">{editorState[key].toFixed(2)}</span>
              </label>
              <input
                type="range" min={min} max={max} step={step}
                value={editorState[key]}
                onChange={(e) => updateState({ [key]: Number(e.target.value) })}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: 'linear-gradient(to right, #7c3aed, #06b6d4)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

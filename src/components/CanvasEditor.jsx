import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, Eye, EyeOff, RotateCcw, Move, ZoomIn } from 'lucide-react'
import { GUI_MASKS } from '../utils/guiMasks'

export default function CanvasEditor({ editorState, setEditorState }) {
  const canvasRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

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
        ctx.fillStyle = ((x + y) / size) % 2 === 0 ? '#1a1a2e' : '#16213e'
        ctx.fillRect(x, y, size, size)
      }
    }

    // Draw uploaded image
    if (editorState.uploadedImage) {
      ctx.save()
      const { x, y, width, height, rotation } = editorState.imageTransform
      ctx.globalAlpha = editorState.opacity
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
        ctx.globalAlpha = 0.85
        ctx.filter = 'none'
        // Draw mask elements
        maskData.elements.forEach(el => {
          ctx.strokeStyle = el.color || '#aaaaaa'
          ctx.lineWidth = 1
          ctx.fillStyle = el.fill || 'rgba(0,0,0,0)'
          if (el.type === 'rect') {
            ctx.fillRect(el.x, el.y, el.w, el.h)
            ctx.strokeRect(el.x, el.y, el.w, el.h)
          } else if (el.type === 'text') {
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
      img.onload = () => {
        updateState({ uploadedImage: img })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileUpload(file)
  }

  const handleCanvasMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = 256 / rect.width
    const scaleY = 256 / rect.height
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      imgX: editorState.imageTransform.x,
      imgY: editorState.imageTransform.y
    })
  }

  const handleCanvasMouseMove = (e) => {
    if (e.buttons !== 1 || !editorState.uploadedImage) return
    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = 256 / rect.width
    const scaleY = 256 / rect.height
    const dx = (e.clientX - rect.left - dragStart.x) * scaleX
    const dy = (e.clientY - rect.top - dragStart.y) * scaleY
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
    { id: 'chest', label: 'Chest' },
    { id: 'crafting', label: 'Crafting' },
    { id: 'furnace', label: 'Furnace' },
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
      {/* Canvas Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">GUI Editor</h2>
          <div className="flex gap-2">
            <button
              onClick={() => updateState({ showMaskOverlay: !editorState.showMaskOverlay })}
              className={`gamer-btn flex items-center gap-2 text-sm ${
                editorState.showMaskOverlay ? 'gamer-btn-primary' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {editorState.showMaskOverlay ? <Eye size={14}/> : <EyeOff size={14}/>}
              Mask Overlay
            </button>
            {editorState.uploadedImage && (
              <button
                onClick={() => updateState({ uploadedImage: null })}
                className="gamer-btn gamer-btn-danger text-sm flex items-center gap-2"
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
          className={`relative border-2 rounded-xl overflow-hidden ${
            isDragging ? 'border-purple-400 border-glow' : 'border-gray-700'
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
            className="canvas-wrapper w-full max-w-[512px] mx-auto block cursor-move"
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
      </div>

      {/* Controls Panel */}
      <div className="space-y-4">
        <div className="gamer-panel p-4 space-y-4">
          <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Transform</h3>
          {[['X Position', 'x', -256, 256], ['Y Position', 'y', -256, 256],
            ['Width', 'width', 32, 512], ['Height', 'height', 32, 512],
            ['Rotation', 'rotation', -180, 180]].map(([label, key, min, max]) => (
            <div key={key}>
              <label className="gamer-label">{label}: {editorState.imageTransform[key]}{key === 'rotation' ? '°' : 'px'}</label>
              <input
                type="range" min={min} max={max}
                value={editorState.imageTransform[key]}
                onChange={(e) => updateState({
                  imageTransform: { ...editorState.imageTransform, [key]: Number(e.target.value) }
                })}
                className="slider-gamer w-full"
              />
            </div>
          ))}
        </div>

        <div className="gamer-panel p-4 space-y-4">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Visual FX</h3>
          {[['Opacity (PvP Glass)', 'opacity', 0, 1, 0.01],
            ['Brightness', 'brightness', 0.1, 3, 0.05],
            ['Contrast', 'contrast', 0.1, 3, 0.05],
            ['Saturation', 'saturation', 0, 3, 0.05]].map(([label, key, min, max, step]) => (
            <div key={key}>
              <label className="gamer-label">{label}: {editorState[key].toFixed(2)}</label>
              <input
                type="range" min={min} max={max} step={step}
                value={editorState[key]}
                onChange={(e) => updateState({ [key]: Number(e.target.value) })}
                className="slider-gamer w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

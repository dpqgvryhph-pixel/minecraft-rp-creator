import { useRef, useEffect, useState, useCallback } from 'react'
import { Upload, Eye, EyeOff, RotateCcw, RefreshCw, Crosshair } from 'lucide-react'
import { GUI_MASKS, GUI_CATEGORIES, GUI_META } from '../utils/guiMasks'

export default function CanvasEditor({ editorState, setEditorState, defaultMaskSlot }) {
  const canvasRef = useRef(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, imgX: 0, imgY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [openCategory, setOpenCategory] = useState('storage')

  const maskId = editorState.selectedMask
  const slot = editorState.masks?.[maskId] ?? defaultMaskSlot()

  const updateSlot = useCallback((updates) =>
    setEditorState(prev => ({
      ...prev,
      masks: {
        ...prev.masks,
        [prev.selectedMask]: {
          ...(prev.masks?.[prev.selectedMask] ?? defaultMaskSlot()),
          ...updates,
        },
      },
    })),
  [setEditorState, defaultMaskSlot])

  const updateTop = useCallback((updates) =>
    setEditorState(prev => ({ ...prev, ...updates })),
  [setEditorState])

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 256)

    // Sakktábla háttér
    const size = 16
    for (let y = 0; y < 256; y += size) {
      for (let x = 0; x < 256; x += size) {
        ctx.fillStyle = ((x / size + y / size)) % 2 === 0 ? '#1a1a2e' : '#16213e'
        ctx.fillRect(x, y, size, size)
      }
    }

    if (slot.uploadedImage) {
      ctx.save()
      const { x, y, width, height, rotation } = slot.imageTransform
      ctx.globalAlpha = slot.opacity
      ctx.filter = `brightness(${slot.brightness}) contrast(${slot.contrast}) saturate(${slot.saturation})`
      ctx.translate(x + width / 2, y + height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.drawImage(slot.uploadedImage, -width / 2, -height / 2, width, height)
      ctx.restore()
    }

    if (editorState.showMaskOverlay) {
      const maskData = GUI_MASKS[maskId]
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
  }, [slot, editorState.showMaskOverlay, maskId])

  useEffect(() => { drawCanvas() }, [drawCanvas])

  // Auto-center számítás: megtartja az aspect ratio-t és 256x256-ba fit-eli
  const calcFitCenteredTransform = useCallback((img) => {
    const aspect = img.naturalWidth / img.naturalHeight
    let w = 256
    let h = 256
    if (aspect > 1)      h = Math.round(256 / aspect)
    else if (aspect < 1) w = Math.round(256 * aspect)
    return {
      x:        Math.round((256 - w) / 2),
      y:        Math.round((256 - h) / 2),
      width:    w,
      height:   h,
      rotation: 0,
    }
  }, [])

  // Center gomb: csak X/Y-t igazítja, méretet nem változtatja
  const calcCenteredXY = useCallback((currentTransform) => ({
    ...currentTransform,
    x: Math.round((256 - (currentTransform?.width ?? 256)) / 2),
    y: Math.round((256 - (currentTransform?.height ?? 256)) / 2),
  }), [])

  const handleFileUpload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Mindig auto-center + aspect-ratio fit feltöltéskor
        const centeredTransform = calcFitCenteredTransform(img)
        updateSlot({ uploadedImage: img, imageTransform: centeredTransform })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [calcFitCenteredTransform, updateSlot])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files[0])
  }

  const getCanvasScale = () => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 1, y: 1 }
    const rect = canvas.getBoundingClientRect()
    return { x: 256 / rect.width, y: 256 / rect.height }
  }

  const handleCanvasMouseDown = (e) => {
    if (!slot.uploadedImage) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      imgX: slot.imageTransform.x,
      imgY: slot.imageTransform.y,
    })
  }

  const handleCanvasMouseMove = (e) => {
    if (e.buttons !== 1 || !slot.uploadedImage) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scale = getCanvasScale()
    const dx = (e.clientX - rect.left - dragStart.x) * scale.x
    const dy = (e.clientY - rect.top - dragStart.y) * scale.y
    updateSlot({
      imageTransform: {
        ...slot.imageTransform,
        x: Math.round(dragStart.imgX + dx),
        y: Math.round(dragStart.imgY + dy),
      },
    })
  }

  const centerImage = () => {
    if (!slot.uploadedImage) return
    updateSlot({ imageTransform: calcCenteredXY(slot.imageTransform) })
  }

  const resetTransform = () =>
    updateSlot({ imageTransform: defaultMaskSlot().imageTransform })

  const resetVisualFX = () => {
    const d = defaultMaskSlot()
    updateSlot({ opacity: d.opacity, brightness: d.brightness, contrast: d.contrast, saturation: d.saturation })
  }

  const resetMask = () => updateSlot(defaultMaskSlot())

  const currentMeta = GUI_META[maskId]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
      {/* Bal – Canvas + mask selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">GUI Editor</h2>
            {currentMeta && (
              <p className="text-xs text-gray-500 mt-0.5">
                Since {currentMeta.since} · {currentMeta.label}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updateTop({ showMaskOverlay: !editorState.showMaskOverlay })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                editorState.showMaskOverlay
                  ? 'bg-purple-700 hover:bg-purple-600 text-white border-purple-500'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600'
              }`}>
              {editorState.showMaskOverlay ? <Eye size={14}/> : <EyeOff size={14}/>}
              Mask Overlay
            </button>
            {slot.uploadedImage && (
              <button onClick={resetMask}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-700 hover:bg-red-600 text-white border border-red-500 transition-all">
                <RotateCcw size={14}/> Reset mask
              </button>
            )}
          </div>
        </div>

        {/* Kategória gombok */}
        <div className="space-y-2">
          <div className="flex gap-1 flex-wrap">
            {GUI_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setOpenCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  openCategory === cat.id
                    ? 'bg-purple-800 text-purple-100 border border-purple-500'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(GUI_META)
              .filter(([, meta]) => meta.category === openCategory)
              .map(([id, meta]) => {
                const hasImage = !!editorState.masks?.[id]?.uploadedImage
                return (
                  <button key={id} onClick={() => updateTop({ selectedMask: id })}
                    className={`relative px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      maskId === id
                        ? 'bg-cyan-700 text-cyan-100 border border-cyan-500'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                    }`}>
                    {meta.label.replace(/ \(.*\)/, '')}
                    {hasImage && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 border border-gray-950" />
                    )}
                  </button>
                )
              })}
          </div>
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
            width={256} height={256}
            className="w-full max-w-[512px] mx-auto block cursor-move"
            style={{ imageRendering: 'pixelated' }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
          />
          {!slot.uploadedImage && (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-950/20 transition-colors">
              <Upload size={32} className="text-gray-500 mb-3" />
              <p className="text-gray-400 font-medium">Drop image or click to upload</p>
              <p className="text-gray-600 text-sm mt-1">PNG, JPG, WEBP – max 4MB</p>
              <input type="file" className="hidden" accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])} />
            </label>
          )}
        </div>

        <p className="text-xs text-gray-600">
          Tip: Húzd a képet a canvason a pozicionáláshoz. A zöld pont jelzi, ha az adott mask-hoz van kép feltöltve.
        </p>
      </div>

      {/* Jobb – Kontrollok */}
      <div className="space-y-4">
        {/* Transform */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Transform</h3>
            <div className="flex gap-1.5">
              {slot.uploadedImage && (
                <button onClick={centerImage}
                  title="Kép X/Y középre igazítása (méret változatlan)"
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                             bg-cyan-900 hover:bg-cyan-800 text-cyan-300 border border-cyan-700 transition-all">
                  <Crosshair size={11} /> Center
                </button>
              )}
              <button onClick={resetTransform}
                title="Visszaállítás: X=0, Y=0, W=256, H=256, Rot=0°"
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                           bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 transition-all">
                <RefreshCw size={11} /> Reset
              </button>
            </div>
          </div>
          {[
            ['X Position', 'x',      -256, 256, 1, 'px', 0],
            ['Y Position', 'y',      -256, 256, 1, 'px', 0],
            ['Width',      'width',    32, 512, 1, 'px', 256],
            ['Height',     'height',   32, 512, 1, 'px', 256],
            ['Rotation',   'rotation',-180, 180, 1, '°', 0],
          ].map(([label, key, min, max, step, unit, def]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider">
                  {label}: <span className="text-gray-200">{slot.imageTransform[key]}{unit}</span>
                </label>
                {slot.imageTransform[key] !== def && (
                  <button
                    onClick={() => updateSlot({ imageTransform: { ...slot.imageTransform, [key]: def } })}
                    title={`Visszaállítás: ${def}${unit}`}
                    className="text-[10px] text-gray-600 hover:text-cyan-400 transition-colors px-1">
                    ↺{def}{unit}
                  </button>
                )}
              </div>
              <input type="range" min={min} max={max} step={step}
                value={slot.imageTransform[key]}
                onChange={(e) => updateSlot({ imageTransform: { ...slot.imageTransform, [key]: Number(e.target.value) } })}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: 'linear-gradient(to right, #7c3aed, #06b6d4)' }}
              />
            </div>
          ))}
        </div>

        {/* Visual FX */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Visual FX</h3>
            <button onClick={resetVisualFX}
              title="Opacity=1.00, Brightness=1.00, Contrast=1.05, Saturation=1.00"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                         bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 transition-all">
              <RefreshCw size={11} /> Reset
            </button>
          </div>
          {[
            ['Opacity',    'opacity',    0,   1,   0.01, 1],
            ['Brightness', 'brightness', 0.1, 3,   0.05, 1],
            ['Contrast',   'contrast',   0.1, 3,   0.05, 1.05],
            ['Saturation', 'saturation', 0,   3,   0.05, 1],
          ].map(([label, key, min, max, step, def]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-400 uppercase tracking-wider">
                  {label}: <span className="text-gray-200">{slot[key].toFixed(2)}</span>
                </label>
                {Math.abs(slot[key] - def) > 0.001 && (
                  <button onClick={() => updateSlot({ [key]: def })}
                    title={`Visszaállítás: ${def.toFixed(2)}`}
                    className="text-[10px] text-gray-600 hover:text-cyan-400 transition-colors px-1">
                    ↺{def.toFixed(2)}
                  </button>
                )}
              </div>
              <input type="range" min={min} max={max} step={step}
                value={slot[key]}
                onChange={(e) => updateSlot({ [key]: Number(e.target.value) })}
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

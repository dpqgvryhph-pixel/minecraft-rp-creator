import { useRef, useEffect, useState, useCallback } from 'react'
import { Upload, Eye, EyeOff, RotateCcw, RefreshCw, Crosshair, ExternalLink } from 'lucide-react'
import { GUI_MASKS, GUI_CATEGORIES, GUI_META, getMaskBounds } from '../utils/guiMasks'

// ─── Standalone preview HTML ─────────────────────────────────────────────────
// Builds a self-contained HTML page that opens in a new tab and shows the GUI
// at a scaled, readable size (4× the 256-px canvas = 1024 px wide).
function buildPreviewHTML(maskId, imageDataUrl, maskElements, guiBounds) {
  const SCALE = 4
  const W = 256 * SCALE
  const H = 256 * SCALE
  const meta = GUI_META[maskId] || {}

  // Serialise mask elements to a JS literal so the preview page can draw them
  const elementsJSON = JSON.stringify(maskElements)

  return `<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8"/>
<title>GUI Preview – ${meta.label || maskId}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0a0a16;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    font-family: monospace;
    color: #ccc;
    padding: 24px;
    gap: 16px;
  }
  h1  { font-size: 14px; color: #7dd3fc; letter-spacing: .05em; }
  p   { font-size: 11px; color: #4b5563; }
  canvas {
    image-rendering: pixelated;
    border: 1px solid #374151;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,.6);
  }
  .badge {
    display: inline-flex; gap: 8px; flex-wrap: wrap; justify-content: center;
    font-size: 11px; color: #6b7280;
  }
  .badge span { background: #1f2937; border: 1px solid #374151;
    border-radius: 4px; padding: 2px 8px; }
  #ruler {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    font-size: 10px;
    color: #374151;
    max-width: ${W}px;
    width: 100%;
  }
</style>
</head>
<body>
<h1>🎮 GUI Preview – ${meta.label || maskId}</h1>
<div class="badge">
  <span>Canvas: 256×256 px → ${SCALE}× = ${W}×${H} px</span>
  <span>GUI: ${guiBounds.w}×${guiBounds.h} px @ (${guiBounds.x}, ${guiBounds.y})</span>
  <span>Since ${meta.since || '?'}</span>
</div>
<canvas id="c" width="${W}" height="${H}"></canvas>
<div id="ruler">
  <span>↕ GUI top: ${guiBounds.y * SCALE} px</span>
  <span>↕ GUI bottom: ${(guiBounds.y + guiBounds.h) * SCALE} px</span>
  <span>↔ GUI left: ${guiBounds.x * SCALE} px</span>
  <span>↔ GUI right: ${(guiBounds.x + guiBounds.w) * SCALE} px</span>
</div>
<p>Bezárhatod ezt a lapot – nem menthető, csak előnézet.</p>
<script>
(function(){
  const SCALE = ${SCALE};
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');

  // checkerboard
  const SQ = 16 * SCALE;
  for (let y = 0; y < canvas.height; y += SQ)
    for (let x = 0; x < canvas.width; x += SQ)
      ctx.fillStyle = ((x/SQ + y/SQ) % 2 === 0) ? '#1a1a2e' : '#16213e',
      ctx.fillRect(x, y, SQ, SQ);

  // uploaded image
  ${imageDataUrl ? `
  const img = new Image();
  img.onload = function() {
    ctx.save();
    ctx.drawImage(img, 0, 0, ${W}, ${H});
    ctx.restore();
    drawMask();
  };
  img.src = ${JSON.stringify(imageDataUrl)};
  ` : 'drawMask();'}

  function drawMask() {
    const elements = ${elementsJSON};
    elements.forEach(function(el) {
      if (el.type === 'rect') {
        ctx.globalAlpha = el.fillAlpha || 0.85;
        ctx.fillStyle   = el.fill  || 'rgba(0,0,0,0)';
        ctx.fillRect(el.x*SCALE, el.y*SCALE, el.w*SCALE, el.h*SCALE);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = el.color || '#aaa';
        ctx.lineWidth   = SCALE * 0.5;
        ctx.strokeRect(el.x*SCALE + 0.5, el.y*SCALE + 0.5, (el.w-1)*SCALE, (el.h-1)*SCALE);
      } else if (el.type === 'text') {
        ctx.globalAlpha = 1;
        ctx.fillStyle   = el.color || '#fff';
        // scale font size
        var font = (el.font || '7px monospace').replace(/([\d.]+)px/, function(_,n){ return (parseFloat(n)*SCALE)+'px'; });
        ctx.font = font;
        ctx.fillText(el.text, el.x*SCALE, el.y*SCALE);
      }
    });

    // GUI bounding box highlight
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(100,200,255,0.5)';
    ctx.lineWidth   = 1;
    ctx.setLineDash([SCALE*4, SCALE*2]);
    ctx.strokeRect(${guiBounds.x}*SCALE, ${guiBounds.y}*SCALE, ${guiBounds.w}*SCALE, ${guiBounds.h}*SCALE);
    ctx.restore();
  }
})();
</script>
</body>
</html>`
}

export default function CanvasEditor({ editorState, setEditorState, defaultMaskSlot }) {
  const canvasRef   = useRef(null)
  const [dragStart, setDragStart]       = useState({ x: 0, y: 0, imgX: 0, imgY: 0 })
  const [isDragging, setIsDragging]     = useState(false)
  const [openCategory, setOpenCategory] = useState('storage')

  const maskId = editorState.selectedMask
  const slot   = editorState.masks?.[maskId] ?? defaultMaskSlot()

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

    // checkerboard background
    const size = 16
    for (let y = 0; y < 256; y += size)
      for (let x = 0; x < 256; x += size) {
        ctx.fillStyle = ((x / size + y / size)) % 2 === 0 ? '#1a1a2e' : '#16213e'
        ctx.fillRect(x, y, size, size)
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
            ctx.fillStyle   = el.fill || 'rgba(0,0,0,0)'
            ctx.fillRect(el.x, el.y, el.w, el.h)
            ctx.globalAlpha = 1
            ctx.strokeStyle = el.color || '#aaaaaa'
            ctx.lineWidth   = 1
            ctx.strokeRect(el.x + 0.5, el.y + 0.5, el.w - 1, el.h - 1)
          } else if (el.type === 'text') {
            ctx.globalAlpha = 1
            ctx.fillStyle   = el.color || '#ffffff'
            ctx.font        = el.font || '7px monospace'
            ctx.fillText(el.text, el.x, el.y)
          }
        })
        ctx.restore()
      }
    }
  }, [slot, editorState.showMaskOverlay, maskId])

  useEffect(() => { drawCanvas() }, [drawCanvas])

  // ── Fit-center: places the uploaded image so it fills the GUI panel area
  // while preserving aspect ratio. Unlike a plain canvas-center, this aligns
  // the image to the actual GUI bounds (guiX/Y + guiW/H from GUI_META).
  const calcMaskFitTransform = useCallback((img) => {
    if (img.naturalWidth === 256 && img.naturalHeight === 256) {
      return { x: 0, y: 0, width: 256, height: 256, rotation: 0 }
    }
    const bounds = getMaskBounds(maskId)       // { x, y, w, h } of the GUI panel
    const aspect = img.naturalWidth / img.naturalHeight
    let w = bounds.w
    let h = bounds.h
    if (w / h > aspect) { w = Math.round(h * aspect) }
    else                { h = Math.round(w / aspect) }
    return {
      x:        Math.round(bounds.x + (bounds.w - w) / 2),
      y:        Math.round(bounds.y + (bounds.h - h) / 2),
      width:    w,
      height:   h,
      rotation: 0,
    }
  }, [maskId])

  // Center only X/Y, keep current size – snaps to GUI panel centre
  const calcCenterXY = useCallback((t) => {
    const bounds = getMaskBounds(maskId)
    return {
      ...t,
      x: Math.round(bounds.x + (bounds.w - t.width)  / 2),
      y: Math.round(bounds.y + (bounds.h - t.height) / 2),
    }
  }, [maskId])

  const handleFileUpload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        updateSlot({ uploadedImage: img, imageTransform: calcMaskFitTransform(img) })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [calcMaskFitTransform, updateSlot])

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
    const rect = canvasRef.current.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      imgX: slot.imageTransform.x,
      imgY: slot.imageTransform.y,
    })
  }

  const handleCanvasMouseMove = (e) => {
    if (e.buttons !== 1 || !slot.uploadedImage) return
    const rect  = canvasRef.current.getBoundingClientRect()
    const scale = getCanvasScale()
    const dx    = (e.clientX - rect.left - dragStart.x) * scale.x
    const dy    = (e.clientY - rect.top  - dragStart.y) * scale.y
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
    updateSlot({ imageTransform: calcCenterXY(slot.imageTransform) })
  }

  // Fit-center a mask-ra (méretet is visszaállítja a GUI bounds-hoz)
  const fitToMask = () => {
    if (!slot.uploadedImage) return
    updateSlot({ imageTransform: calcMaskFitTransform(slot.uploadedImage) })
  }

  const fillCanvas = () => {
    if (!slot.uploadedImage) return
    updateSlot({ imageTransform: { x: 0, y: 0, width: 256, height: 256, rotation: 0 } })
  }

  const resetTransform = () => updateSlot({ imageTransform: defaultMaskSlot().imageTransform })
  const resetVisualFX  = () => {
    const d = defaultMaskSlot()
    updateSlot({ opacity: d.opacity, brightness: d.brightness, contrast: d.contrast, saturation: d.saturation })
  }
  const resetMask = () => updateSlot(defaultMaskSlot())

  // ── Standalone preview ─────────────────────────────────────────────────────
  const openPreview = () => {
    const maskData  = GUI_MASKS[maskId]
    if (!maskData) return
    const bounds    = getMaskBounds(maskId)
    // Render current canvas to a data URL so the preview shows the composite
    let imgDataUrl  = null
    if (canvasRef.current) imgDataUrl = canvasRef.current.toDataURL('image/png')
    const html      = buildPreviewHTML(maskId, imgDataUrl, maskData.elements, bounds)
    const blob      = new Blob([html], { type: 'text/html' })
    const url       = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    // Revoke after a short delay so the new tab can load it
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  const currentMeta = GUI_META[maskId]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
      {/* ── Left: canvas + mask selector ──────────────────────────────── */}
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
          <div className="flex gap-2 flex-wrap">
            {/* Preview in new tab */}
            <button
              onClick={openPreview}
              title="Megnyitás új lapon – 4× nagyítás, mértani vonalakkal"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                         bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600 transition-all">
              <ExternalLink size={14}/> Előnézet
            </button>
            <button
              onClick={() => updateTop({ showMaskOverlay: !editorState.showMaskOverlay })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                editorState.showMaskOverlay
                  ? 'bg-purple-700 hover:bg-purple-600 text-white border-purple-500'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600'
              }`}>
              {editorState.showMaskOverlay ? <Eye size={14}/> : <EyeOff size={14}/>}
              Mask
            </button>
            {slot.uploadedImage && (
              <button onClick={resetMask}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                           bg-red-700 hover:bg-red-600 text-white border border-red-500 transition-all">
                <RotateCcw size={14}/> Reset
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
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
                    {meta.label}
                    {hasImage && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full
                                       bg-green-400 border border-gray-950" />
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
            <label className="absolute inset-0 flex flex-col items-center justify-center
                              cursor-pointer hover:bg-purple-950/20 transition-colors">
              <Upload size={32} className="text-gray-500 mb-3" />
              <p className="text-gray-400 font-medium">Drop image or click to upload</p>
              <p className="text-gray-600 text-sm mt-1">PNG, JPG, WEBP – max 4MB</p>
              <input type="file" className="hidden" accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])} />
            </label>
          )}
        </div>

        <p className="text-xs text-gray-600">
          Húzd a képet a canvason belül a pozicionáláshoz.
          Az <strong className="text-gray-500">Előnézet</strong> gomb 4× nagyításban,
          új lapon nyitja meg a GUI-t a mértani jelölésekkel.
        </p>
      </div>

      {/* ── Right: controls ───────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Transform */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Transform</h3>
            <div className="flex gap-1.5">
              {slot.uploadedImage && (
                <>
                  <button onClick={fitToMask}
                    title="Kép igazítása a GUI panel méretéhez és pozíciójához"
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                               bg-purple-900 hover:bg-purple-800 text-purple-300 border border-purple-700 transition-all">
                    <Crosshair size={11}/> Fit
                  </button>
                  <button onClick={centerImage}
                    title="Kép X/Y középre a GUI panel közepéhez (méret változatlan)"
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                               bg-cyan-900 hover:bg-cyan-800 text-cyan-300 border border-cyan-700 transition-all">
                    <Crosshair size={11}/> Center
                  </button>
                  <button onClick={fillCanvas}
                    title="Kép kihúzása a teljes 256x256-os vászonra"
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                               bg-green-900 hover:bg-green-800 text-green-300 border border-green-700 transition-all">
                    <Crosshair size={11}/> Fill
                  </button>
                </>
              )}
              <button onClick={resetTransform}
                title="Visszaállítás: X=0, Y=0, W=256, H=256, Rot=0°"
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
                           bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 transition-all">
                <RefreshCw size={11}/> Reset
              </button>
            </div>
          </div>

          {/* Mask bounds info */}
          {(() => {
            const b = getMaskBounds(maskId)
            return (
              <p className="text-[10px] text-gray-600 font-mono">
                GUI panel: {b.w}×{b.h} @ ({b.x}, {b.y})
              </p>
            )
          })()}

          {[
            ['X Position', 'x',       -256, 256, 1, 'px', 0],
            ['Y Position', 'y',       -256, 256, 1, 'px', 0],
            ['Width',      'width',     32, 512, 1, 'px', 256],
            ['Height',     'height',    32, 512, 1, 'px', 256],
            ['Rotation',   'rotation', -180, 180, 1, '°',  0],
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
              <RefreshCw size={11}/> Reset
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

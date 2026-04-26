import { useState } from 'react'
import JSZip from 'jszip'
import { Download, FolderOpen, CheckCircle, Loader, FileText, AlertCircle } from 'lucide-react'
import { PACK_FORMATS } from '../utils/packFormats'
import { GUI_TEXTURE_PATHS } from '../utils/guiMasks'

export default function ExportPanel({ packSettings, editorState }) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  const packFormat = PACK_FORMATS[packSettings.version] || 34

  const getCanvasBlob = () => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')

      // Transparent base (important for PNG export)
      ctx.clearRect(0, 0, 256, 256)

      if (editorState.uploadedImage) {
        const { x, y, width, height, rotation } = editorState.imageTransform
        ctx.save()
        ctx.globalAlpha = editorState.opacity
        // FIXED: saturate() is the correct CSS filter function name
        ctx.filter = `brightness(${editorState.brightness}) contrast(${editorState.contrast}) saturate(${editorState.saturation})`
        ctx.translate(x + width / 2, y + height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.drawImage(editorState.uploadedImage, -width / 2, -height / 2, width, height)
        ctx.restore()
      }

      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas toBlob failed'))
      }, 'image/png')
    })
  }

  const handleExport = async () => {
    setExporting(true)
    setDone(false)
    setError(null)

    try {
      const zip = new JSZip()
      const packName = packSettings.name.replace(/[^a-zA-Z0-9_\-]/g, '_') || 'MyResourcePack'

      // pack.mcmeta
      const mcmeta = JSON.stringify({
        pack: {
          pack_format: packFormat,
          description: packSettings.description || ''
        }
      }, null, 2)
      zip.file('pack.mcmeta', mcmeta)

      // pack.png (64x64 icon)
      const iconCanvas = document.createElement('canvas')
      iconCanvas.width = 64
      iconCanvas.height = 64
      const iCtx = iconCanvas.getContext('2d')
      iCtx.fillStyle = '#1a1a2e'
      iCtx.fillRect(0, 0, 64, 64)
      iCtx.fillStyle = '#7c3aed'
      iCtx.fillRect(0, 0, 64, 32)
      iCtx.fillStyle = '#06b6d4'
      iCtx.fillRect(0, 32, 64, 32)
      iCtx.fillStyle = '#ffffff'
      iCtx.font = 'bold 14px monospace'
      iCtx.textAlign = 'center'
      iCtx.fillText('MC', 32, 37)
      const packPngBlob = await new Promise(r => iconCanvas.toBlob(r, 'image/png'))
      zip.file('pack.png', packPngBlob)

      // GUI texture
      const texturePath = GUI_TEXTURE_PATHS[editorState.selectedMask]
      const textureBlob = await getCanvasBlob()
      zip.file(`assets/minecraft/textures/${texturePath}`, textureBlob)

      // Generate
      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      })

      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${packName}_${packSettings.version.replace(/\s/g, '')}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDone(true)
      setTimeout(() => setDone(false), 4000)
    } catch (err) {
      console.error('Export failed:', err)
      setError(err.message)
    } finally {
      setExporting(false)
    }
  }

  const texturePath = GUI_TEXTURE_PATHS[editorState.selectedMask]

  const fileStructure = [
    { path: 'pack.mcmeta', desc: `pack_format: ${packFormat} — auto-generated` },
    { path: 'pack.png', desc: 'Pack icon 64×64 px' },
    { path: `assets/minecraft/textures/${texturePath}`, desc: 'Edited GUI texture 256×256 PNG' },
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Export Resource Pack</h2>
        <p className="text-sm text-gray-400">Generate a complete Minecraft-ready .zip file, entirely client-side</p>
      </div>

      {/* Summary */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Pack Summary</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['Name', packSettings.name || '—'],
            ['MC Version', packSettings.version],
            ['pack_format', packFormat],
            ['GUI Mask', editorState.selectedMask],
            ['Has Texture', editorState.uploadedImage ? '✓ Yes' : '✗ Empty canvas'],
            ['Author', packSettings.author || 'Unknown']
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="text-gray-500 shrink-0">{k}:</span>
              <span className={`font-medium ${
                v === '✓ Yes' ? 'text-green-400' :
                v === '✗ Empty canvas' ? 'text-yellow-400' : 'text-gray-200'
              }`}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File structure */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <FolderOpen size={16} className="text-yellow-400" />
          <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">ZIP Structure</h3>
        </div>
        <div className="space-y-2.5">
          {fileStructure.map(({ path, desc }) => (
            <div key={path} className="flex items-start gap-3 text-sm">
              <FileText size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <code className="text-cyan-400 text-xs break-all">{path}</code>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning if no image */}
      {!editorState.uploadedImage && (
        <div className="flex items-start gap-3 bg-yellow-950/40 border border-yellow-700/50 rounded-xl p-4">
          <AlertCircle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-300">
            No image uploaded. The exported texture will be a blank transparent PNG.
            Go to <strong className="text-yellow-200">GUI Editor</strong> to upload an image first.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-950/40 border border-red-700/50 rounded-xl p-4">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">Export failed: {error}</p>
        </div>
      )}

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={exporting}
        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
          done
            ? 'bg-green-700 text-green-100'
            : exporting
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg'
        }`}
      >
        {done ? (
          <><CheckCircle size={20} /> Downloaded successfully!</>
        ) : exporting ? (
          <><Loader size={20} className="animate-spin" /> Generating ZIP…</>
        ) : (
          <><Download size={20} /> Download Resource Pack .zip</>
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        ZIP generated 100% client-side via JSZip. No data is sent to any server.
      </p>
    </div>
  )
}

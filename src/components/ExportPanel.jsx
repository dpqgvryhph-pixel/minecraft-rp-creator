import { useState } from 'react'
import JSZip from 'jszip'
import { Download, FolderOpen, CheckCircle, Loader, FileText } from 'lucide-react'
import { PACK_FORMATS } from '../utils/packFormats'
import { GUI_TEXTURE_PATHS } from '../utils/guiMasks'

export default function ExportPanel({ packSettings, editorState }) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)

  const packFormat = PACK_FORMATS[packSettings.version] || 34

  const getCanvasBlob = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')

      if (editorState.uploadedImage) {
        const { x, y, width, height, rotation } = editorState.imageTransform
        ctx.save()
        ctx.globalAlpha = editorState.opacity
        ctx.filter = `brightness(${editorState.brightness}) contrast(${editorState.contrast}) saturate(${editorState.saturation})`
        ctx.translate(x + width / 2, y + height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.drawImage(editorState.uploadedImage, -width / 2, -height / 2, width, height)
        ctx.restore()
      }

      canvas.toBlob(resolve, 'image/png')
    })
  }

  const handleExport = async () => {
    setExporting(true)
    setDone(false)

    try {
      const zip = new JSZip()
      const packName = packSettings.name.replace(/[^a-zA-Z0-9_-]/g, '_')

      // pack.mcmeta
      const mcmeta = JSON.stringify({
        pack: {
          pack_format: packFormat,
          description: packSettings.description
        }
      }, null, 2)
      zip.file('pack.mcmeta', mcmeta)

      // pack.png placeholder
      const placeholderCanvas = document.createElement('canvas')
      placeholderCanvas.width = 64
      placeholderCanvas.height = 64
      const pCtx = placeholderCanvas.getContext('2d')
      pCtx.fillStyle = '#7c3aed'
      pCtx.fillRect(0, 0, 64, 64)
      pCtx.fillStyle = '#ffffff'
      pCtx.font = 'bold 12px monospace'
      pCtx.fillText('MC', 20, 36)
      const packPngBlob = await new Promise(r => placeholderCanvas.toBlob(r, 'image/png'))
      zip.file('pack.png', packPngBlob)

      // Texture
      const texturePath = GUI_TEXTURE_PATHS[editorState.selectedMask]
      const textureBlob = await getCanvasBlob()
      zip.file(`assets/minecraft/textures/${texturePath}`, textureBlob)

      // Generate and download
      const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${packName}_v${packSettings.version}.zip`
      a.click()
      URL.revokeObjectURL(url)

      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  const fileStructure = [
    { path: 'pack.mcmeta', desc: 'Auto-generated metadata' },
    { path: 'pack.png', desc: 'Pack icon (64x64)' },
    { path: `assets/minecraft/textures/${GUI_TEXTURE_PATHS[editorState.selectedMask]}`, desc: 'Edited GUI texture (256x256 PNG)' },
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Export Resource Pack</h2>
        <p className="text-sm text-gray-400">Generate a complete Minecraft-ready ZIP file</p>
      </div>

      {/* Summary */}
      <div className="gamer-panel p-5 space-y-3">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Pack Summary</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['Name', packSettings.name],
            ['Version', packSettings.version],
            ['pack_format', packFormat],
            ['GUI Mask', editorState.selectedMask],
            ['Has Texture', editorState.uploadedImage ? 'Yes' : 'No (empty)'],
            ['Author', packSettings.author || 'Unknown']
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="text-gray-500">{k}:</span>
              <span className="text-gray-200 font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File structure */}
      <div className="gamer-panel p-5 space-y-3">
        <div className="flex items-center gap-2">
          <FolderOpen size={16} className="text-yellow-400" />
          <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">ZIP Structure</h3>
        </div>
        <div className="space-y-2">
          {fileStructure.map(({ path, desc }) => (
            <div key={path} className="flex items-start gap-3 text-sm">
              <FileText size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <code className="text-cyan-400 text-xs">{path}</code>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={exporting}
        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
          done
            ? 'bg-green-700 text-green-100'
            : exporting
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg shadow-purple-900/50'
        }`}
      >
        {done ? (
          <><CheckCircle size={20} /> Downloaded!</>
        ) : exporting ? (
          <><Loader size={20} className="animate-spin" /> Generating ZIP...</>
        ) : (
          <><Download size={20} /> Download Resource Pack .ZIP</>
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        The ZIP is generated entirely client-side. No data is sent to any server.
      </p>
    </div>
  )
}

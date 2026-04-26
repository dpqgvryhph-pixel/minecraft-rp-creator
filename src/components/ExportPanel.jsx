import { useState } from 'react'
import JSZip from 'jszip'
import { Download, FolderOpen, CheckCircle, Loader, FileText, AlertCircle, Info, AlertTriangle, HelpCircle } from 'lucide-react'
import { PACK_FORMATS, LEGACY_VERSIONS, DEFAULT_PACK_FORMAT } from '../utils/packFormats'
import { GUI_TEXTURE_PATHS, GUI_META } from '../utils/guiMasks'

// Legacy GUI path overrides (pre-1.13)
const LEGACY_PATHS = {
  inventory:   'assets/minecraft/textures/gui/inventory.png',
  chest:       'assets/minecraft/textures/gui/container/generic_54.png',
  chest_small: 'assets/minecraft/textures/gui/container/container.png',
  crafting:    'assets/minecraft/textures/gui/container/crafting_table.png',
  furnace:     'assets/minecraft/textures/gui/container/furnace.png',
  dispenser:   'assets/minecraft/textures/gui/container/dispenser.png',
  hopper:      'assets/minecraft/textures/gui/container/hopper.png',
  enchanting:  'assets/minecraft/textures/gui/container/enchanting_table.png',
  brewing:     'assets/minecraft/textures/gui/container/brewing_stand.png',
  anvil:       'assets/minecraft/textures/gui/container/anvil.png',
  beacon:      'assets/minecraft/textures/gui/container/beacon.png',
  horse:       'assets/minecraft/textures/gui/container/horse.png',
}

export default function ExportPanel({ packSettings, editorState }) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  const selectedVer = PACK_FORMATS.find(v => v.label === packSettings.version)
  const packFormat  = selectedVer?.format ?? DEFAULT_PACK_FORMAT
  const support     = selectedVer?.support ?? 'likely'
  const isLegacy    = LEGACY_VERSIONS.has(packSettings.version)

  const getTexturePath = () => {
    const maskId = editorState.selectedMask
    const modern = `assets/minecraft/textures/${GUI_TEXTURE_PATHS[maskId]}`
    return (isLegacy && LEGACY_PATHS[maskId]) ? LEGACY_PATHS[maskId] : modern
  }

  const getCanvasBlob = () => new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = 256; canvas.height = 256
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 256)
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
    canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob failed')), 'image/png')
  })

  // Convert base64 dataUrl to Blob
  const dataUrlToBlob = (dataUrl) => {
    const [header, data] = dataUrl.split(',')
    const mime = header.match(/:(.*?);/)[1]
    const bytes = atob(data)
    const arr = new Uint8Array(bytes.length)
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
    return new Blob([arr], { type: mime })
  }

  const buildDefaultIcon = () => new Promise(resolve => {
    const canvas = document.createElement('canvas')
    canvas.width = 64; canvas.height = 64
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 64, 64)
    ctx.fillStyle = '#7c3aed'; ctx.fillRect(0, 0, 64, 32)
    ctx.fillStyle = '#06b6d4'; ctx.fillRect(0, 32, 64, 32)
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 14px monospace'
    ctx.textAlign = 'center'; ctx.fillText('MC', 32, 37)
    canvas.toBlob(resolve, 'image/png')
  })

  const handleExport = async () => {
    setExporting(true); setDone(false); setError(null)
    try {
      const zip = new JSZip()
      const packName = packSettings.name.replace(/[^a-zA-Z0-9_\-]/g, '_') || 'MyResourcePack'

      // pack.mcmeta
      zip.file('pack.mcmeta', JSON.stringify({
        pack: { pack_format: packFormat, description: packSettings.description || '' }
      }, null, 2))

      // pack.png – custom icon or default
      const iconBlob = packSettings.iconDataUrl
        ? dataUrlToBlob(packSettings.iconDataUrl)
        : await buildDefaultIcon()
      zip.file('pack.png', iconBlob)

      // GUI texture
      const texturePath = getTexturePath()
      const textureBlob = await getCanvasBlob()
      zip.file(texturePath, textureBlob)

      const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${packName}_${packSettings.version.replace(/[\s\u2013\-]+/g, '')}.zip`
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
      setDone(true)
      setTimeout(() => setDone(false), 4000)
    } catch (err) {
      console.error('Export failed:', err)
      setError(err.message)
    } finally {
      setExporting(false)
    }
  }

  const texturePath = getTexturePath()
  const maskMeta = GUI_META[editorState.selectedMask]

  const supportCfg = {
    guaranteed: { cls: 'text-green-400',  bgCls: 'bg-green-950/40 border-green-800/50',  icon: CheckCircle,   label: '✅ Garantált' },
    likely:     { cls: 'text-yellow-400', bgCls: 'bg-yellow-950/40 border-yellow-800/50', icon: HelpCircle,    label: '🟡 Valószínű' },
    maybe:      { cls: 'text-orange-400', bgCls: 'bg-orange-950/40 border-orange-800/50', icon: AlertTriangle, label: '🟠 Lehet, hogy mőködik' },
  }[support] ?? { cls: 'text-gray-400', bgCls: 'bg-gray-800 border-gray-700', icon: HelpCircle, label: support }

  const SupportIcon = supportCfg.icon

  const fileStructure = [
    { path: 'pack.mcmeta',  desc: `pack_format: ${packFormat}` },
    { path: 'pack.png',     desc: packSettings.iconDataUrl ? 'Egyedi icon (64×64 px)' : 'Alap icon – nincs egyedi beállítva' },
    { path: texturePath,    desc: `${maskMeta?.label ?? editorState.selectedMask} – 256×256 PNG` },
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
            ['Név', packSettings.name || '—'],
            ['Verzió', packSettings.version],
            ['pack_format', packFormat],
            ['Kompatibilitás', null],
            ['GUI', maskMeta?.label ?? editorState.selectedMask],
            ['Icon', packSettings.iconDataUrl ? '✓ Egyedi' : '✓ Alap'],
            ['Texture', editorState.uploadedImage ? '✓ Feltöltve' : '✗ Üres canvas'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2 items-center">
              <span className="text-gray-500 shrink-0">{k}:</span>
              {v === null
                ? <span className={`font-medium text-xs ${supportCfg.cls}`}>{supportCfg.label}</span>
                : <span className={`font-medium ${
                    v.startsWith('✓') ? 'text-green-400' :
                    v.startsWith('✗') ? 'text-yellow-400' : 'text-gray-200'
                  }`}>{v}</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Compat banner */}
      {support !== 'guaranteed' && (
        <div className={`flex items-start gap-3 border rounded-xl p-4 ${supportCfg.bgCls}`}>
          <SupportIcon size={16} className={`${supportCfg.cls} shrink-0 mt-0.5`} />
          <p className={`text-sm ${supportCfg.cls}`}>
            {support === 'likely' && 'Ez a verzió valószínűleg működik, de nem lett teljesen tesztelve. A GUI texture elérési utak 1.13-ban változtak.'}
            {support === 'maybe'  && <><strong>Legacy mód (pre-1.13):</strong> Régi fájlstruktúra. Egyes GUI-k még nem léteztek. Az export a helyes legacy útvonalon menti a fájlt.</>}
          </p>
        </div>
      )}

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

      {!editorState.uploadedImage && (
        <div className="flex items-start gap-3 bg-yellow-950/40 border border-yellow-700/50 rounded-xl p-4">
          <AlertCircle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-300">
            Nincs feltöltött kép. Az exportált texture üres, átlátszó PNG lesz.
            Menj a <strong>GUI Editor</strong> fülre és töltsd fel a képet.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 bg-red-950/40 border border-red-700/50 rounded-xl p-4">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">Export failed: {error}</p>
        </div>
      )}

      <button onClick={handleExport} disabled={exporting}
        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
          done      ? 'bg-green-700 text-green-100' :
          exporting ? 'bg-gray-700 text-gray-400 cursor-not-allowed' :
          'bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg'
        }`}>
        {done      ? <><CheckCircle size={20} /> Letöltve!</> :
         exporting ? <><Loader size={20} className="animate-spin" /> Generálás…</> :
         <><Download size={20} /> Resource Pack letöltése (.zip)</>}
      </button>

      <p className="text-xs text-gray-600 text-center">
        A ZIP 100% client-side generálódik (JSZip). Semmilyen adat nem kerül szerverre.
      </p>
    </div>
  )
}

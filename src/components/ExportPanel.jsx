import { useState } from 'react'
import JSZip from 'jszip'
import { Download, FolderOpen, CheckCircle, Loader, FileText, AlertCircle, AlertTriangle, HelpCircle, Cloud } from 'lucide-react'
import { PACK_FORMATS, LEGACY_VERSIONS, REPOSITIONED_VERSIONS } from '../utils/packFormats'
import { GUI_TEXTURE_PATHS, GUI_META } from '../utils/guiMasks'
import SaveModal from './SaveModal'

const FIXED_DESCRIPTION = 'made by: GUICraft'

// Pre-1.13 legacy GUI fájlnevek (vanilla helyes nevek)
const LEGACY_PATHS = {
  inventory:   'assets/minecraft/textures/gui/inventory.png',
  chest:       'assets/minecraft/textures/gui/container/generic_54.png',
  chest_small: 'assets/minecraft/textures/gui/container/chest.png',
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

const PACK_FORMATS_MAP = Object.fromEntries(PACK_FORMATS.map(v => [v.label, v]))

export default function ExportPanel({ packSettings, editorState }) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone]           = useState(false)
  const [error, setError]         = useState(null)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const selectedVer  = PACK_FORMATS_MAP[packSettings.version] ?? null
  const packFormat   = selectedVer?.format ?? 61
  const support      = selectedVer?.support ?? 'guaranteed'
  const isLegacy     = LEGACY_VERSIONS.has(packSettings.version)
  const isRepositioned = REPOSITIONED_VERSIONS.has(packSettings.version)

  const masksWithImages = Object.entries(editorState.masks ?? {}).filter(([, s]) => !!s.uploadedImage)

  const getTexturePath = (maskId, legacy) => {
    const modern = `assets/minecraft/textures/${GUI_TEXTURE_PATHS[maskId] ?? 'gui/container/inventory.png'}`
    return (legacy && LEGACY_PATHS[maskId]) ? LEGACY_PATHS[maskId] : modern
  }

  const getMaskCanvasBlob = (maskId) => new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 256; canvas.height = 256
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 256, 256)
      const slot = editorState.masks?.[maskId]
      if (slot?.uploadedImage) {
        const { x, y, width, height, rotation } = slot.imageTransform
        ctx.save()
        ctx.globalAlpha = slot.opacity ?? 1
        ctx.filter = [
          `brightness(${slot.brightness ?? 1})`,
          `contrast(${slot.contrast ?? 1.05})`,
          `saturate(${slot.saturation ?? 1})`,
        ].join(' ')
        ctx.translate(x + width / 2, y + height / 2)
        ctx.rotate(((rotation ?? 0) * Math.PI) / 180)
        ctx.drawImage(slot.uploadedImage, -width / 2, -height / 2, width, height)
        ctx.restore()
      }
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob null')), 'image/png')
    } catch (e) { reject(e) }
  })

  const dataUrlToBlob = (dataUrl) => {
    try {
      const [header, data] = dataUrl.split(',')
      const mime  = header.match(/:(.*?);/)[1]
      const bytes = atob(data)
      const arr   = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
      return new Blob([arr], { type: mime })
    } catch { return null }
  }

  const buildDefaultIcon = () => new Promise(resolve => {
    const canvas = document.createElement('canvas')
    canvas.width = 64; canvas.height = 64
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 64, 64)
    ctx.fillStyle = '#7c3aed'; ctx.fillRect(0, 0, 64, 32)
    ctx.fillStyle = '#06b6d4'; ctx.fillRect(0, 32, 64, 32)
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 12px monospace'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('MC', 32, 48)
    canvas.toBlob(b => resolve(b), 'image/png')
  })

  const handleExport = async () => {
    setExporting(true); setDone(false); setError(null)
    try {
      const zip = new JSZip()
      const safeName = (packSettings.name || 'MyResourcePack').replace(/[^a-zA-Z0-9_-]/g, '_')
      const safeVer  = (packSettings.version || '').replace(/[\s\u2013\-]+/g, '')

      zip.file('pack.mcmeta', JSON.stringify({
        pack: { pack_format: packFormat, description: packSettings.description || FIXED_DESCRIPTION }
      }, null, 2))

      const iconBlob = packSettings.iconDataUrl
        ? (dataUrlToBlob(packSettings.iconDataUrl) ?? await buildDefaultIcon())
        : await buildDefaultIcon()
      zip.file('pack.png', iconBlob)

      for (const [maskId] of masksWithImages) {
        const texturePath = getTexturePath(maskId, isLegacy)
        const textureBlob = await getMaskCanvasBlob(maskId)
        zip.file(texturePath, textureBlob)
      }

      if (masksWithImages.length === 0) {
        const texturePath = getTexturePath(editorState.selectedMask, isLegacy)
        const textureBlob = await getMaskCanvasBlob(editorState.selectedMask)
        zip.file(texturePath, textureBlob)
      }

      const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } })
      const url = URL.createObjectURL(content)
      const a   = document.createElement('a')
      a.href = url; a.download = `${safeName}_${safeVer}.zip`
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)

      setDone(true)
      setTimeout(() => setDone(false), 4000)
    } catch (err) {
      console.error('Export error:', err)
      setError(err?.message ?? String(err))
    } finally { setExporting(false) }
  }

  const maskMeta  = GUI_META?.[editorState.selectedMask]
  const maskLabel = maskMeta?.label ?? editorState.selectedMask ?? '?'

  const SUPPORT_CFG = {
    guaranteed: { cls: 'text-green-400',  bgCls: 'bg-green-950/40 border-green-800/50',  Icon: CheckCircle,   label: 'Garantált' },
    likely:     { cls: 'text-yellow-400', bgCls: 'bg-yellow-950/40 border-yellow-800/50', Icon: HelpCircle,    label: 'Valószínű' },
    maybe:      { cls: 'text-orange-400', bgCls: 'bg-orange-950/40 border-orange-800/50', Icon: AlertTriangle, label: 'Lehet, hogy működik' },
  }
  const supportCfg = SUPPORT_CFG[support] ?? SUPPORT_CFG.likely
  const { Icon: SupportIcon } = supportCfg

  const summaryRows = [
    ['Név',            String(packSettings.name || '—')],
    ['Verzió',         String(packSettings.version || '—')],
    ['pack_format',    String(packFormat)],
    ['Kompatibilitás', '__support__'],
    ['Textúrák',       masksWithImages.length > 0 ? `${masksWithImages.length} mask szerkesztve` : 'Nincs feltöltve'],
    ['Icon',           packSettings.iconDataUrl ? 'Egyedi' : 'Alap'],
  ]

  const fileStructureRows = [
    { path: 'pack.mcmeta', desc: `pack_format: ${packFormat} · "${packSettings.description || FIXED_DESCRIPTION}"` },
    { path: 'pack.png',    desc: packSettings.iconDataUrl ? 'Egyedi icon (64×64)' : 'Alap icon' },
    ...(masksWithImages.length > 0
      ? masksWithImages.map(([id]) => ({
          path: getTexturePath(id, isLegacy),
          desc: `${GUI_META[id]?.label ?? id} – 256×256 PNG`,
        }))
      : [{ path: getTexturePath(editorState.selectedMask, isLegacy), desc: `${maskLabel} – üres canvas` }]
    ),
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Export Resource Pack</h2>
        <p className="text-sm text-gray-400">Teljes Minecraft-ready .zip generálása – 100% client-side</p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Pack Summary</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {summaryRows.map(([k, v]) => (
            <div key={k} className="flex gap-2 items-center">
              <span className="text-gray-500 shrink-0">{k}:</span>
              {v === '__support__'
                ? <span className={`font-medium text-xs ${supportCfg.cls}`}>{supportCfg.label}</span>
                : <span className="font-medium text-gray-200">{v}</span>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3">
        <span className="text-xs text-gray-500">📝 Leírás:</span>
        <code className="text-cyan-400 text-xs font-mono">{packSettings.description || FIXED_DESCRIPTION}</code>
      </div>

      {isRepositioned && (
        <div className="flex items-start gap-3 bg-orange-950/40 border border-orange-600/60 rounded-xl p-4">
          <AlertCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
          <p className="text-sm text-orange-300">
            <strong>⚠ Lehetséges újrapozicionálások:</strong> A kiválasztott verzióban ({packSettings.version}) a GUI textúra elrendezése változott.
            Ellenőrizd a mask-okon belüli képpozíciókat, mielőtt exportálsz!
          </p>
        </div>
      )}

      {support !== 'guaranteed' && !isRepositioned && (
        <div className={`flex items-start gap-3 border rounded-xl p-4 ${supportCfg.bgCls}`}>
          <SupportIcon size={16} className={`${supportCfg.cls} shrink-0 mt-0.5`} />
          <p className={`text-sm ${supportCfg.cls}`}>
            {support === 'likely' && 'Ez a verzió valószínűleg működik. A GUI texture útvonalak 1.13-ban változtak.'}
            {support === 'maybe'  && <><strong>Legacy mód (pre-1.13):</strong> Régi fájlstruktúra – egyes GUI-k még nem léteztek.</>}
          </p>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <FolderOpen size={16} className="text-yellow-400" />
          <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">ZIP tartalom</h3>
        </div>
        <div className="space-y-2.5">
          {fileStructureRows.map(({ path, desc }) => (
            <div key={path} className="flex items-start gap-3">
              <FileText size={14} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <code className="text-cyan-400 text-xs break-all">{path}</code>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {masksWithImages.length === 0 && (
        <div className="flex items-start gap-3 bg-yellow-950/40 border border-yellow-700/50 rounded-xl p-4">
          <AlertCircle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-300">
            Nincs feltöltött kép egyetlen mask-hoz sem. Az exportált texture üres PNG lesz.
            Menj a <strong>GUI Editor</strong> fülre és töltsd fel a képeket.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 bg-red-950/40 border border-red-700/50 rounded-xl p-4">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300"><strong>Export hiba:</strong> {error}</p>
        </div>
      )}

      <button
        onClick={handleExport}
        disabled={exporting}
        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
          done      ? 'bg-green-700 text-green-100 cursor-default' :
          exporting ? 'bg-gray-700 text-gray-400 cursor-not-allowed' :
          'bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg'
        }`}
      >
        {done      ? <><CheckCircle size={20} /> Letöltve!</> :
         exporting ? <><Loader size={20} className="animate-spin" /> Generálás&hellip;</> :
                     <><Download size={20} /> Resource Pack letöltése (.zip)</>}
      </button>

      <div className="relative">
        <div className="absolute -top-2 left-4 z-10">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wide">⭐ Prémium</span>
        </div>
        <button
          onClick={() => setSaveModalOpen(true)}
          className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-750 border border-dashed border-cyan-700/60 hover:border-cyan-500 text-cyan-300 hover:text-cyan-200 transition-all group mt-1">
          <Cloud size={20} className="group-hover:scale-110 transition-transform" />
          Mentés a felhőbe
        </button>
      </div>

      <p className="text-xs text-gray-600 text-center">
        A ZIP 100% client-side generálódik (JSZip) – semmilyen adat nem kerül szerverre.
      </p>

      <SaveModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        packSettings={packSettings}
        editorState={editorState}
        onLoadPack={(data) => console.log('Load pack:', data)}
      />
    </div>
  )
}

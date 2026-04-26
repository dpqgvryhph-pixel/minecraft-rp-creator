import { useRef, useState, useCallback, useEffect } from 'react'
import { Info, Upload, RotateCcw, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import { PACK_FORMATS, LEGACY_VERSIONS } from '../utils/packFormats'

// Fix leírás – mindig ez kerül a pack.mcmeta-ba
const FIXED_DESCRIPTION = 'made by: GUICraft'

const VERSION_GROUPS = [
  {
    id: 'guaranteed',
    label: '✅ Garantált',
    desc: 'Teljesen tesztelt – minden GUI elérési út helyes.',
    versions: Array.isArray(PACK_FORMATS)
      ? PACK_FORMATS.filter(v => v.support === 'guaranteed').slice().reverse()
      : [],
  },
  {
    id: 'likely',
    label: '🟡 Valószínű',
    desc: '1.13–1.20 – a GUI texture útvonalak azonosak, kisebb eltérések lehetségesek.',
    versions: Array.isArray(PACK_FORMATS)
      ? PACK_FORMATS.filter(v => v.support === 'likely').slice().reverse()
      : [],
  },
  {
    id: 'maybe',
    label: '🟠 Legacy (pre-1.13)',
    desc: '1.8.9–1.12 – régi fájlstruktúra, néhány GUI nem létezett még.',
    versions: Array.isArray(PACK_FORMATS)
      ? PACK_FORMATS.filter(v => v.support === 'maybe').slice().reverse()
      : [],
  },
]

const ICON_COLORS = [
  '#1a1a2e','#0a0a16','#111827','#1f2937',
  '#7c3aed','#4f46e5','#2563eb','#0891b2','#06b6d4',
  '#059669','#65a30d','#ca8a04','#dc2626','#db2777',
  '#ffffff','#d1d5db','#9ca3af',
  '#f97316','#84cc16','#10b981',
]

export default function PackSettings({ packSettings, setPackSettings }) {
  const update = (key, value) => setPackSettings(prev => ({ ...prev, [key]: value }))

  const [openGroup, setOpenGroup]         = useState('guaranteed')
  const iconCanvasRef                     = useRef(null)
  const [iconBgColor, setIconBgColor]     = useState('#1a1a2e')
  const [iconText, setIconText]           = useState('')
  const [iconTextColor, setIconTextColor] = useState('#ffffff')
  const [iconImg, setIconImg]             = useState(null)

  const selectedVerObj = Array.isArray(PACK_FORMATS)
    ? PACK_FORMATS.find(v => v.label === packSettings.version)
    : null
  const packFormat = selectedVerObj?.format ?? 55
  const support    = selectedVerObj?.support ?? 'guaranteed'
  const isLegacy   = LEGACY_VERSIONS instanceof Set
    ? LEGACY_VERSIONS.has(packSettings.version)
    : false

  const drawIcon = useCallback(() => {
    const canvas = iconCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = iconBgColor
    ctx.fillRect(0, 0, 64, 64)
    for (let cy = 0; cy < 64; cy += 8) {
      for (let cx = 0; cx < 64; cx += 8) {
        if (((cx + cy) / 8) % 2 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.04)'
          ctx.fillRect(cx, cy, 8, 8)
        }
      }
    }
    if (iconImg) ctx.drawImage(iconImg, 0, 0, 64, 64)
    const txt = (iconText || '').trim().slice(0, 6)
    if (txt) {
      ctx.fillStyle = iconTextColor
      const size = txt.length <= 2 ? 24 : txt.length <= 4 ? 16 : 11
      ctx.font = `bold ${size}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(txt, 32, 32)
    }
    update('iconDataUrl', canvas.toDataURL('image/png'))
  }, [iconBgColor, iconText, iconTextColor, iconImg])

  useEffect(() => { drawIcon() }, [drawIcon])

  const handleIconFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => setIconImg(img)
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const resetIcon = () => {
    setIconImg(null)
    setIconText('')
    setIconBgColor('#1a1a2e')
    setIconTextColor('#ffffff')
    update('iconDataUrl', null)
  }

  const SupportBadge = ({ s }) => {
    const cfg = {
      guaranteed: { Icon: CheckCircle,   cls: 'text-green-400 bg-green-950/50 border-green-800',    label: 'Garantált' },
      likely:     { Icon: HelpCircle,    cls: 'text-yellow-400 bg-yellow-950/50 border-yellow-800', label: 'Valószínű' },
      maybe:      { Icon: AlertTriangle, cls: 'text-orange-400 bg-orange-950/50 border-orange-800', label: 'Lehet, hogy működik' },
    }[s] ?? { Icon: HelpCircle, cls: 'text-gray-400 bg-gray-800 border-gray-700', label: String(s) }
    const { Icon, cls, label } = cfg
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
        <Icon size={11} />{label}
      </span>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Pack Settings</h2>
        <p className="text-sm text-gray-400">Pack neve, ikonja és célverzió beállítása</p>
      </div>

      {/* ── Metadata ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Metadata</h3>

        {/* Pack neve */}
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
            Pack neve <span className="text-red-400">*</span>
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm
                       focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.name}
            onChange={e => update('name', e.target.value)}
            placeholder="MyAwesomePack"
            maxLength={64}
          />
          <p className="text-xs text-gray-600 mt-1">{(packSettings.name || '').length}/64</p>

          {/* In-game preview */}
          <div className="mt-2 rounded-lg overflow-hidden border border-gray-700 bg-gray-950">
            <p className="px-3 pt-2 pb-1 text-xs text-gray-600 font-mono">Előnézet – Minecraft pack lista</p>
            <div className="flex items-center gap-3 px-3 pb-3">
              <canvas ref={iconCanvasRef} width={64} height={64}
                className="rounded border border-gray-700 shrink-0"
                style={{ width: 32, height: 32, imageRendering: 'pixelated' }} />
              <div>
                <p className="text-white text-sm font-bold leading-tight font-mono"
                   style={{ textShadow: '1px 1px 0 #000' }}>
                  {packSettings.name || 'MyResourcePack'}
                </p>
                <p className="text-gray-400 text-xs leading-tight mt-0.5 font-mono">
                  {FIXED_DESCRIPTION}
                </p>
                <p className="text-gray-600 text-xs mt-0.5 font-mono">
                  pack_format: {packFormat}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leírás – fix, nem szerkeszthető */}
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Leírás (fix)</label>
          <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2
                          text-cyan-400 text-sm font-mono select-none cursor-not-allowed">
            {FIXED_DESCRIPTION}
          </div>
          <p className="text-xs text-gray-600 mt-1">Automatikusan generálódik – nem módosítható.</p>
        </div>

        {/* Szerző – szabadon szerkeszthető */}
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
            Szerző
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm
                       focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.author || ''}
            onChange={e => update('author', e.target.value)}
            placeholder="pl. aka_Colibry"
            maxLength={64}
          />
          <p className="text-xs text-gray-600 mt-1">Csak helyi referencia – nem kerül bele a pack fájlba.</p>
        </div>
      </div>

      {/* ── Pack Icon ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Pack Icon (pack.png)</h3>
          <button onClick={resetIcon}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
                       bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 transition-all">
            <RotateCcw size={11} /> Reset
          </button>
        </div>

        <div className="flex gap-5 flex-wrap items-start">
          <div className="shrink-0">
            <canvas ref={iconCanvasRef} width={64} height={64}
              className="rounded-lg border-2 border-gray-600"
              style={{ width: 64, height: 64, imageRendering: 'pixelated' }} />
            <p className="text-xs text-gray-600 mt-1 text-center">64×64 px</p>
          </div>

          <div className="flex-1 min-w-[200px] space-y-3">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Háttérszín</label>
              <div className="flex flex-wrap gap-1.5">
                {ICON_COLORS.map(c => (
                  <button key={c} onClick={() => setIconBgColor(c)}
                    style={{ background: c }}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      iconBgColor === c ? 'border-cyan-400 scale-110' : 'border-gray-700 hover:border-gray-500'
                    }`} />
                ))}
                <label className="relative w-6 h-6 rounded border-2 border-dashed border-gray-600
                                  hover:border-gray-400 cursor-pointer flex items-center justify-center">
                  <span className="text-gray-400 text-xs">+</span>
                  <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    value={iconBgColor} onChange={e => setIconBgColor(e.target.value)} />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Szöveg (max 6 kar.)</label>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm
                             focus:outline-none focus:border-purple-500 transition-colors"
                  value={iconText}
                  onChange={e => setIconText(e.target.value.slice(0, 6))}
                  placeholder="MC"
                  maxLength={6}
                />
                <label className="relative shrink-0">
                  <div className="w-9 h-9 rounded-lg border border-gray-700 cursor-pointer"
                       style={{ background: iconTextColor }} />
                  <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    value={iconTextColor} onChange={e => setIconTextColor(e.target.value)} />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Kép feltöltése</label>
              <label
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleIconFile(e.dataTransfer.files[0]) }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed
                           border-gray-600 hover:border-cyan-600 bg-gray-800 cursor-pointer
                           transition-colors text-sm text-gray-400">
                <Upload size={14} />
                {iconImg ? 'Kép betöltve ✓ – kattints a cseréhez' : 'Drop ide vagy kattints…'}
                <input type="file" className="hidden" accept="image/*"
                  onChange={e => handleIconFile(e.target.files?.[0])} />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ── Verzió választó ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">Minecraft verzió</h3>

        <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{packSettings.version}</p>
            <p className="text-gray-500 text-xs mt-0.5">
              pack_format: <span className="text-cyan-400 font-mono">{packFormat}</span>
            </p>
          </div>
          <SupportBadge s={support} />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {VERSION_GROUPS.map(g => (
            <button key={g.id} onClick={() => setOpenGroup(g.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                openGroup === g.id
                  ? 'bg-gray-700 text-white border-gray-500'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700'
              }`}>
              {g.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          {VERSION_GROUPS.find(g => g.id === openGroup)?.desc ?? ''}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {(VERSION_GROUPS.find(g => g.id === openGroup)?.versions ?? []).map(v => (
            <button key={v.label} onClick={() => update('version', v.label)}
              title={`pack_format: ${v.format}${v.note ? ' · ' + v.note : ''}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                packSettings.version === v.label
                  ? 'bg-cyan-700 text-cyan-100 border-cyan-500'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
              }`}>
              {v.label}
              {v.note && (
                <span className="block text-[10px] leading-none mt-0.5 text-gray-500">
                  {v.note.slice(0, 28)}
                </span>
              )}
            </button>
          ))}
        </div>

        {isLegacy && (
          <div className="flex items-start gap-3 bg-orange-950/40 border border-orange-700/50 rounded-xl p-3">
            <AlertTriangle size={14} className="text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-300">
              <strong>Legacy mód:</strong> 1.13 előtt a GUI texturák <code>gui/</code> almappában
              vannak. Az export megpróbálja a helyes legacy útvonalat alkalmazni.
            </p>
          </div>
        )}
      </div>

      {/* pack.mcmeta előnézet */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-cyan-400 mt-0.5 shrink-0" />
          <div className="text-sm space-y-2 w-full">
            <p className="text-gray-300">
              <span className="text-cyan-400 font-semibold">pack.mcmeta</span> előnézet
            </p>
            <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-auto">
              <pre>{JSON.stringify({
                pack: {
                  pack_format: packFormat,
                  description: FIXED_DESCRIPTION,
                }
              }, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

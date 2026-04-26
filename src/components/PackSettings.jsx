import { useRef, useState, useCallback, useEffect } from 'react'
import { Settings, Info, Upload, RotateCcw, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import { PACK_FORMATS, LEGACY_VERSIONS } from '../utils/packFormats'

// ── Version groups for the UI ───────────────────────────────────────────────────
const VERSION_GROUPS = [
  {
    id: 'guaranteed',
    label: '✅ Garantált (ajánlott)',
    desc: 'Teljes mértékben tesztelt, minden GUI elérési út helyes.',
    versions: PACK_FORMATS.filter(v => v.support === 'guaranteed').reverse(),
  },
  {
    id: 'likely',
    label: '🟡 Valószínűleg működik',
    desc: '1.13–1.20 – a GUI texture elérési utak azonosak, de kisebb eltérések lehetségesek.',
    versions: PACK_FORMATS.filter(v => v.support === 'likely').reverse(),
  },
  {
    id: 'maybe',
    label: '🟠 Lehet, hogy mőködik (legacy)',
    desc: '1.8.9–1.12 – régi fájlstruktúra, néhány GUI nem létezett még.',
    versions: PACK_FORMATS.filter(v => v.support === 'maybe').reverse(),
  },
]

// ── Icon canvas colors ────────────────────────────────────────────────────────────
const ICON_COLORS = [
  '#1a1a2e','#0a0a16','#111827','#1f2937',
  '#7c3aed','#4f46e5','#2563eb','#0891b2','#06b6d4',
  '#059669','#65a30d','#ca8a04','#dc2626','#db2777',
  '#ffffff','#d1d5db','#9ca3af','#6b7280',
  '#f97316','#84cc16','#10b981',
]

export default function PackSettings({ packSettings, setPackSettings }) {
  const update = (key, value) => setPackSettings(prev => ({ ...prev, [key]: value }))

  // Version picker state
  const [openGroup, setOpenGroup] = useState('guaranteed')

  // Icon canvas
  const iconCanvasRef = useRef(null)
  const iconFileRef = useRef(null)
  const [iconBgColor, setIconBgColor] = useState('#1a1a2e')
  const [iconText, setIconText] = useState('')
  const [iconTextColor, setIconTextColor] = useState('#ffffff')
  const [iconImg, setIconImg] = useState(null)
  const [iconTool, setIconTool] = useState('text') // 'text' | 'upload'
  const [iconDirty, setIconDirty] = useState(false)

  const selectedVerObj = PACK_FORMATS.find(v => v.label === packSettings.version)
  const packFormat = selectedVerObj?.format ?? PACK_FORMATS[PACK_FORMATS.length - 1].format
  const support = selectedVerObj?.support ?? 'guaranteed'
  const isLegacy = LEGACY_VERSIONS.has(packSettings.version)

  // ── DRAW ICON CANVAS ──────────────────────────────────────────────────────
  const drawIcon = useCallback(() => {
    const canvas = iconCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // Background
    ctx.fillStyle = iconBgColor
    ctx.fillRect(0, 0, 64, 64)
    // Checkerboard hint (subtle)
    for (let y = 0; y < 64; y += 8) {
      for (let x = 0; x < 64; x += 8) {
        if (((x + y) / 8) % 2 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.04)'
          ctx.fillRect(x, y, 8, 8)
        }
      }
    }
    // Uploaded image
    if (iconImg) {
      ctx.drawImage(iconImg, 0, 0, 64, 64)
    }
    // Text overlay
    if (iconText.trim()) {
      const txt = iconText.trim().slice(0, 6)
      ctx.fillStyle = iconTextColor
      const size = txt.length <= 2 ? 24 : txt.length <= 4 ? 16 : 11
      ctx.font = `bold ${size}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(txt, 32, 32)
    }
    // Export data URL
    const dataUrl = canvas.toDataURL('image/png')
    update('iconDataUrl', dataUrl)
    setIconDirty(false)
  }, [iconBgColor, iconText, iconTextColor, iconImg])

  useEffect(() => { drawIcon() }, [drawIcon])

  const handleIconFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => { setIconImg(img); setIconDirty(true) }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const resetIcon = () => {
    setIconImg(null)
    setIconText('')
    setIconBgColor('#1a1a2e')
    setIconTextColor('#ffffff')
    setIconDirty(true)
    update('iconDataUrl', null)
  }

  // ── SUPPORT BADGE ────────────────────────────────────────────────────────────
  const SupportBadge = ({ s }) => {
    const cfg = {
      guaranteed: { icon: CheckCircle,    cls: 'text-green-400 bg-green-950/50 border-green-800',    label: 'Garantált' },
      likely:     { icon: HelpCircle,     cls: 'text-yellow-400 bg-yellow-950/50 border-yellow-800', label: 'Valószínű' },
      maybe:      { icon: AlertTriangle,  cls: 'text-orange-400 bg-orange-950/50 border-orange-800', label: 'Lehet, hogy mőködik' },
    }[s] ?? { icon: HelpCircle, cls: 'text-gray-400 bg-gray-800 border-gray-700', label: s }
    const Icon = cfg.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.cls}`}>
        <Icon size={11} />{cfg.label}
      </span>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Pack Settings</h2>
        <p className="text-sm text-gray-400">Configure your resource pack metadata &amp; icon</p>
      </div>

      {/* ── Basic metadata ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Metadata</h3>

        {/* Pack Name – with in-game preview */}
        <div>
          <label className="gamer-label block text-xs text-gray-400 uppercase tracking-wider mb-1">
            Pack Display Name <span className="text-red-400">*</span>
          </label>
          <input
            className="gamer-input w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="MyAwesomePack"
            maxLength={64}
          />
          <p className="text-xs text-gray-600 mt-1">{packSettings.name.length}/64 karakter</p>
          {/* In-game preview */}
          <div className="mt-2 rounded-lg overflow-hidden border border-gray-700" style={{ background: '#0a0a16' }}>
            <div className="px-3 py-1 text-xs text-gray-500" style={{ fontFamily: 'monospace' }}>
              Előnézet – Minecraft pack lista
            </div>
            <div className="flex items-center gap-3 px-3 pb-3">
              {/* Tiny icon preview */}
              <canvas ref={iconCanvasRef} width={64} height={64}
                className="rounded border border-gray-700 flex-shrink-0"
                style={{ width: 32, height: 32, imageRendering: 'pixelated' }} />
              <div>
                <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: 'monospace', textShadow: '1px 1px 0 #000' }}>
                  {packSettings.name || 'MyResourcePack'}
                </p>
                <p className="text-gray-400 text-xs leading-tight mt-0.5" style={{ fontFamily: 'monospace' }}>
                  {packSettings.description || '§7(no description)'}
                </p>
                <p className="text-gray-600 text-xs mt-0.5" style={{ fontFamily: 'monospace' }}>
                  §7pack_format: {packFormat} · by {packSettings.author || '?'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Description</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
            rows={3}
            value={packSettings.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="A custom GUI texture pack..."
            maxLength={128}
          />
          <p className="text-xs text-gray-600 mt-1">{packSettings.description.length}/128 karakter</p>
        </div>

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Author</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.author}
            onChange={(e) => update('author', e.target.value)}
            placeholder="Your name"
          />
        </div>
      </div>

      {/* ── Pack Icon editor ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Pack Icon (pack.png)</h3>
          <button onClick={resetIcon}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-700 transition-all">
            <RotateCcw size={11} /> Reset
          </button>
        </div>

        <div className="flex gap-4 flex-wrap items-start">
          {/* Live 64x64 preview (full size) */}
          <div className="flex-shrink-0">
            <canvas ref={iconCanvasRef} width={64} height={64}
              className="rounded-lg border-2 border-gray-600"
              style={{ width: 64, height: 64, imageRendering: 'pixelated' }} />
            <p className="text-xs text-gray-600 mt-1 text-center">64×64 px</p>
          </div>

          {/* Controls */}
          <div className="flex-1 min-w-[200px] space-y-3">
            {/* BG color */}
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Háttérszín</label>
              <div className="flex flex-wrap gap-1.5">
                {ICON_COLORS.map(c => (
                  <button key={c}
                    onClick={() => setIconBgColor(c)}
                    style={{ background: c }}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      iconBgColor === c ? 'border-cyan-400 scale-110' : 'border-gray-700 hover:border-gray-500'
                    }`}
                    title={c} />
                ))}
                {/* Custom color */}
                <label className="relative w-6 h-6 rounded border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer flex items-center justify-center" title="Egyedi szín">
                  <span className="text-gray-400 text-xs">+</span>
                  <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    value={iconBgColor} onChange={e => setIconBgColor(e.target.value)} />
                </label>
              </div>
            </div>

            {/* Text overlay */}
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Szöveg (max 6 kar.)</label>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  value={iconText}
                  onChange={(e) => setIconText(e.target.value.slice(0, 6))}
                  placeholder="MC"
                  maxLength={6}
                />
                <label className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-lg border border-gray-700 cursor-pointer" style={{ background: iconTextColor }} />
                  <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    value={iconTextColor} onChange={e => setIconTextColor(e.target.value)} />
                </label>
              </div>
            </div>

            {/* Upload image */}
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Kép feltöltése (opcionális)</label>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleIconFile(e.dataTransfer.files[0]) }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-600 hover:border-cyan-600 bg-gray-800 hover:bg-gray-750 cursor-pointer transition-colors text-sm text-gray-400">
                <Upload size={14} />
                {iconImg ? 'Kép betöltve ✓ – kattints a csere' : 'Drop ide vagy kattints…'}
                <input type="file" className="hidden" accept="image/*"
                  onChange={(e) => handleIconFile(e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ── Version picker ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">Minecraft verzió</h3>

        {/* Selected version display */}
        <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{packSettings.version}</p>
            <p className="text-gray-500 text-xs mt-0.5">pack_format: <span className="text-cyan-400 font-mono">{packFormat}</span></p>
          </div>
          <SupportBadge s={support} />
        </div>

        {/* Group tabs */}
        <div className="flex gap-1 flex-wrap">
          {VERSION_GROUPS.map(g => (
            <button key={g.id} onClick={() => setOpenGroup(g.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                openGroup === g.id
                  ? 'bg-gray-700 text-white border-gray-500'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-750 border-gray-700'
              }`}>
              {g.label}
            </button>
          ))}
        </div>

        {/* Group description */}
        {VERSION_GROUPS.find(g => g.id === openGroup)?.desc && (
          <p className="text-xs text-gray-500 -mt-1">
            {VERSION_GROUPS.find(g => g.id === openGroup).desc}
          </p>
        )}

        {/* Version buttons in selected group */}
        <div className="flex flex-wrap gap-1.5">
          {(VERSION_GROUPS.find(g => g.id === openGroup)?.versions ?? []).map(v => (
            <button
              key={v.label}
              onClick={() => update('version', v.label)}
              title={v.note || `pack_format: ${v.format}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                packSettings.version === v.label
                  ? 'bg-cyan-700 text-cyan-100 border-cyan-500'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
              }`}>
              {v.label}
              {v.note && <span className="block text-gray-500 text-[10px] leading-none mt-0.5">{v.note.slice(0, 24)}</span>}
            </button>
          ))}
        </div>

        {/* Legacy warning */}
        {isLegacy && (
          <div className="flex items-start gap-3 bg-orange-950/40 border border-orange-700/50 rounded-xl p-3">
            <AlertTriangle size={14} className="text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-300">
              <strong>Legacy mód:</strong> 1.13 előtt a GUI textúrák <code>gui/</code> almappában
              vannak (nem <code>gui/container/</code>). Az export megpróbálja a helyes legacy
              útvonalat alkalmazni, de egyes GUI-k (Loom, Grindstone, Barrel stb.) nem léteztek.
            </p>
          </div>
        )}
      </div>

      {/* ── pack.mcmeta preview ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm space-y-2 w-full">
            <p className="text-gray-300">
              <span className="text-cyan-400 font-semibold">pack.mcmeta</span> előnézet
            </p>
            <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-auto">
              <pre>{JSON.stringify({
                pack: {
                  pack_format: packFormat,
                  description: packSettings.description
                }
              }, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useRef, useState, useCallback, useEffect } from 'react'
import { Info, Upload, RotateCcw, CheckCircle, AlertTriangle, HelpCircle, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react'
import { PACK_FORMATS, LEGACY_VERSIONS, VERSION_MAJOR_GROUPS, REPOSITIONED_VERSIONS } from '../utils/packFormats'

const ICON_COLORS = [
  '#1a1a2e','#0a0a16','#111827','#1f2937',
  '#7c3aed','#4f46e5','#2563eb','#0891b2','#06b6d4',
  '#059669','#65a30d','#ca8a04','#dc2626','#db2777',
  '#ffffff','#d1d5db','#9ca3af',
  '#f97316','#84cc16','#10b981',
]

const PACK_FORMATS_MAP = Object.fromEntries(PACK_FORMATS.map(v => [v.label, v]))

export default function PackSettings({ packSettings, setPackSettings }) {
  const update = (key, value) => setPackSettings(prev => ({ ...prev, [key]: value }))

  // accordion: melyik főverzió van nyitva
  const [openMajor, setOpenMajor]         = useState('1.21')
  const editorCanvasRef                   = useRef(null)
  const previewCanvasRef                  = useRef(null)
  const [iconBgColor, setIconBgColor]     = useState('#1a1a2e')
  const [iconText, setIconText]           = useState('')
  const [iconTextColor, setIconTextColor] = useState('#ffffff')
  const [iconImg, setIconImg]             = useState(null)

  const selectedVerObj = PACK_FORMATS_MAP[packSettings.version] ?? null
  const packFormat     = selectedVerObj?.format ?? 61
  const support        = selectedVerObj?.support ?? 'guaranteed'
  const isLegacy       = LEGACY_VERSIONS.has(packSettings.version)
  const isRepositioned = REPOSITIONED_VERSIONS.has(packSettings.version)

  const renderIconToCanvas = useCallback((canvas) => {
    if (!canvas) return null
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
    return canvas.toDataURL('image/png')
  }, [iconBgColor, iconText, iconTextColor, iconImg])

  useEffect(() => {
    const dataUrl = renderIconToCanvas(editorCanvasRef.current)
    renderIconToCanvas(previewCanvasRef.current)
    if (dataUrl) update('iconDataUrl', dataUrl)
  }, [renderIconToCanvas])

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
    setIconImg(null); setIconText(''); setIconBgColor('#1a1a2e'); setIconTextColor('#ffffff')
    update('iconDataUrl', null)
  }

  const SupportBadge = ({ s, repositioned }) => {
    const cfg = {
      guaranteed: { Icon: CheckCircle,   cls: 'text-green-400 bg-green-950/50 border-green-800',    label: 'Garantált' },
      likely:     { Icon: HelpCircle,    cls: 'text-yellow-400 bg-yellow-950/50 border-yellow-800', label: 'Valószínű' },
      maybe:      { Icon: AlertTriangle, cls: 'text-orange-400 bg-orange-950/50 border-orange-800', label: 'Legacy' },
    }[s] ?? { Icon: HelpCircle, cls: 'text-gray-400 bg-gray-800 border-gray-700', label: String(s) }
    const { Icon, cls, label } = cfg
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
        <Icon size={11}/>{label}
        {repositioned && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" title="Újrapozicionálás szükséges lehet" />}
      </span>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Pack Settings</h2>
        <p className="text-sm text-gray-400">Pack neve, leírása, ikonja és célverzió beállítása</p>
      </div>

      {/* ── Metadata ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Metadata</h3>

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
            Pack neve (in-game menüben látható) <span className="text-red-400">*</span>
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm
                       focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.name}
            onChange={e => update('name', e.target.value)}
            placeholder="MyAwesomePack"
            maxLength={64}
          />
          <p className="text-xs text-gray-600 mt-1">{(packSettings.name || '').length}/64 karakter</p>

          <div className="mt-3 rounded-lg overflow-hidden border border-gray-700 bg-gray-950">
            <p className="px-3 pt-2 pb-1 text-xs text-gray-600 font-mono">Előnézet – Minecraft pack lista</p>
            <div className="flex items-center gap-3 px-3 pb-3">
              <canvas
                ref={previewCanvasRef}
                width={64} height={64}
                className="rounded border border-gray-700 shrink-0"
                style={{ width: 32, height: 32, imageRendering: 'pixelated' }}
              />
              <div>
                <p className="text-white text-sm font-bold leading-tight font-mono"
                   style={{ textShadow: '1px 1px 0 #000' }}>
                  {packSettings.name || 'MyResourcePack'}
                </p>
                <p className="text-gray-400 text-xs leading-tight mt-0.5 font-mono">
                  {packSettings.description || '(nincs leírás)'}
                </p>
                <p className="text-gray-600 text-xs mt-0.5 font-mono">pack_format: {packFormat}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Leírás (in-game menüben látható)</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm
                       focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.description}
            onChange={e => update('description', e.target.value)}
            placeholder="made by: Neved"
            maxLength={128}
          />
          <p className="text-xs text-gray-600 mt-1">{(packSettings.description || '').length}/128 – bekerül a pack.mcmeta fájlba.</p>
        </div>

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Szerző (csak helyi megjegyzés)</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm
                       focus:outline-none focus:border-purple-500 transition-colors"
            value={packSettings.author || ''}
            onChange={e => update('author', e.target.value)}
            placeholder="pl. aka_Colibry"
            maxLength={64}
          />
          <p className="text-xs text-gray-600 mt-1">Nem kerül bele a pack fájlba – csak helyi referencia.</p>
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
            <canvas ref={editorCanvasRef} width={64} height={64}
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
                  value={iconText} onChange={e => setIconText(e.target.value.slice(0, 6))}
                  placeholder="MC" maxLength={6} />
                <label className="relative shrink-0" title="Szöveg színe">
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

      {/* ── Verzió választó – ACCORDION ── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">Minecraft verzió</h3>

        {/* Aktuális verzió badge */}
        <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{packSettings.version}</p>
            <p className="text-gray-500 text-xs mt-0.5">
              pack_format: <span className="text-cyan-400 font-mono">{packFormat}</span>
            </p>
          </div>
          <SupportBadge s={support} repositioned={isRepositioned} />
        </div>

        {/* Újrapozicionálás figyelmeztetés – csak ha ilyen verziót választott */}
        {isRepositioned && (
          <div className="flex items-start gap-3 bg-orange-950/40 border border-orange-600/60 rounded-xl p-3">
            <AlertCircle size={14} className="text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-300">
              <strong>⚠ Lehetséges újrapozicionálások:</strong> Ebben a verzióban a GUI textúra elrendezése
              változott. A feltöltött képeket valószínűleg újra kell pozicionálni a kívánt maskon belül.
            </p>
          </div>
        )}

        {isLegacy && (
          <div className="flex items-start gap-3 bg-red-950/40 border border-red-700/50 rounded-xl p-3">
            <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">
              <strong>Legacy mód (pre-1.13):</strong> Régi fájlstruktúra –
              a GUI texturák <code className="bg-gray-800 px-1 rounded">gui/</code> almappában vannak,
              és egyes GUI-k még nem is léteztek ebben a verzióban.
            </p>
          </div>
        )}

        {/* Accordion – főverzió csoportok */}
        <div className="space-y-1.5">
          {VERSION_MAJOR_GROUPS.map(group => {
            const isOpen = openMajor === group.major
            const groupVersionObjs = group.versions
              .map(lbl => PACK_FORMATS_MAP[lbl])
              .filter(Boolean)
              .slice().reverse()
            const hasSelected = group.versions.includes(packSettings.version)

            return (
              <div key={group.major}
                className={`rounded-xl border transition-all overflow-hidden ${
                  hasSelected ? 'border-cyan-700/60' : 'border-gray-700'
                }`}>
                {/* Accordion fejléc */}
                <button
                  onClick={() => setOpenMajor(isOpen ? null : group.major)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    isOpen ? 'bg-gray-800' : 'bg-gray-850 hover:bg-gray-800'
                  }`}>
                  <span className="text-base">{group.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-100">{group.label}</span>
                      {hasSelected && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-800 text-cyan-200 border border-cyan-600">
                          AKTÍV
                        </span>
                      )}
                    </div>
                    {/* Verziók kis pontok */}
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {groupVersionObjs.map(v => (
                        <span key={v.label}
                          className={`inline-flex items-center gap-0.5 text-[10px] font-mono ${
                            v.label === packSettings.version ? 'text-cyan-400' : 'text-gray-600'
                          }`}>
                          {v.repositioned && (
                            <span className="w-1 h-1 rounded-full bg-orange-400 inline-block" title="Újrapozicionálás" />
                          )}
                          {v.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isOpen ? <ChevronDown size={16} className="text-gray-400 shrink-0" /> : <ChevronRight size={16} className="text-gray-400 shrink-0" />}
                </button>

                {/* Accordion tartalom – alverziók */}
                {isOpen && (
                  <div className="bg-gray-850 border-t border-gray-700 px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {groupVersionObjs.map(v => (
                        <button
                          key={v.label}
                          onClick={() => update('version', v.label)}
                          title={`pack_format: ${v.format}${v.note ? ' · ' + v.note : ''}`}
                          className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border transition-all ${
                            packSettings.version === v.label
                              ? 'bg-cyan-700 text-cyan-100 border-cyan-500 shadow-lg shadow-cyan-900/30'
                              : v.support === 'maybe'
                                ? 'bg-red-950/30 text-red-300 hover:bg-red-900/30 border-red-800/60'
                                : v.repositioned
                                  ? 'bg-orange-950/30 text-orange-300 hover:bg-orange-900/30 border-orange-800/60'
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
                          }`}>
                          {v.repositioned && (
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" title="Lehetséges újrapozicionálás" />
                          )}
                          <span>{v.label}</span>
                          <span className="text-[10px] text-gray-500 font-sans">f{v.format}</span>
                          {v.note && (
                            <span className="block text-[9px] leading-none text-gray-500 w-full mt-0.5">
                              {v.note.slice(0, 32)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Ha van repositioned verzió ebben a csoportban – magyarázat */}
                    {groupVersionObjs.some(v => v.repositioned) && (
                      <p className="text-[10px] text-orange-400/70 mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                        = lehetséges újrapozicionálás szükséges ennél a verziónál
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
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
                pack: { pack_format: packFormat, description: packSettings.description || '' }
              }, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

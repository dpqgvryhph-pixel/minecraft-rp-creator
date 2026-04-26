import { Settings, Info } from 'lucide-react'
import { PACK_FORMATS } from '../utils/packFormats'

export default function PackSettings({ packSettings, setPackSettings }) {
  const update = (key, value) => setPackSettings(prev => ({ ...prev, [key]: value }))

  const versions = Object.keys(PACK_FORMATS)
  const currentFormat = PACK_FORMATS[packSettings.version] || 'N/A'

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Pack Settings</h2>
        <p className="text-sm text-gray-400">Configure your resource pack metadata</p>
      </div>

      <div className="gamer-panel p-6 space-y-5">
        <div>
          <label className="gamer-label">Pack Name *</label>
          <input
            className="gamer-input"
            value={packSettings.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="MyAwesomePack"
            maxLength={64}
          />
          <p className="text-xs text-gray-600 mt-1">{packSettings.name.length}/64 characters</p>
        </div>

        <div>
          <label className="gamer-label">Description</label>
          <textarea
            className="gamer-input resize-none"
            rows={3}
            value={packSettings.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="A custom GUI texture pack..."
            maxLength={128}
          />
          <p className="text-xs text-gray-600 mt-1">{packSettings.description.length}/128 characters</p>
        </div>

        <div>
          <label className="gamer-label">Author</label>
          <input
            className="gamer-input"
            value={packSettings.author}
            onChange={(e) => update('author', e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="gamer-label">Minecraft Version</label>
          <select
            className="gamer-input"
            value={packSettings.version}
            onChange={(e) => update('version', e.target.value)}
          >
            {versions.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pack Format Info */}
      <div className="gamer-panel p-4">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm space-y-2">
            <p className="text-gray-300">
              <span className="text-cyan-400 font-semibold">pack_format</span>: {currentFormat}
            </p>
            <p className="text-gray-500">
              This value will be automatically written to <code className="text-purple-400">pack.mcmeta</code> when you export.
            </p>
            <div className="mt-3 bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300">
              <pre>{JSON.stringify({
                pack: {
                  pack_format: currentFormat,
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

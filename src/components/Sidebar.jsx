import { motion } from 'framer-motion'

export default function Sidebar({ tabs, activeTab, setActiveTab }) {
  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-700 flex flex-col py-4 gap-1">
      <div className="px-4 mb-3">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Navigation</p>
      </div>
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative mx-2 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-purple-900/50 text-purple-300 border border-purple-700/60'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-purple-900/30 rounded-lg"
                transition={{ type: 'spring', duration: 0.3 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
      <div className="mt-auto px-4 py-3">
        <div className="text-xs text-gray-600 space-y-1">
          <p>Canvas: 256x256px</p>
          <p>Export: ZIP + mcmeta</p>
        </div>
      </div>
    </aside>
  )
}

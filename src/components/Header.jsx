import { motion } from 'framer-motion'
import { Package, Zap, Github } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 sticky top-0 z-50"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
          <Package size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-wider">
            MC Resource Pack Creator
          </h1>
          <p className="text-xs text-gray-500">Pixel-Perfect GUI Texture Editor</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-green-900/30 border border-green-700/50 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-medium">v1.0.0 Stable</span>
        </div>
        <a
          href="https://github.com/dpqgvryhph-pixel/minecraft-rp-creator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github size={20} />
        </a>
      </div>
    </motion.header>
  )
}

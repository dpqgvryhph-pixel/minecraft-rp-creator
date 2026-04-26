import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

// SVG logo – "GC" monogram, pixelart-inspired
function GUICraftLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="GUICraft logo">
      <rect width="32" height="32" rx="7" fill="url(#gc-grad)" />
      <rect x="6" y="6" width="8" height="8" rx="1" fill="#fff" opacity="0.9" />
      <rect x="18" y="6" width="8" height="8" rx="1" fill="#fff" opacity="0.9" />
      <rect x="6" y="18" width="8" height="8" rx="1" fill="#fff" opacity="0.9" />
      <rect x="18" y="18" width="4" height="4" rx="0.5" fill="#06b6d4" opacity="0.9" />
      <rect x="22" y="18" width="4" height="4" rx="0.5" fill="#7c3aed" opacity="0.9" />
      <rect x="18" y="22" width="4" height="4" rx="0.5" fill="#7c3aed" opacity="0.9" />
      <rect x="22" y="22" width="4" height="4" rx="0.5" fill="#06b6d4" opacity="0.9" />
      <defs>
        <linearGradient id="gc-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Header() {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 sticky top-0 z-50"
    >
      {/* LEFT – logo + name */}
      <div className="flex items-center gap-3">
        <GUICraftLogo />
        <div>
          <h1 className="text-sm font-bold text-white tracking-wider">GUICraft</h1>
          <p className="text-xs text-gray-500">Pixel-Perfect GUI Texture Editor</p>
        </div>
      </div>

      {/* RIGHT – credits + links */}
      <div className="flex items-center gap-3">

        {/* made by aka_Colibry */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-gray-500">made by</span>
          <a
            href="https://guns.lol/colibry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            aka_Colibry
          </a>
        </div>

        {/* separator */}
        <span className="hidden sm:block text-gray-700 text-xs select-none">|</span>

        {/* Discord */}
        <a
          href="https://discord.com/users/677442045270556694"
          target="_blank"
          rel="noopener noreferrer"
          title="Discord: aka_Colibry (677442045270556694)"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-400 transition-colors"
        >
          {/* Discord icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
          <span className="hidden md:inline">Discord</span>
        </a>

        {/* separator */}
        <span className="text-gray-700 text-xs select-none">|</span>

        {/* GitHub */}
        <a
          href="https://github.com/dpqgvryhph-pixel/minecraft-rp-creator"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub repo"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github size={18} />
        </a>

        {/* Version badge */}
        <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-700/50 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-medium">v1.0.0</span>
        </div>
      </div>
    </motion.header>
  )
}

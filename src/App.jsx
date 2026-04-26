import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Settings, Download, Package } from 'lucide-react'
import CanvasEditor from './components/CanvasEditor'
import PackSettings from './components/PackSettings'
import ExportPanel from './components/ExportPanel'
import ItemEditor from './components/ItemEditor'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { DEFAULT_VERSION } from './utils/packFormats'
import { GUI_MASKS } from './utils/guiMasks'

export const DEFAULT_MASK_SLOT = () => ({
  uploadedImage:  null,
  imageTransform: null,
  opacity:        1,
  brightness:     1,
  contrast:       1.05,
  saturation:     1,
})

const buildInitialMasks = () => {
  const masks = {}
  Object.keys(GUI_MASKS).forEach(id => { masks[id] = DEFAULT_MASK_SLOT() })
  return masks
}

function App() {
  const [activeTab, setActiveTab] = useState('editor')

  const [packSettings, setPackSettings] = useState({
    name:        'MyResourcePack',
    description: 'made by: GUICraft',
    version:     DEFAULT_VERSION,
    author:      '',
    iconDataUrl: null,
  })

  const [editorState, setEditorState] = useState({
    selectedMask:    'inventory',
    showMaskOverlay: true,
    masks:           buildInitialMasks(),
  })

  const tabs = [
    { id: 'editor',  label: 'GUI Editor',    icon: Image    },
    { id: 'items',   label: 'Item Editor',   icon: Package  },
    { id: 'settings',label: 'Pack Settings', icon: Settings },
    { id: 'export',  label: 'Export',        icon: Download },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header packSettings={packSettings} />
      <div className="flex">
        <nav className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              title={label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeTab === id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
        </nav>
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' && (
              <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CanvasEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  defaultMaskSlot={DEFAULT_MASK_SLOT}
                />
              </motion.div>
            )}
            {activeTab === 'items' && (
              <motion.div key="items" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ItemEditor />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PackSettings
                  packSettings={packSettings}
                  setPackSettings={setPackSettings}
                />
              </motion.div>
            )}
            {activeTab === 'export' && (
              <motion.div key="export" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ExportPanel
                  editorState={editorState}
                  packSettings={packSettings}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App

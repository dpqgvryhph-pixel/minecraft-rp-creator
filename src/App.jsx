import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Settings, Download } from 'lucide-react'
import CanvasEditor from './components/CanvasEditor'
import PackSettings from './components/PackSettings'
import ExportPanel from './components/ExportPanel'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { DEFAULT_VERSION } from './utils/packFormats'
import { GUI_MASKS } from './utils/guiMasks'

export const DEFAULT_MASK_SLOT = () => ({
  uploadedImage:  null,
  imageTransform: { x: 0, y: 0, width: 256, height: 256, rotation: 0 },
  opacity:     1,
  brightness:  1,
  contrast:    1.05,
  saturation:  1,
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
    { id: 'editor',   label: 'GUI Editor',   icon: Image    },
    { id: 'settings', label: 'Pack Settings', icon: Settings },
    { id: 'export',   label: 'Export',        icon: Download },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' && (
              <motion.div key="editor"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}   transition={{ duration: 0.2 }}>
                <CanvasEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  defaultMaskSlot={DEFAULT_MASK_SLOT}
                />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div key="settings"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}   transition={{ duration: 0.2 }}>
                <PackSettings packSettings={packSettings} setPackSettings={setPackSettings} />
              </motion.div>
            )}
            {activeTab === 'export' && (
              <motion.div key="export"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}   transition={{ duration: 0.2 }}>
                <ExportPanel packSettings={packSettings} editorState={editorState} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App

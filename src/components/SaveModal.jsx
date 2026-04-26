import { useState } from 'react'
import { X, User, Lock, Cloud, Star, LogIn, LogOut, Save, FolderOpen, Loader, CheckCircle, AlertCircle } from 'lucide-react'
import { apiLogin, apiSavePack, apiLoadPacks, apiLoadPack } from '../lib/guicraft-api'

export default function SaveModal({ isOpen, onClose, packSettings, editorState, onLoadPack }) {
  const [user, setUser]           = useState(null)  // { id, username, role, is_premium }
  const [view, setView]           = useState('login') // 'login' | 'dashboard'
  const [username, setUsername]   = useState('')
  const [password, setPassword]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [success, setSuccess]     = useState(null)
  const [packs, setPacks]         = useState([])
  const [packsLoading, setPacksLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const res = await apiLogin(username.trim(), password)
    setLoading(false)
    if (res.error) { setError(res.error); return }
    setUser(res.user)
    setView('dashboard')
    loadPacks(res.user.id)
  }

  const loadPacks = async (uid) => {
    setPacksLoading(true)
    const res = await apiLoadPacks(uid)
    setPacksLoading(false)
    if (res.success) setPacks(res.packs || [])
  }

  const handleSave = async () => {
    setLoading(true); setError(null); setSuccess(null)
    const packData = {
      packName: packSettings.name,
      version: packSettings.version,
      iconDataUrl: packSettings.iconDataUrl || null,
      selectedMask: editorState.selectedMask,
      opacity: editorState.opacity,
      brightness: editorState.brightness,
      contrast: editorState.contrast,
      saturation: editorState.saturation,
      imageTransform: editorState.imageTransform,
    }
    const res = await apiSavePack(user.id, packSettings.name || 'MyPack', packData)
    setLoading(false)
    if (res.error === 'premium_required') {
      setError('premium_required')
    } else if (res.error) {
      setError(res.error)
    } else {
      setSuccess('Pack elmentve a felhőbe! ☁️')
      loadPacks(user.id)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  const handleLoadPack = async (packId) => {
    const res = await apiLoadPack(user.id, packId)
    if (res.success && res.packData) {
      onLoadPack(res.packData)
      onClose()
    }
  }

  const handleLogout = () => {
    setUser(null); setView('login')
    setUsername(''); setPassword('')
    setPacks([]); setError(null)
  }

  const isPremium = user?.is_premium || user?.role === 'admin'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Cloud size={18} className="text-cyan-400" />
            <span className="font-bold text-white">GUICraft Cloud</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* LOGIN VIEW */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-gray-400 text-sm">Mentsd a packjaidat a felhőbe</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Felhasználónév"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    placeholder="Jelszó"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {error && error !== 'premium_required' && (
                <div className="flex items-center gap-2 bg-red-950/50 border border-red-800/50 rounded-lg px-3 py-2">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader size={16} className="animate-spin" /> : <LogIn size={16} />}
                {loading ? 'Bejelentkezés…' : 'Bejelentkezés'}
              </button>

              {/* Prémium upsell */}
              <div className="border-t border-gray-800 pt-4 mt-2">
                <div className="bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-purple-700/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={15} className="text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-300">Nincs fiókod?</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Vegyél prémium hozzáférést és mentsd a packjaidat a felhőbe – bármikor, bárhonnan elérhető.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">10 USD</span>
                    <button
                      type="button"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                    >
                      Megveszem →
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* DASHBOARD VIEW */}
          {view === 'dashboard' && user && (
            <div className="space-y-4">
              {/* User info */}
              <div className="flex items-center justify-between bg-gray-800/60 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {user.role === 'admin' ? '👑 Admin' : isPremium ? '⭐ Prémium' : '🔒 Free'}
                    </p>
                  </div>
                </div>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>

              {/* Premium required error */}
              {error === 'premium_required' && (
                <div className="bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-purple-700/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={15} className="text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-300">Prémium funkció</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">A felhőmentés prémium funkcó. Vegyél hozzáférést!</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">10 USD</span>
                    <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
                      Megveszem →
                    </button>
                  </div>
                </div>
              )}

              {/* Save current pack */}
              {success && (
                <div className="flex items-center gap-2 bg-green-950/50 border border-green-800/50 rounded-lg px-3 py-2">
                  <CheckCircle size={14} className="text-green-400" />
                  <p className="text-green-300 text-sm">{success}</p>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                {loading ? 'Mentés…' : `Pack mentése: "${packSettings.name || 'MyPack'}"`}
              </button>

              {/* Saved packs list */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FolderOpen size={14} className="text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Mentett packjaid</span>
                </div>
                {packsLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader size={18} className="animate-spin text-gray-500" />
                  </div>
                ) : packs.length === 0 ? (
                  <p className="text-xs text-gray-600 text-center py-4">Még nincs mentett pack. Mentsd el az aktuálisat!</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {packs.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleLoadPack(p.id)}
                        className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-cyan-700/50 rounded-lg px-3 py-2.5 text-left transition-all group"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{p.pack_name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(p.updated_at).toLocaleDateString('hu-HU')}
                          </p>
                        </div>
                        <FolderOpen size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

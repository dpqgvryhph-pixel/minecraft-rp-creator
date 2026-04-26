import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env variables missing – running in offline mode')
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Save pack config to Supabase
export async function savePack(packData) {
  const { data, error } = await supabase
    .from('pack_saves')
    .insert([{
      pack_name: packData.name,
      description: packData.description,
      version: packData.version,
      author: packData.author,
      mask_type: packData.maskType,
      created_at: new Date().toISOString()
    }])
    .select()

  if (error) throw error
  return data
}

// Load saved packs
export async function loadPacks() {
  const { data, error } = await supabase
    .from('pack_saves')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return data
}

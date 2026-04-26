// GUICraft Cloud API – Supabase Edge Function hívások
const EDGE_URL = 'https://uctzsndnlmpsmniufrzg.supabase.co/functions/v1/guicraft-auth'

async function callApi(body) {
  const res = await fetch(EDGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function apiLogin(username, password) {
  return callApi({ action: 'login', username, password })
}

export async function apiSavePack(userId, packName, packData) {
  return callApi({ action: 'save_pack', userId, packName, packData })
}

export async function apiLoadPacks(userId) {
  return callApi({ action: 'load_packs', userId })
}

export async function apiLoadPack(userId, packId) {
  return callApi({ action: 'load_pack', userId, packId })
}

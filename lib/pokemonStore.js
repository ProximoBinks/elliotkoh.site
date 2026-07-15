// Shared read/write for the pokemon collection ownership list.
// Netlify Blobs is only wired up inside Netlify's runtime; during `next dev`
// getStore() throws, so fall back to a gitignored local JSON file there.
const STORE_KEY = 'lillie-owned';
const DEV_FILE = '.data/pokemon-owned.json';

export async function readOwned() {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('pokemon-collection');
    return (await store.get(STORE_KEY, { type: 'json' })) || [];
  } catch (err) {
    const fs = await import('fs');
    try {
      return JSON.parse(fs.readFileSync(DEV_FILE, 'utf8'));
    } catch {
      return [];
    }
  }
}

export async function writeOwned(owned) {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('pokemon-collection');
    await store.setJSON(STORE_KEY, owned);
  } catch (err) {
    const fs = await import('fs');
    fs.mkdirSync('.data', { recursive: true });
    fs.writeFileSync(DEV_FILE, JSON.stringify(owned, null, 2));
  }
}

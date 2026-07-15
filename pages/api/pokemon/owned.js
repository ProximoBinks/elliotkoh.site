import crypto from 'crypto';
import { lillieCards } from '../../../data/pokemonCards';
import { readOwned, writeOwned } from '../../../lib/pokemonStore';

const VALID_IDS = new Set(lillieCards.map((card) => card.id));

function passwordMatches(supplied) {
  const expected = process.env.POKEMON_ADMIN_PASSWORD;
  if (!expected || typeof supplied !== 'string') return false;
  const a = crypto.createHash('sha256').update(supplied).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    return res.status(200).json({ owned: await readOwned() });
  }

  if (req.method === 'PUT') {
    if (!process.env.POKEMON_ADMIN_PASSWORD) {
      return res.status(503).json({ error: 'POKEMON_ADMIN_PASSWORD is not configured' });
    }
    if (!passwordMatches(req.headers['x-admin-password'])) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const { owned } = req.body || {};
    if (!Array.isArray(owned)) {
      return res.status(400).json({ error: 'Body must be { owned: string[] }' });
    }

    const cleaned = [...new Set(owned)].filter((id) => VALID_IDS.has(id));
    await writeOwned(cleaned);
    return res.status(200).json({ owned: cleaned });
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}

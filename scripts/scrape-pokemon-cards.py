# Scrape a character's card list + images from artofpkm.com into the site.
#
# Usage:  python3 scripts/scrape-pokemon-cards.py [character_id] [folder_name]
# e.g.:   python3 scripts/scrape-pokemon-cards.py 274 lillie
#
# Downloads full-size scans, writes 600w + 1200w webp pairs into
# public/images/pokemon/<folder>/, and regenerates data/pokemonCards.js.
# Requires Pillow (pip3 install pillow). Re-runs skip already-downloaded scans.
import io
import json
import os
import re
import sys
import time
import urllib.request

from PIL import Image

BASE = 'https://www.artofpkm.com'
CHARACTER_ID = sys.argv[1] if len(sys.argv) > 1 else '274'
FOLDER = sys.argv[2] if len(sys.argv) > 2 else 'lillie'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, 'public', 'images', 'pokemon', FOLDER)
RAW_DIR = os.path.join(ROOT, '.data', 'raw-cards', FOLDER)
DATA_FILE = os.path.join(ROOT, 'data', 'pokemonCards.js')

CARD_RE = re.compile(
    r'<a data-action="click-&gt;lightbox#open"'
    r'[^>]*data-lightbox-title="[^"]*"'
    r'[^>]*data-lightbox-url="(?P<url>[^"]*)"'
    r'[^>]*href="(?P<full>[^"]*)"[^>]*>'
    r'.*?card-title[^>]*>(?P<name>[^<]*)<'
    r'.*?card-subtitle[^>]*>(?P<number>[^<]*)<'
    r'.*?card-subtitle[^>]*>(?P<set>[^<]*)<',
    re.S,
)


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (personal collection tracker)'})
    with urllib.request.urlopen(req) as r:
        return r.read()


def parse(html, kind):
    cards = []
    for m in CARD_RE.finditer(html):
        d = m.groupdict()
        slug = d['url'].strip('/').replace('sets/', 'set').replace('/card/', '-card')
        cards.append({
            'id': slug,
            'kind': kind,
            'name': d['name'].strip().replace('&#39;', "'").replace('&amp;', '&'),
            'number': d['number'].strip(),
            'set': d['set'].strip().replace('&#39;', "'").replace('&amp;', '&'),
            'image': f'/images/pokemon/{FOLDER}/{slug}.webp',
            'imageFull': f'/images/pokemon/{FOLDER}/{slug}-full.webp',
            'fullSrc': d['full'] if d['full'].startswith('http') else BASE + d['full'],
        })
    return cards


os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(RAW_DIR, exist_ok=True)

cards = parse(fetch(f'{BASE}/characters/{CHARACTER_ID}/cards').decode(), 'primary')
seen = {c['id'] for c in cards}
cards += [
    c for c in parse(fetch(f'{BASE}/characters/{CHARACTER_ID}/secondary_cards').decode(), 'secondary')
    if c['id'] not in seen
]
print(f'parsed {len(cards)} cards')

for i, card in enumerate(cards):
    raw = os.path.join(RAW_DIR, card['id'])
    if not (os.path.exists(raw) and os.path.getsize(raw) > 0):
        open(raw, 'wb').write(fetch(card['fullSrc']))
        print(f"{i + 1}/{len(cards)} downloaded {card['id']}")
        time.sleep(0.4)
    im = Image.open(raw).convert('RGB')
    for width, suffix in [(600, ''), (1200, '-full')]:
        dest = os.path.join(IMG_DIR, f"{card['id']}{suffix}.webp")
        if os.path.exists(dest):
            continue
        resized = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS) if im.width > width else im
        resized.save(dest, 'WEBP', quality=82)
    del card['fullSrc']

header = (
    f'// {FOLDER.capitalize()} Pokémon card checklist — scraped from artofpkm.com character '
    f"{CHARACTER_ID}\n// via scripts/scrape-pokemon-cards.py. 'kind' is 'primary' for cards featuring\n"
    "// the character, 'secondary' for incidental appearances. Regenerate with the script.\n"
)
body = json.dumps(cards, indent=2, ensure_ascii=False)
open(DATA_FILE, 'w').write(f'{header}export const lillieCards = {body};\n')
print(f'wrote {DATA_FILE} and images to {IMG_DIR}')

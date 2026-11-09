#!/usr/bin/env python3
"""IA EN MAIN — génère <racine du dépôt>/<slug>/index.html (site GitHub Pages) pour chaque clients/<slug>.json."""
import json, glob, os, sys, html
ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, '..')
import hashlib, shutil
tpl = open(os.path.join(ROOT, 'page.html'), encoding='utf-8').read()
V = hashlib.md5((open(os.path.join(ROOT,'app.js')).read()+open(os.path.join(ROOT,'app.css')).read()).encode()).hexdigest()[:8]
only = sys.argv[1:]
for f in sorted(glob.glob(os.path.join(ROOT, 'clients', '*.json'))):
    c = json.load(open(f, encoding='utf-8'))
    if only and c['slug'] not in only:
        continue
    out = (tpl.replace('__V__', V).replace('__TITLE__', html.escape(c['title']))
              .replace('__OGDESC__', html.escape(c['ogdesc']))
              .replace('__OGIMG__', html.escape(c['ogimg']))
              .replace('__FONTS__', html.escape(c['fonts']))
              .replace('__VARS__', ';'.join(f'{k}:{v}' for k, v in c['vars'].items()))
              .replace('__CONFIG__', json.dumps(c, ensure_ascii=False).replace('</', '<\\/')))
    d = os.path.join(OUT, c['slug'])
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
    print('ok', c['slug'], len(out))
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(
    '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>IA EN MAIN</title></head>'
    '<body style="font-family:sans-serif;padding:40px">IA EN MAIN</body></html>')
for n in ('app.js','app.css','db.js'): shutil.copy(os.path.join(ROOT,n),os.path.join(OUT,n))
open(os.path.join(OUT,'.nojekyll'),'w').close()

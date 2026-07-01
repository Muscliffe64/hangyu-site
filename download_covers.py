#!/usr/bin/env python3
"""
Mac 本地运行：扫 Writing/*.md 和 article/*.md，把每篇里的微信封面图下载到 Writing/covers/{文章名}.{jpg|png}

用法：
  cd "/Users/hangyu/Documents/Web Creating"
  python3 download_covers.py
"""

import re
import ssl
import urllib.request
from pathlib import Path

# 默认放在脚本同目录的 Writing/ 下
HERE = Path(__file__).parent
WRITING = HERE / 'Writing'
ARTICLE = HERE / 'article'
COVERS = WRITING / 'covers'
COVERS.mkdir(exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    'Referer': 'https://mp.weixin.qq.com/'
}

ok = fail = 0
missing = []

md_files = sorted(WRITING.glob('*.md')) + sorted(ARTICLE.glob('*.md'))

for md in md_files:
    text = md.read_text(encoding='utf-8')
    m = re.search(r'(https?://mmbiz\.qpic\.cn/[^\s)"\']+)', text)
    if not m:
        missing.append(md.name)
        continue
    url = m.group(1).rstrip('\\')

    fmt = 'png' if ('wx_fmt=png' in url or '_png/' in url) else 'jpg'
    out = COVERS / f'{md.stem}.{fmt}'
    if out.exists() and out.stat().st_size > 1000:
        print(f'SKIP {md.stem}.{fmt}')
        ok += 1
        continue

    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, context=ctx, timeout=20) as r:
            data = r.read()
        out.write_bytes(data)
        print(f'OK   {md.stem}.{fmt} ({len(data)//1024} KB)')
        ok += 1
    except Exception as e:
        print(f'FAIL {md.stem}: {e}')
        fail += 1

print(f'\n=== {ok} ok · {fail} fail · {len(missing)} missing url ===')
for m_name in missing:
    print(f'  无封面 URL: {m_name}')

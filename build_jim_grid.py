#!/usr/bin/env python3
"""
Mac 本地运行：扫 Photos/Jim/，按拍摄时间（EXIF DateTimeOriginal 优先，文件名前缀次之）
排序 + 按内容 md5 去重，重写 jim.html 中 <div class="jim-grid">...</div> 的内容。
每张照片同时带 data-exif 属性（相机/镜头/焦段·光圈·快门·ISO/日期），lightbox 自动显示。

用法：
  cd "/Users/hangyu/Documents/Web Creating"
  python3 build_jim_grid.py
"""

import re
import os
import hashlib
from html import escape as html_escape
from pathlib import Path
from datetime import datetime
from urllib.parse import quote
from PIL import Image
from PIL.ExifTags import TAGS

# 脚本同目录就是 Web Creating/
HERE = Path(__file__).parent
JIM_DIR = HERE / 'Photos' / 'Jim'
JIM_HTML = HERE / 'jim.html'

def read_exif(path):
    try:
        img = Image.open(path)
        raw = img._getexif() or {}
        return {TAGS.get(k, k): v for k, v in raw.items()}
    except Exception:
        return {}

def get_exif_date(named):
    s = named.get('DateTimeOriginal') or named.get('DateTime')
    if s:
        try:
            return datetime.strptime(s, '%Y:%m:%d %H:%M:%S')
        except Exception:
            pass
    return None

def get_filename_date(name):
    m = re.match(r'^(\d{4})(\d{2})(\d{2})', name)
    if m:
        try:
            return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
        except Exception:
            pass
    return None

def get_date(path, named):
    exif_date = get_exif_date(named)
    if exif_date:
        return exif_date, 'exif'
    fname_date = get_filename_date(path.name)
    if fname_date:
        return fname_date, 'name'
    return datetime.fromtimestamp(path.stat().st_mtime), 'mtime'

def fmt_shutter(t):
    """分数表示：1/250s 或 0.5s"""
    try:
        t = float(t)
        if t >= 1:
            return f'{t:g}s'
        return f'1/{int(round(1/t))}s'
    except Exception:
        return ''

def fmt_aperture(f):
    try:
        return f'f/{float(f):g}'
    except Exception:
        return ''

def fmt_focal(named):
    f35 = named.get('FocalLengthIn35mmFilm')
    fa = named.get('FocalLength')
    try:
        if f35:
            return f'{int(f35)}mm'
        if fa is not None:
            return f'{int(round(float(fa)))}mm'
    except Exception:
        pass
    return ''

def build_exif_text(named, dt):
    """生成多行 EXIF 字符串：
       相机型号
       镜头
       焦段 · f/光圈 · 1/快门s · ISO
       日期"""
    if not named:
        return f'{dt.strftime("%Y.%m.%d")}' if dt else ''
    make = (named.get('Make') or '').strip()
    model = (named.get('Model') or '').strip()
    cam = ''
    if make and model:
        if model.lower().startswith(make.lower()):
            cam = model
        else:
            cam = f'{make} {model}'
    elif model:
        cam = model
    elif make:
        cam = make

    lens = (named.get('LensModel') or named.get('LensMake') or '').strip()

    parts = []
    focal = fmt_focal(named)
    if focal:
        parts.append(focal)
    f_val = named.get('FNumber')
    if f_val:
        parts.append(fmt_aperture(f_val))
    sh = named.get('ExposureTime')
    if sh:
        parts.append(fmt_shutter(sh))
    iso = named.get('ISOSpeedRatings') or named.get('PhotographicSensitivity')
    if iso:
        try:
            parts.append(f'ISO {int(iso)}')
        except Exception:
            pass

    line3 = ' · '.join(parts)
    line4 = dt.strftime('%Y.%m.%d') if dt else ''

    lines = [s for s in [cam, lens, line3, line4] if s]
    return '\n'.join(lines)

# 1. 扫文件、按内容 md5 去重、按拍摄时间排序
photos = []
exts = {'.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG'}
seen_hash = {}
duplicates = []
for p in sorted(JIM_DIR.iterdir(), key=lambda x: x.name):
    if not (p.is_file() and p.suffix in exts):
        continue
    h = hashlib.md5(p.read_bytes()).hexdigest()
    if h in seen_hash:
        duplicates.append((p.name, seen_hash[h]))
        continue
    seen_hash[h] = p.name
    named = read_exif(p)
    d, src = get_date(p, named)
    exif_text = build_exif_text(named, d)
    photos.append((d, src, p, exif_text))
photos.sort(key=lambda x: x[0])

if duplicates:
    print(f'去重：剔除 {len(duplicates)} 张内容重复的')
    for dup, kept in duplicates:
        print(f'  {dup} ≡ {kept} → 跳过 {dup}')

print(f'共 {len(photos)} 张')
src_count = {}
for d, src, p, _ in photos:
    src_count[src] = src_count.get(src, 0) + 1
print('日期来源：', src_count)

# 2. 拼出 <a><img></a>
def url_for(p):
    rel = p.relative_to(HERE)
    return '/'.join(quote(s) for s in str(rel).split('/'))

def attr_escape(s):
    """HTML 属性安全：换行用 &#10;"""
    return html_escape(s, quote=True).replace('\n', '&#10;')

lines = []
for i, (d, src, p, exif_text) in enumerate(photos, 1):
    u = url_for(p)
    date_str = d.strftime('%Y.%m.%d')
    exif_attr = attr_escape(exif_text)
    lines.append(
        f'      <a href="{u}" class="jim-photo" '
        f'data-date="{date_str}" data-filename="{p.name}" '
        f'data-exif="{exif_attr}"><img src="{u}" alt="积木 {i} · {date_str}"></a>'
    )
grid_html = '\n'.join(lines)

# 3. 替换 jim.html 里 <div class="jim-grid">...</div>
#    顺便把 data-folder="Jim" 加到 grid 上（统一 manifest / captions / 编辑模式）
html = JIM_HTML.read_text(encoding='utf-8')

# 先确保 grid 有 data-folder="Jim"
html = re.sub(
    r'<div class="jim-grid"(?![^>]*data-folder)',
    '<div class="jim-grid" data-folder="Jim"',
    html,
    count=1
)

new_html = re.sub(
    r'(<div class="jim-grid"[^>]*>)[\s\S]*?(\n\s*</div>)',
    lambda m: m.group(1) + '\n' + grid_html + m.group(2),
    html,
    count=1
)
if new_html == html:
    print('警告：没找到 <div class="jim-grid">，没改 jim.html')
else:
    JIM_HTML.write_text(new_html, encoding='utf-8')
    print(f'jim.html 已更新，共 {len(photos)} 张照片')

# 4. 报告最早 / 最晚
print('\n最早 5 张：')
for d, src, p, _ in photos[:5]:
    print(f'  {d.strftime("%Y-%m-%d")} ({src}) {p.name}')
print('\n最晚 5 张：')
for d, src, p, _ in photos[-5:]:
    print(f'  {d.strftime("%Y-%m-%d")} ({src}) {p.name}')

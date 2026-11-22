#!/usr/bin/env python3
"""
写代码页的项目卡片和每个项目的详情页。

- 项目内容都写在 coding_projects.py 的 PROJECTS 里：改文字、换截图、加链接，只改那个文件
- 运行 python3 build_coding.py：
  1. 生成 coding/<slug>.html（每个项目一页）
  2. 重写 vibe-coding.html 里 <!-- coding:classroom:start/end --> 和 <!-- coding:jim:start/end --> 之间的卡片
- 截图放在 Code/<slug>/，可直接放 webp
"""

import html
import re
from pathlib import Path

from coding_projects import GROUPS, PROJECTS, WHY

HERE = Path(__file__).parent
OUT = HERE / 'coding'
OUT.mkdir(exist_ok=True)

NAV_ITEMS = [
    ('index.html', '首页', 'Home'),
    ('photography.html', '摄影', 'Photography'),
    ('films.html', '影像', 'Films'),
    ('writing.html', '文字', 'Writing'),
    ('vibe-coding.html', '写代码', 'Coding'),
    ('jim.html', '积木', 'Jim'),
    ('about.html', '关于', 'About'),
]

esc = html.escape


def nav(prefix):
    out = []
    for href, zh, en in NAV_ITEMS:
        cls = ' class="active"' if href == 'vibe-coding.html' else ''
        out.append(f'        <a href="{prefix}{href}"{cls}><span class="zh">{zh}</span><span class="en">{en}</span></a>')
    return '\n'.join(out)


def img_tag(src, alt, w, h, lazy=True, prefix='../'):
    load = ' loading="lazy"' if lazy else ''
    return f'<img src="{prefix}{src}" alt="{esc(alt)}" width="{w}" height="{h}"{load} decoding="async">'


def size_of(path):
    """读 webp/png 的宽高，写进 width/height，避免加载时页面跳动。"""
    data = (HERE / path).read_bytes()
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        chunk = data[12:16]
        if chunk == b'VP8X':
            w = 1 + int.from_bytes(data[24:27], 'little')
            h = 1 + int.from_bytes(data[27:30], 'little')
            return w, h
        if chunk == b'VP8 ':
            w = int.from_bytes(data[26:28], 'little') & 0x3FFF
            h = int.from_bytes(data[28:30], 'little') & 0x3FFF
            return w, h
        if chunk == b'VP8L':
            b = data[21:25]
            w = 1 + (((b[1] & 0x3F) << 8) | b[0])
            h = 1 + (((b[3] & 0x0F) << 10) | (b[2] << 2) | ((b[1] & 0xC0) >> 6))
            return w, h
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')
    raise ValueError(f'不认识的图片格式：{path}')


# ---------- 详情页的各种段落 ----------

def block_prose(b):
    return f'      <div class="proj-prose">\n{b["html"]}\n      </div>'


def block_quote(b):
    cite = f'<cite>{esc(b["cite"])}</cite>' if b.get('cite') else ''
    return f'      <blockquote class="proj-quote"><p>{b["text"]}</p>{cite}</blockquote>'


def block_steps(b):
    items = ''.join(f'<li><b>{esc(t)}</b><span>{d}</span></li>' for t, d in b['items'])
    return f'      <ol class="proj-steps">{items}</ol>'


def block_gallery(b):
    shots = []
    for s in b['shots']:
        w, h = size_of(s['src'])
        cls = 'proj-shot'
        if s.get('phone'):
            cls += ' is-phone'
        if s.get('wide'):
            cls += ' is-wide'
        en = f'<span class="en">{esc(s["en"])}</span>' if s.get('en') else ''
        shots.append(
            f'        <figure class="{cls}"><div class="frame">{img_tag(s["src"], s["alt"], w, h)}</div>'
            f'<figcaption>{s["zh"]}{en}</figcaption></figure>')
    cls = 'proj-gallery has-phones' if b.get('phones') else 'proj-gallery'
    return f'      <div class="{cls}">\n' + '\n'.join(shots) + '\n      </div>'


def block_try(b):
    first = b['tabs'][0]
    tabs = ''.join(
        f'<button type="button" data-src="{esc(t["src"])}" aria-pressed="{"true" if i == 0 else "false"}">{esc(t["label"])}</button>'
        for i, t in enumerate(b['tabs']))
    poster = f' style="background-image:linear-gradient(rgba(17,17,17,.55),rgba(17,17,17,.55)),url(../{b["poster"]})"' if b.get('poster') else ''
    return f'''      <div class="proj-try">
        <div class="proj-try-tabs">{tabs}</div>
        <div class="proj-try-frame">
          <button type="button" class="proj-try-cover" data-src="{esc(first["src"])}"{poster}><span>▶ 在这里试一试</span><span>点开后可以直接拖动、点按{'，会有声音' if b.get('sound') else ''}</span></button>
        </div>
        <p class="proj-try-note">{b["note"]} <a data-full href="{esc(first["src"])}" target="_blank" rel="noopener">单独打开这一页 ↗</a></p>
      </div>'''


def block_tech(b):
    return f'      <p class="proj-tech">{b["html"]}</p>'


BLOCKS = {
    'prose': block_prose, 'quote': block_quote, 'steps': block_steps,
    'gallery': block_gallery, 'try': block_try, 'tech': block_tech,
}


def section_html(sec):
    parts = [f'    <section class="proj-section" id="{sec["id"]}">',
             f'      <h2><span class="zh">{esc(sec["zh"])}</span><span class="en">{esc(sec["en"])}</span></h2>']
    parts += [BLOCKS[b['type']](b) for b in sec['blocks']]
    parts.append('    </section>')
    return '\n'.join(parts)


def links_html(p):
    if not p.get('links') and not p.get('link_note'):
        return ''
    out = []
    for link in p['links']:
        cls = 'proj-link is-quiet' if link.get('quiet') else 'proj-link'
        out.append(f'<a class="{cls}" href="{esc(link["url"])}" target="_blank" rel="noopener">{esc(link["label"])} ↗</a>')
    note = f'<span class="proj-link-note">{p["link_note"]}</span>' if p.get('link_note') else ''
    return '      <div class="proj-links">' + ''.join(out) + note + '</div>'


def facts_html(p):
    rows = ''.join(f'<div><dt>{esc(k)}</dt><dd>{v}</dd></div>' for k, v in p['facts'])
    return f'    <dl class="proj-facts">{rows}</dl>'


def page_html(p, prev_p, next_p):
    hw, hh = size_of(p['hero']['src'])
    sections = '\n\n'.join(section_html(s) for s in p['sections'])
    nav_links = []
    if prev_p:
        nav_links.append(f'<a class="prev" href="{prev_p["slug"]}.html"><small>← 上一个</small><span>{esc(prev_p["zh"])}</span></a>')
    else:
        nav_links.append('<span></span>')
    if next_p:
        nav_links.append(f'<a class="next" href="{next_p["slug"]}.html"><small>下一个 →</small><span>{esc(next_p["zh"])}</span></a>')
    draft = '<p class="proj-draft">（文字初稿，待航宇改写）</p>' if p.get('draft') else ''
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(p["zh"])} · {esc(p["en"])} — Hangyu</title>
  <meta name="description" content="{esc(p["card_desc"])}">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="../index.html" class="brand"><span class="brand-name">Hangyu</span></a>
      <nav class="primary-nav">
{nav("../")}
      </nav>
    </div>
  </header>

  <main class="proj">
    <p class="proj-back"><a href="../vibe-coding.html#{p["group"]}">← 写代码 · Coding</a></p>
    <div class="proj-head">
      <p class="proj-meta">{esc(p["meta"])}</p>
      <h1><span class="zh">{esc(p["zh"])}</span><span class="en">{esc(p["en"])}</span></h1>
      <p class="proj-lede">{p["lede"]}</p>
      <p class="proj-lede-en">{p["lede_en"]}</p>
{links_html(p)}
    </div>
    <figure class="proj-hero{" is-phone" if p["hero"].get("phone") else ""}">{img_tag(p["hero"]["src"], p["hero"]["alt"], hw, hh, lazy=False)}</figure>
{facts_html(p)}

{sections}

    {draft}
    <nav class="proj-nav">{''.join(nav_links)}</nav>
  </main>

  <footer class="site-footer">
    <p><a href="mailto:jihangyurec@gmail.com">jihangyurec@gmail.com</a></p>
    <p class="copy">© 2026 Hangyu</p>
  </footer>

  <script src="coding.js"></script>
</body>
</html>
'''


def card_html(p):
    src = p['card']['src']
    w, h = size_of(src)
    phone = ' is-phone' if p['card'].get('phone') else ''
    note = f'\n              <p class="code-note">{p["card_note"]}</p>' if p.get('card_note') else ''
    return f'''          <article class="code-card">
            <a class="code-card-link" href="coding/{p["slug"]}.html">
            <figure class="code-shot{phone}">{img_tag(src, p["card"]["alt"], w, h, prefix='')}</figure>
            <div class="code-info">
              <p class="code-meta">{esc(p["meta"])}</p>
              <h3><span class="zh">{esc(p["zh"])}</span><span class="en">{esc(p["en"])}</span></h3>
              <p class="code-desc">{p["card_desc"]}</p>{note}
              <span class="code-more">看看里面 →</span>
            </div>
            </a>
          </article>'''


def update_index():
    path = HERE / 'vibe-coding.html'
    text = path.read_text(encoding='utf-8')
    for group in GROUPS:
        cards = '\n\n'.join(card_html(p) for p in PROJECTS if p['group'] == group)
        start, end = f'<!-- coding:{group}:start -->', f'<!-- coding:{group}:end -->'
        pattern = re.compile(re.escape(start) + r'.*?' + re.escape(end), re.S)
        if not pattern.search(text):
            raise SystemExit(f'vibe-coding.html 里找不到 {start}')
        text = pattern.sub(lambda m: f'{start}\n{cards}\n          {end}', text)
    path.write_text(text, encoding='utf-8')


def main():
    for p in PROJECTS:
        for sec in p['sections']:
            if sec['id'] == 'why' and not sec['blocks']:
                sec['blocks'] = WHY.get(p['slug'], [])
        p['sections'] = [s for s in p['sections'] if s['blocks']]
    order = [p for g in GROUPS for p in PROJECTS if p['group'] == g]
    for i, p in enumerate(order):
        prev_p = order[i - 1] if i > 0 else None
        next_p = order[i + 1] if i + 1 < len(order) else None
        (OUT / f'{p["slug"]}.html').write_text(page_html(p, prev_p, next_p), encoding='utf-8')
        print('写入', f'coding/{p["slug"]}.html')
    update_index()
    print('更新 vibe-coding.html 的项目卡片')


if __name__ == '__main__':
    main()

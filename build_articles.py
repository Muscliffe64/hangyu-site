#!/usr/bin/env python3
"""
把 Writing/*.md 转成 article/{stem}.html，并重建 writing.html。

- 文字列表分成「随笔」和「AI」两个区块
- 处理 YAML frontmatter / 老格式导入头尾
- 支持常见 Markdown：标题、段落、引用、列表、代码块、表格、图片、链接、粗斜体
- 正文独立图片默认 2.35:1；在 alt 后加 |16:9 可切换为 16:9
- 单篇文章提供同分区内的上一篇 / 下一篇导航
"""

from dataclasses import dataclass
import html
import re
from pathlib import Path
from urllib.parse import quote


HERE = Path(__file__).parent
candidates = [
    Path('/sessions/peaceful-brave-ride/mnt/Web Creating'),
    Path('/Users/hangyu/Documents/Web Creating'),
    HERE.parent / 'Web Creating',
    HERE,
]
WEB = next((p for p in candidates if p.exists() and (p / 'writing.html').exists()), None)
if not WEB:
    raise SystemExit('找不到 Web Creating 目录')

WRITING = WEB / 'Writing'
ARTICLE = WEB / 'article'
ARTICLE.mkdir(exist_ok=True)
COVERS = WRITING / 'covers'


@dataclass(frozen=True)
class Article:
    title: str
    stem: str
    date: str
    section: str = 'essay'
    source: str = '积木船长的朋友'


# 文字页顶部介绍和两个栏目说明都在这里改。
WRITING_INTRO = {
    'zh': '这里收集我的文字：一部分是随笔，记录教育、旅行、亲子、社会观察和生活里慢慢形成的判断；另一部分是 AI 与教育，记录我在教学现场中使用模型、和学生共创，以及观察教育关系变化的过程。',
    'en': 'A collection of essays and notes: personal writing on education, travel, family, and social observation, alongside reflections on AI in education, classroom practice, student work, and human-machine collaboration.',
}


SECTIONS = {
    'essay': {
        'title': '随笔',
        'en': 'Essays',
        'anchor': 'essays',
        'description_zh': '从日常和远方长出来的文字：教育、旅行、亲子、社会观察，以及那些慢慢形成的判断。',
        'description_en': 'Essays drawn from everyday life and elsewhere: education, travel, family, social observation, and the judgments that slowly take shape.',
    },
    'ai': {
        'title': 'AI 与教育',
        'en': 'AI & Education',
        'anchor': 'ai',
        'description_zh': '记录我在教学现场里和模型一起工作：课堂实验、学生项目、提示词、工具实践，以及 AI 如何改变学习、表达和师生关系。',
        'description_en': 'Notes on AI in education: classroom experiments, student projects, prompts, tools, and how models reshape learning, expression, and the teacher-student relationship.',
    },
}


# 最新在前。把 section 改成 'ai'，文章就会进入 AI 分区。
ARTICLES = [
    Article('从零到一，谈谈带学生们探索 AI 的这个学期', '[202606282233]从零到一谈谈带学生们探索AI的这个学期', '2026.06.28', 'ai'),
    Article('这周我们拿 AI 做了什么', '[202606182000]这周我们拿AI做了什么', '2026.06.18', 'ai'),
    Article('这一周，我们用 AI 做了什么？', '[202606112000]这一周我们用AI做了什么', '2026.06.11', 'ai'),
    Article('卖了 0.08 个以太坊那天起', '[202606052000]卖了0.08个以太坊那天起', '2026.06.05', 'ai'),
    Article('这一周，我用 AI 做了什么（WEEK 04）', '[202606032111]这一周我用AI做了什么', '2026.06.03', 'ai'),
    Article('这一周，我用 AI 做了什么（WEEK 03）', '[202605290049]这一周我用AI做了什么', '2026.05.29', 'ai'),
    Article('这一周，我又拿 AI 做了什么', '[202605262115]这一周我拿AI做了什么', '2026.05.26', 'ai'),
    Article('我是不是也有点傲慢', '我是不是也有点傲慢', '2026.03.05'),
    Article('在爸爸这座"大山"下，用 AI 写完一篇周记', '在爸爸这座“大山”下，用AI写完一篇周记', '2026.02.27', 'ai'),
    Article('资产、复利与一个奇妙的时刻', '资产、复利与一个奇妙的时刻', '2026.02.24'),
    Article('当大模型遇上小矿工', '当大模型遇上小矿工', '2025.11.20', 'ai'),
    Article('孩子们真棒！', '孩子们真棒_', '2025.10.29'),
    Article('又被习惯了', '又被习惯了', '2025.09.30'),
    Article('星野道夫的睡前故事', '星野道夫的睡前故事', '2025.09.26'),
    Article('苍蝇', '苍蝇', '2025.09.16'),
    Article('你讲你的"立德树人"', '你讲你的_立德树人_', '2025.09.15'),
    Article('子弹说了算', '子弹说了算', '2025.09.12'),
    Article('热爱是一个动词', '热爱是一个动词', '2025.09.11'),
    Article('夜行默拉皮：比特币的种子', '夜行默拉皮_比特币的种子', '2025.08.26'),
    Article('在婆罗浮屠想起的墙', '在婆罗浮屠想起的墙', '2025.08.25'),
    Article('工具人也得先是人', '工具人也得先是人', '2025.07.17'),
    Article('俄乌巴以喝中药', '鹅屋八乙喝中药', '2025.07.10'),
    Article('大象', '大象', '2025.05.22'),
    Article('演出已散，戏仍在演', '演出已散_戏仍在演', '2025.05.16'),
    Article('一棵杨树', '一棵杨树', '2025.05.15'),
    Article('孩子，一路走好，一个中国人', '孩子，一路走好，一个中国人', '2024.09.21'),
    Article('勇敢地去做空教育中的"负资产"', '勇敢地去做空教育中的_负资产_', '2024.09.18'),
    Article('21 世纪的美白执念：安全撤离指南', '21世纪的美白执念__安全撤离指南', '2024.09.13'),
    Article('贝壳、核废水与世界和平', '贝壳_核废水与世界和平', '2024.09.09'),
    Article('0.7：痛定思痛接着痛', '0_7_痛定思痛接着痛', '2024.09.06'),
    Article('这是一个开始', '这是一个开始', '2024.09.05'),
]

EXCERPTS = {
    '[202606282233]从零到一谈谈带学生们探索AI的这个学期': '这学期带学生探索 AI 之后，我真正想记下来的，是一个人如何开始使用 AI。',
    '[202606182000]这周我们拿AI做了什么': '学生的流程、真实项目和 Agent 交易开始一起发生，AI 分享从“我”变成了“我们”。',
    '[202606112000]这一周我们用AI做了什么': '越来越多同学开始把自己的项目拿出来，课堂里的 AI 分享正在从演示变成共创。',
    '[202606052000]卖了0.08个以太坊那天起': '从订阅 Claude 最高档开始，重新理解模型能力、稀缺性和把工具变成生产力这件事。',
    '[202606032111]这一周我用AI做了什么': '从上架第一个产品到学生项目、语音系统和课程项目，这一周继续记录真实发生的 AI 使用。',
    '[202605290049]这一周我用AI做了什么': '修服务器、学生开始动手、搭个人知识系统，以及我继续观察 AI 如何进入工作流。',
    '[202605262115]这一周我拿AI做了什么': '产品上线、会议统筹、毕业答辩和多 Agent 协作，这一周 AI 又跨过了几条线。',
    '当大模型遇上小矿工': '大语言模型时代的一些观察与思考。',
    '孩子们真棒_': '关于这一代孩子身上让我感到希望的瞬间。',
    '又被习惯了': '我们如何被一些原本不该习惯的事物悄悄驯化。',
    '星野道夫的睡前故事': '在山下已经住了近一个月，这段陪读生活，比我想象中要有趣得多……',
    '苍蝇': '关于那些让人厌烦但又无处不在的存在。',
    '你讲你的_立德树人_': '关于教育中那些只在嘴上说的概念。',
    '子弹说了算': '关于权力、决断和那些不留余地的时刻。',
    '热爱是一个动词': '"热爱"不是一种状态，而是日复一日的动作。',
    '夜行默拉皮_比特币的种子': '在印尼默拉皮火山的夜行途中想起的事。',
    '在婆罗浮屠想起的墙': '异国遗迹前的一次停顿与回望。',
    '工具人也得先是人': '在被工具化之前，我们首先得记住自己是人。',
    '鹅屋八乙喝中药': '一段山行中遇见的人和事。',
    '大象': '房间里的大象，山林里的大象。',
    '演出已散_戏仍在演': '关于现实生活中那些不肯落幕的"表演"。',
    '一棵杨树': '家门口那棵杨树，和它见证的一些事。',
    '孩子，一路走好，一个中国人': '写给一个孩子的告别。',
    '勇敢地去做空教育中的_负资产_': '在投资中，有一种常见的操作叫"做空"——这个思路其实也可以用在我们对教育的看法上。',
    '21世纪的美白执念__安全撤离指南': '关于一种被深植于审美中的执念。',
    '贝壳_核废水与世界和平': '从一枚贝壳出发，想到的更远的事。',
    '0_7_痛定思痛接着痛': '一次反思的迭代版本。',
    '这是一个开始': '表达是一种内在需求。我们每天都在接收大量的信息，长期的输入会潜移默化地改变我们的思维方式……',
}


def escape(s):
    return html.escape(str(s), quote=False)


def escape_attr(s):
    return html.escape(str(s), quote=True)


def article_url(article):
    return f'article/{quote(article.stem)}.html'


def article_page_url(article):
    return f'{quote(article.stem)}.html'


def parse_frontmatter(text):
    if not text.startswith('---\n'):
        return {}, text

    end = text.find('\n---\n', 4)
    if end < 0:
        return {}, text

    raw = text[4:end]
    body = text[end + 5:]
    data = {}
    for line in raw.splitlines():
        m = re.match(r'^([A-Za-z0-9_-]+):\s*(.*)$', line)
        if not m:
            continue
        key, value = m.group(1), m.group(2).strip()
        if value:
            if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
                value = value[1:-1]
            data[key] = value.strip()
    return data, body


def md_path_for(article):
    for base in (WRITING, ARTICLE):
        path = base / f'{article.stem}.md'
        if path.exists():
            return path
    return WRITING / f'{article.stem}.md'


def extract_leading_cover(text):
    m = re.match(r'^\s*!\[cover_image\]\(([^)]+)\)\s*\n+', text)
    if not m:
        return None, text
    return m.group(1).strip(), text[m.end():]


def strip_wechat_tail(text):
    tail = re.search(
        r'\n+(?:预览时标签不可点|修改于)\s*'
        r'(?:\n+\s*(?:预览时标签不可点|修改于)\s*)*'
        r'(?:\n+微信扫一扫[\s\S]*|\n+---\s*\n+\s*链接\s*/\s*来源[\s\S]*)$',
        text,
    )
    if tail:
        return text[:tail.start()]
    return text


def strip_wechat_export_shell(text):
    """清理公众号 Markdown 导出里的网页壳，只保留正文。"""
    text = strip_wechat_tail(text)
    text = re.sub(r'(?m)^#{1,6}\s*$', '', text)

    marker = re.search(r'\n\s*去阅读\s*\n+', text)
    if marker:
        text = text[marker.end():]
        text = re.sub(r'^\s*#{1,6}\s+[^\n]+\n+', '', text, count=1)

    text = re.sub(r'(?m)^\s*原创\s+积木船长.*\n?', '', text)
    text = re.sub(r'(?m)^_20\d{2}年\d{2}月\d{2}日[^_\n]*_.*\n?', '', text)
    text = re.sub(r'(?m)^在小说阅读器读本章\s*\n?', '', text)
    text = re.sub(r'(?m)^去阅读\s*\n?', '', text)
    return text.strip()


def parse_md(path):
    """返回 (metadata, description, body_text)。"""
    text = path.read_text(encoding='utf-8').replace('\r\n', '\n')
    metadata, text = parse_frontmatter(text)
    description = metadata.get('description', '')

    cover_url, text = extract_leading_cover(text)
    if cover_url:
        metadata['cover_url'] = cover_url
        text = strip_wechat_export_shell(text)

    # 跳过新格式里从公众号带出的来源行。
    text = re.sub(r'^积木船长[^\n]*\n+', '', text, count=1)

    # 老格式头部：关键词 / Tags / 来源。
    text = re.sub(r'^关键词：[^\n]*\n', '', text, count=1)
    text = re.sub(r'^Tags：[^\n]*\n', '', text, count=1)
    text = re.sub(r'^\s*\n', '', text, count=1)
    text = re.sub(r'^来源：[^\n]*\n', '', text, count=1)
    text = re.sub(r'^\s*\n', '', text, count=1)

    text = strip_wechat_tail(text)

    # 老格式尾部：链接 / 来源等公众号残留。
    m = re.search(r'\n+---\s*\n+\s*链接\s*/\s*来源', text)
    if m:
        text = text[:m.start()]

    # 新格式公众号导入偶尔会保留尾部滑动提示。
    text = re.sub(
        r'\n+(?:\*\*微信扫一扫赞赏作者\*\*\s*\n+)?继续滑动看下一个\s*\n+积木船长的朋友\s*\n+向上滑动看下一个\s*$',
        '',
        text,
    )
    text = re.sub(r'(?m)^\s*_+\s*$', '', text)

    return metadata, description, text.strip()


def render_inline(text):
    protected = []

    def stash(value):
        token = f'@@INLINE{len(protected)}@@'
        protected.append(value)
        return token

    text = re.sub(
        r'`([^`\n]+)`',
        lambda m: stash(f'<code>{escape(m.group(1))}</code>'),
        text,
    )
    text = re.sub(
        r'\\([\\`*_{}\[\]()#+\-.!|>])',
        lambda m: stash(escape(m.group(1))),
        text,
    )

    s = escape(text)
    s = re.sub(
        r'!\[([^\]]*)\]\(([^)]+)\)',
        lambda m: (
            f'<img class="inline-image" src="{escape_attr(m.group(2))}" '
            f'alt="{escape_attr(m.group(1))}" loading="lazy">'
        ),
        s,
    )
    s = re.sub(
        r'\[([^\]]+)\]\(([^)]+)\)',
        lambda m: (
            f'<a href="{escape_attr(m.group(2))}" target="_blank" '
            f'rel="noopener">{m.group(1)}</a>'
        ),
        s,
    )
    s = re.sub(r'\*\*([^*\n]+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'__([^_\n]+?)__', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<!\*)\*([^*\n]+?)\*(?!\*)', r'<em>\1</em>', s)
    s = re.sub(r'(?<![A-Za-z0-9])_([^_\n]+?)_(?![A-Za-z0-9])', r'<em>\1</em>', s)
    s = s.replace('**', '')

    for idx, value in enumerate(protected):
        s = s.replace(f'@@INLINE{idx}@@', value)
    return s


def parse_image_alt(raw_alt):
    """图片 alt 支持结尾比例标记：说明 | 16:9 或 说明 | 2.35:1。"""
    alt = raw_alt.strip()
    ratio = '235'
    parts = [part.strip() for part in alt.split('|')]
    if len(parts) > 1:
        marker = parts[-1].lower().replace(' ', '')
        if marker in ('16:9', '16/9', '169'):
            ratio = '169'
            alt = ' | '.join(parts[:-1]).strip()
        elif marker in ('2.35:1', '2.35/1', '2.35', '235', '21:9', 'cinema'):
            ratio = '235'
            alt = ' | '.join(parts[:-1]).strip()
    return alt, f'ratio-{ratio}'


def is_hr(line):
    stripped = line.strip()
    return bool(re.match(r'^(\*\s*){3,}$', stripped) or re.match(r'^-{3,}$', stripped))


def is_heading(line):
    return bool(re.match(r'^\s*#{1,4}\s+\S', line))


def is_block_image(line):
    return bool(re.match(r'^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$', line))


def is_quote(line):
    return line.strip().startswith('>')


def is_list_item(line):
    return bool(re.match(r'^\s*(?:[-*]\s+|\d+[.)]\s+)', line))


def is_fence(line):
    return bool(re.match(r'^\s*```', line))


def table_separator(line):
    stripped = line.strip()
    if '|' not in stripped:
        return False
    return bool(re.match(r'^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$', stripped))


def split_table_row(line):
    cells = line.strip().strip('|').split('|')
    return [cell.strip() for cell in cells]


def render_table(rows):
    header = split_table_row(rows[0])
    body = [split_table_row(row) for row in rows[2:]]
    ths = ''.join(f'<th>{render_inline(cell)}</th>' for cell in header)
    body_rows = []
    for row in body:
        tds = ''.join(f'<td>{render_inline(cell)}</td>' for cell in row)
        body_rows.append(f'<tr>{tds}</tr>')
    return (
        '<div class="table-wrap"><table><thead><tr>'
        f'{ths}</tr></thead><tbody>{"".join(body_rows)}</tbody></table></div>'
    )


def render_list_item(text):
    text = re.sub(r'^\d+\\?[.)]\s+', '', text)
    task = re.match(r'^\[([ xX])\]\s+(.+)$', text)
    if task:
        checked = ' checked' if task.group(1).lower() == 'x' else ''
        return (
            f'<span class="task-box"><input type="checkbox" disabled{checked}></span>'
            f'{render_inline(task.group(2))}'
        )
    return render_inline(text)


def md_to_html(md):
    lines = md.split('\n')
    out = []
    i = 0

    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        if is_fence(line):
            lang = stripped[3:].strip()
            code_lines = []
            i += 1
            while i < len(lines) and not is_fence(lines[i]):
                code_lines.append(lines[i].rstrip('\n'))
                i += 1
            if i < len(lines):
                i += 1
            lang_class = f' class="language-{escape_attr(lang)}"' if lang else ''
            out.append(f'<pre><code{lang_class}>{escape("\n".join(code_lines))}</code></pre>')
            continue

        if is_heading(line):
            m = re.match(r'^\s*(#{1,4})\s+(.+)$', stripped)
            level = min(max(len(m.group(1)) + 1, 2), 4)
            out.append(f'<h{level}>{render_inline(m.group(2))}</h{level}>')
            i += 1
            continue

        if is_hr(line):
            out.append('<hr>')
            i += 1
            continue

        if i + 1 < len(lines) and table_separator(lines[i + 1]) and '|' in line:
            table_lines = [line, lines[i + 1].rstrip()]
            i += 2
            while i < len(lines) and lines[i].strip() and '|' in lines[i]:
                table_lines.append(lines[i].rstrip())
                i += 1
            out.append(render_table(table_lines))
            continue

        m = re.match(r'^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$', line)
        if m:
            alt_text, ratio_class = parse_image_alt(m.group(1))
            alt = escape_attr(alt_text)
            src = escape_attr(m.group(2))
            out.append(
                f'<figure class="article-figure {ratio_class}">'
                f'<img src="{src}" alt="{alt}" loading="lazy"></figure>'
            )
            i += 1
            continue

        if is_quote(line):
            quote_groups = [[]]
            while i < len(lines) and is_quote(lines[i]):
                qline = re.sub(r'^\s*>\s?', '', lines[i]).strip()
                if qline:
                    quote_groups[-1].append(qline)
                elif quote_groups[-1]:
                    quote_groups.append([])
                i += 1
            quote_html = []
            for group in quote_groups:
                if not group:
                    continue
                paragraph = re.sub(r'\s+', ' ', ' '.join(group)).strip()
                quote_html.append(f'<p>{render_inline(paragraph)}</p>')
            out.append('<blockquote>' + ''.join(quote_html) + '</blockquote>')
            continue

        if is_list_item(line):
            ordered = bool(re.match(r'^\s*\d+[.)]\s+', line))
            tag = 'ol' if ordered else 'ul'
            items = []
            while i < len(lines):
                item_line = lines[i]
                if ordered and not re.match(r'^\s*\d+[.)]\s+', item_line):
                    break
                if not ordered and not re.match(r'^\s*[-*]\s+', item_line):
                    break
                item_text = re.sub(r'^\s*(?:[-*]|\d+[.)])\s+', '', item_line).strip()
                items.append(f'<li>{render_list_item(item_text)}</li>')
                i += 1
            out.append(f'<{tag}>{"".join(items)}</{tag}>')
            continue

        para_lines = [stripped]
        i += 1
        while i < len(lines):
            nxt = lines[i].rstrip()
            if not nxt.strip():
                break
            if any((is_fence(nxt), is_heading(nxt), is_hr(nxt), is_block_image(nxt), is_quote(nxt), is_list_item(nxt))):
                break
            if i + 1 < len(lines) and table_separator(lines[i + 1]) and '|' in nxt:
                break
            para_lines.append(nxt.strip())
            i += 1
        paragraph = re.sub(r'\s+', ' ', ' '.join(para_lines)).strip()
        out.append(f'<p>{render_inline(paragraph)}</p>')

    return '\n'.join(out)


def cover_url_for(article, metadata=None, root_prefix='../Writing/covers'):
    for ext in ('jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'):
        p = COVERS / f'{article.stem}.{ext}'
        if p.exists():
            return f'{root_prefix}/{quote(p.name)}'
    if metadata and metadata.get('cover_url'):
        return metadata['cover_url']
    return None


def article_card(article, description, cover_url=None):
    excerpt = description or EXCERPTS.get(article.stem, article.title)
    if cover_url:
        cover_html = f'<div class="card-cover"><img src="{escape_attr(cover_url)}" alt="" loading="lazy"></div>'
    else:
        cover_html = '<div class="card-cover" aria-hidden="true"></div>'
    return (
        f'<article class="article-card" data-section="{escape_attr(article.section)}">'
        f'<a href="{article_url(article)}">'
        f'{cover_html}'
        f'<div class="card-text">'
        f'<span class="date">{escape(article.date)}</span>'
        f'<h3>{escape(article.title)}</h3>'
        f'<p class="excerpt">{escape(excerpt)}</p>'
        f'</div>'
        f'</a></article>'
    )


def section_articles(section):
    return [article for article in ARTICLES if article.section == section]


def article_index_in_section(article):
    group = section_articles(article.section)
    return group.index(article), group


def page_html(article, body_html, prev_a, next_a, cover_url=None, description=''):
    cover_html = ''
    if cover_url:
        cover_html = f'<div class="article-cover"><img src="{escape_attr(cover_url)}" alt="" loading="lazy"></div>\n'

    nav_parts = []
    if prev_a:
        nav_parts.append(
            f'<a class="prev" href="{article_page_url(prev_a)}"><span class="hint">上一篇 · 更新</span>'
            f'<span class="title">{escape(prev_a.title)}</span></a>'
        )
    else:
        nav_parts.append('<span class="prev placeholder"></span>')
    if next_a:
        nav_parts.append(
            f'<a class="next" href="{article_page_url(next_a)}"><span class="hint">下一篇 · 更早</span>'
            f'<span class="title">{escape(next_a.title)}</span></a>'
        )
    else:
        nav_parts.append('<span class="next placeholder"></span>')
    nav_html = '\n        '.join(nav_parts)

    section = SECTIONS.get(article.section, SECTIONS['essay'])
    meta_desc = escape_attr(description or article.title)
    section_label = section['title']

    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{escape(article.title)} — Hangyu</title>
  <meta name="description" content="{meta_desc}">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="../index.html" class="brand"><span class="brand-name">Hangyu</span></a>
      <nav class="primary-nav">
        <a href="../index.html"><span class="zh">首页</span><span class="en">Home</span></a>
        <a href="../photography.html"><span class="zh">摄影</span><span class="en">Photography</span></a>
        <a href="../films.html"><span class="zh">影像</span><span class="en">Films</span></a>
        <a href="../writing.html" class="active"><span class="zh">文字</span><span class="en">Writing</span></a>
        <a href="../jim.html"><span class="zh">积木</span><span class="en">Jim</span></a>
        <a href="../about.html"><span class="zh">关于</span><span class="en">About</span></a>
      </nav>
    </div>
  </header>

  <main>
    <article class="article-page article-page-{escape_attr(article.section)}">
      <div class="article-meta"><time>{escape(article.date)}</time><span class="dot">·</span><span class="from">{escape(article.source)}</span><span class="dot">·</span><span class="from">{escape(section_label)}</span></div>
      <h1 class="article-title">{escape(article.title)}</h1>
      {cover_html}<div class="article-body">
{body_html}
      </div>

      <nav class="article-nav">
        {nav_html}
      </nav>

      <div class="back-to-list">
        <a href="../writing.html#{escape_attr(section["anchor"])}">← 回到 {escape(section_label)}</a>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <p><a href="mailto:jihangyurec@gmail.com">jihangyurec@gmail.com</a></p>
    <p class="copy">© 2026 Hangyu</p>
  </footer>
</body>
</html>
'''


def writing_index_html(cards_by_section):
    total = sum(len(cards) for cards in cards_by_section.values())
    section_html = []

    for key, info in SECTIONS.items():
        cards = cards_by_section.get(key, [])
        section_html.append(f'''      <section class="writing-section" id="{escape_attr(info["anchor"])}">
        <div class="writing-section-head">
          <h2><span class="zh">{escape(info["title"])}</span><span class="en">{escape(info["en"])}</span></h2>
          <p class="section-desc-zh">{escape(info["description_zh"])}</p>
          <p class="section-desc-en">{escape(info["description_en"])}</p>
        </div>
        <div class="writing-list article-list">
          {'\n          '.join(cards)}
        </div>
      </section>''')

    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文字 — Hangyu</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="brand"><span class="brand-name">Hangyu</span></a>
      <nav class="primary-nav">
        <a href="index.html"><span class="zh">首页</span><span class="en">Home</span></a>
        <a href="photography.html"><span class="zh">摄影</span><span class="en">Photography</span></a>
        <a href="films.html"><span class="zh">影像</span><span class="en">Films</span></a>
        <a href="writing.html" class="active"><span class="zh">文字</span><span class="en">Writing</span></a>
        <a href="jim.html"><span class="zh">积木</span><span class="en">Jim</span></a>
        <a href="about.html"><span class="zh">关于</span><span class="en">About</span></a>
      </nav>
    </div>
  </header>

  <main>
    <div class="page-head writing-page-head">
      <h1>
        <span class="zh">文字</span>
        <span class="en">Writing</span>
      </h1>
      <p class="lede">{total} 篇文字。{escape(WRITING_INTRO["zh"])}</p>
      <p class="lede-en">{escape(WRITING_INTRO["en"])}</p>
    </div>

    <div class="page-body writing-page-body">
{chr(10).join(section_html)}
    </div>
  </main>

  <footer class="site-footer">
    <p><a href="mailto:jihangyurec@gmail.com">jihangyurec@gmail.com</a></p>
    <p class="copy">© 2026 Hangyu</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
'''


def article_sort_key(article):
    return article.date.replace('.', '')


def update_home_writing_preview(generated_articles, descriptions_by_stem, metadata_by_stem, limit=3):
    index_path = WEB / 'index.html'
    if not index_path.exists():
        return False

    latest = sorted(generated_articles, key=article_sort_key, reverse=True)[:limit]
    cards = [
        article_card(
            article,
            descriptions_by_stem.get(article.stem, ''),
            cover_url_for(article, metadata_by_stem.get(article.stem), 'Writing/covers'),
        )
        for article in latest
    ]
    cards_html = '\n        '.join(cards)
    replacement = (
        '      <!-- home-writing-list:start -->\n'
        '      <div class="article-list">\n'
        f'        {cards_html}\n'
        '      </div>\n'
        '      <!-- home-writing-list:end -->'
    )

    text = index_path.read_text(encoding='utf-8')
    marker_pattern = re.compile(
        r'      <!-- home-writing-list:start -->[\s\S]*?      <!-- home-writing-list:end -->'
    )
    if marker_pattern.search(text):
        new_text = marker_pattern.sub(replacement, text, count=1)
    else:
        section_pattern = re.compile(
            r'(<section class="preview">\s*<div class="section-head">[\s\S]*?'
            r'<span class="en">Writing</span>[\s\S]*?</div>\s*)'
            r'<div class="article-list">[\s\S]*?</div>'
            r'(\s*</section>)',
            re.M,
        )
        new_text = section_pattern.sub(r'\1' + replacement + r'\2', text, count=1)

    if new_text == text:
        print('⚠ 首页文字区未找到，index.html 未更新')
        return False

    index_path.write_text(new_text, encoding='utf-8')
    return True


cards_by_section = {key: [] for key in SECTIONS}
generated = []
descriptions_by_stem = {}
metadata_by_stem = {}

for article in ARTICLES:
    md_path = md_path_for(article)
    if not md_path.exists():
        print(f'⚠ 跳过：找不到 {md_path.name}')
        continue

    metadata, description, body_md = parse_md(md_path)
    descriptions_by_stem[article.stem] = description
    metadata_by_stem[article.stem] = metadata
    body_html = md_to_html(body_md)
    idx, group = article_index_in_section(article)
    prev_a = group[idx - 1] if idx > 0 else None
    next_a = group[idx + 1] if idx < len(group) - 1 else None

    html_str = page_html(article, body_html, prev_a, next_a, cover_url_for(article, metadata), description)
    out = ARTICLE / f'{article.stem}.html'
    out.write_text(html_str, encoding='utf-8')
    generated.append(article)
    cards_by_section.setdefault(article.section, []).append(
        article_card(article, description, cover_url_for(article, metadata, 'Writing/covers'))
    )

wh_path = WEB / 'writing.html'
wh_path.write_text(writing_index_html(cards_by_section), encoding='utf-8')
home_updated = update_home_writing_preview(generated, descriptions_by_stem, metadata_by_stem)

print(f'生成 {len(generated)} 篇文章页')
for key, info in SECTIONS.items():
    print(f'{info["title"]}：{len(cards_by_section.get(key, []))} 篇')
print('writing.html 已重建')
if home_updated:
    print('index.html 首页文字区已按日期更新')
print('完成。')

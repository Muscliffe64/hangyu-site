"""
写代码页的全部项目内容。改完运行 python3 build_coding.py。

每个项目：
- slug：详情页文件名 coding/<slug>.html；截图放 Code/<slug>/
- group：'classroom'（课堂）或 'jim'（给积木）
- card_*：写代码页上那张卡片
- lede / facts / links / sections：详情页
- draft=True 时页尾会显示“文字初稿，待航宇改写”
sections 里的 blocks 类型：prose（HTML 段落）、quote、steps、gallery、try（嵌入可玩的课件）、tech
"""

GROUPS = ['classroom', 'jim']

PROJECTS = []


# ------------------------------------------------------------------ 课堂

PROJECTS.append({
    'slug': 'yingxiang',
    'group': 'classroom',
    'zh': '影像与声音课件',
    'en': 'Image & Sound Lessons',
    'meta': '2026 · 交互课件 · 课堂在用',
    'card': {'src': 'Code/yingxiang.webp', 'alt': '光圈、曝光与光线课件：3D 公园场景里，相机对着人物，右上角是相机拍到的浅景深画面'},
    'card_desc': '把相机、镜头、麦克风和扬声器一件件拆开来讲的交互课件。学生在 3D 场景里转光圈、换焦距、挪太阳，马上就能看到景深、曝光和影子怎么变。',
    'card_note': '先一次只动一个参数，到最后一关才把所有参数一起打开。',
    'lede': '十一节交互课件，七节讲影像，四节讲声音。每一课都把一件器材剖开：光圈怎么改变景深，快门为什么会拖出影子，麦克风里面那片振膜怎么动，电平表为什么不能碰到 0。学生不用先听懂再动手，而是先动手，看见了，再去读那一句“要点”。',
    'lede_en': 'Eleven interactive lessons, seven on images and four on sound. Each one opens up a piece of gear so students can turn, drag and listen first, and read the rule afterwards.',
    'links': [{'label': '打开课件目录', 'url': 'https://123.57.56.38:624/'}],
    'link_note': '公开页面，手机、电脑都能直接打开，不用登录。',
    'hero': {'src': 'Code/yingxiang/aperture.webp', 'alt': '光圈、曝光与光线：3D 公园里，相机对着人物，右上角小窗是相机拍到的浅景深画面，右侧是分级活动'},
    'facts': [
        ('课程', '影像与声音基础'),
        ('内容', '影像 7 课 · 声音 4 课'),
        ('形式', '浏览器单文件，打开即用；中英双语，带投屏模式'),
        ('做法', 'three.js 搭 3D 场景，声音全部用 Web Audio 在浏览器里合成'),
    ],
    'sections': [
        {'id': 'try', 'zh': '在这里试一试', 'en': 'Try it here', 'blocks': [
            {'type': 'try', 'sound': True, 'poster': 'Code/yingxiang/shutter.webp',
             'tabs': [
                 {'label': '快门与运动模糊', 'src': 'try/shutter.html'},
                 {'label': '景别与焦距', 'src': 'try/shot-size.html'},
                 {'label': '电平、增益与削波', 'src': 'try/levels.html'},
             ],
             'note': '这是课上用的原版页面，没有删减。手机上建议横过来，或者单独打开。'},
        ]},
        {'id': 'what', 'zh': '每一课怎么走', 'en': 'How a lesson goes', 'blocks': [
            {'type': 'steps', 'items': [
                ('先看一样东西', '每一课只从一个现象开始：跑步的人被拍糊了，同一句话放远了听起来空。'),
                ('一次只动一个参数', '只给一个滑杆。拖动它，左边是真实世界，右边是相机拍到的、麦克风录到的。'),
                ('读一句要点', '看见之后，再用一两句话把规律说出来，配一道小测。'),
                ('全部打开', '最后一关把所有参数一起交给学生，自己去拍一张、调一段。'),
            ]},
        ]},
        {'id': 'gallery', 'zh': '课件里面', 'en': 'Inside the lessons', 'blocks': [
            {'type': 'gallery', 'shots': [
                {'src': 'Code/yingxiang/index.webp', 'alt': '课件目录：影像与声音两组课程卡片', 'wide': True,
                 'zh': '课程目录。每张卡片上的线稿都对应这一课要拆开的那件东西。', 'en': 'The course index.'},
                {'src': 'Code/yingxiang/shutter.webp', 'alt': '快门与运动模糊：左边是真实世界的跑步者和风车，右边是 1/60 秒拍下的照片',
                 'zh': '快门：左边是真实世界，右边是 1/60 秒拍下的照片。快门开得越久，跑步的人拖得越长。', 'en': 'Shutter speed and motion blur.'},
                {'src': 'Code/yingxiang/frame-rate.webp', 'alt': '帧率与时间：真实的运动和每秒 2 格拍下的画面并排',
                 'zh': '帧率：把每秒 2 格慢慢拉到 24 格，看画面在哪一刻“活”过来。', 'en': 'Frame rate: when do still frames start to move?'},
                {'src': 'Code/yingxiang/shot-size.webp', 'alt': '景别与焦距：取景器里的人物全景，右边标出画面切在哪里',
                 'zh': '景别：同一个人，远景、全景、近景、特写，每一种景别在告诉观众什么。', 'en': 'Shot sizes and what each one says.'},
                {'src': 'Code/yingxiang/composition.webp', 'alt': '构图与机位：三分法网格下拖动人物和地平线',
                 'zh': '构图：拖人物、拖地平线。三分法是起点，不是法律。', 'en': 'Composition: the rule of thirds is a start, not a law.'},
                {'src': 'Code/yingxiang/pixels.webp', 'alt': '像素与分辨率：一束光从公园走进相机、传感器、数据、屏幕和眼睛', 'wide': True,
                 'zh': '像素：跟着一束光从公园走进镜头、传感器、数据、屏幕，最后进到眼睛。', 'en': 'Pixels: follow one beam of light from the park to your eye.'},
                {'src': 'Code/yingxiang/microphone.webp', 'alt': '传声器剖面：动圈麦克风的 11 个部件逐一标注',
                 'zh': '传声器：五种麦克风，剖开来一个部件一个部件地看。', 'en': 'Inside five kinds of microphone.'},
                {'src': 'Code/yingxiang/levels.webp', 'alt': '电平、增益与削波：波形和电平表，0 dBFS 是天花板',
                 'zh': '电平：0 dBFS 是天花板。声音全部在浏览器里合成，也可以接上自己的麦克风。', 'en': 'Levels: 0 dBFS is the ceiling.'},
                {'src': 'Code/yingxiang/room-sound.webp', 'alt': '距离与房间声：话筒离声源越远，声音越小的曲线',
                 'zh': '房间声：话筒离远一倍，少 6 分贝；房间的回声却一点没少。', 'en': 'Distance and room sound.'},
            ]},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
        {'id': 'tech', 'zh': '怎么做的', 'en': 'How it is built', 'blocks': [
            {'type': 'tech', 'html': '每一课是一个独立的 HTML 文件，样式、脚本、模型都在里面，放到任何服务器上都能打开。3D 场景用 three.js，声音全部用 Web Audio 实时合成，不放录音文件。课件用自然语言和 AI 一起写成，我负责讲什么、先讲什么、学生会在哪里卡住；每一课都先在课上用过，再根据学生的反应改。'},
        ]},
    ],
})


PROJECTS.append({
    'slug': 'gongdu',
    'group': 'classroom',
    'zh': '共读',
    'en': 'Read Together',
    'meta': '2026 · 每日阅读打卡 · 两个班在用',
    'card': {'src': 'Code/gongdu/profile.webp', 'alt': '共读个人页：称号、近 14 天阅读小点，在读和读完两排书卡'},
    'card_desc': '给学生的每日阅读打卡。读了几分钟、读到哪里，再摘一句打动你的话、写一句想法，这一天才算读过。同学之间能看见彼此在读什么，也能在摘句下面回一句。',
    'card_note': '一天算不算读过，看的是你摘下的那一句，而不是你计了多少分钟。',
    'lede': '这学期我在两个班里做一个实验：让平时不怎么读书的大学生，每天读一点。共读是那个每天打开的地方：记下读了多久、读到哪里，摘一句话，写一句自己的想法。全班都能看到谁今天读了、在读什么书、摘了哪一句。',
    'lede_en': 'An experiment this term: getting university students who rarely read to read a little every day. Each day counts once you save a line and a thought, and the class can see what everyone is reading.',
    'links': [{'label': '共读入口', 'url': 'https://123.57.56.38:627/'},
              {'label': 'Obsidian 插件（开源）', 'url': 'https://github.com/Muscliffe64/gongdu-obsidian', 'quiet': True}],
    'link_note': '共读需要课上发的账号；插件代码公开。',
    'hero': {'src': 'Code/gongdu/class.webp', 'alt': '共读班级页：同学刚摘的句子、今天谁读了谁还没读、近 14 天阅读天数排名'},
    'facts': [
        ('用的人', '两个班的学生，和我自己'),
        ('一天算读过', '分钟 + 读到哪里 + 至少一句摘录'),
        ('设备', '大多在手机微信里打开'),
        ('做法', 'Node 标准库 + SQLite，无第三方依赖'),
    ],
    'sections': [
        {'id': 'what', 'zh': '它怎么用', 'en': 'How it works', 'blocks': [
            {'type': 'steps', 'items': [
                ('开始计时', '在读的那本书就是首页上的一张卡片，点一下开始计时。'),
                ('摘一句', '把打动你的那句话贴进来，写一句自己的想法。一天可以摘很多句。'),
                ('写读到哪里', '一个框，填阅读器上显示的什么都行：45%、123/456、第 88 页。'),
                ('看看同学', '班级页上是大家刚摘的句子。可以点赞，也可以回一句。'),
            ]},
        ]},
        {'id': 'gallery', 'zh': '长什么样', 'en': 'What it looks like', 'blocks': [
            {'type': 'gallery', 'phones': True, 'shots': [
                {'src': 'Code/gongdu/today.webp', 'alt': '手机首页：正在读的书卡，开始计时、摘一句、打卡', 'phone': True,
                 'zh': '手机首页：在读的书就是一张卡片，计时、摘句、打卡都在上面。', 'en': 'Phone home: the book you are reading is one card.'},
                {'src': 'Code/gongdu/excerpt.webp', 'alt': '摘一句：粘贴句子、出处和想法', 'phone': True,
                 'zh': '摘一句：一个大框贴句子，出处沿用上一句，想法可以多写几句。', 'en': 'Save a line, and a thought.'},
            ]},
            {'type': 'gallery', 'shots': [
                {'src': 'Code/gongdu/profile.webp', 'alt': '个人页：在读和读完两排书卡',
                 'zh': '个人页：书比数字重要。一本书一张卡，在读、读完两排，像挑电影一样横着滑。', 'en': 'Profile: books come before numbers.'},
                {'src': 'Code/gongdu/replies.webp', 'alt': '一条摘录下面的想法、点赞和回复',
                 'zh': '一句摘录下面，是同学和我的回复。回复只有一层，不计分。', 'en': 'Replies under an excerpt: one level, never scored.'},
                {'src': 'Code/gongdu/achievements.webp', 'alt': '全部成就：七级称号和快到了的成就',
                 'zh': '成就：从“初读”到“万卷”七级称号。拿到了就一直留着，没有“夜读”成就，不鼓励熬夜。', 'en': 'Achievements, from 初读 to 万卷. No reward for reading late at night.'},
                {'src': 'Code/gongdu/admin.webp', 'alt': '老师端班级总览',
                 'zh': '老师这边：今天读了几个人，谁需要留意一下。', 'en': 'The teacher view.'},
                {'src': 'Code/gongdu/home-desktop.webp', 'alt': '电脑首页：打卡后看到谁赞了、谁回复了', 'wide': True,
                 'zh': '电脑上的首页：打完卡，能看到谁赞了你、谁回了你，右边是全班今天的阅读。', 'en': 'Desktop home after checking in.'},
            ]},
            {'type': 'prose', 'html': '<p class="en">截图里是演示数据，名字都是编的。 Screenshots use demo data with made-up names.</p>'},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
        {'id': 'rules', 'zh': '几条刻意的规则', 'en': 'Rules on purpose', 'blocks': [
            {'type': 'prose', 'html': '''<ul>
<li><b>没有摘句，不算读过。</b>只记分钟太容易糊弄，也太容易变成任务。摘下一句话，说明你真的停在某一页上了。</li>
<li><b>排名是故意留着的。</b>按“近 14 天读了几天”排，不按累计分数排：分数只涨不跌，早开始的人会永远在前面；14 天的窗口让每个人随时都能追上来。被同学看见“他最近一直在读书”，是一件好事。</li>
<li><b>我也在里面读。</b>我出现在每个班的名单里，和学生一样打卡、被点赞，不算排名。</li>
<li><b>不能补卡。</b>过去的日子不能补、不能改，今天的可以改。</li>
<li><b>不止一个入口。</b>除了网页，还可以用 Obsidian 插件从电子书阅读器里一键打卡，或者让自己的 AI 助手替你提交。</li>
</ul>'''},
        ]},
        {'id': 'tech', 'zh': '怎么做的', 'en': 'How it is built', 'blocks': [
            {'type': 'tech', 'html': '后端只用 Node 自带的标准库和 SQLite，前端是不需要构建的原生 HTML 和 JavaScript，校园网加载不了网络字体，所以只用系统字体。界面先在 Claude Design 里画了 23 张图，再照着做出来。研究用的数据只导出同意参与的同学，名字换成编号。'},
        ]},
    ],
})


PROJECTS.append({
    'slug': 'cigen',
    'group': 'classroom',
    'zh': '词根学习平台',
    'en': 'Root Words',
    'meta': '2026 · 课后练习 · 35 名学生在用',
    'card': {'src': 'Code/cigen.webp', 'alt': '词根学习平台手机界面：uni- 前缀卡片，附有课上的类比和例词', 'phone': True},
    'card_desc': '音视频技术专业英语的课后练习。每天复习到期的词根，再学几个新的；每张卡片都附着“课上”那一刻：老师怎么类比的，同学们怎么猜出来的。',
    'card_note': '卡片上写的不只是释义，还有课堂上发生过的事。学生记住的往往是那个瞬间。',
    'lede': '《音视频技术专业英语》的课后练习。课上讲一个词根，课后它就进了每个人的复习队列：今天该复习的先做，再学几个新的，每天十到十五分钟。每张卡片背面写着“课上”那一刻，比如学了 uni- 之后，大家现场猜出了 unisex 和 unicycle。',
    'lede_en': 'After-class practice for my English for Audio & Video Technology course. Each card carries a note of the moment in class when the root was taught.',
    'links': [{'label': '平台入口', 'url': 'https://123.57.56.38:622/'}],
    'link_note': '需要课上发的账号。',
    'hero': {'src': 'Code/cigen/new1.webp', 'alt': '新学卡片 uni-：来源、课上那一刻和例词', 'phone': True},
    'facts': [
        ('课程', '音视频技术专业英语'),
        ('用的人', '一个教学班，35 名学生'),
        ('每天', '复习到期的卡片，再学 8 个新的，约 10–15 分钟'),
        ('排期', 'FSRS 间隔重复算法'),
    ],
    'sections': [
        {'id': 'gallery', 'zh': '长什么样', 'en': 'What it looks like', 'blocks': [
            {'type': 'gallery', 'phones': True, 'shots': [
                {'src': 'Code/cigen/home.webp', 'alt': '今日页：今日复习、今日新学和坚持榜', 'phone': True,
                 'zh': '今日：先复习到期的，再学新的。坚持榜按完成天数排。', 'en': 'Today: review first, then new cards.'},
                {'src': 'Code/cigen/new1.webp', 'alt': '新学卡片 uni-，带“课上”语境', 'phone': True,
                 'zh': '新学卡片。红框里是“课上”：老师用汉字偏旁类比构词法，大家猜出了 unisex。', 'en': 'A new card with the classroom moment.'},
                {'src': 'Code/cigen/library.webp', 'alt': '词库：按讲次排列的词根词缀', 'phone': True,
                 'zh': '词库按讲次排列，每一讲用上课日期标记。', 'en': 'The library, by lecture.'},
                {'src': 'Code/cigen/graph.webp', 'alt': '词根网络：每张卡片是一个词根家族和自己的进度', 'phone': True,
                 'zh': '词根网络：从课上讲过的词根出发，往四六级、考研和学术词表里延伸。', 'en': 'Root families reaching into the word lists.'},
            ]},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
        {'id': 'design', 'zh': '几个设计', 'en': 'Design choices', 'blocks': [
            {'type': 'prose', 'html': '''<ul>
<li><b>课上那一刻写在卡片上。</b>iPhone 的 Duo、U87 麦克风的 bi-directional、Cmd+Shift+Z，这些课上埋下的线索是记忆的钩子。</li>
<li><b>考的是方法，不只是单词。</b>穿插“迁移题”：用课上没讲过的派生词让学生猜意思，看拆词的方法学会了没有。</li>
<li><b>缺课了也能追上。</b>几周没上线，回来按每天的上限慢慢补，不会一下子把积压的新词全砸过来。</li>
<li><b>不卡通。</b>形式借鉴了给积木做的单词积木，但面向大学生重做：去掉卡通，留下那套学习逻辑。</li>
</ul>'''},
        ]},
        {'id': 'tech', 'zh': '怎么做的', 'en': 'How it is built', 'blocks': [
            {'type': 'tech', 'html': '没有第三方依赖：Node 内置的 SQLite 加原生 ES module，不需要构建。排期直接复用给积木做的 FSRS 代码，答题结果分三档：独立答对、看提示答对、答错。对错由服务器判，作答记录只追加不修改，为以后做研究留下干净的数据。'},
        ]},
    ],
})


PROJECTS.append({
    'slug': 'course-square',
    'group': 'classroom',
    'zh': '课程广场',
    'en': 'Course Square',
    'meta': '2026 · 人工智能导论 · 班级社区',
    'card': {'src': 'Code/course-square.webp', 'alt': '课程广场首页：左侧栏目，中间是同学分享，右侧是“想听热榜”投票'},
    'card_desc': '一门课的班级社区。同学可以匿名提问、分享作品，也可以给“下节课想听什么”投票，票数第一的话题下节课一定讲。',
    'card_note': '让学生决定一部分课讲什么。',
    'lede': '《人工智能导论》的班级社区，八十个学生。三个栏目：下节课想听什么、作品与分享、课程资料。首页一行就能发帖；勾上“只给老师看”，就是一张实名的课后小票。给想听的话题点赞就是投票，票数最高的那一条，下节课一定讲。',
    'lede_en': 'A class community for Introduction to AI, with 80 students. Students vote on what the next class should cover, and the top topic always gets taught.',
    'links': [{'label': '课程广场入口', 'url': 'https://123.57.56.38/'}],
    'link_note': '需要课上发的账号。',
    'hero': {'src': 'Code/course-square.webp', 'alt': '课程广场首页：左侧栏目，中间是同学分享，右侧是“想听热榜”投票'},
    'facts': [
        ('课程', '人工智能导论'),
        ('用的人', '80 名学生'),
        ('栏目', '下节课想听什么 · 作品与分享 · 课程资料'),
        ('做法', 'Django 5.2，126 项测试'),
    ],
    'sections': [
        {'id': 'what', 'zh': '它怎么用', 'en': 'How it works', 'blocks': [
            {'type': 'steps', 'items': [
                ('提一个问题', '可以匿名。匿名只对同学隐藏，老师能看到，发帖时写得清清楚楚。'),
                ('投票', '给想听的话题点赞。开课前的票算这一讲，开课后转向下一讲。'),
                ('排进第 N 讲', '我把问题排进某一讲，提问的同学会收到通知；讲完自动变成“✓ 第 3 讲讲过”。'),
                ('不漏掉一条', '“待回应”页列出我还没回的帖子和留言，有新的会推到我手机上。'),
            ]},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
    ],
})


PROJECTS.append({
    'slug': 'qinling',
    'group': 'classroom',
    'zh': '秦岭声景地图',
    'en': 'Qinling Soundscape',
    'meta': '2026 · 团队项目 · 进行中',
    'card': {'src': 'Code/qinling.webp', 'alt': '秦岭声景地图：地图上标着录音点，左侧是 48 个点位、47 段录音的概览'},
    'card_desc': '我们在秦岭录下的森林声音，一个个标在地图上。原始录音、加工过的声音、用它们做成的音乐连成一棵“来龙去脉”的树。',
    'card_note': '每一件作品，都能找回它出自哪一段录音。',
    'lede': '我们在秦岭山里录下的声音，一个个钉在地图上：天子峪的树林、抱龙峪的瀑布、山脊上的风。原始录音被加工成新的声音，再被做成音乐，音乐又长出新的回响：再创作、配乐、舞蹈、文字。每一件作品都能顺着线找回它出自哪一段录音。',
    'lede_en': 'Forest sounds our team recorded in the Qinling mountains, pinned on a map. Raw recordings become processed sounds, then music, then new echoes, and every piece can be traced back to where it came from.',
    'links': [{'label': '打开声景地图', 'url': 'https://123.57.56.38:623/qinling/'}],
    'link_note': '公开页面，可以直接听；上传录音需要成员账号。',
    'hero': {'src': 'Code/qinling/map.webp', 'alt': '秦岭声景地图首页：地图上的采样点和左侧的概览'},
    'facts': [
        ('团队', '我和学生们'),
        ('目前', '48 个采样点 · 47 段录音 · 11 件作品与回响'),
        ('四层', '素材 → 处理 → 音乐 → 回响'),
        ('做法', 'FastAPI + SQLite + Leaflet，高德底图'),
    ],
    'sections': [
        {'id': 'gallery', 'zh': '长什么样', 'en': 'What it looks like', 'blocks': [
            {'type': 'gallery', 'shots': [
                {'src': 'Code/qinling/tree.webp', 'alt': '来龙去脉：一件再创作作品由三个来源汇成，追溯到三个采样点', 'wide': True,
                 'zh': '来龙去脉：《滩&Mist》由三个来源汇成，一直追溯到三处采样点。点任何一个节点，都能听。', 'en': 'Lineage: one piece traced back through three sources to three recording sites.'},
                {'src': 'Code/qinling/music.webp', 'alt': '音乐页：作品卡片，标着来自几个地点、有没有回响',
                 'zh': '从山林到音乐：每件作品都标着它来自哪里，长出了什么。', 'en': 'From forest to music.'},
                {'src': 'Code/qinling/lineage.webp', 'alt': '来龙去脉列表：每条脉络一张卡片',
                 'zh': '十一条脉络，每条一张卡片。', 'en': 'Eleven lineages.'},
            ]},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
        {'id': 'tech', 'zh': '怎么做的', 'en': 'How it is built', 'blocks': [
            {'type': 'tech', 'html': '成员在山里用手机直接上传录音、照片和现场笔记，自动带上位置。国内访问不了海外的地图和脚本，所以换成高德底图，地图库也放在自己的服务器上。我们还在试着给每件作品做数字存证，让“它出自哪一段录音”不只是网页上的一条线。'},
        ]},
    ],
})


# ------------------------------------------------------------------ 为什么做
# 引文来自我的语音日记和讲座录音（11 月 18 日教师发展中心沙龙“专业标签之外”），只做了去口头禅的删减。

def P(*paras):
    return {'type': 'prose', 'html': '\n'.join(f'<p>{p}</p>' for p in paras)}


def Q(text, cite):
    return {'type': 'quote', 'text': text, 'cite': cite}


WHY = {
    'yingxiang': [
        P('这一届大一新生，学校没有再要求他们买相机。相机太贵了，一个班大概只有三四个人有。可光圈、景深、快门这些东西，光靠讲是讲不明白的；就算拿着相机去拍，也不是每个人都有大光圈镜头，拍完再导进电脑里看，一节课就过去了。',
          '所以我干脆把相机搬到了网页上。第一个试的是光圈，做出来一看效果特别好，就把教案里的内容一课一课都做成了这样的交互课件。后来上专业英语课，学生说想“看得见”话筒里面是怎么工作的，一周之内，五种话筒的剖面图就有了。'),
        Q('我之前有尝试去讲光圈，讲光圈带来的影响和景深的影响，都不够直观。……所以我就直接在这个页面上展示。这里面还有一个挑战环节，就是让他们自己对着这个画面，把这样的一个状态给调出来。这个班现在大概只有三四个人有相机，我觉得在没有相机的情况下，这已经是很棒的一种呈现了。', '语音日记 · 2026.10.19'),
        P('有一次课上，一个学生问我，AI 提示词里写的“35 毫米”是什么意思。那一刻我意识到，AI 时代的影像创作，仍然吃基本功。把这些基本功讲清楚，是我的责任。'),
    ],
    'gongdu': [
        P('我越来越相信，用好 AI 最重要的能力是语言能力，而训练语言最重要的办法就是阅读。可是你跟学生说“请大家去读书”，几乎没有人会去读。我问过很多同学大学四年读了几本书，很多人一本都没读过。',
          '我不怪他们。短视频一打开就很难停下来，注意力被切得越来越碎。想让他们读书，就需要一点外力，而且这个外力要做得很巧。'),
        Q('我觉得读书这件事情其实有时候是需要一个氛围的，就如果你身边的人都在读，那你肯定也在读。……这是大家的隐私，每天读了多长时间，我们要不要放出来？但是我觉得在现阶段，我选择了稍微野蛮一点。也许你今天并不想读，但是看见有人读了，那你也会去读。', '“专业标签之外”沙龙 · 2026.11.18'),
        P('为什么一定要摘一句、写一句想法？因为你觉得一段话好，一定有你的理由。把那个理由写下来，读书才真的发生在你身上。',
          '第一版上线之后，有天晚上我自己注册成学生用了一次，直接崩溃，受不了。那天夜里我把它从设计到后台整个重做了一遍，现在你看到的是第二版。'),
        Q('读书这件事情对他们来说，我觉得比对我的意义可能还要大。我至少现在能意识到读书很重要，但我觉得他们很多人还意识不到，所以我设计了这样一种 push 机制。', '语音日记 · 2026.11.16'),
    ],
    'cigen': [
        P('词根词缀是我自己学英语的一个巨大转折。以前背单词很痛苦，学会构词法之后，单词变成了一块块可以拼起来的积木。暑假我先给儿子积木做了一套背单词的系统，九月开学，把它搬进了我的《音视频技术专业英语》。',
          '这门课本来是讲音视频的专业词汇。但今天单纯讲一张术语表已经没什么价值了，所以我把它改成了每周精读科技和音视频领域真实发生的新闻、新设备、新技术，再把里面的词按构词法拆开。每节课我用一个小话筒录下来，让 AI 把我讲过的词全部挑出来，按词源拆开，补上例句，加进词库。所以每张卡片背面，都是这节课上真实发生过的事。'),
        Q('我说好歹这个课，你最后结束的时候，你能多记几个词根，你的词汇量能稍微涨上那么五六十个，也比水玩一学期强一点吧，对吧，我觉得这是我能做的。', '“专业标签之外”沙龙 · 2026.11.18'),
        P('这不是我给 35 个人备 35 套课，而是每个人带着同一节课，走自己的路。每个人的每个词都记着两个数：记得多牢、对你多难。答对了，下次隔久一点；答错了，很快再出，在你快要忘、还没忘的那天复习。',
          '有一次服务器的硬盘满了，网站打不开，好几个同学给我发消息，说想背单词背不了了。那是我觉得这件事做对了的时刻。'),
    ],
    'course-square': [
        P('《人工智能导论》是全校公选课，八十个学生来自各个专业，谁都不认识谁，建个微信群也不会有人说话。所以我在备第一节课的时候，花不到两个小时搭了这个广场：可以匿名说话，也有一个板块专门让大家写自己想听什么。我每周去看大家想听什么，再去找相关的内容来讲。',
          '一对八十的课怎么做到个性化？我的回答之一是：每一讲的内容都整理好放上来，学生可以下载下来，交给自己的 AI，说“今天老师讲的这一段我没听懂，用初中生能理解的方式再给我讲一遍”。'),
        Q('这个广场的内容理论上来说，你可以复刻到任何一门课里头，所以其实这是大家共同可以去创作的。……你可以把你 GitHub 的用户名粘贴到这个课程广场上，我到时候把你加进去，然后我们可以一同开发这个平台。', '人工智能导论课堂录音 · 2026.09.20'),
        P('有个学生写了一份很认真的体验报告给我：一打开就是空白编辑框，学生不知道写什么，懒得开始；点了赞也没有反馈。这两点提得特别好，因为他就是这个用户。后来首页改成了一行就能发帖。',
          '它还没解决的难题，我也想写在这里：绝大多数同学的学习主动性，和 AI 结合得还不是很好。'),
    ],
    'qinling': [
        P('一开始我们只是想去秦岭采些素材，做一个声景。我对声景的理解，很大程度来自谷歌地球的街景。可街景里是没有声音的。秦岭作为一个地方，完全可以从声音这一层被记录下来。',
          '所以出发前我们定了一个规矩：开始录音时，先说清楚时间、地点、现在大概有什么声音，再用手机拍一张照片。这样以后每段录音都能自动转写、归类、打标签，照片还带着时间和 GPS。'),
        Q('你想，以前如果几个学艺术的、学音乐的，想要搭这样一个平台做这样一件事情，我觉得几乎是不可能的。……聊天、碰撞彼此的认知、连接彼此的想法，最终出来这样一个内容。我现在很确定地说，这就是未来的一种创作模式，尤其是团队合作的创作模式。', '语音日记 · 2026.09.11'),
        P('第一次从山里回来，我们在咖啡馆里聊。我把整段对话录下来交给 AI，不到半小时，第一版地图就上线了，每个成员都成了项目的共同维护者。',
          '我不会写歌，也不会作曲，但我很会拍照片。有一次我把一张雾里的树林照片交给一位音乐家，请他看完随手在键盘上弹一段；那段旋律后来又被重新创作，最后用进了我在挪威森林里拍的纪录片。也许是一张照片，也许是一段声音，让一个普通人也走进了创作。“来龙去脉”这棵树，就是为了把这些启发一条条留下来。'),
    ],
}


# ------------------------------------------------------------------ 给积木

PROJECTS.append({
    'slug': 'olive-words',
    'group': 'jim',
    'zh': 'Olive Words',
    'en': 'Word homework for Olive’s class',
    'meta': '2026 · iPad · 英语单词作业 · 一个英语班在用',
    'card': {'src': 'Code/olive/learn.webp', 'alt': 'Olive Words 单词卡 midnight：插图、音标、发音按钮，右边把 mid 和 night 拆开'},
    'card_desc': '积木英语班的单词作业。Olive 老师每周布置要背的词，孩子们在自己的 iPad 上看图、听音、拆词、拼写，还能用学过的词让 AI 写一个只属于自己的小故事。',
    'card_note': '落下了不用设置什么，系统自己把后面几天变大一点，让孩子追得上。',
    'lede': '积木每周六上 Olive 老师的英语课，以前的单词作业是拍照片上传。我想让孩子们直接在 iPad 上背：Olive 在她那一端给全班布置每周的单词，孩子们看图、听发音、把单词拆成几块、凭记忆拼出来；谁卡在哪个词上，Olive 一眼就能看到。',
    'lede_en': 'Weekly vocabulary homework for my son’s English class. The teacher assigns the words; children learn them on their own iPads with pictures, sounds, word parts and spelling from memory.',
    'links': [{'label': 'Olive Words 入口', 'url': 'https://123.57.56.38:625/'}],
    'link_note': '孩子用班级码和四位 PIN 登录，需要老师开通。',
    'hero': {'src': 'Code/olive/home.webp', 'alt': '学生首页：本周任务“Telling the time”，进度 60%，快速复习和学习步骤'},
    'facts': [
        ('用的人', 'Olive 老师的英语班，孩子们和家长'),
        ('设备', 'iPad 优先，大字、大按钮，每屏一件事'),
        ('每周', '学、练、记忆检查、故事检查'),
        ('做法', 'Vue 3 + FastAPI + SQLite，字体和图标全部自己托管'),
    ],
    'sections': [
        {'id': 'gallery', 'zh': '长什么样', 'en': 'What it looks like', 'blocks': [
            {'type': 'gallery', 'shots': [
                {'src': 'Code/olive/learn.webp', 'alt': '单词卡 midnight：插图、音标、慢速朗读，mid + night 拆开，连出同族词',
                 'zh': '学：一张卡一个词。图、英式音标、慢速朗读，再把 midnight 拆成 mid 和 night，顺手认识 midday、midweek。', 'en': 'Learn: picture, sound, and the word taken apart.'},
                {'src': 'Code/olive/memory.webp', 'alt': '记忆检查：看图和英文释义，凭记忆拼写 breakfast',
                 'zh': '记忆检查：只给图和英文释义，不给声音，不给字母格子，凭记忆拼出来。', 'en': 'Memory check: spell it with no hints.'},
                {'src': 'Code/olive/story.webp', 'alt': '我的故事：从学过的词里挑几个，再选一个故事世界',
                 'zh': '我的故事：从学过的词里挑几个，选一个故事世界，AI 用这些词写一个只给你的小故事。', 'en': 'My Story: pick your words, choose a world.'},
                {'src': 'Code/olive/trophies.webp', 'alt': '我的奖杯：等级小树、经验值规则和勋章',
                 'zh': '奖杯：等级是一棵慢慢长大的树。同学之间只能看到等级和勋章，看不到分数，没有排行榜。', 'en': 'Levels and medals, never a leaderboard.'},
                {'src': 'Code/olive/teacher.webp', 'alt': '老师端本周期：每个孩子的进度、时长和最薄弱的词',
                 'zh': 'Olive 这边：谁完成了，谁四天没来了，每个孩子最难的是哪个词。', 'en': 'Olive’s view of the week.'},
                {'src': 'Code/olive/wordbank.webp', 'alt': '老师端词库：逐条审核插图、释义、例句',
                 'zh': '词库：AI 画的图、写的释义和例句，都要 Olive 点过“批准”孩子才看得到。', 'en': 'Nothing AI-made reaches a child before the teacher approves it.'},
            ]},
            {'type': 'prose', 'html': '<p class="en">截图里是演示数据，名字都是编的。 Screenshots use demo data with made-up names.</p>'},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
        {'id': 'rules', 'zh': '几条刻意的规则', 'en': 'Rules on purpose', 'blocks': [
            {'type': 'prose', 'html': '''<ul>
<li><b>用规则代替设置。</b>有位家长说孩子一周最多只有两天能练。我没有加一个“每周练几天”的设置，而是让系统自己判断：落后了，当天多练的几轮可以补上前面的天数，一天最多补三轮。家长和老师什么都不用调。</li>
<li><b>没有排行榜。</b>我犹豫过要不要给孩子们排名，最后没有做。同学之间能看到等级和勋章，看不到分数和薄弱词；在 iPad 上待多久也不加经验值。</li>
<li><b>AI 写的东西先给老师看。</b>插图、释义、拆词都要老师批准。唯一的例外是孩子自己的故事：马上给孩子看，只有他自己和老师能看到。</li>
<li><b>名字检查宁可放过，不可错拦。</b>故事里如果明确出现了班上同学的真名才拦下；拿不准的时候就让孩子看到。对孩子来说，错拦一个好故事比放过一个可疑的词更伤人。</li>
<li><b>尽量少收集孩子的信息。</b>只存名字和一个小动物头像，家长同意之前孩子登不进来。</li>
</ul>'''},
        ]},
    ],
})

WHY['olive-words'] = [
    P('暑假我给积木做过一套背单词的小工具，用词根词缀把单词拆成一块块积木。开学后他再打开 Olive 布置的单词，跟我说：“今天 Olive 背的单词好简单。”',
      '十月跟 Olive 聊天，我发现班上背单词这件事需要认真提上议程：作业是拍照上传的，老师很难知道谁真的记住了。我手里已经有两个背单词的产品，于是想给积木和他的同学们，也包括 Olive 其他班的孩子，做一个这样的东西。'),
    Q('Olive 可以在她那一端管理所有的同学，并直接给他们分配每周要背的单词。……之前是拍照片上传，我觉得不好……让大家直接在线上背。每个人用自己的 iPad 登录服务器就能直接看，Olive 也可以实时监督。', '语音日记 · 2026.10.17'),
    P('积木很喜欢游戏带来的那种正反馈，我就把它设计进了背单词里：等级、勋章、经验值，还有用自己学过的词写成的故事。对这个年纪的孩子，压力不能太大，但要让他们一直有往前走的劲儿。',
      '当然，积木对这件事的评价也很诚实：“背这个单词可比看短视频恐怖多了。”'),
]


PROJECTS.insert(next(i for i, p in enumerate(PROJECTS) if p['slug'] == 'olive-words'), {
    'slug': 'jiangtong',
    'group': 'jim',
    'zh': '积木讲通',
    'en': 'Explain It',
    'meta': '2026 · iPad · 数学与哲学 · 积木一个人用',
    'card': {'src': 'Code/jiangtong.webp', 'alt': '积木讲通 iPad 界面：今晚建议的哲学话题“同一性：换掉所有积木，还是原来那座作品吗”'},
    'card_desc': '看懂、练几题，再用自己的话把道理讲给 AI 小伙伴“铁蛋”听。比如：一艘积木船的每一块都换过了，它还是原来那艘船吗？',
    'card_note': '积木的推理常常比题目更深，却被判“没通过”。所以我把“过 / 不过”改成了一级一级往上走。',
    'lede': '给儿子积木的 iPad 学习工具，每天晚上二三十分钟数学，十五分钟以上哲学。每一块知识都走三步：看懂它、练几题、讲清楚。最后一步不是 AI 讲给他听，而是他讲给 AI 听：铁蛋是一个有点憨、又特别爱追问“为什么呀”的机器人同学，只有被讲明白了才会点头。',
    'lede_en': 'An iPad tool for my son: understand it, practise it, then explain it in his own words to 铁蛋, an AI classmate who keeps asking why.',
    'links': [],
    'link_note': '这是只给积木一个人用的工具，没有公开入口。',
    'hero': {'src': 'Code/jiangtong/explain.webp', 'alt': '讲清楚：积木用自己的话解释四分之三，铁蛋追问；右边是要点进度和分饼的教具'},
    'facts': [
        ('用的人', '积木一个人，四年级'),
        ('每天', '数学 20–30 分钟，哲学至少 15 分钟'),
        ('三步', '看懂它 → 练几题 → 讲清楚'),
        ('AI', '铁蛋负责追问，另一个模型判断要点讲到没有'),
    ],
    'sections': [
        {'id': 'what', 'zh': '一块知识怎么走', 'en': 'How one card goes', 'blocks': [
            {'type': 'steps', 'items': [
                ('看懂它', '先动手：把一个饼平均分成四份，涂上三份，写下你注意到了什么。'),
                ('练几题', '四道小题，代码判对错，不麻烦 AI。'),
                ('讲清楚', '用自己的话讲给铁蛋听。右边列着这一块要讲到的几个要点，讲到一个亮一个。'),
                ('过几天再讲一次', '讲通了先记“讲通”，三天后不看图再讲顺一次，才算“稳了”。不会因为哪天没讲好就降级。'),
            ]},
        ]},
        {'id': 'gallery', 'zh': '长什么样', 'en': 'What it looks like', 'blocks': [
            {'type': 'gallery', 'shots': [
                {'src': 'Code/jiangtong/home.webp', 'alt': '首页：今晚建议的数学知识点和三步，下面是所有知识点的进度',
                 'zh': '首页：今晚建议学哪一块，还剩多少时间。每一块知识是一张卡，讲通、稳了一目了然。', 'en': 'Tonight’s suggestion and the map of cards.'},
                {'src': 'Code/jiangtong/look.webp', 'alt': '看懂它：分饼教具，四份涂了三份，写下注意到了什么',
                 'zh': '看懂它：先摆一摆、涂一涂，再写下“你注意到了什么”。', 'en': 'Look: play first, then say what you noticed.'},
                {'src': 'Code/jiangtong/philosophy.webp', 'alt': '哲学：忒修斯之船，讲给铁蛋听哪一艘才是原来的船',
                 'zh': '哲学：一艘船一直被修，旧积木又拼成了另一艘，哪一艘才是原来的船？铁蛋追问：按对方的标准，那艘为什么也说得通？', 'en': 'Philosophy: the ship of Theseus, built from blocks.'},
                {'src': 'Code/jiangtong/end.webp', 'alt': '结束页：你能自己讲清楚了，四个要点都讲到，以及讲得最好的一句',
                 'zh': '结束页不打分，只写这次讲到了什么、还卡在哪，再挑出“你讲得最好的一句”。', 'en': 'The end page: what you got, and your best sentence.'},
                {'src': 'Code/jiangtong/drill.webp', 'alt': '数学热身：12 条线各自升降级',
                 'zh': '数学热身：12 条线，各自按他的表现升降。做完可以挑战高一级，做错不降级。', 'en': 'An adaptive warm-up.'},
                {'src': 'Code/jiangtong/parent.webp', 'alt': '家长页：每条线在练第几级、本周做了几题',
                 'zh': '家长页：我在这里看他每条线练到第几级，也在这里改规矩。', 'en': 'The parent page.'},
            ]},
            {'type': 'prose', 'html': '<p class="en">截图来自本机演示：回答是我们输入的示例，铁蛋用的是不联网的模拟模式。 Screenshots are a local demo with sample answers and a simulated 铁蛋.</p>'},
        ]},
        {'id': 'why', 'zh': '为什么做', 'en': 'Why I made it', 'blocks': []},
        {'id': 'levels', 'zh': '从“过 / 不过”到一级一级', 'en': 'Levels, not pass or fail', 'blocks': [
            P('第一版上线后，我把积木的记录导出来看：二十多次讲解，一半以上被判“没通过”。可一条条读下去，他其实讲得很好，常常比卡片上要求的更深，只是没有按标准答案的路子走。他自己也抱怨，铁蛋有点傻，总揪着一些他听不懂的地方不放。',
              '于是我把“过 / 不过”拆掉了。讲通之后不再降级，第一次就讲得很顺的直接记“稳了”，练过的题不再重复；铁蛋说的每一句固定话，都要经过几道代码检查，不许它编造“你已经说对了几点”，也不许它跑题。'),
        ]},
    ],
})

WHY['jiangtong'] = [
    P('这些年当老师，对我帮助最大的一件事是：备课就是先学，再一遍遍重复，最后讲出来。讲给别人听的时候，才会发现“哦，有一个点我其实没想明白”。',
      '十月初积木学勾股定理，我意识到他是真懂了，因为他能给我讲明白。后来他还要给小伙伴讲 Scratch 里两个角色之间的距离怎么算，自己写了一段提示词，请 AI“扮演一个非常有经验的小学老师”陪他备课。上场前他说：“哇，我第一次当老师，我有点紧张呀。”'),
    Q('我突然意识到，之前给积木设计的数学练习只停留在了练习阶段，没有走向“要把这个东西讲明白”。……就是需要让他给 AI 讲明白，而不是单纯地只让 AI 给他讲。', '语音日记 · 2026.10.24'),
    P('铁蛋最早出现在暑假的“哲学实验室”里，是一个隐藏模式，叫“教教铁蛋”：AI 扮演一个自信又有点憨的机器人学生，积木从答题的人变成教它的老师。你直接把答案灌给它，它会一直问“为什么呀”；只有被好问题启发，它才会真的进步。',
      '我这学期一直跟学生讲，AI 应该是脚手架，不是外包大脑。给积木也一样：错了先给开头不给答案，铁蛋从来不说“你这个想法不对”。工具本身不重要，重要的是能不能让他自己往前多想一步。'),
]

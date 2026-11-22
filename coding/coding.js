// 项目详情页：点截图放大；“在这里试一试”点了才加载课件，避免一打开页面就下载几十 KB 的课件。
(function () {
  var box = document.createElement('div');
  box.className = 'proj-lightbox';
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  var big = box.querySelector('img');
  document.querySelectorAll('.proj-hero img, .proj-shot img').forEach(function (img) {
    img.addEventListener('click', function () {
      big.src = img.currentSrc || img.src; big.alt = img.alt; box.classList.add('open');
    });
  });
  box.addEventListener('click', function () { box.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });

  document.querySelectorAll('.proj-try').forEach(function (wrap) {
    var frame = wrap.querySelector('.proj-try-frame');
    var cover = wrap.querySelector('.proj-try-cover');
    var full = wrap.querySelector('[data-full]');
    function load(src) {
      var f = frame.querySelector('iframe');
      if (!f) { f = document.createElement('iframe'); f.setAttribute('allow', 'autoplay; fullscreen'); f.title = '课件演示'; frame.appendChild(f); }
      f.src = src;
      if (cover) cover.remove();
      if (full) full.href = src;
    }
    if (cover) cover.addEventListener('click', function () { load(cover.dataset.src); });
    wrap.querySelectorAll('.proj-try-tabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        wrap.querySelectorAll('.proj-try-tabs button').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        if (cover) cover.dataset.src = b.dataset.src;
        if (full) full.href = b.dataset.src;
        if (!frame.contains(cover)) load(b.dataset.src);
      });
    });
  });
})();

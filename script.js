/* ===========================================================
   Hangyu — Flickr 自适应行布局 + Lightbox + 今日选辑
   - 每张照片完全保留原始纵横比，零裁剪
   - 每行单独算高度，让整行铺满容器（最后一行例外，保持 target 高）
   - 点击照片 → lightbox（背景毛玻璃，照片浮起，ESC / 点击空白关闭）
   =========================================================== */

(function () {
  const STOCK = [
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250805-DJI_0509.jpg", "folder": "2025 川西", "filename": "20250805-DJI_0509.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2000s · ISO 150\n2025.08.05"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250805-DJI_0535.jpg", "folder": "2025 川西", "filename": "20250805-DJI_0535.jpg", "exif": "Dji FC4170\n161.0 mm f/4.4\n161mm · f/4.4 · 1/160s · ISO 100\n2025.08.05"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250805-DJI_0576.jpg", "folder": "2025 川西", "filename": "20250805-DJI_0576.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/1000s · ISO 190\n2025.08.05"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250806-DJI_0675.jpg", "folder": "2025 川西", "filename": "20250806-DJI_0675.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/320s · ISO 180\n2025.08.06"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507561.jpg", "folder": "2025 川西", "filename": "20250807-JR507561.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/1.2 · 1/2500s · ISO 100\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507588.jpg", "folder": "2025 川西", "filename": "20250807-JR507588.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/2500s · ISO 100\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507620.jpg", "folder": "2025 川西", "filename": "20250807-JR507620.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/3.2 · 1/800s · ISO 100\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507623.jpg", "folder": "2025 川西", "filename": "20250807-JR507623.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/3.2 · 1/160s · ISO 100\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507703.jpg", "folder": "2025 川西", "filename": "20250807-JR507703.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/4.5 · 1/1250s · ISO 400\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507833.jpg", "folder": "2025 川西", "filename": "20250807-JR507833.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/3.5 · 1/2000s · ISO 400\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507858.jpg", "folder": "2025 川西", "filename": "20250807-JR507858.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/2.2 · 1/2000s · ISO 400\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR507969.jpg", "folder": "2025 川西", "filename": "20250807-JR507969.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/5 · 1/2500s · ISO 400\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250807-JR508466.jpg", "folder": "2025 川西", "filename": "20250807-JR508466.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/4.5 · 1/500s · ISO 200\n2025.08.07"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-DJI_0800-2.jpg", "folder": "2025 川西", "filename": "20250809-DJI_0800-2.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/4000s · ISO 180\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-DJI_0827.jpg", "folder": "2025 川西", "filename": "20250809-DJI_0827.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/3200s · ISO 140\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-DJI_0835.jpg", "folder": "2025 川西", "filename": "20250809-DJI_0835.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2500s · ISO 180\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-DJI_0840.jpg", "folder": "2025 川西", "filename": "20250809-DJI_0840.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/3200s · ISO 190\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR508836.jpg", "folder": "2025 川西", "filename": "20250809-JR508836.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/2.8 · 1/1600s · ISO 200\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR508896.jpg", "folder": "2025 川西", "filename": "20250809-JR508896.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/5 · 1/800s · ISO 200\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR508903-2%202.jpg", "folder": "2025 川西", "filename": "20250809-JR508903-2 2.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/5 · 1/1000s · ISO 200\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR508903-2.jpg", "folder": "2025 川西", "filename": "20250809-JR508903-2.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/5 · 1/1000s · ISO 200\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR508932.jpg", "folder": "2025 川西", "filename": "20250809-JR508932.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/4 · 1/1000s · ISO 200\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR509264.jpg", "folder": "2025 川西", "filename": "20250809-JR509264.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/1.8 · 1/4000s · ISO 200\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR509578.jpg", "folder": "2025 川西", "filename": "20250809-JR509578.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/1.6 · 1/1250s · ISO 400\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR509685.jpg", "folder": "2025 川西", "filename": "20250809-JR509685.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5 · 1/500s · ISO 400\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250809-JR509808.jpg", "folder": "2025 川西", "filename": "20250809-JR509808.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/250s · ISO 400\n2025.08.09"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250810-JR500019.jpg", "folder": "2025 川西", "filename": "20250810-JR500019.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/1600s · ISO 400\n2025.08.10"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250810-JR500078.jpg", "folder": "2025 川西", "filename": "20250810-JR500078.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n42mm · f/5.6 · 1/1250s · ISO 400\n2025.08.10"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250810-JR500084.jpg", "folder": "2025 川西", "filename": "20250810-JR500084.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n57mm · f/5.6 · 1/1250s · ISO 400\n2025.08.10"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250810-JR500107.jpg", "folder": "2025 川西", "filename": "20250810-JR500107.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/1250s · ISO 400\n2025.08.10"},
    {"src": "Photos/2025%20%E5%B7%9D%E8%A5%BF/20250810-JR509990.jpg", "folder": "2025 川西", "filename": "20250810-JR509990.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/2.8 · 1/8000s · ISO 400\n2025.08.10"},
    {"src": "Photos/2025%20%20Java/20250821-JR501028.jpg", "folder": "2025  Java", "filename": "20250821-JR501028.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/2 · 1/250s · ISO 640\n2025.08.21"},
    {"src": "Photos/2025%20%20Java/20250822-JR501233.jpg", "folder": "2025  Java", "filename": "20250822-JR501233.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/4 · 1/40s · ISO 800\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501279.jpg", "folder": "2025  Java", "filename": "20250822-JR501279.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/6.3 · 1/1000s · ISO 200\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501338.jpg", "folder": "2025  Java", "filename": "20250822-JR501338.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n28mm · f/2.8 · 1/250s · ISO 200\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501378.jpg", "folder": "2025  Java", "filename": "20250822-JR501378.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n70mm · f/5.6 · 1/320s · ISO 200\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501442.jpg", "folder": "2025  Java", "filename": "20250822-JR501442.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/2.8 · 1/100s · ISO 200\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501494.jpg", "folder": "2025  Java", "filename": "20250822-JR501494.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5 · 1/500s · ISO 250\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501535.jpg", "folder": "2025  Java", "filename": "20250822-JR501535.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n29mm · f/5 · 1/3200s · ISO 500\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501570.jpg", "folder": "2025  Java", "filename": "20250822-JR501570.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5 · 1/3200s · ISO 500\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501637.jpg", "folder": "2025  Java", "filename": "20250822-JR501637.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n40mm · f/3.5 · 1/160s · ISO 500\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501654.jpg", "folder": "2025  Java", "filename": "20250822-JR501654.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n54mm · f/5.6 · 1/2000s · ISO 500\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501666.jpg", "folder": "2025  Java", "filename": "20250822-JR501666.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n55mm · f/5 · 1/200s · ISO 500\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-JR501674.jpg", "folder": "2025  Java", "filename": "20250822-JR501674.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5 · 1/50s · ISO 500\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-_DSC5927.jpg", "folder": "2025  Java", "filename": "20250822-_DSC5927.jpg", "exif": "Sony ZV-1M2\n18-50mm F1.8-4.0\n18mm · f/4 · 1/500s · ISO 250\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250822-_DSC5999.jpg", "folder": "2025  Java", "filename": "20250822-_DSC5999.jpg", "exif": "Sony ZV-1M2\n18-50mm F1.8-4.0\n18mm · f/9 · 1/25s · ISO 100\n2025.08.22"},
    {"src": "Photos/2025%20%20Java/20250823-JR501821.jpg", "folder": "2025  Java", "filename": "20250823-JR501821.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/2 · 1/5000s · ISO 400\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR501824.jpg", "folder": "2025  Java", "filename": "20250823-JR501824.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.6 · 1/6400s · ISO 400\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR501833.jpg", "folder": "2025  Java", "filename": "20250823-JR501833.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.6 · 1/8000s · ISO 400\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502098.jpg", "folder": "2025  Java", "filename": "20250823-JR502098.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/9 · 1/5s · ISO 640\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502123.jpg", "folder": "2025  Java", "filename": "20250823-JR502123.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/500s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502138.jpg", "folder": "2025  Java", "filename": "20250823-JR502138.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/320s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502193.jpg", "folder": "2025  Java", "filename": "20250823-JR502193.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/60s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502225.jpg", "folder": "2025  Java", "filename": "20250823-JR502225.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/400s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502236.jpg", "folder": "2025  Java", "filename": "20250823-JR502236.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/250s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502240.jpg", "folder": "2025  Java", "filename": "20250823-JR502240.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/200s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250823-JR502249.jpg", "folder": "2025  Java", "filename": "20250823-JR502249.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/100s · ISO 1600\n2025.08.23"},
    {"src": "Photos/2025%20%20Java/20250824-DJI_0070.jpg", "folder": "2025  Java", "filename": "20250824-DJI_0070.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/800s · ISO 100\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-DJI_0098.jpg", "folder": "2025  Java", "filename": "20250824-DJI_0098.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/240s · ISO 100\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-DJI_0948.jpg", "folder": "2025  Java", "filename": "20250824-DJI_0948.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/640s · ISO 110\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-JR502330.jpg", "folder": "2025  Java", "filename": "20250824-JR502330.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n28mm · f/4.5 · 1/1250s · ISO 200\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-JR502332.jpg", "folder": "2025  Java", "filename": "20250824-JR502332.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n28mm · f/4.5 · 1/1000s · ISO 200\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-JR502346.jpg", "folder": "2025  Java", "filename": "20250824-JR502346.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/4.5 · 1/1250s · ISO 200\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-JR502369.jpg", "folder": "2025  Java", "filename": "20250824-JR502369.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/4 · 1/2500s · ISO 200\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-JR502465.jpg", "folder": "2025  Java", "filename": "20250824-JR502465.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/4.5 · 1/2000s · ISO 200\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250824-JR502540.jpg", "folder": "2025  Java", "filename": "20250824-JR502540.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n41mm · f/6.3 · 1/125s · ISO 200\n2025.08.24"},
    {"src": "Photos/2025%20%20Java/20250825-JR502764.jpg", "folder": "2025  Java", "filename": "20250825-JR502764.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/3.2 · 1/640s · ISO 100\n2025.08.25"},
    {"src": "Photos/2025%20%20Java/20250825-JR502776.jpg", "folder": "2025  Java", "filename": "20250825-JR502776.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.6 · 1/320s · ISO 100\n2025.08.25"},
    {"src": "Photos/2025%20%20Java/20250825-JR502840.jpg", "folder": "2025  Java", "filename": "20250825-JR502840.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/100s · ISO 160\n2025.08.25"},
    {"src": "Photos/2025%20%20Java/20250825-JR502850.jpg", "folder": "2025  Java", "filename": "20250825-JR502850.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/160s · ISO 160\n2025.08.25"},
    {"src": "Photos/2025%20%20Java/20250825-JR502915.jpg", "folder": "2025  Java", "filename": "20250825-JR502915.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/50s · ISO 1600\n2025.08.25"},
    {"src": "Photos/2025%20%20Java/20250825-JR502967.jpg", "folder": "2025  Java", "filename": "20250825-JR502967.jpg", "exif": "Sony α7RM V\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/60s · ISO 1600\n2025.08.25"},
    {"src": "Photos/2025%20%20Java/20250827-_DSC6087.jpg", "folder": "2025  Java", "filename": "20250827-_DSC6087.jpg", "exif": "Sony ZV-1M2\n18-50mm F1.8-4.0\n27mm · f/4 · 1/320s · ISO 160\n2025.08.27"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250218-DSC00723.jpg", "folder": "2025 Papua New Guinea", "filename": "20250218-DSC00723.jpg", "exif": "Sony α7RM V\nFE 70-200mm F2.8 GM OSS\n200mm · f/4.5 · 1/1250s · ISO 100\n2025.02.18"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250220-DSC01645.jpg", "folder": "2025 Papua New Guinea", "filename": "20250220-DSC01645.jpg", "exif": "Sony α7RM V\nFE 70-200mm F2.8 GM OSS\n70mm · f/2.8 · 1/800s · ISO 3200\n2025.02.20"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250220-DSC01740.jpg", "folder": "2025 Papua New Guinea", "filename": "20250220-DSC01740.jpg", "exif": "Sony α7RM V\nFE 70-200mm F2.8 GM OSS\n80mm · f/2.8 · 1/320s · ISO 3200\n2025.02.20"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250220-DSC02024.jpg", "folder": "2025 Papua New Guinea", "filename": "20250220-DSC02024.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n46mm · f/3.5 · 1/100s · ISO 1000\n2025.02.20"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250220-DSC02061.jpg", "folder": "2025 Papua New Guinea", "filename": "20250220-DSC02061.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/4.5 · 1/250s · ISO 800\n2025.02.20"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250221-DJI_0471.jpg", "folder": "2025 Papua New Guinea", "filename": "20250221-DJI_0471.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2500s · ISO 140\n2025.02.21"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250221-DJI_0488.jpg", "folder": "2025 Papua New Guinea", "filename": "20250221-DJI_0488.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/3200s · ISO 150\n2025.02.21"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250221-DSC02257.jpg", "folder": "2025 Papua New Guinea", "filename": "20250221-DSC02257.jpg", "exif": "Sony α7RM V\nFE 70-200mm F2.8 GM OSS\n70mm · f/4 · 1/5000s · ISO 200\n2025.02.21"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250221-DSC02277.jpg", "folder": "2025 Papua New Guinea", "filename": "20250221-DSC02277.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n62mm · f/4 · 1/4000s · ISO 800\n2025.02.21"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250221-DSC02379.jpg", "folder": "2025 Papua New Guinea", "filename": "20250221-DSC02379.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n60mm · f/3.5 · 1/400s · ISO 160\n2025.02.21"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250222-DSC02861.jpg", "folder": "2025 Papua New Guinea", "filename": "20250222-DSC02861.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n52mm · f/5 · 1/6400s · ISO 800\n2025.02.22"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250223-DJI_0534.jpg", "folder": "2025 Papua New Guinea", "filename": "20250223-DJI_0534.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2000s · ISO 110\n2025.02.23"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250223-DSC03013.jpg", "folder": "2025 Papua New Guinea", "filename": "20250223-DSC03013.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/160s · ISO 800\n2025.02.23"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250223-DSC03190.jpg", "folder": "2025 Papua New Guinea", "filename": "20250223-DSC03190.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/1.2 · 1/2000s · ISO 100\n2025.02.23"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250223-DSC03209.jpg", "folder": "2025 Papua New Guinea", "filename": "20250223-DSC03209.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/1.6 · 1/2500s · ISO 100\n2025.02.23"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250223-DSC08539.jpg", "folder": "2025 Papua New Guinea", "filename": "20250223-DSC08539.jpg", "exif": "Sony ILME-FX3\nFE 50mm F1.2 GM\n50mm · f/1.3 · 1/1600s · ISO 100\n2025.02.23"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250224-DSC03491.jpg", "folder": "2025 Papua New Guinea", "filename": "20250224-DSC03491.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/2.8 · 1/800s · ISO 1600\n2025.02.24"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250224-DSC03524.jpg", "folder": "2025 Papua New Guinea", "filename": "20250224-DSC03524.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/1.2 · 1/100s · ISO 100\n2025.02.24"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250225-DSC03636.jpg", "folder": "2025 Papua New Guinea", "filename": "20250225-DSC03636.jpg", "exif": "Sony α7RM V\nFE 24-70mm F2.8 GM II\n24mm · f/6.3 · 1/800s · ISO 100\n2025.02.25"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250225-DSC03808.jpg", "folder": "2025 Papua New Guinea", "filename": "20250225-DSC03808.jpg", "exif": "Sony α7RM V\nFE 50mm F1.2 GM\n50mm · f/2.5 · 1/80s · ISO 100\n2025.02.25"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250225-DSC08704.jpg", "folder": "2025 Papua New Guinea", "filename": "20250225-DSC08704.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n24mm · f/2.8 · 1/500s · ISO 800\n2025.02.25"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250226-DJI_0015.jpg", "folder": "2025 Papua New Guinea", "filename": "20250226-DJI_0015.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/3200s · ISO 120\n2025.02.26"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250226-DJI_0113.jpg", "folder": "2025 Papua New Guinea", "filename": "20250226-DJI_0113.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/60s · ISO 100\n2025.02.26"},
    {"src": "Photos/2025%20Papua%20New%20Guinea/20250226-DJI_0136.jpg", "folder": "2025 Papua New Guinea", "filename": "20250226-DJI_0136.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/400s · ISO 180\n2025.02.26"},
    {"src": "Photos/2024%20Japan/20240802-DSC01618_Osaka_2500.jpg", "folder": "2024 Japan", "filename": "20240802-DSC01618_Osaka_2500.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/160s · ISO 200\n2024.08.02"},
    {"src": "Photos/2024%20Japan/20240802-DSC01650_Osaka_2500.jpg", "folder": "2024 Japan", "filename": "20240802-DSC01650_Osaka_2500.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/5.6 · 1/8000s · ISO 640\n2024.08.02"},
    {"src": "Photos/2024%20Japan/20240802-DSC01816_Osaka_2500.jpg", "folder": "2024 Japan", "filename": "20240802-DSC01816_Osaka_2500.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/1000s · ISO 200\n2024.08.02"},
    {"src": "Photos/2024%20Japan/20240803-DSC02541-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240803-DSC02541-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/3200s · ISO 200\n2024.08.03"},
    {"src": "Photos/2024%20Japan/20240803-DSC02579-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240803-DSC02579-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/4.5 · 1/1000s · ISO 200\n2024.08.03"},
    {"src": "Photos/2024%20Japan/20240803-DSC02611-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240803-DSC02611-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/1250s · ISO 200\n2024.08.03"},
    {"src": "Photos/2024%20Japan/20240803-DSC02854-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240803-DSC02854-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/9 · 1/200s · ISO 200\n2024.08.03"},
    {"src": "Photos/2024%20Japan/20240803-DSC03417-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240803-DSC03417-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/3.2 · 1/500s · ISO 1000\n2024.08.03"},
    {"src": "Photos/2024%20Japan/20240803-DSC03485-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240803-DSC03485-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/250s · ISO 1000\n2024.08.03"},
    {"src": "Photos/2024%20Japan/20240804-DSC03713-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240804-DSC03713-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/3.5 · 1/2000s · ISO 160\n2024.08.04"},
    {"src": "Photos/2024%20Japan/20240804-DSC03757-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240804-DSC03757-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n34mm · f/5 · 1/800s · ISO 160\n2024.08.04"},
    {"src": "Photos/2024%20Japan/20240804-DSC03795-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240804-DSC03795-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n40mm · f/3.5 · 1/1250s · ISO 160\n2024.08.04"},
    {"src": "Photos/2024%20Japan/20240804-DSC04389-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240804-DSC04389-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/3.2 · 1/3200s · ISO 320\n2024.08.04"},
    {"src": "Photos/2024%20Japan/20240805-DSC04698-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240805-DSC04698-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/2.8 · 1/1000s · ISO 250\n2024.08.05"},
    {"src": "Photos/2024%20Japan/20240805-DSC04732-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240805-DSC04732-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/2 · 1/6400s · ISO 250\n2024.08.05"},
    {"src": "Photos/2024%20Japan/20240805-DSC04736-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240805-DSC04736-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/2 · 1/8000s · ISO 250\n2024.08.05"},
    {"src": "Photos/2024%20Japan/20240805-DSC04751-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240805-DSC04751-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/3.2 · 1/8000s · ISO 250\n2024.08.05"},
    {"src": "Photos/2024%20Japan/20240805-DSC04895-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240805-DSC04895-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/2.5 · 1/250s · ISO 250\n2024.08.05"},
    {"src": "Photos/2024%20Japan/20240805-DSC05080-Nara%26Kyoto.jpg", "folder": "2024 Japan", "filename": "20240805-DSC05080-Nara&Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/2 · 1/6400s · ISO 250\n2024.08.05"},
    {"src": "Photos/2024%20Japan/20240806-DSC05232-Kyoto.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05232-Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n70mm · f/2.8 · 1/250s · ISO 320\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05246-Kyoto.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05246-Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n63mm · f/4 · 1/125s · ISO 320\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05263-Kyoto.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05263-Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n60mm · f/2.8 · 1/1250s · ISO 320\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05305-Kyoto.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05305-Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n24mm · f/2.8 · 1/160s · ISO 320\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05311-Kyoto.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05311-Kyoto.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n55mm · f/2.8 · 1/200s · ISO 320\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05714.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05714.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n24mm · f/6.3 · 1/8000s · ISO 400\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05839.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05839.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n33mm · f/5.6 · 1/2000s · ISO 400\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240806-DSC05868.jpg", "folder": "2024 Japan", "filename": "20240806-DSC05868.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n24mm · f/4 · 1/8000s · ISO 640\n2024.08.06"},
    {"src": "Photos/2024%20Japan/20240807-DSC06269.jpg", "folder": "2024 Japan", "filename": "20240807-DSC06269.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/4.5 · 1/5000s · ISO 250\n2024.08.07"},
    {"src": "Photos/2024%20Japan/20240807-DSC06942.jpg", "folder": "2024 Japan", "filename": "20240807-DSC06942.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/2500s · ISO 250\n2024.08.07"},
    {"src": "Photos/2024%20Japan/20240807-DSC07001.jpg", "folder": "2024 Japan", "filename": "20240807-DSC07001.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/160s · ISO 800\n2024.08.07"},
    {"src": "Photos/2024%20Japan/20240807-DSC07028.jpg", "folder": "2024 Japan", "filename": "20240807-DSC07028.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/250s · ISO 1250\n2024.08.07"},
    {"src": "Photos/2024%20Japan/20240807-DSC07086.jpg", "folder": "2024 Japan", "filename": "20240807-DSC07086.jpg", "exif": "Sony ILME-FX3\nFE 35mm F1.4 GM\n35mm · f/1.4 · 1/400s · ISO 1250\n2024.08.07"},
    {"src": "Photos/2024%20Galapagos/20240701-DSC00083_%E7%81%AB%E5%B1%B1_2000.jpg", "folder": "2024 Galapagos", "filename": "20240701-DSC00083_火山_2000.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n28mm · f/8 · 1/2500s · ISO 640\n2024.07.01"},
    {"src": "Photos/2024%20Galapagos/20240702-DJI_0893_%E7%81%AB%E5%B1%B1_2000.jpg", "folder": "2024 Galapagos", "filename": "20240702-DJI_0893_火山_2000.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2000s · ISO 120\n2024.07.02"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC02796_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC02796_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n448mm · f/6.3 · 1/8000s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC02966_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC02966_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n286mm · f/6.3 · 1/6400s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03059_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03059_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/8 · 1/1600s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03097_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03097_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n444mm · f/8 · 1/1600s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03261_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03261_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n448mm · f/6.3 · 1/8000s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03381_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03381_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n318mm · f/6.3 · 1/2000s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03456_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03456_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n200mm · f/6.3 · 1/1600s · ISO 1000\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03782_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03782_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/3.2 · 1/1600s · ISO 320\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240706-DSC03992_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240706-DSC03992_巴尔塔拉岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n255mm · f/7.1 · 1/8000s · ISO 1600\n2024.07.06"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC00590_Urbina%20Bay_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC00590_Urbina Bay_2500.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n25mm · f/4.5 · 1/1000s · ISO 640\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC00691_Urbina%20Bay_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC00691_Urbina Bay_2500.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n63mm · f/6.3 · 1/1600s · ISO 640\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC00758_Urbina%20Bay_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC00758_Urbina Bay_2500.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n24mm · f/9 · 1/640s · ISO 640\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04300_%E6%B5%B7%E9%AC%A3%E8%9C%A5%E4%B9%8B%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04300_海鬣蜥之岛_2500.jpg", "exif": "Sony α7RM IV\nFE 50mm F1.2 GM\n50mm · f/2.2 · 1/400s · ISO 100\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04378_%E6%B5%B7%E9%AC%A3%E8%9C%A5%E4%B9%8B%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04378_海鬣蜥之岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n239mm · f/6.3 · 1/8000s · ISO 1000\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04404_%E6%B5%B7%E9%AC%A3%E8%9C%A5%E4%B9%8B%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04404_海鬣蜥之岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n200mm · f/6.3 · 1/8000s · ISO 200\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04499_%E6%B5%B7%E9%AC%A3%E8%9C%A5%E4%B9%8B%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04499_海鬣蜥之岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n456mm · f/6.3 · 1/1600s · ISO 3200\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04628_%E6%B5%B7%E9%AC%A3%E8%9C%A5%E4%B9%8B%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04628_海鬣蜥之岛_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/6400s · ISO 3200\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04785_Urbina%20Bay_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04785_Urbina Bay_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/800s · ISO 1600\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04855_Urbina%20Bay_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04855_Urbina Bay_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/320s · ISO 1600\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-DSC04899_Urbina%20Bay_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-DSC04899_Urbina Bay_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/1000s · ISO 1600\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240707-GOPR0178_%E5%B7%B4%E5%B0%94%E5%A1%94%E6%8B%89%E5%B2%9B_2500.jpg", "folder": "2024 Galapagos", "filename": "20240707-GOPR0178_巴尔塔拉岛_2500.jpg", "exif": "Gopro HERO12 Black\n15mm · f/2.5 · 1/900s · ISO 519\n2024.07.07"},
    {"src": "Photos/2024%20Galapagos/20240708-DSC00887_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240708-DSC00887_Dragon Hill_2500.jpg", "exif": "Sony ILME-FX3\nFE 24-70mm F2.8 GM II\n55mm · f/8 · 1/800s · ISO 400\n2024.07.08"},
    {"src": "Photos/2024%20Galapagos/20240708-DSC05077_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240708-DSC05077_Dragon Hill_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/5000s · ISO 1600\n2024.07.08"},
    {"src": "Photos/2024%20Galapagos/20240708-DSC05158_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240708-DSC05158_Dragon Hill_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/7.1 · 1/4000s · ISO 1600\n2024.07.08"},
    {"src": "Photos/2024%20Galapagos/20240708-DSC05160_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240708-DSC05160_Dragon Hill_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n512mm · f/8 · 1/6400s · ISO 1600\n2024.07.08"},
    {"src": "Photos/2024%20Galapagos/20240708-GOPR0332_Rabida%20Island_2500.jpg", "folder": "2024 Galapagos", "filename": "20240708-GOPR0332_Rabida Island_2500.jpg", "exif": "Gopro HERO12 Black\n15mm · f/2.5 · 1/950s · ISO 202\n2024.07.08"},
    {"src": "Photos/2024%20Galapagos/20240709-DSC05339_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240709-DSC05339_Dragon Hill_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/8000s · ISO 1600\n2024.07.09"},
    {"src": "Photos/2024%20Galapagos/20240709-DSC05699_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240709-DSC05699_Dragon Hill_2500.jpg", "exif": "Sony α7RM IV\nFE 200-600mm F5.6-6.3 G OSS\n600mm · f/6.3 · 1/8000s · ISO 800\n2024.07.09"},
    {"src": "Photos/2024%20Galapagos/20240709-DSC05726_Dragon%20Hill_2500.jpg", "folder": "2024 Galapagos", "filename": "20240709-DSC05726_Dragon Hill_2500.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n70mm · f/5.6 · 1/25s · ISO 500\n2024.07.09"},
    {"src": "Photos/2023%20Antarctica/DJI_0313.jpg", "folder": "2023 Antarctica", "filename": "DJI_0313.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2000s · ISO 150\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DJI_0316.jpg", "folder": "2023 Antarctica", "filename": "DJI_0316.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2000s · ISO 100\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DJI_0343.jpg", "folder": "2023 Antarctica", "filename": "DJI_0343.jpg", "exif": "Dji FC4170\n161.0 mm f/4.4\n161mm · f/4.4 · 1/500s · ISO 100\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DSC00002.jpg", "folder": "2023 Antarctica", "filename": "DSC00002.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n200mm · f/7.1 · 1/1000s · ISO 400\n2023.12.03"},
    {"src": "Photos/2023%20Antarctica/DSC00019.jpg", "folder": "2023 Antarctica", "filename": "DSC00019.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/7.1 · 1/800s · ISO 400\n2023.12.03"},
    {"src": "Photos/2023%20Antarctica/DSC00040.jpg", "folder": "2023 Antarctica", "filename": "DSC00040.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n35mm · f/7.1 · 1/1250s · ISO 400\n2023.12.03"},
    {"src": "Photos/2023%20Antarctica/DSC00086.jpg", "folder": "2023 Antarctica", "filename": "DSC00086.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/7.1 · 1/500s · ISO 400\n2023.12.03"},
    {"src": "Photos/2023%20Antarctica/DSC00254.jpg", "folder": "2023 Antarctica", "filename": "DSC00254.jpg", "exif": "Sony α7RM IV\nFE 16-35mm F2.8 GM\n19mm · f/10 · 1/1000s · ISO 400\n2023.12.04"},
    {"src": "Photos/2023%20Antarctica/DSC00482.jpg", "folder": "2023 Antarctica", "filename": "DSC00482.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n200mm · f/8 · 1/1000s · ISO 400\n2023.12.04"},
    {"src": "Photos/2023%20Antarctica/DSC00546.jpg", "folder": "2023 Antarctica", "filename": "DSC00546.jpg", "exif": "Sony ILME-FX3\nFE 70-200mm F2.8 GM OSS\n130mm · f/10 · 1/3200s · ISO 400\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC00582.jpg", "folder": "2023 Antarctica", "filename": "DSC00582.jpg", "exif": "Sony ZV-1M2\n18-50mm F1.8-4.0\n33mm · f/3.5 · 1/640s · ISO 125\n2023.12.05"},
    {"src": "Photos/2023%20Antarctica/DSC00588.jpg", "folder": "2023 Antarctica", "filename": "DSC00588.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n137mm · f/8 · 1/800s · ISO 400\n2023.12.04"},
    {"src": "Photos/2023%20Antarctica/DSC01541.jpg", "folder": "2023 Antarctica", "filename": "DSC01541.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/4000s · ISO 320\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC01696.jpg", "folder": "2023 Antarctica", "filename": "DSC01696.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n143mm · f/5.6 · 1/4000s · ISO 250\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC01858.jpg", "folder": "2023 Antarctica", "filename": "DSC01858.jpg", "exif": "Sony α7RM IV\nFE 16-35mm F2.8 GM\n30mm · f/6.3 · 1/500s · ISO 250\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC01874.jpg", "folder": "2023 Antarctica", "filename": "DSC01874.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n106mm · f/7.1 · 1/160s · ISO 250\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC01982.jpg", "folder": "2023 Antarctica", "filename": "DSC01982.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n70mm · f/5.6 · 1/8000s · ISO 800\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC02050.jpg", "folder": "2023 Antarctica", "filename": "DSC02050.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n132mm · f/5.6 · 1/5000s · ISO 160\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC02160.jpg", "folder": "2023 Antarctica", "filename": "DSC02160.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n151mm · f/5.6 · 1/4000s · ISO 160\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC02233.jpg", "folder": "2023 Antarctica", "filename": "DSC02233.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n176mm · f/2.8 · 1/8000s · ISO 160\n2023.12.06"},
    {"src": "Photos/2023%20Antarctica/DSC03434%202.jpg", "folder": "2023 Antarctica", "filename": "DSC03434 2.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/4000s · ISO 160\n2023.12.07"},
    {"src": "Photos/2023%20Antarctica/DSC03434.jpg", "folder": "2023 Antarctica", "filename": "DSC03434.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/5.6 · 1/4000s · ISO 160\n2023.12.07"},
    {"src": "Photos/2023%20Antarctica/DSC04680.jpg", "folder": "2023 Antarctica", "filename": "DSC04680.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n200mm · f/6.3 · 1/4000s · ISO 160\n2023.12.07"},
    {"src": "Photos/2023%20Antarctica/DSC04741.jpg", "folder": "2023 Antarctica", "filename": "DSC04741.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n155mm · f/8 · 1/500s · ISO 160\n2023.12.07"},
    {"src": "Photos/2023%20Antarctica/DSC05716.jpg", "folder": "2023 Antarctica", "filename": "DSC05716.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n200mm · f/2.8 · 1/320s · ISO 100\n2023.12.08"},
    {"src": "Photos/2023%20Antarctica/DSC05869.jpg", "folder": "2023 Antarctica", "filename": "DSC05869.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n200mm · f/2.8 · 1/6400s · ISO 640\n2023.12.08"},
    {"src": "Photos/2023%20Antarctica/DSC06053.jpg", "folder": "2023 Antarctica", "filename": "DSC06053.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS + 2X Teleconverter\n270mm · f/6.3 · 1/3200s · ISO 3200\n2023.12.09"},
    {"src": "Photos/2023%20Antarctica/DSC06984.jpg", "folder": "2023 Antarctica", "filename": "DSC06984.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n95mm · f/6.3 · 1/1000s · ISO 200\n2023.12.10"},
    {"src": "Photos/2023%20Antarctica/DSC07925.jpg", "folder": "2023 Antarctica", "filename": "DSC07925.jpg", "exif": "Sony α7RM IV\nFE 35mm F1.4 GM\n35mm · f/3.5 · 1/5000s · ISO 400\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DSC07956.jpg", "folder": "2023 Antarctica", "filename": "DSC07956.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n92mm · f/5 · 1/800s · ISO 160\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DSC08064.jpg", "folder": "2023 Antarctica", "filename": "DSC08064.jpg", "exif": "Sony α7RM IV\nFE 50mm F1.2 GM\n50mm · f/5 · 1/320s · ISO 160\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DSC08067.jpg", "folder": "2023 Antarctica", "filename": "DSC08067.jpg", "exif": "Sony α7RM IV\nFE 50mm F1.2 GM\n50mm · f/1.2 · 1/160s · ISO 640\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DSC08113.jpg", "folder": "2023 Antarctica", "filename": "DSC08113.jpg", "exif": "Sony α7RM IV\nFE 16-35mm F2.8 GM\n16mm · f/2.8 · 1/50s · ISO 640\n2023.12.01"},
    {"src": "Photos/2023%20Antarctica/DSC08380.jpg", "folder": "2023 Antarctica", "filename": "DSC08380.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n81mm · f/5.6 · 1/3200s · ISO 250\n2023.12.02"},
    {"src": "Photos/2023%20Antarctica/DSC09105.jpg", "folder": "2023 Antarctica", "filename": "DSC09105.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS + 2X Teleconverter\n400mm · f/5.6 · 1/3200s · ISO 1600\n2023.12.03"},
    {"src": "Photos/2023%20Antarctica/DSC09537.jpg", "folder": "2023 Antarctica", "filename": "DSC09537.jpg", "exif": "Sony α7RM IV\nFE 70-200mm F2.8 GM OSS\n200mm · f/6.3 · 1/2000s · ISO 320\n2023.12.03"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DJI_0087.jpg", "folder": "2023 甘南", "filename": "DJI_0087.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/2000s · ISO 100\n2023.07.18"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DJI_0100.jpg", "folder": "2023 甘南", "filename": "DJI_0100.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/1000s · ISO 110\n2023.07.18"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DJI_0139.jpg", "folder": "2023 甘南", "filename": "DJI_0139.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/800s · ISO 110\n2023.07.18"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DJI_0175.jpg", "folder": "2023 甘南", "filename": "DJI_0175.jpg", "exif": "Dji FC4170\n161.0 mm f/4.4\n161mm · f/4.4 · 1/800s · ISO 100\n2023.07.18"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DJI_0263.jpg", "folder": "2023 甘南", "filename": "DJI_0263.jpg", "exif": "Hasselblad L2D-20c\n24.0 mm f/2.8\n24mm · f/2.8 · 1/640s · ISO 100\n2023.07.20"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC00018-%E5%B7%B2%E5%A2%9E%E5%BC%BA-%E9%99%8D%E5%99%AA.jpg", "folder": "2023 甘南", "filename": "DSC00018-已增强-降噪.jpg", "exif": "Sony ILME-FX3\nFE 24mm F1.4 GM\n24mm · f/1.4 · 3.2s · ISO 12800\n2023.07.21"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC02198.jpg", "folder": "2023 甘南", "filename": "DSC02198.jpg", "exif": "Sony α7RM IV\nFE 35mm F1.4 GM\n35mm · f/2.8 · 1/2500s · ISO 100\n2023.07.17"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC03361.jpg", "folder": "2023 甘南", "filename": "DSC03361.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/2.8 · 1/800s · ISO 250\n2023.07.19"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC03809.jpg", "folder": "2023 甘南", "filename": "DSC03809.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/7.1 · 1/6400s · ISO 500\n2023.07.20"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC04047.jpg", "folder": "2023 甘南", "filename": "DSC04047.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n24mm · f/5 · 1/3200s · ISO 500\n2023.07.20"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC04207.jpg", "folder": "2023 甘南", "filename": "DSC04207.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n35mm · f/5.6 · 1/4000s · ISO 500\n2023.07.20"},
    {"src": "Photos/2023%20%E7%94%98%E5%8D%97/DSC04344.jpg", "folder": "2023 甘南", "filename": "DSC04344.jpg", "exif": "Sony α7RM IV\nFE 24-70mm F2.8 GM II\n70mm · f/2.8 · 1/6400s · ISO 500\n2023.07.20"}
  ];

  function todaySeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fmtDate(d) {
    d = d || new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return y + '.' + m + '.' + day;
  }

  function getDailyGap() {
    return window.innerWidth <= 700 ? 5 : 6;
  }
  function clampNumber(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
  function getGridContentWidth(grid) {
    if (!grid) return window.innerWidth;
    const cs = getComputedStyle(grid);
    return grid.clientWidth
      - (parseFloat(cs.paddingLeft) || 0)
      - (parseFloat(cs.paddingRight) || 0);
  }
  function getDailyTargetColumns(width) {
    if (width <= 520) return 1.15;
    if (width <= 900) return 2.35;
    if (width <= 1200) return 3.15;
    if (width <= 1600) return 3.75;
    if (width <= 2100) return 4.35;
    return 4.75;
  }
  function getDailyHeight(grid) {
    const width = getGridContentWidth(grid);
    const photos = grid ? Array.from(grid.children) : [];
    const aspects = photos.map(function (p) {
      const img = p.querySelector('img');
      return img ? getImageAspect(img) : 0;
    }).filter(Boolean);
    const avgAspect = aspects.length
      ? clampNumber(aspects.reduce(function (sum, n) { return sum + n; }, 0) / aspects.length, 1.05, 1.7)
      : 1.45;
    const cols = getDailyTargetColumns(width);
    const gap = getDailyGap();
    const target = (width - (cols - 1) * gap) / (cols * avgAspect);

    if (width <= 520) return clampNumber(target, 165, 220);
    if (width <= 900) return clampNumber(target, 170, 225);
    if (width <= 1200) return clampNumber(target, 190, 235);
    if (width <= 1600) return clampNumber(target, 215, 265);
    return clampNumber(target, 235, 305);
  }
  function getDailyEstimatedVisibleCount() {
    const strip = document.getElementById('dailyStrip');
    const width = strip ? getGridContentWidth(strip) : window.innerWidth;
    return Math.max(3, Math.round(getDailyTargetColumns(width) * 3));
  }
  function getJimHeight() {
    if (window.innerWidth <= 700) return 160;
    if (window.innerWidth <= 1100) return 200;
    return 230;
  }
  function getProjectHeight() {
    if (window.innerWidth <= 700) return 160;
    if (window.innerWidth <= 1100) return 200;
    return 230;
  }

  // 等所有图加载完。坏图（404 等）从 DOM 删除，
  // 防止它们占着 200×230 占位把 flex 流卡歪。
  function loadAllImages(photos) {
    return Promise.all(photos.map(function (p) {
      const img = p.querySelector('img');
      if (!img) return Promise.resolve();
      if (img.complete) {
        if (!img.naturalWidth) p.remove(); // 已加载完但失败
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', function () {
          p.remove();
          resolve();
        }, { once: true });
      });
    }));
  }

  function getImageAspect(img) {
    const w = img.naturalWidth || parseFloat(img.getAttribute('width')) || 0;
    const h = img.naturalHeight || parseFloat(img.getAttribute('height')) || 0;
    return w && h ? w / h : 0;
  }

  // Flickr 自适应行（"取离 target 最近"版）
  // 关键改进：判断"加入这张"还是"先 flush"哪个让行高更接近 target，
  // 而不是简单看会不会溢出。这样行高更稳定，每行照片数也更均衡。
  // 跳过 is-hidden 的照片 — 它们不参与正文布局
  // opts.fillLast = true 时，最后一行也铺满容器宽度（首页选辑用）
  function layoutJustified(grid, targetHeight, gap, opts) {
    opts = opts || {};
    // 先清掉旧的 inline 尺寸，免得隐藏 / 取消隐藏时残留
    Array.from(grid.children).forEach(function (p) {
      if (p.classList.contains('is-hidden')) {
        p.style.width = '';
        p.style.height = '';
      }
    });
    const photos = Array.from(grid.children).filter(function (p) {
      if (p.classList.contains('is-hidden')) return false;
      const img = p.querySelector('img');
      return img && getImageAspect(img);
    });
    if (!photos.length) return;
    // 关键：clientWidth 包含 padding，但 flex 子项只在 padding 内的内容区流动。
    // 减掉左右 padding 才是真正可用的宽度。
    const cs = getComputedStyle(grid);
    const containerWidth = grid.clientWidth
      - (parseFloat(cs.paddingLeft) || 0)
      - (parseFloat(cs.paddingRight) || 0);
    if (!containerWidth) return;

    let row = [];
    let rowAspectSum = 0;

    function flushRow(isLast) {
      if (row.length === 0) return;
      let h;
      if (isLast && !opts.fillLast) {
        // 默认：最后一行保持 target 高度（参差，右下角可能空）
        h = targetHeight;
      } else {
        // 否则铺满（包括 fillLast 时的最后一行）
        h = (containerWidth - (row.length - 1) * gap) / rowAspectSum;
        if (isLast && opts.fillLast) {
          // 最后一行的 h 设上限，免得照片少时被拉得过高
          h = Math.min(h, targetHeight * 1.5);
        }
      }
      row.forEach(function (item) {
        item.el.style.height = h + 'px';
        item.el.style.width = (item.aspect * h) + 'px';
      });
      row = [];
      rowAspectSum = 0;
    }

    photos.forEach(function (photo) {
      const img = photo.querySelector('img');
      const aspect = getImageAspect(img);

      // 决策：加入当前行 vs 先 flush — 哪个让行高更接近 target？
      if (row.length > 0) {
        const heightIfAdd = (containerWidth - row.length * gap) / (rowAspectSum + aspect);
        const heightIfFlush = (containerWidth - (row.length - 1) * gap) / rowAspectSum;
        if (Math.abs(heightIfFlush - targetHeight) < Math.abs(heightIfAdd - targetHeight)) {
          flushRow(false);
        }
      }

      row.push({ el: photo, aspect: aspect });
      rowAspectSum += aspect;
    });
    flushRow(true);
  }

  function justifyGallery(grid, targetHeight, gap, opts) {
    if (!grid) return;
    const photos = Array.from(grid.children);
    loadAllImages(photos).then(function () {
      layoutJustified(grid, targetHeight, gap, opts);
      // 最后一行铺满后，可能仍有 1-2px 余量；用 fillLastRowGap 把最后一张
      // 微调到正好填满（一般只裁 0-30px，肉眼几乎看不出来）
      if (opts && opts.fillLast) fillLastRowGap(grid, gap);
    });
  }

  // 只保留前 N 行，多出来的行（含未铺满的孤儿行）整行从 DOM 删掉。
  // 返回实际保留下来的照片数（用于翻页推进）。
  function keepFirstNRows(grid, n) {
    const photos = Array.from(grid.children).filter(function (p) {
      return !p.classList.contains('is-hidden') && p.style.width;
    });
    if (photos.length === 0) return 0;
    // 收集所有不重复的行顶（按 offsetTop 聚类，5px 容差）
    const rowTops = [];
    photos.forEach(function (p) {
      const top = p.offsetTop;
      if (rowTops.every(function (t) { return Math.abs(t - top) > 5; })) {
        rowTops.push(top);
      }
    });
    rowTops.sort(function (a, b) { return a - b; });
    if (rowTops.length <= n) return photos.length;  // 行数已 ≤ n，全留
    const cutoff = rowTops[n - 1] + 5;  // 第 n 行以下的全删
    photos.forEach(function (p) {
      if (p.offsetTop > cutoff) p.remove();
    });
    // 重新统计还剩多少张
    return Array.from(grid.children).filter(function (p) {
      return !p.classList.contains('is-hidden');
    }).length;
  }

  // 把最后一行的最后一张照片宽度微调到正好填满容器（剩余 < 30px 时不动）
  function fillLastRowGap(grid, gap) {
    const photos = Array.from(grid.children).filter(function (p) {
      return !p.classList.contains('is-hidden') && p.style.width;
    });
    if (photos.length === 0) return;
    const containerWidth = grid.clientWidth;
    let maxTop = -1;
    photos.forEach(function (p) { if (p.offsetTop > maxTop) maxTop = p.offsetTop; });
    if (maxTop < 0) return;
    const lastRow = photos.filter(function (p) {
      return Math.abs(p.offsetTop - maxTop) < 5;
    });
    if (lastRow.length === 0) return;
    lastRow.sort(function (a, b) { return a.offsetLeft - b.offsetLeft; });
    let totalWidth = 0;
    lastRow.forEach(function (p, i) {
      totalWidth += p.offsetWidth;
      if (i > 0) totalWidth += gap;
    });
    const remaining = containerWidth - totalWidth;
    if (remaining > 1) {
      const last = lastRow[lastRow.length - 1];
      const cur = parseFloat(last.style.width) || last.offsetWidth;
      last.style.width = (cur + remaining) + 'px';
    }
  }

  // === EXIF：直接从照片元素的 data-exif 属性读 ===
  // EXIF 在生成 HTML 时已经用 Python 抽取并格式化好（见 photo-*.html data-exif="..."）
  // 这样 file:// 协议下也能直接显示，不依赖任何外部库。
  function getExifFromElement(photo) {
    if (!photo || !photo.dataset) return '';
    return photo.dataset.exif || '';
  }

  const projectManifestCache = {};
  const projectManifestPromises = {};

  // === 注释存取（per-照片，存到项目 manifest 的 captions 字段）===
  function getCaptionFromManifest(folder, filename) {
    if (!folder || !filename) return '';
    const cached = projectManifestCache[folder];
    if (cached && cached.captions && cached.captions[filename]) return cached.captions[filename];
    try {
      const m = JSON.parse(localStorage.getItem(manifestKey(folder)) || '{}');
      if (m.captions && m.captions[filename]) return m.captions[filename];
    } catch (e) {}
    return '';
  }

  // 把纯文本注释渲染成 <p> 段落（双换行分段，单换行 <br>）
  function escapeHtml(s) {
    return s.replace(/[&<>]/g, function (c) {
      return c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;';
    });
  }
  function renderCaptionParagraphs(el, text) {
    if (!text) { el.innerHTML = ''; return; }
    const paragraphs = text.split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(function (p) { return p; });
    el.innerHTML = paragraphs.map(function (p) {
      return '<p>' + escapeHtml(p).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }
  // 从 contenteditable 元素读出干净的纯文本（保留段落 \n\n、行内 \n）
  function readCaptionText(el) {
    return (el.innerText || '')
      .replace(/ /g, ' ')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function saveCaptionToManifest(folder, filename, text) {
    if (!folder || !filename) return;
    const key = manifestKey(folder);
    let m = {};
    try { m = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
    if (!m.captions) m.captions = {};
    text = (text || '').trim();
    if (text) m.captions[filename] = text;
    else delete m.captions[filename];
    m.version = 3;
    localStorage.setItem(key, JSON.stringify(m));
    projectManifestCache[folder] = mergeManifest(projectManifestCache[folder], m) || m;
    projectManifestPromises[folder] = Promise.resolve(projectManifestCache[folder]);
  }

  // === Lightbox：白色面板浮起，左照片右信息（注释 + EXIF）===
  let lb = null;
  let lbList = [];      // 当前 lightbox 可翻页的照片清单
  let lbIndex = 0;
  let lbShowProjectLink = false;  // 仅在首页"今日选辑"打开时显示"在 X 中查看"链接

  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button class="lightbox-close" aria-label="关闭">×</button>' +
      '<div class="lightbox-panel">' +
        '<div class="lightbox-photo-area">' +
          '<img src="" alt="">' +
          '<button class="lightbox-prev" aria-label="上一张">‹</button>' +
          '<button class="lightbox-next" aria-label="下一张">›</button>' +
        '</div>' +
        '<div class="lightbox-info">' +
          '<div class="lightbox-caption"></div>' +
          '<div class="lightbox-exif"></div>' +
          '<div class="lightbox-project-link"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(lb);

    function close() {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }
    lb.addEventListener('click', function (e) {
      // 点 lightbox 自己（白色背景区域）才关，点 panel 内不关
      if (e.target === lb) close();
    });
    lb.querySelector('.lightbox-close').addEventListener('click', function (e) {
      e.stopPropagation();
      close();
    });
    lb.querySelector('.lightbox-prev').addEventListener('click', function (e) {
      e.stopPropagation();
      navLightbox(-1);
    });
    lb.querySelector('.lightbox-next').addEventListener('click', function (e) {
      e.stopPropagation();
      navLightbox(1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') navLightbox(-1);
      else if (e.key === 'ArrowRight') navLightbox(1);
    });
    return lb;
  }

  function navLightbox(delta) {
    if (lbList.length === 0) return;
    lbIndex = ((lbIndex + delta) % lbList.length + lbList.length) % lbList.length;
    const item = lbList[lbIndex];
    showLightbox(item.src, item.folder, item.filename, item.exif);
  }

  function showLightbox(src, folder, filename, exifText) {
    const el = ensureLightbox();
    const img = el.querySelector('img');
    const captionEl = el.querySelector('.lightbox-caption');
    const exifEl = el.querySelector('.lightbox-exif');

    img.style.width = '';
    img.style.height = '';
    img.src = src;

    // 注释：读取 +（编辑模式下）可写。段落用 <p> 渲染。
    captionEl.contentEditable = 'false';
    captionEl.oninput = null;
    captionEl.dataset.folder = folder || '';
    captionEl.dataset.filename = filename || '';
    const isEdit = document.body.classList.contains('edit-mode');
    renderCaptionParagraphs(captionEl, getCaptionFromManifest(folder, filename));
    if (!isEdit && folder && filename && !projectManifestCache[folder]) {
      loadProjectManifest(folder).then(function () {
        if (captionEl.dataset.folder === folder && captionEl.dataset.filename === filename) {
          renderCaptionParagraphs(captionEl, getCaptionFromManifest(folder, filename));
        }
      });
    }
    if (isEdit && folder && filename) {
      captionEl.contentEditable = 'true';
      captionEl.oninput = function () {
        saveCaptionToManifest(folder, filename, readCaptionText(captionEl));
      };
    }

    // EXIF：从照片元素属性预先抽好的，直接显示（多行）
    exifEl.textContent = exifText || '';

    // 项目链接：仅在"今日选辑"打开的 lightbox 里显示，跳到对应项目页
    const linkEl = el.querySelector('.lightbox-project-link');
    if (linkEl) {
      const proj = (lbShowProjectLink && folder) ? FOLDER_TO_PROJECT[folder] : null;
      if (proj) {
        linkEl.innerHTML = '<a href="photo-' + proj.slug + '.html">' +
          '在「<span class="zh">' + proj.zh + '</span> · <span class="en">' + proj.en + '</span>」中查看 →</a>';
        linkEl.style.display = '';
      } else {
        linkEl.style.display = 'none';
        linkEl.innerHTML = '';
      }
    }

    el.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openLightbox(src, folder, filename, exifText) {
    lbList = [{ src: src, folder: folder, filename: filename, exif: exifText || '' }];
    lbIndex = 0;
    showLightbox(src, folder, filename, exifText);
  }

  function bindLightbox() {
    document.addEventListener('click', function (e) {
      const photo = e.target.closest('.jim-photo, #dailyStrip .daily-photo, .project-photo');
      if (!photo) return;
      const img = photo.querySelector('img');
      if (!img) return;
      e.preventDefault();

      const grid = photo.parentElement;

      // 首页选辑：用当前照片池的全部照片做翻页清单（可跨页翻）
      if (grid && grid.id === 'dailyStrip' && dailyShuffled.length > 0) {
        lbShowProjectLink = true;
        lbList = dailyShuffled.map(function (p) {
          return {
            src: p.src,
            filename: p.filename,
            folder: p.folder,
            exif: p.exif
          };
        });
        const fn = photo.dataset && photo.dataset.filename;
        lbIndex = lbList.findIndex(function (it) { return it.filename === fn; });
        if (lbIndex < 0) lbIndex = 0;
      } else {
        // 项目页 / Jim 板块：用 grid 内可见照片，不显示项目跳转链接
        lbShowProjectLink = false;
        const gridFolder = grid && grid.dataset && grid.dataset.folder ? grid.dataset.folder : null;
        const all = Array.from(grid.children).filter(function (p) {
          return !p.classList.contains('is-hidden') && p.querySelector('img');
        });
        lbList = all.map(function (p) {
          const f = gridFolder || (p.dataset && p.dataset.folder) || null;
          const itemImg = p.querySelector('img');
          return {
            src: p.getAttribute('href') || (itemImg ? itemImg.src : ''),
            filename: p.dataset && p.dataset.filename ? p.dataset.filename : null,
            folder: f,
            exif: getExifFromElement(p)
          };
        });
        lbIndex = all.indexOf(photo);
        if (lbIndex < 0) lbIndex = 0;
      }

      const cur = lbList[lbIndex];
      showLightbox(cur.src, cur.folder, cur.filename, cur.exif);
    });
  }

  // === 首页选辑：分页 + 渲染 ===
  // 每页固定铺满 3 行；张数不固定（取决于横竖比例），由 layout 后实际行数决定。
  // pageStarts[i] = 第 i 页在 dailyShuffled 中的起始下标。
  // 渲染完一页后会把 pageStarts[i+1] 写好（= 起始 + 实际显示张数），下一页就能续上。
  let pageIndex = 0;
  let pageStarts = [0];
  let dailyShuffled = [];
  let homeStockPromise = null;

  // 文件夹名 → 项目元信息（slug + 中英标题）
  const FOLDER_TO_PROJECT = {
    '2025 川西':              { slug: 'chuanxi',   zh: '川西',                en: 'Western Sichuan' },
    '2025  Java':             { slug: 'java',      zh: '爪哇',                en: 'Java' },
    '2025 Papua New Guinea':  { slug: 'png',       zh: '巴布亚新几内亚',      en: 'Papua New Guinea' },
    '2024 Japan':             { slug: 'japan',     zh: '日本',                en: 'Japan' },
    '2024 厄瓜多尔':          { slug: 'ecuador',   zh: '厄瓜多尔',            en: 'Ecuador' },
    '2024 Galapagos':         { slug: 'galapagos', zh: '加拉帕戈斯',          en: 'Galápagos' },
    '2023 Antarctica':        { slug: 'antarctic', zh: '南极半岛',            en: 'Antarctic Peninsula' },
    '2023 甘南':              { slug: 'gannan',    zh: '甘南',                en: 'Gannan' },
    '关于子峪':               { slug: 'daily',     zh: '关于子峪',            en: 'About Ziyu' }
  };
  function folderToProjectURL(folder) {
    const p = FOLDER_TO_PROJECT[folder];
    return p ? 'photo-' + p.slug + '.html' : 'photography.html';
  }

  function filenameFromURL(url) {
    if (!url) return '';
    try {
      const parsed = new URL(url, window.location.href);
      const leaf = parsed.pathname.split('/').pop() || '';
      return decodeURIComponent(leaf);
    } catch (e) {
      const leaf = url.split('/').pop() || '';
      try { return decodeURIComponent(leaf); }
      catch (err) { return leaf; }
    }
  }

  function thumbnailSrc(src) {
    if (!src || !/^Photos\//.test(src)) return src;
    return src
      .replace(/^Photos\//, 'Photos/thumbs/')
      .replace(/\.(jpe?g|png)$/i, '.webp');
  }

  function parseProjectPagePhotos(html, expectedFolder) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const grid = doc.querySelector('.project-grid[data-folder]');
    if (!grid) return [];
    const folder = grid.dataset.folder || expectedFolder;
    return Array.from(grid.querySelectorAll('.project-photo')).map(function (a) {
      const img = a.querySelector('img');
      const src = img ? (img.getAttribute('src') || '') : '';
      const href = a.getAttribute('href') || '';
      const photoSrc = src || href;
      if (!photoSrc) return null;
      return {
        src: photoSrc,
        folder: folder,
        filename: (a.dataset && a.dataset.filename) || filenameFromURL(photoSrc),
        exif: (a.dataset && a.dataset.exif) || a.getAttribute('data-exif') || ''
      };
    }).filter(Boolean);
  }

  async function applyManifestToPhotoList(folder, photos) {
    const manifest = await loadProjectManifest(folder);
    if (!manifest) return photos;

    const hiddenSet = new Set(manifest.hidden || []);
    const byName = {};
    photos.forEach(function (photo) {
      if (photo.filename) byName[photo.filename] = photo;
    });

    const ordered = [];
    const used = new Set();
    if (Array.isArray(manifest.order)) {
      manifest.order.forEach(function (filename) {
        const photo = byName[filename];
        if (photo && !used.has(filename)) {
          ordered.push(photo);
          used.add(filename);
        }
      });
    }
    photos.forEach(function (photo) {
      const key = photo.filename || photo.src;
      if (!used.has(key)) {
        ordered.push(photo);
        used.add(key);
      }
    });

    return ordered.filter(function (photo) {
      return !hiddenSet.has(photo.filename);
    });
  }

  async function loadProjectPageStock(folder) {
    const res = await fetch(folderToProjectURL(folder), { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load project page: ' + folder);
    const html = await res.text();
    const photos = parseProjectPagePhotos(html, folder);
    return applyManifestToPhotoList(folder, photos);
  }

  function loadHomeStock() {
    if (homeStockPromise) return homeStockPromise;
    homeStockPromise = Promise.all(Object.keys(FOLDER_TO_PROJECT).map(function (folder) {
      return loadProjectPageStock(folder).catch(function () { return []; });
    })).then(function (lists) {
      const seen = new Set();
      const photos = [];
      lists.flat().forEach(function (photo) {
        const key = (photo.folder || '') + '\n' + (photo.filename || photo.src);
        if (!seen.has(key)) {
          seen.add(key);
          photos.push(photo);
        }
      });
      return photos.length ? photos : STOCK;
    });
    return homeStockPromise;
  }

  // 把照片列表渲染到指定 grid 元素里（不动 pageIndex / pageStarts），返回实际显示张数
  function renderStripInto(strip, startIdx, total) {
    const batch = Math.min(total, Math.max(12, getDailyEstimatedVisibleCount() + 8));
    const slice = [];
    for (let i = 0; i < batch; i++) {
      slice.push(dailyShuffled[(startIdx + i) % total]);
    }
    strip.innerHTML = '';
    slice.forEach(function (p) {
      const a = document.createElement('a');
      a.className = 'daily-photo';
      a.href = folderToProjectURL(p.folder);
      if (p.folder)   a.dataset.folder = p.folder;
      if (p.filename) a.dataset.filename = p.filename;
      if (p.exif)     a.dataset.exif = p.exif;
      const img = document.createElement('img');
      img.src = thumbnailSrc(p.src);
      img.alt = '';
      img.decoding = 'async';
      a.appendChild(img);
      strip.appendChild(a);
    });
    return loadAllImages(Array.from(strip.children)).then(function () {
      layoutJustified(strip, getDailyHeight(strip), getDailyGap());
      return keepFirstNRows(strip, 3);
    });
  }

  function renderHomeStripPage() {
    const strip = document.getElementById('dailyStrip');
    if (!strip) return Promise.resolve();
    const total = dailyShuffled.length;
    if (total === 0) return Promise.resolve();
    if (pageIndex < 0) pageIndex = 0;
    const startIdx = pageStarts[pageIndex] || 0;
    return renderStripInto(strip, startIdx, total).then(function (visibleCount) {
      if (visibleCount > 0) {
        pageStarts[pageIndex + 1] = (startIdx + visibleCount) % total;
      }
    });
  }

  // 直接给 track 锁一个足够装下任何 3 行布局的固定高度，永远不变。
  // 箭头作为 wrap 的 top: 50% 子元素，绝对不会再移动。
  // 部分内容矮的页面下面会有些空白——这是稳定换 jiggle 的代价，值得。
  let lockedTrackHeight = 0;
  function lockTrackHeight() {
    if (lockedTrackHeight > 0) return;  // 只锁一次
    const track = document.querySelector('.daily-grid-track');
    const strip = document.getElementById('dailyStrip');
    if (!track || !strip) return;
    // 在第一页测量值基础上加 40px 小 buffer，应付不同页 row 高度差异
    // （之前是 3 行 × target × 1.3 太肥，下面留太多空白）
    lockedTrackHeight = strip.offsetHeight + 40;
    track.style.height = lockedTrackHeight + 'px';
  }

  // 双 grid 推拉式翻页 + 循环翻页（首尾互通）
  // track 高度在 init 时就锁死，slide 期间完全不动 → 箭头永远不挪
  let isSliding = false;
  function estimatedTotalPages() {
    return Math.max(1, Math.ceil(dailyShuffled.length / getDailyEstimatedVisibleCount()));
  }
  async function slideHomeStrip(direction) {
    if (isSliding) return;

    const track = document.querySelector('.daily-grid-track');
    const oldStrip = document.getElementById('dailyStrip');
    if (!track || !oldStrip) return;
    const total = dailyShuffled.length;
    if (total === 0) return;

    isSliding = true;

    // 循环翻页：‹ 从第 0 页 → 最后一页；› 从最后一页 → 第 0 页
    const totalPages = estimatedTotalPages();
    let newPageIndex = pageIndex + direction;
    if (newPageIndex < 0) newPageIndex = totalPages - 1;
    if (newPageIndex >= totalPages) newPageIndex = 0;

    // 拿这一页在 dailyShuffled 中的起点
    let newStartIdx = pageStarts[newPageIndex];
    if (newStartIdx === undefined) {
      // 跳到了从未渲染过的页（比如刚回绕过来），按估算锚定起点
      newStartIdx = (newPageIndex * getDailyEstimatedVisibleCount()) % total;
      pageStarts[newPageIndex] = newStartIdx;
    }

    // 新 grid 先在屏外（off-screen）准备好
    const newStrip = document.createElement('div');
    newStrip.className = 'daily-grid';
    newStrip.style.position = 'absolute';
    newStrip.style.top = '0';
    newStrip.style.left = '0';
    newStrip.style.right = '0';
    newStrip.style.transform = 'translateX(' + (direction * 100) + '%)';
    track.appendChild(newStrip);

    // 旧 grid 也改绝对定位
    oldStrip.style.position = 'absolute';
    oldStrip.style.top = '0';
    oldStrip.style.left = '0';
    oldStrip.style.right = '0';

    // 渲染新页（等图加载完）
    const visibleCount = await renderStripInto(newStrip, newStartIdx, total);

    await new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); });

    // 只动 transform，不动 track 高度
    const ease = 'cubic-bezier(.55,0,.1,1)';
    oldStrip.style.transition = 'transform 0.55s ' + ease;
    newStrip.style.transition = 'transform 0.55s ' + ease;
    oldStrip.style.transform = 'translateX(' + (-direction * 100) + '%)';
    newStrip.style.transform = 'translateX(0)';

    await new Promise(function (r) { setTimeout(r, 560); });

    // 收尾：删旧、新 grid 接管 #dailyStrip 身份，保留 absolute 状态
    oldStrip.remove();
    newStrip.id = 'dailyStrip';
    newStrip.style.transition = '';
    newStrip.style.transform = '';

    pageIndex = newPageIndex;
    if (visibleCount > 0) {
      const nextStart = (newStartIdx + visibleCount) % total;
      // 只在沿正向链时记录下一页（避免覆盖估算值）
      if (pageStarts[newPageIndex + 1] === undefined) {
        pageStarts[newPageIndex + 1] = nextStart;
      }
    }

    isSliding = false;
  }

  function initHomeStrip() {
    const strip = document.getElementById('dailyStrip');
    if (!strip) return;

    const dateEl = document.getElementById('stripDate');
    if (dateEl) dateEl.textContent = fmtDate();

    const seed = todaySeed();
    const rng = mulberry32(seed);
    loadHomeStock().then(function (stock) {
      dailyShuffled = shuffle(stock, rng);
      pageIndex = 0;
      pageStarts = [0];
      lockedTrackHeight = 0;
      return renderHomeStripPage().then(lockTrackHeight);
    });

    const next = document.getElementById('dailyNext');
    if (next) {
      next.addEventListener('click', function () {
        slideHomeStrip(1);
      });
    }
    const prev = document.getElementById('dailyPrev');
    if (prev) {
      prev.addEventListener('click', function () {
        slideHomeStrip(-1);
      });
    }
  }

  // ============ 项目页：清单管理（顺序 + 封面） ============
  // 服务器上的 _order.json 作为基准；浏览器 localStorage 里的字段会覆盖，
  // 这样新写的注释 / 隐藏 / 顺序 立即生效，避免被 fetch 回来的旧文件盖掉。
  function manifestKey(folder) { return 'photoOrder:' + folder; }

  function isPlaceholderIntro(text) {
    return typeof text === 'string' &&
      (text.indexOf('这段由你来写') !== -1 || text.indexOf('150-300 字关于这趟旅行') !== -1);
  }

  function cleanManifestIntro(manifest) {
    if (!manifest) return null;
    const out = Object.assign({}, manifest);
    if (isPlaceholderIntro(out.intro)) delete out.intro;
    if (isPlaceholderIntro(out.intro_en)) delete out.intro_en;
    return out;
  }

  function mergeManifest(server, local) {
    server = cleanManifestIntro(server);
    local = cleanManifestIntro(local);
    if (!local) return server || null;
    if (!server) return local;
    const out = Object.assign({}, server);
    if (local.thumbnail) out.thumbnail = local.thumbnail;
    if (local.intro) out.intro = local.intro;
    if (local.intro_en) out.intro_en = local.intro_en;
    if (Array.isArray(local.order) && local.order.length) out.order = local.order;
    if (Array.isArray(local.hidden)) out.hidden = local.hidden;
    if (server.captions || local.captions) {
      out.captions = Object.assign({}, server.captions || {}, local.captions || {});
    }
    return out;
  }

  async function loadProjectManifest(folder) {
    if (!folder) return null;
    if (projectManifestPromises[folder]) return projectManifestPromises[folder];
    projectManifestPromises[folder] = (async function () {
      let server = null, local = null;
      try {
        const url = 'Photos/' + encodeURIComponent(folder) + '/_order.json';
        const res = await fetch(url);
        if (res.ok) server = await res.json();
      } catch (e) { /* 跨 file:// 协议会失败，回落 */ }
      try {
        const saved = localStorage.getItem(manifestKey(folder));
        if (saved) local = JSON.parse(saved);
      } catch (e) {}
      const manifest = mergeManifest(server, local);
      if (manifest) projectManifestCache[folder] = manifest;
      return manifest;
    })();
    return projectManifestPromises[folder];
  }

  function saveProjectManifestLocal(folder, manifest) {
    try {
      localStorage.setItem(manifestKey(folder), JSON.stringify(manifest));
      projectManifestCache[folder] = mergeManifest(projectManifestCache[folder], manifest) || manifest;
      projectManifestPromises[folder] = Promise.resolve(projectManifestCache[folder]);
    }
    catch (e) {}
  }

  // 按 manifest 重排 grid 内的子元素（用 data-filename 做匹配）
  // - 在 order 里的：按 order 顺序显示
  // - 在 hidden 里的：明确标记 is-hidden（用户点过 ✕）
  // - 不在 order 也不在 hidden（= 新加的照片）：默认显示在末尾
  function applyOrder(grid, order, hidden) {
    order = order || [];
    hidden = hidden || [];
    const hiddenSet = new Set(hidden);

    const byName = {};
    Array.from(grid.children).forEach(function (el) {
      const fn = el.dataset && el.dataset.filename;
      if (fn) byName[fn] = el;
    });
    // 先清掉所有 is-hidden（再根据 hidden 重设）
    Object.values(byName).forEach(function (el) {
      el.classList.remove('is-hidden');
      el.style.display = '';
    });

    // 按 order 重排（已知顺序的）
    order.forEach(function (fn) {
      const el = byName[fn];
      if (el) grid.appendChild(el);
    });

    // 不在 order 里的：默认显示在末尾，如果在 hidden 里就明确标 is-hidden
    Object.values(byName).forEach(function (el) {
      const fn = el.dataset.filename;
      if (order.indexOf(fn) === -1) {
        if (hiddenSet.has(fn)) el.classList.add('is-hidden');
        grid.appendChild(el);
      }
    });
  }

  // 标记封面
  function applyThumbHighlight(grid, thumbFilename) {
    Array.from(grid.children).forEach(function (el) {
      if (el.dataset && el.dataset.filename === thumbFilename) {
        el.classList.add('is-thumb');
      } else {
        el.classList.remove('is-thumb');
      }
    });
  }

  function layoutProjectGrid(grid) {
    if (!grid) return;
    layoutJustified(grid, getProjectHeight(), 4);

    // 老项目页如果没有 width/height 属性，等图片加载后再补排一次。
    const needsLoad = Array.from(grid.children).some(function (photo) {
      const img = photo.querySelector('img');
      return img && !getImageAspect(img);
    });
    if (needsLoad) {
      loadAllImages(Array.from(grid.children)).then(function () {
        layoutJustified(grid, getProjectHeight(), 4);
      });
    }
  }

  async function initProjectGrid(grid) {
    const folder = grid.dataset.folder;
    const manifest = await loadProjectManifest(folder);
    if (manifest) {
      if (manifest.order) applyOrder(grid, manifest.order, manifest.hidden || []);
      if (manifest.thumbnail) applyThumbHighlight(grid, manifest.thumbnail);
      if (manifest.intro) {
        const introEl = document.querySelector('.project-intro .intro-zh');
        if (introEl) introEl.innerText = manifest.intro;
      }
      if (manifest.intro_en) {
        const introEnEl = document.querySelector('.project-intro .intro-en');
        if (introEnEl) introEnEl.innerText = manifest.intro_en;
      }
    }
    layoutProjectGrid(grid);

    const params = new URLSearchParams(location.search);
    const editMode = params.has('edit');
    const captionsMode = params.has('captions');
    if (captionsMode) {
      enterCaptionsMode(grid, folder, manifest);
    } else if (editMode) {
      try {
        await loadSortableJS();
        enterEditMode(grid, folder, manifest);
      } catch (e) {
        alert('编辑器库加载失败（SortableJS）—— 可能是 CDN 在国内被墙。\n' +
              '告诉 Hangyu 把脚本改成本地加载就能用。');
      }
    } else {
      if (location.protocol === 'file:') addEditEntryLink();
    }
  }

  // ============ 批量注释编辑模式（?captions=1） ============
  function enterCaptionsMode(grid, folder, initialManifest) {
    document.body.classList.add('captions-mode');

    let manifest = initialManifest || projectManifestCache[folder] || {};
    try {
      const local = JSON.parse(localStorage.getItem(manifestKey(folder)) || '{}');
      manifest = mergeManifest(manifest, local) || manifest;
    } catch (e) {}
    const captions = manifest.captions || {};

    // 取所有照片（含 hidden 的也列出来，但视觉上灰显）
    const photos = Array.from(grid.children).filter(function (p) { return p.dataset && p.dataset.filename; });

    const editor = document.createElement('div');
    editor.className = 'captions-editor';

    photos.forEach(function (photo) {
      const filename = photo.dataset.filename;
      const img = photo.querySelector('img');
      const exifText = (photo.dataset.exif || '').replace(/&#10;/g, '\n');
      const isHidden = photo.classList.contains('is-hidden');
      const caption = captions[filename] || '';

      const row = document.createElement('div');
      row.className = 'captions-row' + (isHidden ? ' is-hidden-row' : '');

      const thumb = document.createElement('a');
      thumb.className = 'thumb';
      thumb.href = img ? img.src : '#';
      thumb.target = '_blank';
      const thumbImg = document.createElement('img');
      thumbImg.src = img ? img.src : '';
      thumbImg.alt = '';
      thumb.appendChild(thumbImg);

      const content = document.createElement('div');
      content.className = 'row-content';

      const filenameDiv = document.createElement('div');
      filenameDiv.className = 'filename';
      filenameDiv.textContent = filename;
      if (isHidden) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = '已隐藏';
        filenameDiv.appendChild(badge);
      }

      const ta = document.createElement('textarea');
      ta.dataset.filename = filename;
      ta.placeholder = '给这张照片写一段注释（可选）— 空一行 = 段落分隔';
      ta.value = caption;
      ta.addEventListener('input', function () {
        saveCaptionToManifest(folder, filename, ta.value);
      });

      const exifDiv = document.createElement('div');
      exifDiv.className = 'exif';
      exifDiv.textContent = exifText;

      content.appendChild(filenameDiv);
      content.appendChild(ta);
      content.appendChild(exifDiv);

      row.appendChild(thumb);
      row.appendChild(content);
      editor.appendChild(row);
    });

    grid.parentNode.insertBefore(editor, grid.nextSibling);

    // 工具栏
    const bar = document.createElement('div');
    bar.className = 'edit-bar';
    bar.innerHTML =
      '<span class="label">注释批量编辑 · <strong>' + folder + '</strong> · ' + photos.length + ' 张 · 输入即自动保存</span>' +
      '<a href="' + location.pathname + '?edit=1">回到网格编辑</a>' +
      '<a href="' + location.pathname + '">退出</a>';
    document.body.appendChild(bar);
  }

  function addEditEntryLink() {
    if (document.querySelector('.edit-entry')) return;
    const link = document.createElement('a');
    link.className = 'edit-entry';
    link.href = location.pathname + '?edit=1';
    link.textContent = '✎ 编辑此项目';
    link.title = '只在本地显示，部署上线后访客看不到';
    document.body.appendChild(link);
  }

  // 索引页：用每个项目的 manifest.thumbnail 更新卡片缩略图
  async function updateProjectCardThumbs() {
    const cards = document.querySelectorAll('.project-card[data-folder]');
    for (const card of cards) {
      const folder = card.dataset.folder;
      const manifest = await loadProjectManifest(folder);
      if (manifest && manifest.thumbnail) {
        const thumb = card.querySelector('.project-thumb');
        if (thumb) {
          const url = 'Photos/' + encodeURIComponent(folder) + '/' + encodeURIComponent(manifest.thumbnail);
          thumb.style.backgroundImage = "url('" + url + "')";
        }
      }
    }
  }

  // ============ 编辑模式（SortableJS + 导出 JSON） ============
  function loadSortableJS() {
    if (window.Sortable) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function enterEditMode(grid, folder, initialManifest) {
    document.body.classList.add('edit-mode');

    // ====== 1. 简介文字可编辑 ======
    const introEl = document.querySelector('.project-intro .intro-zh');
    const introEnEl = document.querySelector('.project-intro .intro-en');
    [introEl, introEnEl].forEach(function (el) {
      if (!el) return;
      el.setAttribute('contenteditable', 'true');
      el.classList.add('editable-text');
      let saveTimer;
      el.addEventListener('input', function () {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(autoSave, 400);
      });
    });

    // ====== 2. 给每张照片加 ★（封面）和 ✕（删除）按钮 ======
    Array.from(grid.children).forEach(function (el) {
      if (!el.dataset.filename) return;
      // ★ 设为封面
      const star = document.createElement('button');
      star.className = 'thumb-star';
      star.textContent = '★';
      star.title = '设为封面';
      star.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        applyThumbHighlight(grid, el.dataset.filename);
        autoSave();
      });
      el.appendChild(star);
      // ✕ 从网站隐藏 / ↺ 恢复（不动硬盘原图）
      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.title = '从网站隐藏（编辑模式下还能看到，可以点 ↺ 恢复）';
      del.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (el.classList.contains('is-hidden')) {
          el.classList.remove('is-hidden');
          const firstHidden = grid.querySelector('.is-hidden');
          if (firstHidden) grid.insertBefore(el, firstHidden);
          else grid.appendChild(el);
        } else {
          el.classList.add('is-hidden');
          grid.appendChild(el);
        }
        layoutProjectGrid(grid);
        autoSave();
      });
      el.appendChild(del);
    });

    // ====== 3. 拖拽排序（用 filter 排除按钮，避免点按钮也触发拖拽）======
    new window.Sortable(grid, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      filter: '.thumb-star, .delete-btn',
      preventOnFilter: true,
      onEnd: function (evt) {
        if (evt.item) evt.item.classList.remove('is-hidden');
        layoutProjectGrid(grid);
        autoSave();
      }
    });

    // ====== 4. 自动保存到 localStorage ======
    function getCurrentManifest() {
      // order = 可见照片的顺序，hidden = 用户主动 ✕ 的（明确分开）
      const order = Array.from(grid.children)
        .filter(function (el) { return !el.classList.contains('is-hidden') && el.dataset && el.dataset.filename; })
        .map(function (el) { return el.dataset.filename; });
      const hidden = Array.from(grid.children)
        .filter(function (el) { return el.classList.contains('is-hidden') && el.dataset && el.dataset.filename; })
        .map(function (el) { return el.dataset.filename; });
      const thumbEl = grid.querySelector('.project-photo.is-thumb');
      const thumbnail = thumbEl ? thumbEl.dataset.filename : (order[0] || '');
      const intro = introEl ? introEl.innerText.trim() : '';
      const intro_en = introEnEl ? introEnEl.innerText.trim() : '';
      let captions = Object.assign({}, initialManifest && initialManifest.captions ? initialManifest.captions : {});
      if (projectManifestCache[folder] && projectManifestCache[folder].captions) {
        captions = Object.assign(captions, projectManifestCache[folder].captions);
      }
      try {
        const prev = JSON.parse(localStorage.getItem(manifestKey(folder)) || '{}');
        if (prev.captions) captions = Object.assign(captions, prev.captions);
      } catch (e) {}
      return { version: 4, thumbnail: thumbnail, order: order, hidden: hidden, intro: intro, intro_en: intro_en, captions: captions };
    }
    function autoSave() {
      saveProjectManifestLocal(folder, getCurrentManifest());
    }

    // ====== 5. 底部工具栏 ======
    const bar = document.createElement('div');
    bar.className = 'edit-bar';
    bar.innerHTML =
      '<span class="label">编辑模式 · <strong>' + folder + '</strong> · 拖动排序 · ★ 设封面 · ✕ 隐藏 · 简介可直接改</span>' +
      '<a href="' + location.pathname + '?captions=1">批量注释</a>' +
      '<button id="editReset" style="background: transparent; color: var(--ink-soft); border: 1px solid var(--line);">重置时间序</button>' +
      '<button id="editExport">导出 _order.json</button>' +
      '<a href="' + location.pathname + '">退出编辑</a>';
    document.body.appendChild(bar);

    document.getElementById('editReset').addEventListener('click', function () {
      if (!confirm('重置当前项目的照片顺序为「按拍摄时间从早到晚」？\n（注释、封面、简介都会保留）')) return;
      const key = manifestKey(folder);
      let m = {};
      try { m = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
      delete m.order;
      delete m.hidden;
      localStorage.setItem(key, JSON.stringify(m));
      location.reload();
    });

    document.getElementById('editExport').addEventListener('click', function () {
      const m = getCurrentManifest();
      const blob = new Blob([JSON.stringify(m, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '_order.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      alert('已下载 _order.json\n\n请把它放进：\nPhotos/' + folder + '/\n文件夹（覆盖旧版即可）。\n\n上线后所有访客都会按你的顺序、隐藏选择和文字看到这页。');
    });
  }

  // ============ 积木页：清单 + 编辑模式 + 批量注释 ============
  // 跟项目页共用同一套 manifest（key = 'photoOrder:Jim'），所以 lightbox 里的 EXIF
  // 显示和注释保存都自动生效，不用额外接线。
  const JIM_FOLDER = 'Jim';

  function applyJimManifest(grid, manifest) {
    if (!manifest) return;
    const photos = Array.from(grid.children).filter(function (el) {
      return el.dataset && el.dataset.filename;
    });
    const byName = {};
    photos.forEach(function (el) { byName[el.dataset.filename] = el; });

    const hiddenSet = new Set(manifest.hidden || []);
    photos.forEach(function (el) {
      if (hiddenSet.has(el.dataset.filename)) el.classList.add('is-hidden');
      else el.classList.remove('is-hidden');
    });

    if (Array.isArray(manifest.order) && manifest.order.length) {
      // 1) 按存档 order 收集已经存在的可见照片
      const inOrder = new Set(manifest.order);
      const visibleSeq = [];
      manifest.order.forEach(function (fn) {
        const el = byName[fn];
        if (el && !el.classList.contains('is-hidden')) visibleSeq.push(el);
      });

      // 2) 找出新照片（不在 order 里、未隐藏）
      const newPhotos = photos.filter(function (el) {
        return !inOrder.has(el.dataset.filename) && !el.classList.contains('is-hidden');
      });

      // 3) 把新照片按 data-date（YYYY.MM.DD，可直接字典序比较）插到 visibleSeq
      //    的对应位置——找到第一个比新照片"更晚"的 anchor，新照片插它前面
      newPhotos.forEach(function (newEl) {
        const newDate = newEl.dataset.date || '';
        let insertIdx = visibleSeq.length;  // 默认追加到末尾（如果它是最新的）
        for (let i = 0; i < visibleSeq.length; i++) {
          const itDate = visibleSeq[i].dataset.date || '';
          if (itDate > newDate) { insertIdx = i; break; }
        }
        visibleSeq.splice(insertIdx, 0, newEl);
      });

      // 4) 把可见序列、隐藏照片依次 append 回 grid
      visibleSeq.forEach(function (el) { grid.appendChild(el); });
      photos.forEach(function (el) {
        if (el.classList.contains('is-hidden')) grid.appendChild(el);
      });
    }
  }

  async function initJimGrid(grid) {
    const manifest = await loadProjectManifest(JIM_FOLDER);
    applyJimManifest(grid, manifest);

    const params = new URLSearchParams(location.search);
    const editMode = params.has('edit');
    const captionsMode = params.has('captions');

    if (captionsMode) {
      // 直接复用项目页的批量注释模式（按 folder 区分 manifest）
      enterCaptionsMode(grid, JIM_FOLDER, manifest);
      return;
    }

    if (editMode) {
      try {
        await loadSortableJS();
        enterJimEditMode(grid, manifest || {});
      } catch (e) {
        alert('编辑器库加载失败（SortableJS）。');
      }
    } else {
      if (location.protocol === 'file:') {
        const link = document.createElement('a');
        link.className = 'edit-entry';
        link.href = location.pathname + '?edit=1';
        link.textContent = '✎ 编辑积木';
        link.title = '只在本地显示，部署上线后访客看不到';
        document.body.appendChild(link);
      }
    }
    layoutJimGrid(grid);
  }

  function layoutJimGrid(grid) {
    if (!grid) return;
    layoutJustified(grid, getJimHeight(), 4);

    const needsLoad = Array.from(grid.children).some(function (photo) {
      const img = photo.querySelector('img');
      return img && !getImageAspect(img);
    });
    if (needsLoad) {
      loadAllImages(Array.from(grid.children)).then(function () {
        layoutJustified(grid, getJimHeight(), 4);
      });
    }
  }

  function enterJimEditMode(grid, initialManifest) {
    document.body.classList.add('edit-mode');

    // 每张加 ✕（隐藏 / 恢复）
    Array.from(grid.children).forEach(function (el) {
      if (!el.dataset.filename) return;
      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.title = '从网站隐藏（编辑模式下仍可见，可恢复）';
      del.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (el.classList.contains('is-hidden')) {
          el.classList.remove('is-hidden');
          const firstHidden = grid.querySelector('.is-hidden');
          if (firstHidden) grid.insertBefore(el, firstHidden);
          else grid.appendChild(el);
        } else {
          el.classList.add('is-hidden');
          grid.appendChild(el);
        }
        layoutJustified(grid, getJimHeight(), 4);
        autoSave();
      });
      el.appendChild(del);
    });

    new window.Sortable(grid, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      filter: '.delete-btn',
      preventOnFilter: true,
      onEnd: function (evt) {
        if (evt.item) evt.item.classList.remove('is-hidden');
        layoutJustified(grid, getJimHeight(), 4);
        autoSave();
      }
    });

    function getCurrentManifest() {
      const order = Array.from(grid.children)
        .filter(function (el) { return !el.classList.contains('is-hidden') && el.dataset && el.dataset.filename; })
        .map(function (el) { return el.dataset.filename; });
      const hidden = Array.from(grid.children)
        .filter(function (el) { return el.classList.contains('is-hidden') && el.dataset && el.dataset.filename; })
        .map(function (el) { return el.dataset.filename; });
      // 保留已存在的 captions（批量注释里写的不能被排序覆盖）
      let captions = Object.assign({}, initialManifest && initialManifest.captions ? initialManifest.captions : {});
      if (projectManifestCache[JIM_FOLDER] && projectManifestCache[JIM_FOLDER].captions) {
        captions = Object.assign(captions, projectManifestCache[JIM_FOLDER].captions);
      }
      try {
        const prev = JSON.parse(localStorage.getItem(manifestKey(JIM_FOLDER)) || '{}');
        if (prev.captions) captions = Object.assign(captions, prev.captions);
      } catch (e) {}
      return { version: 4, order: order, hidden: hidden, captions: captions };
    }
    function autoSave() {
      saveProjectManifestLocal(JIM_FOLDER, getCurrentManifest());
    }

    const bar = document.createElement('div');
    bar.className = 'edit-bar';
    bar.innerHTML =
      '<span class="label">编辑模式 · <strong>积木</strong> · 拖动排序 · ✕ 隐藏 · 点开照片可写注释 · 自动保存</span>' +
      '<a href="' + location.pathname + '?captions=1">批量注释</a>' +
      '<button id="jimReset" style="background: transparent; color: var(--ink-soft); border: 1px solid var(--line);">重置时间序</button>' +
      '<button id="jimExport">导出 _order.json</button>' +
      '<a href="' + location.pathname + '">退出编辑</a>';
    document.body.appendChild(bar);

    document.getElementById('jimReset').addEventListener('click', function () {
      if (!confirm('重置积木的照片顺序为「按拍摄时间从早到晚」？\n（注释会保留，但隐藏的照片会全部恢复）')) return;
      const key = manifestKey(JIM_FOLDER);
      let m = {};
      try { m = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
      delete m.order;
      delete m.hidden;
      localStorage.setItem(key, JSON.stringify(m));
      location.reload();
    });

    document.getElementById('jimExport').addEventListener('click', function () {
      const m = getCurrentManifest();
      const blob = new Blob([JSON.stringify(m, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '_order.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      alert('已下载 _order.json\n\n请把它放进：\nPhotos/Jim/\n文件夹（覆盖旧版即可）。\n\n上线后所有访客都会按你的顺序、隐藏选择和注释看到这页。');
    });
  }

  // ============ 通用页面文字编辑系统 ============
  // 一份 selectors 列表覆盖所有"可改的文字"。?text-edit=1 进入编辑模式。
  // 编辑保存到 localStorage，页面加载时自动应用——这样部署上线之前你的修改一直在。
  // 上线时要把改动落到 HTML：编辑模式下点"导出 JSON" 拿到改动列表，手动改 HTML 即可。
  const TEXT_EDIT_SELECTORS = [
    '.page-head h1 .zh',
    '.page-head h1 .en',
    '.page-head .lede',
    '.page-head .lede-en',
    '.project-head h1 .zh',
    '.project-head h1 .en',
    '.project-head .meta',
    '.strip-label',
    '.intro-zh',
    '.intro-en',
    '.film-info h3',
    '.film-info .meta',
    '.film-info .excerpt',
    '.about-bio section h2',
    '.about-bio section p',
    '.placeholder-note p'
  ];

  function pageEditsKey() {
    const p = location.pathname.split('/').pop() || 'index.html';
    return 'pageEdits:' + p;
  }
  function loadPageEdits() {
    try { return JSON.parse(localStorage.getItem(pageEditsKey()) || '{}'); }
    catch (e) { return {}; }
  }
  function savePageEdits(edits) {
    localStorage.setItem(pageEditsKey(), JSON.stringify(edits));
  }
  function getTextEditTargets() {
    const out = [];
    TEXT_EDIT_SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        out.push({ key: sel + '#' + i, el: el });
      });
    });
    return out;
  }
  function applyPageEdits() {
    const edits = loadPageEdits();
    if (!Object.keys(edits).length) return;
    getTextEditTargets().forEach(function (t) {
      if (edits[t.key] !== undefined) {
        t.el.innerText = edits[t.key];
      }
    });
  }
  function enterTextEditMode() {
    document.body.classList.add('text-edit-mode');
    const edits = loadPageEdits();
    let saveTimer;

    getTextEditTargets().forEach(function (t) {
      t.el.setAttribute('contenteditable', 'true');
      t.el.classList.add('editable-text');
      t.el.addEventListener('input', function () {
        edits[t.key] = t.el.innerText;
        clearTimeout(saveTimer);
        saveTimer = setTimeout(function () { savePageEdits(edits); }, 400);
      });
    });

    const bar = document.createElement('div');
    bar.className = 'edit-bar';
    bar.innerHTML =
      '<span class="label">文字编辑模式 · 点击文字直接修改 · 自动保存到本地</span>' +
      '<button id="textEditExport">导出 JSON</button>' +
      '<button id="textEditReset" style="background: transparent; color: var(--ink-soft); border: 1px solid var(--line);">重置当前页</button>' +
      '<a href="' + location.pathname + '">退出</a>';
    document.body.appendChild(bar);

    document.getElementById('textEditExport').addEventListener('click', function () {
      const blob = new Blob([JSON.stringify(edits, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'texts-' + (location.pathname.split('/').pop() || 'index.html') + '.json';
      a.click();
    });
    document.getElementById('textEditReset').addEventListener('click', function () {
      if (!confirm('清空当前页所有文字编辑，回到 HTML 原始版本？')) return;
      localStorage.removeItem(pageEditsKey());
      location.reload();
    });
  }
  function addTextEditEntry() {
    if (document.querySelector('.text-edit-entry')) return;
    const link = document.createElement('a');
    link.className = 'text-edit-entry';
    link.href = location.pathname + '?text-edit=1';
    link.textContent = '✎ 编辑文字';
    link.title = '只在本地显示，部署上线后访客看不到';
    document.body.appendChild(link);
  }

  // ============ 给文章卡片注入封面图（writing.html 列表 + 首页文字模块都用）============
  async function setupWritingCovers() {
    // 同时覆盖：writing.html 完整列表 + index.html 首页"文字"预览
    const cards = document.querySelectorAll('.writing-list .article-card, .preview .article-list .article-card');
    if (!cards.length) return;

    // 读位置元数据（cover-editor.html 拖动时写入）
    let positions = {};
    try {
      const res = await fetch('Writing/covers/_positions.json?_=' + Date.now());
      if (res.ok) positions = await res.json();
    } catch (e) {}

    cards.forEach(function (card) {
      const link = card.querySelector('a');
      if (!link) return;
      // 从 href 解析 stem
      const href = link.getAttribute('href') || '';
      const m = href.match(/article\/(.+)\.html$/);
      if (!m) return;
      const stem = decodeURIComponent(m[1]);

      // 把现有 date / h3 / excerpt 包到 .card-text 里；如果生成器已经包过，就直接复用。
      let text = link.querySelector(':scope > .card-text');
      if (!text) {
        const existing = Array.from(link.children).filter(function (el) {
          return !el.classList.contains('card-cover');
        });
        text = document.createElement('div');
        text.className = 'card-text';
        existing.forEach(function (el) { text.appendChild(el); });
      }

      // 创建或复用 cover 占位
      let cover = link.querySelector(':scope > .card-cover');
      if (!cover) {
        cover = document.createElement('div');
        cover.className = 'card-cover';
      }
      let img = cover.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        cover.appendChild(img);
      }
      img.alt = '';
      img.loading = 'lazy';

      // 试 jpg/jpeg/png 顺序加载
      const exts = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
      let extIdx = 0;
      function tryNext() {
        if (extIdx >= exts.length) {
          card.classList.add('no-cover');
          img.removeAttribute('src');
          img.style.display = 'none';
          return;
        }
        img.style.display = '';
        img.src = 'Writing/covers/' + encodeURIComponent(stem) + '.' + exts[extIdx];
        extIdx++;
      }
      img.onerror = tryNext;
      img.onload = function () {
        const pos = positions[stem];
        if (pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
          img.style.objectPosition = (pos.x * 100) + '% ' + (pos.y * 100) + '%';
        }
      };
      if (img.getAttribute('src')) {
        if (img.complete && img.naturalWidth > 0) {
          img.onload();
        } else if (img.complete) {
          card.classList.add('no-cover');
          img.removeAttribute('src');
          img.style.display = 'none';
        }
      } else {
        tryNext();
      }

      // 组装：cover 在前、text 在后
      link.prepend(cover);
      if (!text.parentElement || text.parentElement !== link) {
        link.appendChild(text);
      }
    });
  }

  function setupAboutLanguageSwitch() {
    const root = document.querySelector('[data-lang-switch="about"]');
    if (!root) return;

    const buttons = Array.from(root.querySelectorAll('[data-lang]'));
    const panels = Array.from(root.querySelectorAll('[data-lang-panel]'));

    function show(lang) {
      buttons.forEach(function (button) {
        const active = button.dataset.lang === lang;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.langPanel !== lang;
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        show(button.dataset.lang);
      });
    });
  }

  function init() {
    // 先应用持久化的文字编辑（在任何模式下都生效）
    applyPageEdits();

    initHomeStrip();
    setupAboutLanguageSwitch();
    const jimGrid = document.querySelector('.jim-grid');
    if (jimGrid) {
      initJimGrid(jimGrid);
    }
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
      initProjectGrid(projectGrid);
    }
    if (document.querySelector('.project-card[data-folder]')) {
      updateProjectCardThumbs();
    }
    if (document.querySelector('.writing-list, .preview .article-list')) {
      setupWritingCovers();
    }
    bindLightbox();

    // ?text-edit=1 → 进入文字编辑模式；否则在 file:// 本地预览时显示入口
    const params = new URLSearchParams(location.search);
    if (params.has('text-edit')) {
      enterTextEditMode();
    } else if (location.protocol === 'file:') {
      addTextEditEntry();
    }

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // 首页选辑：resize 时重置锁定值并重新渲染（保留旧 track 高度直到新值算出来，
        // 避免渲染期间 track 高度塌陷）
        if (document.getElementById('dailyStrip')) {
          lockedTrackHeight = 0;
          renderHomeStripPage().then(lockTrackHeight);
        }
        const jg = document.querySelector('.jim-grid');
        if (jg) layoutJimGrid(jg);
        const pg = document.querySelector('.project-grid');
        if (pg) layoutProjectGrid(pg);
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

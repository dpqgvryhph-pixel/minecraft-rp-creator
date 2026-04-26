# 🎮 Minecraft Resource Pack Creator

Professzionális Minecraft GUI textúra szerkesztő – kódolás nélkül.

## 🚀 Live Demo
Cloudflare Pages: `https://minecraft-rp-creator.pages.dev`

## ✨ Funkciók
- **Pixel-Perfect GUI Editor** – 256×256 px Canvas, Minecraft GUI maszkokkal
- **4 GUI maszk** – Inventory, Chest, Crafting Table, Furnace
- **Vizuális beállítások** – Opacity, Brightness, Contrast, Saturation
- **Transzformáció** – Pozicionálás, méretezés, forgatás
- **ZIP Export** – Teljes Minecraft mappastruktúra, auto pack.mcmeta
- **Verzió kompatibilitás** – 1.8.9-től 1.21-ig (pack_format auto)

## 🛠️ Technológia
- Vanilla HTML5 + Canvas API
- JSZip 3.x (kliensoldalas ZIP)
- Lucide Icons
- **Nincs szükség build toolra** – statikus fájl

## 📁 Deployment

### Cloudflare Pages (ajánlott)
1. Fork this repo
2. Cloudflare Dashboard → Pages → Create Project
3. Connect GitHub repo
4. Build settings: `none` (static HTML)
5. Output directory: `/` (root)

## pack_format Táblázat
| Verzió | pack_format |
|--------|-------------|
| 1.8.9 | 1 |
| 1.9–1.10 | 2 |
| 1.11–1.12 | 3 |
| 1.13–1.14 | 4 |
| 1.15–1.16.1 | 5 |
| 1.16.2–1.16.5 | 6 |
| 1.17–1.17.1 | 7 |
| 1.18–1.18.2 | 8 |
| 1.19–1.19.2 | 9 |
| 1.19.3–1.19.4 | 12 |
| 1.20–1.20.1 | 15 |
| 1.20.2–1.20.4 | 18 |
| 1.21+ | 34 |

## License
MIT – szabad kereskedelmi felhasználásra

# Minecraft Asset Evolution Guide (1.8.9 – 26.1.2)

Ez a dokumentum a Minecraft textúra- és fájlszerkezetének fejlődését foglalja össze a `mcasset.cloud` adatai alapján. Ez elengedhetetlen a pontos Resource Pack készítéshez, mivel a fájlok helye és neve drasztikusan változott az évek során.

---

## 1. Korszak: Legacy (1.8.9 és korábbiak)
Ebben az időszakban a fájlstruktúra még "lapos" volt, kevés alkönyvtárral.

### 📁 GUI / Konténerek
*   **Elérési út:** `assets/minecraft/textures/gui/container/`
*   **Jellemzők:** Minden egy helyen, viszonylag kevés fájl.
*   **Főbb fájlok:**
    *   `generic_54.png`: Ezt használták a Chest, Double Chest, Ender Chest és a Shulker Box számára is.
    *   `inventory.png`: A túlélő inventory.
    *   `villager.png`: A falusi kereskedés (később `villager2.png` lett).

### 📁 Itemek és Blokk Textúrák
*   **Itemek:** `assets/minecraft/textures/items/` (Többes szám: **items**)
*   **Blokkok:** `assets/minecraft/textures/blocks/` (Többes szám: **blocks**)

---

## 2. Korszak: "The Flattening" (1.13 – 1.19.4)
Ez volt a legnagyobb váltás a Minecraft történetében. A Mojang egységesítette az elnevezéseket és eltávolította a többes számot a mappanevekből.

### 📁 GUI Változások
*   A legtöbb GUI fájl megmaradt a `gui/container/` alatt, de megjelentek az újabb blokkokhoz tartozó textúrák (pl. `loom.png`, `cartography_table.png`, `grindstone.png`).
*   A falusi GUI neve `villager.png`-ről `villager2.png`-re változott.

### 📁 Item/Block Folder Rename
*   `textures/items/` ➡️ `textures/item/` (**egyes szám**)
*   `textures/blocks/` ➡️ `textures/block/` (**egyes szám**)
*   Rengeteg fájlnevet átneveztek (pl. `grass_top` ➡️ `grass_block_top`).

---

## 3. Korszak: Modern Era (1.20 – 1.21.x)
A Mojang elkezdett távolodni a nagy, egybefüggő "sheet" fájloktól az egyedi sprite-ok felé.

### 📁 GUI Sprites Bevezetése
*   **Új út:** `assets/minecraft/textures/gui/sprites/`
*   A `widgets.png` és `icons.png` elemei (gombok, szívek, éhségjelzők) különálló, apró PNG fájlokra bomlottak szét. Ez lehetővé teszi a pontosabb szerkesztést anélkül, hogy az egész fájlt újra kellene rajzolni.

### 📁 Környezet (Environment)
*   `textures/environment/clouds.png` (felhők)
*   `textures/environment/sun.png` / `moon_phases.png` (Nap és Hold fázisok)
*   `textures/environment/rain.png` / `snow.png`

---

## 4. Korszak: Future / Snapshot (2026 / 26.1.2)
A legújabb verziókban a "fő" GUI fájlok (mint a `generic_54.png`) kezdenek teljesen megszűnni, és helyüket a sprite-rendszer veszi át.

### 📁 GUI Teljes Szétbontása
*   **Elérési út:** `assets/minecraft/textures/gui/sprites/container/`
*   Már nem egyetlen nagy képet szerkesztünk, hanem mappákba rendezett elemeket:
    *   `/inventory/`
    *   `/furnace/`
    *   `/slot/` (az üres slotok most már külön sprite-ok!)
*   Ez azt jelenti, hogy a jövőben a Resource Pack készítőknek sokkal több kis fájlt kell kezelniük a korábbi 1-2 nagy fájl helyett.

---

## 🛠️ Összehasonlító Táblázat (Path Mapping)

| Elem | Legacy (1.8.9) | Modern (1.20.1) | Future (26.x) |
| :--- | :--- | :--- | :--- |
| **Blokkok** | `textures/blocks/*.png` | `textures/block/*.png` | `textures/block/*.png` |
| **Itemek** | `textures/items/*.png` | `textures/item/*.png` | `textures/item/*.png` |
| **Gombok** | `gui/widgets.png` | `gui/sprites/widget/*.png` | `gui/sprites/widget/*.png` |
| **Inventory** | `gui/container/inventory.png` | `gui/container/inventory.png` | `gui/sprites/container/inventory/` |
| **Chest (Entity)** | `entity/chest/normal.png` | `entity/chest/normal.png` | `entity/chest/normal.png` |
| **Ender Chest** | `entity/chest/ender.png` | `entity/chest/ender.png` | `entity/chest/ender.png` |

---

## 💡 Mit jelent ez a Resource Pack Creator számára?

1.  **Verzió-függő Export:** A programnak tudnia kell, hogy ha a felhasználó "1.8.9"-et választ, akkor a textúrákat a `textures/blocks/` mappába tegye, de ha "1.20"-at, akkor a `textures/block/` mappába.
2.  **Sprite támogatás:** A jövőben fel kell készíteni a CanvasEditor-t, hogy ne csak egyetlen nagy 256x256-os képet fogadjon, hanem képes legyen a kis sprite-okból összeállítani a GUI-t.
3.  **Különálló Chestek:** Bár a GUI szintjén sok chest ugyanazt a fájlt használja, az **Entity** szinten (amit a Texture Editorban kezeltünk) mindegyiknek saját fájlja van, amit külön kell kezelni.

> [!TIP]
> A `mcasset.cloud` használatával mindig ellenőrizhető az adott verzió pontos útvonala. A fejlesztés során javasolt a legújabb (26.1.2) és a legnépszerűbb (1.8.9, 1.20.1) verziókat alapul venni.

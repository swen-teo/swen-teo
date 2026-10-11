# Swen Teo · Portfolio

An interactive portfolio: a pastel desk with an old white MacBook on it. Click the MacBook (or any object on the desk) and it zooms into a Mac OS X Tiger-style desktop where each part of the portfolio is an app.

| App | Content |
| --- | --- |
| About This Swen | Profile, bio, education |
| iCal | Experience, filterable by Work / Leadership / Volunteering |
| iTunes | Projects with Cover Flow, playlists, search, liner notes and links |
| System Preferences | Skills, showing which projects used each one |
| Finder | Awards and competitions |
| Photo Booth | Camera (or uploaded photo) with the 16 original 2010 Instagram filters re-tuned to pastels, single shots or strips of four, lace / Aero / Polaroid frames, date stamp and charms. All processing is in the browser; nothing is uploaded. |
| iPod (Playlist) | Swen's Apple Music playlist, embedded |
| Mail | Compose a message that opens in the visitor's email app |

A looping background track plays through the official YouTube embed in the Now Playing widget. YouTube requires the player to stay visible (at least 200×200) while it plays, so hiding the widget pauses it. Browsers block sound until the visitor interacts, so it starts muted and unmutes on the first click. The track pauses while the Playlist window is open.

Deep links work: `#/mac/projects`, `#/mac/photobooth`, etc. `#/` is the desk.

## Run

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build
```

`dist/` is a static site (relative paths), so it can be uploaded to GitHub Pages, Netlify or Vercel as-is. The camera needs HTTPS, which all of those provide.

## Where things live

- `src/data/content.js`: all portfolio text (experience, projects, skills, awards). Edit this to update content.
- `src/desk/`: the desk scene and its objects (positions for landscape and portrait in `POS`).
- `src/mac/`: the desktop, windows, Dock and menu bar; each app is in `src/mac/apps/`.
- `src/lib/textures.js`: procedurally generated wood, linen, paper, brushed metal and grain.
- `src/lib/motifs.js`: generated SVG motifs (angel wing, rosettes, crocheted doily, lotus, charms).
- `src/music/`: the Now Playing widget and music state (track and playlist links are at the top of `MusicProvider.jsx`).
- `src/assets/swen.webp`: portrait used on the ID card, login screen, Polaroid and About window.
- `src/lib/filters.js` and `src/lib/booth.js`: Photo Booth filter pipeline and print composition.

Apart from the portrait, every texture and motif is drawn in code.

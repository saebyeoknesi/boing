---
name: boing
description: Install and configure boing, a small Chrome extension that replaces text on web pages with the user's own words. Use when the user asks to install boing, or wants a word on websites shown as another word.
---

# boing

1. Clone: `git clone https://github.com/hakgeumkim/boing ~/boing` (or the folder the user names).
2. Tell the user to open `chrome://extensions`, turn on Developer mode, click "Load unpacked" and choose that folder. Browser settings pages are the user's to click.
3. Rules live in the extension popup (toolbar icon): one row per "from → to". Samples: `Hello → Boing`, `안녕하세요 → 보잉하세요`. Add the user's own rules there, as the user asks.
4. Check: `node test.js` prints `ok`; open `test.html` and confirm the samples changed.

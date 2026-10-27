# boing

A tiny Chrome extension that replaces text on any web page with your own words. Button labels, `value` / `aria-label` / `title` attributes, and elements drawn later by single-page apps are covered. It only changes what you see; nothing else on the page changes.

Click the toolbar icon to edit the rules ("this text → that text"). Changes save right away (`chrome.storage.sync`) and apply to open pages. `+ Add` adds a rule, `×` removes one, `Reset` restores the samples (`Hello → Boing`, `안녕하세요 → 보잉하세요`).

## Install (unpacked)

1. Download or clone this repository.
2. Open `chrome://extensions`, turn on **Developer mode**.
3. **Load unpacked** → choose this folder.
4. Pin boing from the puzzle icon.

Agents: see [SKILL.md](SKILL.md).

## Test

`node test.js` (replacement logic), open `test.html` to check by eye.

---

웹페이지의 글자를 원하는 글자로 바꿔 주는 작은 크롬 확장이야. 아이콘을 눌러 규칙을 고치고, 설치는 위 순서대로 "압축해제된 확장 프로그램 로드".

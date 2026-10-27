// 페이지의 텍스트 노드와 버튼 속성을 규칙대로 바꾼다.
// 나중에 그려지는 버튼(SPA)도 MutationObserver 로 잡는다.
// 팝업에서 규칙을 고치면 storage.onChanged 로 바로 다시 적용한다.

const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);
const ATTRS = ["value", "aria-label", "title", "placeholder", "alt"];
const storage = typeof chrome !== "undefined" && chrome.storage ? chrome.storage.sync : null;

let compiled = compileRules(DEFAULT_RULES);

function fixText(node) {
  if (hasMatch(node.nodeValue, compiled)) node.nodeValue = boingText(node.nodeValue, compiled);
}

function fixAttrs(el) {
  if (!el.getAttribute) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v && hasMatch(v, compiled)) el.setAttribute(a, boingText(v, compiled));
  }
}

function skip(el) {
  return SKIP.has(el.tagName) || el.isContentEditable;
}

function walk(root) {
  if (root.nodeType === Node.TEXT_NODE) return fixText(root);
  if (root.nodeType !== Node.ELEMENT_NODE || skip(root)) return;
  fixAttrs(root);
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) =>
      n.nodeType === Node.ELEMENT_NODE && skip(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  let n;
  while ((n = tw.nextNode())) n.nodeType === Node.TEXT_NODE ? fixText(n) : fixAttrs(n);
}

function start() {
  walk(document.documentElement);
  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === "characterData") fixText(m.target);
      else if (m.type === "attributes") fixAttrs(m.target);
      else for (const n of m.addedNodes) walk(n);
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
  });
}

if (storage) {
  storage.get({ rules: DEFAULT_RULES }, ({ rules }) => {
    compiled = compileRules(rules);
    start();
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.rules) return;
    compiled = compileRules(changes.rules.newValue || []);
    walk(document.documentElement);
  });
} else {
  start();
}

// Pure functions. Take a rule list [{from, to}] and replace text.
// Spaces between the letters of `from` are ignored ("Hel lo" also matches "Hello").

const DEFAULT_RULES = [
  { from: "Hello", to: "Boing" },
  { from: "안녕하세요", to: "보잉하세요" },
];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function compileRules(rules) {
  return rules
    .filter((r) => r && r.from && r.from.trim())
    .map((r) => ({
      re: new RegExp(r.from.trim().split(/\s+/).join("").split("").map(escapeRe).join("\\s*"), "g"),
      to: r.to || "",
    }));
}

function hasMatch(s, compiled) {
  return compiled.some((c) => {
    c.re.lastIndex = 0;
    return c.re.test(s);
  });
}

function boingText(s, compiled) {
  for (const c of compiled) {
    c.re.lastIndex = 0;
    s = s.replace(c.re, c.to);
  }
  return s;
}

if (typeof module !== "undefined") module.exports = { DEFAULT_RULES, compileRules, hasMatch, boingText };

const assert = require("assert");
const { DEFAULT_RULES, compileRules, boingText, hasMatch } = require("./boing.js");

const c = compileRules(DEFAULT_RULES);
assert.strictEqual(boingText("Hello", c), "Boing");
assert.strictEqual(boingText("Say Hello!", c), "Say Boing!");
assert.strictEqual(boingText("Hel lo", c), "Boing");
assert.strictEqual(boingText("안녕하세요", c), "보잉하세요");
assert.strictEqual(boingText("안녕 하세요 여러분", c), "보잉하세요 여러분");
assert.strictEqual(hasMatch("Goodbye", c), false);
assert.strictEqual(hasMatch("Hello", c), true);
console.log("ok");

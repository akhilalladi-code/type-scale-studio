import test from "node:test";
import assert from "node:assert/strict";
import {
  generateScale, validateConfig, fluidClamp,
  exportCSS, exportFluidCSS, exportJSON, exportTailwind, exportSCSS, exportFigmaTokens, RATIOS
} from "../src/core.js";

test("generates a symmetrical scale around the base", () => {
  const { tokens } = generateScale({ base: 16, ratio: 1.25, steps: 3 });
  assert.equal(tokens.length, 6);
  assert.equal(tokens.find((item) => item.step === 0).px, 16);
  assert.equal(tokens.find((item) => item.step === 1).px, 20);
  assert.equal(tokens.find((item) => item.step === -1).px, 12.8);
});

test("converts pixels to rem using the browser root size", () => {
  const { tokens } = generateScale({ base: 20, ratio: 1.2, steps: 3 });
  assert.equal(tokens.find((item) => item.step === 0).rem, 1.25);
});

test("rejects invalid base size and ratio", () => {
  assert.throws(() => validateConfig({ base: 5 }), /Base size/);
  assert.throws(() => validateConfig({ ratio: 2 }), /Ratio/);
});

test("rejects invalid step count and viewport range", () => {
  assert.throws(() => validateConfig({ steps: 2 }), /Steps/);
  assert.throws(() => validateConfig({ minViewport: 1500, maxViewport: 1200 }), /Viewport/);
});

test("requires a safe CSS token prefix", () => {
  assert.throws(() => validateConfig({ prefix: "bad prefix" }), /Prefix/);
});

test("exports CSS variables with the selected prefix", () => {
  const output = exportCSS(generateScale({ prefix: "brand" }));
  assert.match(output, /--brand-base: 1rem;/);
});

test("exports fluid clamp values and a JSON token map", () => {
  const scale = generateScale();
  assert.match(fluidClamp(scale.tokens[0], scale.config), /^clamp\(/);
  assert.match(exportFluidCSS(scale), /clamp\(/);
  assert.equal(JSON.parse(exportJSON(scale)).prefix, "type");
});

test("exports a Tailwind fontSize extension", () => {
  assert.match(exportTailwind(generateScale()), /fontSize/);
});

test("supports named modular scale ratios",()=>{assert.ok(RATIOS.some(r=>r.name==="Golden Ratio"&&r.value===1.618));assert.ok(RATIOS.length>=8);});
test("fluid typography bounds are configurable and validated",()=>{const scale=generateScale({fluidMin:.8,fluidMax:1.2});assert.match(fluidClamp(scale.tokens.at(-1),scale.config),/^clamp\(/);assert.throws(()=>generateScale({fluidMin:1.3,fluidMax:1.1}),/Fluid bounds/);});
test("exports SCSS and Figma Tokens compatible JSON",()=>{const scale=generateScale();assert.match(exportSCSS(scale),/\$font-size-base/);const figma=JSON.parse(exportFigmaTokens(scale));assert.equal(figma.global["font-size-base"].type,"fontSizes");});

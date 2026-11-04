const DEFAULTS = Object.freeze({
  base: 16,
  ratio: 1.25,
  steps: 6,
  prefix: "type",
  minViewport: 360,
  maxViewport: 1440
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const round = (value, places = 3) => Number(value.toFixed(places));

function validateConfig(input = {}) {
  const config = { ...DEFAULTS, ...input };
  const base = Number(config.base);
  const ratio = Number(config.ratio);
  const steps = Number(config.steps);
  const minViewport = Number(config.minViewport);
  const maxViewport = Number(config.maxViewport);
  const prefix = String(config.prefix ?? "").trim();

  if (!Number.isFinite(base) || base < 8 || base > 48) throw new RangeError("Base size must be between 8px and 48px.");
  if (!Number.isFinite(ratio) || ratio < 1.067 || ratio > 1.618) throw new RangeError("Ratio must be between 1.067 and 1.618.");
  if (!Number.isInteger(steps) || steps < 3 || steps > 10) throw new RangeError("Steps must be an integer between 3 and 10.");
  if (!Number.isFinite(minViewport) || !Number.isFinite(maxViewport) || minViewport < 320 || maxViewport > 2560 || minViewport >= maxViewport) {
    throw new RangeError("Viewport range must be valid and increasing (320px–2560px).");
  }
  if (!/^[a-z][a-z0-9-]*$/.test(prefix)) throw new TypeError("Prefix must start with a lowercase letter and contain only lowercase letters, numbers, or hyphens.");

  return { base, ratio, steps, prefix, minViewport, maxViewport };
}

function generateScale(input = {}) {
  const config = validateConfig(input);
  const { base, ratio, steps } = config;
  const tokens = [];
  for (let step = -2; step <= steps; step += 1) {
    const value = base * Math.pow(ratio, step);
    tokens.push({
      step,
      name: step === 0 ? "base" : step < 0 ? `sm-${Math.abs(step)}` : `lg-${step}`,
      px: round(value, 3),
      rem: round(value / 16, 4)
    });
  }
  return { config, tokens };
}

function fluidClamp(token, config) {
  const min = token.px * 0.9;
  const max = token.px * 1.1;
  const slope = ((max - min) / (config.maxViewport - config.minViewport)) * 100;
  const intercept = min - (slope * config.minViewport) / 100;
  return `clamp(${round(min / 16, 4)}rem, ${round(intercept / 16, 4)}rem + ${round(slope, 4)}vw, ${round(max / 16, 4)}rem)`;
}

function exportCSS(scale) {
  const lines = [":root {"];
  for (const token of scale.tokens) lines.push(`  --${scale.config.prefix}-${token.name}: ${token.rem}rem;`);
  lines.push("}");
  return lines.join("\n");
}

function exportFluidCSS(scale) {
  const lines = [":root {"];
  for (const token of scale.tokens) lines.push(`  --${scale.config.prefix}-${token.name}: ${fluidClamp(token, scale.config)};`);
  lines.push("}");
  return lines.join("\n");
}

function exportJSON(scale) {
  const tokens = Object.fromEntries(scale.tokens.map((token) => [
    `${scale.config.prefix}-${token.name}`,
    { value: `${token.rem}rem`, px: token.px, step: token.step }
  ]));
  return JSON.stringify({ name: "Typography", prefix: scale.config.prefix, tokens }, null, 2);
}

function exportTailwind(scale) {
  const entries = scale.tokens.map((token) => `      '${token.name}': '${token.rem}rem'`).join(",\n");
  return `/** Add this to your Tailwind configuration */\nexport default {\n  theme: {\n    extend: {\n      fontSize: {\n${entries}\n      }\n    }\n  }\n};`;
}

export {
  DEFAULTS,
  validateConfig,
  generateScale,
  fluidClamp,
  exportCSS,
  exportFluidCSS,
  exportJSON,
  exportTailwind
};

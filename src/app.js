import {
  DEFAULTS, generateScale, exportCSS, exportFluidCSS, exportJSON, exportTailwind
} from "./core.js";

const $ = (id) => document.getElementById(id);
const inputs = ["base", "ratio", "steps", "prefix", "min-vw", "max-vw"];
const formats = {
  css: exportCSS,
  fluid: exportFluidCSS,
  json: exportJSON,
  tailwind: exportTailwind
};
let activeFormat = "css";
let latestOutput = "";

function readConfig() {
  return {
    base: Number($("base").value),
    ratio: Number($("ratio").value),
    steps: Number($("steps").value),
    prefix: $("prefix").value,
    minViewport: Number($("min-vw").value),
    maxViewport: Number($("max-vw").value)
  };
}

function render() {
  try {
    const scale = generateScale(readConfig());
    $("ratio-value").textContent = scale.config.ratio.toFixed(3);
    $("steps-value").textContent = scale.config.steps;
    $("scale-summary").textContent = `${scale.config.base}px base · ${scale.config.ratio.toFixed(3)} ratio`;
    $("specimen").innerHTML = scale.tokens.slice().reverse().map((token) => {
      const label = token.step === 0 ? "BASE" : token.step < 0 ? `-${Math.abs(token.step)}` : `+${token.step}`;
      return `<div class="specimen-row"><span class="specimen-meta"><b>${token.name}</b><small>${token.px}px / ${token.rem}rem</small></span><span class="specimen-text" style="font-size:${token.px}px">Aa <span>${label}</span></span></div>`;
    }).join("");
    latestOutput = formats[activeFormat](scale);
    $("export-code").textContent = latestOutput;
    $("copy-status").textContent = "";
    $("copy").textContent = "Copy code";
    document.querySelectorAll(".field-error").forEach((el) => el.remove());
  } catch (error) {
    $("copy-status").textContent = error.message;
    $("copy-status").classList.add("error");
  }
}

inputs.forEach((id) => $(id).addEventListener("input", render));

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    activeFormat = tab.dataset.format;
    document.querySelectorAll(".tab").forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    render();
  });
});

$("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(latestOutput);
    $("copy").textContent = "Copied ✓";
    $("copy-status").textContent = "Copied to clipboard.";
    $("copy-status").classList.remove("error");
  } catch {
    $("copy-status").textContent = "Clipboard access was blocked. Select the code and copy it manually.";
    $("copy-status").classList.add("error");
  }
});

$("reset").addEventListener("click", () => {
  $("base").value = DEFAULTS.base;
  $("ratio").value = DEFAULTS.ratio;
  $("steps").value = DEFAULTS.steps;
  $("prefix").value = DEFAULTS.prefix;
  $("min-vw").value = DEFAULTS.minViewport;
  $("max-vw").value = DEFAULTS.maxViewport;
  activeFormat = "css";
  document.querySelectorAll(".tab").forEach((tab) => {
    const selected = tab.dataset.format === "css";
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  render();
});

render();

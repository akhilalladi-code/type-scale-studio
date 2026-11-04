import { DEFAULTS, generateScale, exportCSS, exportFluidCSS, exportJSON, exportTailwind } from "./core.js";
export const STORAGE_KEY="tss-config-v1";
export const FONT_PAIRS=[
 {name:"Modern editorial",display:"Playfair Display",body:"DM Sans"},
 {name:"Geometric studio",display:"Manrope",body:"DM Sans"},
 {name:"Product minimal",display:"Inter",body:"Inter"},
 {name:"Contemporary",display:"Space Grotesk",body:"DM Sans"},
 {name:"Soft geometric",display:"Outfit",body:"Inter"},
 {name:"Classic contrast",display:"Playfair Display",body:"Inter"}
];
export function getConfig(){try{return {...DEFAULTS,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}}catch{return {...DEFAULTS}}}
export function setConfig(config){localStorage.setItem(STORAGE_KEY,JSON.stringify({...getConfig(),...config}));}
export function readQuery(){const p=new URLSearchParams(location.search);const c={};for(const k of ["base","ratio","steps","prefix","minViewport","maxViewport"])if(p.has(k))c[k]=Number(p.get(k));if(p.has("prefix"))c.prefix=p.get("prefix");return Object.keys(c).length?c:null}
export function scaleNow(config=getConfig()){return generateScale(config)}
export function shareUrl(config=getConfig()){const u=new URL(location.href);u.search="";for(const [k,v] of Object.entries(config))u.searchParams.set(k,String(v));return u.href}
export function copyText(text){return navigator.clipboard.writeText(text)}
export function exportFor(format,scale){return ({css:exportCSS,fluid:exportFluidCSS,json:exportJSON,tailwind:exportTailwind})[format](scale)}
export function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

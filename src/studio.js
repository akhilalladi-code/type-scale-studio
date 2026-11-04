import {DEFAULTS,generateScale,exportCSS,exportFluidCSS,exportJSON,exportTailwind,exportSCSS,exportFigmaTokens} from "./core.js";
export const STORAGE_KEY="tss-config-v1";
export const FONT_LIBRARY=[
{name:"Editorial pairing",display:"Playfair Display",body:"DM Sans",category:"Editorial"},
{name:"Modern editorial",display:"DM Serif Display",body:"Inter",category:"Editorial"},
{name:"Classic contrast",display:"Cormorant Garamond",body:"Manrope",category:"Editorial"},
{name:"Literary",display:"Lora",body:"Source Sans 3",category:"Editorial"},
{name:"Geometric studio",display:"Manrope",body:"DM Sans",category:"Geometric"},
{name:"Product minimal",display:"Inter",body:"Inter",category:"Minimal"},
{name:"Contemporary",display:"Space Grotesk",body:"DM Sans",category:"Geometric"},
{name:"Soft geometric",display:"Outfit",body:"Inter",category:"Geometric"},
{name:"Technical",display:"Space Grotesk",body:"IBM Plex Sans",category:"Technical"},
{name:"Developer",display:"IBM Plex Mono",body:"IBM Plex Sans",category:"Technical"},
{name:"Humanist",display:"DM Sans",body:"Source Sans 3",category:"Humanist"},
{name:"Friendly",display:"Nunito Sans",body:"Nunito Sans",category:"Humanist"},
{name:"Bold brand",display:"Archivo Black",body:"DM Sans",category:"Display"},
{name:"Expressive",display:"Bodoni Moda",body:"Inter",category:"Display"},
{name:"Rounded",display:"Outfit",body:"Nunito Sans",category:"Geometric"},
{name:"Neutral system",display:"Roboto",body:"Roboto",category:"Minimal"},
{name:"Swiss",display:"Helvetica",body:"Arial",category:"Minimal"},
{name:"Magazine",display:"DM Serif Display",body:"DM Sans",category:"Editorial"},
{name:"Modern grotesk",display:"Space Grotesk",body:"Inter",category:"Geometric"},
{name:"Warm classic",display:"Merriweather",body:"Lato",category:"Editorial"}
];
export const FONT_PAIRS=FONT_LIBRARY;
export function getConfig(){try{return {...DEFAULTS,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}}catch{return {...DEFAULTS}}}
export function setConfig(c){localStorage.setItem(STORAGE_KEY,JSON.stringify({...getConfig(),...c}));}
export function readQuery(){const p=new URLSearchParams(location.search),c={};for(const k of Object.keys(DEFAULTS))if(p.has(k))c[k]=k==="prefix"?p.get(k):Number(p.get(k));return Object.keys(c).length?c:null;}
export function scaleNow(c=getConfig()){return generateScale(c);}
export function shareUrl(c=getConfig()){const u=new URL("../generator/",location.href);u.search="";for(const [k,v] of Object.entries(c))u.searchParams.set(k,String(v));return u.href;}
export function copyText(t){return navigator.clipboard.writeText(t);}
export function exportFor(f,s){return ({css:exportCSS,fluid:exportFluidCSS,json:exportJSON,tailwind:exportTailwind,scss:exportSCSS,figma:exportFigmaTokens})[f](s);}
export function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
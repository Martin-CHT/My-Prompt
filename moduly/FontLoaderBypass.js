// ==UserScript==
// @name               FontLoaderBypass
// @namespace          http://github.com/0H4S
// @version            1.3
// @author             OHAS
// @description        Injeção de Fontes em Userscripts
// @license            CC-BY-NC-ND-4.0
// @copyright          2025-2026 OHAS. All Rights Reserved. (https://gist.github.com/0H4S/ae2fa82957a089576367e364cbf02438)
// ==/UserScript==


/**
 * Copyright Notice & Terms of Use
 * Copyright © 2025-2026 OHAS. All rights reserved.
 *
 * This software is the exclusive property of OHAS and is licensed for personal, non-commercial use only.
 *
 * You may:
 * - Install, use, and inspect the code for learning or personal purposes.
 *
 * You may not, without prior written authorization from OHAS:
 * - Copy, redistribute, or republish this software.
 * - Modify, sell, or use this software for commercial purposes.
 * - Create derivative works that distribute this code.
 *
 * By downloading, installing, executing, or in any way using this software, in whole or in part, you acknowledge that you have read, understood, and fully accepted the terms set forth herein. If you do not agree with any of the conditions described, do not use this software.
 * Any use, action, or purpose not expressly stated in this document shall be considered unauthorized. The absence of explicit mention does not imply the granting of permission.
 *
 * For questions, permission requests, or alternative licensing, please contact via
 * - GitHub:       https://github.com/0H4S
 * - Ko-fi:        https://ko-fi.com/ohas
 * - Greasy Fork:  https://greasyfork.org/users/1464180
 *
 * This software is provided “as is”, without warranties of any kind. Under no circumstances shall the author be held liable for any damages resulting from its use.
 */
 
!function(){"use strict";const t={xhr:"undefined"!=typeof GM_xmlhttpRequest?GM_xmlhttpRequest:"undefined"!=typeof GM?GM.xmlHttpRequest:null,listValues:"undefined"!=typeof GM_listValues?GM_listValues:"undefined"!=typeof GM?GM.listValues:null,deleteValue:"undefined"!=typeof GM_deleteValue?GM_deleteValue:null,setValue:"undefined"!=typeof GM_setValue?GM_setValue:null,getValue:"undefined"!=typeof GM_getValue?GM_getValue:null},e={STORAGE_KEY:"FontLoaderBypass",_init:function(){if(t.getValue&&t.setValue)try{let e=t.getValue(this.STORAGE_KEY);e?"string"==typeof e&&t.setValue(this.STORAGE_KEY,JSON.parse(e)):t.setValue(this.STORAGE_KEY,{})}catch(e){t.setValue(this.STORAGE_KEY,{})}},_generateId:function(){const t=new Date,e=t=>String(t).padStart(2,"0"),n=String(t.getMilliseconds()).padStart(3,"0");return`${t.getFullYear()}${e(t.getMonth()+1)}${e(t.getDate())}${e(t.getHours())}${e(t.getMinutes())}${e(t.getSeconds())}${n}`},load:function(t,e,n,s,a){if(t.includes("fonts.googleapis.com")||t.endsWith(".css"))this._processExternalCss(t);else{if(!e)return;this.loadFontBase64(t,e,n||"normal",s||"normal",a||null)}},clear:function(...t){t.forEach((t=>{if(!t||"string"!=typeof t)return;t.includes("fonts.googleapis.com")||t.endsWith(".css")?this._fetch(t,"text").then((t=>{const e=this._parseCssContent(t);e.length>0&&e.forEach((t=>this._deleteEntry(t.src)))})).catch((()=>{})):this._deleteEntry(t)}))},clearAll:function(){t.deleteValue&&t.deleteValue(this.STORAGE_KEY)},_processExternalCss:function(t){this._fetch(t,"text").then((t=>{const e=this._parseCssContent(t);0!==e.length&&e.forEach((t=>{this.loadFontBase64(t.src,t.family,t.weight,t.style,t.unicodeRange)}))})).catch((()=>{}))},_parseCssContent:function(t){const e=[],n=/@font-face\s*{([\s\S]*?)}/g;let s;for(;null!==(s=n.exec(t));){const t=s[1],n=t.match(/font-family:\s*['"]?([^'";]+)['"]?/),a=t.match(/font-style:\s*([a-zA-Z]+)/),o=t.match(/font-display:\s*([a-zA-Z-]+)/),l=t.match(/font-weight:\s*([^;]+)/),i=t.match(/unicode-range:\s*([^;]+)/),r=t.match(/src:\s*url\((?:'|")?([^'")]+)(?:'|")?\)/);n&&r&&e.push({family:n[1].trim(),style:a?a[1].trim():"normal",display:o?o[1].trim():"swap",weight:l?l[1].trim():"400",unicodeRange:i?i[1].trim():null,src:r[1].trim()})}return e},loadFontBase64:async function(e,n,s="normal",a="normal",o=null,l="swap"){let i=null;if(t.getValue)try{const l=t.getValue(this.STORAGE_KEY);let r="string"==typeof l?JSON.parse(l):l;if(r){const t=Object.keys(r).find((t=>r[t].url===e));if(t){const e=r[t];i=this._base64ToBlob(e.base64),!n&&e["font-family"]&&(n=e["font-family"]),!s&&e["font-weight"]&&(s=e["font-weight"]),!a&&e["font-style"]&&(a=e["font-style"]),!o&&e["unicode-range"]&&(o=e["unicode-range"])}}}catch(t){}if(!i)try{const l=await this._fetch(e,"blob");i=l;const r=new FileReader,u=new Promise((t=>{r.onloadend=()=>t(r.result),r.readAsDataURL(i)})),c=await u;t.setValue&&this._saveToStorage(e,n,s,a,o,c)}catch(t){return}try{const t=await i.arrayBuffer(),e={style:a,display:l};s&&(e.weight=s),o&&(e.unicodeRange=o);const r=new FontFace(n,t,e);await r.load(),document.fonts.add(r)}catch(t){}},_saveToStorage:function(e,n,s,a,o,l){try{let i={};const r=t.getValue(this.STORAGE_KEY);r&&(i="string"==typeof r?JSON.parse(r):r),i||(i={});let u=Object.keys(i).find((t=>i[t].url===e));u||(u=this._generateId()),i[u]={"font-family":n,"font-style":a,"font-display":"swap","font-weight":s,"unicode-range":o,url:e,base64:l},t.setValue(this.STORAGE_KEY,i)}catch(t){}},_deleteEntry:function(e){try{const n=t.getValue(this.STORAGE_KEY);if(!n)return;const s="string"==typeof n?JSON.parse(n):n,a=Object.keys(s).find((t=>s[t].url===e));a&&(delete s[a],t.setValue(this.STORAGE_KEY,s))}catch(t){}},_base64ToBlob:function(t){const e=t.split(","),n=e[0].match(/:(.*?);/)[1],s=atob(e[1]),a=new ArrayBuffer(s.length),o=new Uint8Array(a);for(let t=0;t<s.length;t++)o[t]=s.charCodeAt(t);return new Blob([o],{type:n})},_fetch:function(e,n){return new Promise(((s,a)=>{if(!t.xhr)return a();t.xhr({method:"GET",url:e,responseType:n,onload:t=>t.status>=200&&t.status<300?s(t.response):a(),onerror:()=>a(),ontimeout:()=>a()})}))}};e._init();("undefined"!=typeof unsafeWindow?unsafeWindow:window).FontLoaderBypass=e}();
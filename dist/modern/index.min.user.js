// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     adds a garbage bin icon to custom filters
// @grant           none
// @homepage        https://github.com/userscripters/garbage-filters#readme
// @match           https://*.askubuntu.com/questions/*
// @match           https://*.mathoverflow.net/questions/*
// @match           https://*.serverfault.com/questions/*
// @match           https://*.stackapps.com/questions/*
// @match           https://*.stackexchange.com/questions/*
// @match           https://*.stackoverflow.com/questions/*
// @name            Garbage Filters
// @namespace       userscripters
// @run-at          document-start
// @source          git+https://github.com/userscripters/garbage-filters.git
// @supportURL      https://github.com/userscripters/garbage-filters/issues
// @version         0.2.1
// ==/UserScript==

"use strict";((t,s,i)=>{const a={ids:{more:"uql-more-popover"},selectors:{custom:"a[href*='uqlId=']"}};t.addEventListener("load",()=>{const t=s.getElementById(a.ids.more);if(!t)return console.debug('missing "more" container');const e=t.querySelectorAll(a.selectors.custom);e.forEach(t=>{const{href:e,text:s}=t;var[,a]=/uqlId=(\d+)/.exec(e)||[];if(a){var n=s.trim(),[r]=((t,e,{classes:s=[],width:a=14,height:n=a}={})=>{var r="http://www.w3.org/2000/svg";const i=document.createElementNS(r,"svg");i.classList.add("svg-icon",t,...s),i.setAttribute("width",a.toString()),i.setAttribute("height",n.toString()),i.setAttribute("viewBox",`0 0 ${a} ${n}`),i.setAttribute("aria-hidden","true");const o=document.createElementNS(r,"path");return o.setAttribute("d",e),i.append(o),[i,o]})("iconTrash","M11 2a1 1 0 011 1v1H2V3a1 1 0 011-1h2a1 1 0 011-1h2a1 1 0 011 1h2Zm0 3H3v6c0 1.1.9 2 2 2h4a2 2 0 002-2V5Z");const i=((t,e,{classes:s=[],title:a,danger:n=!1,loading:r=!1,muted:i=!1,primary:o=!1,type:d="filled"})=>{const c=document.createElement("button");return c.id=t,c.textContent=e,c.classList.add("s-btn",`s-btn__${d}`,...s),c.setAttribute("role","button"),c.setAttribute("aria-label",a||e),n&&c.classList.add("s-btn__danger"),i&&c.classList.add("s-btn__muted"),o&&c.classList.add("s-btn__primary"),r&&c.classList.add("is-loading"),a&&(c.title=a),c})(`uqlId-${a}`,"",{classes:["fc-red-500"],danger:!0,title:`Delete ${n}`,type:"link"});i.append(r),t.append(i),t.classList.add("d-flex","ai-center","jc-space-between")}}),t.addEventListener("click",async t=>{const e=t["target"],s=e.closest("button");var[a,n]=(null===s||void 0===s?void 0:s.id.split("-"))||[];if("uqlId"===a){var a=StackExchange.options.user["fkey"];t.preventDefault();const r=new FormData;r.append("fkey",a),await(async(t,e)=>{const s=new FormData;return s.append("fkey",e),(await fetch(`https://${i.hostname}/questions/user-lists/${t}/delete`,{method:"POST",body:s})).ok})(n,a)&&i.reload()}})})})(window,document,(localStorage,location));
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
// @version         0.2.0
// ==/UserScript==

"use strict";
((w, d, _s, l) => {
    const makeStacksIcon = (name, pathConfig, { classes = [], width = 14, height = width } = {}) => {
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.classList.add("svg-icon", name, ...classes);
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", pathConfig);
        svg.append(path);
        return [svg, path];
    };
    const makeStacksButton = (id, text, { classes = [], title, danger = false, loading = false, muted = false, primary = false, type = "filled", } = {}) => {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", title || text);
        if (danger)
            btn.classList.add("s-btn__danger");
        if (muted)
            btn.classList.add("s-btn__muted");
        if (primary)
            btn.classList.add("s-btn__primary");
        if (loading)
            btn.classList.add("is-loading");
        if (title) {
            btn.title = title;
        }
        return btn;
    };
    const deleteFilter = async (id, fkey) => {
        const fd = new FormData();
        fd.append("fkey", fkey);
        const res = await fetch(`https://${l.hostname}/questions/user-lists/${id}/delete`, {
            method: "POST",
            body: fd,
        });
        return res.ok;
    };
    const config = {
        ids: {
            more: "uql-more-popover",
        },
        selectors: {
            custom: "a[href*='uqlId=']",
        },
    };
    w.addEventListener("load", () => {
        const container = d.getElementById(config.ids.more);
        if (!container) {
            return console.debug('missing "more" container');
        }
        const customLinks = container.querySelectorAll(config.selectors.custom);
        customLinks.forEach((anchor) => {
            const { href, text } = anchor;
            const [, filterId] = /uqlId=(\d+)/.exec(href) || [];
            if (!filterId)
                return;
            const action = text.trim();
            const [icon] = makeStacksIcon("iconTrash", "M11 2a1 1 0 011 1v1H2V3a1 1 0 011-1h2a1 1 0 011-1h2a1 1 0 011 1h2Zm0 3H3v6c0 1.1.9 2 2 2h4a2 2 0 002-2V5Z");
            const deleteBtn = makeStacksButton(`uqlId-${filterId}`, "", {
                classes: ["fc-red-500"],
                danger: true,
                title: `Delete ${action}`,
                type: "link",
            });
            deleteBtn.append(icon);
            anchor.append(deleteBtn);
            anchor.classList.add("d-flex", "ai-center", "jc-space-between");
        });
        container.addEventListener("click", async (event) => {
            const { target } = event;
            const button = target.closest("button");
            const [prefix, id] = (button === null || button === void 0 ? void 0 : button.id.split("-")) || [];
            if (prefix !== "uqlId")
                return;
            const { fkey } = StackExchange.options.user;
            event.preventDefault();
            const fd = new FormData();
            fd.append("fkey", fkey);
            const status = await deleteFilter(id, fkey);
            if (status)
                l.reload();
        });
    });
})(window, document, localStorage, location);

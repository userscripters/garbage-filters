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
// @version         0.1.0
// ==/UserScript==

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function (w, d, _s, l) {
    var makeStacksIcon = function (name, pathConfig, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.classes, classes = _d === void 0 ? [] : _d, _e = _c.width, width = _e === void 0 ? 14 : _e, _f = _c.height, height = _f === void 0 ? width : _f;
        var ns = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(ns, "svg");
        (_b = svg.classList).add.apply(_b, __spreadArray(["svg-icon", name], __read(classes), false));
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("viewBox", "0 0 " + width + " " + height);
        svg.setAttribute("aria-hidden", "true");
        var path = document.createElementNS(ns, "path");
        path.setAttribute("d", pathConfig);
        svg.append(path);
        return [svg, path];
    };
    var makeStacksButton = function (id, text, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.classes, classes = _d === void 0 ? [] : _d, title = _c.title, _e = _c.danger, danger = _e === void 0 ? false : _e, _f = _c.loading, loading = _f === void 0 ? false : _f, _g = _c.muted, muted = _g === void 0 ? false : _g, _h = _c.primary, primary = _h === void 0 ? false : _h, _j = _c.type, type = _j === void 0 ? "filled" : _j;
        var btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        (_b = btn.classList).add.apply(_b, __spreadArray(["s-btn", "s-btn__" + type], __read(classes), false));
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
    var deleteFilter = function (id, fkey) { return __awaiter(void 0, void 0, void 0, function () {
        var fd, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fd = new FormData();
                    fd.append("fkey", fkey);
                    return [4, fetch("https://" + l.hostname + "/questions/user-lists/" + id + "/delete", {
                            method: "POST",
                            body: fd,
                        })];
                case 1:
                    res = _a.sent();
                    return [2, res.ok];
            }
        });
    }); };
    var config = {
        ids: {
            more: "uql-more-popover",
        },
        selectors: {
            custom: "a[href*='uqlId=']",
        },
    };
    w.addEventListener("load", function () {
        var container = d.getElementById(config.ids.more);
        if (!container) {
            return console.debug('missing "more" container');
        }
        var customLinks = container.querySelectorAll(config.selectors.custom);
        customLinks.forEach(function (anchor) {
            var href = anchor.href, text = anchor.text;
            var _a = __read(/uqlId=(\d+)/.exec(href) || [], 2), filterId = _a[1];
            if (!filterId)
                return;
            var action = text.trim();
            var _b = __read(makeStacksIcon("iconTrash", "M11 2a1 1 0 011 1v1H2V3a1 1 0 011-1h2a1 1 0 011-1h2a1 1 0 011 1h2Zm0 3H3v6c0 1.1.9 2 2 2h4a2 2 0 002-2V5Z"), 1), icon = _b[0];
            var deleteBtn = makeStacksButton("uqlId-" + filterId, "", {
                danger: true,
                title: "Delete " + action,
                type: "link",
            });
            deleteBtn.append(icon);
            anchor.append(deleteBtn);
            anchor.classList.add("d-flex", "ai-center", "jc-space-between");
        });
        container.addEventListener("click", function (event) { return __awaiter(void 0, void 0, void 0, function () {
            var target, button, _a, prefix, id, fkey, fd, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = event.target;
                        button = target.closest("button");
                        _a = __read((button === null || button === void 0 ? void 0 : button.id.split("-")) || [], 2), prefix = _a[0], id = _a[1];
                        console.log({ prefix: prefix, id: id });
                        if (prefix !== "uqlId")
                            return [2];
                        fkey = StackExchange.options.user.fkey;
                        event.preventDefault();
                        fd = new FormData();
                        fd.append("fkey", fkey);
                        return [4, deleteFilter(id, fkey)];
                    case 1:
                        status = _b.sent();
                        if (status)
                            l.reload();
                        return [2];
                }
            });
        }); });
    });
})(window, document, localStorage, location);

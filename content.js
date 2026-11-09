(() => {
  // src/text.js
  var MAX_CHUNK = 260;
  var ABBREV = /* @__PURE__ */ new Set(["mr", "mrs", "ms", "dr", "prof", "sr", "jr", "st", "vs", "etc", "e.g", "i.e", "fig", "figs", "inc", "ltd", "co", "corp", "u.s", "u.k", "a.m", "p.m", "approx", "dept", "est", "vol", "ch", "pp", "ed", "eds", "al", "gen", "gov", "sen", "rep", "col", "lt", "sgt", "capt", "cf", "viz", "ca", "mt", "ft", "no"]);
  function splitLong(text, s, e, out) {
    if (e - s <= MAX_CHUNK) {
      out.push([s, e]);
      return;
    }
    const mid = s + Math.floor((e - s) / 2);
    const seg = text.slice(s, e);
    let best = -1;
    for (const re of [/[,;:—–]\s/g, /\s/g]) {
      let bestD = Infinity;
      let m;
      while (m = re.exec(seg)) {
        const pos = s + m.index + m[0].length;
        const d = Math.abs(pos - mid);
        if (d < bestD && pos > s + 20 && pos < e - 20) {
          bestD = d;
          best = pos;
        }
      }
      if (best > 0) break;
    }
    if (best < 0) {
      out.push([s, e]);
      return;
    }
    splitLong(text, s, best, out);
    splitLong(text, best, e, out);
  }
  function splitSentences(text) {
    const out = [];
    const push = (s, e) => {
      while (s < e && /\s/.test(text[s])) s++;
      while (e > s && /\s/.test(text[e - 1])) e--;
      if (e > s) splitLong(text, s, e, out);
    };
    const re = /([.!?…]+)(["'”’)\]]*)(\s+|$)|\n+/g;
    let start = 0;
    let m;
    while (m = re.exec(text)) {
      const end = m.index + m[0].length;
      if (m[1]) {
        const next = text[end];
        if (next && /[a-z]/.test(next) && /^[.…]+$/.test(m[1])) continue;
        if (m[1] === ".") {
          const before = text.slice(start, m.index);
          const word = (before.match(/(\S+)$/) || ["", ""])[1].toLowerCase().replace(/^[("'\[]+/, "");
          if (ABBREV.has(word) || /^[a-z]$/.test(word)) continue;
        }
      }
      if (end <= start) continue;
      push(start, end);
      start = end;
    }
    push(start, text.length);
    return out;
  }
  var SPELLED = /* @__PURE__ */ new Set(["US", "UK", "EU", "UN", "AI", "TV", "PC", "ID", "IT", "HR", "PR", "CEO", "CFO", "CTO", "FBI", "CIA", "NHS", "BBC", "CNN", "NYC", "LA", "DC", "PDF", "URL", "HTML", "CSS", "API", "USB", "GPU", "CPU", "DNA", "RNA", "HIV", "PhD", "MD", "BA", "MA", "BS", "MS", "AM", "PM", "OK", "FAQ", "DIY", "ATM", "GPS", "IQ", "VIP", "UFO", "SUV", "EV", "ER", "ICU", "LLC", "INC", "LTD", "ASAP", "FYI", "ADHD", "OCD", "PTSD", "LGBTQ", "NGO", "GDP", "IRS", "SEC", "FDA", "EPA", "NASA", "NATO", "UNESCO", "IEEE", "ACM", "MIT", "UCLA", "NYU"]);
  var LIGATURES = { \uFB00: "ff", \uFB01: "fi", \uFB02: "fl", \uFB03: "ffi", \uFB04: "ffl", \uFB05: "st", \uFB06: "st" };
  function speakable(text, { heading = false } = {}) {
    let t = text.replace(/[​-‍﻿]/g, "").replace(/[ﬀ-ﬆ]/g, (c) => LIGATURES[c] || c).replace(/\s+/g, " ").trim();
    if (!/[\p{L}\p{N}]/u.test(t)) return "";
    t = t.replace(new RegExp("\\b(?:\\p{L} ){2,}\\p{L}\\b", "gu"), (m) => m.replace(/ /g, ""));
    t = t.replace(
      /\b[\p{Lu}][\p{Lu}'’-]{1,}(?: [\p{Lu}][\p{Lu}'’-]{1,})*\b/gu,
      (run) => run.split(" ").map((w) => SPELLED.has(w.replace(/[^A-Z]/g, "")) ? w : /[AEIOUY]/.test(w) && (w.length >= 4 || run.includes(" ")) ? w[0] + w.slice(1).toLowerCase() : w).join(" ")
    );
    if (heading && !/[.!?:]$/.test(t)) t += ".";
    return t;
  }
  var NAME = "[A-Z][\\p{L}'\u2019-]+(?: (?:and|&|y|et) [A-Z][\\p{L}'\u2019-]+)?(?: et al\\.?)?";
  var ONE = `(?:see |see also |e\\.g\\.,? |cf\\. )?${NAME},? \\d{4}[a-z]?(?:, pp?\\. ?\\d+(?:[-\u2013]\\d+)?)?`;
  var PAREN = new RegExp(`\\s?\\((?:${ONE})(?:; ?(?:${ONE}))*\\)`, "gu");

  // src/settings.js
  var DEFAULTS = {
    voice: "bm_fable*0.5+am_onyx*0.16+bm_lewis*0.1+am_michael*0.14+bm_george*0.1",
    // "Your Mix", round 3
    speed: 1,
    engine: "auto",
    // 'auto' (GPU, then CPU), 'webgpu' or 'wasm'
    skipCode: false,
    // Mya asked for code to be read
    skipCitations: true,
    // leave out [12], (Smith, 2020), footnote marks and reference lists
    autoScroll: true,
    caption: false,
    // big text of the current sentence in the middle of the screen
    selectButton: true,
    // show a play button when text is selected
    tone: "warm",
    // 'warm' (fuller, softer top) or 'natural'
    depth: 1,
    // 0 natural, 1 a bit deeper, 2 deeper
    autoLanguage: true,
    // detect other languages and switch voice
    autoReadClaude: true,
    // on claude.ai: read each new reply from Claude as soon as it finishes
    // Google's online voices when you're online (see online.js). Needs your own
    // free Google key; without one, Murmur's own voices read as always.
    onlineVoices: true,
    googleKey: "",
    onlineVoice: "Sadaltager",
    // Mya's pick, Nov 9 (Algieba close second)
    // Mya's picks, Nov 8: Spanish Sharvard (native engine), Italian Nicola with a
    // touch of her voice, Portuguese the Alex+Santa blend.
    // Chosen by measurement (dev/clarity.mjs): the cleanest speaker per language,
    // least noise above 8 kHz. Mya hears that noise as "static".
    langVoices: { es: "piper:es_MX-claude-high", fr: "ff_siwis", it: "im_nicola*0.7+bm_fable*0.3", pt: "piper:pt_BR-cadu-medium", hi: "piper:hi_IN-pratham-medium", zh: "zm_yunyang", la: "im_nicola" }
  };
  var SPEEDS = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.5, 1.7, 2, 2.2, 2.5, 2.8, 3, 3.5];

  // src/lang.js
  var LANGS = {
    en: { name: "English", espeak: "en-gb" },
    es: { name: "Spanish", espeak: ["es-419", "es"] },
    // Latin American first (Mya's choice); Castilian fallback
    fr: { name: "French", espeak: "fr-fr" },
    it: { name: "Italian", espeak: "it" },
    pt: { name: "Portuguese", espeak: "pt-br" },
    hi: { name: "Hindi", espeak: "hi" },
    // Languages with no voice of their own in the model: pronounced by eSpeak's
    // rules and spoken by your usual voice (an accent, but the right sounds).
    zh: { name: "Chinese", espeak: "cmn" },
    // characters -> pinyin -> tones, read by a Chinese voice (src/zh.js)
    "zh-latn": { name: "Chinese (pinyin)", espeak: "cmn-latn-pinyin", hidden: true },
    ja: { name: "Japanese", espeak: "ja", own: true },
    ko: { name: "Korean", espeak: "ko", own: true },
    ar: { name: "Arabic", espeak: "ar", own: true },
    fa: { name: "Persian", espeak: "fa", own: true },
    ur: { name: "Urdu", espeak: "ur", own: true },
    he: { name: "Hebrew", espeak: "he", own: true },
    ru: { name: "Russian", espeak: "ru", own: true },
    uk: { name: "Ukrainian", espeak: "uk", own: true },
    el: { name: "Greek", espeak: "el", own: true },
    tr: { name: "Turkish", espeak: "tr", own: true },
    de: { name: "German", espeak: "de", own: true },
    nl: { name: "Dutch", espeak: "nl", own: true },
    pl: { name: "Polish", espeak: "pl", own: true },
    sv: { name: "Swedish", espeak: "sv", own: true },
    la: { name: "Latin", espeak: "la", own: true },
    da: { name: "Danish", espeak: "da", own: true },
    no: { name: "Norwegian", espeak: "nb", own: true },
    fi: { name: "Finnish", espeak: "fi", own: true },
    cs: { name: "Czech", espeak: "cs", own: true },
    sk: { name: "Slovak", espeak: "sk", own: true },
    sl: { name: "Slovenian", espeak: "sl", own: true },
    hu: { name: "Hungarian", espeak: "hu", own: true },
    ro: { name: "Romanian", espeak: "ro", own: true },
    bg: { name: "Bulgarian", espeak: "bg", own: true },
    sr: { name: "Serbian", espeak: "sr", own: true },
    hr: { name: "Croatian", espeak: "hr", own: true },
    sq: { name: "Albanian", espeak: "sq", own: true },
    lt: { name: "Lithuanian", espeak: "lt", own: true },
    lv: { name: "Latvian", espeak: "lv", own: true },
    et: { name: "Estonian", espeak: "et", own: true },
    ca: { name: "Catalan", espeak: "ca", own: true },
    eu: { name: "Basque", espeak: "eu", own: true },
    cy: { name: "Welsh", espeak: "cy", own: true },
    is: { name: "Icelandic", espeak: "is", own: true },
    lb: { name: "Luxembourgish", espeak: "lb", own: true },
    hy: { name: "Armenian", espeak: "hy", own: true },
    ka: { name: "Georgian", espeak: "ka", own: true },
    kk: { name: "Kazakh", espeak: "kk", own: true },
    vi: { name: "Vietnamese", espeak: "vi", own: true },
    th: { name: "Thai", espeak: "th", own: true },
    id: { name: "Indonesian", espeak: "id", own: true },
    ms: { name: "Malay", espeak: "ms", own: true },
    bn: { name: "Bengali", espeak: "bn", own: true },
    ne: { name: "Nepali", espeak: "ne", own: true },
    mr: { name: "Marathi", espeak: "mr", own: true },
    ml: { name: "Malayalam", espeak: "ml", own: true },
    te: { name: "Telugu", espeak: "te", own: true },
    sw: { name: "Swahili", espeak: "sw", own: true },
    ku: { name: "Kurdish", espeak: "ku", own: true }
  };
  var SUPPORTED = Object.keys(LANGS);
  function scriptLanguage(text) {
    if (new RegExp("\\p{Script=Han}", "u").test(text)) return "zh";
    if (/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) return "ja";
    if (new RegExp("\\p{Script=Hangul}", "u").test(text)) return "ko";
    if (new RegExp("\\p{Script=Devanagari}", "u").test(text)) return "hi";
    if (new RegExp("\\p{Script=Arabic}", "u").test(text)) return "ar";
    if (new RegExp("\\p{Script=Hebrew}", "u").test(text)) return "he";
    if (new RegExp("\\p{Script=Cyrillic}", "u").test(text)) return "ru";
    if (new RegExp("\\p{Script=Greek}", "u").test(text)) return "el";
    if (new RegExp("\\p{Script=Thai}", "u").test(text)) return "th";
    return null;
  }
  var HINTS = {
    en: ["the", "and", "is", "of", "to", "in", "that", "it", "with", "for", "was", "are", "this", "you"],
    es: ["el", "la", "de", "que", "y", "en", "los", "las", "es", "un", "una", "por", "con", "para", "del", "se", "no"],
    fr: ["le", "la", "les", "de", "des", "et", "est", "un", "une", "que", "qui", "dans", "pour", "pas", "vous", "nous", "je"],
    it: ["il", "la", "di", "che", "e", "un", "una", "per", "non", "con", "sono", "gli", "della", "del", "anche"],
    pt: ["o", "a", "de", "que", "e", "do", "da", "em", "um", "uma", "para", "com", "n\xE3o", "os", "as", "se", "voc\xEA"]
  };
  function guessLanguage(text) {
    const byScript = scriptLanguage(text);
    if (byScript && SUPPORTED.includes(byScript)) return byScript;
    const words = text.toLowerCase().match(/[\p{L}']+/gu) || [];
    if (words.length < 3) return null;
    const score = {};
    for (const [lang, list] of Object.entries(HINTS)) {
      const set = new Set(list);
      score[lang] = words.filter((w) => set.has(w)).length / words.length;
    }
    const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0];
    return best && best[1] >= 0.08 ? best[0] : null;
  }
  function hasHintWord(text, lang) {
    const list = HINTS[lang];
    if (!list) return true;
    const words = text.toLowerCase().match(/[\p{L}']+/gu) || [];
    const set = new Set(list);
    return words.some((w) => set.has(w));
  }
  async function detectLanguage(text) {
    const t = (text || "").trim();
    if (t.length < 12) return null;
    try {
      if (typeof chrome !== "undefined" && chrome.i18n?.detectLanguage) {
        const r = await chrome.i18n.detectLanguage(t);
        const top = r?.languages?.[0];
        const need = t.length < 160 ? 80 : 55;
        if (top && top.percentage >= need && (r.isReliable || t.length >= 160 || scriptLanguage(t))) {
          const code = top.language.split("-")[0];
          if (code === "en") return "en";
          if (SUPPORTED.includes(code)) return hasHintWord(t, code) ? code : null;
          return "en";
        }
      }
    } catch {
    }
    return guessLanguage(t);
  }
  async function tagLanguages(blocks, { pageLang = null } = {}) {
    const whole = blocks.map((b) => b.text).join("\n").slice(0, 4e3);
    const main = await detectLanguage(whole) || (SUPPORTED.includes(pageLang) ? pageLang : "en");
    const out = [];
    for (const b of blocks) {
      let lang = null;
      if (b.lang && SUPPORTED.includes(b.lang) && b.lang !== pageLang) lang = b.lang;
      if (!lang && b.text.length >= 25) lang = await detectLanguage(b.text);
      out.push(lang || main);
    }
    return { main, langs: out };
  }

  // src/eta.js
  var TYPICAL_CPS = 14;
  function makeEta() {
    let lastAt = 0;
    let lastChars = 0;
    let rate = 0;
    return {
      // Call when sentence `chars` long starts playing.
      tick(chars) {
        const now = performance.now();
        if (lastAt && lastChars > 0) {
          const r = lastChars / ((now - lastAt) / 1e3);
          if (r > 2 && r < 120) rate = rate ? rate * 0.7 + r * 0.3 : r;
        }
        lastAt = now;
        lastChars = chars;
      },
      // Call on pause, stop or a jump, so a gap is not counted as slow reading.
      pause() {
        lastAt = 0;
        lastChars = 0;
      },
      secondsLeft(remainingChars, speed = 1) {
        return remainingChars / (rate || TYPICAL_CPS * speed);
      }
    };
  }
  function formatLeft(seconds) {
    if (!(seconds > 0)) return "";
    if (seconds < 50) return "under a minute left";
    const m = Math.round(seconds / 60);
    if (m < 60) return `${m} min left`;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return mm ? `${h} h ${mm} min left` : `${h} h left`;
  }

  // src/content.js
  (() => {
    if (window.__murmurLoaded) return;
    window.__murmurLoaded = true;
    const BLOCK_TAGS = /* @__PURE__ */ new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "BLOCKQUOTE", "PRE", "DD", "DT", "FIGCAPTION", "TD", "TH", "DIV", "SECTION", "ARTICLE", "MAIN", "BODY", "CAPTION", "SUMMARY", "ADDRESS", "DETAILS", "UL", "OL", "DL", "TABLE", "TR", "TBODY", "THEAD", "TFOOT", "FIGURE", "HR", "FORM", "FIELDSET", "HEADER", "FOOTER", "ASIDE", "NAV"]);
    const INLINE_TAGS = /* @__PURE__ */ new Set(["A", "SPAN", "EM", "STRONG", "B", "I", "U", "S", "SMALL", "MARK", "CODE", "ABBR", "CITE", "Q", "TIME", "SUB", "SUP", "KBD", "VAR", "SAMP", "DFN", "BDI", "BDO", "FONT", "DEL", "INS", "LABEL"]);
    const SKIP_TAGS = /* @__PURE__ */ new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "IFRAME", "SVG", "MATH", "CANVAS", "VIDEO", "AUDIO", "OBJECT", "EMBED", "BUTTON", "SELECT", "TEXTAREA", "INPUT", "OPTION", "NAV", "ASIDE", "DIALOG", "MENU", "HEAD", "TITLE", "META", "LINK"]);
    const SKIP_ROLES = /* @__PURE__ */ new Set(["navigation", "banner", "contentinfo", "complementary", "menu", "menubar", "search", "dialog", "alertdialog", "toolbar", "tablist", "tooltip", "presentation", "none"]);
    const SKIP_CLASS = /(^|[\s_-])(ad|ads|advert|advertisement|promo|cookie|cookies|share|sharing|social|sidebar|newsletter|breadcrumbs?|skip-link|visually-hidden|sr-only|screen-reader-text|comment-form|pagination)([\s_-]|$)/i;
    const S = {
      settings: { ...DEFAULTS },
      sentences: [],
      // { text, range, el }
      current: -1,
      state: "idle",
      detail: "",
      bar: null,
      lastClickTarget: null,
      highlight: null
    };
    chrome.storage.sync.get(DEFAULTS, (s) => Object.assign(S.settings, s));
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync") return;
      for (const k of Object.keys(changes)) S.settings[k] = changes[k].newValue;
      if (S.bar) updateBar();
    });
    document.addEventListener("contextmenu", (e) => S.lastClickTarget = e.target, true);
    document.addEventListener(
      "pointerdown",
      (e) => {
        if (e.button !== 0 || e.composedPath().some((n) => /^murmur-/.test(n?.id || n?.className || ""))) return;
        const hit = document.caretRangeFromPoint?.(e.clientX, e.clientY);
        const node = hit?.startContainer;
        if (node?.nodeType === Node.TEXT_NODE && node.textContent.trim()) S.lastTextClick = { el: node.parentElement, at: Date.now() };
      },
      true
    );
    let pageParagraphChars = 1;
    let relaxed = false;
    function holdsMainContent(el) {
      return paragraphTextLength(el) >= pageParagraphChars * 0.3;
    }
    function skipElement(el) {
      const tag = el.tagName;
      if (SKIP_TAGS.has(tag)) return true;
      if ((tag === "HEADER" || tag === "FOOTER") && !el.closest('article, main, [role="main"], section')) return true;
      if (tag === "SUP" && /^\s*\[?\d+\]?\s*$/.test(el.textContent)) return true;
      if ((tag === "PRE" || tag === "CODE") && S.settings.skipCode) return true;
      if (S.settings.skipCitations !== false && isCitation(el) && !holdsMainContent(el)) return true;
      if (el.hidden || el.getAttribute("aria-hidden") === "true") return true;
      if (!relaxed) {
        const role = el.getAttribute("role");
        if (role && SKIP_ROLES.has(role) && !holdsMainContent(el)) return true;
        if (el.id && SKIP_CLASS.test(el.id) && !holdsMainContent(el)) return true;
        const cls = typeof el.className === "string" ? el.className : "";
        if (cls && SKIP_CLASS.test(cls) && !holdsMainContent(el)) return true;
      }
      if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) {
        if (getComputedStyle(el).display !== "contents") return true;
      }
      return false;
    }
    const CITE_CLASS = /(^|[\s_-])(footnotes?|endnotes?|references?|reflist|citations?|cite|bibliography|works-cited|fn|footnote-ref|footnote-anchor|ltx_cite|ltx_bibliography)([\s_-]|$)/i;
    const CITE_ROLES = /* @__PURE__ */ new Set(["doc-endnotes", "doc-footnote", "doc-bibliography", "doc-biblioentry", "doc-noteref", "doc-backlink"]);
    function isCitation(el) {
      const tag = el.tagName;
      const role = el.getAttribute("role");
      if (role && CITE_ROLES.has(role)) return true;
      const cls = typeof el.className === "string" ? el.className : "";
      const t = (el.textContent || "").trim();
      if (tag === "SUP") {
        if (t.length <= 12 && (/^[\[\(]?[\d,\s–-]+[\]\)]?$|^[a-z*†‡§¶]$/i.test(t) || el.querySelector("a"))) return true;
      }
      if (tag === "A") {
        const href = el.getAttribute("href") || "";
        if (/#(cite|fn|ref|note|endnote|footnote|bib)/i.test(href) && t.length <= 20) return true;
        if (CITE_CLASS.test(cls) && t.length <= 20) return true;
      }
      if (tag === "CITE" && /^\[?[\d,\s–-]+\]?$/.test(t)) return true;
      if (tag === "SPAN" && CITE_CLASS.test(cls) && t.length <= 20 && /^[\[\(]?[\d,\s–-]+[\]\)]?$/.test(t)) return true;
      if ((tag === "SECTION" || tag === "DIV" || tag === "OL" || tag === "UL" || tag === "ASIDE" || tag === "FOOTER") && (CITE_CLASS.test(cls) || CITE_CLASS.test(el.id || ""))) return true;
      return false;
    }
    function isBlock(el) {
      const tag = el.tagName;
      if (BLOCK_TAGS.has(tag)) return true;
      if (INLINE_TAGS.has(tag)) return false;
      const d = getComputedStyle(el).display;
      return !(d === "inline" || d.startsWith("inline-") || d === "contents");
    }
    function collectBlocks(root) {
      const blocks = [];
      let cur = null;
      const open = (el) => {
        cur = { el, text: "", nodes: [] };
        blocks.push(cur);
      };
      function visit(el) {
        if (skipElement(el)) return;
        const block = isBlock(el);
        if (block) open(el);
        for (const child of el.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            const t = child.nodeValue;
            if (!t || !t.trim()) continue;
            if (!cur) open(el);
            cur.nodes.push({ node: child, start: cur.text.length, end: cur.text.length + t.length });
            cur.text += t;
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.tagName === "BR") {
              if (cur) cur.text += "\n";
              continue;
            }
            visit(child);
          }
        }
        if (relaxed && el.shadowRoot) {
          for (const child of el.shadowRoot.childNodes) {
            if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "STYLE" && child.tagName !== "SLOT") visit(child);
          }
        }
        if (block) cur = null;
      }
      visit(root);
      return blocks.filter((b) => b.text.trim());
    }
    function visibleTextLength() {
      try {
        return (document.body.innerText || "").replace(/\s+/g, " ").trim().length;
      } catch {
        return 0;
      }
    }
    function paragraphTextLength(el) {
      let n = 0;
      for (const p of el.querySelectorAll("p")) n += p.textContent.length;
      return n;
    }
    function pickRoot() {
      const body = document.body;
      const bodyScore = paragraphTextLength(body) || 1;
      pageParagraphChars = bodyScore;
      for (const sel of ["article", "main", '[role="main"]']) {
        const el = document.querySelector(sel);
        if (el && paragraphTextLength(el) >= bodyScore * 0.4) return el;
      }
      return body;
    }
    function makeRange(block, s, e) {
      const nodes = block.nodes;
      let sn = null, so = 0, en = null, eo = 0;
      for (const n of nodes) {
        if (n.end > s) {
          sn = n.node;
          so = Math.max(0, s - n.start);
          break;
        }
      }
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (n.start < e) {
          en = n.node;
          eo = Math.min(n.node.length, e - n.start);
          break;
        }
      }
      if (!sn || !en) return null;
      const r = document.createRange();
      try {
        r.setStart(sn, so);
        r.setEnd(en, eo);
      } catch {
        return null;
      }
      return r;
    }
    function sentencesIn(root) {
      const out = [];
      for (const block of collectBlocks(root)) {
        const heading = /^H[1-6]$/.test(block.el.tagName);
        for (const [s, e] of splitSentences(block.text)) {
          const text = speakable(block.text.slice(s, e), { heading });
          if (!text) continue;
          const range = makeRange(block, s, e);
          if (!range) continue;
          out.push({ text, range, el: block.el, block, s, e, words: null });
        }
      }
      return out;
    }
    function buildSentences(root) {
      relaxed = false;
      let out = sentencesIn(root);
      const chars = (list) => list.reduce((n, s) => n + s.text.length, 0);
      const visible = visibleTextLength();
      if (visible > 400 && chars(out) < visible * 0.3) {
        relaxed = true;
        try {
          const again = sentencesIn(document.body);
          if (chars(again) > chars(out) * 1.5) {
            console.log(`[murmur] relaxed text pass used: ${chars(out)} -> ${chars(again)} of ${visible} visible characters`);
            out = again;
          }
        } finally {
          relaxed = false;
        }
      }
      return out;
    }
    function rangesIntersect(a, b) {
      return a.compareBoundaryPoints(Range.END_TO_START, b) < 0 && a.compareBoundaryPoints(Range.START_TO_END, b) > 0;
    }
    function ensureHighlight() {
      applyHighlightTheme();
      if (S.highlight || !("highlights" in CSS)) return;
      S.highlight = new Highlight();
      S.wordHighlight = new Highlight();
      CSS.highlights.set("murmur-current", S.highlight);
      CSS.highlights.set("murmur-word", S.wordHighlight);
    }
    function pageIsDark() {
      const lum = (c) => {
        const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/.exec(c || "");
        if (!m) return null;
        if (m[4] !== void 0 && Number(m[4]) < 0.3) return null;
        return (0.2126 * m[1] + 0.7152 * m[2] + 0.0722 * m[3]) / 255;
      };
      let el = document.body;
      while (el) {
        const l = lum(getComputedStyle(el).backgroundColor);
        if (l != null) return l < 0.45;
        el = el.parentElement;
      }
      const text = lum(getComputedStyle(document.body || document.documentElement).color);
      return text != null && text > 0.55;
    }
    function applyHighlightTheme() {
      const dark = pageIsDark();
      let st = document.getElementById("murmur-hl-style");
      if (!st) {
        st = document.createElement("style");
        st.id = "murmur-hl-style";
        (document.head || document.documentElement).appendChild(st);
      }
      const word = "::highlight(murmur-word){background-color:#ffd54a!important;color:#141414!important;text-shadow:none!important}";
      st.textContent = dark ? "::highlight(murmur-current){background-color:rgba(255,214,74,.24)!important;color:#ffffff!important;text-shadow:none!important}" + word : "::highlight(murmur-current){background-color:rgba(255,226,122,.5)!important;color:#141414!important;text-shadow:none!important}" + word;
    }
    try {
      matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => S.bar && applyHighlightTheme());
    } catch {
    }
    function wordRanges(i) {
      const s = S.sentences[i];
      if (!s) return [];
      if (s.words) return s.words;
      const raw = s.block.text.slice(s.s, s.e);
      const out = [];
      const re = /\S+/g;
      let m;
      while (m = re.exec(raw)) out.push(makeRange(s.block, s.s + m.index, s.s + m.index + m[0].length));
      s.words = out;
      return out;
    }
    function setWord(i, w) {
      if (i !== S.current) return;
      captionWord(w);
      if (!S.wordHighlight) return;
      S.wordHighlight.clear();
      const r = wordRanges(i)[w];
      if (r) S.wordHighlight.add(r);
    }
    const CAPTION_CSS = `
    :host { all: initial; }
    .cap { position: fixed; left: 50%; top: 10%; transform: translateX(-50%); z-index: 2147483646; max-width: min(960px, 88vw);
      padding: 18px 28px; border-radius: 20px; background: rgba(20,20,24,.93); color: #f6f6f8; text-align: center;
      font: 600 clamp(26px, 3.4vw, 44px)/1.35 system-ui, -apple-system, "Segoe UI", sans-serif;
      box-shadow: 0 14px 44px rgba(0,0,0,.45); cursor: pointer; user-select: none; text-wrap: balance; }
    .cap .w.cur { color: #ffd56b; text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 6px; }
    .cap .hint { display: block; font: 13px/1.3 system-ui, sans-serif; opacity: .55; margin-top: 10px; font-weight: 400; }
  `;
    function ensureCaption() {
      if (S.cap) return S.cap;
      const host = document.createElement("div");
      host.id = "murmur-caption";
      const root = host.attachShadow({ mode: "open" });
      root.innerHTML = `<style>${CAPTION_CSS}</style><div class="cap" title="Click to pause or play"></div>`;
      const el = root.querySelector(".cap");
      el.addEventListener("click", () => chrome.runtime.sendMessage({ type: "content:toggle" }));
      (document.body || document.documentElement).appendChild(host);
      S.cap = { host, el, index: -1 };
      return S.cap;
    }
    function renderCaption() {
      if (!S.settings.caption || !S.bar || S.current < 0 || !S.sentences[S.current]) {
        if (S.cap) S.cap.host.style.display = "none";
        return;
      }
      const cap = ensureCaption();
      cap.host.style.display = "";
      if (cap.index === S.current) return;
      cap.index = S.current;
      cap.el.textContent = "";
      const words = S.sentences[S.current].text.split(" ").filter(Boolean);
      words.forEach((w, k) => {
        const sp = document.createElement("span");
        sp.className = "w";
        sp.dataset.w = String(k);
        sp.textContent = w;
        cap.el.appendChild(sp);
        cap.el.appendChild(document.createTextNode(" "));
      });
    }
    function captionWord(w) {
      if (!S.cap || S.cap.host.style.display === "none") return;
      S.cap.el.querySelectorAll(".w.cur").forEach((x) => x.classList.remove("cur"));
      const el = S.cap.el.querySelector(`.w[data-w="${w}"]`);
      if (el) el.classList.add("cur");
    }
    function removeCaption() {
      if (S.cap) S.cap.host.remove();
      S.cap = null;
    }
    function startWordClock(i, position, sentAt) {
      stopWordClock();
      const starts = S.sentences[i]?.starts;
      if (!starts) return;
      const base = performance.now() - Math.max(0, Date.now() - sentAt);
      let w = -1;
      const clock = { i, raf: 0, stopped: false };
      const step = () => {
        if (clock.stopped || S.current !== i) return;
        const t = position + (performance.now() - base) / 1e3 + 0.02;
        let nw = w;
        while (nw + 1 < starts.length && starts[nw + 1] <= t) nw++;
        if (nw !== w && nw >= 0) {
          w = nw;
          setWord(i, w);
        }
        clock.raf = requestAnimationFrame(step);
      };
      S.wordClock = clock;
      step();
    }
    function stopWordClock() {
      if (S.wordClock) {
        S.wordClock.stopped = true;
        cancelAnimationFrame(S.wordClock.raf);
        S.wordClock = null;
      }
    }
    function isInView(rect) {
      return rect.top >= 60 && rect.bottom <= window.innerHeight - 100;
    }
    function setCurrent(i) {
      S.current = i;
      ensureHighlight();
      if (S.highlight) S.highlight.clear();
      if (S.wordHighlight) S.wordHighlight.clear();
      const s = S.sentences[i];
      if (!s) return;
      if (S.highlight) S.highlight.add(s.range);
      if (S.settings.autoScroll) {
        const rect = s.range.getBoundingClientRect();
        if (rect.height && !isInView(rect)) {
          const el = s.range.startContainer.parentElement || s.el;
          el.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
      renderCaption();
      updateBar();
    }
    function clearHighlight() {
      stopWordClock();
      if (S.highlight) S.highlight.clear();
      if (S.wordHighlight) S.wordHighlight.clear();
      S.current = -1;
      renderCaption();
    }
    function isGoogleDoc() {
      return location.hostname === "docs.google.com" && /^\/document\//.test(location.pathname);
    }
    function selectionPlan(selRange, onlySelection = false) {
      const all = buildSentences(document.body);
      const hit = all.filter((s) => rangesIntersect(s.range, selRange));
      if (!hit.length) return { sentences: all, startIndex: 0 };
      if (onlySelection) return { sentences: hit, startIndex: 0 };
      const root = pickRoot();
      const pool = root.contains(selRange.startContainer) ? buildSentences(root) : all;
      const idx = pool.findIndex((s) => rangesIntersect(s.range, selRange));
      if (idx >= 0) return { sentences: pool, startIndex: idx };
      return { sentences: hit, startIndex: 0 };
    }
    function start(mode) {
      hidePill();
      if (document.contentType === "application/pdf") {
        chrome.runtime.sendMessage({ type: "content:open-pdf", url: location.href });
        return;
      }
      if (isGoogleDoc()) {
        showBar();
        setState("loading", "Opening this Google Doc in the Murmur reader\u2026");
        chrome.runtime.sendMessage({ type: "content:open-gdoc", url: location.href, title: document.title }, (res) => {
          if (res?.error) setState("error", res.error);
          else hideBar();
        });
        return;
      }
      const sel = window.getSelection();
      const selRange = sel && !sel.isCollapsed && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
      if ((mode === "selection" || mode === "selection-only") && !selRange) mode = "from-click";
      if (mode === "page" && selRange && selRange.toString().trim().length > 0) mode = "selection";
      if (mode === "page" && !selRange && S.lastTextClick && Date.now() - S.lastTextClick.at < 6e5 && S.lastTextClick.el.isConnected) {
        mode = "from-click";
        S.lastClickTarget = S.lastTextClick.el;
      }
      S.lastTextClick = null;
      if (mode === "page" && !selRange && isClaudeChat()) {
        const replies = document.querySelectorAll(CLAUDE_MSG);
        if (replies.length) return readClaudeMessage(replies[replies.length - 1]);
      }
      let sentences;
      let startIndex = 0;
      if (mode === "selection" || mode === "selection-only") {
        ({ sentences, startIndex } = selectionPlan(selRange, mode === "selection-only"));
      } else {
        sentences = buildSentences(pickRoot());
        if (mode === "from-click" && S.lastClickTarget) {
          const target = S.lastClickTarget;
          const idx = sentences.findIndex((s) => target.contains(s.range.startContainer) || s.el.contains(target));
          if (idx >= 0) startIndex = idx;
          else {
            const y = target.getBoundingClientRect().top;
            const below = sentences.findIndex((s) => s.range.getBoundingClientRect().top >= y - 4);
            if (below >= 0) startIndex = below;
          }
        }
      }
      beginReading(sentences, startIndex);
    }
    function beginReading(sentences, startIndex = 0) {
      if (!sentences.length) {
        showBar();
        setState("error", "I couldn't find any text to read on this page");
        return;
      }
      S.sentences = sentences;
      eta.pause();
      clearHighlight();
      showBar();
      setState("loading", "Starting\u2026");
      const breaks = sentences.map(
        (s, i) => /^H[1-6]$/.test(s.el.tagName) ? "heading" : sentences[i + 1]?.block !== s.block ? "paragraph" : "sentence"
      );
      languagesFor(sentences).then((langs) => {
        if (S.sentences !== sentences) return;
        chrome.runtime.sendMessage({ type: "content:read", sentences: sentences.map((s) => s.text), breaks, langs, startIndex }, (res) => {
          if (chrome.runtime.lastError) setState("error", chrome.runtime.lastError.message);
          else if (res?.error) setState("error", res.error);
        });
      });
    }
    function continueIfPageGrew() {
      const last = S.sentences[S.sentences.length - 1];
      if (!last || !S.bar) return;
      setTimeout(() => {
        if (S.state !== "idle" || !S.bar) return;
        let fresh;
        try {
          fresh = buildSentences(pickRoot());
        } catch {
          return;
        }
        const tail = S.sentences.slice(-2).map((s) => s.text);
        let at = -1;
        for (let k = fresh.length - 1; k >= 0; k--) {
          if (fresh[k].text === tail[tail.length - 1] && (tail.length < 2 || fresh[k - 1]?.text === tail[0])) {
            at = k;
            break;
          }
        }
        if (at < 0 || at + 1 >= fresh.length) return;
        console.log(`[murmur] page grew: ${fresh.length - at - 1} new sentence(s) after the last one read; carrying on`);
        S.sentences = fresh;
        eta.pause();
        clearHighlight();
        setState("loading", "Carrying on with the new part\u2026");
        const breaks = fresh.map((s, i) => /^H[1-6]$/.test(s.el.tagName) ? "heading" : fresh[i + 1]?.block !== s.block ? "paragraph" : "sentence");
        languagesFor(fresh).then((langs) => {
          if (S.sentences !== fresh) return;
          chrome.runtime.sendMessage({ type: "content:read", sentences: fresh.map((s) => s.text), breaks, langs, startIndex: at + 1 }, (res) => {
            if (chrome.runtime.lastError) setState("error", chrome.runtime.lastError.message);
            else if (res?.error) setState("error", res.error);
          });
        });
      }, 900);
    }
    async function languagesFor(sentences) {
      if (!S.settings.autoLanguage) return sentences.map(() => "en");
      const blocks = [];
      const indexOf = /* @__PURE__ */ new Map();
      for (const s of sentences) {
        if (!indexOf.has(s.block)) {
          indexOf.set(s.block, blocks.length);
          const langAttr = (s.el.closest("[lang]")?.getAttribute("lang") || "").slice(0, 2).toLowerCase();
          blocks.push({ text: s.block.text, lang: langAttr || null });
        }
      }
      const pageLang = (document.documentElement.lang || "").slice(0, 2).toLowerCase() || null;
      let langs;
      try {
        langs = (await tagLanguages(blocks, { pageLang })).langs;
      } catch {
        return sentences.map(() => "en");
      }
      const out = [];
      for (const s of sentences) {
        const main = langs[indexOf.get(s.block)] || "en";
        let hints = null;
        if (main === "en") hints = await italicLanguageHints(s).catch(() => null);
        out.push(hints ? { main, words: hints } : main);
      }
      return out;
    }
    const EM = "em, i, cite, dfn, [lang]:not(html):not(body)";
    async function italicLanguageHints(s) {
      if (!s.el.querySelector(EM) && !s.el.closest(EM)) return null;
      const raw = s.block.text.slice(s.s, s.e);
      const spoken = s.text.split(" ").filter(Boolean);
      const words = [];
      const re = /\S+/g;
      let m;
      while (m = re.exec(raw)) words.push({ text: m[0], a: s.s + m.index, b: s.s + m.index + m[0].length });
      if (words.length !== spoken.length) return null;
      const marks = words.map((w) => {
        const r = makeRange(s.block, w.a, w.b);
        const node = r?.startContainer;
        const el = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
        const hit = el?.closest(EM);
        if (!hit) return null;
        const attr = (hit.closest("[lang]")?.getAttribute("lang") || "").slice(0, 2).toLowerCase();
        return { el: hit, lang: attr && attr !== "en" && SUPPORTED.includes(attr) ? attr : null };
      });
      const hints = new Array(words.length).fill(null);
      let any = false;
      for (let i = 0; i < words.length; ) {
        if (!marks[i]) {
          i++;
          continue;
        }
        let j = i;
        while (j < words.length && marks[j] && marks[j].el === marks[i].el) j++;
        let lang = marks[i].lang;
        if (!lang) {
          const phrase = words.slice(i, j).map((w) => w.text).join(" ");
          const foreignLetters = /[^\x00-\x7F\s]/.test(phrase.replace(/[’“”—–…]/g, ""));
          try {
            const r = await chrome.i18n.detectLanguage(phrase);
            const top = r?.languages?.[0];
            const code = top?.language?.split("-")[0];
            const sure = top && code && code !== "en" && SUPPORTED.includes(code) && (r.isReliable || top.percentage >= 85);
            if (sure && (foreignLetters || top.percentage >= 85)) lang = code;
          } catch {
          }
        }
        if (lang) {
          for (let k = i; k < j; k++) hints[k] = lang;
          any = true;
        }
        i = j;
      }
      return any ? hints : null;
    }
    function seek(i, word) {
      chrome.runtime.sendMessage({ type: "content:seek", index: i, word: word || 0 });
    }
    const CLAUDE_MSG = '[data-testid="assistant-message"]';
    const claude = { streaming: /* @__PURE__ */ new Set(), scanTimer: 0, readTimer: 0 };
    function isClaudeChat() {
      if (location.hostname === "claude.ai") return true;
      return /^(127\.0\.0\.1|localhost)$/.test(location.hostname) && document.documentElement.dataset.murmurSite === "claude";
    }
    function claudeMessage(key, fallback) {
      return key && document.querySelector(`${CLAUDE_MSG}[data-turn-key="${CSS.escape(key)}"]`) || fallback;
    }
    function replyBody(msg) {
      const body = [...msg.children].find((c) => c.tagName === "DIV" && !c.querySelector('[data-testid="message-actions"]'));
      return body || msg;
    }
    function readElement(root) {
      hidePill();
      pageParagraphChars = paragraphTextLength(root) || 1;
      relaxed = false;
      const hasText = (c) => c.querySelector("p, li, h1, h2, h3, h4, h5, h6, pre, blockquote, td, th") || /^(P|LI|H[1-6]|PRE|BLOCKQUOTE|TABLE|UL|OL)$/.test(c.tagName);
      const parts = [...root.children].filter(hasText);
      let sentences = [];
      for (const part of parts) sentences.push(...sentencesIn(part));
      if (!sentences.length) sentences = sentencesIn(root);
      beginReading(sentences, 0);
    }
    function readClaudeMessage(msg) {
      const el = claudeMessage(msg.getAttribute("data-turn-key"), msg);
      if (!el || !el.isConnected) return;
      readElement(replyBody(el));
    }
    const READ_BTN_CSS = `
    :host { all: initial; display: inline-flex; align-items: center; margin-left: 8px; vertical-align: middle; }
    button { all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px 4px 8px; border-radius: 999px;
      background: #6d5dfc; color: #fff; font: 600 12px/1 system-ui, -apple-system, "Segoe UI", sans-serif; white-space: nowrap; }
    button:hover { background: #8577ff; }
    .tri { font-size: 10px; }
  `;
    function addReadButton(msg) {
      if (msg.querySelector(".murmur-read")) return;
      const row = msg.querySelector('[data-testid="message-actions"]');
      if (!row) return;
      const host = document.createElement("span");
      host.className = "murmur-read";
      const root = host.attachShadow({ mode: "open" });
      root.innerHTML = `<style>${READ_BTN_CSS}</style><button title="Read this reply out loud"><span class="tri">&#9654;</span>Read</button>`;
      root.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        readClaudeMessage(msg);
      });
      row.appendChild(host);
    }
    function scanClaude() {
      for (const msg of document.querySelectorAll(CLAUDE_MSG)) {
        const key = msg.getAttribute("data-turn-key") || "";
        if (msg.getAttribute("data-is-streaming") === "true") {
          if (key) claude.streaming.add(key);
          continue;
        }
        addReadButton(msg);
        if (key && claude.streaming.has(key)) {
          claude.streaming.delete(key);
          if (S.settings.autoReadClaude === false) continue;
          clearTimeout(claude.readTimer);
          claude.readTimer = setTimeout(() => readClaudeMessage(msg), 400);
        }
      }
    }
    function watchClaude() {
      if (!isClaudeChat()) return;
      const mo = new MutationObserver(() => {
        if (claude.scanTimer) return;
        claude.scanTimer = setTimeout(() => {
          claude.scanTimer = 0;
          scanClaude();
        }, 150);
      });
      mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-is-streaming"] });
      scanClaude();
    }
    watchClaude();
    document.addEventListener(
      "click",
      (e) => {
        if (!S.bar) return;
        if (S.bar.host.contains(e.target)) return;
        if (S.pill && S.pill.host.contains(e.target)) return;
        if (e.target.closest?.(".murmur-read")) return;
        if (!window.getSelection()?.isCollapsed) return;
        if (!e.altKey && e.target.closest?.("a, button, input, textarea, select, [contenteditable], summary, label, video, audio")) return;
        const pos = document.caretPositionFromPoint?.(e.clientX, e.clientY);
        if (!pos || !pos.offsetNode) return;
        const inRange = (r) => {
          try {
            return r && r.isPointInRange(pos.offsetNode, pos.offset);
          } catch {
            return false;
          }
        };
        const i = S.sentences.findIndex((s) => inRange(s.range));
        if (i < 0) {
          const node = pos.offsetNode;
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length >= 20) {
            S.lastClickTarget = node.parentElement;
            start("from-click");
          }
          return;
        }
        if (e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          const w = wordRanges(i).findIndex(inRange);
          seek(i, w >= 0 ? w : 0);
        } else seek(i);
      },
      true
    );
    const BAR_CSS = `
    :host { all: initial; }
    .bar { position: fixed; right: 20px; bottom: 20px; z-index: 2147483647; display: flex; align-items: center; gap: 6px;
      padding: 8px 10px 8px 12px; background: #1f1f24; color: #f3f3f5; border-radius: 999px;
      box-shadow: 0 8px 28px rgba(0,0,0,.4); font: 14px/1.2 system-ui, -apple-system, "Segoe UI", sans-serif; user-select: none; cursor: grab; touch-action: none; }
    .bar.dragging { cursor: grabbing; }
    .grip { opacity: .45; font-size: 15px; letter-spacing: -3px; padding: 0 2px 0 0; }
    button { all: unset; cursor: pointer; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; font-size: 14px; }
    button:hover { background: rgba(255,255,255,.14); }
    button.play { width: 44px; height: 44px; background: #6d5dfc; color: #fff; font-size: 17px; }
    button.play:hover { background: #8577ff; }
    .status { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: .9; padding: 0 6px; }
    .status.err { color: #ff9a9a; opacity: 1; white-space: normal; max-width: 360px; }
    select { all: unset; cursor: pointer; padding: 6px 8px; border-radius: 8px; background: rgba(255,255,255,.12); font-size: 13px; }
    select option { color: #111; }
    .x { opacity: .75; }
    .gear { opacity: .8; font-size: 17px; }
    button.cc { width: auto; padding: 0 9px; border-radius: 8px; font: 700 12px/1 system-ui, sans-serif; letter-spacing: .5px; border: 1.5px solid rgba(255,255,255,.35); height: 26px; }
    button.cc.on { background: #6d5dfc; color: #fff; border-color: #6d5dfc; }
    button.auto { width: auto; padding: 0 9px; border-radius: 8px; font: 600 12px/1 system-ui, sans-serif; white-space: nowrap; border: 1.5px solid rgba(255,255,255,.35); height: 26px; opacity: .8; }
    button.auto.on { background: #6d5dfc; color: #fff; border-color: #6d5dfc; opacity: 1; }
  `;
    function showBar() {
      applyHighlightTheme();
      if (S.bar) return;
      const host = document.createElement("div");
      host.id = "murmur-player";
      const root = host.attachShadow({ mode: "open" });
      root.innerHTML = `
      <style>${BAR_CSS}</style>
      <div class="bar" role="region" aria-label="Murmur player" title="Drag to move">
        <span class="grip">&#8942;&#8942;</span>
        <button class="prev" title="Back one sentence">&#9198;</button>
        <button class="play" title="Pause or play">&#9654;</button>
        <button class="next" title="Forward one sentence">&#9197;</button>
        <span class="status"></span>
        <button class="cc" title="Big text: show the sentence being read large on the screen">CC</button>
        ${isClaudeChat() ? '<button class="auto" title="Read each new reply from Claude out loud as soon as it arrives. Click to turn this off or on.">Auto-read on</button>' : ""}
        <select class="speed" title="Reading speed">
          ${SPEEDS.map((v) => `<option value="${v}">${v}\xD7</option>`).join("")}
        </select>
        <button class="gear" title="Voice and settings">&#9881;</button>
        <button class="x" title="Stop and close">&#10005;</button>
      </div>`;
      const $ = (s) => root.querySelector(s);
      $(".gear").onclick = () => chrome.runtime.sendMessage({ type: "content:open-settings" });
      $(".prev").onclick = () => chrome.runtime.sendMessage({ type: "content:prev" });
      $(".next").onclick = () => {
        if (S.state === "idle" && S.current < 0 && S.sentences.length) return continueIfPageGrew();
        chrome.runtime.sendMessage({ type: "content:next" });
      };
      $(".play").onclick = () => chrome.runtime.sendMessage({ type: "content:toggle" });
      $(".x").onclick = () => {
        chrome.runtime.sendMessage({ type: "content:stop" });
        hideBar();
      };
      $(".cc").onclick = () => {
        S.settings.caption = !S.settings.caption;
        chrome.storage.sync.set({ caption: S.settings.caption });
        renderCaption();
        updateBar();
      };
      const auto = $(".auto");
      if (auto) {
        auto.onclick = () => {
          S.settings.autoReadClaude = S.settings.autoReadClaude === false;
          chrome.storage.sync.set({ autoReadClaude: S.settings.autoReadClaude });
          updateBar();
        };
      }
      const speed = $(".speed");
      speed.value = String(S.settings.speed);
      if (!speed.value) speed.value = "1";
      speed.onchange = () => {
        const s = { ...S.settings, speed: parseFloat(speed.value) };
        chrome.storage.sync.set({ speed: s.speed });
        chrome.runtime.sendMessage({ type: "settings-changed", settings: s });
      };
      (document.body || document.documentElement).appendChild(host);
      S.bar = { host, root, $ };
      makeDraggable($(".bar"));
      updateBar();
    }
    function placeBar(bar, x, y) {
      const w = bar.offsetWidth || 320;
      const h = bar.offsetHeight || 60;
      x = Math.max(4, Math.min(window.innerWidth - w - 4, x));
      y = Math.max(4, Math.min(window.innerHeight - h - 4, y));
      bar.style.left = x + "px";
      bar.style.top = y + "px";
      bar.style.right = "auto";
      bar.style.bottom = "auto";
      return { x, y };
    }
    function makeDraggable(bar) {
      chrome.storage.local.get("barPos", ({ barPos }) => {
        if (barPos && typeof barPos.x === "number") placeBar(bar, barPos.x, barPos.y);
      });
      let drag = null;
      bar.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || e.target.closest("button, select, option")) return;
        const r = bar.getBoundingClientRect();
        drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false };
        bar.setPointerCapture(e.pointerId);
        bar.classList.add("dragging");
        e.preventDefault();
      });
      bar.addEventListener("pointermove", (e) => {
        if (!drag) return;
        drag.moved = true;
        drag.pos = placeBar(bar, e.clientX - drag.dx, e.clientY - drag.dy);
      });
      const end = (e) => {
        if (!drag) return;
        bar.classList.remove("dragging");
        if (drag.moved && drag.pos) chrome.storage.local.set({ barPos: drag.pos });
        drag = null;
      };
      bar.addEventListener("pointerup", end);
      bar.addEventListener("pointercancel", end);
      window.addEventListener("resize", () => {
        if (bar.style.left) placeBar(bar, parseFloat(bar.style.left), parseFloat(bar.style.top));
      });
    }
    function hideBar() {
      if (!S.bar) return;
      S.bar.host.remove();
      S.bar = null;
      removeCaption();
      clearHighlight();
      S.state = "idle";
    }
    const eta = makeEta();
    function remainingChars() {
      let n = 0;
      for (let k = Math.max(0, S.current); k < S.sentences.length; k++) n += S.sentences[k].text.length;
      return n;
    }
    function updateBar() {
      if (!S.bar) return;
      const { $ } = S.bar;
      const play = $(".play");
      play.innerHTML = S.state === "playing" ? "&#10074;&#10074;" : "&#9654;";
      const status = $(".status");
      status.classList.toggle("err", S.state === "error");
      let text = S.detail;
      const bar = $(".bar");
      bar.dataset.sentence = String(S.current + 1);
      bar.dataset.count = String(S.sentences.length);
      bar.title = S.current >= 0 ? `Sentence ${S.current + 1} of ${S.sentences.length}. Drag to move.` : "Drag to move";
      if (S.state === "playing" || S.state === "paused") {
        const left = S.current >= 0 ? formatLeft(eta.secondsLeft(remainingChars(), S.settings.speed || 1)) : "";
        text = S.state === "paused" ? `Paused${left ? " \xB7 " + left : ""}` : left || "Reading";
        const done = S.sentences.length ? Math.max(0, S.current) / S.sentences.length : 0;
        bar.style.background = `linear-gradient(90deg, rgba(109,93,252,.42) ${(done * 100).toFixed(1)}%, #1f1f24 ${(done * 100).toFixed(1)}%)`;
      } else {
        if (S.state === "buffering") text = "Starting\u2026";
        else if (S.state === "idle") text = S.detail || "Ready";
        if (S.state !== "buffering") bar.style.background = "";
      }
      status.textContent = text;
      play.title = S.state === "playing" ? "Pause" : "Play";
      $(".cc").classList.toggle("on", !!S.settings.caption);
      const auto = $(".auto");
      if (auto) {
        const on = S.settings.autoReadClaude !== false;
        auto.classList.toggle("on", on);
        auto.textContent = on ? "Auto-read on" : "Auto-read off";
      }
    }
    function setState(state, detail) {
      S.state = state;
      S.detail = detail || "";
      updateBar();
    }
    const PILL_CSS = `
    :host { all: initial; }
    button { all: unset; position: fixed; z-index: 2147483647; cursor: pointer; display: flex; align-items: center; gap: 6px;
      padding: 7px 12px 7px 10px; border-radius: 999px; background: #6d5dfc; color: #fff;
      font: 600 14px/1 system-ui, -apple-system, "Segoe UI", sans-serif; box-shadow: 0 4px 16px rgba(0,0,0,.28); }
    button:hover { background: #8577ff; }
    .tri { font-size: 13px; }
  `;
    function isEditable(node) {
      const el = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
      return !!el?.closest?.('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
    }
    function showPill(rect) {
      if (!S.pill) {
        const host = document.createElement("div");
        host.id = "murmur-select";
        const root = host.attachShadow({ mode: "open" });
        root.innerHTML = `<style>${PILL_CSS}</style><button title="Read this out loud"><span class="tri">&#9654;</span>Read</button>`;
        const btn = root.querySelector("button");
        btn.addEventListener("mousedown", (e) => e.preventDefault());
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          start("selection");
        });
        (document.body || document.documentElement).appendChild(host);
        S.pill = { host, btn };
      }
      const w = 86, h = 32;
      let left = Math.min(window.innerWidth - w - 8, Math.max(8, rect.right + 6));
      let top = rect.bottom + 8;
      if (top + h > window.innerHeight - 8) top = Math.max(8, rect.top - h - 8);
      S.pill.btn.style.left = left + "px";
      S.pill.btn.style.top = top + "px";
      S.pill.host.style.display = "";
    }
    function hidePill() {
      if (S.pill) S.pill.host.style.display = "none";
    }
    function maybeShowPill() {
      if (!S.settings.selectButton) return hidePill();
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return hidePill();
      const text = sel.toString().trim();
      if (text.length < 2 || !/[\p{L}\p{N}]/u.test(text)) return hidePill();
      const range = sel.getRangeAt(0);
      if (isEditable(range.startContainer) || isEditable(range.endContainer)) return hidePill();
      if (S.bar && S.bar.host.contains(range.commonAncestorContainer)) return hidePill();
      const rects = range.getClientRects();
      const rect = rects[rects.length - 1] || range.getBoundingClientRect();
      if (!rect || !rect.width && !rect.height) return hidePill();
      showPill(rect);
    }
    let pillTimer = 0;
    const schedulePill = () => {
      clearTimeout(pillTimer);
      pillTimer = setTimeout(maybeShowPill, 120);
    };
    document.addEventListener("mouseup", (e) => {
      if (S.pill && S.pill.host.contains(e.target)) return;
      schedulePill();
    }, true);
    document.addEventListener("touchend", schedulePill, true);
    document.addEventListener("keyup", (e) => {
      if (e.shiftKey || e.key === "Shift") schedulePill();
    }, true);
    document.addEventListener("selectionchange", () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) hidePill();
    });
    window.addEventListener("scroll", hidePill, { passive: true, capture: true });
    function extractDoc() {
      const blocks = [];
      for (const b of collectBlocks(pickRoot())) {
        const tag = b.el.tagName;
        const kind = /^H[1-6]$/.test(tag) ? "h" : tag === "LI" ? "li" : tag === "PRE" ? "pre" : "p";
        const text = kind === "pre" ? b.text : b.text.replace(/\s+/g, " ").trim();
        if (text) blocks.push({ kind, level: kind === "h" ? Number(tag[1]) : void 0, text });
      }
      return { title: document.title || location.hostname, url: location.href, blocks };
    }
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      switch (msg?.type) {
        case "ping":
          sendResponse({ ok: true });
          break;
        case "start":
          start(msg.mode || "page");
          sendResponse({ ok: true });
          break;
        case "extract":
          sendResponse(extractDoc());
          break;
        case "sentence":
          if (!S.bar) break;
          if (msg.index !== S.current + 1) eta.pause();
          eta.tick(S.sentences[msg.index]?.text.length || 0);
          setCurrent(msg.index);
          if (S.sentences[msg.index] && msg.starts) {
            S.sentences[msg.index].starts = msg.starts;
            startWordClock(msg.index, msg.offset || 0, msg.sentAt || Date.now());
          }
          break;
        case "sync":
          if (S.bar && msg.index === S.current) startWordClock(msg.index, msg.elapsed || 0, msg.sentAt || Date.now());
          break;
        case "word":
          if (S.bar && !S.sentences[msg.index]?.starts) setWord(msg.index, msg.word);
          break;
        case "state":
          if (msg.state === "idle" && !S.bar) break;
          if (msg.state !== "playing") {
            stopWordClock();
            eta.pause();
          }
          if (msg.state === "idle") clearHighlight();
          setState(msg.state, msg.detail);
          break;
        case "ended":
          stopWordClock();
          clearHighlight();
          setState("idle", "Finished");
          continueIfPageGrew();
          break;
        case "settings":
          Object.assign(S.settings, msg.settings);
          if (S.bar) S.bar.$(".speed").value = String(S.settings.speed);
          break;
      }
    });
    window.addEventListener("pagehide", () => {
      if (S.state !== "idle") chrome.runtime.sendMessage({ type: "content:stop" }).catch?.(() => {
      });
    });
  })();
})();

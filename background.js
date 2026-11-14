// src/settings.js
var DEFAULTS = {
  voice: "bm_fable*0.5+am_onyx*0.16+bm_lewis*0.1+am_michael*0.14+bm_george*0.1",
  // "Your Mix", round 3
  speed: 1,
  engine: "auto",
  // 'auto' (GPU, then CPU), 'webgpu' or 'wasm'
  skipCitations: true,
  // leave out [12], (Smith, 2020), footnote marks and reference lists
  caption: true,
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
  onlineVoiceByLang: {},
  // a different Google voice for one language, e.g. { ru: 'Charon' } // Mya's pick, Nov 9 (Algieba close second)
  // Mya's picks, Nov 8: Spanish Sharvard (native engine), Italian Nicola with a
  // touch of her voice, Portuguese the Alex+Santa blend.
  // Chosen by measurement (dev/clarity.mjs): the cleanest speaker per language,
  // least noise above 8 kHz. Mya hears that noise as "static".
  langVoices: { es: "piper:es_MX-claude-high", fr: "ff_siwis", it: "im_nicola*0.7+bm_fable*0.3", pt: "piper:pt_BR-cadu-medium", hi: "piper:hi_IN-pratham-medium", zh: "zm_yunyang", la: "im_nicola" }
};
var FIXED = ["tone", "depth", "autoLanguage", "engine"];
function withFixed(s) {
  const out = { ...s };
  for (const k of FIXED) out[k] = DEFAULTS[k];
  return out;
}

// src/online.js
function addUsage(saved, add, month = monthKey()) {
  const base = saved && saved.month === month ? saved.chars : 0;
  return { month, chars: base + (add || 0) };
}
var monthKey = (d = /* @__PURE__ */ new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
var state = {
  usage: { month: monthKey(), chars: 0 },
  // grows as we read; seeded from settings
  pauseUntil: 0,
  // after a network failure or Google saying "too many", wait a bit
  badKey: "",
  // a key Google refused; don't keep trying it
  missing: /* @__PURE__ */ new Set(),
  // language codes Google said it has no such voice for
  lastProblem: ""
};

// src/background.js
var session = { tabId: null, count: 0, index: -1, state: "idle", detail: "" };
var sessionP = null;
var creatingOffscreen = null;
var usageWrites = Promise.resolve();
function loadSession() {
  sessionP ||= chrome.storage.session.get("session").then(
    (stored) => {
      if (stored.session) session = stored.session;
    },
    () => {
    }
  );
  return sessionP;
}
function saveSession() {
  return chrome.storage.session.set({ session });
}
async function getSettings() {
  const s = await chrome.storage.sync.get(DEFAULTS);
  const { onlineUsage } = await chrome.storage.local.get("onlineUsage");
  return withFixed({ ...DEFAULTS, ...s, onlineUsage: onlineUsage || null });
}
async function ensureOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  if (!creatingOffscreen) {
    creatingOffscreen = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK", "WORKERS"],
      justification: "Generates speech on this computer and plays it"
    }).finally(() => creatingOffscreen = null);
  }
  await creatingOffscreen;
}
async function toOffscreen(msg) {
  await ensureOffscreen();
  return chrome.runtime.sendMessage({ ...msg, target: "offscreen" });
}
async function offscreenExists() {
  return chrome.offscreen.hasDocument();
}
var diagLines = [];
var diagTimer = 0;
function diag(text) {
  diagLines.push(String(text).slice(0, 400));
  if (diagTimer) return;
  diagTimer = setTimeout(() => {
    const body = diagLines.splice(0).join("\n");
    diagTimer = 0;
    fetch("http://127.0.0.1:47816/log", { method: "POST", body, headers: { "Content-Type": "text/plain" } }).catch(() => {
    });
  }, 300);
}
var hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return "?";
  }
};
async function toTab(tabId, msg, frameId = 0) {
  try {
    return await chrome.tabs.sendMessage(tabId, msg, { frameId });
  } catch (e) {
    diag(`${msg.type} to frame ${frameId}: no Murmur there (${e?.message || e}); putting it in`);
    await chrome.scripting.executeScript({ target: { tabId, frameIds: [frameId] }, files: ["content.js"] });
    await chrome.scripting.insertCSS({ target: { tabId, frameIds: [frameId] }, files: ["content.css"] });
    return chrome.tabs.sendMessage(tabId, msg, { frameId });
  }
}
function toTabQuiet(tabId, msg, frameId = session.tabId === tabId ? session.frameId || 0 : 0) {
  if (tabId == null) return;
  chrome.tabs.sendMessage(tabId, msg, { frameId }).catch(() => {
  });
}
async function pickFrame(tabId) {
  let rows;
  try {
    rows = await chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      func: () => {
        const sel = getSelection();
        const ae = document.activeElement;
        return {
          sel: sel && !sel.isCollapsed ? sel.toString().trim().length : 0,
          focused: document.hasFocus() && !(ae && /^(IFRAME|FRAME)$/.test(ae.tagName)),
          text: (document.body?.innerText || "").trim().length,
          area: innerWidth * innerHeight
        };
      }
    });
  } catch {
    return 0;
  }
  const frames = (rows || []).filter((r) => r && r.result).map((r) => ({ id: r.frameId, ...r.result }));
  diag("frames: " + frames.map((f) => `#${f.id} text ${f.text} area ${f.area}${f.focused ? " focused" : ""}${f.sel ? " sel " + f.sel : ""}`).join(" | "));
  if (frames.length < 2) return 0;
  const withSel = frames.filter((f) => f.sel > 0).sort((a, b) => b.sel - a.sel)[0];
  if (withSel) return withSel.id;
  const top = frames.find((f) => f.id === 0) || { text: 0 };
  const inner = frames.filter((f) => f.id !== 0 && f.area > 4e4 && f.text >= 30).sort((a, b) => b.text - a.text);
  const clicked = inner.find((f) => f.focused);
  if (clicked) return clicked.id;
  if (inner[0] && top.text < 400 && inner[0].text > top.text) return inner[0].id;
  return 0;
}
async function activeTab() {
  const win = await chrome.windows.getLastFocused({ windowTypes: ["normal"] }).catch(() => null);
  const [tab] = await chrome.tabs.query(win ? { active: true, windowId: win.id } : { active: true, lastFocusedWindow: true });
  return tab;
}
function isPdfUrl(url = "") {
  return !url.startsWith("chrome-extension:") && /\.pdf($|[?#])/i.test(url);
}
var isReaderTab = (tab) => !!tab?.url && tab.url.startsWith(chrome.runtime.getURL("reader.html"));
var toReaderTab = (tab) => chrome.tabs.sendMessage(tab.id, { type: "reader:toggle" }).then(
  () => ({ ok: true }),
  () => ({ ok: true })
);
function googleDocId(url = "") {
  const m = /^https:\/\/docs\.google\.com\/document\/(?:u\/\d+\/)?d\/([\w-]{20,})/.exec(url);
  return m ? m[1] : null;
}
async function openReader(params = {}) {
  const q = new URLSearchParams(params).toString();
  await chrome.tabs.create({ url: chrome.runtime.getURL("reader.html") + (q ? "?" + q : "") });
}
async function openReaderWithDoc(doc, extra = {}) {
  const key = "doc:" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const all = await chrome.storage.session.get(null);
  const old = Object.keys(all).filter((k) => k.startsWith("doc:")).sort();
  if (old.length > 2) await chrome.storage.session.remove(old.slice(0, old.length - 2));
  try {
    await chrome.storage.session.set({ [key]: doc });
  } catch (e) {
    await chrome.storage.session.remove(old).catch(() => {
    });
    try {
      await chrome.storage.session.set({ [key]: doc });
    } catch (e2) {
      return { error: "This document is too big to hand over this way. In the Doc, click File, then Download, then Microsoft Word, and open that file in Murmur." };
    }
  }
  await openReader({ doc: key, ...extra });
  return { ok: true };
}
async function openGoogleDoc(url, tabTitle) {
  const id = googleDocId(url);
  const account = /\/document\/(u\/\d+\/)d\//.exec(url)?.[1] || "";
  const exportUrl = `https://docs.google.com/document/${account}d/${id}/export?format=html`;
  let res;
  try {
    res = await fetch(exportUrl, { credentials: "include" });
  } catch (e) {
    return { error: "Couldn't reach Google Docs. Check your internet connection and try again." };
  }
  const ct = res.headers.get("content-type") || "";
  if (!res.ok || /accounts\.google\.com/.test(res.url) || !ct.includes("html")) {
    return {
      error: "Couldn't open this Google Doc. If it isn't yours, you may not be allowed to download it. Another way: in the Doc, click File, then Download, then Microsoft Word, and open that file in Murmur."
    };
  }
  const html = await res.text();
  const title = (tabTitle || "Google Doc").replace(/\s*-\s*Google Docs\s*$/i, "");
  return openReaderWithDoc({ title, html });
}
async function readTab(tab, mode = "page") {
  if (isReaderTab(tab)) return toReaderTab(tab);
  if (isPdfUrl(tab.url)) {
    await openReader({ src: tab.url });
    return { ok: true };
  }
  if (googleDocId(tab.url)) {
    chrome.action.setBadgeBackgroundColor({ color: "#6b5cff", tabId: tab.id }).catch(() => {
    });
    chrome.action.setBadgeText({ text: "\u2026", tabId: tab.id }).catch(() => {
    });
    let res;
    try {
      res = await openGoogleDoc(tab.url, tab.title);
    } catch (e) {
      res = { error: "Couldn't open this Google Doc: " + (e?.message || e) };
    }
    chrome.action.setBadgeText({ text: "", tabId: tab.id }).catch(() => {
    });
    diag(res?.error ? "google doc failed: " + res.error.slice(0, 120) : "google doc opened in the reader");
    if (res?.error) {
      await openReader({ problem: res.error });
      return { ok: true };
    }
    return res;
  }
  try {
    const frameId = await pickFrame(tab.id);
    if (frameId) console.log("[murmur] reading inside a frame of this page");
    diag(`read asked on ${hostOf(tab.url)} (${mode}); frame chosen #${frameId}; before: ${session.state} in tab ${session.tabId === tab.id ? "this" : "other/none"} frame #${session.frameId || 0}`);
    await toTab(tab.id, { type: "start", mode }, frameId);
    return { ok: true };
  } catch (e) {
    diag("read failed: " + (e?.message || e));
    console.warn("[murmur] could not reach the page:", e?.message || e);
    return {
      error: "Chrome doesn't let extensions read this page (Chrome's own pages and the Web Store are off limits). You can copy the text and paste it into the reader instead. (" + String(e?.message || e) + ")"
    };
  }
}
function broadcastState() {
  toTabQuiet(session.tabId, { type: "state", state: session.state, detail: session.detail });
  chrome.runtime.sendMessage({ type: "state-broadcast", session }).catch(() => {
  });
  return saveSession();
}
async function stopAll() {
  if (await offscreenExists()) chrome.runtime.sendMessage({ target: "offscreen", type: "stop" }).catch(() => {
  });
  const oldTab = session.tabId;
  const oldFrame = session.frameId || 0;
  session = { tabId: null, count: 0, index: -1, state: "idle", detail: "" };
  toTabQuiet(oldTab, { type: "state", state: "idle", detail: "" }, oldFrame);
  chrome.runtime.sendMessage({ type: "state-broadcast", session }).catch(() => {
  });
  await saveSession();
  return { ok: true };
}
async function togglePlay(tab) {
  if (!tab) return;
  if (isReaderTab(tab)) return toReaderTab(tab);
  const tabId = tab.id;
  diag(`play/pause key on ${hostOf(tab.url)}; reading is ${session.tabId === tabId ? session.state : "not in this tab"}`);
  if (session.tabId === tabId && session.state === "playing") return toOffscreen({ type: "pause" });
  if (session.tabId === tabId && session.state === "paused") return toOffscreen({ type: "resume" });
  if (session.tabId === tabId && (session.state === "loading" || session.state === "buffering")) return;
  return readTab(tab, "page");
}
async function handle(msg, sender) {
  await loadSession();
  switch (msg.type) {
    case "content:read": {
      const tabId = sender.tab.id;
      const frameId = sender.frameId || 0;
      if (session.tabId != null && (session.tabId !== tabId || (session.frameId || 0) !== frameId)) toTabQuiet(session.tabId, { type: "state", state: "idle", detail: "" }, session.frameId || 0);
      session = { tabId, frameId, count: msg.sentences.length, index: msg.startIndex, state: "loading", detail: "Starting\u2026" };
      diag(`page handed over ${msg.sentences.length} sentence(s) from frame #${frameId}, starting at ${msg.startIndex}`);
      await saveSession();
      await toOffscreen({
        type: "read",
        sentences: msg.sentences,
        breaks: msg.breaks || [],
        langs: msg.langs || [],
        startIndex: msg.startIndex,
        settings: await getSettings()
      });
      return { ok: true };
    }
    case "content:diag":
      diag(`page (frame #${sender.frameId || 0}): ${msg.text}`);
      return;
    case "content:langs":
      return toOffscreen({ type: "langs", items: msg.items, pageLang: msg.pageLang });
    case "content:phrase":
      return toOffscreen({ type: "phrase", text: msg.text });
    case "content:toggle":
      return togglePlay(sender.tab);
    case "content:next":
    case "content:prev":
    case "content:seek":
      if (sender.tab && (sender.tab.id !== session.tabId || (sender.frameId || 0) !== (session.frameId || 0))) return { ok: false, notReading: true };
      if (msg.type === "content:seek") return toOffscreen({ type: "seek", index: msg.index, word: msg.word || 0 });
      return toOffscreen({ type: "seek", delta: msg.type === "content:next" ? 1 : -1 });
    case "content:stop":
      if (sender.tab && session.tabId != null && (sender.tab.id !== session.tabId || (sender.frameId || 0) !== (session.frameId || 0))) return { ok: true };
      return stopAll();
    case "content:open-pdf":
      await openReader({ src: msg.url });
      return { ok: true };
    case "content:open-gdoc":
      return openGoogleDoc(msg.url, msg.title);
    case "offscreen:sentence":
      session.index = msg.index;
      toTabQuiet(session.tabId, { type: "sentence", index: msg.index, starts: msg.starts, offset: msg.offset, sentAt: msg.sentAt });
      return;
    case "offscreen:sync":
      toTabQuiet(session.tabId, { type: "sync", index: msg.index, elapsed: msg.elapsed, sentAt: msg.sentAt });
      return;
    case "offscreen:word":
      toTabQuiet(session.tabId, { type: "word", index: msg.index, word: msg.word });
      return;
    case "offscreen:state":
      if (session.state !== msg.state) diag(`voice: ${msg.state}${msg.state === "error" ? " " + (msg.detail || "") : ""}`);
      session.state = msg.state;
      session.detail = msg.detail || "";
      await broadcastState();
      return;
    case "offscreen:online-usage":
      usageWrites = usageWrites.then(async () => {
        const { onlineUsage } = await chrome.storage.local.get("onlineUsage");
        await chrome.storage.local.set({ onlineUsage: addUsage(onlineUsage, msg.usage?.add, msg.usage?.month) });
      }).catch(() => {
      });
      return usageWrites;
    case "offscreen:ended":
      diag("voice: finished");
      session.state = "idle";
      session.detail = "Finished";
      toTabQuiet(session.tabId, { type: "ended" });
      chrome.runtime.sendMessage({ type: "state-broadcast", session }).catch(() => {
      });
      await saveSession();
      return;
    case "popup:get-state": {
      const tab = await activeTab();
      return { session, settings: await getSettings(), tabId: tab?.id, tabUrl: tab?.url || "" };
    }
    case "popup:start": {
      const tab = await activeTab();
      if (!tab) return { error: "No tab is open." };
      return readTab(tab, msg.mode || "page");
    }
    case "popup:open-reader":
      await openReader(msg.src ? { src: msg.src } : {});
      return { ok: true };
    case "content:open-settings":
      await openSettingsWindow();
      return { ok: true };
    case "popup:open-welcome":
      await chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") + (msg.hash || "") });
      return { ok: true };
    case "popup:save-page": {
      const tab = await activeTab();
      if (!tab) return { error: "No tab is open." };
      if (isPdfUrl(tab.url)) {
        await openReader({ src: tab.url, save: "1" });
        return { ok: true };
      }
      if (googleDocId(tab.url)) return openGoogleDoc(tab.url, tab.title);
      try {
        const doc = await toTab(tab.id, { type: "extract" });
        if (!doc?.blocks?.length) return { error: "No readable text found on this page." };
        await openReaderWithDoc(doc, { save: "1" });
        return { ok: true };
      } catch {
        return { error: "Chrome doesn't let extensions read this page." };
      }
    }
    case "popup:toggle":
      return togglePlay(await activeTab());
    case "popup:next":
      return toOffscreen({ type: "seek", delta: 1 });
    case "popup:prev":
      return toOffscreen({ type: "seek", delta: -1 });
    case "popup:stop":
      return stopAll();
    case "settings-changed": {
      if (await offscreenExists()) {
        chrome.runtime.sendMessage({ target: "offscreen", type: "settings", settings: msg.settings }).catch(() => {
        });
      }
      toTabQuiet(session.tabId, { type: "settings", settings: msg.settings });
      return { ok: true };
    }
  }
}
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.target === "offscreen") return false;
  handle(msg, sender).then(sendResponse, (err) => sendResponse({ error: String(err?.message || err) }));
  return true;
});
async function onActionClick(tab) {
  await loadSession();
  if (!tab) return;
  if (isReaderTab(tab)) return toReaderTab(tab);
  if (/^(chrome|edge|about|chrome-extension|devtools):/.test(tab.url || "")) {
    await openReader({ library: "1" });
    return;
  }
  let res;
  if (session.tabId === tab.id && ["playing", "paused", "buffering", "loading"].includes(session.state)) res = await togglePlay(tab);
  else res = await readTab(tab, "page");
  if (res?.error) {
    console.warn("[murmur] could not start:", res.error);
    await openReader({ library: "1" });
  }
  return res;
}
chrome.action.onClicked.addListener((tab) => onActionClick(tab));
globalThis.murmurActionClick = onActionClick;
async function openSettingsWindow() {
  const url = chrome.runtime.getURL("popup.html");
  const existing = (await chrome.tabs.query({ url })).find((t) => t.windowId);
  if (existing) {
    await chrome.windows.update(existing.windowId, { focused: true });
    return;
  }
  await chrome.windows.create({ url, type: "popup", width: 352, height: 620 });
}
chrome.commands.onCommand.addListener(async (command) => {
  await loadSession();
  const tab = await activeTab();
  if (!tab) return;
  try {
    if (command === "toggle-play") {
      const res = await togglePlay(tab);
      if (res?.error) diag("play/pause key failed: " + res.error);
    } else if (session.tabId != null && session.state !== "idle") {
      await toOffscreen({ type: "seek", delta: command === "next-sentence" ? 1 : -1 });
    }
  } catch (e) {
    diag("shortcut failed: " + (e?.message || e));
  }
});
async function warmVoice() {
  try {
    await toOffscreen({ type: "prepare" });
  } catch (e) {
    console.warn("[murmur] could not warm the voice", e);
  }
}
chrome.runtime.onStartup.addListener(warmVoice);
async function refreshOpenTabs() {
  const tabs = await chrome.tabs.query({ url: ["http://*/*", "https://*/*"] }).catch(() => []);
  for (const t of tabs) {
    if (t.discarded || t.status !== "complete") continue;
    chrome.scripting.executeScript({ target: { tabId: t.id }, files: ["content.js"] }).catch(() => {
    });
    chrome.scripting.insertCSS({ target: { tabId: t.id }, files: ["content.css"] }).catch(() => {
    });
  }
}
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
  else refreshOpenTabs();
  warmVoice();
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "murmur-settings", title: "Voice, speed and settings", contexts: ["action"] });
    chrome.contextMenus.create({ id: "murmur-reader", title: "Open a PDF, Word file or text", contexts: ["action"] });
    chrome.contextMenus.create({ id: "murmur-help", title: "How to use Murmur", contexts: ["action"] });
    chrome.contextMenus.create({ id: "murmur-read-selection", title: "Read only this selection", contexts: ["selection"] });
    chrome.contextMenus.create({ id: "murmur-read-from-here", title: "Read out loud from here", contexts: ["page", "link", "image"] });
    chrome.contextMenus.create({
      id: "murmur-open-pdf",
      title: "Open this PDF in Murmur",
      contexts: ["link"],
      targetUrlPatterns: ["*://*/*.pdf", "*://*/*.pdf?*", "*://*/*.pdf#*", "*://*/*.PDF"]
    });
  });
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "murmur-open-pdf") {
    await openReader({ src: info.linkUrl });
    return;
  }
  if (info.menuItemId === "murmur-settings") return openSettingsWindow();
  if (info.menuItemId === "murmur-reader") return openReader();
  if (info.menuItemId === "murmur-help") return chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") + "#how" });
  if (!tab?.id) return;
  const mode = info.menuItemId === "murmur-read-selection" ? "selection-only" : "from-click";
  await readTab(tab, mode);
});
chrome.tabs.onRemoved.addListener(async (tabId) => {
  await loadSession();
  if (session.tabId === tabId) stopAll();
});
globalThis.murmurPickFrame = pickFrame;

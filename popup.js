(() => {
  // src/voices.js
  var VOICES = [
    // Mya's mixes, built from her ratings of the samples (Nov 5, 2026):
    // Cosmopolitan best; Fable+George good; Fable, George, Fable+Daniel ok/good;
    // George+Fenrir fuzzy; Daniel no. Weighted toward Fable, with George for
    // warmth and a little Michael for the cosmopolitan touch. No Fenrir.
    // Round 2 (Nov 5): Your Mix was "pretty good" but wanted warmer, fuller, more
    // resonant. More George sounded older; more Michael sounded pretentious. So
    // depth now comes from Lewis or Onyx instead, with George and Michael trimmed.
    // All of these play with the warm tone filter on by default.
    // Round 3 (Nov 6): #1 too light/feminine in the highs, wants a tad deeper;
    // #2 (Lewis) nice but "more queen than cosmo"; #3 (Onyx) nice, hard to tell
    // from #2. So: depth from both Lewis and Onyx, less George, Michael back up a
    // little for the cosmopolitan feel, and the new depth control on by default.
    { id: "bm_fable*0.5+am_onyx*0.16+bm_lewis*0.1+am_michael*0.14+bm_george*0.1", name: "Your Mix", desc: "Your voice", group: "Your voices" },
    { id: "bm_fable*0.55+am_onyx*0.17+bm_george*0.14+am_michael*0.14", name: "Your Mix, rounder", desc: "Deeper and rounder, a touch more transatlantic", group: "Your voices" },
    { id: "bm_fable*0.55+bm_lewis*0.17+bm_george*0.14+am_michael*0.14", name: "Your Mix, fuller", desc: "Deeper and more resonant, a little more British", group: "Your voices" },
    // British men: Mya prefers a man's voice with a light British accent.
    { id: "bm_fable", name: "Fable", desc: "British man", group: "British men" },
    { id: "bm_george", name: "George", desc: "British man", group: "British men" },
    { id: "bm_fable*0.6+bm_george*0.4", name: "Fable and George", desc: "British man, a mix of the two", group: "British men" },
    { id: "bm_fable*0.7+am_michael*0.3", name: "Cosmopolitan", desc: "British man with a touch of American, a mix", group: "British men" },
    { id: "bm_george*0.6+am_fenrir*0.4", name: "George and Fenrir", desc: "British man with a touch of American, a mix", group: "British men" },
    { id: "bm_fable*0.5+bm_daniel*0.5", name: "Fable and Daniel", desc: "British man, lower, a mix", group: "British men" },
    { id: "bm_daniel", name: "Daniel", desc: "British man, lower", group: "British men" },
    { id: "bm_lewis", name: "Lewis", desc: "British man, deep", group: "British men" },
    { id: "am_michael", name: "Michael", desc: "American man", group: "American men" },
    { id: "am_fenrir", name: "Fenrir", desc: "American man", group: "American men" },
    { id: "am_puck", name: "Puck", desc: "American man", group: "American men" },
    { id: "am_echo", name: "Echo", desc: "American man", group: "American men" },
    { id: "am_eric", name: "Eric", desc: "American man", group: "American men" },
    { id: "am_liam", name: "Liam", desc: "American man", group: "American men" },
    { id: "am_onyx", name: "Onyx", desc: "American man, deep", group: "American men" },
    { id: "bf_emma", name: "Emma", desc: "British woman", group: "British women" },
    { id: "bf_isabella", name: "Isabella", desc: "British woman", group: "British women" },
    { id: "bf_alice", name: "Alice", desc: "British woman", group: "British women" },
    { id: "bf_lily", name: "Lily", desc: "British woman", group: "British women" },
    { id: "af_heart", name: "Heart", desc: "American woman, the clearest voice overall", group: "American women" },
    { id: "af_bella", name: "Bella", desc: "American woman", group: "American women" },
    { id: "af_nicole", name: "Nicole", desc: "American woman, soft", group: "American women" },
    { id: "af_aoede", name: "Aoede", desc: "American woman", group: "American women" },
    { id: "af_kore", name: "Kore", desc: "American woman", group: "American women" },
    { id: "af_sarah", name: "Sarah", desc: "American woman", group: "American women" },
    { id: "af_nova", name: "Nova", desc: "American woman", group: "American women" },
    { id: "af_alloy", name: "Alloy", desc: "American woman", group: "American women" },
    { id: "af_sky", name: "Sky", desc: "American woman", group: "American women" }
  ];
  var GROUPS = [...new Set(VOICES.map((v) => v.group))];
  var SAME = { id: "same", name: "Your voice", desc: "Your usual voice, speaking this language" };
  var LANG_VOICES = {
    es: [
      { id: "piper:es_MX-claude-high", name: "Claude", desc: "Mexican man" },
      { id: "piper:es_ES-sharvard-medium", name: "Sharvard", desc: "Spanish man, Spain" },
      { id: "piper:es_MX-ald-medium", name: "Ald", desc: "Mexican man, softer" },
      { id: "em_alex*0.5+em_santa*0.5", name: "Alex and Santa", desc: "Spanish man, blend" },
      { id: "em_santa", name: "Santa", desc: "Spanish man, softer" },
      SAME,
      { id: "ef_dora", name: "Dora", desc: "Spanish woman" }
    ],
    fr: [
      { id: "ff_siwis", name: "Siwis", desc: "French woman, the only native French speaker in this voice" },
      { id: "ff_siwis*0.6+im_nicola*0.4", name: "Siwis, lower", desc: "Siwis blended with an Italian man: native accent, deeper" },
      { id: "ff_siwis*0.5+em_alex*0.5", name: "Siwis and Alex", desc: "Half French woman, half Spanish man" },
      { id: "im_nicola", name: "Nicola", desc: "Italian man, speaking French" },
      SAME
    ],
    it: [
      { id: "im_nicola*0.7+bm_fable*0.3", name: "Nicola, warmer", desc: "Italian man with a touch of your voice" },
      { id: "im_nicola", name: "Nicola", desc: "Italian man" },
      SAME,
      { id: "if_sara", name: "Sara", desc: "Italian woman" }
    ],
    pt: [
      { id: "piper:pt_BR-cadu-medium", name: "Cadu", desc: "Brazilian man" },
      { id: "piper:pt_BR-jeff-medium", name: "Jeff", desc: "Brazilian man, darker" },
      { id: "pm_alex*0.5+pm_santa*0.5", name: "Alex and Santa", desc: "Brazilian man, blend" },
      { id: "pm_alex", name: "Alex", desc: "Brazilian man" },
      { id: "pm_santa", name: "Santa", desc: "Brazilian man, softer" },
      SAME,
      { id: "pf_dora", name: "Dora", desc: "Brazilian woman" }
    ],
    hi: [
      { id: "piper:hi_IN-pratham-medium", name: "Pratham", desc: "Hindi man" },
      { id: "hm_psi", name: "Psi", desc: "Hindi man" },
      { id: "hm_omega", name: "Omega", desc: "Hindi man" },
      SAME,
      { id: "hf_alpha", name: "Alpha", desc: "Hindi woman" }
    ],
    zh: [
      { id: "zm_yunyang", name: "Yunyang", desc: "Mandarin man, clear" },
      { id: "zm_yunxi", name: "Yunxi", desc: "Mandarin man" },
      { id: "zm_yunjian", name: "Yunjian", desc: "Mandarin man, deeper" },
      { id: "zf_xiaoxiao", name: "Xiaoxiao", desc: "Mandarin woman" }
    ]
  };
  function voiceInfo(id) {
    return VOICES.find((v) => v.id === id) || { id, name: id, desc: "", group: "" };
  }
  var safeId = (id) => String(id).replace(/\*/g, "-").replace(/\+/g, "_").replace(/\./g, "").replace(/:/g, "-");
  function sampleFile(id) {
    return "samples/" + safeId(id) + ".mp3";
  }
  function langSampleFile(lang, id) {
    return `samples/lang-${lang}-${safeId(id)}.mp3`;
  }

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
    // Mya's pick, Nov 9 (Algieba close second)
    // Mya's picks, Nov 8: Spanish Sharvard (native engine), Italian Nicola with a
    // touch of her voice, Portuguese the Alex+Santa blend.
    // Chosen by measurement (dev/clarity.mjs): the cleanest speaker per language,
    // least noise above 8 kHz. Mya hears that noise as "static".
    langVoices: { es: "piper:es_MX-claude-high", fr: "ff_siwis", it: "im_nicola*0.7+bm_fable*0.3", pt: "piper:pt_BR-cadu-medium", hi: "piper:hi_IN-pratham-medium", zh: "zm_yunyang", la: "im_nicola" }
  };

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

  // src/online.js
  var ONLINE_LOCALES = {
    en: "en-GB",
    es: "es-US",
    fr: "fr-FR",
    it: "it-IT",
    pt: "pt-BR",
    hi: "hi-IN",
    zh: "cmn-CN",
    de: "de-DE",
    el: "el-GR",
    ru: "ru-RU",
    ar: "ar-XA",
    tr: "tr-TR",
    ja: "ja-JP",
    ko: "ko-KR",
    nl: "nl-NL",
    pl: "pl-PL",
    uk: "uk-UA",
    vi: "vi-VN",
    id: "id-ID",
    th: "th-TH",
    bn: "bn-IN",
    sv: "sv-SE",
    da: "da-DK",
    fi: "fi-FI",
    nb: "nb-NO",
    no: "nb-NO",
    cs: "cs-CZ",
    hu: "hu-HU",
    ro: "ro-RO",
    sk: "sk-SK",
    bg: "bg-BG",
    hr: "hr-HR",
    sr: "sr-RS",
    he: "he-IL",
    fa: "fa-IR",
    ta: "ta-IN",
    te: "te-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    ur: "ur-IN",
    sw: "sw-KE"
  };
  var ONLINE_VOICES = [
    { id: "Charon", desc: "informative" },
    { id: "Iapetus", desc: "clear" },
    { id: "Schedar", desc: "even" },
    { id: "Sadaltager", desc: "knowledgeable" },
    { id: "Rasalgethi", desc: "informative" },
    { id: "Orus", desc: "firm" },
    { id: "Alnilam", desc: "firm" },
    { id: "Umbriel", desc: "easy-going" },
    { id: "Achird", desc: "friendly" },
    { id: "Puck", desc: "upbeat" },
    { id: "Fenrir", desc: "excitable" },
    { id: "Enceladus", desc: "breathy" },
    { id: "Algieba", desc: "smooth" },
    { id: "Algenib", desc: "gravelly" },
    { id: "Zubenelgenubi", desc: "casual" },
    { id: "Sadachbia", desc: "lively" }
  ];
  var STOP_AT = 3e5;
  function addUsage(saved, add, month = monthKey()) {
    const base = saved && saved.month === month ? saved.chars : 0;
    return { month, chars: base + (add || 0) };
  }
  var ENDPOINT = "https://texttospeech.googleapis.com/v1/text:synthesize";
  var TIMEOUT_MS = 8e3;
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
  function syncUsage(saved) {
    const m = monthKey();
    if (state.usage.month !== m) state.usage = { month: m, chars: 0 };
    if (saved && saved.month === m && saved.chars > state.usage.chars) state.usage.chars = saved.chars;
  }
  function usageNow(saved) {
    syncUsage(saved);
    return { ...state.usage };
  }
  function onlineReady(settings2, lang, { ignoreLimit = false } = {}) {
    if (!settings2?.onlineVoices || !settings2.googleKey) return false;
    if (settings2.googleKey === state.badKey) return false;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return false;
    if (Date.now() < state.pauseUntil) return false;
    const locale = ONLINE_LOCALES[lang || "en"];
    if (!locale || state.missing.has(locale)) return false;
    syncUsage(settings2.onlineUsage);
    return ignoreLimit || state.usage.chars < STOP_AT;
  }
  function base64ToBytes(b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function wavToFloat(bytes) {
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let off = 12;
    let rate = 24e3;
    while (off + 8 <= bytes.length) {
      const id = String.fromCharCode(bytes[off], bytes[off + 1], bytes[off + 2], bytes[off + 3]);
      const size = v.getUint32(off + 4, true);
      if (id === "fmt ") rate = v.getUint32(off + 12, true);
      if (id === "data") {
        const n2 = Math.floor(Math.min(size, bytes.length - off - 8) / 2);
        const out2 = new Float32Array(n2);
        for (let i = 0; i < n2; i++) out2[i] = v.getInt16(off + 8 + i * 2, true) / 32768;
        return { audio: out2, rate };
      }
      off += 8 + size + (size & 1);
    }
    const n = Math.floor(bytes.length / 2);
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) out[i] = v.getInt16(i * 2, true) / 32768;
    return { audio: out, rate };
  }
  async function onlineSynthesize({ text, lang, settings: settings2, speakingRate = 1, onUsage, ignoreLimit = false }) {
    if (!onlineReady(settings2, lang, { ignoreLimit })) return null;
    const locale = ONLINE_LOCALES[lang || "en"];
    const speaker = settings2.onlineVoice || "Sadaltager";
    const body = {
      input: { text },
      voice: { languageCode: locale, name: `${locale}-Chirp3-HD-${speaker}` },
      audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 24e3, speakingRate: Math.max(0.25, Math.min(2, speakingRate)) }
    };
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": settings2.googleKey },
        body: JSON.stringify(body),
        signal: ctl.signal
      });
    } catch {
      state.pauseUntil = Date.now() + 6e4;
      state.lastProblem = "Couldn't reach Google, so Murmur's own voice is reading.";
      return null;
    } finally {
      clearTimeout(timer);
    }
    if (!res.ok) {
      let msg = "";
      try {
        msg = (await res.json())?.error?.message || "";
      } catch {
      }
      if (res.status === 400 && /voice|language/i.test(msg)) {
        state.missing.add(locale);
      } else if (res.status === 400 || res.status === 401 || res.status === 403) {
        state.badKey = settings2.googleKey;
        state.lastProblem = "Google did not accept the key: " + (msg || res.status);
      } else {
        state.pauseUntil = Date.now() + 6e4;
        state.lastProblem = "Google was busy, so Murmur's own voice is reading for a minute.";
      }
      return null;
    }
    const json = await res.json();
    if (!json?.audioContent) return null;
    const { audio } = wavToFloat(base64ToBytes(json.audioContent));
    syncUsage(settings2.onlineUsage);
    state.usage.chars += text.length;
    state.lastProblem = "";
    onUsage?.({ month: state.usage.month, add: text.length });
    return { audio, chars: text.length };
  }
  async function testOnlineVoice(key, speaker = "Charon", lang = "en") {
    const s = { onlineVoices: true, googleKey: key, onlineVoice: speaker, onlineUsage: null };
    state.badKey = "";
    state.pauseUntil = 0;
    const line = {
      en: "Hello. This is how I sound when I read to you.",
      es: "Hola. As\xED sueno cuando te leo en espa\xF1ol.",
      fr: "Bonjour. Voici ma voix quand je lis en fran\xE7ais.",
      de: "Guten Tag. So klinge ich, wenn ich auf Deutsch vorlese."
    }[lang] || "Hello.";
    const r = await onlineSynthesize({ text: line, lang, settings: s, ignoreLimit: true });
    if (!r) return { ok: false, problem: state.lastProblem || "No answer from Google." };
    return { ok: true, audio: r.audio, chars: r.chars };
  }

  // src/popup.js
  var $ = (id) => document.getElementById(id);
  var send = (msg) => new Promise((res) => chrome.runtime.sendMessage(msg, res));
  var settings = { ...DEFAULTS };
  function fillVoices(select) {
    for (const g of GROUPS) {
      const og = document.createElement("optgroup");
      og.label = g;
      for (const v of VOICES.filter((x) => x.group === g)) {
        const o = document.createElement("option");
        o.value = v.id;
        o.textContent = `${v.name} (${v.desc})`;
        og.appendChild(o);
      }
      select.appendChild(og);
    }
    if (![...select.options].some((o) => o.value === settings.voice)) {
      const o = document.createElement("option");
      o.value = settings.voice;
      o.textContent = voiceInfo(settings.voice).name;
      select.prepend(o);
    }
  }
  function fillLanguageVoices() {
    const box = $("langVoices");
    box.textContent = "";
    const chosen = { ...DEFAULTS.langVoices, ...settings.langVoices || {} };
    for (const [lang, list] of Object.entries(LANG_VOICES)) {
      const row = document.createElement("div");
      row.className = "lang";
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = LANGS[lang]?.name || lang;
      const sel = document.createElement("select");
      for (const v of list) {
        const o = document.createElement("option");
        o.value = v.id;
        o.textContent = v.name + (v.desc && v.id !== "same" ? ` (${v.desc})` : "");
        sel.appendChild(o);
      }
      sel.value = chosen[lang] || list[0].id;
      if (!sel.value) sel.value = list[0].id;
      sel.onchange = () => saveSettings({ langVoices: { ...chosen, ...settings.langVoices || {}, [lang]: sel.value } });
      const btn = document.createElement("button");
      btn.className = "listen";
      btn.innerHTML = "&#9654;";
      btn.title = "Hear this voice";
      btn.onclick = () => {
        const a = $("sample");
        a.src = langSampleFile(lang, sel.value);
        a.play().catch(() => showMsg("This voice's sample isn't available yet."));
      };
      row.append(name, sel, btn);
      box.appendChild(row);
    }
  }
  function renderState(session) {
    const active = session && session.tabId != null && session.state !== "idle";
    $("now").hidden = !active;
    if (!active) return;
    const st = $("status");
    st.classList.toggle("err", session.state === "error");
    const pos = session.index >= 0 && session.count ? `${session.index + 1} of ${session.count}` : "";
    const text = {
      loading: session.detail || "Getting the voice ready\u2026",
      buffering: "Starting\u2026",
      playing: `Reading sentence ${pos}`,
      paused: `Paused at sentence ${pos}`,
      error: session.detail || "Something went wrong"
    }[session.state];
    st.textContent = text || session.state;
    $("toggle").innerHTML = session.state === "playing" ? "&#10074;&#10074;" : "&#9654;";
    $("toggle").title = session.state === "playing" ? "Pause" : "Play";
  }
  function renderSettings() {
    $("voice").value = settings.voice;
    $("speed").value = settings.speed;
    $("speedVal").textContent = Math.round(Number(settings.speed) * 100) / 100 + "\xD7";
    $("skipCitations").checked = settings.skipCitations !== false;
    $("selectButton").checked = !!settings.selectButton;
    renderOnline();
  }
  function renderOnline(problem) {
    $("onlineVoices").checked = settings.onlineVoices !== false;
    $("onlineVoice").value = settings.onlineVoice || "Sadaltager";
    if (!$("googleKey").value && settings.googleKey) $("googleKey").placeholder = "Key saved (paste a new one to change it)";
    const used = usageNow(settings.onlineUsage).chars;
    let text;
    if (problem) text = problem;
    else if (!settings.googleKey) text = "No key yet, so Murmur uses its own voices.";
    else if (settings.onlineVoices === false) text = "Off: Murmur uses its own voices.";
    else if (used >= STOP_AT) text = "This month's free amount is used up; Murmur's own voices read until next month.";
    else text = "On. This month: " + used.toLocaleString() + " of " + STOP_AT.toLocaleString() + " free letters on this computer.";
    $("onlineStatus").textContent = text;
  }
  async function countSample(chars) {
    const { onlineUsage } = await chrome.storage.local.get("onlineUsage");
    settings.onlineUsage = addUsage(onlineUsage, chars);
    await chrome.storage.local.set({ onlineUsage: settings.onlineUsage });
  }
  var sampleCtx = null;
  var sampleSrc = null;
  function playFloat(audio) {
    sampleCtx = sampleCtx || new AudioContext({ sampleRate: 24e3 });
    if (sampleSrc) sampleSrc.stop();
    const buf = sampleCtx.createBuffer(1, audio.length, 24e3);
    buf.copyToChannel(audio, 0);
    sampleSrc = sampleCtx.createBufferSource();
    sampleSrc.buffer = buf;
    sampleSrc.connect(sampleCtx.destination);
    sampleSrc.onended = () => ($("onlineListen").innerHTML = "&#9654; Listen", sampleSrc = null);
    sampleSrc.start();
    $("onlineListen").innerHTML = "&#10074;&#10074; Stop";
  }
  function initOnline() {
    for (const v of ONLINE_VOICES) {
      const o = document.createElement("option");
      o.value = v.id;
      o.textContent = v.id + " (" + v.desc + ")";
      $("onlineVoice").appendChild(o);
    }
    $("onlineVoices").onchange = () => saveSettings({ onlineVoices: $("onlineVoices").checked });
    $("onlineVoice").onchange = () => saveSettings({ onlineVoice: $("onlineVoice").value });
    $("saveKey").onclick = async () => {
      const key = $("googleKey").value.trim();
      if (!key) return;
      $("onlineStatus").textContent = "Checking the key with Google\u2026";
      const r = await testOnlineVoice(key, settings.onlineVoice || "Sadaltager");
      if (!r.ok) return renderOnline(r.problem + " The key was not saved.");
      await countSample(r.chars);
      $("googleKey").value = "";
      await saveSettings({ googleKey: key, onlineVoices: true });
      playFloat(r.audio);
    };
    $("onlineListen").onclick = async () => {
      if (sampleSrc) return sampleSrc.stop();
      if (!settings.googleKey) return renderOnline("Save your Google key first, then you can listen.");
      $("onlineStatus").textContent = "Asking Google\u2026";
      const r = await testOnlineVoice(settings.googleKey, $("onlineVoice").value);
      if (!r.ok) return renderOnline(r.problem);
      await countSample(r.chars);
      renderOnline();
      playFloat(r.audio);
    };
    $("keyHelp").onclick = () => chrome.tabs.create({ url: chrome.runtime.getURL("google-key.html") });
  }
  async function saveSettings(patch) {
    settings = { ...settings, ...patch };
    await chrome.storage.sync.set(patch);
    send({ type: "settings-changed", settings });
    renderSettings();
  }
  function showMsg(text) {
    $("msg").textContent = text || "";
  }
  async function run(msg) {
    showMsg("");
    const r = await send(msg);
    if (r?.error) showMsg(r.error);
    else window.close();
  }
  async function init() {
    const res = await send({ type: "popup:get-state" });
    if (res?.settings) settings = { ...DEFAULTS, ...res.settings };
    fillVoices($("voice"));
    fillLanguageVoices();
    initOnline();
    renderSettings();
    if (res?.session) renderState(res.session);
    const url = res?.tabUrl || "";
    if (/\.pdf($|[?#])/i.test(url)) $("readLabel").textContent = "Read this PDF";
    else if (/docs\.google\.com\/document\//.test(url)) $("readLabel").textContent = "Read this Google Doc";
    if (res?.session?.tabId === res?.tabId && ["playing", "paused"].includes(res?.session?.state)) {
      $("readLabel").textContent = "Start this page again";
    }
    $("readPage").onclick = () => run({ type: "popup:start", mode: "page" });
    $("openReader").onclick = () => run({ type: "popup:open-reader" });
    $("savePage").onclick = () => run({ type: "popup:save-page" });
    $("voices").onclick = () => run({ type: "popup:open-welcome", hash: "#voices" });
    $("help").onclick = () => run({ type: "popup:open-welcome", hash: "#how" });
    $("toggle").onclick = () => send({ type: "popup:toggle" });
    $("next").onclick = () => send({ type: "popup:next" });
    $("prev").onclick = () => send({ type: "popup:prev" });
    $("stop").onclick = () => send({ type: "popup:stop" });
    $("voice").onchange = () => saveSettings({ voice: $("voice").value });
    $("listen").onclick = () => {
      const a = $("sample");
      if (!a.paused && a.dataset.voice === $("voice").value) {
        a.pause();
        $("listen").innerHTML = "&#9654; Listen";
        return;
      }
      a.src = sampleFile($("voice").value);
      a.dataset.voice = $("voice").value;
      a.play().catch(() => showMsg("This voice's sample isn't available yet."));
      $("listen").innerHTML = "&#10074;&#10074; Stop";
    };
    $("sample").onended = () => $("listen").innerHTML = "&#9654; Listen";
    $("speed").oninput = () => $("speedVal").textContent = Math.round(Number($("speed").value) * 100) / 100 + "\xD7";
    $("speed").onchange = () => saveSettings({ speed: parseFloat($("speed").value) });
    $("skipCitations").onchange = () => saveSettings({ skipCitations: $("skipCitations").checked });
    $("selectButton").onchange = () => saveSettings({ selectButton: $("selectButton").checked });
    $("shortcuts").onclick = () => chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg?.type === "state-broadcast") renderState(msg.session);
    });
  }
  init();
})();

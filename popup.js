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
  function voiceInfo(id2) {
    return VOICES.find((v) => v.id === id2) || { id: id2, name: id2, desc: "", group: "" };
  }
  var safeId = (id2) => String(id2).replace(/\*/g, "-").replace(/\+/g, "_").replace(/\./g, "").replace(/:/g, "-");
  function sampleFile(id2) {
    return "samples/" + safeId(id2) + ".mp3";
  }
  function langSampleFile(lang, id2) {
    return `samples/lang-${lang}-${safeId(id2)}.mp3`;
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
    onlineVoiceByLang: {},
    // a different Google voice for one language, e.g. { ru: 'Charon' } // Mya's pick, Nov 9 (Algieba close second)
    // Mya's picks, Nov 8: Spanish Sharvard (native engine), Italian Nicola with a
    // touch of her voice, Portuguese the Alex+Santa blend.
    // Chosen by measurement (dev/clarity.mjs): the cleanest speaker per language,
    // least noise above 8 kHz. Mya hears that noise as "static".
    langVoices: { es: "piper:es_MX-claude-high", fr: "ff_siwis", it: "im_nicola*0.7+bm_fable*0.3", pt: "piper:pt_BR-cadu-medium", hi: "piper:hi_IN-pratham-medium", zh: "zm_yunyang", la: "im_nicola" }
  };

  // node_modules/fasttext.wasm.js/dist/constants.mjs
  var IS_BROWSER = typeof window !== "undefined" && !!window.document && !!window.document.createElement;
  var IS_WORKER = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    "importScripts" in globalThis && typeof globalThis.importScripts == "function"
  );

  // node_modules/fasttext.wasm.js/dist/models/language-identification/assets/languages.json.mjs
  var af = {
    alpha3: "afr",
    alpha2: "af",
    refName: "Afrikaans"
  };
  var als = {
    alpha3: "gsw",
    alpha2: null,
    refName: "Swiss German"
  };
  var am = {
    alpha3: "amh",
    alpha2: "am",
    refName: "Amharic"
  };
  var an = {
    alpha3: "arg",
    alpha2: "an",
    refName: "Aragonese"
  };
  var ar = {
    alpha3: "ara",
    alpha2: "ar",
    refName: "Arabic"
  };
  var arz = {
    alpha3: "arz",
    alpha2: null,
    refName: "Egyptian Arabic"
  };
  var as = {
    alpha3: "asm",
    alpha2: "as",
    refName: "Assamese"
  };
  var ast = {
    alpha3: "ast",
    alpha2: null,
    refName: "Asturian"
  };
  var av = {
    alpha3: "ava",
    alpha2: "av",
    refName: "Avaric"
  };
  var az = {
    alpha3: "aze",
    alpha2: "az",
    refName: "Azerbaijani"
  };
  var azb = {
    alpha3: "azb",
    alpha2: null,
    refName: "South Azerbaijani"
  };
  var ba = {
    alpha3: "bak",
    alpha2: "ba",
    refName: "Bashkir"
  };
  var bar = {
    alpha3: "bar",
    alpha2: null,
    refName: "Bavarian"
  };
  var bcl = {
    alpha3: "bcl",
    alpha2: null,
    refName: "Central Bikol"
  };
  var be = {
    alpha3: "bel",
    alpha2: "be",
    refName: "Belarusian"
  };
  var bg = {
    alpha3: "bul",
    alpha2: "bg",
    refName: "Bulgarian"
  };
  var bh = {
    alpha3: "bih",
    alpha2: "bh",
    refName: "Bihari languages"
  };
  var bn = {
    alpha3: "ben",
    alpha2: "bn",
    refName: "Bengali"
  };
  var bo = {
    alpha3: "bod",
    alpha2: "bo",
    refName: "Tibetan"
  };
  var bpy = {
    alpha3: "bpy",
    alpha2: null,
    refName: "Bishnupriya"
  };
  var br = {
    alpha3: "bre",
    alpha2: "br",
    refName: "Breton"
  };
  var bs = {
    alpha3: "bos",
    alpha2: "bs",
    refName: "Bosnian"
  };
  var bxr = {
    alpha3: "bxr",
    alpha2: null,
    refName: "Russia Buriat"
  };
  var ca = {
    alpha3: "cat",
    alpha2: "ca",
    refName: "Catalan"
  };
  var cbk = {
    alpha3: "cbk",
    alpha2: null,
    refName: "Chavacano"
  };
  var ce = {
    alpha3: "che",
    alpha2: "ce",
    refName: "Chechen"
  };
  var ceb = {
    alpha3: "ceb",
    alpha2: null,
    refName: "Cebuano"
  };
  var ckb = {
    alpha3: "kur",
    alpha2: "ku",
    refName: "Kurdish"
  };
  var co = {
    alpha3: "cos",
    alpha2: "co",
    refName: "Corsican"
  };
  var cs = {
    alpha3: "ces",
    alpha2: "cs",
    refName: "Czech"
  };
  var cv = {
    alpha3: "chv",
    alpha2: "cv",
    refName: "Chuvash"
  };
  var cy = {
    alpha3: "cym",
    alpha2: "cy",
    refName: "Welsh"
  };
  var da = {
    alpha3: "dan",
    alpha2: "da",
    refName: "Danish"
  };
  var de = {
    alpha3: "deu",
    alpha2: "de",
    refName: "German"
  };
  var diq = {
    alpha3: "zza",
    alpha2: null,
    refName: "Zaza"
  };
  var dsb = {
    alpha3: "dsb",
    alpha2: null,
    refName: "Lower Sorbian"
  };
  var dty = {
    alpha3: "dty",
    alpha2: null,
    refName: "Dotyali"
  };
  var dv = {
    alpha3: "div",
    alpha2: "dv",
    refName: "Dhivehi"
  };
  var el = {
    alpha3: "ell",
    alpha2: "el",
    refName: "Modern Greek (1453-)"
  };
  var eml = {
    alpha3: "eml",
    alpha2: null,
    refName: "Emiliano-Romagnolo"
  };
  var en = {
    alpha3: "eng",
    alpha2: "en",
    refName: "English"
  };
  var eo = {
    alpha3: "epo",
    alpha2: "eo",
    refName: "Esperanto"
  };
  var es = {
    alpha3: "spa",
    alpha2: "es",
    refName: "Spanish"
  };
  var et = {
    alpha3: "est",
    alpha2: "et",
    refName: "Estonian"
  };
  var eu = {
    alpha3: "eus",
    alpha2: "eu",
    refName: "Basque"
  };
  var fa = {
    alpha3: "fas",
    alpha2: "fa",
    refName: "Persian"
  };
  var fi = {
    alpha3: "fin",
    alpha2: "fi",
    refName: "Finnish"
  };
  var fr = {
    alpha3: "fra",
    alpha2: "fr",
    refName: "French"
  };
  var frr = {
    alpha3: "frr",
    alpha2: null,
    refName: "Northern Frisian"
  };
  var fy = {
    alpha3: "fry",
    alpha2: "fy",
    refName: "Western Frisian"
  };
  var ga = {
    alpha3: "gle",
    alpha2: "ga",
    refName: "Irish"
  };
  var gd = {
    alpha3: "gla",
    alpha2: "gd",
    refName: "Scottish Gaelic"
  };
  var gl = {
    alpha3: "glg",
    alpha2: "gl",
    refName: "Galician"
  };
  var gn = {
    alpha3: "grn",
    alpha2: "gn",
    refName: "Guarani"
  };
  var gom = {
    alpha3: "gom",
    alpha2: null,
    refName: "Goan Konkani"
  };
  var gu = {
    alpha3: "guj",
    alpha2: "gu",
    refName: "Gujarati"
  };
  var gv = {
    alpha3: "glv",
    alpha2: "gv",
    refName: "Manx"
  };
  var he = {
    alpha3: "heb",
    alpha2: "he",
    refName: "Hebrew"
  };
  var hi = {
    alpha3: "hin",
    alpha2: "hi",
    refName: "Hindi"
  };
  var hif = {
    alpha3: "hif",
    alpha2: null,
    refName: "Fiji Hindi"
  };
  var hr = {
    alpha3: "hrv",
    alpha2: "hr",
    refName: "Croatian"
  };
  var hsb = {
    alpha3: "hsb",
    alpha2: null,
    refName: "Upper Sorbian"
  };
  var ht = {
    alpha3: "hat",
    alpha2: "ht",
    refName: "Haitian"
  };
  var hu = {
    alpha3: "hun",
    alpha2: "hu",
    refName: "Hungarian"
  };
  var hy = {
    alpha3: "hye",
    alpha2: "hy",
    refName: "Armenian"
  };
  var ia = {
    alpha3: "ina",
    alpha2: "ia",
    refName: "Interlingua (International Auxiliary Language Association)"
  };
  var id = {
    alpha3: "ind",
    alpha2: "id",
    refName: "Indonesian"
  };
  var ie = {
    alpha3: "ile",
    alpha2: "ie",
    refName: "Interlingue"
  };
  var ilo = {
    alpha3: "ilo",
    alpha2: null,
    refName: "Iloko"
  };
  var io = {
    alpha3: "ido",
    alpha2: "io",
    refName: "Ido"
  };
  var is = {
    alpha3: "isl",
    alpha2: "is",
    refName: "Icelandic"
  };
  var it = {
    alpha3: "ita",
    alpha2: "it",
    refName: "Italian"
  };
  var ja = {
    alpha3: "jpn",
    alpha2: "ja",
    refName: "Japanese"
  };
  var jbo = {
    alpha3: "jbo",
    alpha2: null,
    refName: "Lojban"
  };
  var jv = {
    alpha3: "jav",
    alpha2: "jv",
    refName: "Javanese"
  };
  var ka = {
    alpha3: "kat",
    alpha2: "ka",
    refName: "Georgian"
  };
  var kk = {
    alpha3: "kaz",
    alpha2: "kk",
    refName: "Kazakh"
  };
  var km = {
    alpha3: "khm",
    alpha2: "km",
    refName: "Khmer"
  };
  var kn = {
    alpha3: "kan",
    alpha2: "kn",
    refName: "Kannada"
  };
  var ko = {
    alpha3: "kor",
    alpha2: "ko",
    refName: "Korean"
  };
  var krc = {
    alpha3: "krc",
    alpha2: null,
    refName: "Karachay-Balkar"
  };
  var ku = {
    alpha3: "kmr",
    alpha2: null,
    refName: "Northern Kurdish"
  };
  var kv = {
    alpha3: "kom",
    alpha2: "kv",
    refName: "Komi"
  };
  var kw = {
    alpha3: "cor",
    alpha2: "kw",
    refName: "Cornish"
  };
  var ky = {
    alpha3: "kir",
    alpha2: "ky",
    refName: "Kirghiz"
  };
  var la = {
    alpha3: "lat",
    alpha2: "la",
    refName: "Latin"
  };
  var lb = {
    alpha3: "ltz",
    alpha2: "lb",
    refName: "Luxembourgish"
  };
  var lez = {
    alpha3: "lez",
    alpha2: null,
    refName: "Lezghian"
  };
  var li = {
    alpha3: "lim",
    alpha2: "li",
    refName: "Limburgan"
  };
  var lmo = {
    alpha3: "lmo",
    alpha2: null,
    refName: "Lombard"
  };
  var lo = {
    alpha3: "lao",
    alpha2: "lo",
    refName: "Lao"
  };
  var lrc = {
    alpha3: "lrc",
    alpha2: null,
    refName: "Northern Luri"
  };
  var lt = {
    alpha3: "lit",
    alpha2: "lt",
    refName: "Lithuanian"
  };
  var lv = {
    alpha3: "lav",
    alpha2: "lv",
    refName: "Latvian"
  };
  var mai = {
    alpha3: "mai",
    alpha2: null,
    refName: "Maithili"
  };
  var mg = {
    alpha3: "mlg",
    alpha2: "mg",
    refName: "Malagasy"
  };
  var mhr = {
    alpha3: "mhr",
    alpha2: null,
    refName: "Eastern Mari"
  };
  var min = {
    alpha3: "min",
    alpha2: null,
    refName: "Minangkabau"
  };
  var mk = {
    alpha3: "mkd",
    alpha2: "mk",
    refName: "Macedonian"
  };
  var ml = {
    alpha3: "mal",
    alpha2: "ml",
    refName: "Malayalam"
  };
  var mn = {
    alpha3: "mon",
    alpha2: "mn",
    refName: "Mongolian"
  };
  var mr = {
    alpha3: "mar",
    alpha2: "mr",
    refName: "Marathi"
  };
  var mrj = {
    alpha3: "mrj",
    alpha2: null,
    refName: "Western Mari"
  };
  var ms = {
    alpha3: "msa",
    alpha2: "ms",
    refName: "Malay (macrolanguage)"
  };
  var mt = {
    alpha3: "mlt",
    alpha2: "mt",
    refName: "Maltese"
  };
  var mwl = {
    alpha3: "mwl",
    alpha2: null,
    refName: "Mirandese"
  };
  var my = {
    alpha3: "mya",
    alpha2: "my",
    refName: "Burmese"
  };
  var myv = {
    alpha3: "myv",
    alpha2: null,
    refName: "Erzya"
  };
  var mzn = {
    alpha3: "mzn",
    alpha2: null,
    refName: "Mazanderani"
  };
  var nah = {
    alpha3: "nah",
    alpha2: null,
    refName: "Nahuatl languages"
  };
  var nap = {
    alpha3: "nap",
    alpha2: null,
    refName: "Neapolitan"
  };
  var nds = {
    alpha3: "nds",
    alpha2: null,
    refName: "Low German"
  };
  var ne = {
    alpha3: "nep",
    alpha2: "ne",
    refName: "Nepali (macrolanguage)"
  };
  var nl = {
    alpha3: "nld",
    alpha2: "nl",
    refName: "Dutch"
  };
  var nn = {
    alpha3: "nor",
    alpha2: "no",
    refName: "Norwegian"
  };
  var no = {
    alpha3: "nor",
    alpha2: "no",
    refName: "Norwegian"
  };
  var oc = {
    alpha3: "oci",
    alpha2: "oc",
    refName: "Occitan (post 1500)"
  };
  var or = {
    alpha3: "ory",
    alpha2: null,
    refName: "Odia"
  };
  var os = {
    alpha3: "oss",
    alpha2: "os",
    refName: "Ossetian"
  };
  var pa = {
    alpha3: "pan",
    alpha2: "pa",
    refName: "Panjabi"
  };
  var pam = {
    alpha3: "pam",
    alpha2: null,
    refName: "Pampanga"
  };
  var pfl = {
    alpha3: "pfl",
    alpha2: null,
    refName: "Pfaelzisch"
  };
  var pl = {
    alpha3: "pol",
    alpha2: "pl",
    refName: "Polish"
  };
  var pms = {
    alpha3: "pms",
    alpha2: null,
    refName: "Piemontese"
  };
  var pnb = {
    alpha3: "pnb",
    alpha2: null,
    refName: "Western Panjabi"
  };
  var ps = {
    alpha3: "pus",
    alpha2: "ps",
    refName: "Pushto"
  };
  var pt = {
    alpha3: "por",
    alpha2: "pt",
    refName: "Portuguese"
  };
  var qu = {
    alpha3: "que",
    alpha2: "qu",
    refName: "Quechua"
  };
  var rm = {
    alpha3: "roh",
    alpha2: "rm",
    refName: "Romansh"
  };
  var ro = {
    alpha3: "ron",
    alpha2: "ro",
    refName: "Romanian"
  };
  var ru = {
    alpha3: "rus",
    alpha2: "ru",
    refName: "Russian"
  };
  var rue = {
    alpha3: "rue",
    alpha2: null,
    refName: "Rusyn"
  };
  var sa = {
    alpha3: "san",
    alpha2: "sa",
    refName: "Sanskrit"
  };
  var sah = {
    alpha3: "sah",
    alpha2: null,
    refName: "Yakut"
  };
  var sc = {
    alpha3: "srd",
    alpha2: "sc",
    refName: "Sardinian"
  };
  var scn = {
    alpha3: "scn",
    alpha2: null,
    refName: "Sicilian"
  };
  var sco = {
    alpha3: "sco",
    alpha2: null,
    refName: "Scots"
  };
  var sd = {
    alpha3: "snd",
    alpha2: "sd",
    refName: "Sindhi"
  };
  var sh = {
    alpha3: "hbs",
    alpha2: "sh",
    refName: "Serbo-Croatian"
  };
  var si = {
    alpha3: "sin",
    alpha2: "si",
    refName: "Sinhala"
  };
  var sk = {
    alpha3: "slk",
    alpha2: "sk",
    refName: "Slovak"
  };
  var sl = {
    alpha3: "slv",
    alpha2: "sl",
    refName: "Slovenian"
  };
  var so = {
    alpha3: "som",
    alpha2: "so",
    refName: "Somali"
  };
  var sq = {
    alpha3: "sqi",
    alpha2: "sq",
    refName: "Albanian"
  };
  var sr = {
    alpha3: "srp",
    alpha2: "sr",
    refName: "Serbian"
  };
  var su = {
    alpha3: "sun",
    alpha2: "su",
    refName: "Sundanese"
  };
  var sv = {
    alpha3: "swe",
    alpha2: "sv",
    refName: "Swedish"
  };
  var sw = {
    alpha3: "swa",
    alpha2: "sw",
    refName: "Swahili (macrolanguage)"
  };
  var ta = {
    alpha3: "tam",
    alpha2: "ta",
    refName: "Tamil"
  };
  var te = {
    alpha3: "tel",
    alpha2: "te",
    refName: "Telugu"
  };
  var tg = {
    alpha3: "tgk",
    alpha2: "tg",
    refName: "Tajik"
  };
  var th = {
    alpha3: "tha",
    alpha2: "th",
    refName: "Thai"
  };
  var tk = {
    alpha3: "tuk",
    alpha2: "tk",
    refName: "Turkmen"
  };
  var tl = {
    alpha3: "tgl",
    alpha2: "tl",
    refName: "Tagalog"
  };
  var tr = {
    alpha3: "tur",
    alpha2: "tr",
    refName: "Turkish"
  };
  var tt = {
    alpha3: "tat",
    alpha2: "tt",
    refName: "Tatar"
  };
  var tyv = {
    alpha3: "tyv",
    alpha2: null,
    refName: "Tuvinian"
  };
  var ug = {
    alpha3: "uig",
    alpha2: "ug",
    refName: "Uighur"
  };
  var uk = {
    alpha3: "ukr",
    alpha2: "uk",
    refName: "Ukrainian"
  };
  var ur = {
    alpha3: "urd",
    alpha2: "ur",
    refName: "Urdu"
  };
  var uz = {
    alpha3: "uzb",
    alpha2: "uz",
    refName: "Uzbek"
  };
  var vec = {
    alpha3: "vec",
    alpha2: null,
    refName: "Venetian"
  };
  var vep = {
    alpha3: "vep",
    alpha2: null,
    refName: "Veps"
  };
  var vi = {
    alpha3: "vie",
    alpha2: "vi",
    refName: "Vietnamese"
  };
  var vls = {
    alpha3: "vls",
    alpha2: null,
    refName: "Vlaams"
  };
  var vo = {
    alpha3: "vol",
    alpha2: "vo",
    refName: "Volap\xFCk"
  };
  var wa = {
    alpha3: "wln",
    alpha2: "wa",
    refName: "Walloon"
  };
  var war = {
    alpha3: "war",
    alpha2: null,
    refName: "Waray (Philippines)"
  };
  var wuu = {
    alpha3: "wuu",
    alpha2: null,
    refName: "Wu Chinese"
  };
  var xal = {
    alpha3: "xal",
    alpha2: null,
    refName: "Kalmyk"
  };
  var xmf = {
    alpha3: "xmf",
    alpha2: null,
    refName: "Mingrelian"
  };
  var yi = {
    alpha3: "yid",
    alpha2: "yi",
    refName: "Yiddish"
  };
  var yo = {
    alpha3: "yor",
    alpha2: "yo",
    refName: "Yoruba"
  };
  var yue = {
    alpha3: "yue",
    alpha2: null,
    refName: "Yue Chinese"
  };
  var zh = {
    alpha3: "zho",
    alpha2: "zh",
    refName: "Chinese"
  };
  var languages = {
    af,
    als,
    am,
    an,
    ar,
    arz,
    as,
    ast,
    av,
    az,
    azb,
    ba,
    bar,
    bcl,
    be,
    bg,
    bh,
    bn,
    bo,
    bpy,
    br,
    bs,
    bxr,
    ca,
    cbk,
    ce,
    ceb,
    ckb,
    co,
    cs,
    cv,
    cy,
    da,
    de,
    diq,
    dsb,
    dty,
    dv,
    el,
    eml,
    en,
    eo,
    es,
    et,
    eu,
    fa,
    fi,
    fr,
    frr,
    fy,
    ga,
    gd,
    gl,
    gn,
    gom,
    gu,
    gv,
    he,
    hi,
    hif,
    hr,
    hsb,
    ht,
    hu,
    hy,
    ia,
    id,
    ie,
    ilo,
    io,
    is,
    it,
    ja,
    jbo,
    jv,
    ka,
    kk,
    km,
    kn,
    ko,
    krc,
    ku,
    kv,
    kw,
    ky,
    la,
    lb,
    lez,
    li,
    lmo,
    lo,
    lrc,
    lt,
    lv,
    mai,
    mg,
    mhr,
    min,
    mk,
    ml,
    mn,
    mr,
    mrj,
    ms,
    mt,
    mwl,
    my,
    myv,
    mzn,
    nah,
    nap,
    nds,
    ne,
    "new": {
      alpha3: "new",
      alpha2: null,
      refName: "Newari"
    },
    nl,
    nn,
    no,
    oc,
    or,
    os,
    pa,
    pam,
    pfl,
    pl,
    pms,
    pnb,
    ps,
    pt,
    qu,
    rm,
    ro,
    ru,
    rue,
    sa,
    sah,
    sc,
    scn,
    sco,
    sd,
    sh,
    si,
    sk,
    sl,
    so,
    sq,
    sr,
    su,
    sv,
    sw,
    ta,
    te,
    tg,
    th,
    tk,
    tl,
    tr,
    tt,
    tyv,
    ug,
    uk,
    ur,
    uz,
    vec,
    vep,
    vi,
    vls,
    vo,
    wa,
    war,
    wuu,
    xal,
    xmf,
    yi,
    yo,
    yue,
    zh
  };

  // node_modules/fasttext.wasm.js/dist/models/language-identification/base.mjs
  var LANGUAGES_LIMIT = Object.keys(languages).length;

  // src/lang-lite.js
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
  var HINTS = {
    en: ["the", "and", "is", "of", "to", "in", "that", "it", "with", "for", "was", "are", "this", "you"],
    es: ["el", "la", "de", "que", "y", "en", "los", "las", "es", "un", "una", "por", "con", "para", "del", "se", "no"],
    fr: ["le", "la", "les", "de", "des", "et", "est", "un", "une", "que", "qui", "dans", "pour", "pas", "vous", "nous", "je"],
    it: ["il", "la", "di", "che", "e", "un", "una", "per", "non", "con", "sono", "gli", "della", "del", "anche"],
    pt: ["o", "a", "de", "que", "e", "do", "da", "em", "um", "uma", "para", "com", "n\xE3o", "os", "as", "se", "voc\xEA"]
  };
  var EVERYDAY = {
    fr: [...HINTS.fr, "bonne", "bon", "tr\xE8s", "avec", "mais", "ce", "cette", "au", "aux", "du", "sur", "sont", "\xEAtre", "\xE0", "o\xF9", "merci", "oui", "il", "elle", "mon", "ma", "votre", "notre", "tout", "bien", "chez"],
    es: [...HINTS.es, "muy", "pero", "m\xE1s", "est\xE1", "como", "gracias", "buena", "buen", "s\xED", "su", "mi", "al", "lo", "hay", "todo", "bien"],
    it: [...HINTS.it, "molto", "ma", "pi\xF9", "questo", "questa", "grazie", "buona", "buon", "s\xEC", "lo", "le", "mi", "ho", "\xE8", "tutto", "bene"],
    pt: [...HINTS.pt, "muito", "mas", "mais", "est\xE1", "obrigado", "obrigada", "boa", "bom", "sim", "ao", "na", "no", "isso", "tudo", "bem"],
    de: ["der", "das", "und", "ist", "nicht", "ich", "ein", "eine", "mit", "f\xFCr", "auf", "zu", "den", "dem", "sie", "wir", "sehr", "aber", "auch", "gut", "guten", "danke", "viel"]
  };
  var ENGLISH_EVERYDAY = /* @__PURE__ */ new Set([...HINTS.en, "i", "i'll", "i'm", "it's", "a", "an", "on", "be", "at", "have", "has", "not", "we", "will", "your", "my", "by", "what", "when", "then", "from", "but", "or", "if", "so", "he", "she", "they", "as", "do", "can", "there", "here", "about", "more", "just", "all", "one", "would", "which", "their", "had", "been", "were"]);

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
  function speakerFor(settings2, lang) {
    return settings2?.onlineVoiceByLang?.[lang || "en"] || settings2?.onlineVoice || "Sadaltager";
  }
  function onlineReady(settings2, lang, { ignoreLimit = false } = {}) {
    if (!settings2?.onlineVoices || !settings2.googleKey) return false;
    if (settings2.googleKey === state.badKey) return false;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return false;
    if (Date.now() < state.pauseUntil) return false;
    const locale = ONLINE_LOCALES[lang || "en"];
    if (!locale) return false;
    if (state.missing.has(locale + ":" + speakerFor(settings2, lang))) return false;
    syncUsage(settings2.onlineUsage);
    return ignoreLimit || state.usage.chars < (settings2.onlineLimit || STOP_AT);
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
      const id2 = String.fromCharCode(bytes[off], bytes[off + 1], bytes[off + 2], bytes[off + 3]);
      const size = v.getUint32(off + 4, true);
      if (id2 === "fmt ") rate = v.getUint32(off + 12, true);
      if (id2 === "data") {
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
    const speaker = speakerFor(settings2, lang);
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
        state.missing.add(locale + ":" + speaker);
        state.lastProblem = "Google has no " + speaker + " voice for this language: " + msg;
        if (settings2.onlineVoiceByLang?.[lang || "en"]) {
          const by = { ...settings2.onlineVoiceByLang };
          delete by[lang || "en"];
          return onlineSynthesize({ text, lang, settings: { ...settings2, onlineVoiceByLang: by }, speakingRate, onUsage, ignoreLimit });
        }
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
    if (!json?.audioContent) {
      state.lastProblem = "Google answered without any sound.";
      return null;
    }
    const { audio } = wavToFloat(base64ToBytes(json.audioContent));
    syncUsage(settings2.onlineUsage);
    state.usage.chars += text.length;
    state.lastProblem = "";
    onUsage?.({ month: state.usage.month, add: text.length });
    return { audio, chars: text.length };
  }
  async function testOnlineVoice(key, speaker = "Charon", lang = "en") {
    const s = { onlineVoices: true, googleKey: key, onlineVoice: speaker, onlineVoiceByLang: null, onlineUsage: null };
    state.badKey = "";
    state.pauseUntil = 0;
    state.missing.clear();
    state.lastProblem = "";
    const line = {
      en: "Hello. This is how I sound when I read to you.",
      es: "Hola. As\xED sueno cuando te leo en espa\xF1ol.",
      fr: "Bonjour. Voici ma voix quand je lis en fran\xE7ais.",
      de: "Guten Tag. So klinge ich, wenn ich auf Deutsch vorlese.",
      ru: "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435. \u0412\u043E\u0442 \u043A\u0430\u043A \u0437\u0432\u0443\u0447\u0438\u0442 \u043C\u043E\u0439 \u0433\u043E\u043B\u043E\u0441, \u043A\u043E\u0433\u0434\u0430 \u044F \u0447\u0438\u0442\u0430\u044E \u043F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438.",
      tr: "Merhaba. T\xFCrk\xE7e okurken sesim b\xF6yle duyulur.",
      it: "Buongiorno. Ecco la mia voce quando leggo in italiano.",
      pt: "Ol\xE1. \xC9 assim que eu soo quando leio em portugu\xEAs.",
      ar: "\u0645\u0631\u062D\u0628\u0627\u064B. \u0647\u0643\u0630\u0627 \u064A\u0628\u062F\u0648 \u0635\u0648\u062A\u064A \u0639\u0646\u062F\u0645\u0627 \u0623\u0642\u0631\u0623 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629.",
      zh: "\u4F60\u597D\u3002\u8FD9\u662F\u6211\u7528\u4E2D\u6587\u6717\u8BFB\u65F6\u7684\u58F0\u97F3\u3002",
      hi: "\u0928\u092E\u0938\u094D\u0924\u0947\u0964 \u091C\u092C \u092E\u0948\u0902 \u0939\u093F\u0902\u0926\u0940 \u092E\u0947\u0902 \u092A\u0922\u093C\u0924\u093E \u0939\u0942\u0901 \u0924\u094B \u092E\u0947\u0930\u0940 \u0906\u0935\u093E\u091C\u093C \u0910\u0938\u0940 \u0932\u0917\u0924\u0940 \u0939\u0948\u0964",
      el: "\u0393\u03B5\u03B9\u03B1 \u03C3\u03B1\u03C2. \u0388\u03C4\u03C3\u03B9 \u03B1\u03BA\u03BF\u03CD\u03B3\u03B5\u03C4\u03B1\u03B9 \u03B7 \u03C6\u03C9\u03BD\u03AE \u03BC\u03BF\u03C5 \u03CC\u03C4\u03B1\u03BD \u03B4\u03B9\u03B1\u03B2\u03AC\u03B6\u03C9 \u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC."
    }[lang] || "Hello.";
    const r = await onlineSynthesize({ text: line, lang, settings: s, ignoreLimit: true });
    if (!r) return { ok: false, problem: state.lastProblem || "No answer from Google." };
    return { ok: true, audio: r.audio, chars: r.chars };
  }

  // src/popup.js
  var $ = (id2) => document.getElementById(id2);
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
    const ROUND = ["fr", "es", "ru", "tr", "de", "it", "pt", "ar", "zh", "hi", "el"];
    for (const code of ROUND) {
      const o = document.createElement("option");
      o.value = code;
      o.textContent = LANGS[code]?.name || code;
      $("langPick").appendChild(o);
    }
    const fillLangVoice = () => {
      $("langVoice").textContent = "";
      const same = document.createElement("option");
      same.value = "";
      same.textContent = "Same as English";
      $("langVoice").appendChild(same);
      for (const v of ONLINE_VOICES) {
        const o = document.createElement("option");
        o.value = v.id;
        o.textContent = v.id;
        $("langVoice").appendChild(o);
      }
      $("langVoice").value = settings.onlineVoiceByLang?.[$("langPick").value] || "";
    };
    fillLangVoice();
    $("langPick").onchange = fillLangVoice;
    $("langVoice").onchange = () => {
      const by = { ...settings.onlineVoiceByLang || {} };
      if ($("langVoice").value) by[$("langPick").value] = $("langVoice").value;
      else delete by[$("langPick").value];
      saveSettings({ onlineVoiceByLang: by });
    };
    $("langListen").onclick = async () => {
      if (sampleSrc) return sampleSrc.stop();
      if (!settings.googleKey) return renderOnline("Save your Google key first, then you can listen.");
      $("onlineStatus").textContent = "Asking Google\u2026";
      const r = await testOnlineVoice(settings.googleKey, $("langVoice").value || settings.onlineVoice || "Sadaltager", $("langPick").value);
      if (!r.ok) return renderOnline(r.problem);
      await countSample(r.chars);
      renderOnline();
      playFloat(r.audio);
    };
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

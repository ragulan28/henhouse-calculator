/**
 * HenHouse Chicken Pricing Calculator - Core Application Logic
 * Computes break-even costs, margins, selling prices, and handles
 * reactive DOM updates, language toggling, clipboard copy, and PWA registration.
 */
(() => {
  const ids = ["purchase", "margin", "expenses", "weight", "yield"];
  const defaults = {
    purchase: 800,
    margin: 15,
    expenses: 50,
    weight: 2,
    yield: 71,
  };
  const $ = (id) => document.getElementById(id);
  const I18N = window.I18N || {};
  const INPUTS_STORAGE_KEY = "henhouse_inputs";

  function loadSavedInputs() {
    try {
      const raw = localStorage.getItem(INPUTS_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved && typeof saved === "object") {
        ids.forEach((id) => {
          if (
            saved[id] !== undefined &&
            saved[id] !== null &&
            String(saved[id]).trim() !== ""
          ) {
            $(id).value = saved[id];
          }
        });
      }
    } catch {}
  }

  function saveInputs() {
    try {
      const data = Object.fromEntries(ids.map((id) => [id, $(id).value]));
      localStorage.setItem(INPUTS_STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  let currentLang = "en";
  try {
    const saved = localStorage.getItem("henhouse_lang");
    if (saved && I18N[saved]) {
      currentLang = saved;
    } else if (navigator.language) {
      const code = navigator.language.slice(0, 2).toLowerCase();
      if (code === "si") currentLang = "si";
      else if (code === "ta") currentLang = "ta";
    }
  } catch {}

  const money = (value) => {
    const formatted = value.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (
      (I18N[currentLang]?.currencyPrefix || "Rs. ") +
      formatted.replace(/\.00$/, "")
    );
  };

  const roundUpTo10 = (value) =>
    value <= 0 ? 0 : Math.ceil((value - 1e-9) / 10) * 10;

  let current = null;

  function setLanguage(lang) {
    if (!I18N[lang]) lang = "en";
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = I18N[lang].title;
    try {
      localStorage.setItem("henhouse_lang", lang);
    } catch {}

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (I18N[lang] && I18N[lang][key] !== undefined) {
        el.textContent = I18N[lang][key];
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    calculate();
  }

  function calculate() {
    const v = Object.fromEntries(ids.map((id) => [id, Number($(id).value)]));
    const error = $("error");
    const invalid =
      ids.some((id) => $(id).value.trim() === "" || !Number.isFinite(v[id])) ||
      v.purchase < 0 ||
      v.margin < 0 ||
      v.margin >= 100 ||
      v.expenses < 0 ||
      v.weight <= 0 ||
      v.yield <= 0 ||
      v.yield > 100;

    if (invalid) {
      error.textContent =
        I18N[currentLang]?.errorMsg ||
        "Please enter valid values. Margin must be below 100%, weight and yield must be above zero, and yield cannot exceed 100%.";
      error.style.display = "block";
      $("copy").disabled = true;
      $("copy").style.opacity = ".55";
      current = null;
      return;
    }

    error.style.display = "none";
    $("copy").disabled = false;
    $("copy").style.opacity = "1";

    const cost = v.purchase * v.weight + v.expenses;
    const dressedWeight = (v.weight * v.yield) / 100;
    const liveBE = cost / v.weight;
    const dressedBE = cost / dressedWeight;
    const factor = 1 - v.margin / 100;
    const liveSP = liveBE / factor;
    const dressedSP = dressedBE / factor;
    const liveProfit = liveSP - liveBE;
    const dressedProfit = dressedSP - dressedBE;
    const compareLiveSP = roundUpTo10(liveSP);
    const compareDressedSP = roundUpTo10(dressedSP);
    const compareLiveProfit = compareLiveSP - liveBE;
    const compareDressedProfit = compareDressedSP - dressedBE;
    const difference = dressedSP - liveSP;

    const result = {
      ...v,
      cost,
      dressedWeight,
      liveBE,
      dressedBE,
      liveSP,
      dressedSP,
      liveProfit,
      dressedProfit,
      difference,
    };
    current = result;

    $("liveBE").textContent = money(liveBE);
    $("liveSP").textContent = money(liveSP);
    $("liveProfit").textContent = money(liveProfit);
    $("dressedWeight").textContent =
      dressedWeight.toFixed(2) + (I18N[currentLang]?.weightSuffix || " kg");
    $("dressedBE").textContent = money(dressedBE);
    $("dressedSP").textContent = money(dressedSP);
    $("dressedProfit").textContent = money(dressedProfit);
    $("compareLive").textContent = money(compareLiveSP);
    $("compareDressed").textContent = money(compareDressedSP);
    if ($("compareLiveProfit"))
      $("compareLiveProfit").textContent = money(compareLiveProfit);
    if ($("compareDressedProfit"))
      $("compareDressedProfit").textContent = money(compareDressedProfit);
    if ($("difference")) $("difference").textContent = money(difference);
  }

  ids.forEach((id) =>
    $(id).addEventListener("input", () => {
      saveInputs();
      calculate();
    }),
  );

  $("reset").addEventListener("click", () => {
    ids.forEach((id) => ($(id).value = defaults[id]));
    try {
      localStorage.removeItem(INPUTS_STORAGE_KEY);
    } catch {}
    calculate();
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang && lang !== currentLang) {
        setLanguage(lang);
      }
    });
  });

  $("copy").addEventListener("click", async () => {
    if (!current) return;
    const r = current;
    const t = I18N[currentLang] || I18N.en;
    const text = [
      t.clipTitle,
      `${t.clipLivePurchase}: ${money(r.purchase)}${t.clipPerKg}`,
      `${t.clipMargin}: ${r.margin}%`,
      `${t.clipExpenses}: ${money(r.expenses)}${t.clipPerBird}`,
      `${t.clipLiveWeight}: ${r.weight}${t.weightSuffix}`,
      `${t.clipYield}: ${r.yield}%`,
      "",
      t.clipLiveSection,
      `${t.clipLiveBE}: ${money(r.liveBE)}`,
      `${t.clipLiveSP}: ${money(r.liveSP)}`,
      `${t.clipLiveProfit}: ${money(r.liveProfit)}`,
      "",
      t.clipDressedSection,
      `${t.clipDressedWeight}: ${r.dressedWeight.toFixed(2)}${t.weightSuffix}`,
      `${t.clipDressedBE}: ${money(r.dressedBE)}`,
      `${t.clipDressedSP}: ${money(r.dressedSP)}`,
      `${t.clipDressedProfit}: ${money(r.dressedProfit)}`,
    ].join("\n");

    const btn = $("copy");
    const prevLabel = t.copyBtn;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = t.copiedText;
      setTimeout(() => {
        if (btn.textContent === t.copiedText) btn.textContent = prevLabel;
      }, 1800);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      btn.textContent = t.copiedText;
      setTimeout(() => {
        if (btn.textContent === t.copiedText) btn.textContent = prevLabel;
      }, 1800);
    }
  });

  // Load persisted inputs from localStorage if present
  loadSavedInputs();

  // Initial render
  setLanguage(currentLang);

  // Mobile sticky-bottom Selling Price bar: pins to bottom until its natural
  // slot reaches the viewport bottom, then docks cleanly in flow.
  function initMobileStickySellingPrice() {
    const slot = $("spSlot");
    const group = $("spGroup");
    if (!slot || !group) return;

    const mobileMq = window.matchMedia("(max-width: 720px)");
    let pinned = false;
    let rafId = 0;

    function unpin() {
      if (!pinned) return;
      group.classList.remove("is-pinned");
      slot.style.minHeight = "";
      pinned = false;
    }

    function update() {
      rafId = 0;
      if (!mobileMq.matches) {
        unpin();
        return;
      }

      const rect = slot.getBoundingClientRect();
      const shouldPin = rect.bottom > window.innerHeight - 12;

      if (shouldPin && !pinned) {
        slot.style.minHeight = `${group.offsetHeight}px`;
        group.classList.add("is-pinned");
        pinned = true;
      } else if (!shouldPin) {
        unpin();
      }
    }

    function scheduleUpdate() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", () => {
      if (pinned) {
        unpin();
      }
      scheduleUpdate();
    });
    if (mobileMq.addEventListener) {
      mobileMq.addEventListener("change", scheduleUpdate);
    }

    update();
  }

  initMobileStickySellingPrice();

  // Global Usage Tracker (CounterAPI v2)
  async function initUsageTracker() {
    const countEl = $("appUsesCount");
    if (!countEl) return;

    const cached = localStorage.getItem("hh_global_uses");
    if (cached) {
      countEl.textContent = Number(cached).toLocaleString("en-LK");
    }

    const endpoint =
      "https://api.counterapi.dev/v2/ragulan-gopalapillais-team-6180/henhouse-calculator";
    const token = "ut_cBQAqz5H9jMleB9SiLOsVowt6CKflhsyxHwdUtOA";

    try {
      const hasCountedSession = sessionStorage.getItem("hh_session_tracked");
      const url = hasCountedSession
        ? `${endpoint}?token=${token}`
        : `${endpoint}/up?token=${token}`;

      // Standard simple GET without custom headers avoids CORS preflight OPTIONS check
      const res = await fetch(url);
      if (!hasCountedSession && res.ok) {
        sessionStorage.setItem("hh_session_tracked", "1");
      }

      if (res && res.ok) {
        const json = await res.json();
        const data = json.data;
        if (data && typeof data.up_count === "number") {
          const count = Math.max(1, data.up_count);
          countEl.textContent = count.toLocaleString("en-LK");
          localStorage.setItem("hh_global_uses", count);
        }
      }
    } catch {
      // Ad-blocker or offline fallback: maintain cached count
      const localFallback = Number(localStorage.getItem("hh_global_uses")) || 1;
      countEl.textContent = localFallback.toLocaleString("en-LK");
    }
  }

  initUsageTracker();

  // Register service worker for offline PWA support
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () =>
      navigator.serviceWorker.register("./sw.js").catch(() => {}),
    );
  }
})();


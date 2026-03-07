function emitTrack(eventName, payload = {}) {
  if (!eventName) return;

  const data = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(data);
  } else if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  } else if (typeof window.plausible === "function") {
    window.plausible(eventName, { props: payload });
  }

  window.dispatchEvent(new CustomEvent("hs-track", { detail: data }));
}

export function initConversionTracking() {
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      emitTrack(el.dataset.track, {
        source: el.dataset.trackSource || "unknown"
      });
    });
  });

  document.querySelectorAll(".decision-faq details[data-faq-question]").forEach((entry) => {
    entry.addEventListener("toggle", () => {
      if (!entry.open) return;
      emitTrack("faq_expand", {
        question: entry.dataset.faqQuestion
      });
    });
  });
}

export function initMobileStickyCtaTracking() {
  const cta = document.querySelector("#mobileStickyCta");
  if (!cta || !window.matchMedia("(max-width: 768px)").matches) return;

  emitTrack("mobile_sticky_cta_impression");
  cta.addEventListener(
    "click",
    () => emitTrack("mobile_sticky_cta_click"),
    { passive: true }
  );
}

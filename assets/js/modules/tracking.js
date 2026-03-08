function emitTrack(eventName, payload = {}) {
  const data = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(data);
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
      if (!entry.open) {
        return;
      }

      emitTrack("faq_expand", {
        question: entry.dataset.faqQuestion
      });
    });
  });
}

function emitAnalyticsEvent(eventName, params = {}) {
  if (!eventName) {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  window.dispatchEvent(
    new CustomEvent("lead:event", {
      detail: { eventName, params }
    })
  );
}

export function initLeadTracking() {
  const startCtas = document.querySelectorAll("[data-lead-start]");
  const submitCtas = document.querySelectorAll("[data-lead-submit]");

  startCtas.forEach((element) => {
    element.addEventListener("click", () => {
      emitAnalyticsEvent("lead_started", {
        source: element.dataset.leadStart || "unknown",
        target: element.getAttribute("href") || ""
      });
    });
  });

  submitCtas.forEach((element) => {
    element.addEventListener("click", () => {
      emitAnalyticsEvent("lead_submitted", {
        method: element.dataset.leadSubmit || "unknown",
        source: element.dataset.leadStart || "unknown",
        target: element.getAttribute("href") || ""
      });
    });
  });
}

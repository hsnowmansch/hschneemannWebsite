function emitTrackingEvent(eventName) {
  if (!eventName) return;

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName });
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName);
    return;
  }

  if (typeof window.plausible === "function") {
    window.plausible(eventName);
  }
}

export function initMobileStickyCtaTracking() {
  const cta = document.querySelector("#mobileStickyCta");
  if (!cta || !window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  emitTrackingEvent("mobile_sticky_cta_impression");
  cta.addEventListener(
    "click",
    () => {
      emitTrackingEvent("mobile_sticky_cta_click");
    },
    { passive: true }
  );
}

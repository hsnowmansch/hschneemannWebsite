import { LINKS } from "./config.js";
import { wireOptionalLink } from "./modules/links.js";
import { initRevealAnimations } from "./modules/reveal.js";
import { updateYear } from "./modules/year.js";
import { initHeaderCondense, initHeroParallax, initMobileNavigation, initScrollNavigation } from "./modules/interactions.js";
import { initConversionTracking, initMobileStickyCtaTracking } from "./modules/tracking.js";
import { initLeadTracking } from "./modules/lead-tracking.js";

updateYear();
wireOptionalLink("appsLink", LINKS.linktreeOrApps);
wireOptionalLink("linkedinLink", LINKS.linkedin);
initRevealAnimations();
initHeaderCondense();
initHeroParallax();
initMobileNavigation();
initScrollNavigation();
initConversionTracking();
initMobileStickyCtaTracking();
initLeadTracking();

const trackSegmentClick = (segmentId) => {
  const payload = {
    event: "segment_cta_click",
    segment_id: segmentId,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "segment_cta_click", {
      segment_id: segmentId,
    });
  }
};

document.querySelectorAll(".segment-cta[data-segment-id]").forEach((element) => {
  element.addEventListener("click", () => {
    const segmentId = element.getAttribute("data-segment-id");
    if (!segmentId) return;

    trackSegmentClick(segmentId);
  });
});

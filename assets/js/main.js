import { LINKS } from "./config.js";
import { wireOptionalLink } from "./modules/links.js";
import { initRevealAnimations } from "./modules/reveal.js";
import { updateYear } from "./modules/year.js";
import { initHeaderCondense, initHeroParallax, initScrollNavigation } from "./modules/interactions.js";
import { initConversionTracking, initMobileStickyCtaTracking } from "./modules/tracking.js";
import { initLeadTracking } from "./modules/lead-tracking.js";

updateYear();
wireOptionalLink("appsLink", LINKS.linktreeOrApps);
wireOptionalLink("linkedinLink", LINKS.linkedin);
initRevealAnimations();
initHeaderCondense();
initHeroParallax();
initScrollNavigation();
initConversionTracking();
initMobileStickyCtaTracking();
initLeadTracking();

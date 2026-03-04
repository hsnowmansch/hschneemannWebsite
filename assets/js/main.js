import { LINKS } from "./config.js";
import { wireOptionalLink } from "./modules/links.js";
import { initRevealAnimations } from "./modules/reveal.js";
import { updateYear } from "./modules/year.js";
import { initHeaderCondense, initHeroParallax, initScrollNavigation } from "./modules/interactions.js";

updateYear();
wireOptionalLink("appsLink", LINKS.linktreeOrApps);
wireOptionalLink("linkedinLink", LINKS.linkedin);
initRevealAnimations();
initHeaderCondense();
initHeroParallax();
initScrollNavigation();

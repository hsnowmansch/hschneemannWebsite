import { LINKS } from "./config.js";
import { wireOptionalLink } from "./modules/links.js";
import { updateYear } from "./modules/year.js";

updateYear();
wireOptionalLink("appsLink", LINKS.linktreeOrApps);
wireOptionalLink("githubLink", LINKS.github);
wireOptionalLink("linkedinLink", LINKS.linkedin);

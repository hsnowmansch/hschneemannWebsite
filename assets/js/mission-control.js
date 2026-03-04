import { initRevealAnimations } from "./modules/reveal.js";
import { updateYear } from "./modules/year.js";
import { initHeaderCondense } from "./modules/interactions.js";

function initMissionTabs() {
  const tabs = Array.from(document.querySelectorAll(".mission-tab"));
  if (!tabs.length) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((entry) => {
        entry.classList.remove("is-active");
        entry.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
    });
  });
}

updateYear();
initHeaderCondense();
initRevealAnimations();
initMissionTabs();

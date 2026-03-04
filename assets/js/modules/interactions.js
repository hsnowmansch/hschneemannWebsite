function isReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initHeaderCondense() {
  const header = document.querySelector("header");
  if (!header) {
    return;
  }

  const toggle = () => {
    header.classList.toggle("is-condensed", window.scrollY > 20);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

export function initHeroParallax() {
  const heroCard = document.querySelector(".hero-main");
  if (!heroCard || isReducedMotion()) {
    return;
  }

  let ticking = false;

  const update = () => {
    const offset = Math.min(window.scrollY * 0.035, 18);
    heroCard.style.setProperty("--hero-parallax", `${offset.toFixed(2)}px`);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}

export function initScrollNavigation() {
  const navLinks = Array.from(document.querySelectorAll("nav a[href^='#']"));
  if (!navLinks.length) {
    return;
  }

  const reduced = isReducedMotion();
  const linksById = new Map(
    navLinks.map((link) => [link.getAttribute("href")?.slice(1), link])
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) {
        return;
      }

      const target = document.getElementById(id);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  });

  const sections = Array.from(document.querySelectorAll("section[id], main[id], [id='skills']"));
  const activate = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id && linksById.has(visible.target.id)) {
        activate(visible.target.id);
      }
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

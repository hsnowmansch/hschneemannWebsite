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

export function initMobileNavigation() {
  const header = document.getElementById("site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = header?.querySelector(".menu-toggle");
  const navLinks = nav ? Array.from(nav.querySelectorAll("a")) : [];

  if (!header || !nav || !toggle || !navLinks.length) {
    return;
  }

  const media = window.matchMedia("(max-width: 760px)");
  let lastFocused = null;

  const focusableSelector =
    "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

  const isOpen = () => nav.classList.contains("is-open");

  const openMenu = () => {
    lastFocused = document.activeElement;
    nav.classList.add("is-open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Menü schließen");

    const firstLink = navLinks[0];
    firstLink?.focus();
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");

    if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  const onToggleClick = () => {
    if (isOpen()) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const onDocumentClick = (event) => {
    if (!media.matches || !isOpen()) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (!header.contains(target)) {
      closeMenu({ restoreFocus: false });
    }
  };

  const onKeydown = (event) => {
    if (!media.matches || !isOpen()) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusables = Array.from(nav.querySelectorAll(focusableSelector));
    if (!focusables.length) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onMediaChange = () => {
    if (!media.matches) {
      closeMenu({ restoreFocus: false });
      nav.style.removeProperty("display");
    }
  };

  toggle.addEventListener("click", onToggleClick);
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeydown);
  media.addEventListener("change", onMediaChange);
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (media.matches) {
        closeMenu({ restoreFocus: false });
      }
    });
  });
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

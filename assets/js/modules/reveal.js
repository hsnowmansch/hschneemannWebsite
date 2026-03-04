const REVEAL_SELECTOR = "[data-reveal]";

function isReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function collectGroups(nodes) {
  const map = new Map();

  nodes.forEach((node) => {
    const group = node.closest("[data-reveal-group]") || document.body;
    if (!map.has(group)) {
      map.set(group, []);
    }
    map.get(group).push(node);
  });

  return Array.from(map.values());
}

export function initRevealAnimations() {
  const nodes = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
  if (!nodes.length) {
    return;
  }

  if (isReducedMotion()) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("reveal-ready");

  const groups = collectGroups(nodes);
  groups.forEach((groupNodes) => {
    groupNodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
    });
  });

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.2
    }
  );

  nodes.forEach((node) => observer.observe(node));
}

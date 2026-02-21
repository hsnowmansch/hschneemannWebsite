export function initRevealAnimations() {
  const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!nodes.length) {
    return;
  }

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
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.15
    }
  );

  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
    observer.observe(node);
  });
}

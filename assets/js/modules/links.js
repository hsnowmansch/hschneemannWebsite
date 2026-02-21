function isValidExternalLink(url) {
  if (!url || typeof url !== "string") {
    return false;
  }

  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") {
    return false;
  }

  if (trimmed.includes("DEIN-") || trimmed.includes("DEIN_")) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function wireOptionalLink(elementId, url) {
  const linkNode = document.getElementById(elementId);
  if (!linkNode) {
    return;
  }

  if (!isValidExternalLink(url)) {
    linkNode.hidden = true;
    linkNode.setAttribute("aria-hidden", "true");
    return;
  }

  linkNode.href = url;
  linkNode.target = "_blank";
  linkNode.rel = "noopener noreferrer";
}

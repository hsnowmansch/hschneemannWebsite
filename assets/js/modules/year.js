export function updateYear(targetId = "year") {
  const yearNode = document.getElementById(targetId);
  if (!yearNode) {
    return;
  }

  yearNode.textContent = new Date().getFullYear();
}

# ToDos

- [x] Defekten Cocoa-Export in valides HTML5 überführen (echte DOM-Struktur statt escaped HTML-Text).
- [x] CSS und JavaScript aus `index.html` in eigene Dateien unter `assets/` auslagern.
- [x] Semantik, Accessibility und SEO verbessern (Skip-Link, ARIA/Labels, Meta/OG/Twitter, sichere Link-Attribute).
- [x] Kontakt-/Social-Links robust machen (Platzhalter erkennen und unvollständige Links ausblenden).
- [x] Finale Qualitätsrunde: HTML aufräumen, mobile Darstellung prüfen, ToDos vollständig abhaken.

## Nächste Refactoring-Schritte

- [ ] `index.html` in wartbare Partials aufteilen (`src/partials/*.html`) und eine Template-Datei einführen.
- [ ] Build-Skript ergänzen, das aus dem Template + Partials die finale `index.html` erzeugt.
- [ ] CSS in Module aufteilen (`base.css`, `layout.css`, `components.css`) und über zentrale `styles.css` bündeln.
- [ ] JavaScript in kleine Module aufteilen (`config`, `year`, `links`) und `main.js` als Einstieg nutzen.
- [ ] Dokumentation ergänzen (`README.md`) mit Workflow für Änderungen und Build.

# Hendrik Schneemann - Portfolio Website v1.0

Modern portfolio website built with Astro 4.x.

## Tech Stack

- **Framework:** Astro 4.x
- **Styling:** CSS with Custom Properties (Design Tokens)
- **Deployment:** GitHub Pages via GitHub Actions
- **Domain:** hendrikschneemann.tech

## Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/          # Routes (index.astro, 404.astro)
├── layouts/        # Page layouts (BaseLayout.astro)
├── components/     # UI components
├── styles/         # Global styles and design tokens
public/             # Static assets (images, fonts, CNAME)
```

## Deployment

Automatically deployed to GitHub Pages on push to `main` branch via GitHub Actions.

## Design System

- **Colors:** Dark theme with blue accents
- **Typography:** Inter (body), Space Grotesk (headings)
- **Spacing:** 8px grid system
- **Responsive:** Mobile-first design

## SEO

- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Performance optimized (minimal JavaScript)

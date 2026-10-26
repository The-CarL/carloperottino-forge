# Forge style guide

Forge shares a warm, restrained, technical visual language with [Carlo's main site](https://carloperottino.com). The main site uses muted gold; Forge uses ember orange to express its workshop and experiment focus. Keep the same visual restraint across both.

Read this guide before designing UI, creating project covers, or writing image-generation prompts. These are defaults; a specific user brief can override them. Existing artwork is context, not an automatic style reference.

## Visual foundations

- Use Inter for headings and body text, and JetBrains Mono for small technical labels and metadata.
- Use generous space, clear hierarchy, fine borders, modest corner rounding, and outlined tags.
- Keep grain, background glow, and motion subtle. Texture supports the composition without becoming its subject.
- Treat [src/styles/global.css](src/styles/global.css) as the source of truth for implemented theme tokens.

| Role | Dark theme | Light theme |
|---|---|---|
| Background | Charcoal `#0a0a0a` | Warm paper `#faf8f5` |
| Secondary surface | `#111111` | `#f0ece6` |
| Main text | Warm cream `#f0ece6` | Warm black `#1c1917` |
| Primary accent | Ember orange `#e07a3c` | Burnt orange `#b85a1f` |
| Accent highlight | `#f59340` | `#c8531a` |

## Image-generation styling

### Subject and composition

- Start with the project's specific idea: delegation, constrained access, comparison, measurement, or another concrete mechanism. Choose one clear visual metaphor.
- Build around one dominant subject or relationship, a few supporting forms, and generous negative space. The idea must survive at card size.
- Favor clean geometry, precise linework, and simple matte objects. Restrained dimensional editorial illustration is welcome when its forms remain simple.
- Keep essential content within the central 80% of the image. Leave the title, tags, badges, borders, and rounded corners to the surrounding UI.

### Color, material, and light

- Build most of the image from charcoal, warm ivory, and warm grays. Use ember orange sparingly to show the meaningful connection, active state, or focal detail.
- Use soft, controlled lighting, readable silhouettes, and matte or lightly translucent materials. A small glow can indicate a signal or permission.
- Use fine grain only when it remains quiet at display size. Check that the image sits comfortably in both site themes; one image can serve both.
- For a project also covered on the main site, reuse the core metaphor and composition. If making a separate site illustration, adapt the accent to that site's gold palette.

### Avoid by default

- Smiling robot mascots, padlock parades, floating brains, generic circuit wallpaper, or other stock AI/security symbols used as the whole concept.
- Cinematic sci-fi sets, weathered industrial metal, chrome-heavy rendering, dramatic spotlights, heavy bloom, neon cyberpunk palettes, or visual clutter.
- Tiny explanatory details, dense grids, embedded titles, fake interface text, logos, watermarks, and baked-in card frames.

### Choose the right medium

Use image generation for conceptual covers and editorial illustrations. Use editable SVG for exact architecture, labeled flows, icons, and diagrams; use screenshots to show actual product behavior. Diagrams and charts may use additional colors when needed to communicate meaning. Keep their labels and structure readable.

## Formats and asset handling

- Project cards currently display images at **16:10**, using `object-cover` in [ProjectCard.astro](src/components/ProjectCard.astro). Generate at 16:10 where supported. Otherwise generate landscape and verify the actual 16:10 crop.
- Save selected raster assets under `public/projects/<slug>/`, normally as optimized WebP. Keep editable diagrams as SVG and screenshots as PNG.
- Use versioned filenames such as `thumbnail-v3.webp` when iterating. Set `thumbnail` in the project's frontmatter to the selected asset's root-relative URL.
- Provide descriptive alt text wherever the rendering component supports it. Do not bake text into a cover as a substitute for HTML content.

## Reusable generation prompt

Replace the bracketed fields for each request. Describe a fresh scene; do not carry over objects from an unrelated cover.

```text
Use case: stylized-concept.
Asset: standalone Forge project-cover illustration, landscape 16:10.
Concept: [specific project idea and one clear visual metaphor].
Subject: [one dominant subject or relationship, with minimal supporting forms].
Style: warm, restrained, technical editorial illustration; clean geometry,
precise forms, matte surfaces, subtle depth and soft controlled lighting.
Palette: charcoal #0a0a0a, warm ivory #f0ece6, warm grays,
with sparse ember-orange #e07a3c accents on meaningful details.
Composition: generous negative space, strong thumbnail-readable silhouette,
essential content inside the central 80%, clean edges for UI cropping.
No text, logos, watermark, border, or card mockup. Avoid robot mascots,
padlock parades, cinematic sci-fi, weathered metal, chrome, and heavy bloom.
```

Example concept for agent auth: a simple matte relay carries a translucent human credential toward two tool ports. A thin ember connection reaches the permitted port; the other path ends at a quiet boundary. Keep the forms large and the credential abstract, without tiny text or elaborate machinery.

## Review before use

Check the image in its actual card crop at roughly 320 px wide, alongside other cards, and in light and dark mode. Confirm that the metaphor is legible, the accent remains restrained, and the image complements the typography. Simplify if it competes with the page. Record the chosen prompt with the image handoff so later covers can repeat the treatment.

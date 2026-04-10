# BI by Deutsch

Professional website for Avi Deutsch — BI Consultant & Mentor specializing in DAX, data modeling, and Power BI.

Built with [Astro](https://astro.build) + [Decap CMS](https://decapcms.org) + [Netlify](https://netlify.com).

---

## How Avi Writes a New Article

1. Go to `yoursite.com/admin`
2. Log in with email/password
3. Click **"Articles"** → **"New Article"**
4. Fill in: Title, Description, Date, Category
5. Write the article in the visual editor (supports Markdown, images, code blocks)
6. Click **"Save"** (saves as draft) or **"Publish"** (goes live)
7. Netlify auto-rebuilds the site in ~30 seconds

### Writing DAX Code Blocks

In the markdown editor, use triple backticks with `dax` for syntax-highlighted code:

````
```dax
Total Sales = SUMX(Sales, Sales[Qty] * Sales[Price])
```
````

---

## Project Structure

```
bi-by-deutsch/
├── public/
│   ├── admin/
│   │   ├── index.html        ← Decap CMS entry point
│   │   └── config.yml        ← CMS content type definitions
│   ├── images/
│   │   └── avi-deutsch.jpg   ← Profile photo
│   └── favicon.svg
├── src/
│   ├── content/
│   │   └── home.json         ← Homepage content (editable via CMS)
│   ├── layouts/
│   │   ├── BaseLayout.astro  ← Main layout (nav + footer)
│   │   └── ArticleLayout.astro ← Single article layout
│   ├── pages/
│   │   ├── index.astro       ← Homepage
│   │   ├── articles.astro    ← Articles listing
│   │   ├── courses.astro     ← Courses (coming soon)
│   │   ├── contact.astro     ← Contact form
│   │   └── articles/         ← Markdown articles live here
│   │       ├── understanding-calculate-filter-context.md
│   │       ├── star-schema-vs-flat-tables.md
│   │       └── building-date-table-that-works.md
│   └── styles/
│       └── global.css        ← All styles
├── astro.config.mjs
├── netlify.toml
├── package.json
└── README.md
```

---

## Customization

### Change Brand Name
Search and replace "BI by Deutsch" in:
- `src/layouts/BaseLayout.astro` (nav logo)
- `src/pages/index.astro` (if needed)

### Change Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --color-accent: #0F6E56;       /* Main green */
  --color-accent-light: #E1F5EE; /* Light green bg */
  --color-accent-dark: #085041;  /* Dark green hover */
}
```

### Add New Article Categories
Edit `public/admin/config.yml` → collections → articles → fields → category → options

---

## Tech Stack

- **Astro 5** — Static site generator (fast, SEO-friendly)
- **Decap CMS** — Git-based headless CMS with visual editor
- **Netlify** — Free hosting with CI/CD, forms, and identity
- **DM Sans** — Typography
- **JetBrains Mono** — Code blocks

# Bilingual Portfolio Single Page Application (SPA)

A modern, high-performance, and fully responsive Single Page Application (SPA) portfolio website built with pure vanilla technologies. The website is designed to showcase the professional profile, technical skills, and select projects of **Philippe Brochier**.

It features dual-language support (French and English), interactive category filtering for projects, typing micro-animations, and a premium glassmorphic dark-mode design.

---

## 🚀 Key Features

*   **Bilingual Translation Engine**: Switch between French (FR) and English (EN) instantly. The user's language preference persists across reloads via `localStorage`.
*   **Deep Space Dark Theme**: Visual layout featuring subtle glowing ambient elements (moving orbs), custom Outfit & Inter typography, and vibrant gradients.
*   **Glassmorphic Design**: Modern glassmorphic cards with transparent borders, custom background saturations, and soft glow transitions on hover.
*   **Dynamic Typing Subtitle**: Typing micro-animation in the hero section displaying professional roles which automatically updates based on the selected language.
*   **GitHub Repositories Showcase**: Interactive cards detailing custom projects with category filter controls (*All*, *JavaScript / Vue / React*, *Python & ML*):
    *   **CardQuizz**: React-based card quiz game.
    *   **Intrusion Detection Model**: Machine learning model in Python for cybersecurity.
    *   **Table de Schulte**: Focus and peripheral vision trainer built with Vue.js.
    *   **Progress Carousel**: Framework-less custom JS carousel component.
    *   **Task Manager**: Dynamic JavaScript task coordinator.
*   **Fully Responsive**: Styled with mobile-first grid systems and dynamic media queries supporting desktop, tablet, and mobile viewports.
*   **SEO Optimized**: Semantic HTML5 markup, optimized title and meta description headers, descriptive element IDs, and fast load times.

---

## 🛠️ Tech Stack

*   **Core Structure**: HTML5 (Semantic elements)
*   **Styling**: CSS3 (Vanilla custom variables, flex grids, transitions, keyframe animations)
*   **Logic & Routing**: Vanilla ES6+ JavaScript (DOM manipulation, scroll observation, intersection observers)
*   **Icons**: FontAwesome 6

No heavy build steps, node_modules, or package dependencies are required to run this portfolio. It is extremely fast, lightweight, and loads instantly.

---

## 📂 Project Structure

```text
portfolio/
├── index.html   # Main page layout & translation tags
├── index.css    # Colors, animations, variables, and typography
├── index.js     # Translation toggles, typing, and filtering logic
├── info.md      # Reference profile source information
└── README.md    # Repository documentation
```

---

## ⚙️ How to Run Locally

Since this site is built using pure frontend technologies, you do not need any package installation:

### Option 1: Direct File Access
Simply open [index.html](index.html) in any modern web browser.

### Option 2: Local HTTP Server (Recommended)
To test scroll spying, localized storage, and smooth routing under normal network contexts, launch a lightweight local server:

Using **Python**:
```bash
python -m http.server 8000
```

Using **Node.js** (if you have `http-server` installed):
```bash
npx http-server -p 8000
```

Then, visit `http://localhost:8000` in your browser.

---

## ⚡ Deployment

This website can be hosted for free on:
*   **GitHub Pages** (Settings > Pages > Deploy from a branch > Main)
*   **Vercel** or **Netlify** (Just drag-and-drop the directory)

---

## 🧑‍💻 Author

**Philippe Brochier**  
*   Email: [brochier84@gmail.com](mailto:brochier84@gmail.com)
*   GitHub: [@filipito93360](https://github.com/filipito93360)

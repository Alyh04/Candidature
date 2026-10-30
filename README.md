# community manager — landing page single-page

Reconstruction de `gertix-studio-clone.html` en **Next.js 16 (App Router) + React 19 + TypeScript**, avec une architecture en couches et des animations modernes. Marque repositionnée de « studio digital » (gerti/x) vers **community manager**, signature éditoriale **connecting innovators**.

---

## Stack

| Besoin | Choix |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), rendu 100 % statique |
| Langage | TypeScript `strict` + `noUncheckedIndexedAccess` |
| Style | Tailwind CSS v4 (`@theme` en CSS, aucune config JS) |
| Animation | Motion (React) — reveals, parallaxe, curseur magnétique |
| Scroll | Lenis (smooth scroll) + reveals au scroll natif |
| Polices | `next/font` — Inter + DM Mono, self-hosted, zéro requête externe |

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run start      # sert le build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata/SEO, skip-link, noscript fallback, chrome global
│   ├── page.tsx          # composition des sections (single page)
│   └── globals.css       # tokens @theme, base, primitives, keyframes, reduced-motion
│
├── content/
│   └── site.ts           # TOUT le texte vit ici — aucun copy dans les composants
│
├── components/
│   ├── providers/        # SmoothScrollProvider (Lenis), IntroOverlay
│   ├── layout/           # Header, Footer, Cursor, ScrollProgress, BackToTop
│   ├── sections/         # Hero, Marquee, Services, Application, Insights, Newsletter, Contact
│   └── ui/               # primitives réutilisables (Reveal, SplitText, AnchorLink…)
│
├── hooks/                # useMediaQuery, useScroll (useActiveSection, useScrolledPast)
└── lib/                  # utils (cn, formatNumber fr-FR)
```

**Règle de dépendance :** `ui` ne connaît pas `sections`, `sections` ne connaît pas `layout`, `layout` ne connaît pas `content`. Le contenu descend, jamais le contraire.

Chaque composant `sections/*` est autonome et sans état partagé : `app/page.tsx` ne fait que les composer dans l'ordre de lecture. Ajouter une section = un fichier + une ligne.

---

## Animations

| Effet | Où | Technique |
| --- | --- | --- |
| Rideau d'intro | `providers/IntroOverlay` | Compteur rAF, 1x par session (`sessionStorage`), failsafe anti-scroll-lock |
| Titre en masque | `ui/SplitText` | Chaque mot monte depuis une ligne `overflow:hidden`, décalé (`stagger`) |
| Reveal au scroll | `ui/Reveal` + `RevealGroup`/`RevealItem` | `whileInView` une seule fois, variants pour le stagger |
| Parallaxe hero | `sections/Hero` | `useScroll` + `useTransform`, halos acid qui suivent le pointeur |
| Curseur | `layout/Cursor` | Point instantané + anneau à ressort, `mix-blend-mode: difference` |
| Bandeau typographique | `sections/Marquee` | Animation CSS pure (`translate3d`), 0 re-render |
| Survol acide | `sections/Services` | `scale-y` depuis le bas + translation de la rangée |
| Progression | `layout/ScrollProgress`, `layout/BackToTop` | `useScroll` → ressort `scaleX` / `pathLength` |
| Modale | `ui/CaseStudyDialog` | `AnimatePresence` + trap de focus + scroll lock |

### Accessibilité & robustesse du mouvement

- **`prefers-reduced-motion` respecté partout** : Lenis n'est pas instancié, le rideau ne s'affiche pas, les compteurs sont instantanés, les reveals se réduisent à un fondu.
- **Souris fine uniquement** : le curseur custom est ignoré sur pointeur grossière (`pointer: fine`).
- **`noscript`** : les éléments marqués `data-reveal` reçoivent `opacity:1; transform:none` — la page reste lisible sans JavaScript.
- **SSR correct** : les compteurs rendent leur valeur finale dans le HTML (crawlers + no-JS) ; l'animation ne prend le relais que côté client.
- **`SplitText`** : le nom accessible est porté par `aria-label` sur le conteneur, les mots sont `aria-hidden` — pas de lecture mot à mot.
- **Modale** : `role="dialog"`, `aria-modal`, fermeture par `Échap` / arrière-plan / bouton, focus restitué au déclencheur.
- **Formulaires** : `<label>` associé, `role="status"` + `aria-live`, validation côté client.

### Ce qui reste à brancher

Les deux formulaires sont des démonstrations front-end. Pour la mise en production, remplacez le `preventDefault` par l'appel API dans :

- `sections/Newsletter.tsx` → `handleSubmit`
- `sections/Contact.tsx` → `handleSubmit`

Puis complétez `src/content/site.ts` (`SITE.url`, liens sociaux de `FOOTER`) et ajoutez les pages `mentions-legales` / `politique-de-confidentialite` référencées dans le footer.

---

## Responsive

Le design est piloté par les breakpoints Tailwind : liste services empilée, cartes cas d'étude en colonne, menu plein écran sous `lg`. Vérifié sans débordement horizontal à 390px et 1440px.

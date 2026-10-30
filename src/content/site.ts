/**
 * Single source of truth for every piece of copy rendered on the page.
 * Components stay presentational: they read from here, never hardcode text.
 */

export type NavItem = {
  readonly id: string;
  readonly index: string;
  readonly label: string;
  readonly href: string;
};

export type Service = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
};

export type Skill = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
};

export type WorkMetric = {
  readonly label: string;
  readonly value: string;
};

export type CaseStudy = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly summary: string;
  readonly context: string;
  readonly actions: readonly string[];
  readonly metrics: readonly WorkMetric[];
  readonly tools: readonly string[];
};

export type Availability = {
  readonly label: string;
  readonly value: string;
  readonly note: string;
};

export type Article = {
  readonly id: string;
  readonly tag: string;
  readonly title: string;
  readonly excerpt: string;
};

export type Signature = {
  readonly name: string;
  readonly role: string;
  readonly phone: string;
  readonly phoneHref: string;
  readonly email: string;
  readonly emailHref: string;
};

export const SITE = {
  name: "community manager",
  /** Stacked lockup used wherever the brand is set in large display type. */
  display: ["community", "manager"] as const,
  tagline: "Freelance Community Manager",
  description:
    "Marcel Alyh Lorniot — Community Manager freelance bilingue FR/EN. Stratégie digitale, création de contenu, animation communautaire et performance.",
  url: "https://gertix.studio",
  locale: "fr_FR",
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", index: "01", label: "Home", href: "#home" },
  { id: "studio", index: "02", label: "Studio", href: "#studio" },
  { id: "portfolio", index: "03", label: "Portfolio", href: "#portfolio" },
  { id: "media", index: "04", label: "Media", href: "#media" },
  { id: "contact", index: "05", label: "Contact", href: "#contact" },
];

export const HERO = {
  eyebrow: "Freelance Community Manager / FR + EN / 2026",
  title: ["Voici ma", "candidature"] as const,
  body: "Nous transformons les idées technologiques en expériences digitales claires, audacieuses et mémorables.",
  cta: { label: "Explorer le portfolio", href: "#portfolio" },
} as const;

export const MARQUEE_ITEMS: readonly string[] = [
  "strategy",
  "brand",
  "experience",
  "technology",
  "growth",
];

export const STUDIO_SECTION = {
  index: "02 / Studio",
  title: ["FULL", "SERVICE"],
  intro:
    "Une équipe flexible pour connecter stratégie, communication, design, technologie et développement commercial.",
} as const;

export const SERVICES: readonly Service[] = [
  {
    id: "adoption",
    number: "01",
    title: "Adoption & Change",
    description:
      "Accompagnement du changement, adoption des outils numériques et transformation des organisations.",
  },
  {
    id: "business-development",
    number: "02",
    title: "Business Development",
    description:
      "Positionnement, stratégie, workshops et création de nouvelles opportunités commerciales.",
  },
  {
    id: "brand-communication",
    number: "03",
    title: "Brand Communication",
    description:
      "Branding, contenu, photographie, storytelling et expériences web cohérentes.",
  },
  {
    id: "lead-generation",
    number: "04",
    title: "Lead Generation",
    description:
      "Acquisition B2B, automation, CRM, tracking et systèmes de génération de prospects.",
  },
  {
    id: "recruiting",
    number: "05",
    title: "Recruiting",
    description:
      "Employer branding, talent sourcing et accompagnement des équipes en croissance.",
  },
];

export const APPLICATION_SECTION = {
  index: "03 / Portfolio",
  title: ["connecting", "innovators"],
  intro:
    "Community Manager freelance bilingue FR/EN — stratégie digitale, création de contenu, animation communautaire et performance.",
} as const;

export const APPLICATION = {
  meta: "Freelance / Community Manager / FR + EN",
  title: "community manager",
  badge: "Disponible immédiatement",
  letter: [
    "Bonjour l'équipe Skult,",
    "Dynamique, autonome et passionné par la création de contenus engageants, c'est avec grand enthousiasme que je vous adresse ma candidature pour le poste de Community Manager en freelance. L'univers premium et axé sur le dépassement de soi de Skult résonne particulièrement avec mon énergie quotidienne.",
    "Ayant une solide expérience en Community Management, rédaction stratégique et gestion de campagnes digitales, j'accompagne des marques et entreprises dans la valorisation de leur identité en ligne. Bilingue français/anglais, je rédige couramment dans les deux langues avec un souci constant de l'orthographe, du ton adapté et du story-telling visuel.",
  ],
  matchingTitle: "Pourquoi mon profil correspond à la mission",
  worksTitle: "Exemples de réalisations & contenus gérés",
  availabilityTitle: "Disponibilités & Modalités",
} as const;

export const SKILLS: readonly Skill[] = [
  {
    number: "01",
    title: "Création & Montage de contenu",
    description:
      "Je maîtrise Canva ainsi que les outils de montage vidéo (CapCut) pour transformer des rushs bruts en Reels et Shorts dynamiques, esthétiques et alignés sur les tendances Instagram/TikTok.",
  },
  {
    number: "02",
    title: "Gestion multi-plateformes & Modération",
    description:
      "Habitué à piloter Meta Business Suite, je gère les calendriers éditoriaux, la modération active des messages/commentaires et la fidélisation de la communauté avec réactivité.",
  },
  {
    number: "03",
    title: "Suivi de performance",
    description:
      "Je réalise des reportings mensuels clairs (engagement, portée, conversion) afin d'ajuster en continu la stratégie de contenu.",
  },
  {
    number: "04",
    title: "Rigueur & Alignement horaire",
    description:
      "Basé en télétravail, je garantis une disponibilité totale sur les horaires européens (Belgique), avec une communication fluide et transparente au sein de l'équipe.",
  },
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "social-strategy",
    number: "01",
    title: "Stratégie & Animation réseaux sociaux",
    summary: "Gestion et création de campagnes d'engagement visuelles.",
    context:
      "Marque premium en pleine croissance sans ligne éditoriale structurée : publications irrégulières, ton incohérent et aucune mesure de performance.",
    actions: [
      "Construction d'un calendrier éditorial trimestriel validé avec la direction",
      "Déclinaison d'un socle de templates Canva réutilisables par toutes les équipes",
      "Animation quotidienne des commentaires et relances d'engagement",
    ],
    metrics: [
      { label: "Fréquence de publication", value: "×4" },
      { label: "Taux d'engagement moyen", value: "+62 %" },
      { label: "Audience organique", value: "+38 %" },
    ],
    tools: ["Meta Business Suite", "Canva", "Notion", "Looker Studio"],
  },
  {
    id: "video-content",
    number: "02",
    title: "Création de contenus vidéo & carrousels",
    summary: "Montage de formats courts (Reels/TikTok) et visuels engageants.",
    context:
      "Rushs produits importants mais inexploités, aucune expertise interne de montage ni de storytelling visuel court.",
    actions: [
      "Montage de formats verticaux avec un hook fort sous 1 seconde",
      "Système de sous-titres bilingue FR/EN pour maximiser la rétention",
      "Bibliothèque de carrousels Educationals réutilisée par les équipes produit",
    ],
    metrics: [
      { label: "Durée moyenne vue", value: "+71 %" },
      { label: "Part du contenu vidéo", value: "80 %" },
      { label: "Portée Reels / mois", value: "120 k" },
    ],
    tools: ["CapCut", "Premiere Pro", "Figma", "Instagram", "TikTok"],
  },
  {
    id: "ads-seo",
    number: "03",
    title: "Référencement & Stratégie Ads",
    summary:
      "Optimisation de la portée globale via Meta Ads & Google Ads pour accroître la visibilité de marques.",
    context:
      "Budget publicitaire diffus sur de nombreux canaux sans attribution ni cycle d'optimisation documenté.",
    actions: [
      "Refonte de l'arborescence de campagnes et du naming pour l'attribution",
      "Matrices créatives testées en A/B sur des segments distincts",
      "Reporting mensuel lisible : engagement, portée, conversion",
    ],
    metrics: [
      { label: "Coût par lead", value: "−34 %" },
      { label: "Taux de conversion", value: "×2,1" },
      { label: "ROI campagnes", value: "+47 %" },
    ],
    tools: ["Meta Ads", "Google Ads", "Google Analytics 4", "Looker Studio"],
  },
];

export const AVAILABILITY: readonly Availability[] = [
  {
    label: "Disponibilité",
    value: "Immédiate",
    note: "Temps plein · 100 % télétravail",
  },
  {
    label: "Alignement horaire",
    value: "Bruxelles",
    note: "Fuseau CET / CEST",
  },
  {
    label: "Tarif mensuel indicatif",
    value: "1 200 € / mois",
    note: "À ajuster selon les prétentions et le périmètre de mission",
  },
];

export const CLOSING = [
  "Je serais ravi de réaliser le test pratique proposé pour vous démontrer la qualité de mes compétences rédactionnelles et créatives dans les deux langues.",
  "Dans l'attente d'un échange avec vous, je vous souhaite une excellente journée.",
] as const;

export const SIGNATURE: Signature = {
  name: "Marcel Alyh Lorniot",
  role: "Freelance Community Manager & Content Specialist",
  phone: "+261 38 99 792 86",
  phoneHref: "tel:+261389979286",
  email: "lorniotmarcel@gmail.com",
  emailHref: "mailto:lorniotmarcel@gmail.com",
};

export const MEDIA_SECTION = {
  index: "04 / Media",
  title: ["CURIOSITY", "DRIVEN"],
  intro:
    "Tech, design, intelligence artificielle, business et culture numérique — racontés sous forme de contenus courts.",
  introMuted: "#a3a19a",
} as const;

export const ARTICLES: readonly Article[] = [
  {
    id: "ai-brands",
    tag: "AI / 2026",
    title: "L'IA change-t-elle déjà notre manière de construire les marques ?",
    excerpt:
      "Une réflexion sur les nouveaux workflows créatifs et les opportunités pour les équipes digitales.",
  },
  {
    id: "simple-interfaces",
    tag: "Design / UX",
    title: "Pourquoi les interfaces simples sont souvent les plus difficiles à concevoir.",
    excerpt:
      "Clarté, hiérarchie visuelle et mouvement : les principes derrière une expérience premium.",
  },
  {
    id: "lead-machine",
    tag: "Growth / B2B",
    title: "Construire une machine de génération de leads sans perdre l'humain.",
    excerpt:
      "De la donnée au contact qualifié, comment relier stratégie, contenu et automation.",
  },
];

export const NEWSLETTER = {
  title: ["JOIN THE", "COMMUNITY"],
  body: "Recevoir occasionnellement nos idées, références et découvertes digitales.",
  placeholder: "your@email.com",
  success: "Merci — inscription enregistrée.",
  error: "Adresse e-mail invalide.",
} as const;

export const CONTACT = {
  index: "05 / Contact",
  title: ["LET'S", "CONNECT."],
  body: "Un projet digital, une identité à construire ou une idée que tu veux transformer en produit ? Parlons-en.",
  fields: {
    name: "Nom",
    email: "Email",
    project: "Projet",
    message: "Message",
  },
  placeholders: {
    name: "Votre nom",
    email: "vous@email.com",
    project: "Votre projet",
    message: "Décrivez votre idée...",
  },
  submit: "Envoyer le message",
  success: "Merci {name} — votre message est prêt à être envoyé.",
  error: "Merci de vérifier les champs requis.",
} as const;

export const FOOTER = {
  builtWith: "Built with Next.js / React / Motion",
  legal: "Imprint / Privacy",
  socials: [
    { label: "LinkedIn", href: "#home" },
    { label: "Instagram", href: "#home" },
    { label: "X / Twitter", href: "#home" },
  ],
} as const;

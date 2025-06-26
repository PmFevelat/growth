# Projet Next.js avec shadcn/ui

Ce projet est une application Next.js configurée avec shadcn/ui, un système de composants modernes basé sur Radix UI et Tailwind CSS.

## Technologies utilisées

- **Next.js 15.3.4** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utilitaire
- **shadcn/ui** - Système de composants réutilisables
- **Radix UI** - Primitives d'interface accessibles
- **Lucide React** - Icônes

## Installation et démarrage

1. Installez les dépendances :
```bash
npm install
```

2. Démarrez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Composants shadcn/ui installés

- **Button** - Boutons avec différentes variantes
- **Card** - Cartes pour organiser le contenu
- **Input** - Champs de saisie
- **Label** - Étiquettes pour les formulaires

## Ajouter de nouveaux composants

Pour ajouter de nouveaux composants shadcn/ui :

```bash
npx shadcn@latest add [nom-du-composant]
```

Exemples :
```bash
npx shadcn@latest add alert
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## Structure du projet

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── globals.css     # Styles globaux avec variables CSS
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Page d'accueil
├── components/
│   └── ui/             # Composants shadcn/ui
└── lib/
    └── utils.ts        # Utilitaires (cn function)
```

## Configuration

- **components.json** - Configuration shadcn/ui
- **tailwind.config.ts** - Configuration Tailwind CSS
- **tsconfig.json** - Configuration TypeScript

## Mode sombre

Le projet supporte automatiquement le mode sombre grâce aux variables CSS configurées dans `globals.css`.

## Ressources utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Radix UI](https://www.radix-ui.com)

import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sans titre",
    description: "Aucune description fournie",
  },
  components: {
    backlinks: {
      title: "Liens retour",
      noBacklinksFound: "Aucun lien retour trouvé",
    },
    themeToggle: {
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
    },
    explorer: {
      title: "Explorateur",
    },
    footer: {
      createdWith: "Créé avec",
    },
    graph: {
      title: "Vue Graphique",
    },
    recentNotes: {
      title: "Notes Récentes",
      seeRemainingMore: ({ remaining }) => `Voir ${remaining} de plus →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclusion de ${targetSlug}`,
      linkToOriginal: "Lien vers l'original",
    },
    search: {
      title: "Recherche",
      searchBarPlaceholder: "Rechercher quelque chose",
    },
    tableOfContents: {
      title: "Table des Matières",
    },
  },
  pages: {
    rss: {
      recentNotes: "Notes récentes",
      lastFewNotes: ({ count }) => `Les dernières ${count} notes`,
    },
    error: {
      title: "Pas trouvé",
      notFound: "Cette page est soit privée, soit elle n'existe pas.",
    },
    folderContent: {
      folder: "Dossier",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 élément sous ce dossier" : `${count} éléments sous ce dossier.`,
    },
    tagContent: {
      tag: "Étiquette",
      tagIndex: "Index des étiquettes",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 élément avec cette étiquette" : `${count} éléments avec cette étiquette.`,
      showingFirst: ({ count }) => `Affichage des premières ${count} étiquettes.`,
      totalTags: ({ count }) => `Trouvé ${count} étiquettes au total.`,
    },
  },
} as const satisfies Translation

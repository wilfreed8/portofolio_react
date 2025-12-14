import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Plateforme éducative universitaire',
    description: 'Site web éducatif permettant aux étudiants de télécharger des cours, examens et ressources de différents modules via des liens Google Drive.',
    features: ['Téléchargement de cours et examens', 'Organisation par modules et filières', 'Liens Drive intégrés', 'Interface moderne et responsive'],
    techs: ['React', 'JavaScript', 'Typescript', 'Tailwind CSS'],
    repoUrl: 'https://github.com', // à remplacer par ton lien réel
    liveUrl: 'https://example.com', // à remplacer par ton déploiement
    images: [],
    problem: 'Difficulté pour les étudiants à accéder facilement aux supports de cours et examens en ligne.',
    solution: 'Création d’un site React centralisant les ressources académiques avec un accès simplifié via Drive.',
    results: 'Amélioration de l’accès aux ressources pour plus de 200 étudiants de la faculté.'
  },
  {
    id: 2,
    title: 'Portfolio personnel interactif',
    description: 'Mon propre site web de portfolio où je présente mes réalisations, mon parcours académique et mes compétences techniques.',
    features: ['Animations et transitions dynamiques', 'Section projets', 'Compétences et parcours scolaire', 'Liens vers GitHub et LinkedIn'],
    techs: ['React', 'Tailwind CSS', 'Framer Motion','shadcn/ui'],
    repoUrl: 'https://github.com', // à remplacer
    liveUrl: 'https://example.com', // à remplacer
    images: [],
    problem: 'Besoin de valoriser mes compétences et mes projets auprès de recruteurs et collaborateurs potentiels.',
    solution: 'Développement d’un portfolio dynamique et moderne avec React et Tailwind.',
    results: 'Visibilité accrue et retours positifs de recruteurs et collègues du domaine informatique.'
  },
  {
    id: 3,
    title: 'Projet de fin d’études : Détection de fraude par apprentissage automatique',
    description: 'Conception d’un outil de détection de fraude basé sur le machine learning appliqué à la consommation d’électricité.',
    features: ['Exploration de données réelles', 'Test de différents algorithmes (ARIMA, CNN-2D, Random Forest)', 'Prédiction des comportements frauduleux'],
    techs: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
    repoUrl: 'https://github.com', // à remplacer
    liveUrl: '', // pas nécessaire si pas de démo web
    images: [],
    problem: 'Identifier les fraudes dans la consommation d’électricité à partir de séries temporelles de données clients.',
    solution: 'Mise en œuvre et comparaison de plusieurs modèles de machine learning pour prédire les anomalies de consommation.',
    results: 'Obtention d’un modèle CNN-2D avec une précision supérieure à 93% sur le jeu de test.'
  },
  {
    id: 4,
    title: 'API de réservation et d’annonces d’événements',
    description: 'API backend pour une application de réservation de places à des événements et de consultation d’annonces.',
    features: ['Authentification JWT', 'CRUD complet pour les événements', 'Réservation en ligne', 'Gestion des utilisateurs et rôles'],
    techs: ['Laravel', 'MySQL', 'Postman'],
    repoUrl: 'https://github.com', // à remplacer
    liveUrl: 'https://example.com', // à remplacer
    images: [],
    problem: 'Absence d’une solution simple pour gérer les réservations et annonces d’événements.',
    solution: 'Création d’une API RESTful avec Laravel offrant des fonctionnalités sécurisées d’authentification et de gestion d’événements.',
    results: 'API fonctionnelle intégrée à une application front-end en développement.'
  }

  // ... autres projets
];
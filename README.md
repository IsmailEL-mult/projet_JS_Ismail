# Jeu 2D Multijoueur avec Obstacles

## Description
Ce projet est un jeu simple en 2D conçu avec **HTML**, **CSS**, et **JavaScript**. Deux joueurs doivent atteindre une cible tout en évitant des obstacles statiques. Le premier joueur à atteindre l'objectif remporte la partie.

---

## Fonctionnalités principales
- **Deux joueurs** :
  - Joueur 1 (rouge) : se déplace avec les touches **Z, Q, S, D**.
  - Joueur 2 (bleu) : se déplace avec les **flèches directionnelles**.
- **Obstacles** :
  - Disposés statiquement sur la carte, ils empêchent les joueurs de passer à travers.
- **Objectif** :
  - Un cercle vert représente l’objectif à atteindre.
- **Message de victoire** :
  - Un message s’affiche au centre de l’écran lorsque l’un des joueurs gagne.

---

## Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, etc.).
- Aucun serveur ou installation n’est nécessaire.

---

## Installation et exécution
1. Téléchargez le fichier `index.html` contenant le code du jeu.
2. Ouvrez le fichier avec un navigateur web en double-cliquant dessus.
3. Jouez directement dans le navigateur !

---

## Contrôles
- **Joueur 1 (rouge)** :
  - Haut : `Z`
  - Bas : `S`
  - Gauche : `Q`
  - Droite : `D`
- **Joueur 2 (bleu)** :
  - Haut : `Flèche Haut`
  - Bas : `Flèche Bas`
  - Gauche : `Flèche Gauche`
  - Droite : `Flèche Droite`

---

## Structure des fichiers
- `index.html` : Contient le code HTML, CSS, et JavaScript.

---

## Fonctionnement technique
- **Canvas HTML5** :
  - Utilisé pour dessiner les joueurs, les obstacles et l’objectif.
- **Gestion des événements** :
  - Les mouvements des joueurs sont contrôlés via les événements clavier `keydown` et `keyup`.
- **Collision** :
  - Une fonction vérifie si un joueur entre en collision avec un obstacle ou atteint l’objectif.
- **Boucle de jeu** :
  - Le jeu fonctionne grâce à une boucle d’animation basée sur `requestAnimationFrame`.

---

## Problèmes connus
- Les obstacles sont fixes et ne changent pas à chaque partie.
- Pas de système de score.

---

## Améliorations possibles
- Ajouter des niveaux avec des obstacles dynamiques.
- Implémenter un chronomètre pour afficher le temps pris par le gagnant.
- Permettre aux joueurs de redémarrer la partie après la victoire.

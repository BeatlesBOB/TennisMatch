# Simulation de Match de Tennis

Ce projet est une application complète de simulation de match de tennis. Le code se divise en deux parties : le **Front-end** et le **Back-end**.

---

## Table des Matières

- [Aperçu](#aperçu)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation et Exécution](#installation-et-exécution)
  - [Back-end](#back-end)
  - [Front-end](#front-end)
- [Structure du Répertoire](#structure-du-répertoire)
- [Tests](#tests)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

---

## Aperçu

L’application simule un match de tennis en suivant les règles officielles (gestion des jeux, sets, tie-break, etc.).  
Les principaux cas d’utilisation incluent :
- La simulation d’un match.
- L’affichage du score.
- La séparation claire de la logique de jeu (Back-end) et de la présentation (Front-end).

---

## Architecture

Le projet suit une architecture **client/serveur** :
- **Back-end** : Expose des API REST pour la gestion du match et des scores. La logique métier (calcul des scores, gestion des jeux, sets et tie-break) est implémentée en TypeScript.
- **Front-end** : Une interface utilisateur réalisée avec React permettant d’afficher le déroulé du match, les scores, et d’interagir avec l’API pour lancer une simulation ou consulter les résultats.

---

## Technologies

- **Back-end**  
  - Node.js  
  - TypeScript  
  - NestJS
  
- **Front-end**  
  - React
  - HTML/CSS,TypeScript
  - Tailwind

- **Outils et Environnement**  
  - Git  
  - npm   

---

## Installation et Exécution

### Back-end

1. **Prérequis :**  
   - Node.js (version 14 ou supérieure)  
   - npm (ou yarn)

2. **Installation :**  
   Dans le répertoire `we-count-les-point` :
   ```bash
   cd we-count-les-point
   npm install
   npm run start
  
  Dans le répertoire `we-joue-le-jeu` :
   ```bash
   cd we-joue-le-jeu
   npm install
   npm run start

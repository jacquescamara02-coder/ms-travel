# Tableau administrateur complet — M-S TRAVEL

## Objectif
Un espace privé `/admin` où l'administrateur (info@mstravel-bf.com) modifie tout le contenu du site : bannières (héros), images, textes de chaque section, et ajoute ou supprime des articles, nouveautés, services, destinations, blocs À propos et vidéos.

## Accès
- Page de connexion `/auth` (e-mail + mot de passe). Pas d'inscription publique.
- Le compte info@mstravel-bf.com reçoit automatiquement le rôle administrateur à sa première connexion. Le mot de passe fourni sert uniquement à créer ce compte. Il n'est jamais écrit dans le code.
- Les autres visiteurs n'ont accès qu'au site public.
- Conseil : changer ce mot de passe après la première connexion, parce qu'il a été partagé dans la conversation.

## Modules du tableau de bord
1. **Vue d'ensemble** : nombre de demandes, d'abonnés et de contenus publiés.
2. **Demandes reçues** : billets, hôtels et visas, avec recherche, détail et lien WhatsApp. Abonnés à la newsletter, avec export CSV.
3. **Pages et sections** : pour chaque page (Accueil, Destinations, Services, À propos, Nouveautés, Blog, Réservation), modification de la bannière (image, badge, titre, mot en rouge, texte, boutons) et de chaque section (titres, paragraphes, images, chiffres, FAQ, avis clients).
4. **Destinations** : ajouter, modifier, supprimer et réordonner les destinations (image, badge, description, étiquettes, mise en avant dans le carrousel).
5. **Services** : liste complète, modifiable.
6. **Nouveautés et offres** : création, modification, publication ou brouillon.
7. **Blog** : articles avec image de couverture, catégorie, auteur, date et contenu riche.
8. **Vidéos et actualités vidéo** : téléversement de fichiers ou liens YouTube, titre, description, affichage dans une nouvelle section « Actualités vidéo » sur Nouveautés et sur l'accueil.
9. **Carnet de voyage** : ajout et suppression des photos de la galerie animée, avec leur légende.
10. **À propos** : histoire, mission, vision, dirigeant, et ajout de blocs libres (titre, texte, image).
11. **Réglages généraux** : logo, coordonnées (e-mail, téléphones, WhatsApp, adresse), réseaux sociaux, liens du menu et du pied de page.
12. **Médiathèque** : toutes les images et vidéos envoyées, réutilisables partout.

## Fonctionnement côté site
- Le site lit son contenu depuis la base de données. Les textes et images actuels y sont copiés au départ : rien ne change visuellement le jour de la mise en ligne.
- Les animations, couleurs du logo, le bouton Retour et les règles enregistrées restent les mêmes.
- Les articles, nouveautés et destinations ajoutés obtiennent automatiquement leur propre page et leur référencement.

## Détails techniques
- Tables : `user_roles` (avec la fonction `has_role`), `site_settings`, `page_sections` (clé page+section, JSON), `destinations`, `services`, `news_posts`, `blog_posts`, `videos`, `gallery_photos`, `about_blocks`, `media`. Lecture publique de ce qui est publié. Écriture réservée au rôle admin.
- Un déclencheur attribue le rôle admin à l'e-mail info@mstravel-bf.com.
- Espaces de stockage publics `site-media` (images) et `site-videos`.
- Routes : `/auth`, `_authenticated/admin/*`. Le contenu est chargé par des fonctions serveur publiques et les modifications passent par des fonctions protégées qui vérifient le rôle admin.
- Une migration copie le contenu actuel de `site-data.ts` dans les tables, et les pages publiques lisent la base au lieu de ce fichier.
- Des tests vérifient les règles d'accès admin.

## Livraison par étapes
1. Accès admin, demandes, réglages et médiathèque.
2. Bannières et sections de toutes les pages.
3. Destinations, services, nouveautés, blog et à propos.
4. Vidéos et carnet de voyage, suivis d'une vérification complète.

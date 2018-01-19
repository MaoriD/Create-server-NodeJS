#Quickstart Nodejs (ve. HTML)
Mise en place d'un serveur NodeJS avec des vues HTML

## Mettre en place le serveur
La première chose est d'initier un dossier nodeJS avec la commande :
```
npm init
```

Suivre les indications du terminal.

Créer un fichier pour le serveur, à la base le fichier s'appelle `index.js` mais ous changeons ce nom par `serveur.js`

## Installer les dépendances
Pour créer un serveur NodeJS en utilisant le framework ExpressJs, il faut commencer par l'installer sur le serveur avec la commande :
````
npm install --save express
```

Un serveur NodeJS de base a besoin d'un dossier nommé `views` pour héberger les vues client. Nous allons modifier le nom de ce dossier par `www`grâce à la dépendance `path` :
```
npm install --save path
````

Un serveur NodeJS doit pouvoir analyser les données d'une requête, par exemple lors de la validation d'un formulaire, les données sont envoyées sur le serveur via une adresse API. Pour se faire, il faut installer la dépendance `body-parser`:
```
npm install --save body-parser
```

Les vuesdu clients vont être configurer en HTML pour correspondre à l'affichage d'une application Angular, il faut donc importer la dépendance que nous allons utiliser en mode `rendu`:
```
npm install --save ejs
```

## Monter le serveur NodeJS
Chaque dépendance doit être importer dans le fichier `server.js` dans des constantes, sauf `body-parser`qui sera importer dans les fichiers de route :
```js
/* Importer les dépendances
*/
    const express = require ('express');
    const path = require('path');
    const ejs = require('ejs');
//
```

Une fois les dépendances importés, il faut initier le serveur :
```js
/*
Initialiser le serveur 
*/
    const app = express();
    const port = process.env.PORT || 3000;
//
```

Il faut également configurer le dossier pour les vues client :
```js
// Configurer le dossier des vues client
    app.set( 'views', __dirname + '/www' );
    app.use( express.static(path.join(__dirname,'www')) );
```

La dernière étape de configuration permet d'écouter le serveur, c'est-à-dire de la lancer :
```js
/* Lancer le serveur
*/
    app.listen( port, () => console.log(`Le serveur est lancé sur le port ${port}`) )
//
```

## Lancer le serveur
Pour lancer le serveur, il y a 3 méthodes possibles :
```
// Méthode 1
node server.js

// Méthode 2
npm start

// Méthode 3 : nécéssite l'installation de nodemon en global
nodemon server.js
```

Pour simplifier le travail, il est conseillé d'installer `nodemon`sur le serveur
```
npm install --save nodemon
```

Il faut ensuite modifier le script dans le fichier package.json de la façon suivante :
```json
...
"script": {
    "start": "nodemon server.js"
},
```
> Une fois le script modifié, la commande `npm start`lance l'écouteur `nodemon`.

## Création de la route front
Un serveur doit être configurer sur toutes les étapes, comme pour la création des routes. Nous allons préparer le route pour les vues clientr. Créer un fichier nommé `front.js`dans un dossier nommé `routes`à la racine du serveur.

Ouvrir le fichier `front.js` pour configurer le module de route en commençeant par importer les composants :
```js
/* 
Importer les composants de la route
*/
    const express = require ('express');
    const router = express.Router();
//
``` 

Dans le même fichier, configurer la route `/`(accueil) de la manière suivante :
```js
/* Définitions des routes
*/
    router.get ('/', (req, res) => {
        // Renvoyer le fichier index dans la réponse
        res.render('index');
        });
//
```

Pour finir, il faut exporter le module de route :
```js
/* Exporter le module de route
*/
    module.exports = router;
//
```

Une fois la route front créée, il faut l'importer dans le fichier  `server?js`:
```js
    // Modules (à faire après avoir créer le fichier front)
    const frontRoute = require('./routes/front');
```

Une fois importé, il faut configurer le serveur pour lui dire d'utiliser `frontRoute`pour l'adresse `\` :
```js
app.use('/',frontRoute);
```

A cette étape, aucun moteur de rendu n'sst défini, il faut donc utiliser le principe de `ejs`d'une manière qui permet de lier des fichiers `.html`aux routes du serveur :
```js
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
```

> Pour finir, il faut créer un fichier nommé `index.html` dans le dossier `www`.

La page d'accueil du serveur affiche à présent le fichier `index.html`. Bravo - Brava !



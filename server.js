/*
Importer les dépendances
*/
    // Composants
    const express = require ('express');
    const path = require('path');
    const ejs = require('ejs');

    // Modules (à faire après avoir créer le fichier front)
    const frontRoute = require('./routes/front');
//

/*
Initialiser le serveur 
*/
    // Configurer le serveur
    const app = express();
    const port = process.env.PORT || 3000;
    
    // Configurer le dossier des vues client
    app.set( 'views', __dirname + '/www' );
    app.use( express.static(path.join(__dirname,'www')) );

    // Définir le moteur de rendu
    app.engine ('html', ejs.renderFile );
    app.set('view engine', 'html')

    // Configurer les routes
    app.use('/', frontRoute);
//

/* Lancer le serveur
*/
    app.listen( port, () => console.log(`Le serveur est lancé sur le port ${port}`) )


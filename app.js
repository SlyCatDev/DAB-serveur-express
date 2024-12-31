import express from 'express';
import session from 'express-session';
import routes from './routes/index.js';
import dabRoutes from './routes/dab.js';

const app = express();
const PORT = 8080;

// Middleware pour parser les données POST (formulaires)
app.use(express.urlencoded({ extended: true }));

// Middleware pour les sessions
app.use(session({
    secret: 'secretKey', // Clé secrète pour signer les sessions
    resave: false,       // Ne pas sauvegarder la session si elle n'a pas été modifiée
    saveUninitialized: true, // Sauvegarder les sessions non initialisées
    cookie: { secure: false } // false si pas en HTTPS
}));

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static('public'));

// Configuration du moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour rendre les infos de session accessibles aux templates
app.use((req, res, next) => {
    res.locals.login = req.session.login || null;
    next();
});

// Utilisation des routes
app.use('/', routes);
app.use('/dab', dabRoutes);


// Gestion des routes inexistantes (404)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Erreur 404' });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
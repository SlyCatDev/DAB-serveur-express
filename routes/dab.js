import { Router } from 'express';
import determineCoupureGeneric from 'api_sylvain';

const router = Router();

// Route dynamique pour déterminer les coupures
router.get('/:montant/:devise?', (req, res) => {
    // Récupération des paramètres depuis l'URL
    const montant = parseFloat(req.params.montant); // Convertit le montant en nombre
    const devise = req.params.devise || '€'; // Devise par défaut : €

    try {
        // Appel de la fonction avec les paramètres
        const result = determineCoupureGeneric({ montant, devise });

        // Gestion des erreurs retournées par la fonction
        if (result === 'string' || isNaN(montant) || montant <= 0) {
            return res.status(400).json({ error: result });
        }

        // Réponse en cas de succès
        res.status(200).json({ decomposition: result });
    } catch (error) {
        // Gestion des erreurs inattendues
        console.error(error);
        res.status(500).json({ error: 'Une erreur interne est survenue.' });
    }
});


export default router;

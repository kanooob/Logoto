const express = require('express');
const app = express();
// Back4app va injecter le port 8080 ici
const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  res.send('Logoto est en ligne et actif !');
});

app.listen(port, () => {
  console.log(`[Serveur] Maintien en vie lancé sur le port ${port}`);
  
  // Le serveur HTTP est prêt, Back4app valide le déploiement.
  // On peut maintenant exécuter le bot en toute sécurité !
  console.log("[Bot] Lancement de index.js...");
  require('./index.js'); 
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Le serveur web répond aux pings d'UptimeRobot / Render / Back4app
app.get('/', (req, res) => {
  res.send('Logoto est en ligne et actif !');
});

app.listen(port, () => {
  console.log(`[Serveur] Maintien en vie lancé sur le port ${port}`);
  
  // Une fois le serveur Express prêt, on démarre le bot Discord
  console.log("[Bot] Lancement de index.js...");
  require('./index.js'); 
});

const http = require('http');

// Crée un serveur HTTP minimaliste pour le Health Check de Back4app
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Logoto is running!\n');
});

// Récupère le port fourni par l'hébergeur ou utilise 8080 par défaut
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Web server listening on port ${PORT}`);
});

// Lance la logique globale de ton bot Discord
console.log("[Bot] Lancement de index.js...");
require('./index.js');

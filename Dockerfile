FROM node:18-alpine

# Crée le dossier de l'application
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les modules de ton bot
RUN npm install

# Copie tout le reste du code
COPY . .

EXPOSE 8080
# Lance ton bot
CMD [ "node", "server.js" ]

FROM node:18-alpine

# Crée le dossier de l'application
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les modules de ton bot
RUN npm install

# Copie tout le reste du code
COPY . .

# Lance ton bot
CMD [ "node", "index.js" ]

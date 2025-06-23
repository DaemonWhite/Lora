FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les dépendances npm
COPY package*.json ./
RUN apk add --no-cache python3 py3-pip ffmpeg make g++ ffmpeg libsodium bash
RUN ln -sf python3 /usr/bin/python
RUN npm install -g npm@11.4.2
RUN npm install
# Copier le code source
COPY . .

# Exposer le port si l’app écoute, sinon ignorer
# EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start"]


#!/bin/bash

# filepath: /Users/danielassayag/Code/web/toplist/setup.sh

# Charger les variables d'environnement
source .env

# Remplacer les variables dans le script SQL et exécuter
envsubst < setup.sql | psql -U postgres

# Initialiser Prisma
npx prisma migrate deploy
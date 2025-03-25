CREATE USER wuser_word WITH PASSWORD 'CasCadAgN7ets;DFereraara3';
CREATE DATABASE priority_list_app;
\c priority_list_app;

GRANT CONNECT ON DATABASE priority_list_app TO wuser_word;
GRANT USAGE ON SCHEMA public TO wuser_word;
GRANT USAGE, SELECT ON SEQUENCE word_id_seq TO wuser_word;
GRANT SELECT, UPDATE ON TABLE "Word" TO wuser_word;

-- Créer les tables nécessaires pour Prisma
CREATE TABLE "Word" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    definition TEXT
);
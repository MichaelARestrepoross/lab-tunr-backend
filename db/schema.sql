-- db/schema.sql
DROP DATABASE IF EXISTS tuner_dev;
CREATE DATABASE tuner_dev;

\c tuner_dev;

CREATE TABLE playlists (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL
);

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN,
 playlist_id INT,
 FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);
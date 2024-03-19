
\c tuner_dev;

INSERT INTO playlists (name) 
VALUES 
('playlist 1'),
('playlist 2'),
('playlist 3'),
('playlist 4');

INSERT INTO songs (name, artist, album, time, is_favorite, playlist_id) 
VALUES 
('Song 1', 'Artist 1', 'Album 1', '3:45', TRUE, 2),
('Song 2', 'Artist 2', 'Album 2', '4:20', FALSE, 1),
('Song 3', 'Artist 3', 'Album 3', '5:10', TRUE, 1),
('Song 4', 'Artist 4', NULL, '2:55', FALSE, 3),
('Song 5', 'Artist 5', NULL, '3:55', FALSE, 4);
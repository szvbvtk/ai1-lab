DROP TABLE IF EXISTS track;
CREATE TABLE track
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    artist      TEXT,
    genre       TEXT,
    releaseYear INTEGER
);
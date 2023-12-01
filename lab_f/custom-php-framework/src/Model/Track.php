<?php

namespace App\Model;

use App\Service\Config;

class Track
{
    private ?int $id = null;
    private ?string $title = null;
    private ?string $artist = null;
    private ?string $genre = null;
    private ?int $releaseYear = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Track
    {
        $this->id = $id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): Track
    {
        $this->title = $title;

        return $this;
    }

    public function getArtist(): ?string
    {
        return $this->artist;
    }

    public function setArtist(?string $artist): Track
    {
        $this->artist = $artist;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(?string $genre): Track
    {
        $this->genre = $genre;

        return $this;
    }

    public function getReleaseYear(): ?int
    {
        return $this->releaseYear;
    }

    public function setReleaseYear(?int $releaseYear): Track
    {
        $this->releaseYear = $releaseYear;

        return $this;
    }

    public static function fromArray($array): Track
    {
        $track = new self();
        $track->fill($array);

        return $track;
    }

    public function fill($array): Track
    {
        if (isset($array['id']) && !$this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['title'])) {
            $this->setTitle($array['title']);
        }
        if (isset($array['artist'])) {
            $this->setArtist($array['artist']);
        }
        if (isset($array['genre'])) {
            $this->setGenre($array['genre']);
        }
        if (isset($array['releaseYear'])) {
            $this->setReleaseYear($array['releaseYear']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM track';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $tracks = [];
        $tracksArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($tracksArray as $trackArray) {
            $tracks[] = self::fromArray($trackArray);
        }

        return $tracks;
    }

    public static function find($id): ?Track
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM track WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $trackArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (!$trackArray) {
            return null;
        }
        $track = Track::fromArray($trackArray);

        return $track;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (!$this->getId()) {
            $sql = "INSERT INTO track (title, artist, genre, releaseYear) VALUES (:title, :artist, :genre, :releaseYear)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'title' => $this->getTitle(),
                'artist' => $this->getArtist(),
                'genre' => $this->getGenre(),
                'releaseYear' => $this->getReleaseYear(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE track SET title = :title, artist = :artist, genre = :genre, releaseYear = :releaseYear WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':title' => $this->getTitle(),
                ':artist' => $this->getArtist(),
                ':genre' => $this->getGenre(),
                ':releaseYear' => $this->getReleaseYear(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM track WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setTitle(null);
        $this->setArtist(null);
        $this->setGenre(null);
        $this->setReleaseYear(null);
    }
}
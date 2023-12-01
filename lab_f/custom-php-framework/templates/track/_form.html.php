<?php
/** @var $track ?\App\Model\Track */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="track[title]" value="<?= $track ? $track->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="artist">Artist</label>
    <input type="text" id="artist" name="track[artist]" value="<?= $track ? $track->getArtist() : '' ?>">
</div>

<div class="form-group">
    <label for="genre">Genre</label>
    <input type="text" id="genre" name="track[genre]" value="<?= $track ? $track->getGenre() : '' ?>">
</div>

<div class="form-group">
    <label for="releaseYear">Release Year</label>
    <input type="text" id="releaseYear" name="track[releaseYear]" value="<?= $track ? $track->getReleaseYear() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>

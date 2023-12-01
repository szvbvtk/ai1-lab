<?php

/** @var \App\Model\Track $track */
/** @var \App\Service\Router $router */

$title = "{$track->getTitle()} ({$track->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $track->getTitle() ?></h1>
    <article>
        <p><strong>Artist:</strong> <?= $track->getArtist(); ?></p>
        <p><strong>Genre:</strong> <?= $track->getGenre(); ?></p>
        <p><strong>Release Year:</strong> <?= $track->getReleaseYear(); ?></p>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('track-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('track-edit', ['id'=> $track->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

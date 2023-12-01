<?php

/** @var \App\Model\Track[] $tracks */
/** @var \App\Service\Router $router */

$title = 'track List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Tracks List</h1>

    <a href="<?= $router->generatePath('track-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($tracks as $track): ?>
            <li><h3><?= $track->getTitle() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('track-show', ['id' => $track->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('track-edit', ['id' => $track->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

<?php

/** @var \App\Model\Track $track */
/** @var \App\Service\Router $router */

$title = "Edit track {$track->getTitle()} ({$track->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('track-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="track-edit">
        <input type="hidden" name="id" value="<?= $track->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('track-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('track-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="track-delete">
                <input type="hidden" name="id" value="<?= $track->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

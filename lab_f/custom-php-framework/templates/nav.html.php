<?php
/** @var $router \App\Service\Router */

?>
    <ul>
        <li><a href="<?= $router->generatePath('') ?>">Home</a></li>
        <li><a href="<?= $router->generatePath('post-index') ?>">Posts</a></li>
        <li><a href="<?= $router->generatePath('track-index') ?>">Tracks</a></li>
    </ul>
<?php

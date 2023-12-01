<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

use App\Controller\PostController;
use App\Controller\TrackController;
use App\Service\Config;
use App\Service\Templating;
use App\Service\Router;

$config = new Config();
$templating = new Templating();
$router = new Router();

$action = $_REQUEST['action'] ?? null;
$controller = null;

switch ($action) {
    case 'post-index':
    case null:
        $controller = new PostController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'track-index':
        $controller = new TrackController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'post-create':
        $controller = new PostController();
        $view = $controller->createAction($_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'track-create':
        $controller = new TrackController();
        $view = $controller->createAction($_REQUEST['track'] ?? null, $templating, $router);
        break;
    case 'post-edit':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new PostController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'track-edit':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new TrackController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['track'] ?? null, $templating, $router);
        break;
    case 'post-show':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new PostController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'track-show':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new TrackController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'post-delete':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new PostController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'track-delete':
        if (!$_REQUEST['id']) {
            break;
        }
        $controller = new TrackController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'info':
        $controller = new InfoController();
        $view = $controller->infoAction();
        break;
    default:
        $view = 'Not found';
        break;
}

if ($view) {
    echo $view;
}


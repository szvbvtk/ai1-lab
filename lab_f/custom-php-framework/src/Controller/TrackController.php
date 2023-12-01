<?php

namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Track;
use App\Service\Router;
use App\Service\Templating;

class TrackController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $tracks = Track::findAll();
        $html = $templating->render('track/index.html.php', [
            'tracks' => $tracks,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestTrack, Templating $templating, Router $router): ?string
    {
        if ($requestTrack) {
            $track = Track::fromArray($requestTrack);
            // @todo missing validation
            $track->save();

            $path = $router->generatePath('track-index');
            $router->redirect($path);
            return null;
        } else {
            $track = new Track();
        }

        $html = $templating->render('track/create.html.php', [
            'track' => $track,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $trackId, ?array $requestTrack, Templating $templating, Router $router): ?string
    {
        $track = Track::find($trackId);
        if (! $track) {
            throw new NotFoundException("Missing track with id $trackId");
        }

        if ($requestTrack) {
            $track->fill($requestTrack);
            // @todo missing validation
            $track->save();

            $path = $router->generatePath('track-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('track/edit.html.php', [
            'track' => $track,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $trackId, Templating $templating, Router $router): ?string
    {
        $track = Track::find($trackId);
        if (! $track) {
            throw new NotFoundException("Missing track with id $trackId");
        }

        $html = $templating->render('track/show.html.php', [
            'track' => $track,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $trackId, Router $router): ?string
    {
        $track = Track::find($trackId);
        if (! $track) {
            throw new NotFoundException("Missing track with id $trackId");
        }

        $track->delete();
        $path = $router->generatePath('track-index');
        $router->redirect($path);
        return null;
    }
}


import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import API from '@/api';
import LoaderPage from '@/components/loader.page';
import GameDialog from '@/components/game-dialog';

export const Route = createFileRoute('/games/$gameID')({
  loader: async ({ params }) =>
    API.getGames().then((games) => games.find((game) => game.id === params.gameID)),
  component: GamePopup,
  pendingComponent: LoaderPage,
});

function GamePopup() {
  const game = Route.useLoaderData();

  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    if (canGoBack) router.history.back();
    else navigate({ to: '/games' });
  }, []);

  return <GameDialog game={game} onClose={onClose} />;
}

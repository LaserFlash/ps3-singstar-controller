import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import API from '@/api';
import GameDialog from '@/components/game-dialog';
import LoaderPage from '@/components/loader.page';

export const Route = createFileRoute('/songs/$gameID')({
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
    else navigate({ to: '/songs' });
  }, []);

  return <GameDialog game={game} onClose={onClose} />;
}

import { Outlet, createFileRoute } from '@tanstack/react-router';
import GamesList from '@/components/game-list';
import LoaderPage from '@/components/loader.page';
import API from '@/api';

export const Route = createFileRoute('/games')({
  loader: API.getGames,
  component: Games,
  pendingComponent: LoaderPage,
});

function Games() {
  const games = Route.useLoaderData();

  return (
    <main>
      <GamesList games={games} />
      <Outlet />
    </main>
  );
}

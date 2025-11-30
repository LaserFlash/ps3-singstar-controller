import { Outlet, createFileRoute } from '@tanstack/react-router';
import API from '@/api';
import GamesList from '@/components/game-list';
import LoaderPage from '@/components/loader.page';

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

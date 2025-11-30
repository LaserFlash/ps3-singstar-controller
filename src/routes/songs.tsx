import { Outlet, createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import Fuse from 'fuse.js';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { TbMusicSearch } from 'react-icons/tb';
import API from '@/api';
import LoaderPage from '@/components/loader.page';
import SongList from '@/components/song-list';
import classes from '@/routes/songs.module.css';

type SongSearch = {
  gameID?: string;
  text?: string;
};

export const Route = createFileRoute('/songs')({
  component: RouteComponent,
  pendingComponent: LoaderPage,
  validateSearch: (search): SongSearch => search,
  loaderDeps: ({ search: { gameID, text } }) => ({ gameID, text }),
  loader: async ({ deps }) => {
    const allGames = await API.getGames();
    const relevantGames = allGames.filter((game) => !deps.gameID || game.id === deps.gameID);
    const songs = relevantGames
      .flatMap((game) => game.songs.map((song) => ({ ...song, game: game })))
      .sort(
        (a, b) =>
          a.artist
            .replace(/^(an|the|la)\s/i, '')
            .trim()
            .localeCompare(b.artist.replace(/^(an?|the)\s/i, '')) || a.name.localeCompare(b.name)
      );

    if (deps.text) {
      const songsMatchingSearch = new Fuse(songs, { keys: ['artist', 'name'], threshold: 0.3 })
        .search(deps.text)
        .map((result) => result.item);

      return { games: allGames, songs: songsMatchingSearch };
    }

    return { games: allGames, songs };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const { games, songs } = Route.useLoaderData();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
    subscribe,
  } = useForm<SongSearch>({ values: search });

  const onSubmitSearch: SubmitHandler<SongSearch> = (formValues) => {
    navigate({ search: formValues });
  };

  const onSubmitClear: SubmitHandler<SongSearch> = () => {
    reset({ gameID: '', text: '' });
    navigate({ search: {} });
  };

  useEffect(
    () =>
      subscribe({
        name: 'gameID',
        formState: { values: true },
        callback: () => handleSubmit(onSubmitSearch)(),
      }),
    [handleSubmit, subscribe, onSubmitSearch]
  );

  return (
    <main>
      <form className={classes['search-form']} onSubmit={handleSubmit(onSubmitSearch)}>
        <div className={classes['search-form-fields']}>
          <label className="field">
            <span className="label">Artist / Title</span>
            <input placeholder="" {...register('text')} />
          </label>
          <label className="field">
            <span className="label">Game</span>
            <select {...register('gameID')}>
              <option value="">-- All --</option>
              {games.map((game: any) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div role="group" className={clsx('button-group', classes['search-form-actions'])}>
          <button
            type="button"
            className="button outlined"
            onClick={handleSubmit(onSubmitClear)}
            disabled={isSubmitting}
          >
            Clear
          </button>
          <button
            type="submit"
            className="button filled"
            onClick={handleSubmit(onSubmitSearch)}
            disabled={isSubmitting}
          >
            Search
            <TbMusicSearch />
          </button>
        </div>
      </form>
      <SongList songs={songs} />
      <Outlet />
    </main>
  );
}

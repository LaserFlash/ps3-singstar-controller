import { Link, useSearch } from '@tanstack/react-router';
import clsx from 'clsx';
import { type Game } from '@/api';
import GameCover from '@/components/game-cover';
import classes from '@/components/song-list.module.css';

type Song = {
  name: string;
  artist: string;
  game: Game;
};

type Props = {
  songs: Song[];
};

export default function SongList({ songs }: Props) {
  const search = useSearch({ from: '/songs' });

  return (
    <div className={classes['song-list']}>
      {songs.map((song) => (
        <Link
          key={`${song.name}-${song.game.id}`}
          className={clsx('card outlined', classes['song-card'])}
          to="/songs/$gameID"
          params={{ gameID: song.game.id }}
          search={search}
          resetScroll={false}
        >
          <div className={classes['song-info']}>
            <GameCover game={song.game} className={classes['game-cover']}>
              <GameCover.Image />
            </GameCover>
            <div>
              <strong>{song.name}</strong>
              <br />
              <small>{song.artist}</small>
            </div>
          </div>
          <div className={classes['game-info']}>
            <div>{song.game.name}</div>
            <div>{song.game.type}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

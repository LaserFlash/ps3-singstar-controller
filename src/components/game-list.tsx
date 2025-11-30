import { Link } from '@tanstack/react-router';
import classes from '@//components/game-list.module.css';
import { type Game } from '@/api';
import GameCover from '@/components/game-cover';

type Props = {
  games: Game[];
};

export default function GamesList({ games }: Props) {
  const PS2Games = games.filter((game) => game.type === 'PS2');
  const PS3Games = games.filter((game) => game.type === 'PS3');

  return (
    <div className="card">
      <hgroup>
        <h2>Games List</h2>
        <h3>PS3</h3>
      </hgroup>
      <div className={classes.grid}>
        {PS3Games.map((game) => (
          <Link
            key={game.id}
            className={classes.game}
            to="/games/$gameID"
            params={{ gameID: game.id }}
            resetScroll={false}
          >
            <GameCover game={game}>
              <GameCover.Image />
              <GameCover.Title />
            </GameCover>
          </Link>
        ))}
      </div>

      <hgroup>
        <h3>PS2</h3>
      </hgroup>
      <div className={classes.grid}>
        {PS2Games.map((game) => (
          <Link
            key={game.id}
            className={classes.game}
            to="/games/$gameID"
            params={{ gameID: game.id }}
            resetScroll={false}
          >
            <GameCover game={game}>
              <GameCover.Image />
              <GameCover.Title />
            </GameCover>
          </Link>
        ))}
      </div>
    </div>
  );
}

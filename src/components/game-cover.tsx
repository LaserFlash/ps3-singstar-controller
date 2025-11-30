import clsx from 'clsx';
import { type PropsWithChildren, createContext, useContext, useState } from 'react';
import API, { type Game } from '@/api';
import PS2coverFailed from '@/assets/artwork-unavailable-ps2.webp';
import PS3coverFailed from '@/assets/artwork-unavailable-ps3.webp';
import classes from '@/components/game-cover.module.css';

const GameContext = createContext<Game>({} as Game);

type Props = { game: Game; className?: string };
function GameCover({ game, className, children }: PropsWithChildren<Props>) {
  return (
    <GameContext value={game}>
      <div className={clsx(classes['game-cover'], classes[game.type], className)}>{children}</div>
    </GameContext>
  );
}

function GameImage() {
  const [failedToLoad, setLoadingFailed] = useState(false);
  const game = useContext(GameContext);

  if (failedToLoad)
    return (
      <img
        src={game.type === 'PS2' ? PS2coverFailed : PS3coverFailed}
        loading="lazy"
        role="presentation"
      />
    );
  return (
    <img
      src={API[game.type].coverArt(game.id)}
      onError={() => setLoadingFailed(true)}
      loading="lazy"
      role="presentation"
    />
  );
}

function GameTitle() {
  const game = useContext(GameContext);
  return <strong>{shortenName(game.name)}</strong>;
}

function shortenName(name: string) {
  if (name.length < 18) return name;
  return name.replace('SingStar', '').replace('Singalong with', '').trim();
}

export default Object.assign(GameCover, { Image: GameImage, Title: GameTitle });

import clsx from 'clsx';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg';
import { Link } from '@tanstack/react-router';
import { GoIssueTrackedBy, GoIssueTracks } from 'react-icons/go';
import { TiEjectOutline } from 'react-icons/ti';
import type { Game } from '@/api';
import GameCover from '@/components/game-cover';
import classes from '@/components/game-dialog.module.css';
import sheet from '@/styles/modules/sheet.module.css';
import API from '@/api';

type Props = {
  game: Game | undefined;
  onClose: () => void;
};

export default function GameDialog({ game, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  const closeDialog = useCallback((event?: React.MouseEvent<HTMLDialogElement>) => {
    if (!event || event.target === dialog.current) {
      dialog.current?.close();
      onClose();
    }
  }, []);

  useLayoutEffect(() => dialog.current?.showModal(), []);

  if (!game) {
    return (
      <dialog className={`${sheet['bottom-sheet']}`} ref={dialog} onClick={closeDialog}>
        <div>
          <button
            aria-label="Close"
            className={clsx('icon-button', sheet['close-button'])}
            onClick={() => closeDialog()}
          >
            <CgClose />
          </button>
        </div>
        <div className="content">
          <p>Game not found.</p>
        </div>
      </dialog>
    );
  }

  return (
    <dialog className={`${sheet['bottom-sheet']}`} ref={dialog} onClick={closeDialog}>
      <hgroup>
        <GameCover game={game} className={classes['game-cover']}>
          <GameCover.Image />
        </GameCover>
        <div>
          <h2>{game.name}</h2>
          <small className={classes['game-type']}>{game.type}</small>
        </div>
      </hgroup>

      <div>
        <button
          aria-label="Close"
          className={clsx('icon-button', sheet['close-button'])}
          onClick={() => closeDialog()}
        >
          <CgClose />
        </button>
      </div>

      <div className="content">
        <ul className="list">
          <li>
            <button onClick={() => API[game.type].mountGame(game.path)}>
              <div className="start">
                <GoIssueTrackedBy size="2rem" />
              </div>
              <div className="text">Mount disc</div>
            </button>
          </li>
          <li>
            <button onClick={() => API[game.type].unmount()}>
              <div className="start">
                <TiEjectOutline className="start" size="2rem" />
              </div>
              <div className="text">Unmount disc</div>
            </button>
          </li>
          <li>
            <Link to="/songs" search={{ gameID: game.id }} className={classes['button-link']}>
              <div className="start">
                <GoIssueTracks className="start" size="2rem" />
              </div>
              <div className="text">View tracks</div>
            </Link>
          </li>
        </ul>
      </div>
    </dialog>
  );
}

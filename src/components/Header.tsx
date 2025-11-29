import { Link } from '@tanstack/react-router';
import { PiGameControllerBold } from 'react-icons/pi';
import { TbMusic } from 'react-icons/tb';
import clsx from 'clsx';
import classes from '@/components/header.module.css';

export default function Header() {
  return (
    <header>
      <nav className={clsx(classes['nav-bar'], 'tabs filled')}>
        <Link className={clsx(classes['nav-button'], 'tab')} resetScroll={true} to="/games">
          <PiGameControllerBold />
          Avaliable Games
        </Link>
        <Link className={clsx(classes['nav-button'], 'tab')} resetScroll={true} to="/songs">
          <TbMusic size={'4rem'} />
          Avaliable Songs
        </Link>
      </nav>
    </header>
  );
}

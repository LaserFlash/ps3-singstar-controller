import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="tabs filled">
        <Link className="tab button" to="/">
          Home
        </Link>
        <Link className="tab button" to="/demo/table">
          TanStack Table
        </Link>
      </nav>
    </header>
  );
}

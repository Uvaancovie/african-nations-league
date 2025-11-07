import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-lg">African Nations League</span>
            <span className="font-bold text-lg">African Nations League</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/tournament">Bracket</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/leaderboard">Leaderboard</Link>
          </Button>
          <Button asChild>
            <Link href="/register-team">Register Team</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
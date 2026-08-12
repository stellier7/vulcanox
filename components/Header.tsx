"use client";

import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className="container-edge py-4">
        <Link href="/" className="font-serif text-xl tracking-wide transition-opacity hover:opacity-80">
          VULCANOX
        </Link>
      </div>
    </header>
  );
}



"use client";

import Link from 'next/link';

export function Header() {
  console.log('[VULCANOX] Header rendering');
  
  return (
    <header>
      <div className="container-edge py-4">
        <Link href="/" className="font-serif text-xl tracking-wide hover:opacity-80 transition-opacity">
          VULCANOX
        </Link>
      </div>
    </header>
  );
}



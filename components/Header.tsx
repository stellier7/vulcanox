"use client";

import Link from 'next/link';

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-edge py-5 md:py-6">
        <Link
          href="/"
          className="group inline-flex flex-col gap-2 transition-opacity hover:opacity-85"
          aria-label="Vulcanox home"
        >
          <span className="font-serif text-[0.72rem] font-normal uppercase tracking-[0.38em] text-white/90 md:text-[0.8rem] md:tracking-[0.42em] pl-[0.38em] md:pl-[0.42em]">
            Vulcanox
          </span>
          <span
            className="h-px w-12 bg-gradient-to-r from-bronze/90 via-bronze/45 to-transparent transition-[width] duration-500 group-hover:w-16 md:w-14 md:group-hover:w-[4.25rem]"
            aria-hidden
          />
        </Link>
      </div>
    </header>
  );
}



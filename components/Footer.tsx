"use client";

import { useEffect, useState } from 'react';

function isSpanishLocale(locale: string | undefined | null) {
  if (!locale) return false;
  return locale.toLowerCase().startsWith('es');
}

export function Footer() {
  const year = new Date().getFullYear();
  // Site default is English; switch only when the browser locale is Spanish.
  const [creditPrefix, setCreditPrefix] = useState('Developed by');

  useEffect(() => {
    const locales = [navigator.language, ...(navigator.languages || [])];
    if (locales.some(isSpanishLocale)) {
      setCreditPrefix('Desarrollado por');
    }
  }, []);

  return (
    <footer className="site-footer">
      <div className="container-edge">
        <div className="foot-fine">
          © {year} VULCANOX — Florida. Investment-driven general contracting.
        </div>
        <div className="foot-credit">
          {creditPrefix}{' '}
          <a href="https://iagodigital.vercel.app" target="_blank" rel="noopener">
            IAGO Digital
          </a>
        </div>
      </div>
    </footer>
  );
}

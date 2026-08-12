export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-edge">
        <div className="foot-fine">
          © {year} VULCANOX — Florida. Investment-driven general contracting.
        </div>
        <div className="foot-credit">
          Desarrollado por{' '}
          <a href="https://iagodigital.vercel.app" target="_blank" rel="noopener">
            IAGO Digital
          </a>
        </div>
      </div>
    </footer>
  );
}

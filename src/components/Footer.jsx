export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__big" aria-hidden="true">HALO</div>
      <div className="footer__row">
        <span>© {new Date().getFullYear()} HALO Audio. A concept product page.</span>
        <span>Made with React Three Fiber · Motion · GSAP</span>
      </div>
    </footer>
  )
}

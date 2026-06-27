function Navbar({ activePage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <span>Student</span>Desk
        </div>
        <nav className="nav-links">
          <button className={`nav-link ${activePage === 'home' ? 'active' : ''}`} type="button" onClick={() => onNavigate('home')}>
            Home
          </button>
          <button className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`} type="button" onClick={() => onNavigate('dashboard')}>
            Dashboard
          </button>
          <button className={`nav-link ${activePage === 'features' ? 'active' : ''}`} type="button" onClick={() => onNavigate('features')}>
            Features
          </button>
          <button className={`nav-link ${activePage === 'contact' ? 'active' : ''}`} type="button" onClick={() => onNavigate('contact')}>
            Contact
          </button>
          <button className="nav-pill" type="button" onClick={() => onNavigate('login')}>
            Login
          </button>
          <button className="nav-pill" type="button" onClick={() => onNavigate('signup')}>
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

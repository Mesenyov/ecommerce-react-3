import './Header.css';

export function Header({ pageType, setPageType, cartItemCount }) {
  return (
    <header className="header">
      <div className="header-container">
        {}
        <button onClick={() => setPageType('tv')} className="logo" style={{background:'none', border:'none', cursor:'pointer'}}>
          TechStore
        </button>
        
        <nav className="navigation">
          <button className={`nav-btn ${pageType === 'tv' ? 'active' : ''}`} onClick={() => setPageType('tv')}>TV</button>
          <button className={`nav-btn ${pageType === 'phone' ? 'active' : ''}`} onClick={() => setPageType('phone')}>Phone</button>
          <button className={`nav-btn ${pageType === 'laptop' ? 'active' : ''}`} onClick={() => setPageType('laptop')}>Laptop</button>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" onClick={() => setPageType('cart')} style={{ position: 'relative' }}>
            🛒
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
          <button className="icon-btn">👤</button>
        </div>
      </div>
    </header>
  );
}
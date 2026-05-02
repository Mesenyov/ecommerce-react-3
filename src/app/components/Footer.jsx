import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-content">
          <div className="footer-column">
            <h4 className="footer-title">About</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>

          <div className="footer-column newsletter">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">Subscribe for exclusive deals</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email" className="newsletter-input" />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 TechStore. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
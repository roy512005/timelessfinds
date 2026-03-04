import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2>Timeless Finds.</h2>
                        <p>Curating stories and artifacts from generations past for the discerning modern collector.</p>
                    </div>
                    <div className="footer-links">
                        <h3>Explore</h3>
                        <Link to="/shop">Gallery Objects</Link>
                        <Link to="/about">Our Philosophy</Link>
                        <Link to="/contact">Private Concierge</Link>
                    </div>
                    <div className="footer-links">
                        <h3>Client Services</h3>
                        <Link to="#">Authenticity Guarantee</Link>
                        <Link to="#">Secure Shipping</Link>
                        <Link to="#">Return Policy</Link>
                    </div>
                    <div className="footer-social">
                        <h3>Connect</h3>
                        <div className="social-icons">
                            <a href="#"><Instagram /></a>
                            <a href="#"><Facebook /></a>
                            <a href="#"><Twitter /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Timeless Finds. All Rights Reserved.</p>
                </div>
            </div>
            <style>{`
        .footer-wrapper {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 6rem 0 2rem;
          margin-top: 4rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4rem;
          margin-bottom: 2rem;
        }
        .footer-brand h2 {
          font-family: var(--font-serif);
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .footer-brand p {
          color: var(--text-secondary);
          max-width: 300px;
        }
        .footer-links h3, .footer-social h3 {
          font-family: var(--font-sans);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        .footer-links a {
          display: block;
          color: var(--text-secondary);
          margin-bottom: 0.8rem;
          transition: color var(--trans-fast);
        }
        .footer-links a:hover {
          color: var(--accent-gold);
        }
        .social-icons {
          display: flex;
          gap: 1rem;
        }
        .social-icons a {
          color: var(--text-secondary);
          transition: color var(--trans-fast), transform var(--trans-fast);
        }
        .social-icons a:hover {
          color: var(--accent-gold);
          transform: translateY(-2px);
        }
        .footer-bottom {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;

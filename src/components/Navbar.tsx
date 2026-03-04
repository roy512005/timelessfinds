import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../assets/logo.png'; // Correctly import the logo

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchOpen(false);
            setSearchTerm('');
        }
    };

    return (
        <nav className="nav-wrapper" style={{
            background: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
            borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent'
        }}>
            <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" className="nav-brand">
                    <img src={logoUrl} alt="Timeless Finds" style={{ height: '50px', width: 'auto' }} />
                </Link>

                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>Gallery</Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Philosophy</Link>
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Inquire</Link>
                </div>

                <div className="nav-actions">
                    {searchOpen ? (
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                autoFocus
                                className="search-input"
                                placeholder="Search gallery..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="button" className="nav-icon-btn" onClick={() => setSearchOpen(false)}>
                                <X size={20} color="var(--text-primary)" />
                            </button>
                        </form>
                    ) : (
                        <button className="nav-icon-btn" onClick={() => setSearchOpen(true)}>
                            <Search size={20} color="var(--text-primary)" />
                        </button>
                    )}
                    <button className="nav-icon-btn d-desktop"><ShoppingBag size={20} color="var(--text-primary)" /></button>
                    <button className="nav-icon-btn d-mobile" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-menu"
                    >
                        <div className="mobile-menu-links">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
                            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>Philosophy</Link>
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Inquire</Link>
                            <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .nav-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .nav-icon-btn:hover {
          transform: scale(1.1);
        }
        .search-form {
          display: flex;
          align-items: center;
          background: rgba(22, 21, 20, 0.8);
          border-radius: 20px;
          padding: 0.2rem 0.5rem;
          border: 1px solid var(--border-color);
        }
        .search-input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          outline: none;
          padding: 0.3rem 0.5rem;
          width: 150px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
        }
        .search-input::placeholder {
          color: var(--text-secondary);
        }
        .mobile-menu {
            overflow: hidden;
            background: rgba(10, 10, 10, 0.98);
            border-bottom: 1px solid var(--border-color);
        }
        .mobile-menu-links {
            display: flex;
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            align-items: center;
        }
        .mobile-menu-links a {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 1.2rem;
            font-family: var(--font-serif);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .mobile-menu-links a:hover {
            color: var(--accent-gold);
        }
        .d-mobile { display: none; }
        .d-desktop { display: inline-block; }
        @media (max-width: 768px) {
          .nav-links, .d-desktop { display: none; }
          .d-mobile { display: block; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;

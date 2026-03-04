import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API Error:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const featured = products.slice(0, 3);

  return (
    <div className="home-page">
      {/* Luxury Hero Banner */}
      <section className="hero-section">
        <div className="hero-grid-bg">
          <div className="hero-img-col left-col">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
              alt="Vintage Art" />
          </div>
          <div className="hero-img-col right-col">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
              src="https://images.unsplash.com/photo-1584552439167-93ae3453b341?auto=format&fit=crop&q=80"
              alt="Luxury Vintage Decor" />
          </div>
          <div className="hero-vignette"></div>
        </div>

        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-text-block"
          >
            <div className="badge-wrapper">
              <span className="premium-badge">Exclusive Curations</span>
            </div>
            <h1 className="hero-megatext">
              History, <br />
              <span className="gold-accent italic-text">Reimagined.</span>
            </h1>
            <p className="hero-subtext">
              The world's most highly coveted, historically significant artifacts. Curated exclusively for the modern connoisseur.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary btn-glow">
                Enter The Gallery <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our Philosophy Focus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Curator's Highlights
            </motion.h2>
            <Link to="/shop" className="discover-link">View All Collections</Link>
          </div>

          <div className="featured-grid">
            {featured.map((item, index) => (
              <motion.div
                key={item.id}
                className="story-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="card-image">
                  <img src={item.images && item.images[0]} alt={item.title} />
                  <div className="card-overlay">
                    <Link to={`/product/${item.id}`} className="btn-explore">Discover Origin</Link>
                  </div>
                </div>
                <div className="card-content">
                  <span className="card-era">{item.era}</span>
                  <h3>{item.title}</h3>
                  <p className="card-excerpt">{item.story_description?.substring(0, 100)}...</p>
                  <p className="card-price">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section features-section glass-panel">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
            style={{ marginBottom: '4rem', color: 'var(--accent-gold)' }}
          >
            Preserving Authenticity
          </motion.h2>

          <div className="features-grid">
            <div className="feature-item">
              <Shield size={40} className="feature-icon" />
              <h3>Verified Provenance</h3>
              <p>Every piece is heavily authenticated by our master historians and curators to guarantee origin.</p>
            </div>
            <div className="feature-item">
              <Compass size={40} className="feature-icon" />
              <h3>Global Sourcing</h3>
              <p>We travel European estates, Asian markets, and forgotten archives to find unparalleled rarity.</p>
            </div>
            <div className="feature-item">
              <Clock size={40} className="feature-icon" />
              <h3>Timeless Value</h3>
              <p>Investment-grade items that appreciate visually, historically, and financially over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>Voices of Collectors</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="stars"><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /></div>
              <p className="testimonial-text">"The mid-century vessel I acquired completely transformed my study. The depth of the curation is truly museum-quality."</p>
              <p className="testimonial-author">- Elara Vance, Interior Architect</p>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /></div>
              <p className="testimonial-text">"Timeless Finds doesn't just sell antiques; they sell the profound stories attached to them. Exceptional experience."</p>
              <p className="testimonial-author">- Julian Hayes, Private Collector</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <h2>The Inner Circle</h2>
            <p>Join our private list to gain early access to newly acquired rare finds before they reach the public gallery.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your minimalist address" required />
              <button type="submit" className="btn btn-primary">Request Access</button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          min-height: 800px;
          display: flex;
          align-items: center;
          margin-top: -80px; 
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          display: flex;
        }
        .hero-img-col {
          flex: 1;
          height: 100%;
          position: relative;
        }
        .left-col {
           transform: scaleX(-1);
        }
        .hero-img-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) contrast(1.1);
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.8) 40%, rgba(10,10,10,0.2) 100%);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
        }
        .hero-text-block {
          max-width: 700px;
        }
        
        .badge-wrapper {
          margin-bottom: 2rem;
        }
        .premium-badge {
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          padding: 0.5rem 1.2rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          border-radius: 50px;
          background: rgba(255, 215, 0, 0.05);
        }

        .hero-megatext {
          font-size: clamp(4rem, 8vw, 6.5rem);
          line-height: 1.05;
          margin-bottom: 2rem;
        }
        .gold-accent.italic-text {
          font-style: italic;
          color: var(--accent-gold);
        }
        
        .hero-subtext {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 3.5rem;
          max-width: 550px;
          font-family: var(--font-sans);
        }

        .hero-ctas {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .btn-glow {
          box-shadow: 0 0 20px rgba(200, 169, 126, 0.2);
        }
        .btn-glow:hover {
          box-shadow: 0 0 30px rgba(200, 169, 126, 0.4);
        }
        .btn-outline {
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem;
          transition: all var(--trans-fast);
        }
        .btn-outline:hover {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .section-header h2 {
          font-size: 2.5rem;
          color: var(--accent-gold);
        }
        .discover-link {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          position: relative;
        }
        .discover-link:hover {
          color: var(--text-primary);
        }
        .discover-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }
        .story-card {
          group: true;
        }
        .card-image {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--trans-smooth);
        }
        .story-card:hover .card-image img {
          transform: scale(1.05);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--trans-fast);
        }
        .story-card:hover .card-overlay {
          opacity: 1;
        }
        .btn-explore {
          padding: 1rem 2rem;
          background: var(--bg-primary);
          color: var(--accent-gold);
          border: 1px solid var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          transition: all var(--trans-fast);
        }
        .btn-explore:hover {
          background: var(--accent-gold);
          color: var(--bg-primary);
        }
        .card-era {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          display: block;
        }
        .card-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
        }
        .card-excerpt {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .card-price {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--accent-gold);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          text-align: center;
        }
        .feature-item {
          padding: 2rem;
        }
        .feature-icon {
          color: var(--accent-gold);
          margin-bottom: 1.5rem;
        }
        .feature-item h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }
        .feature-item p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }
        .testimonial-card {
          padding: 3rem;
          border: 1px solid var(--border-color);
          background: rgba(22, 21, 20, 0.4);
        }
        .stars {
          color: var(--accent-gold);
          display: flex;
          gap: 0.3rem;
          margin-bottom: 1.5rem;
        }
        .testimonial-text {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-style: italic;
          line-height: 1.8;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }
        .testimonial-author {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
        }

        .newsletter-box {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          padding: 5rem 3rem;
          border: 1px solid var(--border-color);
          background: linear-gradient(135deg, rgba(200, 169, 126, 0.05) 0%, transparent 100%);
        }
        .newsletter-box h2 {
          font-size: 2.5rem;
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .newsletter-box p {
          color: var(--text-secondary);
          margin-bottom: 3rem;
        }
        .newsletter-form {
          display: flex;
          gap: 1rem;
        }
        .newsletter-form input {
          flex: 1;
          padding: 1rem 1.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          outline: none;
          font-family: var(--font-sans);
        }
        .newsletter-form input:focus {
          border-color: var(--accent-gold);
        }
        
        @media (max-width: 768px) {
          .newsletter-form {
            flex-direction: column;
          }
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }
        .text-center { text-align: center; }
      `}</style>
    </div>
  );
};

export default Home;

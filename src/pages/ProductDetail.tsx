import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, Compass, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const [reservationForm, setReservationForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [resStatus, setResStatus] = useState('');

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setResStatus('Processing...');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: formData.name,
          email: formData.email
        })
      });

      if (res.ok) {
        setResStatus('Success! Our curator will contact you shortly.');
        setProduct({ ...product, status: 'reserved' }); // Optimistic update
        setTimeout(() => setReservationForm(false), 3000);
      } else {
        const data = await res.json();
        setResStatus(`Failed: ${data.message}`);
      }
    } catch (error) {
      setResStatus('Failed to connect to server.');
    }
  };

  if (loading) return <div className="container section text-center" style={{ paddingTop: '150px' }}><h2>Loading Artifact...</h2></div>;

  if (!product || product.message) {
    return <div className="container section text-center" style={{ paddingTop: '150px' }}><h2>Artifact not found.</h2><Link to="/shop" className="btn">Return to Gallery</Link></div>;
  }

  return (
    <div className="product-detail-page">
      <div className="back-link-wrapper container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} /> Back to Gallery
        </Link>
      </div>

      <div className="product-hero container section">
        <div className="product-layout">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="product-gallery"
          >
            <div className="main-image">
              <img src={product.images && product.images[0]} alt={product.title} />
              <div className="only-one-badge">UNIQUE FIND — ONLY 1 VERIFIED PIECE AVAILABLE</div>
            </div>
            {/* Ideally would map over product.gallery if more than 1 image existed */}
            <div className="thumbnail-strip">
              {product.images && product.images.map((img: string, i: number) => (
                <div key={i} className={`thumbnail ${i === 0 ? 'active' : ''}`}>
                  <img src={img} alt={`View ${i + 1}`} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="product-content-area"
          >
            <span className="detail-category">{product.category} • {product.era}</span>
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-price">₹{product.price.toLocaleString('en-IN')}</p>

            <div className="add-to-cart-wrapper">
              {product.status === 'sold' ? (
                <button className="btn btn-primary full-width-btn" disabled style={{ background: 'var(--border-color)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', cursor: 'not-allowed' }}>Acquired Globally</button>
              ) : product.status === 'reserved' ? (
                <button className="btn btn-primary full-width-btn" disabled style={{ background: 'rgba(255, 165, 0, 0.2)', color: 'orange', borderColor: 'orange', cursor: 'not-allowed' }}>Currently Reserved</button>
              ) : reservationForm ? (
                <form onSubmit={handleReserve} className="reservation-form">
                  <h4 style={{ marginBottom: '1rem', color: 'var(--accent-gold)' }}>Secure Your Reservation</h4>
                  <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="res-input" />
                  <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="res-input" />
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm Hold</button>
                    <button type="button" className="btn" onClick={() => setReservationForm(false)}>Cancel</button>
                  </div>
                  {resStatus && <p style={{ marginTop: '1rem', color: resStatus.includes('Failed') ? 'red' : '#00ff7f', fontSize: '0.9rem' }}>{resStatus}</p>}
                </form>
              ) : (
                <button className="btn btn-primary full-width-btn" onClick={() => setReservationForm(true)}>Reserve This Piece</button>
              )}
            </div>

            <div className="accordion-section">
              <div className="story-block">
                <h3><Compass size={18} /> The Narrative</h3>
                <p>{product.short_description}</p>
                <div style={{ marginTop: '1.5rem' }}>
                  <p><strong>Historical Context:</strong> {product.story_description}</p>
                </div>
              </div>

              <div className="specs-grid">
                <div className="spec-card">
                  <Shield size={20} className="spec-icon" />
                  <h4>Condition & Authenticity</h4>
                  <p>{product.condition}</p>
                </div>
                <div className="spec-card">
                  <Clock size={20} className="spec-icon" />
                  <h4>Shipping & Concierge</h4>
                  <p>White-glove delivery available internationally. Art transport insured up to gallery valuation.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .product-detail-page {
          padding-top: 100px;
        }
        .back-link-wrapper {
          margin-bottom: 2rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          transition: color var(--trans-fast);
        }
        .back-link:hover {
          color: var(--accent-gold);
        }

        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
        }

        .main-image {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .only-one-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          z-index: 10;
        }

        .thumbnail-strip {
          display: flex;
          gap: 1rem;
        }
        .thumbnail {
          width: 80px;
          height: 80px;
          cursor: pointer;
          opacity: 0.6;
          transition: all var(--trans-fast);
          border: 1px solid transparent;
        }
        .thumbnail:hover, .thumbnail.active {
          opacity: 1;
          border-color: var(--accent-gold);
        }
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-content-area {
          padding-top: 2rem;
        }
        .detail-category {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 1.5rem;
        }
        .detail-title {
          font-size: 3rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .detail-price {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--accent-gold);
          margin-bottom: 3rem;
        }

        .add-to-cart-wrapper {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 3rem;
          margin-bottom: 3rem;
        }
        .full-width-btn {
          width: 100%;
          padding: 1.5rem;
          font-size: 1rem;
        }

        .reservation-form {
          background: rgba(22, 21, 20, 0.6);
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          margin-bottom: 2rem;
        }

        .res-input {
          width: 100%;
          padding: 1rem;
          margin-bottom: 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          outline: none;
          font-family: var(--font-sans);
        }

        .res-input:focus {
          border-color: var(--accent-gold);
        }

        .story-block {
          margin-bottom: 3rem;
        }
        .story-block h3 {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        .story-block p {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1.05rem;
        }
        .story-block strong {
          color: var(--text-primary);
          font-weight: 500;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 3rem;
        }
        .spec-card {
          background: rgba(22, 21, 20, 0.4);
          padding: 2rem;
          border-left: 2px solid var(--accent-gold);
        }
        .spec-icon {
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .spec-card h4 {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .spec-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        @media (max-width: 992px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .only-one-badge {
            top: 1rem;
            right: 1rem;
            font-size: 0.65rem;
          }
          .detail-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;

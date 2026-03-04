import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Vintage', 'Decor', 'Collectibles', 'Industrial', 'Rare Finds'];
const eras = ['All', '19th Century', 'Victorian', 'Mid-Century', '1930s', '1950s', 'Edwardian'];

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeEra, setActiveEra] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search');
        const url = query ? `/api/products?search=${query}` : '/api/products';
        const res = await fetch(url);
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
  }, [location.search]);

  const filteredProducts = products.filter(product => {
    return (
      (activeCategory === 'All' || product.category === activeCategory) &&
      (activeEra === 'All' || product.era === activeEra) &&
      product.price <= priceRange
    );
  });

  return (
    <div className="shop-page container section">
      <div className="shop-header">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Curated Gallery
        </motion.h1>
        <button className="btn transition-transform" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="filters-panel"
          >
            <div className="filter-group">
              <h3>Category</h3>
              <div className="filter-options">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h3>Era</h3>
              <div className="filter-options">
                {eras.map(era => (
                  <button
                    key={era}
                    className={`filter-btn ${activeEra === era ? 'active' : ''}`}
                    onClick={() => setActiveEra(era)}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h3>Max Price: ₹{priceRange}</h3>
              <input
                type="range"
                min="500" max="10000" step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-slider"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="products-grid">
        <AnimatePresence>
          {filteredProducts.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="product-card"
            >
              <div className="product-image-container">
                <img src={item.images && item.images[0]} alt={item.title} />
                <div className="product-hover">
                  <span className="hover-era">{item.era}</span>
                  <Link to={`/product/${item.id}`} className="btn">Acquire Piece</Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{item.title}</h3>
                <p className="product-category">{item.category}</p>
                <span className="product-price">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <h3>No historical artifacts match this criteria.</h3>
          <p>Please adjust your detailed filters to discover more items.</p>
        </div>
      )}

      <style>{`
        .shop-page {
          padding-top: 100px;
        }
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }
        .shop-header h1 {
          font-size: 3.5rem;
          font-family: var(--font-serif);
          color: var(--accent-gold);
        }
        
        .filters-panel {
          background: rgba(22, 21, 20, 0.5);
          border: 1px solid var(--border-color);
          padding: 2rem;
          margin-bottom: 3rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          overflow: hidden;
        }
        .filter-group h3 {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .filter-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid rgba(200, 169, 126, 0.3);
          color: var(--text-primary);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all var(--trans-fast);
        }
        .filter-btn:hover {
          border-color: var(--accent-gold);
        }
        .filter-btn.active {
          background: var(--accent-gold);
          color: var(--bg-primary);
          border-color: var(--accent-gold);
        }

        .price-slider {
          width: 100%;
          accent-color: var(--accent-gold);
          height: 4px;
          background: var(--bg-secondary);
          outline: none;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 4rem 2rem;
        }
        .product-card {
          cursor: pointer;
        }
        .product-image-container {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--bg-secondary);
          margin-bottom: 1.5rem;
        }
        .product-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .product-hover {
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.7);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          padding: 2rem;
        }
        .product-card:hover .product-image-container img {
          transform: scale(1.05);
        }
        .product-card:hover .product-hover {
          opacity: 1;
        }
        .hover-era {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.5rem;
          color: var(--accent-gold);
          margin-bottom: 2rem;
          text-align: center;
        }

        .product-info h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .product-category {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        .product-price {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--accent-gold);
        }
        
        .empty-state {
          text-align: center;
          padding: 6rem 0;
        }
        .empty-state h3 {
          font-family: var(--font-serif);
          color: var(--accent-gold);
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .empty-state p {
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .shop-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
          }
          .filters-panel {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Shop;

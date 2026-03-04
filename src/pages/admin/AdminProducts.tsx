import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        short_description: '',
        story_description: '',
        category: 'Rings',
        era: '',
        condition: '',
        authenticity_note: '',
        status: 'available',
        imageUrl: '' // simplified for demo
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    };

    const handleOpenModal = (product: any = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                title: product.title || '',
                price: product.price || '',
                short_description: product.short_description || '',
                story_description: product.story_description || '',
                category: product.category || 'Rings',
                era: product.era || '',
                condition: product.condition || '',
                authenticity_note: product.authenticity_note || '',
                status: product.status || 'available',
                imageUrl: (product.images && product.images[0]) || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                title: '', price: '', short_description: '', story_description: '',
                category: 'Rings', era: '', condition: '', authenticity_note: '', status: 'available', imageUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            images: [formData.imageUrl]
        };

        try {
            const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
            const method = editingProduct ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                fetchProducts();
                handleCloseModal();
            } else {
                alert('Save failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this piece?")) {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>Inventory Map</h2>
                <button className="btn" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <Plus size={16} /> Add Artifact
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Piece</th>
                            <th>Category</th>
                            <th>Era</th>
                            <th>Valuation</th>
                            <th>Status</th>
                            <th>Engage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td><strong>{product.title}</strong></td>
                                <td>{product.category}</td>
                                <td>{product.era}</td>
                                <td style={{ color: 'var(--accent-gold)' }}>₹{Number(product.price).toLocaleString('en-IN')}</td>
                                <td><span className={`status-badge ${product.status}`}>{product.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button onClick={() => handleOpenModal(product)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none' }}><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', outline: 'none' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontSize: '1.5rem' }}>
                                {editingProduct ? 'Edit Artifact' : 'Add New Artifact'}
                            </h3>
                            <button onClick={handleCloseModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="admin-form-grid">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option>Vintage</option>
                                    <option>Decor</option>
                                    <option>Collectibles</option>
                                    <option>Industrial</option>
                                    <option>Rare Finds</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Era (e.g., 1920s Art Deco)</label>
                                <input type="text" required value={formData.era} onChange={e => setFormData({ ...formData, era: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Image URL</label>
                                <input type="text" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Short Description (Teaser)</label>
                                <input type="text" value={formData.short_description} onChange={e => setFormData({ ...formData, short_description: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Story / Historical Context</label>
                                <textarea rows={4} value={formData.story_description} onChange={e => setFormData({ ...formData, story_description: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Condition Status</label>
                                <input type="text" required value={formData.condition} onChange={e => setFormData({ ...formData, condition: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Authenticity Note</label>
                                <input type="text" value={formData.authenticity_note} onChange={e => setFormData({ ...formData, authenticity_note: e.target.value })} />
                            </div>
                            <div className="form-group full-width">
                                <label>Sales Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="available">Available</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>
                            <div className="form-group full-width" style={{ marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>{editingProduct ? 'Save Changes' : 'Publish Item'}</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <style>{`
                .admin-table-container {
                    background: rgba(22, 21, 20, 0.3);
                    border: 1px solid var(--border-color);
                    padding: 2rem;
                    overflow-x: auto;
                }
                .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
                .admin-table th { padding: 1rem; border-bottom: 2px solid var(--border-color); color: var(--text-secondary); text-transform: uppercase; font-size: 0.85rem; }
                .admin-table td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem; }
                
                .status-badge { padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; text-transform: uppercase; font-weight: bold; }
                .status-badge.available { background: rgba(0, 255, 100, 0.1); color: #00ff7f; border: 1px solid #00ff7f; }
                .status-badge.reserved { background: rgba(255, 165, 0, 0.1); color: orange; border: 1px solid orange; }
                .status-badge.sold { background: rgba(255, 0, 0, 0.1); color: red; border: 1px solid red; }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
                    display: flex; justify-content: center; align-items: flex-start;
                    padding-top: 5rem; z-index: 1000; overflow-y: auto; padding-bottom: 5rem;
                }
                .modal-content {
                    background: var(--bg-primary); border: 1px solid var(--border-color);
                    padding: 3rem; width: 100%; max-width: 800px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }
                
                .admin-form-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
                }
                .full-width { grid-column: span 2; }
                
                .form-group label {
                    display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;
                }
                .form-group input, .form-group select, .form-group textarea {
                    width: 100%; padding: 0.8rem 1rem; background: rgba(0,0,0,0.2);
                    border: 1px solid var(--border-color); color: var(--text-primary); outline: none; transition: border 0.3s;
                }
                .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                    border-color: var(--accent-gold);
                }
            `}</style>
        </div>
    );
};
export default AdminProducts;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (!storedToken) {
            navigate('/admin/login');
        } else {
            fetchProducts();
        }
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching admin products', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', marginBottom: '2rem' }}>Master Control Panel</h1>

            <div className="dashboard-grid">
                <div className="admin-card">
                    <h3>Inventory Status</h3>
                    <p className="big-number">{products.length || 0}</p>
                    <p>Total curated pieces in catalog</p>
                </div>
                <div className="admin-card">
                    <h3>Active Reservations</h3>
                    <p className="big-number">0</p>
                    <p>Pending buyer commitments</p>
                </div>
                <div className="admin-card">
                    <h3>Total Value</h3>
                    <p className="big-number">₹{(products.reduce((acc, curr) => acc + Number(curr.price), 0) || 0).toLocaleString('en-IN')}</p>
                    <p>Estimated gallery worth</p>
                </div>
            </div>

            <div className="admin-table-container">
                <h3 style={{ marginBottom: '1.5rem' }}>Active Inventory</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Piece</th>
                            <th>Category</th>
                            <th>Origin Era</th>
                            <th>Valuation</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => (
                            <tr key={product.id}>
                                <td><strong>{product.title}</strong></td>
                                <td>{product.category}</td>
                                <td>{product.era}</td>
                                <td style={{ color: 'var(--accent-gold)' }}>₹{Number(product.price).toLocaleString('en-IN')}</td>
                                <td><span className={`status-badge ${product.status}`}>{product.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 4rem;
                }
                .admin-card {
                    padding: 2rem;
                    background: rgba(22, 21, 20, 0.5);
                    border: 1px solid var(--border-color);
                    text-align: center;
                }
                .admin-card h3 {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 1rem;
                }
                .big-number {
                    font-size: 3rem;
                    font-family: var(--font-serif);
                    color: var(--accent-gold);
                    margin-bottom: 0.5rem;
                }
                .admin-table-container {
                    background: rgba(22, 21, 20, 0.3);
                    border: 1px solid var(--border-color);
                    padding: 2rem;
                    overflow-x: auto;
                }
                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }
                .admin-table th {
                    padding: 1rem;
                    border-bottom: 2px solid var(--border-color);
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.85rem;
                }
                .admin-table td {
                    padding: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    font-size: 0.95rem;
                }
                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .status-badge.available { background: rgba(0, 255, 100, 0.1); color: #00ff7f; border: 1px solid #00ff7f; }
                .status-badge.reserved { background: rgba(255, 165, 0, 0.1); color: orange; border: 1px solid orange; }
                .status-badge.sold { background: rgba(255, 0, 0, 0.1); color: red; border: 1px solid red; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;

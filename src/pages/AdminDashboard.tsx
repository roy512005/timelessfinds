import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (storedToken) {
            setLoggedIn(true);
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching admin products', error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                setLoggedIn(true);
                fetchProducts();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Server connection error. Ensure backend is running.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setLoggedIn(false);
    };

    if (!loggedIn) {
        return (
            <div className="container section text-center" style={{ paddingTop: '150px', minHeight: '80vh' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="admin-login-box"
                >
                    <h2>Secure Admin Access</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Authentication required.</p>

                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                    <form onSubmit={handleLogin} className="admin-form">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Enter Vault</button>
                    </form>
                </motion.div>

                <style>{`
                    .admin-login-box {
                        max-width: 400px;
                        margin: 0 auto;
                        padding: 3rem;
                        background: rgba(22, 21, 20, 0.8);
                        border: 1px solid var(--border-color);
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    }
                    .admin-form input {
                        width: 100%;
                        padding: 1rem;
                        margin-bottom: 1rem;
                        background: var(--bg-primary);
                        border: 1px solid var(--border-color);
                        color: var(--text-primary);
                        font-family: var(--font-sans);
                        outline: none;
                    }
                    .admin-form input:focus {
                        border-color: var(--accent-gold);
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="container section admin-dashboard" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>Master Control Panel</h1>
                <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Secure Logout</button>
            </div>

            <div className="dashboard-grid">
                <div className="admin-card">
                    <h3>Inventory Status</h3>
                    <p className="big-number">{products.length}</p>
                    <p>Total curated pieces in catalog</p>
                </div>
                <div className="admin-card">
                    <h3>Active Reservations</h3>
                    <p className="big-number">0</p>
                    <p>Pending buyer commitments</p>
                </div>
                <div className="admin-card">
                    <h3>Total Value</h3>
                    <p className="big-number">${products.reduce((acc, curr) => acc + Number(curr.price), 0).toLocaleString()}</p>
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
                        {products.map(product => (
                            <tr key={product.id}>
                                <td><strong>{product.title}</strong></td>
                                <td>{product.category}</td>
                                <td>{product.era}</td>
                                <td style={{ color: 'var(--accent-gold)' }}>${Number(product.price).toLocaleString()}</td>
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

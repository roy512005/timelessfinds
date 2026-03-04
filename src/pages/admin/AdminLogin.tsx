import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                navigate('/admin');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Server connection error. Ensure backend is running.');
        }
    };

    return (
        <div className="container section text-center" style={{ paddingTop: '150px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
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
};

export default AdminLogin;

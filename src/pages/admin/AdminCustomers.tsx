import { useState, useEffect } from 'react';
import { Shield, Ban } from 'lucide-react';

const AdminCustomers = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>Client Registry</h2>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Signup Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><strong>{user.name}</strong></td>
                                <td>{user.email}</td>
                                <td><span className={`status-badge ${user.role}`}>{user.role}</span></td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button title="Make Admin" style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer' }}><Shield size={16} /></button>
                                        <button title="Suspend User" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', opacity: 0.7 }}><Ban size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                .status-badge.admin { background: rgba(255, 215, 0, 0.1); color: var(--accent-gold); border: 1px solid var(--accent-gold); }
                .status-badge.user { background: rgba(255, 255, 255, 0.1); color: var(--text-secondary); border: 1px solid var(--border-color); }
            `}</style>
        </div>
    );
};
export default AdminCustomers;

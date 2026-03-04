import { useState, useEffect } from 'react';
import { Package, Truck } from 'lucide-react';

const AdminOrders = () => {
    const [orders] = useState<any[]>([]);

    useEffect(() => {
        // Will fetch /api/admin/orders once the Order model route is live
        // fetchOrders();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>Order Dispatch Operations</h2>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Buyer</th>
                            <th>Final Total</th>
                            <th>Status (Dispatch)</th>
                            <th>Date Processed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map((order: any) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td><strong>{order.buyerName}</strong></td>
                                <td style={{ color: 'var(--accent-gold)' }}>₹{order.total.toLocaleString('en-IN')}</td>
                                <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button title="Mark Shipped" style={{ background: 'none', border: 'none', color: '#00ff7f', cursor: 'pointer' }}><Truck size={16} /></button>
                                        <button title="Package Details" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Package size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No orders pending dispatch at this time.</td>
                            </tr>
                        )}
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
            `}</style>
        </div>
    );
};
export default AdminOrders;

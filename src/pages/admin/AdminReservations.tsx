import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const AdminReservations = () => {
    const [reservations, setReservations] = useState<any[]>([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const res = await fetch('/api/admin/reservations', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (res.ok) {
                const data = await res.json();
                setReservations(data);
            }
        } catch (error) {
            console.error('Error fetching reservations', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>Reservation Control</h2>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Art Piece</th>
                            <th>Client Email</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Engage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length > 0 ? reservations.map((rsvp: any) => (
                            <tr key={rsvp.id}>
                                <td>{rsvp.id}</td>
                                <td>{rsvp.Product?.title || 'Unknown Product'}</td>
                                <td>{rsvp.User?.email || 'Unknown User'}</td>
                                <td><span className={`status-badge ${rsvp.status}`}>{rsvp.status}</span></td>
                                <td>{new Date(rsvp.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            title="Confirm"
                                            onClick={async () => {
                                                await fetch(`/api/admin/reservations/${rsvp.id}/status`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
                                                    body: JSON.stringify({ status: 'confirmed' })
                                                });
                                                fetchReservations();
                                            }}
                                            style={{ background: 'none', border: 'none', color: '#00ff7f', cursor: 'pointer' }}><Check size={18} /></button>

                                        <button
                                            title="Cancel"
                                            onClick={async () => {
                                                await fetch(`/api/admin/reservations/${rsvp.id}/status`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
                                                    body: JSON.stringify({ status: 'cancelled' })
                                                });
                                                fetchReservations();
                                            }}
                                            style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><X size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No active reservations found in the system.</td>
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
                .status-badge.pending { background: rgba(255, 165, 0, 0.1); color: orange; border: 1px solid orange; }
                .status-badge.confirmed { background: rgba(0, 255, 100, 0.1); color: #00ff7f; border: 1px solid #00ff7f; }
                .status-badge.cancelled { background: rgba(255, 0, 0, 0.1); color: red; border: 1px solid red; }
            `}</style>
        </div>
    );
};
export default AdminReservations;

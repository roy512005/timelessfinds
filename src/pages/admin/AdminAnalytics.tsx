import { useState, useEffect } from 'react';
import { Target, TrendingUp, ShoppingBag, Eye } from 'lucide-react';

const AdminAnalytics = () => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/admin/analytics', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching analytics', error);
        }
    };

    if (!stats) return <div style={{ color: 'var(--text-secondary)' }}>Loading telemetry...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>Business Intelligence</h2>
            </div>

            <div className="analytics-grid">
                <div className="analytics-card">
                    <div className="icon-wrapper"><ShoppingBag size={24} /></div>
                    <h3>Total Inventory</h3>
                    <p className="metric">{stats.inventory.total}</p>
                    <p className="subtext">Active pieces tracked</p>
                </div>

                <div className="analytics-card">
                    <div className="icon-wrapper"><Target size={24} /></div>
                    <h3>Reserved Pieces</h3>
                    <p className="metric" style={{ color: 'orange' }}>{stats.inventory.reserved}</p>
                    <p className="subtext">Awaiting final payment</p>
                </div>

                <div className="analytics-card">
                    <div className="icon-wrapper"><TrendingUp size={24} /></div>
                    <h3>Sold Artifacts</h3>
                    <p className="metric" style={{ color: 'var(--accent-gold)' }}>{stats.inventory.sold}</p>
                    <p className="subtext">Successfully transferred</p>
                </div>

                <div className="analytics-card">
                    <div className="icon-wrapper"><Eye size={24} /></div>
                    <h3>Platform Activity</h3>
                    <p className="metric" style={{ color: '#00ff7f' }}>{stats.trafficOverview?.dailyViewAvg || 0}</p>
                    <p className="subtext">Avg Daily Views</p>
                </div>
            </div>

            <style>{`
                .analytics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                }
                .analytics-card {
                    background: rgba(22, 21, 20, 0.4);
                    border: 1px solid var(--border-color);
                    padding: 2rem;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                }
                .icon-wrapper {
                    background: rgba(255, 215, 0, 0.1);
                    color: var(--accent-gold);
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                }
                .analytics-card h3 {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 0.5rem;
                }
                .metric {
                    font-family: var(--font-serif);
                    font-size: 3rem;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }
                .subtext {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                }
            `}</style>
        </div>
    );
};
export default AdminAnalytics;

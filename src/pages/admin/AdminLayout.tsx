import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, CalendarClock, ShoppingBag, Users, FileText, Image as ImageIcon, BarChart, Settings, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Reservations', path: '/admin/reservations', icon: CalendarClock },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <nav style={{
        width: '250px',
        background: 'rgba(22, 21, 20, 0.95)',
        borderRight: '1px solid var(--border-color)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', marginBottom: '3rem', textAlign: 'center' }}>TF Control</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} /> {item.name}
              </Link>
            );
          })}
        </div>
        <button onClick={handleLogout} className="admin-nav-item logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </nav>

      <main style={{ flex: 1, padding: '2rem 4rem', marginLeft: '250px', minHeight: '100vh' }}>
        {children}
      </main>

      <style>{`
        .admin-nav-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem 1rem;
            color: var(--text-primary);
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.2s ease;
            font-size: 0.95rem;
        }
        .admin-nav-item:hover, .admin-nav-item.active {
            background: rgba(255, 255, 255, 0.05);
            color: var(--accent-gold);
        }
        .logout-btn {
            marginTop: auto; 
            background: transparent; 
            border: none; 
            color: var(--text-secondary); 
            width: 100%; 
            cursor: pointer;
            margin-top: auto;
        }
        .logout-btn:hover {
            color: red;
            background: rgba(255,0,0,0.05);
        }
      `}</style>
    </div>
  );
};
export default AdminLayout;

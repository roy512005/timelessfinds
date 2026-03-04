import { Product, User, Reservation, Order } from '../models/index.js';

export const getDashboardAnalytics = async (req, res) => {
    try {
        const productStats = {
            total: await Product.count(),
            available: await Product.count({ where: { status: 'available' } }),
            reserved: await Product.count({ where: { status: 'reserved' } }),
            sold: await Product.count({ where: { status: 'sold' } })
        };

        const reservationStats = {
             total: await Reservation.count(),
             pending: await Reservation.count({ where: { status: 'pending' } }),
             confirmed: await Reservation.count({ where: { status: 'confirmed' } })
        };

        const topCategories = await Product.findAll({
             attributes: ['category'],
             group: ['category'],
        });

        res.json({
            inventory: productStats,
            reservations: reservationStats,
            categories: topCategories,
            trafficOverview: { dailyViewAvg: 254 }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

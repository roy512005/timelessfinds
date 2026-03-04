import { Product, User, Reservation, Order } from '../models/index.js';

export const getDashboardStats = async (req, res) => {
    try {
        const productCount = await Product.count();
        const reservationCount = await Reservation.count({ where: { status: 'pending' } });

        // Sum prices
        const products = await Product.findAll();
        const totalValue = products.reduce((acc, curr) => acc + Number(curr.price), 0);

        res.json({
            productCount,
            reservationCount,
            totalValue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.images && Array.isArray(payload.images)) {
            payload.images = JSON.stringify(payload.images);
        }
        const product = await Product.create(payload);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            const payload = { ...req.body };
            if (payload.images && Array.isArray(payload.images)) {
                payload.images = JSON.stringify(payload.images);
            }
            await product.update(payload);
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'role', 'createdAt']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({ role: req.body.role });
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [
                { model: User, attributes: ['name', 'email'] },
                { model: Product, attributes: ['title', 'price'] }
            ]
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateReservationStatus = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            await reservation.update({ status: req.body.status });

            // Optionally, if status is confirmed, update product to 'sold' or keep reserved.
            res.json(reservation);
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

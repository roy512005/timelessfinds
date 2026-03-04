import { Reservation, Product, User } from '../models/index.js';

export const createReservation = async (req, res) => {
    try {
        const { productId, email, name } = req.body;

        // 1. Check if user exists, if not create a temporary profile for tracking
        let user = await User.findOne({ where: { email } });
        if (!user) {
            user = await User.create({
                name,
                email,
                password: 'temp_password_123', // Dummy password for guests
                role: 'user'
            });
        }

        // 2. See if the product exists and is available
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.status === 'sold') {
            return res.status(400).json({ message: 'Item already sold' });
        }

        // 3. Create reservation logic
        const reservation = await Reservation.create({
            UserId: user.id,
            ProductId: product.id,
            status: 'pending' // pending by default
        });

        // Optional: you can automatically change the product status to 'reserved' here
        await product.update({ status: 'reserved' });

        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error during reservation' });
    }
};

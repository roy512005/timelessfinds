import { Product, User, Reservation, Order } from '../models/index.js';

export const getDashboardStats = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const reservationCount = await Reservation.countDocuments({ status: 'pending' });

        // Sum prices
        const products = await Product.find();
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
        // Mongoose handles arrays fine, no need for JSON.stringify workaround
        const product = await Product.create(payload);

        const productObj = product.toObject();
        productObj.id = productObj._id.toString();

        res.status(201).json(productObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const payload = { ...req.body };
            Object.assign(product, payload);
            await product.save();

            const productObj = product.toObject();
            productObj.id = productObj._id.toString();

            res.json(productObj);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
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
        const users = await User.find().select('name email phone role createdAt');
        const formattedUsers = users.map(u => {
            const obj = u.toObject();
            obj.id = obj._id.toString();
            return obj;
        });
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.role = req.body.role;
            await user.save();
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
        const reservations = await Reservation.find()
            .populate('UserId', 'name email')
            .populate('ProductId', 'title price');

        const formatted = reservations.map(r => {
            const obj = r.toObject();
            obj.id = obj._id.toString();
            // Re-map populate to match previous sequelize structure if frontend expects it
            obj.User = obj.UserId ? { name: obj.UserId.name, email: obj.UserId.email } : null;
            obj.Product = obj.ProductId ? { title: obj.ProductId.title, price: obj.ProductId.price } : null;
            return obj;
        });

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateReservationStatus = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (reservation) {
            reservation.status = req.body.status;
            await reservation.save();
            res.json(reservation);
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

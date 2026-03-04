import sequelize, { connectDB } from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import Reservation from './Reservation.js';
import Order from './Order.js';

// Define Associations
Reservation.belongsTo(User, { foreignKey: 'userId' });
Reservation.belongsTo(Product, { foreignKey: 'productId' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

export { sequelize, connectDB, User, Product, Reservation, Order };

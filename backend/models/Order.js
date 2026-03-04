import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    payment_status: { type: DataTypes.ENUM('pending', 'paid', 'failed'), defaultValue: 'pending' },
    shipping_status: { type: DataTypes.ENUM('pending', 'shipped', 'delivered'), defaultValue: 'pending' }
});

export default Order;

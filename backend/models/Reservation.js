import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Reservation = sequelize.define('Reservation', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'), defaultValue: 'pending' },
    expires_at: { type: DataTypes.DATE, allowNull: false }
});

export default Reservation;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    short_description: { type: DataTypes.TEXT, allowNull: false },
    story_description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    era: { type: DataTypes.STRING, allowNull: false },
    condition: { type: DataTypes.STRING, allowNull: false },
    authenticity_note: { type: DataTypes.STRING },
    images: { type: DataTypes.JSON, defaultValue: [] },
    status: { type: DataTypes.ENUM('available', 'reserved', 'sold'), defaultValue: 'available' }
});

export default Product;

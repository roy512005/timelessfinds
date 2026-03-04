import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('postgres')) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
        }
    });
} else {
    // Fallback to local SQLite database if no Postgres URL is provided yet
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './backend/database.sqlite',
        logging: false
    });
}

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log(`Database Connected and Models Synced (${sequelize.getDialect()} Mode)...`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;

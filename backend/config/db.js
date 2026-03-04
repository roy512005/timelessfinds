import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

try {
    if (dbUrl && dbUrl.includes('postgres')) {
        sequelize = new Sequelize(dbUrl, {
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                ssl: { require: true, rejectUnauthorized: false }
            }
        });
    } else {
        // Fallback to local SQLite database if no Postgres URL is provided yet
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: process.env.NODE_ENV === 'production' ? '/tmp/database.sqlite' : './backend/database.sqlite',
            logging: false
        });
    }
} catch (err) {
    console.error("DB Initialization Error - Missing Native Modules/URL:", err);
    // Setup a dummy sequelize to prevent entire backend from fatal crashing
    sequelize = {
        authenticate: async () => { },
        sync: async () => { },
        getDialect: () => "mock",
        define: () => ({ belongsTo: () => { } })
    };
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

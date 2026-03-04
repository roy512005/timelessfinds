import sequelize from '../backend/config/db.js';

export default function handler(req, res) {
    res.status(200).json({
        success: true,
        message: "Serverless works directly",
        hasDbUrl: !!process.env.DATABASE_URL,
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        dbDialect: sequelize.getDialect(),
        dbInitError: sequelize._initError || null,
        dbUrlPrefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : "none"
    });
}

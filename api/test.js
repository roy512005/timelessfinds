import sequelize from '../backend/config/db.js';

export default function handler(req, res) {
    res.status(200).json({
        success: true,
        message: "Serverless works directly",
        hasDbUrl: !!process.env.DATABASE_URL,
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        dbDialect: sequelize.getDialect(),
        dbInitError: sequelize._initError || null
    });
}

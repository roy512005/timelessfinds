export default function handler(req, res) {
    res.status(200).json({
        success: true,
        message: "Serverless works directly across Mongoose setup",
        hasDbUrl: !!process.env.DATABASE_URL
    });
}

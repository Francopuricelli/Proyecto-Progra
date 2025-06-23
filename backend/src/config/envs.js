import dotenv from 'dotenv';
dotenv.config()

export default{
    port: process.env.PORT,
    db_config: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
}
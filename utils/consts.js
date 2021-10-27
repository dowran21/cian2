require('dotenv').config();

const DATABASE_NAME = process.env.DB_NAME;
const DATABASE_PORT = process.env.DB_PORT;
const DATABASE_HOST = process.env.DB_HOST;
const DATABASE_USER = process.env.DB_USER;
const DATABASE_PASSWORD = process.env.DB_PASSWORD

module.exports = {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD
}
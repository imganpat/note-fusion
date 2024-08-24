import dotenv from "dotenv"
import mysql from "mysql"
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT

})

db.connect((error) => {
    if (error) throw error;
    else console.log("Database connected sucesfully");
})

export default db; 
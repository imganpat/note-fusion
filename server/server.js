import dotenv from 'dotenv';
import cors from "cors"
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import notesRouter from "./routes/notes-routes.js"
import authRouter from './routes/auth-routes.js';

dotenv.config();

const app = express();


app.use(cors({
    origin: ["https://note-fusion-gc.vercel.app", "http://localhost:5173"],
    credentials: true
}))

app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(process.env.SERVER_PORT || 3001, () => {
    console.log('Server is running on port ', process.env.SERVER_PORT);
});
import dotenv from 'dotenv';
import cors from "cors"
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import notesRouter from "./routes/notes-routes.js"
import authRouter from './routes/auth-routes.js';

dotenv.config();

const app = express();
app.use(cookieParser());


app.use(cors({
    origin: "https://note-fusion-gc.vercel.app", // <-- allow requests from any origin
    credentials: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(process.env.SERVER_PORT || 3001, () => {
    console.log('Server is running on port ', process.env.SERVER_PORT);
});
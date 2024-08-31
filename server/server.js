import dotenv from 'dotenv';
import cors from "cors"
import express from 'express';
import bodyParser from 'body-parser';   
import notesRouter from "./routes/notes-routes.js"

dotenv.config();

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/notes", notesRouter);

app.listen(process.env.SERVER_PORT || 3001, () => {
    console.log('Server is running on port ', process.env.SERVER_PORT);
});
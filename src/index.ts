import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from 'mongoose'
import { error } from "console";

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080/");
});

const MONGO_URL = 'mongodb+srv://anudaransara1:NzAobuY9VGnmD8O0@cluster0.qej00x4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});



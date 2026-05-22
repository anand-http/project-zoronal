import express from 'express';
import companyRoutes from './routes/CompanyRoutes.js';
import reviewRoutes from './routes/ReviewRoutes.js';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

const app = express();

dotenv.config();
connectDb();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//expose images to frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json({message:"Hello API World"});
});


const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/companies`, companyRoutes);
app.use(`${API_VERSION}/reviews`, reviewRoutes);


const PORT = process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log(`Server is running on port ${5000}`);
})
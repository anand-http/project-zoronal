import dotenv from 'dotenv';
import express from 'express';
import companyRoutes from './routes/CompanyRoutes.js';
import reviewRoutes from './routes/ReviewRoutes.js';
import connectDb from './config/db.js';
import cors from 'cors';

const app = express();

dotenv.config();
connectDb();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json({message:"Hello API World"});
});


const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/companies`, companyRoutes);
app.use(`${API_VERSION}/reviews`, reviewRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
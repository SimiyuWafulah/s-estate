import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import  cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin : '*'
    }
));

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Database')
}).catch((error) => {
    console.log(error)
});

app.listen(3000, () => {
    console.log('Server Is Running!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}) 

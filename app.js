import express from 'express';
import {PORT} from './config/env.js'
import subscriptionRouter from "./routes/subscription.route.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import connectToDatabase from './database/mongodb.js';
import errorMiddeleware from './middelwares/error.middelwares.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middelwares/arcjet.middelwares.js';
import { workflowClient } from './config/upstash.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/users',userRouter);
app.use( '/api/v1/auth',authRouter);
app.use( '/api/v1/auth',workflowClient);

app.use(errorMiddeleware)

app.get('/', (req, res) =>{
    res.send("Welcome to subscription tracker API");
})

app.listen(PORT, async () =>{
    console.log(`server running in http://localhost:${PORT}`); 

    await connectToDatabase();
})

export default app;
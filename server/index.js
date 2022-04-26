import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';    

import userRoutes from "./routes/userRoutes.js";
import traderRoutes from "./routes/traderRoutes.js";


dotenv.config() 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes)
app.use('/trader',traderRoutes)

const PORT = process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log(`Server Running on port ${PORT}`)
})
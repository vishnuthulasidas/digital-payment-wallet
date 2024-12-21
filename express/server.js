const express=require("express")
const mongoose=require("mongoose")
const cors = require('cors');

const logger=require("./utils/logger")
const config = require('./config/env'); 
const connectDB=require("./config/db")


const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const transferRoutes = require('./routes/transferRoutes');

const app=express()
app.use(cors());
app.use(express.json());
app.use(logger);

connectDB()

app.use("/api/auth",authRoutes)
app.use("/api/wallet",walletRoutes)
app.use("/api/transaction",transactionRoutes)
app.use("/api/user",userRoutes)
app.use("/api/transfer",transferRoutes)



app.get("/test",(req,res)=>{
    res.send("your api is working fine!")
})

app.listen(config.PORT,()=>{
    console.log(`server is runnig on PORT ${config.PORT}`);
})
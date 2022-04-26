import mysql from 'mysql'
import express from 'express'
import dotenv from 'dotenv';    

dotenv.config() 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const router = express.Router();

router.post('/addTrader',(req,res)=>{
    console.log("Add Trader request"+ req.body.companyGST);

    db.query(
        "Insert into `traders`(`companyGST`,`name`,`email`,`phoneNo`,`gstNo`,`address`,`pinCode`) values(?,?,?,?,?,?,?)",
        [req.body.companyGST,req.body.name,req.body.email,req.body.phoneNo,req.body.gstNo,req.body.address,req.body.pinCode],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Trader Created");
            }
        }
    );

    
});

export default router;
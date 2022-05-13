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
        "Insert into `traders`(`companyGST`,`name`,`email`,`phoneNo`,`gstNo`,`addressStreet`,`addressCity`,`addressState`,`pinCode`) values(?,?,?,?,?,?,?,?,?)",
        [req.body.companyGST,req.body.name,req.body.email,req.body.phoneNo,req.body.gstNo,req.body.addressStreet,req.body.addressCity,req.body.addressState,req.body.pinCode],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Created");
            }
        }
    );

    
});

router.post('/deleteTrader',(req,res)=>{
    console.log("Remove Trader request"+ req.body.companyGST);

    db.query(
        // "delete from `traders`where `companyGST`=? and`gstNo`=?",
        "update `traders` set `enabled`=0 where id=?",
        [req.body.traderID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Done");
            }
        }
    );

    
});

router.post('/getTraders',(req,res)=>{
    console.log("Get Trader request"+ req.body.companyGST);

    db.query(
        "select * from `traders`where `companyGST`=? and enabled=1",
        [req.body.companyGST],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );

    
});

router.post('/addItem',(req,res)=>{
    console.log("Request to add item for a trader ",req.body.companyGST);
    
    db.query(
        "Insert into `traderItems`(`traderID`,`itemID`) values(?,?)",
        [req.body.traderID,req.body.itemID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Trader Item Added");
            }
        }
    );

})

router.post('/deleteItem',(req,res)=>{
    console.log("Request to delete item for a trader ",req.body.companyGST);
    
    db.query(
        "delete from `traderItems` where id=?",
        [req.body.itemID],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Item if existed was deleted");
            }
        }
    );

});

export default router;
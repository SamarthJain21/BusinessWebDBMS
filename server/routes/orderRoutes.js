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

// -1 Incomplete Information
// 0 Pending
// 1 Accepted Not Delivered
// 2 Delivered
// 3 Rejected


// 1 Buy
// 2 Sell

router.post('/getPendingOrders',(req,res)=>{
    console.log("Get Pending Orders request"+ req.body.companyGST);

    db.query(
        "select * from `orders`where `companyGST`=? and status=0  order by date",
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

router.post('/getOngoingOrders',(req,res)=>{
    console.log("Get Ongoing Orders request"+ req.body.companyGST);

    db.query(
        "select * from `orders`where `companyGST`=? and status=1 order by date",
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

router.post('/getPreviousOrders',(req,res)=>{
    console.log("Get Ongoing Orders request"+ req.body.companyGST);

    db.query(
        "select * from `orders`where `companyGST`=? and status=3 order by date",
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

router.post('/addOrder',(req,res)=>{
    console.log("Create Order request"+ req.body.companyGST, req.body.traderID);

    db.query(
        "insert into `orders` (companyGST,traderID,buy_sell,status,totalCostPrice,totalSellingPrice) values(?,?,?,?)",
        [req.body.companyGST,req.body.traderID,req.body.buy_sell,-1,0,0],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );
});

router.post('/addOrderItem',(req,res)=>{
    console.log("Create Order request"+ req.body.companyGST, req.body.orderID);

    db.query(
        "insert into `orderItems` (orderID,itemID,itemQty,costPricePerQty,sellPricePerQty) values(?,?,?,?,?)",
        [req.body.orderID,req.body.itemID,req.body.itemQty,req.body.costPrice,req.body.sellPrice],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{

                "update `orders` set totalSellingPrice=toalSellingPrice+? and totalCostPrice=totalCostPrice+? and status=0 where orderID=?",
        [req.body.sellPrice,req.body.costPrice,req.body.orderID],
        (err1,result1)=>{
            if(err1){
                res.send(err1);
                
            }else{
                res.send("done")
            }
        }
            }
        }
    );
});

export default router;
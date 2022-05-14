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


router.post('/getPendingOrders', (req, res) => {
    console.log("Get Pending Orders request" + req.body.companyGST);

    db.query(
        "select * from `orders`where `companyGST`=? and status=0  order by date",
        [req.body.companyGST],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});


router.post('/getOngoingOrders', (req, res) => {
    console.log("Get Incomplete Orders request" + req.body.companyGST);

    db.query(
        "select *,`orders`.`id` as orderID from `orders`,`traders` where `orders`.`companyGST`=? and `orders`.status not in(3,2) and `orders`.`traderID`=`traders`.`id` order by date",
        [req.body.companyGST],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});
router.post('/getPreviousOrders', (req, res) => {
    console.log("Get Ongoing Orders request" + req.body.companyGST);

    db.query(
        "select * from `orders`where `companyGST`=? and status=3 order by date",
        [req.body.companyGST],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.post('/getIncompleteOrders', (req, res) => {
    console.log("Get Incomplete Orders request" + req.body.companyGST);

    db.query(
        "select *,`orders`.`id` as orderID from `orders`,`traders` where `orders`.`companyGST`=? and `orders`.status=-1 and `orders`.`traderID`=`traders`.`id` order by date",
        [req.body.companyGST],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.post('/addOrder', (req, res) => {
    console.log("Create Order request" + req.body.companyGST, req.body.traderID);

    db.query(
        "insert into `orders` (companyGST,traderID,buy_sell,status,totalCostPrice,totalSellingPrice) values(?,?,?,?,?,?)",
        [req.body.companyGST, req.body.traderID, req.body.buy_sell, -1, 0, 0],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Created');
            }
        }
    );
});

router.post('/addOrderItem', (req, res) => {
    console.log("Add item in existing Order request" + req.body.companyGST, req.body.orderID);

    db.query(
        "insert into `orderItems` (orderID,itemID,itemQty,costPricePerQty,sellPricePerQty) values(?,?,?,?,?)",
        [req.body.orderID, req.body.itemID, req.body.itemQty, req.body.costPrice, req.body.sellPrice],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                db.query("update `orders` set `totalSellingPrice`=`totalSellingPrice`+? , `totalCostPrice`=`totalCostPrice`+? , `status`=0 where id=?",
                    [req.body.sellPrice, req.body.costPrice, req.body.orderID],
                    (err1, result1) => {
                        if (err1) {
                            res.send(err1);

                        } else {
                            db.query("update `items` set `itemQty`=`itemQty`-? where id=?",
                                [req.body.itemQty, req.body.itemID],
                                (err2, result1) => {
                                    if (err2) {
                                        res.send(err2);

                                    } else {
                                        console.log("added")
                                        res.send("Added")
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    );


});

router.post('/getOrderItems', (req, res) => {
    console.log("Get Incomplete Order items request" + req.body.companyGST, req.body.orderID);

    db.query(
        "select *,`orderItems`.`itemQty` as itemQtyNew from `orderItems`,`items` where `orderID`=? and `items`.`id`in (select itemID from `orderItems` where `orderItems`.orderID=?) and `items`.`id`=`orderItems`.`itemID` and `items`.`enabled`=1",
        [req.body.orderID, req.body.orderID],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.post('/getOtherOrderItems', (req, res) => {
    console.log("Get items request for adding in order" + req.body.companyGST, req.body.orderID);

    db.query(
        "select *,(`items`.`id`) as itemID from `items`,`orders` where `items`.`companyGST`=? and `orders`.`id`=? and `items`.`id` in(select `itemID` from `traderItems` where `traderID`=`orders`.`traderID`) and `items`.`enabled`=1 and `items`.`id` not in(select `itemID` from `orderItems` where orderID=?)",
        [req.body.companyGST, req.body.orderID, req.body.orderID],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

export default router;
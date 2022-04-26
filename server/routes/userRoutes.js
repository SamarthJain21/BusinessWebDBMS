//User login using GST no and password
import mysql from 'mysql'
import express from 'express'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';    

dotenv.config() 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const router = express.Router();

router.post('/register',async (req,res)=>{
    console.log("Register request"+ req.body.gstNo);
    let hashedPassword=await bcrypt.hash(req.body.password,10)

    db.query(
        "Insert into `companyUser`(`name`,`gstNo`,`password`) values(?,?,?)",
        [req.body.name,req.body.gstNo,hashedPassword],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("User Created");
            }
        }
    );

    
});

router.post('/login', async(req,res)=>{
    console.log("login request",req.body);
    var userPassword = "none";

    
    
    db.query(
        "Select password from companyUser where gstNo=?",
        [req.body.gstNo],
        (err, result) => {
          if (err) {
            res.send(err);
          } 
          else {
            if (result.length != 0) {
                console.log("11111")
                userPassword =result[0].password;
                console.log(userPassword);
                checkPassword(req.body.password, userPassword);


            } else {
              res.send("User not found");
            }
          }
         }
      );
    
    async function checkPassword (plainPassword,encryptedPassword){

        try{
            
            console.log(plainPassword)
            console.log(encryptedPassword)
            const validPassword = await bcrypt.compare(plainPassword,encryptedPassword);
            console.log(validPassword)
            if(validPassword){
                res.send("Login");
            }else{
                res.status(400).send("Invalid Password")
            }
        }
        catch{
    
        }
    }


});

router.get('/userEmail',(req,res)=>{
    console.log("Fetch Email request"+ req.body.gstNo);

    db.query(
        "Select email from `companyEmail` where `companyGST`=?",
        [req.body.gstNo],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                if(result.length!=0){

                    res.send(result)
                }else{
                    res.send("No Email Address Found")
                }
            }
        }
    )

})

router.post('/addEmail', (req,res)=>{
    console.log("Add Email request"+ req.body.gstNo);

    db.query(
        "Insert into `companyEmail`(`companyGST`,`email`) values(?,?)",
        [req.body.gstNo,req.body.email],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Email Added");
            }
        }
    );

    
});

router.post('/removeEmail', (req,res)=>{
    console.log("Remove Email request"+ req.body.gstNo);

    db.query(
        "delete from `companyEmail` where `companyGST`=? and email=?",
        [req.body.gstNo,req.body.email],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Email Removed if existed");
                
            }
        }
    );

    
});

router.get('/userPhone',(req,res)=>{
    console.log("Fetch Phone request"+ req.body.gstNo);

    db.query(
        "Select phoneNo from `companyPhone` where `companyGST`=?",
        [req.body.gstNo],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                if(result.length!=0){

                    res.send(result)
                }else{
                    res.send("No Phone Numbers Found")
                }
            }
        }
    )

})

router.post('/addPhone', (req,res)=>{
    console.log("Add Phone request"+ req.body.gstNo);

    db.query(
        "Insert into `companyPhone`(`companyGST`,`phoneNo`) values(?,?)",
        [req.body.gstNo,req.body.phoneNo],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Phone Number Added");
            }
        }
    );

    
});

router.post('/removePhone', (req,res)=>{
    console.log("Remove Phone request"+ req.body.gstNo);

    db.query(
        "delete from `companyPhone` where `companyGST`=? and phoneNo=?",
        [req.body.gstNo,req.body.phoneNo],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Phone No Removed if existed");
            }
        }
    );

    
});

router.post('/addTrader')
export default router;
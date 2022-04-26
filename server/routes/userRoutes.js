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
        "Insert into `companyUser`(`password`,`gstNo`) values(?,?)",
        [hashedPassword,req.body.gstNo],
        (err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send("User Created");
            }
        }
    );

    
});

router.get('/login', async(req,res)=>{
    console.log("login request",req.body.gstNo);
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


})

router.post('/data',(req,res)=>{

})
export default router;
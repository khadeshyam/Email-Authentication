const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const {sendOTP,generateOTP} = require("./otp");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("public"))
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("signup");
});
app.get("/verify-otp",(req,res)=>{
    res.render("otp_verify");
})


app.post("/signup",async (req,res)=>{
    const {email} = req.body;
    const otp = generateOTP();
    await sendOTP(email,otp);

    let token = jwt.sign({otp},process.env.JWT_SECRET_KEY);
    res.cookie("jwtKey",token,{maxAge: 1000*60*5,httpOnly:true});
    
    res.redirect("/verify-otp");
});

app.post("/verify-otp",(req,res)=>{
   const {jwtKey} =req.cookies;

   if(jwtKey){
    const jwtBody = jwt.verify(jwtKey, process.env.JWT_SECRET_KEY);
    const userOTP = (req.body.otp);
    const jwtOTP = String (jwtBody.otp);
 
    if(userOTP === jwtOTP){
     res.render("success");
    }else{
     res.render("failure");
    }
   }else{
    res.send("Session expired")
   }
});



app.listen(3000,()=>{
    console.log("server listening on port 3000");
})

const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");
const session = require('express-session');
const {sendOTP,generateOTP} = require("./otp");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
  


app.get("/",(req,res)=>{
    res.render("signup");
});
app.get("/verify-otp",(req,res)=>{
    res.render("otp_verify");
})

let sessionOTP="";

app.post("/signup",async (req,res)=>{
    const {email} = req.body;
    sessionOTP= generateOTP();
    await sendOTP(email,sessionOTP);
    res.redirect("/verify-otp");
});

app.post("/verify-otp",(req,res)=>{
    const {otp} = req.body;
    //convert string to number
    userOTP = Number(otp);
    console.log(userOTP===sessionOTP);

    if(sessionOTP === userOTP){
         res.send("<h1>Email Verified</h1>");
    }else{
        res.send("<h1>Error Verifying Email</h1>");
    }
});



app.listen(3000,()=>{
    console.log("server listening on port 3000");
})

const dotenv = require('dotenv');
dotenv.config();
const {sendOTP} = require("./otp");

sendOTP("xyz@gmail.com",734823);
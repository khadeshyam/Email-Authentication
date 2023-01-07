const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

async function sendOTP(email,otp) {

    try{
    const result = await transporter.sendMail({
        from: 'no-reply@musicali',
        to:email,
        subject:"OTP for Email Verification",
        html: `<h1 style="text-align:center">Your OTP is ${otp}</h1>
                <p style="text-align:center">It is only valid for 10 minutes</p>`,
    });
     console.log(result);
   }
   catch(err){
    console.log(err);
  }

   
}
module.exports={sendOTP}

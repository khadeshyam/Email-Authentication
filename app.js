const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

const emails = ['abc@outlook.com','xyz@gmail.com',"pqr@gmail.com","dimdix@gmail.com"];
// or get emails from database

async function send() {
    const result = await transporter.sendMail({
        from: 'no-reply@musicali',
        to:emails,
        subject: 'musicali',
        html: `<h1 style="color:blue;text-align:center">Hello World</h1>
        `
    });

    console.log(result);
}
send();

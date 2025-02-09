const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());  // Allow frontend requests

app.get('/',async(req,res)=>{
res.send(
    'server is up and running'
)
})

app.post("/send-email", async (req, res) => {
    // const { to, subject, text } = req.body;

    let to = process.env.email_receiver
    let subject = "💌 Welcome to My Heart!";
    let text = "Hey love,\n\nYou just logged into my heart! ❤️\n\nAlways yours,\nYour Name";

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email_sender, 
            pass: process.env.email_pass
        }
    });

    

    let mailOptions = { from: process.env.email_sender, to, subject, text };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Love email sent successfully! ❤️");
    } catch (error) {
        res.status(500).send("Error sending email 😢");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;

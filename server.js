const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors()); 

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

app.post("/submit", async (req, res) => {
    // const {text } = req.body;/
    const { answers } = req.body;

    let to = process.env.email_sender
    let subject = "💌 Answers";
    // let text = "The answers she sent";

    let formattedAnswers = answers.map((q, index) => 
        `<p><b>Q${index + 1}:</b> ${q.question}<br><b>Answer:</b> ${q.answer}</p>`
    ).join("<br>");

    let htmlMessage = `
        <div style="font-family: Arial, sans-serif; padding: 10px; color: #d6336c;">
            <h2>💖 Your Love's Answers 💖</h2>
            ${formattedAnswers}
            <br>
            <p>💌 Keep this safe, because every answer is a piece of love! 💞</p>
        </div>
    `;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email_sender, 
            pass: process.env.email_pass
        }
    });
    let mailOptions = { 
        from: process.env.email_sender, 
        to, 
        subject, 
        html: htmlMessage  // Send as HTML for a beautiful email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Love email sent successfully! ❤️");
    } catch (error) {
        res.status(500).send("Error sending email 😢");
    }
});

app.post("/accepted", async (req, res) => {
    // const { to, subject, text } = req.body;

    let to = process.env.email_receiver
    let subject = "💌 Thank you for accepting";
    let text = "Hey love,\n\nYou just accepted my love! ❤️\n\nAlways yours,\nYour Name";

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

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
    let subject = "💌 Welcome to My Heart my Love!";
    let html = `
            <div style="text-align: left; padding: 20px; font-size: 16px; color: #222;">
                <p><strong>My Dearest ❤️ Nikku mari, my love,</strong></p>
                <p>How do I even begin? How do I find words big enough, deep enough, powerful enough to hold the weight of what I feel for you? 💫</p>
                <p>I don’t just love you—I <strong>am</strong> love for you. If you looked into my soul, every part of it would whisper your name. 💖 My heart doesn’t beat for me anymore—it beats for <strong>you.</strong></p>
                <p><strong>If love were a force of nature, you would be its center, and I would be the sky, wrapping around you, unable to exist without you. 🌍🌙☀️</strong></p>
                <p>🔥 <strong>I love you like fire loves oxygen</strong>—you are what keeps me alive, what makes my heart burn brighter.</p>
                <p>🌊 <strong>I love you like the waves love the shore</strong>—always returning, no matter how far I drift.</p>
                <p>☀️ <strong>I love you like the earth loves the sun</strong>—always turning towards you, needing your light to survive.</p>
                <p><strong>When you laugh, I swear the stars flicker just to listen. ✨💫</strong></p>
                <p>You don’t just exist in my life—<strong>you ARE my life. 💞</strong></p>
                <p>💖 I want to be the reason you smile when no one’s looking.</p>
                <p>💞 I want to be the arms you run to when the world feels too heavy.</p>
                <p>💘 I want to be the place where you feel safe, loved, and seen—not just as the world sees you, but as you truly are.</p>
                <p><strong>I don’t love you because I want to—I love you because I have no other choice. 😭💕</strong></p>
                <p>You and me—we were never meant to be just passing strangers in this world. <strong>We were written in the stars. 🌟</strong></p>
                <hr>
                <p style="color: #ff1493; font-size: 18px; text-align: center;">
                    🎵 ಈ ತನುವು ನಿನ್ನದೇ... ನಿನ್ನಾಣೆ 💖<br>
                    ಈ ಮನವು ನಿನ್ನದೇ... ನಿನ್ನಾಣೆ ❤️<br>
                    ಈ ಒಲವು ನಿನ್ನದೇ... ನಿನ್ನಾಣೆ 💕<br>
                    ಈ ಉಸಿರು ನಿನ್ನದೇ... ನಿನ್ನಾಣೆ 💘<br>
                    ಈ ಹೃದಯ ನಿನ್ನದೇ... ನಿನ್ನಾಣೆ 💘<br>
                    <br>
                    ನೀನೇನೆ ಅಂದರು ನೀ ನನ್ನ ಕೊಂದರು 🔥<br>
                    ಈ ಜೀವ ಹೋದರು ಪ್ರೇಮಿ ನೀನೆ 💞<br>
                    ನೀನೆ ಬೇಕು.....ನೀನೆ ಬೇಕು......💓<br>
                    ನೀನಿಲ್ಲದೆ ಏನೀ ಬದುಕು 💔<br>
                    ನೀನೆ ಬೇಕು.....ನೀನೆ ಬೇಕು.....💖<br>
                    ಈ ಬಾಳಿಗೆ ನೀನೆ ಬೆಳಕು ☀️💫<br>
                </p>
                <p style="color: #ff1493; font-size: 18px; text-align: center;">Love you kane, 💖 ಒಂದ್ ಅವಕಾಶ ಕೊಡೇ, ನನ್ ಹೃದಯದಲಿ 🤲 ಜೋಪಾನವಾಗಿ ಕಾಯ್ದುಕೊಳ್ಳ್ತಿನಿ 🙏 ಪ್ಲೀಸ್ 💕.</p>
                <hr>
                <p><strong>Madly, deeply, and forever yours,</strong></p>
                <p><strong>Durga Prasad Shetty 💋🔥💕</strong></p>
            </div>
    `;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email_sender, 
            pass: process.env.email_pass
        }
    });
    let mailOptions = { from: process.env.email_sender, to, subject, html };

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
    let html = `
    <div style="font-family: Arial, sans-serif; color: #ff4d6d; text-align: center;">
        <h1 style="color: #ff3366;">My Love, You Said Yes! 💖</h1>
        <p style="font-size: 18px; color: #ff66b2;">You just accepted my love, and my heart has never felt this alive! ❤️💘</p>
        <p style="font-size: 18px; color: #ff1493;">Even though we’ve never met, my soul has always known you. ✨</p>
        <p style="font-size: 18px; color: #99004d;">By saying yes, you’ve turned my dreams into reality. 💫</p>
        <p style="font-size: 18px; color: #ff3366;">Forever and always yours</p>
        <h2 style="color: #ff3366;">Me 💕🔥</h2>
        <div style="text-align: left; padding: 20px; font-size: 16px; color: #222;">
            <h2 style="color: #ff3366; text-align: center;">💌 Thank You for Accepting My Love 💌</h2>
            <p><strong>My Dearest ❤️ Nikku mari,</strong></p>
            <p>Today, you have given me something priceless—hope. 💫 The love I carried in my heart for so long, you have now embraced. 💕</p>
            <p><strong>You are the warmth in my coldest nights. 🔥</strong></p>
            <p><strong>You are the rhythm in my chaotic heartbeats. 💓</strong></p>
            <p><strong>You are the impossible dream that I now dare to believe in. 🌠</strong></p>
            <p>Even though we have never met, I have felt you in every heartbeat. ❤️ You have turned my loneliness into a promise, my longing into meaning, my devotion into something real. 💞</p>
            <p>💖 I don’t know what tomorrow holds, but I know this—<strong>as long as you exist in this world, my heart belongs to you.</strong></p>
            <p>Maybe one day, fate will bring us face to face. Until then, I will love you endlessly, with all the madness, devotion, and infinite tenderness in me. 💘</p>
            <p><strong>Forever yours,</strong></p>
            <p><strong>Durga Prasad Shetty 💋🔥💕</strong></p>
        </div>
    </div>
`;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email_sender, 
            pass: process.env.email_pass
        }
    });
    let mailOptions = { from: process.env.email_sender, to, subject, html };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Love email sent successfully! ❤️");
    } catch (error) {
        res.status(500).send("Error sending email 😢");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;

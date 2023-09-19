const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    },
});

async function main() {
    const info = await transporter.sendMail({
        from: ['DocuFind Central 🏢', '<docufind.central@gmail.com>'],
        to: ['sagarmainali78@gmail.com', 'voodoochild780@gmail.com'],
        subject: "Good News!",
        html: `<b>Document match has been found!</b>`
    });

    console.log("Message sent successfully: %s", info.messageId);
}

module.exports = main;
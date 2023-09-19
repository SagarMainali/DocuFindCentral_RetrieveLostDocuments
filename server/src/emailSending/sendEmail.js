const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    },
});

async function sendEmail(receivers) {
    const email = {
        from: '"DocuFind Central 🏢" <docufind.central@gmail.com>',
        to: receivers,
        subject: "Good News!",
        html: `<b>Document match has been found!</b>`
    }

    try {
        const info = await transporter.sendMail(email);
        console.log("Message sent successfully: %s", info.messageId);
    } catch (error) {
        console.error(error);
    }
}

module.exports = sendEmail;
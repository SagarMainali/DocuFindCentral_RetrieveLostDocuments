const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    },
});

async function sendMailToUser(receivers) {
    const email = {
        from: '"DocuFind Central 🏢" <docufind.central@gmail.com>',
        to: receivers,
        subject: "Good News!",
        html: `<b>Document match has been found!</b>`
    }

    try {
        const response = await transporter.sendMail(email);
        return response;
    } catch (error) {
        return error;
    }
}

module.exports = sendMailToUser;
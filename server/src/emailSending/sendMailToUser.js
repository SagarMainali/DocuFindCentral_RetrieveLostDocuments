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
        const result = await transporter.sendMail(email);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendMailToUser;
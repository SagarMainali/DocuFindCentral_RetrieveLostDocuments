const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const replacementsObjectCreation = require('./replacementsObjectCreation');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    }
});

async function sendEmailToUser(bothPartiesData) {
    // reading html file and coverting it into string
    const absolutePath = path.join(__dirname, 'emailTemplate.html'); // only absolute path is working
    const htmlSource = fs.readFileSync(absolutePath, 'utf-8');
    // compiling the source file 
    const template = handlebars.compile(htmlSource);

    // object that replaces the dynamic content in the html email template
    let replacements = replacementsObjectCreation(bothPartiesData);
    // template ready to be sent
    const emailTemplate = template(replacements);

    const emailData = {
        from: '"DocuFind Central 🏢" <docufind.central@gmail.com>',
        to: [replacements.owner_email, replacements.finder_email],
        subject: "Good News! Your ticket match has been found.",
        text: 'Ticket match found!!!', // only gets displayed where html is not supported
        html: emailTemplate
    }

    try {
        const result = await transporter.sendMail(emailData);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmailToUser;
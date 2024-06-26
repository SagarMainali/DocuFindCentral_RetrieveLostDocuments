const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const replacementsObjectCreation = require('./replacementsObjectCreation');
require('dotenv').config();

// configure email and password credentials @.env file to send emails
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: password,
    }
});

handlebars.registerHelper('isEqual', (a, b) => {
    return a === b;
})

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

    const getImageNameAndBufferData = (serializedImageFile, email) => {
        if (serializedImageFile !== undefined) {
            const deserializedImageFile = JSON.parse(serializedImageFile);

            const imageFileName = deserializedImageFile.originalname;
            const bufferData = Buffer.from(deserializedImageFile.buffer.data);
            const imageContentType = deserializedImageFile.mimeType;

            return {
                filename: imageFileName,
                content: bufferData,
                contentType: imageContentType,
                cid: email
            }
        }
        // returning empty object if the user has not uploaded any images
        else return {}
    }

    let attachments = [];
    function imageFileLookUp() {
        // check if any of the array contains an image
        const exist = bothPartiesData.some((party) => {
            return party.imageFile !== undefined && party.imageFile !== null
        })
        if (exist) {
            attachments = [
                getImageNameAndBufferData(bothPartiesData[0].imageFile, bothPartiesData[0].email),
                getImageNameAndBufferData(bothPartiesData[1].imageFile, bothPartiesData[1].email)
            ]
        }
        return attachments;
    }

    const emailData = {
        from: '"DocuFind Central 🏢" <docufind.central@gmail.com>',
        to: [replacements.owner_email, replacements.finder_email],
        subject: "Good News! Your ticket match has been found.",
        text: 'Ticket match found!!!', // only gets displayed where html is not supported
        html: emailTemplate,
        attachments: imageFileLookUp()
    }

    try {
        const result = await transporter.sendMail(emailData);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmailToUser;
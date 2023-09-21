const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    },
});

async function sendEmailToUser(bothPartiesData) {

    let replacements = {};
    // this array elements will be used to create property in 'replacements' object and also to access property in 'owner' or 'finder' objects
    const propNames = ['fullName', 'contact', 'email', 'documentType', 'documetNumber'];

    // creating replacments object...
    bothPartiesData.forEach(party => {
        const prefix = party.ticketType === 'Lost' ? 'owner_' : 'finder_';

        // assigning key: value to replacements object
        propNames.forEach((propName, index) => {
            const key = prefix + propName;
            // because one property of 'party' is like owner_fullname or finder_fullName, so can't access it by only 'propName' i.e fullName
            if (index === 0) {
                replacements[key] = party[key];
            }
            else {
                replacements[key] = party[propName]
            }
        })
    })

    // reading html file and coverting it into string
    const absolutePath = path.join(__dirname, 'emailTemplate.html'); // Create the absolute path
    const htmlSource = fs.readFileSync(absolutePath, 'utf-8');
    // const htmlSource = fs.readFileSync('emailTemplate.html', 'utf-8');
    // compiling the source file 
    const template = handlebars.compile(htmlSource);

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
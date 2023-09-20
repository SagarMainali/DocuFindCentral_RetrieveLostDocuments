const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    },
});

async function sendMailToUser(data) {
    const { owner, finder, receivers } = data;

    const html = `<div>
        <h2>A ticket has been found with the provided information! Please see the detailed information below and contact the respective party.</h2>
        <table>
            <h3>Documet Owner</h3>
            <tr>
                <th>Users</th>
                <th>Full Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Document Type</th>
                <th>Document Number</th>
            </tr>
            <tr>
                <td>Document Owner</td>
                <td>${owner.fullName}</td>
                <td>${owner.contact}</td>
                <td>${owner.email}</td>
                <td>${owner.documentType}</td>
                <td>${owner.documentNumber}</td>
            </tr>
            <tr>
                <td>Document Finder</td>
                <td>${finder.fullName}</td>
                <td>${finder.contact}</td>
                <td>${finder.email}</td>
                <td>${finder.documentType}</td>
                <td>${finder.documentNumber}</td>
            </tr>
        </table>
    </div>`

    const email = {
        from: '"DocuFind Central 🏢" <docufind.central@gmail.com>',
        to: receivers,
        subject: "Good News!",
        html
    }

    try {
        const result = await transporter.sendMail(email);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendMailToUser;
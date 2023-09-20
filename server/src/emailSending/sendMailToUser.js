const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'docufind.central@gmail.com',
        pass: 'qwtn pkkh dgyj xdqh',
    },
});

async function sendMailToUser(bothPartiesData) {

    const data = {
        owner: {},
        finder: {}
    }

    const { owner, finder } = data;

    bothPartiesData.forEach(party => {
        if (party.ticketType === 'Lost') {
            owner = {
                fullName: party.owner_fullName,
                contact: party.contact,
                email: party.email,
                documentType: party.documentType,
                documentNumber: party.documentNumber
            }
        }
        else if (party.ticketType === 'Found') {
            finder = {
                fullName: party.finder_fullName,
                contact: party.contact,
                email: party.email,
                documentType: party.documentType,
                documentNumber: party.documentNumber
            }
        }
    })

    const html = `<div>
        <h3>A ticket has been found with the provided information! Please see the detailed information below and contact the respective party.</h3>
        <table>
            <tr>
                <th>Party</th>
                <th>Full Name</th>
                <th>Contact No.</th>
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
        to: [owner.email, finder.email],
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
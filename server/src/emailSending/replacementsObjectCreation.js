function replacementsObjectCreation(matchedTickets) {

    let replacements = {};
    // this array elements will be used to create property in 'replacements' object and also to access property in 'owner' or 'finder' objects
    const propNames = ['fullName', 'documentType', 'documentNumber', 'contact', 'email', 'createdDate'];

    // creating replacments object...
    matchedTickets.forEach(ticket => {
        const prefix = ticket.ticketType === 'Lost' ? 'owner_' : 'finder_';

        // assigning key: value to replacements object
        propNames.forEach(propName => {
            const key = prefix + propName;

            // because one property of 'ticket' is like owner_fullname or finder_fullName, so can't access it by only 'propName' i.e fullName
            if (propName === 'fullName') {
                replacements[key] = ticket[key];
            }

            else {
                replacements[key] = ticket[propName];
            }
        })
    })

    return replacements;
}

module.exports = replacementsObjectCreation;
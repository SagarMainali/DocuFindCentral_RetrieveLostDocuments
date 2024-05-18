function replacementsObjectCreation(matchedTickets) {

    let replacements = {};
    // this array elements will be used to create property in 'replacements' object and also to access property in 'owner' or 'finder' objects
    const propNamesWithDifferentValue = ['fullName', 'contact', 'email', 'createdDate', 'documentType'];
    const propNamesWithSameValue = ['documentIssuedPlace', 'documentNumber', 'vehicleNumber', 'vehicleLotNumber', 'vehicleCategoryForLicense', 'vehicleClassificationForBluebook', 'documentIssuedDate', 'documentExpiryDate']

    // creating replacments object...
    matchedTickets.forEach((ticket, index) => {
        const prefix = ticket.ticketType === 'Lost' ? 'owner_' : 'finder_';

        // assigning key: value to replacements object
        propNamesWithDifferentValue.forEach(propName => {
            const key = prefix + propName;

            // because one property of 'ticket' is like owner_fullname or finder_fullName, so can't access it by only 'propName' i.e fullName
            if (propName === 'fullName') {
                replacements[key] = ticket[key];
            }

            else if (propName === 'contact' || propName === 'email' || propName === 'createdDate') {
                replacements[key] = ticket[propName];

                if (propName === 'email') {
                    replacements[`${prefix}cid`] = `cid:${ticket.email}`; // cid(content id) is specifically used to link the email attachments with img tag's src attribute  
                }
            }

            else if (propName === 'documentType' && index === 0) { // the object at 0th index is the one that is coming from the database so it contains all the additional properties as well
                replacements.documentType = ticket.documentType;
                propNamesWithSameValue.forEach(propName => {
                    replacements[propName] = ticket[propName]
                })
            }
        })
    })

    // return the filterd object without values of undefined/null type
    const newObj = Object.fromEntries(Object.entries(replacements).filter(([key, value]) => {
        return value !== undefined || value !== null
    }))

    console.log(newObj)
    return newObj
}

module.exports = replacementsObjectCreation;
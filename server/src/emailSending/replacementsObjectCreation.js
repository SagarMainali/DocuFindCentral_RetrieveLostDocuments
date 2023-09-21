function replacementsObjectCreation(bothPartiesData) {
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
                replacements[key] = party[propName];
            }
        })
    })

    return replacements;
}

module.exports = replacementsObjectCreation;
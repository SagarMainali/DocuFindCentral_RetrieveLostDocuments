const documentTypeOptions = [
     { label: 'Citizenship', value: 'Citizenship' },
     { label: 'Driving License', value: 'Driving License' },
     { label: 'Passport', value: 'Passport' },
     { label: 'Bluebook', value: 'Bluebook' },
     { label: 'PAN', value: 'PAN' },
     // { label: 'Voter Card', value: 'Voter Card' },
]

export default documentTypeOptions

// using a fixed translation function for the 'documentType_ns' namespace
// const t_docType = i18n.getFixedT(null, 'user_form_documentTypes_ns');
// const documentTypeOptions = [
//      { label: t_docType('Citizenship'), value: 'Citizenship' },
//      { label: t_docType('Driving License'), value: 'Driving License' },
//      { label: t_docType('Passport'), value: 'Passport' },
//      { label: t_docType('Bluebook'), value: 'Bluebook' },
//      { label: t_docType('PAN'), value: 'PAN' },
//      // { label: 'Voter Card', value: 'Voter Card' },
// ]

// const documentTypeOptions = [
//      { label: i18n.t('Citizenship', { ns: 'user_form_documentTypes_ns' }), value: 'Citizenship' },
//      { label: i18n.t('Driving License', { ns: 'user_form_documentTypes_ns' }), value: 'Driving License' },
//      { label: i18n.t('Passport', { ns: 'user_form_documentTypes_ns' }), value: 'Passport' },
//      { label: i18n.t('Bluebook', { ns: 'user_form_documentTypes_ns' }), value: 'Bluebook' },
//      { label: i18n.t('PAN', { ns: 'user_form_documentTypes_ns' }), value: 'PAN' },
//      // { label: 'Voter Card', value: 'Voter Card' },
// ]
// console.log(i18n.t('Citizenship', { ns: 'user_form_documentTypes_ns' }));

// export default documentTypeOptions

// Create a promise that resolves once i18n is initialized
// const documentTypeOptions = new Promise((resolve, reject) => {
//      i18n.on('initialized', () => {
//        const t_docType = i18n.getFixedT(null, 'user_form_documentTypes');
       
//        const options = [
//          { label: t_docType('Citizenship'), value: 'Citizenship' },
//          { label: t_docType('Driving License'), value: 'Driving License' },
//          { label: t_docType('Passport'), value: 'Passport' },
//          { label: t_docType('Bluebook'), value: 'Bluebook' },
//          { label: t_docType('PAN'), value: 'PAN' },
//        ];
   
//        resolve(options); // Resolve with the options once ready
//      });
   
//      // If you want to handle errors, you can also check for i18n init errors:
//      i18n.on('failedLoading', (lng, ns, msg) => {
//        reject(`Error loading namespace: ${msg}`);
//      });
//    });
   
//    export default documentTypeOptions;
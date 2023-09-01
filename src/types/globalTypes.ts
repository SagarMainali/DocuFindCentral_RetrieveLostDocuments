type FormDataType = {
    personal: {
    fullName: string,
    contactNumber: number,
    currentAddress: string,
    permanentAddress: string,
    email: string
},
document: {
    documentType: string,
    documentNumber: string,
    documentIssuedDistrict: string,
    imageFile: File,
    documentIssuedDate: string,
    documentExpiryDate: string
},
message: {
    shortMessage: string
}
}
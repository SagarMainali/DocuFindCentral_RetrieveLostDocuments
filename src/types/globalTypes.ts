export type FormDataType = {
    [key: string]: string | File,

    owner_fullName: string,
    finder_fullName: string,
    contact: string,
    currentAddress: string,
    permanentAddress: string,
    documentFoundPlace: string,
    email: string,

    documentType: string,
    documentIssuedDistrict: string,
    documentNumber: string,
    imageFile: File,
    documentIssuedDate: string,
    documentExpiryDate: string,

    shortMessage: string
}

export type FeedbackFormType = {
    fullName: string,
    feedback: string
}
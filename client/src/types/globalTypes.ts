export type FormDataType = {
    [key: string]: string | File,

    owner_fullName: string,
    finder_fullName: string,
    contact: string,
    email: string,

    documentType: string,
    documentIssuedPlace: string,
    vehicleCategoryForLicense: string,
    vehicleClassificationForBluebook: string,
    vehicleLotNumber: string,
    vehicleNumber: string,
    documentNumber: string,
    documentIssuedDate: string,
    documentExpiryDate: string,
    imageFile: File,

    shortMessage: string
}

export type UnsolvedTicketType = {
    id: number,
    owner_fullName: string,
    finder_fullName: string,
    documentType: string,
    ticketType: string,
    shortMessage: string,
    createdDate: string
}

export type SolvedTicketType = {
    id: number,
    owner_fullName: string,
    finder_fullName: string,
    documentType: string,
    createdDate: string,
    resolvedDate: string
}

export type FeedbackFormType = {
    fullName: string,
    feedback: string
}
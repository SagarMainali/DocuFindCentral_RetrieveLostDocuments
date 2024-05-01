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
    vehicleCategory: string,
    documentIssuedDistrict: string,
    documentNumber: string,
    imageFile: File,
    documentIssuedDate: string,
    documentExpiryDate: string,

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
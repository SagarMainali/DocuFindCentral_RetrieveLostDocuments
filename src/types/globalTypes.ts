type FormDataType = {
    personal: {
        owner_fullName?: string,
        finder_fullName?: string,
        contactNumber: number,
        currentAddress: string,
        permanentAddress: string,
        documentFoundPlace: string,
        email: string
    },
    document: {
        owner_fullname?: string,
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
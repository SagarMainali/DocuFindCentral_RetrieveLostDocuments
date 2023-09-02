import { SingleValue } from 'react-select'

export type FormDataType = {

    owner_fullName: string,
    finder_fullName: string,
    contact: string,
    currentAddress: string,
    permanentAddress: string,
    documentFoundPlace: string,
    email: string,

    documentType: SingleValue<{ value: string; label: string; }> | null,
    documentNumber: string,
    documentIssuedDistrict: string,
    imageFile: File,
    documentIssuedDate: string,
    documentExpiryDate: string,

    shortMessage: string
}
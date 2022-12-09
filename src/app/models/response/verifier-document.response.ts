
export interface VerifierDocumentDetail {
    borrowerAddress: string,
    borrowerName: string,
    documentDetailsDTOList: IDocumentDetailDTO[],
    insurerName: string,
    loanAccountNumber: string,
    nomineeAddress: string,
    nomineeName: string,
    nomineeRelationShip: string
}

export interface IDocumentDetailDTO {
    documentId: number,
    documentName: string,
    documentStatus: null
    documentUploaded: boolean,
    documentUrlListDTOList: IDocumetnUrlListDTO[]
}

export interface IDocumetnUrlListDTO {
    documentUrl: string
    documentUrlId: number
}

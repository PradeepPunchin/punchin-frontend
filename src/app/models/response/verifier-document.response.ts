
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
    docType: string,
    documentStatus: null
    isApproved: boolean,
    isVerified: boolean,
    documentUrlDTOS: IDocumetnUrlListDTO[]

}

export interface IDocumetnUrlListDTO {
    docUrl: string
    docFormat: string
}

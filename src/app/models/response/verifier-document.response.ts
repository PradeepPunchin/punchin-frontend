
export interface VerifierDocumentDetail {
    borrowerAddress: string,
    borrowerName: string,
    claimDocumentsDTOS: IDocumentDetailDTO[],
    insurerName: string,
    loanAccountNumber: string,
    nomineeAddress: string,
    nomineeName: string,
    nomineeRelationShip: string
}

export interface IDocumentDetailDTO {
    id: number,
    docType: string,
    agentDocType: string,
    isApproved: boolean,
    isVerified: boolean,
    documentUrlDTOS: IDocumetnUrlListDTO[]
}

export interface IDocumetnUrlListDTO {
    docUrl: string
    docFormat: string
}


export interface VerifierDocumentDetail {
    borrowerAddress: string,
    borrowerName: string,
    agentClaimDocumentsDTOs: IDocumentDetailDTO[],
    bankerClaimDocumentsDTOs: IDocumentDetailDTO[],
    newDocumentRequestDTOs: IDocumentDetailDTO[],
    insurerName: string,
    loanAccountNumber: string,
    nomineeAddress: string,
    nomineeName: string,
    nomineeRelationShip: string,
    claimStatus: string
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

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ApiResponse } from 'src/app/models/common';
import { IDocumentDetailDTO, VerifierDocumentDetail } from 'src/app/models/response/verifier-document.response';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-document-verification-request-modal',
  templateUrl: './document-verification-request-modal.component.html',
  styleUrls: ['./document-verification-request-modal.component.scss']
})
export class DocumentVerificationRequestModalComponent implements OnInit {

  documentVerificationRequestId: any
  documentVerificationDetails!: VerifierDocumentDetail;
  documentDetailsDTOList: IDocumentDetailDTO[] = []
  docUrl: string = '';
  docType: string = "";
  isShoeDoc: boolean = false
  docId: any
  downlaodUrl: any

  constructor(public bsModalRef: BsModalRef,
    private sessionService: SessionService,
    private apiService: ApiService,
    private notifierService: NotifierService
  ) { }
  ngOnInit(): void {
    this.getDocumentDetails()
  }

  approveAndReject(data: any) {
    this.docId = this.sessionService.getSession("docId")
    let req = {
      "approved": data
    }
    this.apiService.getAcceptAndRejectDocuments(this.documentVerificationRequestId, this.docId, req).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.getDocumentDetails();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong")
    })
  }


  getDocumentDetails() {
    this.apiService.getDocumentDetails(this.documentVerificationRequestId).subscribe((res: ApiResponse<VerifierDocumentDetail> | any) => {
      if (res?.isSuccess) {
        this.documentVerificationDetails = res?.data;
        this.documentDetailsDTOList = res?.data.claimDocumentsDTOS;
        console.log(this.documentDetailsDTOList, "documentVerificationDetails");
      }
    })
  }

  viewDoc(documentDTO: IDocumentDetailDTO) {
    this.docUrl = documentDTO.documentUrlDTOS[0].docUrl;
    this.docType = documentDTO.documentUrlDTOS[0].docFormat;
    this.isShoeDoc = true
    this.sessionService.setSessions({ docId: documentDTO.id })
  }

  Downlaod(documentDTO: IDocumentDetailDTO) {
    this.downlaodUrl = documentDTO.documentUrlDTOS[0].docUrl;
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = this.downlaodUrl;
    document.body.appendChild(a);
    a.click();
  }

}




import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api/api.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-document-verification-request-modal',
  templateUrl: './document-verification-request-modal.component.html',
  styleUrls: ['./document-verification-request-modal.component.scss']
})
export class DocumentVerificationRequestModalComponent implements OnInit {

  documentVerificationRequestId: any
  documentVerificationDetails: any;
  documentDetailsDTOList: any = []
  docUrl: any = []

  constructor(public bsModalRef: BsModalRef,
    private sessionService: SessionService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDocumentDetails()
  }

  getDocumentDetails() {
    this.apiService.getDocumentDetails(this.documentVerificationRequestId).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.documentVerificationDetails = res?.data
        this.documentDetailsDTOList = res?.data.documentDetailsDTOList
        console.log(this.documentDetailsDTOList, "documentVerificationDetails");

      }
    })
  }

  viewDoc() {
    this.docUrl = this.documentDetailsDTOList
    console.log(this.docUrl, "docUrl");

  }

}




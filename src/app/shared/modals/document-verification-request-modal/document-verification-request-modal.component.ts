import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ApiResponse } from 'src/app/models/common';
import { IDocumentDetailDTO, VerifierDocumentDetail } from 'src/app/models/response/verifier-document.response';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';


@Pipe({
  name: 'removeunderscore'
})
export class RemoveunderscorePipe implements PipeTransform {
  transform(value: any): string {
    return value?.replace(/[^a-zA-Z ]/g, " ");
  }

}
@Component({
  selector: 'app-document-verification-request-modal',
  templateUrl: './document-verification-request-modal.component.html',
  styleUrls: ['./document-verification-request-modal.component.scss']
})
export class DocumentVerificationRequestModalComponent implements OnInit {



  documentVerificationRequestId: any
  agentCity: any;
  agentName: any;
  documentVerificationDetails!: VerifierDocumentDetail;
  documentDetailsDTOList: IDocumentDetailDTO[] = [];
  bankerDocumentDetailsDTOList: IDocumentDetailDTO[] = [];
  additionalDocmentDetailsDTOList: IDocumentDetailDTO[] = [];
  docUrl: string = '';
  docType: string = "";
  isShoeDoc: boolean = false
  docId: any
  downlaodUrl: any
  remarkForm!: FormGroup
  remarkFormSubmitted: boolean = false
  bsModalRef1?: BsModalRef;
  bsModalRef2?: BsModalRef;
  // modalRef?: BsModalRef;
  isDownloadDoc: boolean = false
  isBankerCollapsed = true;
  isVarifierCollapsed = false;
  isAdditionalCollapsed = false;
  claimStatus: any;

  constructor(
    private sessionService: SessionService,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public modalRef: BsModalRef,

  ) { }
  ngOnInit(): void {
    this.getDocumentDetails()

    this.remarkForm = this.formBuilder.group({
      remark: ['', [Validators.required]],
      reason: [null, [Validators.required]]

    })
  }

  addtional() {
    this.isBankerCollapsed = false;
    this.isVarifierCollapsed = false;
    this.isAdditionalCollapsed = !this.isAdditionalCollapsed;
  }
  banker() {
    this.isBankerCollapsed = !this.isBankerCollapsed;
    this.isVarifierCollapsed = false;
    this.isAdditionalCollapsed = false;
  }

  verifier() {
    this.isBankerCollapsed = false;
    this.isVarifierCollapsed = !this.isVarifierCollapsed;
    this.isAdditionalCollapsed = false;

  }



  openApprovedModal(approved: any) {
    this.bsModalRef1 = this.modalService.show(approved);
  }

  openRejectModal(reject: any) {
    this.bsModalRef2 = this.modalService.show(reject);
  }

  approveAndReject(data: any) {
    this.docId = this.sessionService.getSession("docId")

    let req = {
      "approved": data,
      "reason": this.remarkForm.controls.reason.value || "",
      "remark": this.remarkForm.controls.remark.value || ""
    }
    this.apiService.getAcceptAndRejectDocuments(this.documentVerificationRequestId, this.docId, req).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.bsModalRef2?.hide();
        this.bsModalRef1?.hide();
        this.getDocumentDetails();
        this.remarkForm.reset();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  close() {
    this.bsModalRef2?.hide();
    this.remarkForm.reset();
  }

  getDocumentDetails() {
    this.apiService.getDocumentDetails(this.documentVerificationRequestId).subscribe((res: ApiResponse<VerifierDocumentDetail> | any) => {
      if (res?.isSuccess) {
        this.documentVerificationDetails = res?.data;
        this.claimStatus = this.documentVerificationDetails.claimStatus
        this.documentDetailsDTOList = res?.data.agentClaimDocumentsDTOs;
        this.bankerDocumentDetailsDTOList = res?.data?.bankerClaimDocumentsDTOs;
        this.additionalDocmentDetailsDTOList = res?.data?.newDocumentRequestDTOs;
      }
    })
  }

  viewDoc1(item: any, id: any) {
    this.docUrl = item.docUrl;
    this.docType = item.docFormat;
    this.isShoeDoc = true;
    this.sessionService.setSessions({ docId: id })
  }

  viewDoc(documentDTO: IDocumentDetailDTO) {
    // this.docUrl = documentDTO.documentUrlDTOS[0].docUrl;
    // this.docType = documentDTO.documentUrlDTOS[0].docFormat;
    // this.isShoeDoc = true;
    // this.sessionService.setSessions({ docId: documentDTO.id })
  }

  Downlaod(documentDTO: IDocumentDetailDTO) {
    this.downlaodUrl = documentDTO.documentUrlDTOS[0].docUrl;
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = this.downlaodUrl;
    document.body.appendChild(a);
    a.click();
  }

  downloadAllDocument() {
    this.isDownloadDoc = true
    this.apiService.getDownlaodAllDocuments(this.documentVerificationRequestId).subscribe((res: any) => {
      if (res?.isSuccess && res?.data) {
        window.location.href = res?.data
        this.notifierService.showSuccess(res?.message);
        this.isDownloadDoc = false
      } else {
        this.notifierService.showError("No data found");
        this.isDownloadDoc = false
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
      this.isDownloadDoc = false
    });
  }

}



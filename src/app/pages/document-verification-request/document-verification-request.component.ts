import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiService } from 'src/app/services/api/api.service';
import { DocumentVerificationRequestModalComponent } from 'src/app/shared/modals/document-verification-request-modal/document-verification-request-modal.component';

@Component({
  selector: 'app-document-verification-request',
  templateUrl: './document-verification-request.component.html',
  styleUrls: ['./document-verification-request.component.scss']
})
export class DocumentVerificationRequestComponent implements OnInit {
  totalrecords!: number;
  pageNo: number = 0;
  pageSize: number = 10;
  RequestList: any;
  verifierRequestList: any = []
  maxSize: number = 5;
  modalRef?: BsModalRef;


  constructor(
    private apiService: ApiService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getVerifierDocumentRequestData();
  }

  getVerifierDocumentRequestData() {
    this.apiService.getVerifierDocumentRequestData(this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.RequestList = res?.data
        this.verifierRequestList = res?.data.content
        this.totalrecords = res?.data.totalRecords
      }
    })
  }

  openModal(id: any) {
    const initialState: ModalOptions = {
      initialState: {
        documentVerificationRequestId: id,
      },
      class: 'modal-custom-width'
    };
    this.modalRef = this.modalService.show(DocumentVerificationRequestModalComponent, initialState);
  }

  pageChanged(event: PageChangedEvent) {
    if (this.RequestList && this.RequestList.length !== this.totalrecords) {
      this.pageNo = event.page - 1
      this.getVerifierDocumentRequestData();
    }
  }
  pagePerData(event: any) {
    this.pageSize = event.target.value
    this.getVerifierDocumentRequestData();
  }

}

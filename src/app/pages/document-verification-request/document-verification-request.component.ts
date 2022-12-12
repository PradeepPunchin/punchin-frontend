import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiService } from 'src/app/services/api/api.service';

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


  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getVerifierDocumentRequestData();
  }

  getVerifierDocumentRequestData() {
    this.apiService.getVerifierDocumentRequestData(this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.verifierRequestList = res?.data
        // this.verifierRequestList = res?.data.content
        this.totalrecords = res?.data.totalElements
      }
    })
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

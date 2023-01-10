import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiService } from 'src/app/services/api/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-claim-documentation-upload',
  templateUrl: './claim-documentation-upload.component.html',
  styleUrls: ['./claim-documentation-upload.component.scss']
})
export class ClaimDocumentationUploadComponent implements OnInit {
  totalrecords!: number;
  pageNo: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalpage!: number;
  submittedClaimList: any;
  submittedclaimListContent: any = []
  viewClaimList: boolean = true;
  editCliamList: boolean = false;
  showClaimForm!: FormGroup;
  uploadForm !: FormGroup
  ClaimListUrlById: any = [];
  ClaimListById: any = []
  file: any;
  myFiles: any[] = [];
  filterData: any = "ALL";
  viewDocument: any
  uploadedFileUrls: any
  docId: any
  isUploaded: boolean = false
  fileUploadedLists: any[] = [];
  bankerDocId: any;
  checkStatus: any;
  cliamId: any;
  isCliamUpdated: boolean = false


  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.showClaimForm = this.formBuilder.group({
      caseId: ['', [Validators.required]],
      brrower_name: ['', [Validators.required]],
      borrower_address: ['', [Validators.required]],
      borrower_contact: ['', [Validators.required]],
      borrower_pin_code: ['', [Validators.required]],
      nominee_name: ['', [Validators.required]],
      nominee_address: ['', [Validators.required]],
      nominee_contact: ['', [Validators.required]],
      load_type: ['', [Validators.required]],
      loan_acc_number: ['', [Validators.required]],
      insurer_name: ['', [Validators.required]],
      borrower_policy_number: ['', [Validators.required]],
      master_policy_number: ['', [Validators.required]],
      borrower_sum_assured: ['', [Validators.required]],
      original_loan_amt: ['', [Validators.required]],
      Loan_paid_by_borrower: ['', [Validators.required]],
      outstanding_loan_amt: ['', [Validators.required]],
      balance_claim_amt: ['', [Validators.required]],
    })
    this.uploadForm = this.formBuilder.group({
      docType: [null, [Validators.required]],
      files: ["", [Validators.required]]
    })
    this.getClaimUploadList();
    this.bankerDocId = this.activateRoute.snapshot.queryParams.id;
    if (this.bankerDocId) {
      this.editClaimList(this.bankerDocId)
    }
  }

  spaceRemoveFirst(e: any) {
    if (e.target.selectionStart == 0 && e.code === "Space") {
      e.preventDefault();
    }
  }


  patchValue() {
    this.showClaimForm.patchValue({
      caseId: this.ClaimListById.punchinClaimId,
      brrower_name: this.ClaimListById.borrowerName,
      borrower_address: this.ClaimListById.borrowerAddress,
      borrower_contact: this.ClaimListById.borrowerContactNumber,
      borrower_pin_code: this.ClaimListById.borrowerPinCode,
      nominee_name: this.ClaimListById.nomineeName,
      nominee_address: this.ClaimListById.nomineeAddress,
      nominee_contact: this.ClaimListById.nomineeContactNumber,
      load_type: this.ClaimListById.loanType,
      loan_acc_number: this.ClaimListById.loanAccountNumber,
      insurer_name: this.ClaimListById.insurerName,
      borrower_policy_number: this.ClaimListById.borrowerPolicyNumber,
      master_policy_number: this.ClaimListById.masterPolicyNumbet,
      borrower_sum_assured: this.ClaimListById.borrowerPolicyNumber,
      original_loan_amt: this.ClaimListById.loanAmount,
      Loan_paid_by_borrower: this.ClaimListById.loanAmount,
      outstanding_loan_amt: this.ClaimListById.outstandingLoanAmount,
      balance_claim_amt: this.ClaimListById.balanceClaimAmount,
    })

  }

  cliamDataUpated() {
    this.isCliamUpdated = true
    this.cliamId = this.docId || this.bankerDocId
    let req = {
      "borrowerAddress": this.showClaimForm.controls.borrower_address.value,
      "borrowerContactNumber": this.showClaimForm.controls.borrower_contact.value,
      "borrowerName": this.showClaimForm.controls.brrower_name.value,
      "borrowerPinCode": this.showClaimForm.controls.borrower_pin_code.value,
      "nomineeAddress": this.showClaimForm.controls.nominee_address.value,
      "nomineeContactNumber": this.showClaimForm.controls.nominee_contact.value,
      "nomineeName": this.showClaimForm.controls.nominee_name.value
    }
    this.apiService.cliamDataUpdated(this.cliamId, req).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.isCliamUpdated = false
        this.viewClaimList = true;
        this.editCliamList = false;
        this.getClaimUploadList();

      } else {
        this.notifierService.showError(res.message || "Something went wrong")
        this.isCliamUpdated = false
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  filterByStatus(event: any) {
    this.filterData = event.target.value
    this.pageNo = 0;
    this.getClaimUploadList();
  }

  getClaimUploadList() {
    this.apiService.getClaimUploadList(this.filterData, this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.submittedClaimList = res?.data
        this.submittedclaimListContent = res?.data?.content
        this.totalrecords = res?.data?.totalRecords
        this.totalpage = res?.data?.totalPages
      }
    });
  }

  editClaimList(id: any) {
    this.docId = id
    this.apiService.getClaimListByClaimid(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.ClaimListUrlById = res?.data.claimDocumentsDTOS;
        this.ClaimListById = res?.data;
        this.checkStatus = this.ClaimListById.submitted;
        this.patchValue()
        this.viewClaimList = false;
        this.editCliamList = true;
      }
    })
  }

  saveToDraft() {
    this.apiService.DocumnetSaveDraft(this.ClaimListById.id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.pageNo = 0;
        this.back();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  deleteSubmittedDoc(id: any) {
    console.log(id, "Submitted data");

    this.apiService.deleteDocument(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.editClaimList(this.docId)
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  deleteUploadedDoc(id: any, i: any) {
    console.log(id, "updated data", i,);

    this.apiService.deleteDocument(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.fileUploadedLists.splice(i, 1);
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  back() {
    this.myFiles = [];
    this.currentPage = 0;
    this.filterData = "ALL"
    this.getClaimUploadList();
    this.viewClaimList = true;
    this.editCliamList = false;
    this.uploadForm.reset();
    this.fileUploadedLists = [];
  }

  //pagination
  pageChanged(event: PageChangedEvent) {
    this.currentPage = event.page - 1;
    if (this.submittedClaimList && this.submittedClaimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimUploadList();
    }

  }

  // pagePerData(event: any) {
  //   this.pageSize = event.target.value
  //   this.getClaimUploadList();
  // }

  // file uplaod
  async fileBrowseHandler(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  uploadDocument() {
    let formData: FormData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append("multipartFiles", this.myFiles[i]);
    }
    this.isUploaded = true
    let selectedDoc = this.uploadForm.controls.docType.value
    this.apiService.uploadDocument(this.ClaimListById.id, selectedDoc, formData).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.isUploaded = false
        this.uploadedFileUrls = res?.data.claimDocuments
        this.uploadForm.reset();
        this.myFiles = [];
        this.fileUploadedLists.push(res?.data?.claimDocuments);
        this.notifierService.showSuccess(res?.message);
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
        this.myFiles = [];
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
      this.isUploaded = false
      this.uploadForm.reset();
      this.myFiles = [];
    })
  }

  viewUploadedDoc(item: any) {
    this.viewDocument = item.docUrl
    window.open(this.viewDocument)
  }

  submitClaim() {
    this.apiService.forwardClaim(this.ClaimListById.id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.currentPage = 0;
        this.getClaimUploadList();
        this.viewClaimList = true;
        this.editCliamList = false;
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  pageSize: number = 7;
  totalpage!: number;
  submittedClaimList: any;
  submittedclaimListContent: any = []
  viewClaimList: boolean = true;
  editCliamList: boolean = false;
  showClaimForm!: FormGroup;
  uploadForm !: FormGroup
  ClaimListDataById: any = []
  file: any;
  myFiles: any[] = [];
  filterData: any = "ALL";
  viewDocument: any
  uploadedFileUrls: any
  isUploadedTable: boolean = false
  isSubmittedTable: boolean = false
  docId: any
  isUploaded: boolean = false
  fileUploadedLists: any[] = [];
  fileUplaodedList: any



  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.showClaimForm = this.formBuilder.group({
      caseId: ['', [Validators.required]],
      brrower_name: ['', [Validators.required]],
      borrower_address: ['', [Validators.required]],
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
  }

  patchValue() {
    this.showClaimForm.patchValue({
      caseId: this.ClaimListDataById.punchinClaimId,
      brrower_name: this.ClaimListDataById.borrowerName,
      borrower_address: this.ClaimListDataById.borrowerAddress,
      load_type: this.ClaimListDataById.loanType,
      loan_acc_number: this.ClaimListDataById.loanAccountNumber,
      insurer_name: this.ClaimListDataById.insurerName,
      borrower_policy_number: this.ClaimListDataById.borrowerPolicyNumber,
      master_policy_number: this.ClaimListDataById.masterPolicyNumbet,
      borrower_sum_assured: this.ClaimListDataById.borrowerPolicyNumber,
      original_loan_amt: this.ClaimListDataById.loanAmount,
      Loan_paid_by_borrower: this.ClaimListDataById.loanAmount,
      outstanding_loan_amt: this.ClaimListDataById.outstandingLoanAmount,
      balance_claim_amt: this.ClaimListDataById.balanceClaimAmount,
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
    })
  }

  editClaimList(id: any) {
    this.docId = id
    this.apiService.getClaimListByClaimid(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.isUploadedTable = false
        this.isSubmittedTable = true
        this.ClaimListDataById = res?.data
        this.patchValue()
        this.viewClaimList = false;
        this.editCliamList = true;
      }
    })
  }

  saveToDraft() {
    this.apiService.DocumnetSaveDraft(this.ClaimListDataById.id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.viewClaimList = true;
        this.editCliamList = false;
        this.currentPage = 0;
        this.getClaimUploadList();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }


  viewDoc(item: any) {
    this.viewDocument = item.documentUrlDTOS[0].docUrl
    window.open(this.viewDocument)
  }

  deleteDoc(id: any) {
    this.apiService.deleteDocument(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.editClaimList(this.docId)
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  deleteDoc1(id: any) {
    this.apiService.deleteDocument(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res.message)
        this.fileUplaodedList.pop();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  back() {
    this.currentPage = 0;
    this.getClaimUploadList();
    this.viewClaimList = true;
    this.editCliamList = false;
  }

  //pagination
  pageChanged(event: PageChangedEvent) {
    this.currentPage = event.page - 1;
    if (this.submittedClaimList && this.submittedClaimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimUploadList();
    }

  }

  pagePerData(event: any) {
    this.pageSize = event.target.value
    this.getClaimUploadList();
  }

  // file uplaod
  async fileBrowseHandler(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    console.log(this.myFiles, "Files")
    // this.file = event.target.files[0];
  }

  uploadDocument() {
    const formData: FormData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("multipartFiles", this.myFiles[i]);
    }
    // if (this.myFiles[i].type === 'image/png' || this.myFiles[i].type === 'image/jpeg' || this.myFiles[i].type === 'image/jpg' || this.myFiles[i].type === 'application/pdf') {
    this.isUploaded = true
    let selectedDoc = this.uploadForm.controls.docType.value
    this.apiService.uploadDocument(this.ClaimListDataById.id, selectedDoc, formData).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.isUploadedTable = true
        this.isSubmittedTable = false
        this.isUploaded = false
        this.uploadedFileUrls = res?.data.claimDocuments
        this.fileUploadedLists.push(res?.data?.claimDocuments);
        this.fileUplaodedList = this.fileUploadedLists;
        this.notifierService.showSuccess(res?.message);
        this.uploadForm.reset();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
      this.isUploaded = false
    })

    // else {
    //   this.notifierService.showError("File type not valid");
    // }




  }

  viewUploadedDoc(item: any) {
    this.viewDocument = item.docUrl
    window.open(this.viewDocument)
  }

  submitClaim() {
    this.apiService.forwardClaim(this.ClaimListDataById.id).subscribe((res: any) => {
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


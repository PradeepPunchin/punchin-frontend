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
  pageNo: number = 1;
  pageSize: number = 10;
  submittedClaimList: any;
  submittedclaimListContent: any = []
  maxSize: number = 5;
  viewClaimList: boolean = true;
  editCliamList: boolean = false;
  showClaimForm!: FormGroup;
  uploadForm !: FormGroup
  ClaimListDataById: any = []
  fileUpload: boolean = false;
  file: any;
  files: any[] = [];





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
      docType: [null, [Validators.required]]
    })
    this.getClaimSubmiitedList();

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

  getClaimSubmiitedList() {
    this.apiService.getClaimSubmiitedList(this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.submittedClaimList = res?.data
        this.submittedclaimListContent = res?.data.content
        this.totalrecords = res?.data.totalElements

      }
    })
  }

  editClaimList(id: any) {
    this.apiService.getClaimListByClaimid(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.ClaimListDataById = res?.data
        this.patchValue()
        this.viewClaimList = false;
        this.editCliamList = true;
      }
    })
  }
  back() {
    this.viewClaimList = true;
    this.editCliamList = false;
  }
  //pagination
  pageChanged(event: PageChangedEvent) {
    if (this.submittedClaimList && this.submittedClaimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimSubmiitedList();
    }
  }
  pagePerData(event: any) {
    this.pageSize = event.target.value
    this.getClaimSubmiitedList();
  }

  // file uplaod
  async fileBrowseHandler(event: any) {
    this.file = event.target.files[0];
  }

  uploadDocument() {
    let selectedDoc = this.uploadForm.controls.docType.value
    const formData: FormData = new FormData();
    formData.append('multipartFiles', this.file,);
    this.apiService.uploadDocument(this.ClaimListDataById.id, selectedDoc, formData).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message);
        this.uploadForm.reset()
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  saveToDraft() {
    this.notifierService.showSuccess("save to draft sucessfull")
    this.viewClaimList = true;
    this.editCliamList = false;
  }

  submitClaim() {
    this.apiService.forwardClaim(this.ClaimListDataById.id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.viewClaimList = true;
        this.editCliamList = false;
      }
    },
      (error: any) => {
        this.notifierService.showError(error?.error?.message || "Something went wrong");
      })
  }
}

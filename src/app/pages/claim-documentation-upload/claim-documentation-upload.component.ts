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
  pageSize: number = 10;
  submittedClaimList: any;
  submittedclaimListContent: any = []
  maxSize: number = 5;
  viewClaimList: boolean = true;
  editCliamList: boolean = false;
  uplaodClaimForm: any;
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
    this.uplaodClaimForm = this.formBuilder.group({
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
    this.getClaimSubmiitedList();

  }

  patchValue() {
    this.uplaodClaimForm.patchValue({
      caseId: this.ClaimListDataById.punchinClaimId,
      brrower_name: this.ClaimListDataById.borrowerName,
      borrower_address: this.ClaimListDataById.borrowerAddress,
      load_type: this.ClaimListDataById.loanType,
      loan_acc_number: this.ClaimListDataById.loanAccountNumber,
      insurer_name: this.ClaimListDataById.insurerName,
      borrower_policy_number: this.ClaimListDataById.policyNumber,
      master_policy_number: this.ClaimListDataById.masterPolNumber,
      borrower_sum_assured: "150000",
      original_loan_amt: this.ClaimListDataById.loanAmount,
      Loan_paid_by_borrower: this.ClaimListDataById.loanAmount,
      outstanding_loan_amt: "50000",
      balance_claim_amt: "30000",
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

  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }
  async fileBrowseHandler(event: any) {
    this.prepareFilesList(event.target.files);
    this.file = event.target.files[0];
    const files: any[] = event.target.files;
    this.fileUpload = false;
    if (files && files.length > 0) {

      this.uplaodClaimForm
      for (let i = 0; i < files.length; i++) {
        const formData: FormData = new FormData();
        formData.append('multipartFile', this.files[i], this.files[i].name);
        const fileUploadRes = await this.apiService.uploadUserDocument(formData).subscribe((res: any) => {
          this.fileUpload = true;
          this.notifierService.showSuccess('File Uploaded');
        })
      }
    }
  }
  prepareFilesList(files: any) {
    for (const item of files) {
      this.files.push(item);
    }
  }
}

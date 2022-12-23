import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiResponse } from 'src/app/models/common';
import { BANKERSTATUSENUM, ROLES, STORAGETOKENENUM, VERIFIERSTATUSENUM } from 'src/app/models/enums';
import { ApiService } from 'src/app/services/api/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DocumentVerificationRequestModalComponent } from 'src/app/shared/modals/document-verification-request-modal/document-verification-request-modal.component';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: any
  bankerDashboardData: {
    [key: string]: BANKERSTATUSENUM
  } = {};
  bankerStatusEnum = BANKERSTATUSENUM
  verifierDashboardData: {
    [key: string]: VERIFIERSTATUSENUM
  } = {};
  verifierStatusEnum = VERIFIERSTATUSENUM
  claimList: any
  claimListContent: any = []
  totalrecords!: number;
  pageNo: number = 0;
  pageSize: number = 7;
  onStep: number = 0;
  cordListData: any = []
  cardList: any
  isShow: boolean = true
  verifierCardList: any
  verifiercordListData: any = []
  innerStep: number = 0
  isShowFileUploaded: boolean = true
  bankerData: any;
  verifierData: any = "ALL"
  bsModalRef?: BsModalRef;
  bsModalRef1?: BsModalRef;
  filterStatus: any
  currentPage = 0
  isSubmitted: boolean = false
  form!: FormGroup;
  searchForm!: FormGroup
  searchEnum: any


  constructor(
    private sessionServive: SessionService,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private router: Router,
    private eventService: EventService,
    private utilitiesService: UtilityService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required]),
    });
    this.searchForm = this.formBuilder.group({
      selectedValue: [null, [Validators.required]],
      search: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.role = this.sessionServive.getSession(STORAGETOKENENUM.role)
    if (this.role === ROLES.banker) {
      this.getBankerDashboardData();
      this.showCardDetails('ALL')
    }

    if (this.role === ROLES.verifier || this.role === ROLES.admin) {
      this.getVerifierDashboardData();
      this.verifierCardDetails("ALL")
    }
    if (this.role === "") {
      this.bsModalRef?.hide();
    }
  }

  onGetUploadedFile(event: any) {
    if (this.bsModalRef) {
      this.bsModalRef?.hide();
    }

    this.isShow = event.length > 0 ? false : true;
    setTimeout(() => {
      this.getClaimList();
    }, 1000);
  }

  // banker card table data
  showCardDetails(data: any) {
    this.bankerData = data;
    this.apiService.getCardList(this.bankerData).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.cardList = res?.data
        this.cordListData = res?.data.content
        this.totalrecords = res?.data.totalRecords
        if (this.cordListData.length > 0) {
          this.isShow = false
        }
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    });

  }

  //banker dashboard
  getBankerDashboardData() {
    this.apiService.getBankerDashboardData().subscribe((res: ApiResponse<any> | any) => {
      if (res?.isSuccess) {
        this.bankerDashboardData = res?.data;
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  //After uplaod file(Draft)
  getClaimList() {
    this.currentPage = 0
    this.apiService.getClaimList().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.claimList = res?.data
        this.claimListContent = res?.data.content
        this.totalrecords = res?.data.totalRecords
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  //discard upload file
  deleteClaim() {
    this.apiService.discardClaims().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message);
        this.getClaimList();
        setTimeout(() => {
          this.currentPage = 0
          this.showCardDetails("ALL");
        }, 100);
        this.isShowFileUploaded = true;
        if (this.cordListData.length > 0) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong")
    })
  }

  viewUnderVerification() {
    this.router.navigate(['/pages/document-verification'])
  }

  //submit upload file
  submitClaim() {
    this.isSubmitted = true
    this.apiService.submitClaims().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.isSubmitted = false
        this.notifierService.showSuccess(res?.message)
        this.router.navigate(['/pages/claim-documentation'])
      }
    }, (error: any) => {
      this.isSubmitted = false
      this.notifierService.showError(error?.error?.message || "Something went wrong")
    })
  }

  // download standardized excel
  getDownloadExcelFormat() {
    this.apiService.getDownloadExcelFormat().subscribe((res: any) => {
      if (res?.isSuccess && res?.data) {
        window.location.href = res.data
      } else {
        this.notifierService.showError("No data found");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    });
  }

  //  download msi report
  downloadMisReport() {
    this.apiService.getDownloadMisReport(this.bankerData).subscribe((res: any) => {
      if (res?.isSuccess && res?.data) {
        window.location.href = res.data
      } else {
        this.notifierService.showError("No data found");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    });
  }

  //verifier dashboard
  getVerifierDashboardData() {
    this.apiService.getVerifierDashboardData().subscribe((res: ApiResponse<any> | any) => {
      if (res?.isSuccess) {
        this.verifierDashboardData = res?.data;
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    });
  }

  //  verifier card api
  verifierCardDetails(data: any) {
    this.verifierData = data;
    if (data === 'UNDER_VERIFICATION') {
      this.router.navigate(['/pages/document-verification'])
    } else {
      this.apiService.getVerifierClaimsData(this.verifierData).subscribe((res: any) => {
        if (res?.isSuccess) {
          this.verifierCardList = res?.data
          this.verifiercordListData = res?.data.content
          this.totalrecords = res?.data.totalRecords
        }
      })
    }
  }

  filterByStatus(event: any) {
    this.verifierData = event.target.value
    this.verifierCardDetails(this.verifierData)
  }


  //pagination
  pageChanged(event: PageChangedEvent) {
    this.currentPage = event.page - 1;
    this.apiService.getClaimList(this.currentPage).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.claimList = res?.data
        this.claimListContent = res?.data.content
        this.totalrecords = res?.data.totalRecords
      }
    })
  }

  changeBankerPage(event: PageChangedEvent) {
    this.currentPage = event.page - 1;
    this.apiService.getCardList(this.bankerData, this.currentPage).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.cardList = res?.data
        this.cordListData = res?.data.content
        this.totalrecords = res?.data.totalRecords
      }
    })
  }

  changeVerifierPage(event: PageChangedEvent) {
    this.currentPage = event.page - 1;
    this.apiService.getVerifierClaimsData(this.verifierData, this.currentPage).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.verifierCardList = res?.data
        this.verifiercordListData = res?.data.content
        this.totalrecords = res?.data.totalRecords
      }
    })
  }
  // end pagination



  // pagePerData(event: any) {
  //   console.log(event, "event");
  //   this.pageSize = event.target.value
  //   this.showCardDetails('ALL');
  // }

  openModal1(template: any) {
    this.isShowFileUploaded = false;
    const initialState: ModalOptions = {
      class: 'file-modal-custom-width',
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef = this.modalService.show(template, initialState);
  }

  closeModal() {
    this.bsModalRef?.hide()
    this.isShowFileUploaded = true;
  }
  OpenAdditionalDocModal(template: any) {
    const initialState: ModalOptions = {
      class: 'file-modal-custom-width',
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef1 = this.modalService.show(template, initialState);

  }

  //search
  searchBySelectedData(event: any) {
    this.searchEnum = event.target.value
  }
  searchTableData() {
    let inputSearch = this.searchForm.controls.search.value
    if (this.role === ROLES.banker) {
      if (this.searchForm.valid) {
        this.apiService.getBankerSearchData(this.searchEnum, inputSearch, this.verifierData).subscribe((res: any) => {
          if (res?.isSuccess) {
            this.cordListData = res?.data
          }
        }, (error: any) => {
          this.notifierService.showError(error?.error?.message || "Something went wrong");
        })
      }
      else {
        this.notifierService.showError("Something went wrong");
      }

    } else if (this.role === ROLES.verifier || this.role === ROLES.admin) {
      if (this.searchForm.valid) {
        console.log(this.searchEnum, inputSearch, this.verifierData, "dashboard input data");
        this.apiService.getVerifierSearchData(this.searchEnum, inputSearch, this.verifierData).subscribe((res: any) => {
          if (res?.isSuccess) {
            this.verifierCardList = res?.data
            this.verifiercordListData = res?.data.content
            this.totalrecords = res?.data.totalRecords
          }
        }, (error: any) => {
          this.notifierService.showError(error?.error?.message || "Something went wrong");
        })
      }
      else {
        this.notifierService.showError("Something went wrong");
      }
    } else { }

  }
  //end

  // raise additional document
  Data: Array<any> = [
    { name: 'BANK_ACCOUNT_PROOF', value: 'BANK_ACCOUNT_PROOF' },
    { name: 'BORROWER_ID_PROOF', value: 'BORROWER_ID_PROOF' },
    { name: 'DEATH_CERTIFICATE', value: 'DEATH_CERTIFICATE' },
    { name: 'SIGNED_FORM', value: 'SIGNED_FORM' },
  ];

  onSelectCheckbox(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    console.log(this.form.value);
  }
  // end
}



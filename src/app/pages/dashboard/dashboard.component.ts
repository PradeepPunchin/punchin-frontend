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
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';



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
  bsModalRef2?: BsModalRef;
  bsModalRef3?: BsModalRef;
  modalRef?: BsModalRef;
  filterStatus: any
  currentPage: any = 0;
  isSubmitted: boolean = false
  form!: FormGroup;
  searchForm!: FormGroup
  agnetAllocatedForm!: FormGroup
  searchEnum: any;
  inputSearch: any;
  file: any;
  additionalDocType: any;
  bankerform!: FormGroup;
  bankerDocCliamId: any
  bankerDoc: any;
  selectBankerDoc: any;
  docName: any;
  agentAllocatedData: any[] = [];
  verifierClaimId: any;
  agentId: any;



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
    this.bankerform = this.formBuilder.group({
      addDoc: [null, [Validators.required]],
    })
    this.agnetAllocatedForm = this.formBuilder.group({
      agent_name: [null, [Validators.required]]

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
    this.currentPage = 0;
    this.inputSearch = this.searchForm.controls.search.value
    this.apiService.getCardList(this.searchEnum, this.inputSearch, this.bankerData, this.currentPage).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.cardList = res?.data;
        this.cordListData = res?.data.content;
        this.totalrecords = res?.data.totalRecords;
        this.searchEnum = "";
        this.inputSearch = "";
        if (this.cordListData.length > 0) {
          this.isShow = false
        }
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
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

  viewUnderVerification(status: any, id: any) {
    if (status === 'UNDER_VERIFICATION') {
      const initialState: ModalOptions = {
        initialState: {
          documentVerificationRequestId: id,
        },
        class: 'modal-custom-width'
      };
      this.modalRef = this.modalService.show(DocumentVerificationRequestModalComponent, initialState);
    }
    else {
      this.notifierService.showInfo("Not valid")
    }
  }

  viewbankerDocRequest(submitBy: any, id: any) {
    if (submitBy === null) {
      this.router.navigate(["/pages/claim-documentation"], { queryParams: { 'id': id } })
    } else {
      this.notifierService.showInfo("Already Submitted")
    }
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



  //  download msi report
  downloadMisReport() {
    if (this.role === ROLES.banker) {
      this.apiService.getBankerDownloadMISReport(this.bankerData).subscribe((res: any) => {
        if (res?.isSuccess && res?.data) {
          window.location.href = res.data
        } else {
          this.notifierService.showError("No data found");
        }
      }, (error: any) => {
        this.notifierService.showError(error?.error?.message || "Something went wrong");
      });
    } else if (this.role === ROLES.verifier || this.role === ROLES.admin) {
      this.apiService.getVerifierDownloadMISReport(this.verifierData).subscribe((res: any) => {
        if (res?.isSuccess && res?.data) {
          window.location.href = res.data
        } else {
          this.notifierService.showError("No data found");
        }
      }, (error: any) => {
        this.notifierService.showError(error?.error?.message || "Something went wrong");
      });
    }
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

  //  verifier card table api
  verifierCardDetails(data: any) {
    this.verifierData = data;
    this.searchForm.reset();
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
    this.pageNo = event.page - 1
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
    this.pageNo = event.page - 1
    this.apiService.getCardList("", "", this.bankerData, this.currentPage).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.cardList = res?.data
        this.cordListData = res?.data.content
        this.totalrecords = res?.data.totalRecords
      }
    })
  }

  changeVerifierPage(event: PageChangedEvent) {
    if (this.searchEnum, this.inputSearch) {
      this.currentPage = event.page - 1;
      this.apiService.getVerifierSearchData(this.searchEnum, this.inputSearch, this.verifierData, this.currentPage).subscribe((res: any) => {
        if (res?.isSuccess) {
          this.verifierCardList = res?.data
          this.verifiercordListData = res?.data.content
          this.totalrecords = res?.data.totalRecords
        }
      });
    } else {
      this.currentPage = event.page - 1;
      this.apiService.getVerifierClaimsData(this.verifierData, this.currentPage).subscribe((res: any) => {
        if (res?.isSuccess) {
          this.verifierCardList = res?.data
          this.verifiercordListData = res?.data.content
          this.totalrecords = res?.data.totalRecords
        }
      });
    }
  }
  // end pagination



  // pagePerData(event: any) {
  //   console.log(event, "event");
  //   this.pageSize = event.target.value
  //   this.showCardDetails('ALL');
  // }

  // file uplaod modal
  openUploaFiledModal(template: any) {
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
  // end///

  // Banker Discrepancy modal
  OpenBankerDiscrepancyModal(template: any, id: any) {
    this.bankerDocCliamId = id;
    const initialState: ModalOptions = {
      class: 'banker-discrepbancy-custom-modal',
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef2 = this.modalService.show(template, initialState)
    this.apiService.getClaimBankerDocuments(id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.bankerDoc = res?.data.claimDocuments;
        this.selectBankerDoc = res?.data.rejectedDocList;
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    });
  }


  // agent Allocated modal data
  //open allocated Modal
  openAllocatedModal(template: any, id: any) {
    this.verifierClaimId = id;
    const initialState: ModalOptions = {
      class: 'agent-allocated-custom-width',
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef3 = this.modalService.show(template, initialState);
    this.getAllAgentsForVerifier();

  }

  getAllAgentsForVerifier() {
    this.apiService.getAllAgentsForVerifier().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.agentAllocatedData = res?.data
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  selectAgentAllocatedName(event: any) {
    this.agentId = event.target.value
  }

  sumbitAgentAllocation() {
    this.apiService.claimDataAgentAllocation(this.agentId, this.verifierClaimId).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message || "Something went wrong");
        this.bsModalRef3?.hide()
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })

  }
  //end agent Allocated

  //search
  searchBySelectedData(event: any) {
    this.searchEnum = event.target.value
  }

  searchTableData() {
    this.inputSearch = this.searchForm.controls.search.value
    if (this.role === ROLES.banker) {
      this.showCardDetails(this.bankerData)
      this.searchForm.reset();

    } else if (this.role === ROLES.verifier || this.role === ROLES.admin) {
      if (this.searchForm.valid) {
        this.apiService.getVerifierSearchData(this.searchEnum, this.inputSearch, this.verifierData).subscribe((res: any) => {
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
  //end search

  //banker discrepnacy
  filterByAddDoc(event: any) {
    this.additionalDocType = event.target.value;
  }
  fileBrowseHandler(event: any) {
    this.file = event.target.files[0];
    this.docName = this.file.name
  }

  submitBankerData() {
    if (this.file.type === 'image/png' || this.file.type === 'image/jpeg' || this.file.type === 'image/jpg' || this.file.type === 'application/pdf') {
      const formData: FormData = new FormData();
      formData.append('multipartFile', this.file)
      this.apiService.uploadDiscrepancyDocument(this.bankerDocCliamId, this.additionalDocType, formData).subscribe((res: any) => {
        if (res?.isSuccess) {
          this.notifierService.showSuccess(res?.message);
          this.bsModalRef2?.hide()
        }
      }, (error: any) => {
        this.notifierService.showError(error?.error?.message || "Something went wrong");
      });
    } else {
      this.notifierService.showError("File type not valid");
    }
  }

  viewBankerDoc(item: any) {
    let bankerView = item.documentUrlDTOS[0].docUrl;
    window.open(bankerView)
  }

  // raise additional document
  OpenAdditionalDocModal(template: any) {
    const initialState: ModalOptions = {
      class: 'file-modal-custom-width',
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef1 = this.modalService.show(template, initialState);
  }

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
  // end additional document
}



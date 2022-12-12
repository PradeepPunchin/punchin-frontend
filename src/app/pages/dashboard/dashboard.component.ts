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
  pageSize: number = 10;
  onStep: number = 0;
  cordListData: any = []
  cardList: any
  isShow: boolean = true
  verifierCardList: any
  verifiercordListData: any = []
  innerStep: number = 0
  isShowFileUploaded: boolean = true
  bankerData: any;
  verifierData: any
  isRemove: boolean = false
  // bsModalRef?: BsModalRef;


  constructor(
    private sessionServive: SessionService,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private router: Router,
    private eventService: EventService,
    private utilitiesService: UtilityService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
  ) { }

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
  }

  onGetUploadedFile(event: any) {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
    }

    this.isShow = event.length > 0 ? false : true;
    setTimeout(() => {
      this.getClaimList();
    }, 1000);
  }

  showCardDetails(data: any) {
    this.bankerData = data;
    this.apiService.getCardList(data, this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.cardList = res?.data
        this.cordListData = res?.data.content
        this.totalrecords = res?.data.totalRecords
        if (this.cordListData.length > 0) {
          this.isShow = false
        }
      }
    })
  }

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

  getClaimList() {
    this.apiService.getClaimList(this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.claimList = res?.data
        this.claimListContent = res?.data.content
        this.totalrecords = res?.data.totalElements
      }
    })
  }

  deleteClaim() {
    this.apiService.discardClaims().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.getClaimList();
        this.isShowFileUploaded = true;
        this.isShow = true
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong")
    })
  }

  viewUnderVerification() {
    this.router.navigate(['/pages/document-verification'])

  }

  submitClaim() {
    this.apiService.submitClaims().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.router.navigate(['/pages/claim-documentation'])
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong")
    })
  }
  downloadMISFile(data: any) {
    this.apiService.downloadMISFile(data).subscribe((res: any) => {
      if (res?.isSuccess) {
        console.log(res, "res");

      }
    })
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
    })
  }
  //  verifier card api
  verifierCardDetails(data: any) {
    this.verifierData = data;
    if (data === 'UNDER_VERIFICATION') {
      this.router.navigate(['/pages/document-verification'])
    } else {
      this.apiService.getVerifierClaimsData(data, this.pageNo, this.pageSize).subscribe((res: any) => {
        if (res?.isSuccess) {
          this.verifierCardList = res?.data
          this.verifiercordListData = res?.data.content
          this.totalrecords = res?.data.totalRecords
        }
      })
    }
  }


  //pagination
  pageChanged(event: PageChangedEvent) {
    console.log(event, "event");

    if (this.claimList && this.claimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimList();
    }
    if (this.cardList && this.cardList.length !== this.totalrecords && this.bankerData === 'ALL') {
      this.pageNo = event.page - 1;
      this.showCardDetails("ALL");
    } else if (this.cardList && this.cardList.length !== this.totalrecords && this.bankerData === 'WIP') {
      this.pageNo = event.page - 1;
      this.showCardDetails("WIP");
    } else if (this.cardList && this.cardList.length !== this.totalrecords && this.bankerData === 'SETTLED') {
      this.pageNo = event.page - 1;
      this.showCardDetails("SETTLED");
    }
    if (this.verifierCardList && this.verifierCardList.length !== this.totalrecords && this.verifierData === 'SUBMITTED_TO_INSURER') {
      this.pageNo = event.page - 1;
      this.verifierCardDetails("SUBMITTED_TO_INSURER");
    } else if (this.verifierCardList && this.verifierCardList.length !== this.totalrecords && this.verifierData === 'WIP') {
      this.pageNo = event.page - 1;
      this.verifierCardDetails("WIP")
    } else if (this.verifierCardList && this.verifierCardList.length !== this.totalrecords && this.verifierData === 'DISCREPENCY') {
      this.pageNo = event.page - 1;
      this.verifierCardDetails("DISCREPENCY")
    } else if (this.verifierCardList && this.verifierCardList.length !== this.totalrecords && this.verifierData === 'ALL') {
      this.pageNo = event.page - 1;
      this.verifierCardDetails("ALL")
    }
  }
  // if (this.verifierCardList && this.verifierCardList.length !== this.totalrecords && this.verifierData === 'UNDER_VERIFICATION') {
  //   this.pageNo = event.page - 1;
  //   this.verifierCardDetails("UNDER_VERIFICATION");
  // } else

  // pagePerData(event: any) {
  //   console.log(event, "event");
  //   this.pageSize = event.target.value
  //   this.showCardDetails('ALL');
  // }

  // openModal(id: any) {
  //   const initialState: ModalOptions = {
  //     initialState: {
  //       documentVerificationRequestId: id,
  //     },
  //     class: 'modal-custom-width'
  //   };
  //   this.bsModalRef = this.modalService.show(DocumentVerificationRequestModalComponent, initialState);
  // }

  openModal1(template: any) {
    this.isShowFileUploaded = false;
    const initialState: ModalOptions = {
      class: 'file-modal-custom-width'
    };
    this.bsModalRef = this.modalService.show(template, initialState);
  }
  closeModal() {
    this.bsModalRef.hide()
    this.isShowFileUploaded = true;
  }
}



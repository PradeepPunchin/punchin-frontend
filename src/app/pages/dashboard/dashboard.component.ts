import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiResponse } from 'src/app/models/common';
import { BANKERSTATUSENUM, ROLES, STORAGETOKENENUM } from 'src/app/models/enums';
import { ApiService } from 'src/app/services/api/api.service';
import { EventService } from 'src/app/services/event/event.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UtilityService } from 'src/app/services/utility/utility.service';


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
  claimList: any
  claimListContent: any = []
  totalrecords!: number;
  pageNo: number = 0;
  pageSize: number = 10;
  onStep: number = 0;
  cordListData: any = []
  cardList: any
  cordListWipData: any = []
  cordListsetlledData: any = []
  isShow: boolean = true



  constructor(
    private sessionServive: SessionService,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private router: Router,
    private eventService: EventService,
    private utilitiesService: UtilityService
  ) { }

  ngOnInit(): void {
    this.role = this.sessionServive.getSession(STORAGETOKENENUM.role)
    if (this.role === ROLES.banker) {
      this.getBankerDashboardData();
      this.showCardDetails('ALL')
    }
  }

  onGetUploadedFile(event: any) {
    this.getClaimList();
    if (event.length > 0) {
      this.isShow = false
    }
  }

  showCardDetails(data: any) {
    this.apiService.getCardList(data, this.pageNo, this.pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.cardList = res?.data
        this.cordListData = res?.data.content
        this.totalrecords = res?.data.totalElements
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
        console.log(this.claimListContent.length, "length");
      }
    })
  }

  deleteClaim() {
    this.apiService.discardClaims().subscribe((res: any) => {
      if (res?.isSuccess) {
        this.notifierService.showSuccess(res?.message)
        this.getClaimList();
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong")
    })
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

  //pagination
  pageChanged(event: PageChangedEvent) {
    if (this.claimList && this.claimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimList();
    }
    if (this.cardList && this.cardList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.showCardDetails("ALL");
    }
    else if (this.cardList && this.cardList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.showCardDetails("WIP");
    }
    else if (this.cardList && this.cardList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.showCardDetails("SETTLED");
    }
  }
}



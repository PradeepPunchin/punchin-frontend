import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/common';
import { BANKERSTATUSENUM, ROLES, STORAGETOKENENUM } from 'src/app/models/enums';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: any
  bankerDashboardData: {
    [key:string]: BANKERSTATUSENUM
  } = {};
  bankerStatusEnum = BANKERSTATUSENUM
  bsModalRef?: BsModalRef;

  constructor(
    private sessionServive: SessionService,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.role = this.sessionServive.getSession(STORAGETOKENENUM.role)
    if(this.role === ROLES.banker) {
      this.getBankerDashboardData();
    }
  }

  getBankerDashboardData() {
    this.apiService.getBankerDashboardData().subscribe((res: ApiResponse<any> | any) => {
      if(res?.isSuccess) {
        this.bankerDashboardData =  res?.data;
      } else {
        this.notifierService.showError(res?.message || "Something went wrong");
      }
    }, (error: any) => {
      this.notifierService.showError(error?.error?.message || "Something went wrong");
    })
  }

  openModal(){
    // const initialState: ModalOptions = {
    //   initialState: {
    //     list: [
    //       'Open a modal with component',
    //       'Pass your data',
    //       'Do something else',
    //       '...'
    //     ],
    //     title: 'Modal with component'
    //   }
    // };
    // this.bsModalRef = this.modalService.show(initialState);
  }
}



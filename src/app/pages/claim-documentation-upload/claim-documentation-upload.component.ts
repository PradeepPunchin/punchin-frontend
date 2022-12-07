import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiService } from 'src/app/services/api/api.service';
import { EventService } from 'src/app/services/event/event.service';
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


  constructor(
    private apiService: ApiService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.getClaimSubmiitedList();
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
  //pagination
  pageChanged(event: PageChangedEvent) {
    if (this.submittedClaimList && this.submittedClaimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimSubmiitedList();
    }
  }
}

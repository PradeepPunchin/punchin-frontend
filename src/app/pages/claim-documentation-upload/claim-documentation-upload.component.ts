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
  pageNo: number = 1;
  pageSize: number = 10;
  submittedClaimList: any;
  submittedclaimListContent: any = []
  maxSize: number = 5;


  constructor(
    private apiService: ApiService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.getClaimSubmiitedList(this.pageNo, this.pageSize);
  }

  getClaimSubmiitedList(pageNo: number, pageSize: number) {
    this.apiService.getClaimSubmiitedList(pageNo, pageSize).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.submittedClaimList = res?.data
        this.submittedclaimListContent = res?.data.content
        this.totalrecords = res?.data.totalElements
        console.log(this.totalrecords, " this.totalrecords");

      }
    })
  }
  //pagination
  pageChanged(event: PageChangedEvent) {
    if (this.submittedClaimList && this.submittedClaimList.length !== this.totalrecords) {
      this.pageNo = event.page - 1;
      this.getClaimSubmiitedList(this.pageNo, this.pageSize);
    }
  }
}

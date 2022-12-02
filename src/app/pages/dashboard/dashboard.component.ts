import { Component, OnInit } from '@angular/core';
import { STORAGETOKENENUM } from 'src/app/models/enums';
import { SessionService } from 'src/app/services/session/session.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: any


  constructor(private sessionServive: SessionService
  ) { }

  ngOnInit(): void {
    this.role = this.sessionServive.getSession(STORAGETOKENENUM.role)
  }
}



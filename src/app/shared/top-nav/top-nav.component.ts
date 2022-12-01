import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  role: any

  constructor(
    private sessionServive: SessionService,
    private notifierService: NotifierService,
    private router: Router,
    private apiService: ApiService,

  ) { }

  ngOnInit(): void {
    this.role = this.sessionServive.getSession("role")
  }

  logout() {
    this.apiService.logout().subscribe((res: any) => {
      this.sessionServive.removeSessions()
      this.router.navigate(['/']);
      this.notifierService.showSuccess("logout Successful")
    })

  }

}

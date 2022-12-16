import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavItem } from 'src/app/models/common';
import { ROLES, STORAGETOKENENUM } from 'src/app/models/enums';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  role: any;
  userId: any
  isProfileOptionVisible: boolean = false;

  navLinks: INavItem[] = [
    {
      id: 1,
      icon: `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M2.5 7.5013L10 1.66797L17.5 7.5013V16.668C17.5 17.11 17.3244 17.5339 17.0118 17.8465C16.6993 18.159 16.2754 18.3346 15.8333 18.3346H4.16667C3.72464 18.3346 3.30072 18.159 2.98816 17.8465C2.67559 17.5339 2.5 17.11 2.5 16.668V7.5013Z"
          stroke="#134E85" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.5 18.3333V10H12.5V18.3333" stroke="#134E85" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>`,
      link: '/pages/dashboard',
      name: 'Dashboard'
    }
  ]

  constructor(
    private sessionServive: SessionService,
    private notifierService: NotifierService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.role = this.sessionServive.getSession(STORAGETOKENENUM.role)
    this.userId = this.sessionServive.getSession(STORAGETOKENENUM.userId)
    if (this.role === ROLES.banker) {
      this.navLinks.push({
        id: 2,
        icon: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2279_4179)">
                            <path
                                d="M13 2.5V5.83333C13 6.05435 13.0878 6.26631 13.2441 6.42259C13.4004 6.57887 13.6123 6.66667 13.8333 6.66667H17.1667"
                                stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M15.5 14.1667H9.66667C9.22464 14.1667 8.80072 13.9911 8.48816 13.6785C8.1756 13.366 8 12.942 8 12.5V4.16667C8 3.72464 8.1756 3.30072 8.48816 2.98816C8.80072 2.67559 9.22464 2.5 9.66667 2.5H13L17.1667 6.66667V12.5C17.1667 12.942 16.9911 13.366 16.6785 13.6785C16.366 13.9911 15.942 14.1667 15.5 14.1667Z"
                                stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M13.8332 14.1654V15.832C13.8332 16.2741 13.6576 16.698 13.345 17.0105C13.0325 17.3231 12.6085 17.4987 12.1665 17.4987H6.33317C5.89114 17.4987 5.46722 17.3231 5.15466 17.0105C4.8421 16.698 4.6665 16.2741 4.6665 15.832V7.4987C4.6665 7.05667 4.8421 6.63275 5.15466 6.32019C5.46722 6.00763 5.89114 5.83203 6.33317 5.83203H7.99984"
                                stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2279_4179">
                                <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                        </svg>`,
        link: '/pages/claim-documentation',
        name: 'Claims Documentation Upload'
      })
    }

    if (this.role === ROLES.verifier) {
      this.navLinks.push({
        id: 2,
        icon: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2279_4179)">
                            <path
                                d="M13 2.5V5.83333C13 6.05435 13.0878 6.26631 13.2441 6.42259C13.4004 6.57887 13.6123 6.66667 13.8333 6.66667H17.1667"
                                stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M15.5 14.1667H9.66667C9.22464 14.1667 8.80072 13.9911 8.48816 13.6785C8.1756 13.366 8 12.942 8 12.5V4.16667C8 3.72464 8.1756 3.30072 8.48816 2.98816C8.80072 2.67559 9.22464 2.5 9.66667 2.5H13L17.1667 6.66667V12.5C17.1667 12.942 16.9911 13.366 16.6785 13.6785C16.366 13.9911 15.942 14.1667 15.5 14.1667Z"
                                stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M13.8332 14.1654V15.832C13.8332 16.2741 13.6576 16.698 13.345 17.0105C13.0325 17.3231 12.6085 17.4987 12.1665 17.4987H6.33317C5.89114 17.4987 5.46722 17.3231 5.15466 17.0105C4.8421 16.698 4.6665 16.2741 4.6665 15.832V7.4987C4.6665 7.05667 4.8421 6.63275 5.15466 6.32019C5.46722 6.00763 5.89114 5.83203 6.33317 5.83203H7.99984"
                                stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2279_4179">
                                <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                        </svg>`,
        link: '/pages/document-verification',
        name: 'Document Verification Requests'
      })
    }
  }

  ngOnInit(): void { }

  logout() {
    this.sessionServive.removeSessions()
    this.apiService.logout().subscribe((res: any) => {
      this.router.navigate(['/']);
      this.notifierService.showSuccess("logout Successful")
    })

  }

}

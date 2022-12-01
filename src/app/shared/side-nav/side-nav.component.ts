import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavItem } from 'src/app/models/common';
import { NotifierService } from 'src/app/services/notifier/notifier.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  visibleSidebar: any;
  public sidebarShow: boolean = false;

  navItems: INavItem[] = [
    
  ];

  
  constructor(
    private router: Router,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.router.navigate(['/']);
  }

}

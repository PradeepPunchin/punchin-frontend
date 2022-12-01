import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    SideNavComponent,
    NoDataFoundComponent,
    TopNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    NoDataFoundComponent,
    FooterComponent,
    TopNavComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';



@NgModule({
  declarations: [
    SideNavComponent,
    NoDataFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    NoDataFoundComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    NoDataFoundComponent,
    TopNavComponent,
    FooterComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [
    NoDataFoundComponent,
    FooterComponent,
    TopNavComponent,
    FileUploadComponent
  ]
})
export class SharedModule { }

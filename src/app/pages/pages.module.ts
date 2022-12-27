import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClaimDocumentationUploadComponent } from './claim-documentation-upload/claim-documentation-upload.component';
import { DocumentVerificationRequestComponent } from './document-verification-request/document-verification-request.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';
import { RemoveunderscorePipe } from '../services/helper/removeunderscore.pipe';



@NgModule({
  declarations: [
    DashboardComponent,
    ClaimDocumentationUploadComponent,
    DocumentVerificationRequestComponent,
    RemoveunderscorePipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    SharedModule,

  ]
})
export class PagesModule { }

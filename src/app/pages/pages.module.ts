import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClaimDocumentationUploadComponent } from './claim-documentation-upload/claim-documentation-upload.component';
import { DocumentVerificationRequestComponent } from './document-verification-request/document-verification-request.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ClaimDocumentationUploadComponent,
    DocumentVerificationRequestComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }

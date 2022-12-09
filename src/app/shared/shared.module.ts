import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DirectivesModule } from '../directives/directives.module';

import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DocumentVerificationRequestModalComponent } from './modals/document-verification-request-modal/document-verification-request-modal.component';
import { DocumentRejectModalComponent } from './modals/document-reject-modal/document-reject-modal.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    NoDataFoundComponent,
    TopNavComponent,
    FooterComponent,
    FileUploadComponent,
    DocumentVerificationRequestModalComponent,
    PdfViewerComponent,
    DocumentRejectModalComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
    PdfViewerModule
  ],
  exports: [
    NoDataFoundComponent,
    FooterComponent,
    TopNavComponent,
    FileUploadComponent,
    DocumentVerificationRequestModalComponent,
    PdfViewerComponent,
  ]
})
export class SharedModule { }

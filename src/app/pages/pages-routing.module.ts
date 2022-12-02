import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { ClaimDocumentationUploadComponent } from './claim-documentation-upload/claim-documentation-upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentVerificationRequestComponent } from './document-verification-request/document-verification-request.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'document-verification',
    component: DocumentVerificationRequestComponent
  },
  {
    path: 'claim-documentation',
    component: ClaimDocumentationUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

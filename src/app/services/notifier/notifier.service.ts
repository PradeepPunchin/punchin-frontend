import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(text: string, title = 'Success'): void {
    this.toastr.info(text, title);

  }
  showError(text: string, title = 'Error'): void {
    this.toastr.error(text, title);
  }

  showInfo(text: string, title = 'Info'): void {
    this.toastr.info(text, title);
  }
}

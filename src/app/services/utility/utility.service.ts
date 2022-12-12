import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  checkFileUpload: any;


  constructor() { }

  setuploadFile(checked: boolean) {
    this.checkFileUpload = checked
  }
  getuplaodFile() {
    return this.checkFileUpload;
  }
}

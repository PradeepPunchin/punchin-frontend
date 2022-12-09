import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFile = null;
  profileDocument: any = [];
  fileUpload: boolean = false;
  file: any;
  pageNo: number = 0;
  pageSize: number = 10;
  isShowLoader: boolean = false
  isShowFile: boolean = true


  @Output() AwsFileList: EventEmitter<any> = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private notifierService: NotifierService,
    private dashboard: DashboardComponent
  ) { }

  ngOnInit(): void {

  }

  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  /**
   * handle file from browsing
   */
  async fileBrowseHandler(event: any) {
    this.isShowLoader = true
    this.prepareFilesList(event.target.files);
    this.file = event.target.files[0];
    const files: any[] = event.target.files;
    this.fileUpload = false;
    this.isShowFile = false
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const formData: FormData = new FormData();
        formData.append('multipartFile', this.files[i], this.files[i].name);
        const fileUploadRes = await this.apiService.uploadUserDocument(formData).subscribe((res: any) => {
          if (res?.isSuccess) {
            this.fileUpload = true;
            this.notifierService.showSuccess(res.data.message);
            this.profileDocument.push(fileUploadRes);
            this.isShowLoader = false
            this.AwsFileList.emit(this.profileDocument);
          }
        }, (error: any) => {
          this.notifierService.showError(error?.error?.message || "Something went wrong");
        })
      }
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: any) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFileToAWS() {

  }

}

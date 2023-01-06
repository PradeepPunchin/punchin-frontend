import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFile = null;
  fileUpload: boolean = false;
  file: any;
  pageNo: number = 0;
  pageSize: number = 10;
  isShowLoader: boolean = false
  isShowFile: boolean = true


  @Output() AwsFileList: EventEmitter<any> = new EventEmitter();
  percentage: number = 0;
  modalRef?: BsModalRef;

  constructor(
    private httpClient: HttpClient,
    private notifierService: NotifierService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

  }

  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped(event: any, template: any) {
    this.prepareFilesList(event);
    this.fileBrowseHandler(event, template, 'drag')
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any, template: any, uploadMethod: string) {
    // this.isShowLoader = true
    this.modalRef = this.modalService.show(template);
    if (uploadMethod === 'drag') {
      this.prepareFilesList(event);
      this.file = event;
    } else {
      this.prepareFilesList(event.target.files);
      this.file = event.target.files[0];
    }

    const files: any[] = uploadMethod === 'drag' ? [event] : event.target.files;
    this.fileUpload = false;
    this.isShowFile = false
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const formData: FormData = new FormData();
        formData.append('multipartFile', this.files[i], this.files[i].name);
        this.httpClient.post(`${environment.api.baseApiRoot}banker/claim/upload`, formData, {
          reportProgress: true,
          observe: 'events'
        }).subscribe((events: any) => {
          if (events && events.type === HttpEventType.UploadProgress) {
            this.percentage = Math.round(events.loaded / events.total * 100)
          } else if (events.type === HttpEventType.Response) {
            // console.log('events', events);
            this.fileUpload = true;
            this.notifierService.showSuccess(events.body.message);
            this.isShowLoader = false
            this.modalRef?.hide();
            this.AwsFileList.emit([...events.body.data]);
          }
        }, (error: any) => {
          this.percentage = 0;
          this.modalRef?.hide();
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
    this.files = [];
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

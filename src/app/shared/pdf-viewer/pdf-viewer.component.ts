import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnChanges {

  @Input() docUrl: string = ""

  pdfSrc: string = "this.docUrl";
  data: any

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.docUrl, "url");
  }

}
// https://punchin-dev.s3.amazonaws.com/1670511632533-Rapd.jpg
// https://punchin-dev.s3.amazonaws.com/1670511632647-BaUD.pdf
// https://punchin-dev.s3.amazonaws.com/1670511632692-yabH.xlsx
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnChanges {

  @Input() docUrl: string = ""
  @Input() docType: string = ""

  pdfSrc: string = "this.docUrl";
  data: any

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.docUrl, "docUrl");
    console.log(this.docType, "doctype");


  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {

  pdfSrc: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit, OnChanges {
  @Input() docUrl: string = ""
  @Input() docType: string = ""
  showData: boolean = true
  DocUrl: string = ""



  viewer = 'google';
  selectedType = 'txt';
  // DemoDoc = "https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt"

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.showData = true
    setTimeout(() => {
      if (this.DocUrl = this.docUrl) {
        this.showData = false
      }
    }, 9000);
  }
}



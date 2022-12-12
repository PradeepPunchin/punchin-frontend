import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {

  viewer = 'google';  
  selectedType = 'txt';   
  DemoDoc="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt"  

  constructor() { }

  ngOnInit(): void {
  }

}

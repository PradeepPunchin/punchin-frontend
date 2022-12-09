import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-uplaod-file',
  templateUrl: './uplaod-file.component.html',
  styleUrls: ['./uplaod-file.component.scss']
})
export class UplaodFileComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.scss']
})
export class FileviewComponent implements OnInit {
  public fileExtention: string = "";
  public fileName: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    if (!!this.data && this.data !== null && this.data !== '') {
      if (!!this.data['isView']) {
        this.fileExtention = this.data['exte'];
      } else {
        this.fileExtention = this.data['exte'].split('.')[1];
      }
      this.fileName = this.data['file'];
    }
  }
}

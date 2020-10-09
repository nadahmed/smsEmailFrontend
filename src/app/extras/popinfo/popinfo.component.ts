import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogInfoData {
    icon: string;
    tile: string;
    message: string;
}

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss']
})
export class PopinfoComponent {

  constructor(
        public dialogRef: MatDialogRef<PopinfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogInfoData) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

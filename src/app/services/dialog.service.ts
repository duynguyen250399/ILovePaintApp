import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = msg;

    return this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }
}

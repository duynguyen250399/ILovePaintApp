import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(msg, action){
    let snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 3000;
    snackBarConfig.horizontalPosition = "left";
    snackBarConfig.verticalPosition = "bottom";

    this.snackBar.open(msg, action, snackBarConfig);
  }
}

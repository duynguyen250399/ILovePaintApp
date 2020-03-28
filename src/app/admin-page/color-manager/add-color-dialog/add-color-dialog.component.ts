import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Color } from 'src/app/models/color.model';
import { ColorService } from 'src/app/services/color.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-color-dialog',
  templateUrl: './add-color-dialog.component.html',
  styleUrls: ['./add-color-dialog.component.css']
})
export class AddColorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddColorDialogComponent>,
  private colorService: ColorService,
  private snackBarService: SnackBarService) { }


  public color = '';
  public colorName: string = '';
  public msg: string;

  ngOnInit() {
  }

  isValidForm(){
    return this.color && this.colorName;
  }

  addColor(){
    let productId = this.data;
    let color: Color = {
      colorCode: this.color,
      name: this.colorName,
      productID: productId
    }

    this.colorService.addColor(color)
    .subscribe(
      res => {
        this.msg = '';
        console.log(res);
        this.colorService.loadColors(this.data);
        this.snackBarService.showSnackBar('Color added', 'CLOSE');
        this.dialogRef.close();
      },
      err => {
        console.log(err);
        this.msg = err.error.message;
      }
    )
  }

}

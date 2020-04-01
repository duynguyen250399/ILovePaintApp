import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ValidationPatterns } from 'src/helpers/helper';

@Component({
  selector: 'app-color-details-dialog',
  templateUrl: './color-details-dialog.component.html',
  styleUrls: ['./color-details-dialog.component.css']
})
export class ColorDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ColorDetailsDialogComponent>,
    private colorService: ColorService,
    private snackBarService: SnackBarService) { }

  public color: string;
  public colorName: string;
  public editErr: string = '';

  ngOnInit() {
    this.color = this.data.color.colorCode;
    this.colorName = this.data.color.name;
  }

  onSave() {
    let canUpdate = true;
    if (this.colorName) {
      let color: Color = {
        id: this.data.color.id,
        name: this.colorName,
        colorCode: this.color,
        productID: this.data.color.productID
      }
      
      if (this.colorName != this.data.color.name) {
        this.data.colorList.forEach(c => {
          if (c.name == this.colorName) {
            this.editErr = 'This color is already existed!';
            canUpdate = false;
          }
        });
      }

      if(this.color != this.data.color.colorCode){
        this.data.colorList.forEach(c => {
          if (c.colorCode == this.color) {
            this.editErr = 'This color code is already existed!';
            canUpdate = false;
          }
        });
      }

      if (canUpdate) {
        this.colorService.updateColor(color)
          .subscribe(
            res => {
              this.editErr = '';
              this.colorService.loadColors(this.data.color.productID);
              this.snackBarService.showSnackBar('Color updated', 'CLOSE');
              this.dialogRef.close();
            },
            err => {
              console.log(err);
              this.editErr = err.error.message;
            }
          )
      }
    }
  }

  isValidForm() {
    return this.color && this.colorName && this.isValidColorName();
  }

  isValidColorName() {
    return this.colorName.match(ValidationPatterns.colorNameRegex);
  }

  onDelete() {
    this.colorService.deleteColor(this.data.id)
      .subscribe(
        res => {
          this.colorService.loadColors(this.data.productID);
          this.snackBarService.showSnackBar('Color deleted', 'CLOSE');
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      )
  }

}

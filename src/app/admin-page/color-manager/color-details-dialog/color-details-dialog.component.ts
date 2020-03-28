import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-color-details-dialog',
  templateUrl: './color-details-dialog.component.html',
  styleUrls: ['./color-details-dialog.component.css']
})
export class ColorDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private colorService: ColorService,
  private snackBarService: SnackBarService) { }

  public color;
  public colorName;

  ngOnInit() {
    this.color = this.data.colorCode;
    this.colorName = this.data.name
  }

  onSave(){
    if(this.colorName){
      let color: Color = {
        id: this.data.id,
        name: this.colorName,
        colorCode: this.color,
        productID: this.data.productID
      }

      this.colorService.updateColor(color)
      .subscribe(
        res =>{
          this.colorService.loadColors(this.data.productID);
          this.snackBarService.showSnackBar('Color updated', 'CLOSE');
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  onDelete(){
    this.colorService.deleteColor(this.data.id)
    .subscribe(
      res =>{
        this.colorService.loadColors(this.data.productID);
        this.snackBarService.showSnackBar('Color deleted', 'CLOSE');
      },
      err =>{
        console.log(err);
      }
    )
  }

}

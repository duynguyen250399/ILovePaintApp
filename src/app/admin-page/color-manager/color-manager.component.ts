import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddColorDialogComponent } from './add-color-dialog/add-color-dialog.component';
import { ColorDetailsDialogComponent } from './color-details-dialog/color-details-dialog.component';

@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.css']
})
export class ColorManagerComponent implements OnInit {

  constructor(private productService: ProductService,
    private colorService: ColorService,
    private dialog: MatDialog) { }

  public productID = '';
  public colors: Color[];

  ngOnInit() {
    this.productService.refreshProductList();
  }

  onProductChange(){
    if(this.productID){
      this.colorService.loadColors(this.productID);     
    }
    else{
      this.colors = [];
    }
    
  }

  openAddColorDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = this.productID;
    this.dialog.open(AddColorDialogComponent, dialogConfig);
  }

  openColorDetailsDialog(color){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = color;
    this.dialog.open(ColorDetailsDialogComponent, dialogConfig);
  }

}

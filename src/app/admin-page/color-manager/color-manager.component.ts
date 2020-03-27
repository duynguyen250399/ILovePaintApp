import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color.model';

@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.css']
})
export class ColorManagerComponent implements OnInit {

  constructor(private productService: ProductService,
    private colorService: ColorService) { }

  public productID = '';
  public colors: Color[];

  ngOnInit() {
    this.productService.refreshProductList();
  }

  onProductChange(){
    if(this.productID){
      this.colorService.getColors(this.productID)
      .subscribe(
        res => {
          this.colors = res as Color[];
          console.log(this.colors);
        },
        err => console.log(err)
      )
    }
    else{
      this.colors = [];
    }
    
  }

}

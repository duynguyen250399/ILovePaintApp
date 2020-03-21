import { Component, OnInit, Input } from '@angular/core';
import { formatNumber } from 'src/helpers/helper';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  constructor() { }

  private defaultImage = '/assets/images/default_product.png';
  public formatedPrice : string;

  @Input() product;

  ngOnInit() {
    if(this.product.image == null){
      this.product.image = this.defaultImage;
    }
    // this.formatedPrice = formatNumber(this.product.price);
  }

}

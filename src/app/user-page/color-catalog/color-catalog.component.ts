import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color.model';

@Component({
  selector: 'app-color-catalog',
  templateUrl: './color-catalog.component.html',
  styleUrls: ['./color-catalog.component.css']
})
export class ColorCatalogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private colorService: ColorService) { }

  public colors: Color[] = [];

  ngOnInit() {
    this.colorService.getColors(this.data)
    .subscribe(
      res =>{
        this.colors = res as Color[];
      },
      err => {
        console.log(err);
      }
    )
  }

}

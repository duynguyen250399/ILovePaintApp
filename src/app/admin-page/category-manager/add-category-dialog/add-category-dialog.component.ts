import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  public categoryName: string;

  ngOnInit() {
  }

  addCategory(){
    if(this.categoryName){
      let category : Category = {
        name: this.categoryName
      }
      this.categoryService.addCategory(category);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { nonAccentVietnamese } from 'src/helpers/helper';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.categoryService.refreshCategoryList();
  }

  onDeleteClick(id){
    this.categoryService.deleteCategory(id);
  }

  filterCategories(value: string){
    if(!this.categoryService.categoryList){
      return;
    }

    let filterResult = [];
    let filterValue = value.toLowerCase().trim();
    
    this.categoryService.categoryList.forEach(category => {
      let name: string = nonAccentVietnamese(category.name);
    
      if(name.includes(filterValue)){
        filterResult.push(category);
      }
    });
    
    if(value){
      this.categoryService.categoryList = filterResult;
    }
    else{
      this.categoryService.refreshCategoryList();
    }
    
  }

  openAddCategoryDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(AddCategoryDialogComponent);
  }

  openEditCategoryDialog(category){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.data = category;
    this.dialog.open(EditCategoryDialogComponent, dialogConfig);
  }

  nextChunk() {
    if (!this.categoryService.categoryList || this.categoryService.categoryList.length == 0) {
      return;
    }
    this.categoryService.stopPrev = false;

    this.categoryService.currentChunkIndex = this.categoryService.currentChunkIndex + 1;

    if (this.categoryService.currentChunkIndex >= this.categoryService.pageItems.length - 1) {
      this.categoryService.stopNext = true;
    }
  }

  prevChunk() {

    if (!this.categoryService.categoryList || this.categoryService.categoryList.length == 0) {
      return;
    }

    this.categoryService.stopNext = false;

    this.categoryService.currentChunkIndex = this.categoryService.currentChunkIndex - 1;

    if (this.categoryService.currentChunkIndex <= 0) {
      this.categoryService.stopPrev = true;
    }
  }

}

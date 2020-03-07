import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(private categoryService: CategoryService, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public editCategoryForm: FormGroup;

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name]
    });
  }

  updateCategory(){
    let category: Category = this.editCategoryForm.value as Category;
    this.categoryService.updateCategory(category);
  }

}

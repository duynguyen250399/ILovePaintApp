import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    public loading = false;

  public editCategoryForm: FormGroup;

  ngOnInit() {
    this.editCategoryForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name]
    });
  }

  updateCategory(){
    this.loading = true;
    let category: Category = this.editCategoryForm.value as Category;
    category.name = category.name.trim();
    this.categoryService.updateCategory(category)
    .subscribe(
      res => {
        this.categoryService.refreshCategoryList();
        this.loading = false;
        this.snackBarService.showSnackBar('Category updated', 'CLOSE');
        this.dialogRef.close();
      },
      err =>{
        console.log(err);
        this.loading = false;
        this.snackBarService.showSnackBar('Error!', 'CLOSE');
      }
    )
    
  }

}

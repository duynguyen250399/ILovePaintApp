import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private snackBarService: SnackBarService,
    private fb: FormBuilder) { }

  public addCategoryForm: FormGroup;

  ngOnInit() {
    this.addCategoryForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.noSpecialCharsWithVietnameseRegex)
      ]]
    })
  }

  get nameControl(): FormControl{
    return this.addCategoryForm.controls.name as FormControl;
  }

  addCategory(){
    if(this.addCategoryForm.value.name){
      let category : Category = {
        name: this.addCategoryForm.value.name
      }
      this.categoryService.addCategory(category);
      this.snackBarService.showSnackBar('Category added', 'CLOSE');
    }
  }

}

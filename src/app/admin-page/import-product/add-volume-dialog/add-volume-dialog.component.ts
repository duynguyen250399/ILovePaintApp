import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductVolume } from 'src/app/models/product-volume.model';
import { ProductVolumeService } from 'src/app/services/product-volume.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-volume-dialog',
  templateUrl: './add-volume-dialog.component.html',
  styleUrls: ['./add-volume-dialog.component.css']
})
export class AddVolumeDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private productVolumeService: ProductVolumeService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<AddVolumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public addVolumeForm: FormGroup;
  public err: string;
  public loading = false;

  get volumeControl(){
    return this.addVolumeForm.get('volume');
  }

  get priceControl(){
    return this.addVolumeForm.get('price');
  }

  get quantityControl(){
    return this.addVolumeForm.get('quantity');
  }

  ngOnInit() {
    this.addVolumeForm = this.fb.group({
      productId: [this.data],
      volume: ['', [
        Validators.required, 
        Validators.pattern(ValidationPatterns.positiveNumberRegex)
      ]],
      price: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.positiveNumberWithOneDotRegex)
      ]],
      quantity: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.positiveNumberRegex)
      ]]
    });
  }

  onSave(){
    this.loading = true;
    let productVolume: ProductVolume = {
      productID: this.addVolumeForm.get('productId').value,
      price: this.priceControl.value,
      quantity: this.quantityControl.value,
      volumeValue: this.volumeControl.value,
      status: this.quantityControl.value > 0 ? 1 : 0
    }

    this.productVolumeService.addProductVolume(productVolume)
    .subscribe(
      res => {
        this.loading = false;
        this.snackBarService.showSnackBar('Product Volume added', 'CLOSE');
        this.dialogRef.close();
        location.reload();
      },
      err => {
        this.loading = false;
        this.err = err.error.message;
        console.log(err)
      }
    )
  }

}

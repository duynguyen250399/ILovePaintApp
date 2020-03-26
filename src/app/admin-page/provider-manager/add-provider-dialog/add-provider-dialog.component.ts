import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ProviderModel } from 'src/app/models/provider.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-provider-dialog',
  templateUrl: './add-provider-dialog.component.html',
  styleUrls: ['./add-provider-dialog.component.css']
})
export class AddProviderDialogComponent implements OnInit {

  constructor(private providerService: ProviderService,
    private snackBarService: SnackBarService,
    private fb: FormBuilder) { }

  public addProviderForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(ValidationPatterns.noSpecialCharsWithVietnameseRegex)
    ]],
    phone: ['', [
      Validators.required,
      Validators.pattern(ValidationPatterns.phoneNumberRegex)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    address: ['']
  });

  ngOnInit() {
  }

  get nameControl(): FormControl{
    return this.addProviderForm.controls.name as FormControl;
  }

  get phoneControl(): FormControl{
    return this.addProviderForm.controls.phone as FormControl;
  }

  get emailControl(): FormControl{
    return this.addProviderForm.controls.email as FormControl;
  }

  addProvider(){
    let provider: ProviderModel = {
      name: this.addProviderForm.value.name,
      phone: this.addProviderForm.value.phone,
      email: this.addProviderForm.value.email,
      address: this.addProviderForm.value.address
    }

    if(provider){
      this.providerService.addProvider(provider);
      this.snackBarService.showSnackBar('Provider added', 'CLOSE');
    }
  }

}

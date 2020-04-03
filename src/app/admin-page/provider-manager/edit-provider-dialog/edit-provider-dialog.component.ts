import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProviderModel } from 'src/app/models/provider.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-edit-provider-dialog',
  templateUrl: './edit-provider-dialog.component.html',
  styleUrls: ['./edit-provider-dialog.component.css']
})
export class EditProviderDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<EditProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    public loading = false;

  public editProviderForm: FormGroup;

  ngOnInit() {
    this.editProviderForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name],
      phone: [this.data.phone],
      email: [this.data.email],
      address: [this.data.address]
    })
  }

  updateProvider() {
    this.loading = true;
    let provider = this.editProviderForm.value as ProviderModel; 
    provider.name = provider.name.trim();
    provider.address = provider.address.trim();
    provider.phone = provider.phone.trim();
    provider.email = provider.email.trim();
    this.providerService.updateProvider(provider)
    .subscribe(
      res =>{
        this.providerService.refreshProviderList();
        this.loading = false;
        this.snackBarService.showSnackBar('Provider updated', 'CLOSE');
        this.dialogRef.close();
      },
      err =>{
        this.loading = false;
        console.log(err);   
        this.snackBarService.showSnackBar('Error!', 'CLOSE');
      }
    )
    
  }

}

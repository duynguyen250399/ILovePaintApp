import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProviderModel } from 'src/app/models/provider.model';

@Component({
  selector: 'app-edit-provider-dialog',
  templateUrl: './edit-provider-dialog.component.html',
  styleUrls: ['./edit-provider-dialog.component.css']
})
export class EditProviderDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    let provider = this.editProviderForm.value as ProviderModel; 
    this.providerService.updateProvider(provider);
  }

}

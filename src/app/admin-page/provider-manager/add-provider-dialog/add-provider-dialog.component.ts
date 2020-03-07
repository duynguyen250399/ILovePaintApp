import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ProviderModel } from 'src/app/models/provider.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-provider-dialog',
  templateUrl: './add-provider-dialog.component.html',
  styleUrls: ['./add-provider-dialog.component.css']
})
export class AddProviderDialogComponent implements OnInit {

  constructor(private providerService: ProviderService,
    private fb: FormBuilder) { }

  public addProviderForm = this.fb.group({
    name: [''],
    phone: [''],
    email: [''],
    address: ['']
  });

  ngOnInit() {
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
    }
  }

}

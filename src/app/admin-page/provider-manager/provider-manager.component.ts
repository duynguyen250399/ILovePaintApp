import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProviderDialogComponent } from './add-provider-dialog/add-provider-dialog.component';
import { nonAccentVietnamese } from 'src/helpers/helper';

@Component({
  selector: 'app-provider-manager',
  templateUrl: './provider-manager.component.html',
  styleUrls: ['./provider-manager.component.css']
})
export class ProviderManagerComponent implements OnInit {

  constructor(private providerService: ProviderService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.providerService.refreshProviderList();
  }

  openAddProviderDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(AddProviderDialogComponent, dialogConfig);
  }

  deleteProvider(id){
    this.providerService.deleteProvider(id);
  }

  filterProviders(value: string){
    if(!this.providerService.providerList){
      return;
    }
    let filterResult = [];
    let filterValue = value.toLowerCase().trim();
   
    this.providerService.providerList.forEach(provider => {
      let name: string = nonAccentVietnamese(provider.name);
      if(name.includes(filterValue)){
        filterResult.push(provider);
      }
    });
  
    if(value){
      this.providerService.providerList = filterResult;
    }
    else{
      this.providerService.refreshProviderList();
    }
    
  }

}

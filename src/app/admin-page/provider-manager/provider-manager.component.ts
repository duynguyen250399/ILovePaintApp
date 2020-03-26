import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProviderDialogComponent } from './add-provider-dialog/add-provider-dialog.component';
import { nonAccentVietnamese } from 'src/helpers/helper';
import { EditProviderDialogComponent } from './edit-provider-dialog/edit-provider-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-provider-manager',
  templateUrl: './provider-manager.component.html',
  styleUrls: ['./provider-manager.component.css']
})
export class ProviderManagerComponent implements OnInit {

  constructor(private providerService: ProviderService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.providerService.refreshProviderList();
  }

  openAddProviderDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(AddProviderDialogComponent, dialogConfig);
  }

  openEditProviderDialog(provider){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.data = provider;

    const dialogRef = this.dialog.open(EditProviderDialogComponent, dialogConfig);
  }

  deleteProvider(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this provider?')
    .afterClosed()
    .subscribe(
      result =>{
        if(result){
          this.providerService.deleteProvider(id);
          this.snackBarService.showSnackBar('Provider deleted', 'CLOSE');
        }
      }
    )
    
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

  nextChunk() {
    if (!this.providerService.providerList || this.providerService.providerList.length == 0) {
      return;
    }
    this.providerService.stopPrev = false;

    this.providerService.currentChunkIndex = this.providerService.currentChunkIndex + 1;

    if (this.providerService.currentChunkIndex >= this.providerService.pageItems.length - 1) {
      this.providerService.stopNext = true;
    }
  }

  prevChunk() {

    if (!this.providerService.providerList || this.providerService.providerList.length == 0) {
      return;
    }

    this.providerService.stopNext = false;

    this.providerService.currentChunkIndex = this.providerService.currentChunkIndex - 1;

    if (this.providerService.currentChunkIndex <= 0) {
      this.providerService.stopPrev = true;
    }
  }

}

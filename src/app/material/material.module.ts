import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatSidenavModule, MatMenuModule,
  MatToolbarModule, MatInputModule, MatFormFieldModule,
  MatIconModule, MatDialogModule, MatListModule, 
  MatProgressSpinnerModule, MatBadgeModule, MatChipsModule
} from "@angular/material";

const MaterialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatDialogModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatChipsModule
]

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

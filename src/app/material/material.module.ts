import { NgModule } from '@angular/core';
import { MatButtonModule, MatSidenavModule, MatMenuModule, 
  MatToolbarModule, MatInputModule, MatFormFieldModule, 
  MatIconModule, MatDialogModule, MatListModule, MatProgressSpinnerModule, MatBadgeModule} from "@angular/material";

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
  MatBadgeModule
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

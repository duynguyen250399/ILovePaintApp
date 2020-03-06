import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './user-page/navbar/navbar.component';
import { AboutUsComponent } from './user-page/about-us/about-us.component';
import { ContactComponent } from './user-page/contact/contact.component';
import { ProductDisplayComponent } from './user-page/product-display/product-display.component';
import { ProductListComponent } from './user-page/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductOrderComponent } from './user-page/product-order/product-order.component';
import { ProviderService } from './services/provider.service';
import { CategoryService } from './services/category.service';
import { ProductManagerComponent } from './admin-page/product-manager/product-manager.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AddProductDialogComponent } from './admin-page/add-product-dialog/add-product-dialog.component';
import { CategoryManagerComponent } from './admin-page/category-manager/category-manager.component';
import { AddCategoryDialogComponent } from './admin-page/add-category-dialog/add-category-dialog.component';
import { ProviderManagerComponent } from './admin-page/provider-manager/provider-manager.component';
import { AddProviderDialogComponent } from './admin-page/add-provider-dialog/add-provider-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutUsComponent,
    ContactComponent,
    ProductDisplayComponent,
    ProductListComponent,
    ProductOrderComponent,
    ProductManagerComponent,
    UserPageComponent,
    AdminPageComponent,
    AddProductDialogComponent,
    CategoryManagerComponent,
    AddCategoryDialogComponent,
    ProviderManagerComponent,
    AddProviderDialogComponent
  ],
  entryComponents: [
    AddProductDialogComponent,
    AddCategoryDialogComponent,
    AddProviderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [ProductService, ProviderService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './user-page/navbar/navbar.component';
import { AboutUsComponent } from './user-page/about-us/about-us.component';
import { ContactComponent } from './user-page/contact/contact.component';
import { ProductDisplayComponent } from './user-page/product-display/product-display.component';
import { ProductListComponent } from './user-page/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductOrderComponent } from './user-page/product-order/product-order.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProviderService } from './services/provider.service';
import { CategoryService } from './services/category.service';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutUsComponent,
    ContactComponent,
    ProductDisplayComponent,
    ProductListComponent,
    ProductOrderComponent,
    AddProductFormComponent,
    ProductManagerComponent,
    UserPageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService, ProviderService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

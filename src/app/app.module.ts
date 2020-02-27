import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductOrderComponent } from './product-order/product-order.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProviderService } from './services/provider.service';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutUsComponent,
    ContactComponent,
    ProductDisplayComponent,
    ProductListComponent,
    ProductOrderComponent,
    AddProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductService, ProviderService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';


const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'product-order/:id', component: ProductOrderComponent},
  {path: 'admin/add-product', component: AddProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

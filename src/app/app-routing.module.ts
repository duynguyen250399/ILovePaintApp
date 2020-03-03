import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './user-page/contact/contact.component';
import { AboutUsComponent } from './user-page/about-us/about-us.component';
import { ProductListComponent } from './user-page/product-list/product-list.component';
import { ProductOrderComponent } from './user-page/product-order/product-order.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';


const routes: Routes = [
  {path: '', component: UserPageComponent, children: [
    {path: 'products', component: ProductListComponent, children: [
      {path: 'product-order/:id', component: ProductOrderComponent}
    ]},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutUsComponent}
  ]},
  {path: 'admin', component: AdminPageComponent, children: [
    {path: 'product', component: ProductManagerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

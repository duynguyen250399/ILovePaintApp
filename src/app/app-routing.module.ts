import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './user-page/contact/contact.component';
import { AboutUsComponent } from './user-page/about-us/about-us.component';
import { ProductListComponent } from './user-page/product-list/product-list.component';
import { ProductOrderComponent } from './user-page/product-order/product-order.component';
import { ProductManagerComponent } from './admin-page/product-manager/product-manager.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CategoryManagerComponent } from './admin-page/category-manager/category-manager.component';
import { ProviderManagerComponent } from './admin-page/provider-manager/provider-manager.component';


const routes: Routes = [
  {path: '', component: UserPageComponent, children: [
    {path: 'products', component: ProductListComponent, children: [
      {path: 'product-order/:id', component: ProductOrderComponent}
    ]},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutUsComponent}
  ]},
  {path: 'admin', component: AdminPageComponent, children: [
    {path: 'product', component: ProductManagerComponent},
    {path: 'category', component: CategoryManagerComponent},
    {path: 'provider', component: ProviderManagerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

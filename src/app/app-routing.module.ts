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
import { ShoppingCartComponent } from './user-page/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './user-page/checkout/checkout.component';
import { OrderManagerComponent } from './admin-page/order-manager/order-manager.component';


const routes: Routes = [
  {path: '', component: UserPageComponent, children: [
    {path: '', component: ProductListComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'product-order/:id', component: ProductOrderComponent},
    {path: 'my-cart', component: ShoppingCartComponent},
    {path: 'checkout', component: CheckoutComponent}
  ]},
  {path: 'admin', component: AdminPageComponent, children: [
    {path: 'product', component: ProductManagerComponent},
    {path: 'category', component: CategoryManagerComponent},
    {path: 'provider', component: ProviderManagerComponent},
    {path: 'order', component: OrderManagerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

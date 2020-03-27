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
import { OrderSuccessComponent } from './user-page/order-success/order-success.component';
import { UserRegistrationComponent } from './user-page/user-registration/user-registration.component';
import { UserLoginComponent } from './user-page/user-login/user-login.component';
import { UserProfileComponent } from './user-page/user-profile/user-profile.component';
import { RegisterSuccessComponent } from './user-page/register-success/register-success.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ColorManagerComponent } from './admin-page/color-manager/color-manager.component';


const routes: Routes = [
  {
    path: '', component: UserPageComponent, children: [
      { path: '', component: ProductListComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'product-order/:id', component: ProductOrderComponent },
      { path: 'my-cart', component: ShoppingCartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'user-registration', component: UserRegistrationComponent },
      { path: 'user-login', component: UserLoginComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'register-success', component: RegisterSuccessComponent }
    ]
  },
  {
    path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard], data: {allowedRoles: ['Admin']},
    children: [
      { path: 'product', component: ProductManagerComponent },
      { path: 'category', component: CategoryManagerComponent },
      { path: 'provider', component: ProviderManagerComponent },
      { path: 'order', component: OrderManagerComponent },
      {path: 'color', component: ColorManagerComponent}
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

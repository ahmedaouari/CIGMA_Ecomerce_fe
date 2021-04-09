import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/auth/login/login.component';
import {ProductListComponent} from './views/products/components/product-list/product-list.component';
import {AuthGuard} from './security/auth.guard';
import {ProductComponent} from './views/products/product/product.component';
import {ProductCreationComponent} from './views/products/components/product-creation/product-creation.component';
import {Roles} from './shared/roles';
import {RoleGuard} from './security/role.guard';
import {CheckoutComponent} from './views/purchase/checkout/checkout.component';
import {CartComponent} from './views/purchase/cart/cart.component';
import {ResetPasswordComponent} from './views/auth/login/reset-password/reset-password.component';
import {ResetPasswordRequestComponent} from './views/auth/login/reset-password-request/reset-password-request.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'request/reset-password', component: ResetPasswordRequestComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'products', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'cart/:id', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {
    path: 'admin', canActivate: [RoleGuard], data: {roles: [Roles.Admin]}, children: [
      {path: 'dashboard', component: ProductComponent},
      {path: 'product/create', component: ProductCreationComponent},
      {path: 'product/edit/:id', component: ProductCreationComponent}]
  },
  {path: '**', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

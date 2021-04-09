import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './views/products/product/product.component';
import { ProductListComponent } from './views/products/components/product-list/product-list.component';
import { LoginComponent } from './views/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginInterceptor} from './security/login.interceptor';
import { ProductCreationComponent } from './views/products/components/product-creation/product-creation.component';
import { AccessControlDirective } from './shared/access-control.directive';
import { CheckoutComponent } from './views/purchase/checkout/checkout.component';
import { CartComponent } from './views/purchase/cart/cart.component';
import { StatusComponent } from './views/shared/components/status/status.component';
import { ResetPasswordComponent } from './views/auth/login/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './views/auth/login/reset-password-request/reset-password-request.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    LoginComponent,
    ProductCreationComponent,
    AccessControlDirective,
    CheckoutComponent,
    CartComponent,
    StatusComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

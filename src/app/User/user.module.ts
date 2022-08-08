import { NgModule } from '@angular/core';
import { AllCommonModule, allComponent, allServices } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { SignupComponent } from './login/signup/signup.component';
import { CartItemComponent } from './shop/cart-info/cart-item/cart-item.component';




@NgModule({
  declarations: [allComponent ],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class UserModule { }

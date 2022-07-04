import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommonModule, allComponent, allServices } from './user-routing.module';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [allComponent ],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class UserModule { }

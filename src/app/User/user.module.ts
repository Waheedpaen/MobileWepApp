import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommonModule, allComponent, allServices } from './user-routing.module';



@NgModule({
  declarations: [allComponent ],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class UserModule { }

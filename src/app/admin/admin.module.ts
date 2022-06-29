import { NgModule } from '@angular/core';
import {AllCommonModule, allComponent, allServices } from './admin-routing.module';
import { MobileDetailComponent } from './mobile/mobile-detail/mobile-detail.component';

@NgModule({
  declarations: [allComponent],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class AdminModule { }

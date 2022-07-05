import { NgModule } from '@angular/core';
import {AllCommonModule, allComponent, allServices } from './admin-routing.module';
 
@NgModule({
  declarations: [allComponent, ],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core'; 
import { AllCommonModule, allComponent, allServices } from './user-routing.module';




@NgModule({
  declarations: [allComponent ],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class UserModule { }

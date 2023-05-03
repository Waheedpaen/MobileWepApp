import { NgModule } from '@angular/core';
import {AllCommonModule, allComponent, allServices } from './admin-routing.module';
import { ChangePasswordComponent } from './user-info/change-password/change-password.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
 
@NgModule({
  declarations: [allComponent, ChangePasswordComponent, ChatUserComponent, ],
  imports: [AllCommonModule],
  providers:[
    allServices
  ]
})
export class AdminModule { }

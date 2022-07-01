import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../Shared/common-module/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserTemplateComponent } from './user-template/user-template.component';
import { AdminLayoutComponent } from '../admin/admin-template/admin-layout/admin-layout.component';
import { AdminComponent } from '../admin/admin/admin.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserLayoutComponent } from './user-template/user-layout/user-layout.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserRoutingModule { }
export const AllCommonModule = [
 UserRoutingModule,
  NgbModule,
  NgxSpinnerModule,
  NgxDatatableModule,
  NgxDatatableModule ,
  SharedModule,
  HttpClientModule,
  NgbDatepickerModule,
  NgSelectModule
]
export const allComponent = [


  UserTemplateComponent,
 UserLayoutComponent,
  UserAdminComponent



];
export const allServices  = [

]

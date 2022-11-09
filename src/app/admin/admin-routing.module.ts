import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand/brand.component';
import { BrandRepositoryService } from './brand/services/brand-repository/brand-repository.service';
import { BrandService } from './brand/services/brand-service/brand.service';
import { OperatingSystemComponent } from './operating-system/operating-system.component';
import { OperatingsystemRepositoryService } from './operating-system/services/operatingsystem-repository/operatingsystem-repository.service';
import { OperatingsystemService } from './operating-system/services/operatingsystem-service/operatingsystem.service';
import { OperatingsytemVersionComponent } from './os-version/operatingsytem-version.component';
import { OperatingsystemVersionRepositoryService } from './os-version/services/operatingsystem-version-repository/operatingsystem-version-repository.service';
import { OSVersionService } from './os-version/services/operatingsystem-version-service/osversion.service';
import { SharedModule } from '../Shared/common-module/shared.module';
import { Route, Router, RouterModule, Routes, RoutesRecognized } from '@angular/router';
import { AdminLayoutComponent } from './admin-template/admin-layout/admin-layout.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminComponent } from './admin/admin.component';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from '../Shared/auth/auth.guard';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { OperatingsystemEditComponent } from './operating-system/operatingsystem-edit/operatingsystem-edit.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { OsVersionEditComponent } from './os-version/os-version-edit/os-version-edit.component';
import { MobileEditComponent } from './mobile/mobile-edit/mobile-edit.component';
import { MobileComponent } from './mobile/mobile.component';
import { MobileRepositoryService } from './mobile/services/mobile-repository/mobile-repository.service';
import { MobileServiceService } from './mobile/services/mobile-service/mobile-service.service';
import { MobileDetailComponent } from './mobile/mobile-detail/mobile-detail.component';
 ;
 import { ColorSketchModule } from 'ngx-color/sketch';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserAddEditComponent } from './user-info/user-add-edit/user-add-edit.component';
import { InputRestrictionDirective } from '../Shared/CommonPipe/pipe';
import { AutofocusDirective } from '../Shared/CommonPipe/focus';



const route:Routes = [
{
path:'',component:AdminLayoutComponent,
children:[
  {path:'', component:AdminComponent},
  {path:'brand',component:BrandComponent,
     canActivate: [AuthGuard],
     title: 'Brand',
  data: {
    role: 'Admin'
  }},
  {path:'operatingsystem',component:OperatingSystemComponent,
   canActivate: [AuthGuard],
  title: 'OperatingSystem',
  data: {
    role: 'Admin'
  },

},
{path:'user-info', component: UserInfoComponent,
title: 'User-Info',
   canActivate: [AuthGuard],
   data: {
     role: 'Admin'
   }},
{path:'mobile',component:MobileComponent,
title: 'Mobile',
 canActivate: [AuthGuard],
data: {
  role: 'Admin'
},
},
  {path:'osversion',component:OperatingsytemVersionComponent,
  title: 'OSVersion',
  canActivate: [AuthGuard],
   data: {
    role: 'Admin'}}

]}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
export const allComponent = [
  BrandComponent,
  OperatingSystemComponent,
  OperatingsytemVersionComponent,
  AdminLayoutComponent,
  AdminTemplateComponent,
  AdminComponent,
  BrandEditComponent,
  OperatingsystemEditComponent,
  OsVersionEditComponent ,
  MobileEditComponent,
  MobileComponent,
  MobileDetailComponent,
  UserInfoComponent,
  UserAddEditComponent,
  InputRestrictionDirective,
  AutofocusDirective,
];
export const allServices  = [
  BrandRepositoryService,
  BrandService,
  OperatingsystemRepositoryService,
  OperatingsystemService,
  OperatingsystemVersionRepositoryService,
  OSVersionService ,
  MobileRepositoryService,
  MobileServiceService
]
export const AllCommonModule = [
  AdminRoutingModule,
  NgbModule,
  NgxSpinnerModule,
  NgxDatatableModule,
  NgxDatatableModule ,
  SharedModule,
  HttpClientModule,
  NgbDatepickerModule,
  ColorSketchModule,
  NgSelectModule
]

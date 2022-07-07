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
import { RouterModule, Routes } from '@angular/router';
import { BrandRepositoryService } from '../admin/brand/services/brand-repository/brand-repository.service';
import { BrandService } from '../admin/brand/services/brand-service/brand.service';
import { OperatingsystemRepositoryService } from '../admin/operating-system/services/operatingsystem-repository/operatingsystem-repository.service';
import { OperatingsystemService } from '../admin/operating-system/services/operatingsystem-service/operatingsystem.service';
import { OperatingsystemVersionRepositoryService } from '../admin/os-version/services/operatingsystem-version-repository/operatingsystem-version-repository.service';
import { OSVersionService } from '../admin/os-version/services/operatingsystem-version-service/osversion.service';
import { MobileRepositoryService } from '../admin/mobile/services/mobile-repository/mobile-repository.service';
import { MobileServiceService } from '../admin/mobile/services/mobile-service/mobile-service.service';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from '../admin/user-info/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ShopDetailComponent } from './shop/shop-detail/shop-detail.component';
const route:Routes = [
  {
    path:'rs',component: UserTemplateComponent,
    children:[
      {path:'home',component:HomeComponent,
      title: 'Home',
       //canActivate: [AuthGuard],
      data: {
        role: 'Admin'
      },
      },
    {path:'shop',component:ShopComponent,
    title: 'Shop',
     //canActivate: [AuthGuard],
    data: {
      role: 'Admin'
    },
    },
    {path:'detail/:id',component:ShopDetailComponent,
    title: 'Shop',
     //canActivate: [AuthGuard],

    },
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
export class UserRoutingModule { }
export const AllCommonModule = [
  HttpClientModule,
 UserRoutingModule,
  NgbModule,
  NgxSpinnerModule,
  NgxDatatableModule,
  NgxDatatableModule ,
  SharedModule,
  CommonModule,
  NgbDatepickerModule,
  NgSelectModule,
  NgxPaginationModule,
  Ng2SearchPipeModule
]
export const allComponent = [

  UserLayoutComponent ,
  UserTemplateComponent,
  UserAdminComponent,
   ShopComponent,
   HomeComponent,
   ShopDetailComponent


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

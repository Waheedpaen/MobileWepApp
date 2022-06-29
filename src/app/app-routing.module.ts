import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGuard } from './Shared/auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Shared/common-module/shared.module';
const adminModule =() => import('./admin/admin.module').then(x => x.AdminModule);

const routes: Routes = [
  { path: 'first-page', redirectTo: 'first-page', pathMatch: 'full' },
  { path: '', component: FirstPageComponent },
  {path:'',component:AdminTemplateComponent,
    children: [
      {
        path: 'admin',
        loadChildren: adminModule,
       canActivate: [AuthGuard],
        data: {
          role: 'Admin'
        }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const allModules=[
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  SharedModule,
  ToastrModule.forRoot({
    progressBar: true
  })

]

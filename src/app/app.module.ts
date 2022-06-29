import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { allModules,  AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Shared/Components/login/login.component';
import { SignupComponent } from './Shared/Components/signup/signup.component';
import { SharedModule } from './Shared/common-module/shared.module';
import { FirstPageComponent } from './first-page/first-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule,   SocialAuthService , SocialAuthServiceConfig     } from 'angularx-social-login';

// const config = new SocialAuthServiceConfig (
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('78940484456-uajh7p8if5oef07huvquj50vrashd2b0.apps.googleusercontent.com')
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('124041566533945')
//   },
//   // {
//   //   id: LinkedInLoginProvider.PROVIDER_ID,
//   //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
//   // }
// );
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { EncDecService } from './Shared/auth/enc-dec.service';
import { AuthInterceptor } from './Shared/auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './Shared/Components/login/services/user-service/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
export function provideConfig() {
  return 'config';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FirstPageComponent
  ],
  imports: [
    allModules,
    BrowserAnimationsModule
  ],
  providers: [SocialLoginModule ,SocialAuthService,NgbActiveModal,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          UserService,
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,

    },
    EncDecService,
    {
      provide:SocialAuthService,
      useFactory: provideConfig
    },
     {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

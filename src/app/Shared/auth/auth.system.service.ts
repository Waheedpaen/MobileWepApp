import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { EncDecService } from './enc-dec.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSystemService {
isLogin = false;
roleAs!: string;
response:any;
tokeForSave: any;
tokenInfo:any;

tokenforsave:any;
tokeninfo:any;
  constructor(
    public http:HttpClient,
    public EncrDecr:EncDecService,
    private toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {
   }

   login(data: any) {
    // "http://localhost:51381/api/auth/login"
this.spinner.show();
debugger
    return this.http.post(`${environment.urlUser}/Login`, data)
      .pipe(
        map((res: any) => {
          this.response = res;

          if (this.response.success == true && this.response.data != null) {
            this.response.data;
            // Token Decyrepted data
            this.tokenforsave =this.response.data.token;
            console.log(this.tokenforsave)
            this.tokeninfo = this.getDecodedAccessToken(this.response.data.token);
            console.log(    this.tokeninfo)
            // Token Decyrepted data
            this.isLogin = true;
            this.roleAs = this.response.data;
            sessionStorage.setItem('name', this.response.data.loggedInUserName);


            //var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
            sessionStorage.setItem('STATE', 'true');
            if (this.response.data.loggedInUserTypeId == '2') {
              debugger
              // Encripted data
              var Admin = this.EncrDecr.set('123456$#@$^@1ERF', 'Admin');
              console.log(Admin)
              sessionStorage.setItem('ROLE', Admin);
            }
            // else if (this.response.data.loggedInUserTypeId == '2') {
            //   // Encripted data
            //   var Restaurant = this.EncrDecr.set('123456$#@$^@1ERF', 'Restaurant');
            //   sessionStorage.setItem('ROLE', Restaurant);
            // }
            else {
              sessionStorage.setItem('ROLE', '');
            }
            sessionStorage.setItem('Token', this.response.data.token);
            sessionStorage.setItem('IsMain', this.response.data.isMainBranch);
            localStorage.setItem('token', this.response.data.token);
            this.spinner.hide();
            return this.response

          }
          else {
            this.toastr.error(this.response.message, 'Message.');
            this.spinner.hide();
          }
          return this.response

        }, (err: { status: any; }) => {
          if (err.status == 400) {
            this.toastr.error(this.response.message, 'Message.');
            this.spinner.hide();
            return this.response
          }
        })

      );
    // this.isLogin = true;

    //       this.roleAs = value;
    //       sessionStorage.setItem('STATE', 'true');
    //       sessionStorage.setItem('ROLE', this.roleAs);
    //       return of({ success: this.isLogin, role: this.roleAs });
  }
  signup(obj: any) {
    debugger;
    console.log(obj)
this.spinner.show();
    return this.http.post(environment.urlUser + '/AddData', obj);
    this.spinner.hide();

  }
  signOut() {
    this.isLogin = false;
    this.roleAs = '';
    sessionStorage.setItem('STATE', 'false');
    sessionStorage.setItem('ROLE', '');
    sessionStorage.removeItem('token');
    // this.router.navigate(['']);
    sessionStorage.clear();

  }

  isLoggedIn() {
    const loggedIn = sessionStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', sessionStorage.getItem('ROLE'));
    this.roleAs = decrypted;
    return this.roleAs;
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}

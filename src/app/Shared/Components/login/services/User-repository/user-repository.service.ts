import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EncDecService } from 'src/app/Shared/auth/enc-dec.service';
import {  IUserRepository } from 'src/app/Shared/common-classes/Irepoository/IRepository';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { map } from 'rxjs';

import { AuthSystemService } from 'src/app/Shared/auth/auth.system.service';
@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService extends IUserRepository  {
  ColorGetAll() {
    return this.http.get(environment.urlUser + '/ColorGetAll' );
  }
  UpdateColor(obj: any) {
    return this.http.put(environment.urlUser +  '/UpdateColor',obj)
  }
  verifyEmailCodeAndEmailCheck(ememailAddressail: any, code: any) {
    return this.http.get(environment.urlUser + '/verifyEmailCodeAndEmailCheck/' + ememailAddressail + '/' + code);
  }
  VerifyedEmailCodeAndEmail(email: any) {
    return this.http.get(environment.urlUser + '/verifyEmailCodeAndEmail/' + email)

  }
  ChangePassword(obj: any) {
    return this.http.put(environment.urlUser +  '/UpdatePassword',obj)
  }
   GetUserTypes() {
    return this.http.get(environment.urlUser + '/GetUserTypes')
  }
  GetUsers() {
    throw new Error('Method not implemented.');
  }
  GetData(id: number) {
    return this.http.get(environment.urlUser + '/GetUser/' + id);
  }
  SaveData(obj: any) {
    throw new Error('Method not implemented.');
  }
  DeleteData(id: number) {
    return this.http.delete(environment.urlUser + '/DeleteUserData/' + id);
  }
  UpdateData(obj: any) {
    return this.http.put(environment.urlUser + '/UpdateUser' ,obj)
  }
  SearchData(obj: any) {
  return this.http.get(environment.urlUser + '/SearchData/' + obj);
  }
  PdfData(data: any[], col: any[], docName: any) {
    throw new Error('Method not implemented.');
  }
  exportAsExcelFile(json: any[], excelFileName: string) {
    throw new Error('Method not implemented.');
  }
  importAsExcelFile(obj: any) {
    throw new Error('Method not implemented.');
  }
  PrintData(data: any[], col: any[], docName: any) {
    throw new Error('Method not implemented.');
  }
  CheckNameExistence(name: string) {
    return this.http.get(environment.urlUser + '/CheckUserNameExistence/' + name);
  }
  signUp(obj: any) {
    throw new Error('Method not implemented.');
  }

  GetAll() {
   return this.http.get(environment.urlUser + '/GetUsers')
  }
  GetUserCount() {
    return this.http.get(environment.urlUser + '/GetUserCount')
  }

  isLogin = false;
  roleAs!: string;
  response:any;
  tokenforsave:any;
  tokeninfo:any;

  constructor(public http:HttpClient,
    private EncrDecr: EncDecService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private serviceSystem: AuthSystemService,
  //  public authServicex: AuthService,
    ) {
    super();
  }
  login(data: any) {
    // "http://localhost:51381/api/auth/login"
this.spinner.show();

    return this.http.post(`${environment.urlUser}/Login`, data)
      .pipe(
        map((res: any) => {
          this.response = res;

          if (this.response.success == true && this.response.data != null) {
            this.response.data;
            // Token Decyrepted data
            this.tokenforsave =this.response.data.token;
            this.tokeninfo = this.getDecodedAccessToken(this.response.data.token);
            // Token Decyrepted data
            this.isLogin = true;
            this.roleAs = this.response.data;
            sessionStorage.setItem('name', this.response.data.loggedInUserName);


            //var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
            sessionStorage.setItem('STATE', 'true');
            if (this.response.data.loggedInUserTypeId == '1') {
              // Encripted data
              var Admin = this.EncrDecr.set('123456$#@$^@1ERF', 'Admin');
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
  signup(data: any) {
this.spinner.show();
    return this.http.post(`${environment.urlUser}/AddUser`, data);
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

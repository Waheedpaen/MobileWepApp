import { Injectable } from '@angular/core';
import { UserRepositoryService } from '../User-repository/user-repository.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
Form: any;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(
public formBuilder:UntypedFormBuilder,
    private socialAuthService:  SocialAuthService,public userRepositoryService:UserRepositoryService) {
this.Form = this.formBuilder.group({
  UserName:['', Validators.required],
  Password:['',[Validators.required  ]]
})

    }

    GetAll(){
      return this.userRepositoryService.GetAll();
    }
    GetUserTypes() {
      return  this.userRepositoryService.GetUserTypes();
    }
    GetUserCount(){
      return this.userRepositoryService.GetUserCount();
    }
   GetUserDetail(id:number){
    return this.userRepositoryService.GetData(id);
   }
    onSubmitSignup(obj: any){
    return this.userRepositoryService.signUp(obj);
    }
    onSubmitlogin(obj: any){
return this.userRepositoryService.login(obj);
   }

    UpdateUser(obj:any){
      return this.userRepositoryService.UpdateData(obj);
    }

    ChangePassword(obj:any){
      return this.userRepositoryService.ChangePassword(obj);
    }

    signOut(): void {
    this. socialAuthService.signOut();
    }
    isLoggedIn(){
    return this.userRepositoryService.isLoggedIn();
    }
    getRole(){
    return this.userRepositoryService.getRole();
    }
    getDecodedAccessToken(token: any){
    return this.userRepositoryService.getDecodedAccessToken(token);
    }
    CheckNameExistence(name: string){
    return this.userRepositoryService.CheckNameExistence(name);
     }
     DeleteUserData(id: number){
    return this.userRepositoryService.DeleteData(id);
      }
     SearchUserData(obj:any){
    return this.userRepositoryService.SearchData(obj);
    }
}

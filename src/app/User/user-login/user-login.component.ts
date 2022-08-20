import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthSystemService } from 'src/app/Shared/auth/auth.system.service';
import { UserForLoginDto } from 'src/app/Shared/Components/login/login-entity/User';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
}
  form:any
  @ViewChild('container') container!: ElementRef
  response: any;
  data: any = {};

  user!: SocialUser  ;
  file: any;
  Url:any;
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public userService: UserService
    ,private _NgbActiveModal: NgbActiveModal,
    private serviceSystem: AuthSystemService,
    private router: Router,
    private socialAuthService:  SocialAuthService,
    public formBulider:UntypedFormBuilder,
    private modalService: NgbModal
)
 {

  this.form = this.formBulider.group({
     Email   :    new UntypedFormControl(null, [Validators.required ]),
    Password: new UntypedFormControl(null, [Validators.required,Validators.minLength(6)]),


  } );

  }
  ngOnInit(): void {
  }






loginMethodForClientSide(){
  debugger;
  this.spinner.show();
  const obj = new  UserForLoginDto();
   obj.email = this.form.value. Email,
   obj.password = this.form.value.Password;
   obj.userTypeId = 2;
    this.serviceSystem.login (obj).subscribe(res=>{
      this.response = res;

       if(this.response.success == true && this.response.data != null && this.response.data.loggedInUserTypeId == '2'){

        this.router.navigate(['/shop/temp/home']);
     this.spinner.hide();

      }

else{
  this.toastr.error(this.response.message,'Message.');
  this.spinner.hide();

}

    })
}

get activeModal() {
  return this._NgbActiveModal;
}


}

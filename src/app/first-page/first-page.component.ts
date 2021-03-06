import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthSystemService } from '../Shared/auth/auth.system.service';
import { UserForLoginDto } from '../Shared/Components/login/login-entity/User';
import { LoginComponent } from '../Shared/Components/login/login.component';
import { UserService } from '../Shared/Components/login/services/user-service/user.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

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
    UserName:new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),


    Password:new UntypedFormControl(null, [Validators.required,Validators.minLength(6)]),


  } );

  }
  ngOnInit(): void {
  }



  siginPopUp() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true, size: 'lg' });
    modalRef.result.then((data: boolean) => {
      // on close
      if (data == true) {



      }
    }, () => {
      // on dismiss
    });
  }



loginMethod(){
  debugger;
  const obj = new  UserForLoginDto();
   obj.username = this.form.value. UserName,
   obj.password = this.form.value.Password;
   obj.userType = 2;
    this.serviceSystem.login (obj).subscribe(res=>{
      this.response = res;
      this.spinner.show();
      if(this.response.success == true && this.response.data != null && this.response.data.loggedInUserTypeId == '2'){

        debugger;
        this.router.navigate(['/admin']);
     
      }
else{
  this.toastr.error(this.response.message,'Message.');
  this.spinner.hide();
  this.spinner.hide();
}

    })
}

get activeModal() {
  return this._NgbActiveModal;
}
  }



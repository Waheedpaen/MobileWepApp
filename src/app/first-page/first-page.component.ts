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
     Email   :    new UntypedFormControl(null, [Validators.required ]),
    Password: new UntypedFormControl(null, [Validators.required,Validators.minLength(6)]),


  } );

  }
  ngOnInit(): void {
  }



  siginPopUp() {
    this.userService.hidden = true;
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
  this.spinner.show();
  const obj = new  UserForLoginDto();
   obj.email = this.form.value. Email,
   obj.password = this.form.value.Password;
   obj.userTypeId = 1;
    this.serviceSystem.login (obj).subscribe(res=>{
      this.response = res;

       if(this.response.success == true && this.response.data != null && this.response.data.loggedInUserTypeId == '1'){

        debugger;
        this.router.navigate(['/admin']);
     this.spinner.hide();

      }
      // else  if(this.response.success == true && this.response.data != null && this.response.data.loggedInUserTypeId == '2'){

      //   debugger;
      //   this.router.navigate(['/admin']);
      //   this.spinner.hide();
      // }
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



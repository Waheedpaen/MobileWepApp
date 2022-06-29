import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, NgForm, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AuthSystemService } from 'src/app/Shared/auth/auth.system.service';
import { UserForLoginDto, UserForUpdate } from 'src/app/Shared/Components/login/login-entity/User';
import { MustMatch } from 'src/app/Shared/Components/login/MatchPassword/password-Matching.validator';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { BrandService } from '../../brand/services/brand-service/brand.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  form:any;
  Form:any;

  @ViewChild('container') container!: ElementRef
  response: any;
  data: any = {};
  public isErrorOnSubmit!: boolean;
  user!: SocialUser  ;
  file: any;
  Url:any;
  fileToUpload: any;
  FileName: any;
  objUserTypes:any=[];

@Input() Id!: number;
@Input() statusCheck: any;

form2:any;
  FormName: any;

  userType: any = [];
  // objuserTypeId = 0;
  // restaurantId:2;
  @ViewChild(NgForm) NotesForm: any;

  constructor(
    public _brandServices: BrandService,
    public http:HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public userService: UserService
    ,private _NgbActiveModal: NgbActiveModal,
    private serviceSystem: AuthSystemService,
    private router: Router,
    private socialAuthService:  SocialAuthService,
    public formBulider:UntypedFormBuilder,
    ) {
      this.form = this.formBulider.group({
        UserName:new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),
        FullName: new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),
        Image:[''],
        Password:new UntypedFormControl(null, [Validators.required,Validators.minLength(6)]),
       UserTypeId:new UntypedFormControl(null, [Validators.required]),
        ConfirmPassword: new UntypedFormControl('',[Validators.required ]),
        Email: new UntypedFormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      },
       {
          validator: MustMatch('Password', 'ConfirmPassword')
      });
      this.form2 = this.formBulider.group({
        UserName:new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),
        FullName: new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),
        Image:[''],

      });
    }


    UserDetail(){
      this.userService.GetUserDetail(this.Id).subscribe(
        res=>{
          this.response = res;
          if(this.response.success == true){
            this.data = this.response.data;
            this.form2.controls.UserName.setValue(this.data?.userName);
            this.form2.controls.FullName.setValue(this.data?.name);
            this.file = this.data?.imageUrl;
            this.spinner.hide();
          }
            else{
              this.toastr.error(this.response.message,'Message .');
              this.spinner.hide();
            }
              },err=>{
                if(err.status == 400){
                  this.toastr.error(this.response.message,'Message.');
                  this.spinner.hide();
                }
              }
            );

    }


  ngOnInit(): void {
    // this.form.get('UserName').setAsyncValidators(this.nameAlreadyExist());
    this.  GetUserTypes();

    this.statusCheck = this.statusCheck;
    if (this.statusCheck == 'Edit') {
      this.UserDetail();
    }
  }


  addUser(form: NgForm) {
debugger
    let varr = {
      "Username":  this.form.get('UserName')?.value,
      "email": this.form.get('Email')?.value,
      "fullName":  this.form.get('FullName')?.value,
      "password": this.form.get('Password')?.value,
      "userTypeId": 1,
      "restaurantId": 0

    }
    this.spinner.show();

  }

  GetUserTypes() {
  this.userService.GetUserTypes().subscribe(res=>{
this.objUserTypes = res;
console.log(this.objUserTypes)
    })
  }

  editUser() {
    debugger
    this.spinner.show();

  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  UpdateUser(form: NgForm) {
debugger;
const obj = new  UserForUpdate();
obj.id = this.Id;
   obj.username =  this.form2.value.UserName;
   obj.name = this.form2.value.FullName;

   obj.imageUrl = this.file;
   this.userService.UpdateUser(obj).subscribe(
    (    res: any) =>{
      this.response = res;
      if(this.response.success == true){
        this.toastr.success(this.response.message,'Message.');
        this.activeModal.close(true);
        this.spinner.hide();
      }
      else {
        this.toastr.error(this.response.message,'Message.');
        this.spinner.hide();
      }
    },
    (err:HttpErrorResponse)=>{
      const message = this._brandServices.extractErrorMessagesFromErrorResponse(err);
      this.toastr.error(message.toString(),'Message.')
      console.log(message);
      this.spinner.hide();
    }
  );

  }







  public handleFileInput(files: any) {
    this.fileToUpload = files.item(0);
    const file: File = files.item(0);
    this.FileName = file.name;
    this.fileToUpload = files.item(0);
  }
  public uploadFinished(event:any) {
    this.handleFileInput(event.target.files);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.file  = event?.target?.result;
      }
    }
  }



  // signInWithLinkedIn(): void {
  //   this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }

  signOut(): void {

  }
  // public socialSignIn(socialProvider: string) {
  //   let socialPlatformProvider;
  //   if (socialProvider === 'facebook') {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === 'google') {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }
  //   this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
  //     console.log(socialProvider, socialusers);
  //     console.log(socialusers);
  //     this.Savesresponse(socialusers);
  //   });
  // }
  // Savesresponse(socialusers: Socialusers) {
  //   this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
  //     debugger;
  //     console.log(res);
  //     this.socialusers=res;
  //     this.response = res.userDetail;
  //     sessionStorage.setItem('socialusers', JSON.stringify( this.socialusers));
  //     console.log(sessionStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
  //     this.router.navigate([`/Dashboard`]);
  //   })
  // }

  signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');

  }
  signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }



  addUserMethod(form: NgForm) {
    // var varr ={
    //   'username':this.form.value.UserName,
    //   'fullName': this.form.value.FullName,
    //   'email': this.form.value.Email,
    //   'userTypeId': 2,
    //   'password': this.form.value.Password,
    //   'imageUrl':this.file
    // }
    // const formData = new FormData();
    // formData.append('imageUrl', this.file);
    // formData.append('username',this.form.value.UserName);
    // formData.append('fullName', this.form.value.FullName,);
    // formData.append('password', this.form.value.Password);
    // formData.append('email', this.form.value.Email);
    // formData.append('userTypeId', '2');

    debugger;
   const obj = new  UserForLoginDto();
   obj.username =  this.form.value.UserName;
   obj.password =  this.form.value.Password;
   obj.fullName = this.form.value.FullName;
   obj.email = this.form.value.Email;
   obj.userTypeId = this.form.value.UserTypeId;
   obj.imageUrl = this.file;
    this.serviceSystem.signup (obj).subscribe(res=>{
      this.response = res;
      this.spinner.show();
      if(this.response.success == true && this.response.data != null && this.response.data.loggedInUserTypeId == '2'){
        this.spinner.show();
        debugger;
        this.router.navigate(['/admin']);
        this.activeModal.close(true);
        this.spinner.hide();
      }
else{
  this.toastr.error(this.response.message,'Message.');
  this.spinner.hide();
  this.spinner.hide();
}

    })

  }

  // nameAlreadyExist(): AsyncValidatorFn {
  //   console.log(this.form.value.UserName);
  //   debugger;
  //   return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {

  //     return control.valueChanges.pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       switchMap(res => this.userService.CheckNameExistence(this.form.value.UserName)),
  //       map(res => {
  //         debugger
  //         var result = res ? { alreadyExist: true } : null;
  //         if (res) {
  //           control.setErrors({ alreadyExist: true });
  //         }
  //         return result;
  //       })
  //     );
  //   }
  // }



  updateUser(form: NgForm){

  }
  onSubmit(buttonType:any):void {
    if(buttonType === "Add"){
      this.addUserMethod(this.Form)
    }
    if(buttonType === "Edit"){
      this.   UpdateUser(this.Form);
    }

}


}

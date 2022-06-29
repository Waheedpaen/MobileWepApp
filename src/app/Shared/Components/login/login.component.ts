import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SocialUser } from "angularx-social-login";
import { UserService } from './services/user-service/user.service';
import { UserForLoginDto } from './login-entity/User';
import { AuthSystemService } from '../../auth/auth.system.service';
import { AbstractControl, AsyncValidatorFn, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MustMatch } from './MatchPassword/password-Matching.validator';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any
  @ViewChild('container') container!: ElementRef
  response: any;
  data: any = {};
  public isErrorOnSubmit!: boolean;
  user!: SocialUser  ;
  file: any;
  Url:any;
  fileToUpload: any;
  FileName: any;
  constructor(
    public http:HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public userService: UserService
    ,private _NgbActiveModal: NgbActiveModal,
    private serviceSystem: AuthSystemService,
    private router: Router,
    private socialAuthService:  SocialAuthService,
    public formBulider:UntypedFormBuilder,
)
 {

  this.form = this.formBulider.group({
    UserName:new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),
    FullName: new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]),
    Image:[''],
    Password:new UntypedFormControl(null, [Validators.required,Validators.minLength(6)]),
    ConfirmPassword: new UntypedFormControl('',[Validators.required ]),
    Email: new UntypedFormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  },
   {
      validator: MustMatch('Password', 'ConfirmPassword')
  });

  }
 signInWithGoogle(){

 }
 signInWithFB(){}
  ngOnInit() {
    // this. socialAuthService.authState.subscribe((user) => {
    //   this.user = user;
    //   console.log(user);
    // });
    try {
debugger;
      // this.form.get('UserName').setAsyncValidators(this.nameAlreadyExist());


    }
    catch (e) {
      console.log(e);
    }
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

  onSubmitSignup(value: any) {

    let varr = {
      'Username': this.data.name,
      'fullName': this.data.fullName,
      'email': this.data.email,
      'userTypeId': 2,
      'password': this.data.password,

    };



  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');

  }
  signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }



  addUserMethod() {
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
   obj.userTypeId = 2;
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

  }



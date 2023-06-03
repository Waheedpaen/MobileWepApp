import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { ColorEvent } from 'ngx-color';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';
import Swal from 'sweetalert2';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {
responseCountUser:any;
imageUrl:any;
Setup: boolean = false;
  Accounts:boolean =false;

  data:any={};
  dataColor:any={}
  // color: Object;
  hexColor!: String;
  rgbaColor!: Object;
  @HostBinding('class') headerClass!: SafeStyle;
  hideColorPicker:boolean = true;
  hideTextInput:boolean = true;
  color:string = '#EC407A';
  selectedColor:any;
userCount:any
obj:any;
  responses: any;
  notification: any;
  errorMessage: any;
  messages: any;
  constructor(
    private router: Router,
    private  http: HttpClient,
    private spinner: NgxSpinnerService,
    public  _userServices: UserService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
  ) { }
  getDecodedAccessToken(token: any): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  ngOnInit(): void {
    this.ColorGetAll();
    this.getList();
    this.getNotificationCount();
    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl('https://localhost:44385/notify',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }  )
    .build();

  connection.start().then(function () {
    console.log('SignalR Connected!');
  }).catch(function (err) {

    return console.error(err.toString());
  });
  connection.on("BroadcastMessage", () => {
    this.getNotificationCount();
  });


  }




  GetUserCount(){
    this._userServices.GetUserCount().subscribe(res=>{
     this. responseCountUser= res;
     if(this.responseCountUser.success== true ){
   this.userCount =  this.responseCountUser.data;
     }
     else{
      this.toastr.error(this.responseCountUser.message,'Message. ')
    }},
  err=>{
  if(err.status ==400){
    this.toastr.error(err.error.message,'Message .')
  }
  })
  }
getList(){
  const toke = sessionStorage.getItem('Token')
  var data = this.getDecodedAccessToken(toke);
  console.log(data)
  this.obj=data;
   this.imageUrl = data.ImageUrl;
}
signOut(): void {


  // this.name =localStorage.getItem()


  Swal.fire({
    title: 'Do you want to logout your session?Kindly confirm',

    showCancelButton: true,
    confirmButtonText: `Yes Log me out`,

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.spinner.hide();
      sessionStorage.setItem('STATE', 'false');
      sessionStorage.setItem('ROLE', '');
      sessionStorage.removeItem('Token');
      sessionStorage.clear();
       this.router.navigate(['']);
       this.spinner.hide();
  //  location.reload();
    } else if (result.isDenied) {

    }
  })
    }


    handleChange($event: ColorEvent) {
      debugger
      this.selectedColor ="#fff"
      // this.color = $event.color;
      this.hexColor = $event.color.hex;
      this.rgbaColor = $event.color.rgb;
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove('bg-theme1');
      var obj ={
      'name': this.hexColor,
      'id': 1,
      }
     this._userServices.UpdateColor(obj).subscribe(  (    res: any) =>{
      this.responses = res;
      if(this.responses.success == true){

 this.ngOnInit()

      }
      else {
        this.toastr.error(this.responses.message,'Message.');

      }
    },
    (err:HttpErrorResponse)=>{

      this.toastr.error(err.statusText,'Message.')

      this.spinner.hide();
    }
  );


    }


    ColorGetAll() {
      debugger
     this._userServices.ColorGetAll().subscribe(  res=>{
      this.responses = res;
      if(this.responses.success == true){
        this.dataColor  = this.responses.data;
        debugger
        console.log(this.dataColor)
        let body = document.getElementsByTagName('body')[0];

        body.classList.remove('bg-theme1');
        let objr = this.dataColor[0].name;
        console.log(objr)
         let body1 = document.getElementsByTagName('body')[0];
        body1.classList.add('dynamicClassColor');
        document.querySelector("body")!.style.cssText = '--my-var:'+objr +';';
        this.headerClass = this.sanitizer.bypassSecurityTrustStyle('--my-var:'+ this.hexColor +';');
        this.spinner.hide();
      }
      else{
        this.toastr.error(this.responses.message,'Message.');
      }
    },err=>{
      if(err.status == 400){
        this.toastr.error(err.error.message, 'Message.');
        this.spinner.hide();
      }
    });
    }

    UpdateColor(obj: any) {
      return 0;
    }
    getNotificationCount() {
 this.http.get('https://localhost:44385/api/Notifications/notificationcount').subscribe(
  notification => {
    this.notification = notification;
  },
  error => this.errorMessage = <any>error
);
}

    getNotificationMessage() {
    return this.http.get('https://localhost:44385/api/Notifications/notificationresult').subscribe(
      messages => {
        this.messages = messages;
      },
      error => this.errorMessage = <any>error
    );
    }
    deleteNotifications()   {
      this.http.delete('https://localhost:44385/api/Notifications/notificationresult');
    }
}

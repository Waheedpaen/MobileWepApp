import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {
responseCountUser:any;
imageUrl:any;
userCount:any
obj:any;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    public  _userServices: UserService,
    private toastr: ToastrService,
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
this.getList();
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
}

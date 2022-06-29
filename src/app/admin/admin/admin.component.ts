import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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


    ngOnInit(): void {
 
    }

    GetUserCount(){
      this._userServices.GetUserCount().subscribe(res=>{
       this. responseCountUser= res;

     this.userCount =  this.responseCountUser.data;

    })
    }
}

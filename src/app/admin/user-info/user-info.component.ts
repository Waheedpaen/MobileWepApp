import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  rows: any = [];

  columns: any = [];
  userFilter: any = [];
  Filter: any = [];
  response: any;
  data: any = [];
  userUrl='/api/Users/GetUsers'
  cars = [
    { id: 1, name: 'Last 7 Days' },
    { id: 2, name: 'Last Month' },
    { id: 3, name: 'Last Year' },
];
  constructor(
    public _userServices: UserService,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {

this.GetUsers();
  }

  GetUsers(){
    this._userServices. GetAll().subscribe(res=>{
      this.response=  res;
      if(this.response.success  == true){
        debugger

        this.rows = this.response.data;
        this.spinner.hide;
      }
      else{
        this.toastr.error(this.response.message,'Message. ')
      }},
    err=>{
    if(err.status ==400){
      this.toastr.error(err.error.message,'Message .')
    }
    })
  }
  updateFilter(event: { target: { value: string; }; }){
    const val = event.target.value.toLowerCase();
    const temp = this.Filter.filter(function (d: { username: string; fullName: string; email: string; }) {
      return (d.username.toLowerCase().indexOf(val) !== -1 ||
      d.fullName.toLowerCase().indexOf(val) !== -1 ||
      d.email.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.rows = temp;

  }
  deleteUserData(row: any){
    Swal.fire({
      title: GlobalConstants.deleteTitle,
      text: GlobalConstants.deleteMessage,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ed5565',
      cancelButtonColor: '#dae0e5',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      position: 'top',
    }).then((result: { isConfirmed: any; })=>{
      if(result.isConfirmed){
        this.spinner.show();
        this._userServices.DeleteUserData(row.id).subscribe(
          res=>{
            this.response = res;
            if(this.response.success ==true){
              this.GetUsers();
              this.toastr.error(GlobalConstants.deleteSuccess, 'Message. ')
              this.spinner.hide();
            }
          },err=>{
            if(err.status == 400){
              this.toastr.error(this.response.message,'Message');
            }
          },
        )
      }
    })
    }

    editUser(row:   any,check: any, name: any) {
      const modalRef = this.modalService.open(UserAddEditComponent, { centered: true });
      modalRef.componentInstance.Id = row.id; //just for edit.. to access the needed row
      modalRef.componentInstance.statusCheck = check;
      modalRef.componentInstance.FormName = name;

      modalRef.result.then((data) => {
        // on close
        if (data == true) {

        }



      }, (reason) => {
        // on dismiss
      });
    }
     // ...................................user breakdown ................................................
     SearchData(obj: any){
      const searchingData = obj.target.value;
       if(searchingData == ""){
        this.ngOnInit();
       }
       else{
        this._userServices.SearchUserData(searchingData).subscribe(
          (res:any)=>{
            debugger;
            this.response = res;
            if(this.response.success == true){
              debugger;
              console.log(this.response.data);
              this.rows = this.response.data;
              this.spinner.hide();
            }
            else{
              this.toastr.error(this.response.message,'Message.');
              this.spinner.hide();
            }
          },
          err=>{
            if(err.status == 400){
             this.toastr.error(this.response.messaage,'Message .');
             this.spinner.hide();
            }

          }
        )
      }
     }

  getRowClass(row: any) {
    return 'table-light-grey-row';
  }
  addUser(obj: any){
    const modalRef = this.modalService.open(UserAddEditComponent,{ centered: true });
    modalRef.componentInstance.statusCheck = obj;
    modalRef.result.then((data) => {
      this.ngOnInit();
      if (data == true) {
      }
    }, (reason) => {
      // on dismiss
    });
      }





    changePassword(obj: any, check: any, name:any){
        const modelRef = this.modalService.open(ChangePasswordComponent,{centered:true});
        modelRef.componentInstance.Id = obj.id;
        modelRef.componentInstance.statusCheck = check;
        modelRef.componentInstance.FormName = name;
          modelRef.result.then((data:any) => {
         // on close this.ngOnInit();
         if (data == true) {
           this.GetUsers();
         }
       }, (reason:any) => {
         // on dismiss
       });
       }


















}

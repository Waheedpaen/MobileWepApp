import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { OSVersionService } from './services/operatingsystem-version-service/osversion.service';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import { OsVersionEditComponent } from './os-version-edit/os-version-edit.component';
@Component({
  selector: 'app-operatingsytem-version',
  templateUrl: './operatingsytem-version.component.html',
  styleUrls: ['./operatingsytem-version.component.css']
})
export class OperatingsytemVersionComponent implements OnInit {
  rows: any = [];
  columns: any = [];
  temp: any = [];
  response: any;
  data: any = {};
  Filter: any = []
  categoryCount: any;
  constructor(
    public  osVersionService  :  OSVersionService,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: NgbModal,
  ) { }
  ngOnInit() {
    this.getOSVDataList();
  }
  getRowClass(row: any) {
    return 'table-light-grey-row';
  }

  getOSVDataList(){
    this.osVersionService.GetOSVersionList().subscribe(
      res=>{
        this.response = res;
        if(this.response.success == true){
          this.rows = this.response.data;
          this.spinner.hide();
        }
        else{
          this.toastr.error(this.response.message,'Message');
          this.spinner.hide();
        }},
      err=>{
        if(err.status == 400){
          this.toastr.error(err.error.message,'Message.');
          this.spinner.hide();
        }});
      }

   searchOSVersion(obj: any){
        debugger;
        const searchingData = obj.target.value;
         if(searchingData == ""){
          this.ngOnInit();
         }
         else{
          this.osVersionService.SearchingData(searchingData).subscribe(
            res=>{
              this.response = res;
              if(this.response.success == true){
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

    deleteOSVersion(obj: any){
      Swal.fire({
        title: GlobalConstants.deleteTitle,
        text: GlobalConstants.deleteMessage + ' ' + '"' + obj.name+ '"',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#ed5565',
        cancelButtonColor: '#dae0e5',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        position: 'top',
        }).then((result)=>{
        if(result.isConfirmed){
          this.spinner.show();
          this.osVersionService.DeleteOSVersionData(obj.id).subscribe(
            res=>{
              this.response = res;
              if(this.response.success ==true){
                this.getOSVDataList();
                this.toastr.error(GlobalConstants.deleteSuccess, 'Message. ')
                this.spinner.hide();
              }
            },err=>{
              if(err.status == 400){
                this.toastr.error(this.response.message,'Message');
              }  } )};

            })
      }

  addOSVersion(check:any){
    debugger
    const modelRef = this.modalService.open(OsVersionEditComponent,{centered:true});
    modelRef.componentInstance.statUsCheck = check;
    modelRef.result.then((data:any)=>{
      if(data == true){
        this.getOSVDataList();
      }
    },(reason:any)=>{
    })
  }

  editOSVersion(row:any,check:any,name:any){
    const modelRef = this.modalService.open(OsVersionEditComponent,{centered:true});
 
    modelRef.componentInstance.Id = row.id;
    modelRef.componentInstance.statUsCheck = check;
    modelRef.componentInstance.FormName=name;
   modelRef.result.then((data:any)=>{
    if(data == true){
      this.getOSVDataList();
    }
   },(reason:any)=>{})
  }






    }



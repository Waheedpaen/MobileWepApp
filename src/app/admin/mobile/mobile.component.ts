import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import Swal from 'sweetalert2';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { MobileEditComponent } from './mobile-edit/mobile-edit.component';
import { MobileServiceService } from './services/mobile-service/mobile-service.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  rows: any = [];
  columns: any = [];
  temp: any = [];
  response: any;
  data: any = {};
  Filter: any = []
  categoryCount: any;
  col = [
    { Name: 'Name', prop: 'Name'},
  ];
  file: any;
  arrayBuffer: any;
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public _mobileServices: MobileServiceService) { }
  ngOnInit() {
this.getMobileList()
  }

  getMobileList(){
    this._mobileServices.GetMobileList().subscribe((data:any)=>{
      this.response = data;
      if(this.response.success  == true){
        debugger

        this.rows = this.response.data;
        console.log(this.rows);
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
   deleteMobileData(row: any){
    Swal.fire({
      title: GlobalConstants.deleteTitle + ' ' + '"' + row.name + '"',
      text: GlobalConstants.deleteMessage,
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
        this._mobileServices.DeleteMobileData(row.id)
        .subscribe(
          res=>{
            this.response = res;
            if(this.response.success ==true){
              this.getMobileList();
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

    searchMobileData(obj: any){
      debugger;
      const searchingData = obj.target.value;
       if(searchingData == ""){
        this.ngOnInit();
       }
       else {
        this._mobileServices.SearchingData(searchingData).subscribe(
          res=>{
            this.response = res;
            this.rows = this.response.data ;
              this.spinner.hide();
          }
        )
      }
  }
  editMobile(obj: any, check: any, name: any){
    const modelRef = this.modalService.open(MobileEditComponent,{size: 'lg'});
      modelRef.componentInstance.Id = obj.id;
      modelRef.componentInstance.statusCheck = check;
      modelRef.componentInstance.Name = name;
      modelRef.result.then((data: any)=>{
        if(data == true){
          this.getMobileList();
        }
      }, (reason:any) => {
        // on dismiss
      });
      }

      addMobile(obj: any){
        const modalRef = this.modalService.open(MobileEditComponent,{ size: 'lg'});
        modalRef.componentInstance.statusCheck = obj;
        modalRef.result.then((data) => {
          this.ngOnInit();
          if (data == true) {


          }
        }, (reason) => {
          // on dismiss
        });
          }

          detailMobile(obj:any,mobileDetailName: string){
            const modelRef = this.modalService.open(MobileDetailComponent,{size: 'lg'});
            modelRef.componentInstance.Id = obj.id;
            modelRef.componentInstance.Name = mobileDetailName;

            modelRef.result.then((data: any)=>{
              if(data == true){
                this.getMobileList();
              }
            }, (reason:any) => {
              // on dismiss
            });
          }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OperatingsystemService } from './services/operatingsystem-service/operatingsystem.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import { OperatingsystemEditComponent } from './operatingsystem-edit/operatingsystem-edit.component';
@Component({
  selector: 'app-operating-system',
  templateUrl: './operating-system.component.html',
  styleUrls: ['./operating-system.component.css']
})
export class OperatingSystemComponent implements OnInit {

  rows: any = [];
  columns: any = [];
  temp: any = [];
  response: any;
  data: any = {};
  Filter: any = []
  col = [
    { Name: 'Name', prop: 'name'},
  ];
  categoryCount: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
   public operatingSystemService:  OperatingsystemService) { }
  ngOnInit() {
    this.operatingSystem();
  }
  getRowClass(row: any) {
    return 'table-light-grey-row';
  }
  operatingSystem(){
     this.operatingSystemService.GetOperatingList().subscribe(
      res=>{
        this.response = res;
        if(this.response.success == true){
          this.rows  = this.response.data;
          this.spinner.hide();
        }
        else{
          this.toastr.error(this.response.message,'Message.');
        }
      },err=>{
        if(err.status == 400){
          this.toastr.error(err.error.message, 'Message.');
          this.spinner.hide();
        }
      });
  }
  deleteOperatingSystem(obj: any){
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
}).then((result:any)=>{
  if(result.isConfirmed){
    this.spinner.show();
    this.operatingSystemService.DeleteOperatingSystemData(obj.id).subscribe(
      res =>{
        this.response = res;

        if(this.response.success == true){
          this.operatingSystem();
          this.toastr.error(GlobalConstants.deleteSuccess,'Message.');
        }
      }
    );
    this.spinner.hide();
  }
  else {
    this.toastr.error(GlobalConstants.exceptionMessage,'Message .');
    this.spinner.hide();
  }
},err=>{
  if(err.status == 400){
    this.toastr.error(this.response.message,'Message.');
    this.spinner.hide();
  }
})

  }
  editOperatingSystem(row:any,check: any, name:any){
  const modelRef = this.modalService.open(OperatingsystemEditComponent,{centered: true});
  modelRef.componentInstance.Id = row.id;
  modelRef.componentInstance.statusCheck = check;
  modelRef.componentInstance.FormName = name;
  modelRef.result.then((data) => {
    // on close

    if (data == true) {
      this.ngOnInit();
    }
    }, (reason: any) => {
    // on dismiss
    });
  }
  addOperatingSystem(check: any) {
      const modalRef = this.modalService.open(OperatingsystemEditComponent, { centered: true });
      modalRef.componentInstance.statusCheck = check;
       modalRef.result.then((data: any) => {
        this.ngOnInit();
      if (data == true) {

      }
    }, (reason) => {
      // on dismiss
    });
  }
  OperatingSystemPdfData(){
    debugger;
    const docName = "OperatingSystem Pdf"
    this.operatingSystemService.OperatingSystemPdfData(this.rows,this.col,docName);
  }
  exportExelUsersListActive() {
    let newRows = this.rows.map((o:any) => {
      return { name: o.name };
    });
    let docName = "Active Users List";
    this.operatingSystemService.OperatingSystemExcelData(newRows, docName);
  }
  searchOperatingSystemData(name: any){
  var obj = name.target.value;
  if(obj == ""){
    this.ngOnInit();
  }
  else{
    this.operatingSystemService.SearchingData(obj).subscribe((res:any)=>{
      this.response = res;
      if(this.response.success == true){
        this.rows = this.response.data.result;
        console.log(this.rows);
        this.spinner.hide();
      }
      else{
        this.toastr.error(this.response.message,'Message.');
        this.spinner.hide();
      }

    })
  }
  }

  PrintData(){
    debugger;
    let docName = "Operating System";
    this.operatingSystemService.PrintData(this.rows,this.col,docName);
   }

}

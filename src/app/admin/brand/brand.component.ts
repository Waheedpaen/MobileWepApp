import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { BrandService } from './services/brand-service/brand.service';
import Swal from 'sweetalert2'
import { map ,take} from 'rxjs';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { SearchBrand } from './brand-entity/brand';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  rows: any = [];
  clearData:any;
  columns: any = [];
  bool= false;
  temp: any = [];
  response: any;
  data: any = {};
  Filter: any = []
  categoryCount: any;
  col = [
    { Name: 'Name', prop: 'name'},
  ];
  file: any;
  arrayBuffer: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
   public brandService: BrandService) { }
  ngOnInit() {
    this.bool = false;
    this.brandList();

  }
  brandList(){
    this.bool = true;
 
    this.brandService.GetBrandList().pipe(take(1)).subscribe((data:any)=>{
      this.response = data;
      if(this.response.success  == true){
        debugger
        // this.response.data.forEach((element:any )=> {
        //   let obj:any ={};
        //        if(element.name == 'love'){
        //       obj.name =  element.name = 'fuck me'
        //       obj.imageUrl = element.imageUrl
        //        }
        //        else{
        //         obj.name =  element.name
        //         obj.imageUrl = element.imageUrl
        //        }
        //        List.push(obj)
        // });
        this.rows = this.response.data;
        this.spinner.hide();
        this.bool = false;
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
  deleteBrandData(row: any){
  Swal.fire({
    title: row.name,
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
      this.bool = true;
      this.spinner.show();
      this.brandService.DeleteBrandData(row.id).subscribe(
        res=>{
          this.response = res;
          if(this.response.success ==true){
            this.brandList();
            this.toastr.error(GlobalConstants.deleteSuccess, 'Message. ')
            this.spinner.hide();
            this.bool = false;
          }
        },err=>{
          if(err.status == 400){
            this.toastr.error(this.response.message,'Message');
            this.bool = false;
          }
        },
      )
    }
  })
  }
  getRowClass(row: any) {
  return 'table-light-grey-row';
  }

  addBrand(obj: any){
const modalRef = this.modalService.open(BrandEditComponent,{ centered: true });
modalRef.componentInstance.statusCheck = obj;
modalRef.result.then((data) => {
this.ngOnInit();
this.clearData = '';
  if (data == true) {


  }
}, (reason) => {
  // on dismiss
});
  }
  editBrand(obj: any, check: any, name:any){
   const modelRef = this.modalService.open(BrandEditComponent,{centered:true});
   modelRef.componentInstance.Id = obj.id;
   modelRef.componentInstance.statusCheck = check;
   modelRef.componentInstance.FormName = name;
     modelRef.result.then((data:any) => {
    // on close this.ngOnInit();
    if (data == true) {
      this.brandList();
    }
  }, (reason:any) => {
    // on dismiss
  });
  }
  searchBrandData(obj: any){
   debugger;
   const searchingData = obj.target.value;
    if(searchingData == ""){
     this.ngOnInit();
    }
    else{
     this.brandService.SearchingData(searchingData).subscribe(
       (res:any)=>{
         debugger;
         this.response = res;
         if(this.response.success == true){
           this.rows = this.response.data.result;
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
  brandPdf(){
    const docName = "Brand Pdf"
    this.brandService.BrandPdfData(this.rows,this.col,docName);
  }
  exportExelUsersListActive() {
    let newRows = this.rows.map((o:any) => {
      return { name: o.name };
    });
    let docName = "Active Users List";
    this.brandService.BrandExcelData(newRows, docName);
  }
   incomeExcelFileData(event: any){
    debugger;
     this.file = event.target.value;
   }
   uploadData(){
     debugger;
     let fileReader = new FileReader();
     fileReader.onload=(e)=>{
       this.arrayBuffer = fileReader.result;
       var data = new Uint8Array(this.arrayBuffer);
       var arr = new Array();
       for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
       var bstr = arr.join("");
       var workbook = XLSX.read(bstr, {type:"binary"});
       var first_sheet_name = workbook.SheetNames[0];
       var worksheet = workbook.Sheets[first_sheet_name];
   const dataList =XLSX.utils.sheet_to_json(worksheet,{raw:true})
   fileReader.readAsArrayBuffer(this.file);
     }
   }
   PrintData(){
    let docName = "Brand";
    this.brandService.PrintData(this.rows,this.col,docName);
   }

}

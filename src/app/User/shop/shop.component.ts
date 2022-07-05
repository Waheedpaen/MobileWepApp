import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/admin/brand/services/brand-service/brand.service';
import { MobileServiceService } from 'src/app/admin/mobile/services/mobile-service/mobile-service.service';
import { OperatingsystemService } from 'src/app/admin/operating-system/services/operatingsystem-service/operatingsystem.service';
import { OSVersionService } from 'src/app/admin/os-version/services/operatingsystem-version-service/osversion.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  response: any;
  rows: any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];
  constructor(    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public _mobileServices: MobileServiceService,
    public _brandService: BrandService,
    public _operatingSystemService:  OperatingsystemService,
    public  _osVersionService  :  OSVersionService
    ) { }

  ngOnInit(): void {
    this.  getMobileList();
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

  searchMobile(obj:any){
    const searchingData = obj.target.value;
    if(searchingData == ""){
     this.ngOnInit();
    }
    else {
     this._mobileServices.SearchingData(searchingData).subscribe(
       res=>{
         this.response = res;
         this.page =  this.page ;
         this.rows = this.response.data ;
           this.spinner.hide();
       }
     )
   }
  }
  onTableDataChange(event: any) {
  if(event!=null){
    this.page = event;
     this.rows = this.rows;
  }

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }
}

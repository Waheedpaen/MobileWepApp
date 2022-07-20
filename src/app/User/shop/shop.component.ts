import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/admin/brand/services/brand-service/brand.service';
import { MobileServiceService } from 'src/app/admin/mobile/services/mobile-service/mobile-service.service';
import { OperatingsystemService } from 'src/app/admin/operating-system/services/operatingsystem-service/operatingsystem.service';
import { OSVersionService } from 'src/app/admin/os-version/services/operatingsystem-version-service/osversion.service';
import { RangeScreenSizeDto, RangeViewModel } from 'src/app/Shared/ViewModels/rangeDto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  response: any;
  sScreen!:number;
  mScreen!:number;
  xScreen!:number;

  blackCount:any;
  redCount:any;
  greenCount:any
  whiteCount:any;
  blueCount:any;
  allCount:any;
  rangeRows:any=[];
  responseColor:any;
  responseRange:any;
  colorRows: any=[];
  form:any;
  suggestion:any;
  rows: any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    public formBulider:UntypedFormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public _mobileServices: MobileServiceService,
    public _brandService: BrandService,
    public _operatingSystemService:  OperatingsystemService,
    public  _osVersionService  :  OSVersionService
    ) {

      this.form = this.formBulider.group({
        ColorName: new UntypedFormControl(''),
      })
    }

  ngOnInit(): void {
    debugger
    console.log(this.form.value.ColorName + 'sam')
    this.  getMobileList();
  }
  getMobileList(){
    debugger;

    this._mobileServices.GetMobileList().subscribe((data:any)=>{
      this.response = data;
      if(this.response.success  == true){
        this.rows = this.response.data;
        this.allCount = this.rows.length;
         var data1 =             this.rows.filter((data: { color: { name: string; }; })=>data.color.name == 'Black');
          this.blackCount = data1.length;
          var data2 =             this.rows.filter((data: { color: { name: string; }; })=>data.color.name == 'White');
          this.whiteCount = data2.length;
          var data3 =             this.rows.filter((data: { color: { name: string; }; })=>data.color.name == 'Red');
          this.redCount = data3.length;
          var data =             this.rows.filter((data: { color: { name: string; }; })=>data.color.name == 'Green');
          this.greenCount = data.length;
          var data4 =             this.rows.filter((data: { color: { name: string; }; })=>data.color.name == 'Blue');
          this.blueCount = data4.length;
          var list = this.rows.filter((data: { screenSize: number; })=>data.screenSize>=1 &&data.screenSize<=3);
        this.sScreen = list.length;
        var list1 = this.rows.filter((data: { screenSize: number; })=>data.screenSize>=4 &&data.screenSize<=5);
        this.mScreen = list1.length;
        this.suggestion = this.rows;
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
        debugger;
         this.response = res;
         this.page =  this.page ;
         if(this.page > 1 ){
          this.page =  1;
          this.rows = this.response.data ;
         }
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
  changeData(data:any){
  debugger
  var sam = data.target.value;
 this. tableSize=  Number(sam);
 this.page = 1

//  if(this.tableSize>5){
//    this.page = 1
//    this.rows = this.rows
//  }
//  else{
//   this.page = 1 ;
//   this.rows = this.rows
//  }


   }

  Color(data:any){
  var colorName = data.target.value;
  if(colorName == 'All'){
    this.getMobileList();
  }
  else{
    this._mobileServices.GetMobilesByColor(colorName).subscribe(res=>{
      this.responseColor = res;
      if(this.responseColor.success == true){
        this.rows = this.responseColor.data;
        this.page =  1;
      }
        })
      }
  }

  SelectRange(range:any){
    debugger;
    var data = range.target.value;
    var obj = data.split('-')
   var d1 =  Number(obj[0])
   var da2 = Number(obj[1]);
   var dto = new RangeViewModel();
   dto.first = d1;
   dto.second = da2;
   this._mobileServices.GetMobilesByPrice(dto).subscribe(res=>{
  this.responseRange = res;
  if(this.responseRange.success == true){
    this.rows = this.responseRange.data;

    this.page =  1;
  }
   })

  }

  GetMobilesByScreen(range:any){
    debugger;
    var data = range.target.value;
    if( data  == 'All'){
      this.getMobileList();
    }
    else{
      var obj = data.split('-')
      var d1 =   Number(obj[0])
      var da2 =    Number(obj[1]) ;
      var dto = new RangeScreenSizeDto();
      dto.first = d1;
      dto.second = da2;
      this._mobileServices. GetMobilesByScreen(dto).subscribe(res=>{
       this.responseRange = res;
       if(this.responseRange.success == true){
         this.rows = this.responseRange.data;

         this.page =  1;
       }
        })
    }



  }
}

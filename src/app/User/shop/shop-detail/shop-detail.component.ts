import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/admin/brand/services/brand-service/brand.service';
import { MobileServiceService } from 'src/app/admin/mobile/services/mobile-service/mobile-service.service';
import { OperatingsystemService } from 'src/app/admin/operating-system/services/operatingsystem-service/operatingsystem.service';
import { OSVersionService } from 'src/app/admin/os-version/services/operatingsystem-version-service/osversion.service';

import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { CommonService } from 'src/app/Shared/services/common.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
_id!:number;
qty =1;
  response: any;
  data: any ={};
  constructor(
    public _commonSerivces:CommonService,
    public _routeActivited: ActivatedRoute
    , private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public _mobileServices: MobileServiceService,
    public _brandService: BrandService,
    public _operatingSystemService:  OperatingsystemService,
    public  _osVersionService  :  OSVersionService
    ) {
     }

  ngOnInit(): void {
    this._routeActivited.params.subscribe(res=>{
      this._id = res['id'];
    })
    if(this._id!=null){
      this.getMobileDetail();
    }
  }

  getMobileDetail(){
    this._mobileServices.GetMobileDetail(this._id).subscribe(res=>{
      this.response = res;
      if(this.response.success == true){
        this.data = this.response.data;

      }
      else{
        this.toastr.error(this.response.message,'Message .');
      }
        },err=>{
          if(err.status == 400){
            this.toastr.error(this.response.message,'Message.');
          }
        }
      );
  }

  inc(){
    debugger

    if(this.qty !=5){
      this.qty += 1;
    }
    console.log(this.qty);
  }
dec(){
  if(this.qty!=1){
    this.qty -=1;
  }
}
itemCarts:any=[]=[];
addCart(){
 debugger
 this.data.qty = this.qty;

  let cartDataNull = localStorage.getItem('local');
  if(cartDataNull == null){
    debugger
    let storeDataGetL :any= [];
     storeDataGetL.push(this.data);

     localStorage.setItem('local',JSON.stringify(storeDataGetL))
 }
 else{
  debugger
var id = this.data.id;
let indexs = -1;
var data:  any  = localStorage.getItem('local');
this.itemCarts = JSON.parse(data);
console.log(this.itemCarts.length);
console.log(this.itemCarts)
for (let index = 0; index < this.itemCarts.length; index++) {
  if(parseInt(id) === parseInt(this.itemCarts[index].id)){
    this.itemCarts[index].qty = this.data.qty;
    indexs= index;
    break;

  }

}
if(indexs == -1){
  this.itemCarts.push(this.data);
  localStorage.setItem('local',JSON.stringify(this.itemCarts))
}
else{
  localStorage.setItem('local',JSON.stringify(this.itemCarts))
}
 }
this.cartNumberFunc();
}
cartNumber =0;
cartNumberFunc(){
  var data:any = localStorage.getItem('local');
  var cartValue = JSON.parse(data);
  this.cartNumber = cartValue.length;
this._commonSerivces.carSubject.next(this.cartNumber)
}






}



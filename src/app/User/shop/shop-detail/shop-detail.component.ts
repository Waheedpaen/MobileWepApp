import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/admin/brand/services/brand-service/brand.service';
import { MobileServiceService } from 'src/app/admin/mobile/services/mobile-service/mobile-service.service';
import { OperatingsystemService } from 'src/app/admin/operating-system/services/operatingsystem-service/operatingsystem.service';
import { OSVersionService } from 'src/app/admin/os-version/services/operatingsystem-version-service/osversion.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
_id!:number;
  response: any;
  data: any ={};
  constructor(
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

}

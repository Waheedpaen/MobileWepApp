import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MobileServiceService } from '../services/mobile-service/mobile-service.service';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.css']
})
export class MobileDetailComponent implements OnInit {
  response: any;
  @Input() Id!: number;
  @Input() statusCheck: any;
  data: any = {};
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal,
    public _mobileServices: MobileServiceService
    ) { }

  ngOnInit() {
    this.mobileDetail();
  }



  mobileDetail(){
    debugger
    this.spinner.show();
    console.log(this.Id);
    this._mobileServices.GetMobileDetail(this.Id).subscribe(res=>{
      this.response = res;
      if(this.response.success == true){
        this.data = this.response.data;
        this.spinner.hide();
       }
      else{
        this.toastr.error(this.response.message,'Message .');
        this.spinner.hide();
      }
        },err=>{
          if(err.status == 400){
            this.toastr.error(this.response.message,'Message.');
            this.spinner.hide();
          }
        }
      );
    }





  }

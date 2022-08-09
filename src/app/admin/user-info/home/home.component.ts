import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/admin/brand/services/brand-service/brand.service';
import jwt_decode from 'jwt-decode';
import { AuthSystemService } from 'src/app/Shared/auth/auth.system.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   rows: any = [];
  response: any;
  constructor(
    private toastr: ToastrService,
    private serviceSystem: AuthSystemService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
   public _brandService: BrandService,
   ) { }
  ngOnInit() {
    // this.brandList();
    
  }
  // brandList(){
  //   this._brandService.GetBrandList().subscribe((data:any)=>{
  //     this.response = data;
  //     if(this.response.success  == true){
  //       debugger

  //       this.rows = this.response.data;
  //       this.spinner.hide;
  //     }
  //     else{
  //       this.toastr.error(this.response.message,'Message. ')
  //     }},
  //   err=>{
  //   if(err.status ==400){
  //     this.toastr.error(err.error.message,'Message .')
  //   }
  //   })
  // }
  getDecodedAccessToken(token: any): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
}





}

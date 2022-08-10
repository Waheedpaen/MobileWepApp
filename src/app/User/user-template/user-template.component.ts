import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/admin/brand/services/brand-service/brand.service';
import jwt_decode from 'jwt-decode';
import { AuthSystemService } from 'src/app/Shared/auth/auth.system.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Shared/services/common.service';
@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {
  rows: any = [];
  totalCartCount = 0;
  response: any;
  constructor(
    public _commonSerivces:CommonService,
    private toastr: ToastrService,
    private serviceSystem: AuthSystemService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router,
   public _brandService: BrandService,
   ) {
    this._commonSerivces.carSubject.subscribe((data:any)=>{
      this.totalCartCount = data;
    })
   }
  ngOnInit() {
    // this.brandList();
    let tokenInfo = this.getDecodedAccessToken(sessionStorage.getItem('Token'));
     this.response = tokenInfo
  this.countCartTotal();
  }

  countCartTotal(){
     if(localStorage.getItem('local') !=null){
      const data :any= localStorage.getItem('local');
      var total = JSON.parse(data)
       this.totalCartCount = total.length;

     }
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
signOut(): void {


  // this.name =localStorage.getItem()


  Swal.fire({
    title: 'Do you want to logout your session?Kindly confirm',

    showCancelButton: true,
    confirmButtonText: `Yes Log me out`,

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.spinner.hide();
      sessionStorage.setItem('STATE', 'false');
      sessionStorage.setItem('ROLE', '');
      sessionStorage.removeItem('Token');
      this.response = null;
      sessionStorage.clear();
       this.router.navigate(['/shop/temp/product']);
       this.spinner.hide();
  //  location.reload();
    } else if (result.isDenied) {

    }
  })
    }
}

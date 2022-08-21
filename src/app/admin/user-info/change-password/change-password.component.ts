import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Shared/Components/login/services/user-service/user.service';
import { Brand } from '../../brand/brand-entity/brand';
import { BrandService } from '../../brand/services/brand-service/brand.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any;
  @Input() Id!: number;
  @Input() statusCheck: any;
  data: any = {};

  @ViewChild(NgForm) Form: any;
    response: any;
    file: string | ArrayBuffer | null | undefined;
    constructor(
      public _userServices: UserService,
      public formBulider:UntypedFormBuilder,
      private spinner: NgxSpinnerService,
      private toastr: ToastrService,
      private brandServices: BrandService,
      private _NgbActiveModal: NgbActiveModal) {
        this.form = this.formBulider.group({

          Name:['', [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]],

        })

         }
    ngOnInit() {
      this.statusCheck = this.statusCheck;

    }

    get activeModal() {
      return this._NgbActiveModal;
    }


    changePassword(form: NgForm){

    let data:any={
    id :this.Id,
    Password: this.form.value.Name,
     }
    this._userServices.ChangePassword(data).subscribe(
      (res: any) =>{
        this.response = res;
        if(this.response.success == true){
          this.toastr.success(this.response.message,'Message.');
          this.activeModal.close(true);
          this.spinner.hide();
        }
        else {
          this.toastr.error(this.response.message,'Message.');
          this.spinner.hide();
        }
      },
      (err:HttpErrorResponse)=>{
        const message = this.brandServices.extractErrorMessagesFromErrorResponse(err);
        this.toastr.error(message.toString(),'Message.')
        console.log(message);
        this.spinner.hide();
      }
    );
    }
    onSubmit(buttonType:any):void {
      if(buttonType === "add"){

      }
      if(buttonType === "update"){
        this.changePassword(this.Form);
      }
    }
   

}

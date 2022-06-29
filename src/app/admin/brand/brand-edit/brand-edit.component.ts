import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../brand-entity/brand';
import { BrandService } from '../services/brand-service/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
form: any;
@Input() Id!: number;
@Input() statusCheck: any;
data: any = {};

@ViewChild(NgForm) Form: any;
  response: any;
  constructor(  public formBulider:UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
   private brandServices: BrandService,
    private _NgbActiveModal: NgbActiveModal) {
      this.form = this.formBulider.group({
        Id:[''],
        Name:['', [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]]})
       }
  ngOnInit() {
    this.statusCheck = this.statusCheck;
    if (this.statusCheck == 'Edit') {
      this.getBrandDetail();
    }
  }
getBrandDetail(){

  this.spinner.show();
  this.brandServices.GetBrandDetail(this.Id).subscribe(
    res=>{
  this.response = res;
  if(this.response.success == true){
    this.data = this.response.data;
    this.form.controls.Id.setValue(this.data?.id);
    this.form.controls.Name.setValue(this.data?.name);
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
  get activeModal() {
    return this._NgbActiveModal;
  }
  addBrand(form: NgForm){
console.log(form);
this.spinner.show();
const obj = new Brand();
obj.name = this.form.get('Name')?.value;
this.brandServices.SaveBrandData(obj).subscribe(
  res=>{
    this.response = res;
    if(this.response.success == true){
      this.toastr.success(this.response.message,'Message.');
      this.activeModal.close();
      this.spinner.hide();
    }
    else{
      this.toastr.error(this.response.message,'Message.');
      this.spinner.hide();
    }
  },
  (err: HttpErrorResponse)=>{
    const message = this.brandServices.extractErrorMessagesFromErrorResponse(err);
    this.toastr.error(message.toString(),'Message .');
    console.log(message);
    this.spinner.hide();
  });
  }

  updateBrand(form: NgForm){
  this.spinner.show();
  const obj = new  Brand();
  obj.id = +this.form.get('Id')?.value;
  obj.name = this.form.get('Name')?.value,
  this.brandServices.UpdateBrandData(obj).subscribe(
    (    res: any) =>{
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
      this.addBrand(this.Form)
    }
    if(buttonType === "update"){
      this.updateBrand(this.Form);
    }
  }

}

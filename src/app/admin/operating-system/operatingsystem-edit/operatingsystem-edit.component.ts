import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators, UntypedFormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../brand/brand-entity/brand';
import { BrandService } from '../../brand/services/brand-service/brand.service';
import { OperatingSystem } from '../operatingsystem-entity/operatingsystem-entity';
import { OperatingsystemService } from '../services/operatingsystem-service/operatingsystem.service';


@Component({
  selector: 'app-operatingsystem-edit',
  templateUrl: './operatingsystem-edit.component.html',
  styleUrls: ['./operatingsystem-edit.component.css']
})
export class OperatingsystemEditComponent implements OnInit {
  form: any;
  @Input() Id!: number;
  @Input() statusCheck: any;
  data: any = {};

  @ViewChild(NgForm) Form: any;
    response: any;
    constructor(  public formBulider:UntypedFormBuilder,
      private spinner: NgxSpinnerService,
      private toastr: ToastrService,
     private  operatingsystemService: OperatingsystemService,
      private _NgbActiveModal: NgbActiveModal) {
        this.form = this.formBulider.group({
          Id:  new UntypedFormControl(null),
          Name: new UntypedFormControl(null, [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)])
        })
      }
    ngOnInit() {
      this.statusCheck = this.statusCheck;
      if (this.statusCheck == 'Edit') {
        this.getOSDetail();
      }
    }
  getOSDetail(){
    this.spinner.show();
    this.operatingsystemService.GetOSDetail(this.Id).subscribe(
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
    addOperatingSystemData(form: NgForm){
  console.log(form);
  this.spinner.show();
  const obj = new OperatingSystem();
  obj.name = this.form.value.Name;
  this.operatingsystemService.SaveOperatingSystemData(obj).subscribe(
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
      const message = this.operatingsystemService.extractErrorMessagesFromErrorResponse(err);
      this.toastr.error(message.toString(),'Message .');
      console.log(message);
      this.spinner.hide();
    });
    }

    updateOperatingSystemData(form: NgForm){
    this.spinner.show();
    const obj = new  OperatingSystem();
    obj.id =  this.form.value.Id,
    obj.name = this.form.value.Name,
    this.operatingsystemService.UpdateOperatingSystemData(obj).subscribe(
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
        const message = this.operatingsystemService.extractErrorMessagesFromErrorResponse(err);
        this.toastr.error(message.toString(),'Message.')
        console.log(message);
        this.spinner.hide();
      }
    );
    }
    onSubmit(buttonType:any):void {
      if(buttonType === "add"){
        this.addOperatingSystemData(this.Form)
      }
      if(buttonType === "update"){
        this.updateOperatingSystemData(this.Form);
      }
    }
}

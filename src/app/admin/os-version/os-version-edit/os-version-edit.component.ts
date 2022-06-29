import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators, UntypedFormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { OperatingsystemService } from '../../operating-system/services/operatingsystem-service/operatingsystem.service';
import { OperatingSystemVersion } from '../os-version-entity/OSVersion-enity';
import { OSVersionService } from '../services/operatingsystem-version-service/osversion.service';

@Component({
  selector: 'app-os-version-edit',
  templateUrl: './os-version-edit.component.html',
  styleUrls: ['./os-version-edit.component.css']
})
export class OsVersionEditComponent implements OnInit {
@Input() Id!: number  ;
@Input() statUsCheck!: any;
// objos and objos1 have meaning..decalre array;
objOS: any [] =[];
objOS1 :any= [];
response: any;
form: any;
  @ViewChild(NgForm) Form: any;
  data: any;
  constructor(private http: HttpClient,
  public operatingSystemServices:OperatingsystemService,
  public osVersionServices:OSVersionService,
  public formBulider:UntypedFormBuilder,
  private spinner: NgxSpinnerService,
  private toastr: ToastrService,
  private _NgbActiveModal: NgbActiveModal) {
    this.form = this.formBulider.group({

      Id:  new UntypedFormControl(null),
      Name: new UntypedFormControl(null, [Validators.required,Validators.minLength(3)]),
      OperatingSystemId: new UntypedFormControl(null, [Validators.required])
    })


  }
  get activeModal() {
    return this._NgbActiveModal;
  }
  ngOnInit(): void {
    this.OperatingSystemDataForDropDown();
    this.statUsCheck = this.statUsCheck;
    if (this.statUsCheck == 'Edit') {
      this.osVersionDetailData();
    }
  }
  osVersionDetailData(){
   this.spinner.show();
   this.osVersionServices.GetOSVersionDetail(this.Id).subscribe(
   res=>{
    this.response = res;
    if(this.response.success == true){

      this.form.controls.Id.setValue(this.response.data?.id);
      this.form.controls. OperatingSystemId.setValue(this.response.data?.operatingSystemId);
      this.form.controls.Name.setValue(this.response.data?.name);

      this.spinner.hide();
    }
    else{
      this.toastr.error(this.response.mesasage,'Message');
      this.spinner.hide();
    }
  },err=>{
    if(err.status == 400){
      this.toastr.error(this.response.message,'Message.');
      this.spinner.hide();
    }
  })
  }
  updateOsversion(form:NgForm){
    debugger;
    this.spinner.show();
    const obj = new OperatingSystemVersion();
    obj.id= this.form.value.Id,
    obj.name = this.form.value.Name;
    obj.operatingSystemId = this.form.value.OperatingSystemId;
    this.osVersionServices.UpdateOSVersionData(obj).subscribe(
      res =>{
     this.response = res;
     if(this.response.success ==  true){
       this.toastr.success(this.response.message,'Message,');
       this.activeModal.close(true);
       this.spinner.hide();
     }
     else{
       this.toastr.error(this.response.mesasage,'Message . ');
       this.spinner.hide();
     }
      },(err: HttpErrorResponse)=>{
        const message = this.operatingSystemServices.extractErrorMessagesFromErrorResponse(err);
        this.toastr.error(message.toString(),'Message .');
        console.log(message);
        this.spinner.hide();
      }
    )
  }
  addOsversion(form: NgForm){
debugger;
    console.log(form);
    this.spinner.show();
    const obj = new OperatingSystemVersion();
    obj.name = this.form.get('Name')?.value;
    obj.operatingSystemId = +this.form.get('OperatingSystemId')?.value;
    this.osVersionServices.SaveOSVersionData(obj).subscribe(
      res=>{
        this.response = res;
        if(this.response.success == true){
          this.toastr.success(this.response.message,'Message.');
          this.activeModal.close(true);
          this.spinner.hide();
        }
        else{
          this.toastr.error(this.response.message,'Message');
        }
      }, (err: HttpErrorResponse)=>{
        const message =  this.operatingSystemServices.extractErrorMessagesFromErrorResponse (err);
        this.toastr.error(message.toString(),'.Message');
        console.log(message);
      }
      )
  }
  onSubmit(buttonType: any){
    if(buttonType === "Add"){
      this.addOsversion(this.Form);
    }
    if(buttonType === "Edit"){
      this.updateOsversion(this.Form);
    }

  }
  OperatingSystemDataForDropDown(){
    this.operatingSystemServices.GetOperatingList().subscribe(
     (obj :any)=>{
       this.objOS = obj.data;
     }
    )
  }
  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
}

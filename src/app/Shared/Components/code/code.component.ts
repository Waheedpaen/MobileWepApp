import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { UserService } from '../login/services/user-service/user.service';



@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  @Input() email: any;
  response: any;
  data:any={};
  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public userService: UserService
    ){ }

  ngOnInit(): void {
  }
  send(){
       this.spinner.show();
this.userService.verifyEmailCodeAndEmailCheck(this.email,this.data.code)
    .subscribe(
      res=>{
  this.response = res;
  if(this.response.success == true){
    this.userService.hidden = false;
    this.spinner.hide();
    this.activeModal.close(true);
    this.toastr.success('Code Verified', 'Message.');
  }
  else{

    this.toastr.error(this.response.message, 'Message.');
    this.spinner.hide();
  }
}
    )
  }

  get activeModal() {
    return this._NgbActiveModal;
    }

}

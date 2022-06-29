import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  constructor(private toastr: ToastrService) {
  }

  showSuccessMesssage(msg: any) {
    this.toastr.success(msg, 'Success!', {
      timeOut: 3000,
    });
  }

  showFailedMessage(msg: any) {
    this.toastr.error(msg, 'Failed', {
      timeOut: 3000,
    });
  }
  showWarning(msg: any){
    this.toastr.warning(msg,'',{
      timeOut:3000
    });
  }
}

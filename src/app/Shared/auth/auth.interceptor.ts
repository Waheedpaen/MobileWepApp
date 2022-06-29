import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
// import { UserService } from '@app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from "rxjs/operators";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
 response:any;
 constructor(private router: Router,
  private toastr: ToastrService,) {

}
public tokenExpired(token: string){

  const expiry =    (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() /1000))> expiry;

}
intercept(req: HttpRequest<any>, next: HttpHandler) {
 debugger
  if (localStorage.getItem('token') != null) {
      const clonedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
          tap(
              succ => {


               },
              err => {
                  if (err.status == 401 || err.status == 0 || err.status == 403){
                      localStorage.removeItem('token');
                      this.router.navigateByUrl('');
                  }
              }
          )
      )
  }
  else{
      return next.handle(req.clone());
   }

}

}

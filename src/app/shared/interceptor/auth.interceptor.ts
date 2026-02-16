import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _spinner : SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //spinner Starts
    this._spinner.setSpinner(true)
      
    const modifyReq = request.clone({
      setHeaders: {
        "Auth" : 'Token from LS'
      }
    })
    return next.handle(modifyReq).pipe(
      finalize(() => {
        //spinner stops 
        this._spinner.setSpinner(false)
      })
    )
  }
}

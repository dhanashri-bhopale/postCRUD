import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private spinnerSub : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  spinnerObs$ : Observable<boolean> = this.spinnerSub.asObservable()

  setSpinner(flag : boolean){
    this.spinnerSub.next(flag)
  }
}

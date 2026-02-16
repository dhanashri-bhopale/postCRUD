import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar : MatSnackBar
  ) { }

  openSnackbar(msg: string){
    this._snackBar.open(msg, 'Close', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 2000
    })
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const matArr = [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule]

@NgModule({
  declarations: [],
  imports: [
    ...matArr
  ],
  exports: [
    ...matArr
  ]
})
export class MaterialModule { }

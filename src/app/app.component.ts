import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'postCRUD';

  private _spinner = inject(SpinnerService)

  isLoading : boolean = false

  ngOnInit(): void {
    this._spinner.spinnerObs$.subscribe(flag => {
      this.isLoading = flag
    })
  }
}

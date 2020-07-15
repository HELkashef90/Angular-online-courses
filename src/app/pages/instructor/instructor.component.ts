import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService, private _spinnerService: SpinnerService) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this._spinnerService.showFullScreenSpinner()
    setTimeout(() => {
      this._spinnerService.hideFullScreenSpinner()
    }, 5000);
    setTimeout(() => {
      this._lazyLoadScript.loadAllScripts()
    }, 2000);
  }
}

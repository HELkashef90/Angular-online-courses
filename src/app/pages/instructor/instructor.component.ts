import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { ProtectVideosService } from 'src/app/services/protectVideos/protect-videos.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService, private _spinnerService: SpinnerService,
    private _localizationService: LocalizationService, private _protectVideosService : ProtectVideosService) { 
      // this._protectVideosService.check()
     }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   // this._localizationService.setUserLang('ar')
    // }, 10000);
    // this._spinnerService.showFullScreenSpinner()
    // setTimeout(() => {
    //   this._spinnerService.hideFullScreenSpinner()
    // }, 5000);
    // setTimeout(() => {
    //   this._lazyLoadScript.loadAllScripts()
    // }, 2000);
  }
}

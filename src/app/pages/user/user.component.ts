import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';
import { ProtectVideosService } from 'src/app/services/protectVideos/protect-videos.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService,private _protectVideosService : ProtectVideosService) { 
    console.log('user constructor');
    
    // this._protectVideosService.check()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    // setTimeout(() => {
    //   this._lazyLoadScript.loadAllScripts()
    // }, 500);
  }
}

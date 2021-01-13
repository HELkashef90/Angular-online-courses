import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService) {
    console.log('user constructor');

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    // setTimeout(() => {
    //   this._lazyLoadScript.loadAllScripts()
    // }, 500);
  }
}

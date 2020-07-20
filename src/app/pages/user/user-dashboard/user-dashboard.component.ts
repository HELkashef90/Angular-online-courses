import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

 
  constructor(private _lazyLoadScript: LazyLoadScriptsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this._lazyLoadScript.loadAllScripts()
    }, 500);
  }
}

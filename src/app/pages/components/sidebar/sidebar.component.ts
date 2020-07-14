import { LazyLoadScriptsService } from './../../../services/lazyLoadScripts/lazy-load-scripts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _lazyLoadScript : LazyLoadScriptsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this._lazyLoadScript.loadAllScripts()
  }
  ngOnDestroy(){}
}

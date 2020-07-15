import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService) { }

  ngOnInit(): void {
  }
  // ngAfterViewInit() {
  //   this._lazyLoadScript.loadScript("assets/js/popper.min.js")
  // }
}

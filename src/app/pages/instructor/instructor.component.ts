import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  constructor(private _lazyLoadScript : LazyLoadScriptsService) { }

  ngOnInit(): void {
  }
 ngAfterViewInit(){
    this._lazyLoadScript.loadAllScripts()
  }
}

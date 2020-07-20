import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';

@Component({
  selector: 'app-user-view-course',
  templateUrl: './user-view-course.component.html',
  styleUrls: ['./user-view-course.component.scss']
})
export class UserViewCourseComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this._lazyLoadScript.loadAllScripts()
    }, 500);
  }
}

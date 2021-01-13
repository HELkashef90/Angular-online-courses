import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { CourseService } from '../services/course/course.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {


  dashboardArray = {
    total_active_courses: 0,
    total_pending_courses: 0
  };
  approvedCoursesArray = []
  constructor(private _dashboard: DashboardService, private _spinner: SpinnerService, private _course: CourseService) { }

  ngOnInit(): void {
    this.getDashboardData()
  }
  getDashboardData() {
    this._spinner.showFullScreenSpinner()

    forkJoin([this._dashboard.getDashboardDta(), this._course.getAllApproved(1, 4)]).subscribe(res => {
      console.log(res[0]);
      console.log(res[1]);
      this.dashboardArray = res[0]['body'] || []
      this.approvedCoursesArray = res[1]['body']['content'] || []
      this._spinner.hideFullScreenSpinner()

    }, err => {
      this._spinner.hideFullScreenSpinner()
      console.log(err);
    })

  }
}

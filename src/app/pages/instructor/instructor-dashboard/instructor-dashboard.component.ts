import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { DashboardService } from './../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {
  dashboardArray = {
    total_active_courses: 0,
    total_courses: 0,
    total_pending_courses: 0,
    total_sales: 0,
    total_students: 0
  };

  constructor(private _dashboard: DashboardService, private _spinner: SpinnerService) { }

  ngOnInit(): void {
    this.getDashboardData()
  }
  getDashboardData() {
    this._spinner.showFullScreenSpinner()
    this._dashboard.getDashboardDta().subscribe(res => {
      console.log(res);
      this.dashboardArray = res['body'] || []
      this._spinner.hideFullScreenSpinner()
    }, err => {
      this._spinner.hideFullScreenSpinner()
      console.log(err);

    })
  }

}

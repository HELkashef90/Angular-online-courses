import { Component, OnInit } from '@angular/core';
import { CourseService } from './../services/course/course.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  totalPages = 0;
  totalApprovedCourses: any;
  approvedCoursesArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;

  constructor(private _courseService: CourseService) { }

  ngOnInit(): void {
    console.log('on init');

    this.getAllCourses()
  }
  getAllCourses() {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._courseService.getAllApproved(this.reqPageNum, this.pageSize).subscribe(res => {
      if (res['statusCodeValue'] === 204) {
        this.lastPage = true
        this.loading = false
        console.log(this.approvedCoursesArray);
        return
      } else {
        console.log(res);
        this.reqPageNum += 1;
        this.totalPages = res['body']['totalPages']
        this.totalApprovedCourses = res['body']['totalElements']
        this.approvedCoursesArray.push(...res['body']['content'])
        this.loading = false
        this.lastPage = res['body']['last']
      }

      // console.log(this.totalApprovedCourses);
      // console.log(this.approvedCoursesArray);
    }, err => {
      this.loading = false
      console.log(err);

    })
  }

  onScroll() {
    this.getAllCourses()
  }
  onSearchClick(){
    var filter = document.querySelector(".filter");
    filter.classList.toggle('showFilter')

  }
}

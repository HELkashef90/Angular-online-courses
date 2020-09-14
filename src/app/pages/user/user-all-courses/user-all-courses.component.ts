import { CourseService } from './../services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-all-courses',
  templateUrl: './user-all-courses.component.html',
  styleUrls: ['./user-all-courses.component.scss']
})
export class UserAllCoursesComponent implements OnInit {
  totalPages = 0;
  totalApprovedCourses: any;
  approvedCoursesArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  searchForm: FormGroup;

  constructor(private _courseService: CourseService,private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllCourses()
    this.initForm()
  }
  initForm() {
    this.searchForm = this._formBuilder.group({
      course_name: [''],
      instructor_name: [''],
      level_id: [0],
      language_id: [0],
    });

  }
  getAllCourses(body = {}) {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._courseService.getAllCourses(this.reqPageNum, this.pageSize, body).subscribe(res => {
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
  // getAllCourses() {
  //   // console.log(this.reqPageNum, this.totalPages, this.lastPage);
  //   if (this.lastPage || this.loading) {
  //     return false;
  //   }
  //   this.loading = true
  //   this._courseService.getAllApproved(this.reqPageNum, this.pageSize).subscribe(res => {
  //     if (res['statusCodeValue'] === 204) {
  //       this.lastPage = true
  //       this.loading = false
  //       console.log(this.approvedCoursesArray);
  //       return
  //     } else {
  //       console.log(res);
  //       this.reqPageNum += 1;
  //       this.totalPages = res['body']['totalPages']
  //       this.totalApprovedCourses = res['body']['totalElements']
  //       this.approvedCoursesArray.push(...res['body']['content'])
  //       this.loading = false
  //       this.lastPage = res['body']['last']
  //     }

  //     // console.log(this.totalApprovedCourses);
  //     // console.log(this.approvedCoursesArray);
  //   }, err => {
  //     this.loading = false
  //     console.log(err);

  //   })
  // }

  onScroll(searchForm?) {
    this.getAllCourses(searchForm.value)
    // search ? this.onSearchClick(search, null, false) : this.getAllEnrollment();
  }
  onFilterClick(){
    var filter = document.querySelector(".filter");
    filter.classList.toggle('showFilter')

  }
  onSearchClick(searchForm){
    console.log(searchForm);
    this.resetTable(false)
    this.getAllCourses(searchForm.value);
  }
  resetTable(getAllEnrollment = true) {
    this.totalPages = 0;
    this.totalApprovedCourses = 0
    this.approvedCoursesArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
    getAllEnrollment ? this.getAllCourses(this.searchForm.value) : null
  }
}

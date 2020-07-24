import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-study-course',
  templateUrl: './user-study-course.component.html',
  styleUrls: ['./user-study-course.component.scss']
})
export class UserStudyCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  back() {
    window.history.back()
  }
}

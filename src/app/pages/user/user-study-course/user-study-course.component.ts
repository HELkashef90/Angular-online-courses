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

  ngAfterViewInit() {
    var sidebarBtn = document.getElementById('collapse_menu');

    sidebarBtn.onclick = function menuAnimation() {
      //alert('working')
      var verticalSideBar = document.querySelector(".vertical_nav");
      verticalSideBar.classList.toggle("vertical_nav__minify");
      var wrapper = document.querySelector(".wrapper");
      wrapper.classList.toggle("wrapper__minify");
      var sidekickToggle = document.querySelector(".chapterListToggle");
      sidekickToggle.classList.toggle("minify");
    }
  }
}

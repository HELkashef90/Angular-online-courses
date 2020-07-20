import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-add-lecture',
  templateUrl: './instructor-add-lecture.component.html',
  styleUrls: ['./instructor-add-lecture.component.scss']
})
export class InstructorAddLectureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onFileChange($event) {
    console.log($event);

  }
}

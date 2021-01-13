import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses-purchase-history',
  templateUrl: './courses-purchase-history.component.html',
  styleUrls: ['./courses-purchase-history.component.scss']
})
export class CoursesPurchaseHistoryComponent implements OnInit {

  constructor(    private translate: TranslateService
    ) { }

  ngOnInit(): void {
  }

}

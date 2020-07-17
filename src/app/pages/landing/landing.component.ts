import { LocalizationService } from './../../services/localization/localization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private _localizationService : LocalizationService) { 
  }

  ngOnInit(): void {
  }

}

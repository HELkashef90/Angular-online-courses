import { SpinnerService } from './../../services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {
  token: any;
  successActive: boolean;

  constructor(private activatedRoute: ActivatedRoute, private _auth: AuthService,
    private _toastService: ToastService, private _spinner: SpinnerService) {
    _spinner.showFullScreenSpinner()
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token')
    console.log(this.token);
    this._auth.activeAccount(this.token).subscribe(res => {
      this.successActive = true;
      this._spinner.hideFullScreenSpinner()
    }, err => {
      this.successActive = false;
      this._spinner.hideFullScreenSpinner()
    })
  }

}

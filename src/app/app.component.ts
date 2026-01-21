import { Component, ViewChild} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from './services/report/common.service';
import {  OnInit,  } from '@angular/core';

import { DatePipe } from '@angular/common';
import { AlertMessageComponenent } from './commoncomponents/alertpopup/alertpopup.component';
import { RepaymentService } from './services/report/repayment.service';
import { Form, NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  constructor(public appSettings:AppSettings,
    public router: Router){
      this.settings = this.appSettings.settings;
  } 

  ngOnInit() {
    // this.router.navigateByUrl('/privacypolicy')

   }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardsecond',
  templateUrl: './dashboardsecond.component.html',
  styleUrls: ['./dashboardsecond.component.scss']
})
export class DashboardsecondComponent implements OnInit {
  datakey: number;

  constructor(public router: Router) { }

  ngOnInit() {
  }
  installment(){
    this.router.navigateByUrl('/repayment/installment-receipt')

  }
  Settlement(){
    this.router.navigateByUrl('/repayment/settlement')

  }
  AccountStatement(){
    this.router.navigateByUrl('/repayment/installment-schedule-account-statement')

   
  }

}

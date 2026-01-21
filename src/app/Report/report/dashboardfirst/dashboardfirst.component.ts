import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../pages/login/authentication.service';

@Component({
  selector: 'app-dashboardfirst',
  templateUrl: './dashboardfirst.component.html',
  styleUrls: ['./dashboardfirst.component.scss']
})
export class DashboardfirstComponent implements OnInit {

  constructor(public router: Router , public authenticationService :AuthenticationService) { }

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
  Outstanding(){
    this.router.navigateByUrl('/personal-report/outstanding')

  }
  DisbursementCancel(){
    this.router.navigateByUrl('/personal-report/disbursement-cancel-request')

  }
  DisbursementCancelapproval(){
    this.router.navigateByUrl('/personal-report/disbursement-cancel-approval')

  }
  Report(){
    this.router.navigateByUrl('/personal-report/report')

  }
  DetailAccountStatement(){
    this.router.navigateByUrl('/personal-report/detail-account-statement')

  }
  ManualEntry(){
    this.router.navigateByUrl('/personal-report/manual-entry')

  }
  Payu(){
    this.router.navigateByUrl('/personal-report/payu-updation')

  }
  Duelist(){
    this.router.navigateByUrl('/report/due-list')

  }
  outstandingreport(){
    this.router.navigateByUrl('/personal-report/customer-wise')

  }
  Downloadagreement(){
    this.router.navigateByUrl('/personal-report/agreement-download')

  }
  Declaration(){
    this.router.navigateByUrl('/personal-report/declaration')

  }
  DisbursementReport(){
    this.router.navigateByUrl('/personal-report/disbursement-report')

  }
  rbi(){
    this.router.navigateByUrl('/personal-report/rbi-report')

  }
  arbitrationrp(){
    this.router.navigateByUrl('/personal-report/arbitration-report')

  }
  enachpre(){
    this.router.navigateByUrl('/personal-report/e-nach-presentation')

  }
  Enachre(){
    this.router.navigateByUrl('/personal-report/e-nach-realisation')

  }
  enachapp(){
    this.router.navigateByUrl('/personal-report/e-nach-disbursement-approval')

  }
  EligibilityApproval(){
    this.router.navigateByUrl('/personal-report/eligibility-approval')

  }
  EligibilityUpdate(){
    this.router.navigateByUrl('/personal-report/eligibility-updation')

  }
  collectionpre(){
    this.router.navigateByUrl('/personal-report/collection-presentation')

  }
  chargesbulk(){
    this.router.navigateByUrl('/personal-report/charge-bulk-upload')

  }
  enachsend(){
    this.router.navigateByUrl('/personal-report/enach-resend')

  }
  noc(){
    this.router.navigateByUrl('/personal-report/noc')

  }
  bulkupload(){
    this.router.navigateByUrl('/personal-report/bulk-upload')

  }
  enachupload(){
    this.router.navigateByUrl('/personal-report/enach-upload')

  }
  enachurl(){
    this.router.navigateByUrl('/personal-report/enachlink')
  }
  disbexcel(){
    this.router.navigateByUrl('/personal-report/disbexcl')

  }
  waiverentry(){
    this.router.navigateByUrl('/personal-report/waiver-entry')

  }
  waiverapprval(){
    this.router.navigateByUrl('/personal-report/waiver-approval')

  }
  payuupload(){
    this.router.navigateByUrl('/personal-report/payuupload')

  }
insurance(){
  this.router.navigateByUrl('/personal-report/insurance')
}
sanctionletter(){
  this.router.navigateByUrl('/personal-report/sanction-letter')

}
 


}

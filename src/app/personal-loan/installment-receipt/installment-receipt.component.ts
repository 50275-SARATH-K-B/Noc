import { Component, OnInit } from '@angular/core';
import { Settings } from '../../app.settings.model';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LoanSearchComponent } from '../../common/loan-search/loan-search.component';
import { AlertMessageComponenent } from '../../commoncomponents/alertpopup/alertpopup.component';
import { RepaymentService } from '../../services/report/repayment.service';
import { CommonService } from '../../services/report/common.service';
import { AppSettings } from '../../app.settings';


@Component({
  selector: 'app-installment-receipt',
  templateUrl: './installment-receipt.component.html',
  styleUrls: ['./installment-receipt.component.scss']
})
export class InstallmentReceiptComponent implements OnInit {
  public settings: Settings;
  LoanDate: any;
  LoanAmount: any;
  loanID: any; 
  userData: any;
  paymentModeList: any;
  customerName: any;
  customerID: any;
  PaymentModeID: any;
  ledgerId: any;
  InstallmentPaid: any;
  TotalInstallment: any;
  UnpaidInstallment: any;
  TotalInterest: any;
  paymentModeSearchType: any;
  paymentMode: any;
  instrumentReference: any;
  instrumentDate: any;
  accountListType: any;
  accountList: any;
  showPaymentMethodExtras: boolean;
  NextInstallment: any;
  LateFee: any;
  OtherCharge: any;
  CurrentDue: any;
  AmountToBePaid: any;
  DueDte: any;
  subledger: any;
  ChequeBounce: any;
  futurePrinciple: any;
  AmountRcvd: any;
  loandtlsList: any;
  settlementAmount: any;
  collectionDate:any = new Date();
  today:any = new Date();
  constructor(public appSettings: AppSettings,
    public dialog: MatDialog,
    private commonService: CommonService,
    private repaymentService: RepaymentService,
    private datePipe: DatePipe
  ) { this.settings = this.appSettings.settings; }

  ngOnInit() {
    var now = new Date();
    console.log(this._rptdatePipe(now))

    this.userData = this.commonService.getCredentials();
    this.repaymentService.GetPaymentModeDetails({ flag: 1, product_id: this.userData['productID'] }).subscribe(res => {
      if (!!res && res['paymentModeList'] !== null) {
        this.paymentModeList = res['paymentModeList'];
      }
    })
    this.loanSearch();
    console.log(this.userData)
  }
  public loanSearch(): void {
    const dialogRef = this.dialog.open(LoanSearchComponent, {
      height: "80%",
      width: '75%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.settings.loadingSpinner = false;
        this.getSelectedLoanDetails(result.loanItem);
      }
    }, error => { this.settings.loadingSpinner = false; });
  }
  
  Clear() {
    this.AmountToBePaid = this.CurrentDue = this.DueDte = this.NextInstallment = this.LateFee = this.OtherCharge = undefined;
  }
  ClearLoan() {
    this.loanID = undefined;
    this.LoanDate = undefined;
    this.LoanAmount = undefined;
    this.customerName = undefined;
    this.customerID = undefined;
  }
  getSelectedLoanDetails(loanItem: any) {
    this.ClearLoan();
    this.loanID = loanItem.LoanId;
    this.LoanDate = loanItem.LoanDate;
    console.log(this.LoanDate)
    console.log(this._rptdatePipe(this.LoanDate))
    this.LoanAmount = loanItem.LoanAmount;
    this.customerName = loanItem.CustName;
    this.customerID = loanItem.CustID;
    if (!!this.loanID) {
      const params = {
        LoanID: this.loanID,
        TypeID: 1
      }
      this.settings.loadingSpinner = true;
      this.repaymentService.getLoanDetailsCollection(params).subscribe(res => {
        if (!!res && res['status'].code == 1) {
          this.Clear();
          this.loandtlsList = res['loanDetailsList'];
          if (!!this.loandtlsList[0].DueDate) {
            this.DueDte = this.loandtlsList[0].DueDate;
          }
          this.NextInstallment = this.loandtlsList[0].NextInstallment;
          this.LateFee = this.loandtlsList[0].LateFee;
          this.OtherCharge = this.loandtlsList[0].OtherCharges;
          this.CurrentDue = this.loandtlsList[0].CurrentDue;
          this.AmountToBePaid = this.loandtlsList[0].AmtToBePaid;
          this.TotalInterest = this.loandtlsList[0].AccInterest;
          this.settlementAmount = this.loandtlsList[0].SettlementValue;
          if (!!this.customerID) {
            const params = {
              LoginID: this.customerID
            }
            this.repaymentService.getCollectionDtls(params).subscribe(res => {
              if (!!res && res['status'].code == 1) {
                let custDtls = res['customerDetailsList'][0];
                let custDtlsStr = custDtls['CustName'];
                let custDtlsStrVal = custDtlsStr.split('^');
                this.InstallmentPaid = custDtlsStrVal[4];
                this.TotalInstallment = custDtlsStrVal[5];
                this.UnpaidInstallment = custDtlsStrVal[6];
              }
              else { this.settings.loadingSpinner = false; }
            }, error => { this.settings.loadingSpinner = false; })
          }
          let AmtToBePaid;
          if (!!this.CurrentDue) {
            if (+this.CurrentDue >= 0) {
              AmtToBePaid = (+this.CurrentDue) + (+this.LateFee);
            } else if (+this.CurrentDue < 0) {
              AmtToBePaid = (+this.CurrentDue) + (+this.NextInstallment);
            }
            if(AmtToBePaid<0){
              this.AmountToBePaid=0;
            }else{
              this.AmountToBePaid=AmtToBePaid.toFixed(2);
            }
          }
          this.settings.loadingSpinner = false;
        } else { this.settings.loadingSpinner = false; }
      }, error => {
        this.settings.loadingSpinner = false;
      })

    }
  }
  check(AmountRcvd){
    if(+AmountRcvd > +this.settlementAmount ){
      this.DisplayMessage('Maximum amount should be less than or equal to :'+this.settlementAmount, "Alert");
      this.AmountRcvd = undefined ;
    }
  }
  onChange(paymentModeSearchText) {
    if (!!paymentModeSearchText && paymentModeSearchText != null) {
      this.settings.loadingSpinner = true;
      var splitted = paymentModeSearchText.split("^", 3);
      this.ledgerId = splitted[0];
      this.PaymentModeID = splitted[1];
      this.paymentMode = splitted[2];
      if (this.PaymentModeID == 1) {// cash
        this.instrumentReference = ''
        this.instrumentDate = ''
        this.accountListType = ''
      }
      if (this.userData['branchID'] != 0) {
        const subAccountParms = {
          "AccountNo": this.ledgerId,
          // "Branch_ID": this.userData['branchID'],
          // "Firm_ID": this.userData['firmID'],
        };
        this.repaymentService.getSubAccountDetails(subAccountParms)
          .subscribe(result => {
            this.settings.loadingSpinner = false;
            this.accountList = result['accountList'];
            this.showPaymentMethodExtras = (this.accountList == "" || this.accountList == null) ? false : true;
          }, error => { console.log('There was an error: '); this.settings.loadingSpinner = false; });
      } else {
        let ledgerItem = this.paymentModeList.find(s => s.PaymentModeID == +this.PaymentModeID);
        this.showPaymentMethodExtras = false;
        if (ledgerItem['LedgerID'] != 33000)
          this.DisplayMessage("Account can't find. Please select other payment mode", "Alert");
        this.settings.loadingSpinner = false;
      }
    }

  }
  onChangeAction(subLederVal) {
    this.subledger = subLederVal;
  }
  private _rptdatePipe(DateValue) {
    var date = new Date(DateValue);
    const months = {
      1: 'JAN',
      2: 'FEB',
      3: 'MAR',
      4: 'APR',
      5: 'MAY',
      6: 'JUN',
      7: 'JUL',
      8: 'AUG',
      9: 'SEP',
      10: 'OCT',
      11: 'NOV',
      12: 'DEC'
    }
  //  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
   return date.getDate() + '/' +   months[date.getMonth() + 1] + '/' + date.getFullYear();
  }

  public SaveCollection(InstallmentForm) {
    var component =  this;
    if (this.showPaymentMethodExtras == false) {
      this.instrumentReference = "0";
      this.subledger = 0;
      var now = new Date();
      this.instrumentDate = this._rptdatePipe(now);
    }
    else {
      this.instrumentDate = this._rptdatePipe(this.LoanDate);
    }
    let payDtls: string = "";
    // payDtls = !!this.PaymentModeID ? this.PaymentModeID : '@';
    // payDtls = payDtls +"^"+ !!this.ledgerId ? this.ledgerId : '@';
    // payDtls = payDtls  +"^"+ !!this.subledger ? this.subledger : '@';
    // payDtls = payDtls  +"^"+ !!this.instrumentReference ? this.instrumentReference : '@';
    // payDtls = payDtls  +"^"+ !!this.instrumentDate ? this.instrumentDate: '@';
    if (!!this.PaymentModeID) { payDtls = payDtls + this.PaymentModeID + "^"; } else { payDtls = payDtls + 0 + "^"; }
    if (!!this.ledgerId) { payDtls = payDtls + this.ledgerId + "^"; } else { payDtls = payDtls + 0 + "^"; }
    if (!!this.subledger) { payDtls = payDtls + this.subledger + "^"; } else { payDtls = payDtls + 0 + "^"; }
    if (!!this.instrumentReference) { payDtls = payDtls + this.instrumentReference + "^"; } else { payDtls = payDtls + 0 + "^"; }
    if (!!this.instrumentDate) { payDtls = payDtls + this.instrumentDate + "^"; } else { payDtls = payDtls + 0 + "^"; }
    if (!!this.userData['branchID']) { payDtls = payDtls + this.userData['branchID'] + "^"; } else { payDtls = payDtls + 0 + "^"; }
     const params = {
      CustID: this.customerID,
      LoanID: this.loanID,
      CollectionAmt: this.AmountRcvd,
      PaymentDtls: payDtls,
      "Valuedt": this._rptdatePipe(this.collectionDate)
    }
    this.settings.loadingSpinner = true
    console.log(this.userData)
    console.log(params)
    this.repaymentService.Collection(params).subscribe(res => {
      if (!!res && res['status'].code == 1) {
        this.settings.loadingSpinner = false;
        this.DisplayMessage('Saved Successfully', 'Success');
        InstallmentForm.resetForm();
        this.loanID = undefined;

        setTimeout(() => {
          component.collectionDate = new Date();
        }, 2);
      }
      else {
        this.settings.loadingSpinner = false;
        this.DisplayMessage(res['status'].message, 'Alert');
      }
    }, error => { this.settings.loadingSpinner = false; })
  }
  DisplayMessage(message, type): any {
    const dialogRef = this.dialog.open(AlertMessageComponenent, {
      width: '30%',
      data: { message: message, type: type }
    });
    if (type == 'Success') {
      dialogRef.afterClosed().subscribe(result => {
        //this.commonService.setType("Settlement");
      });
    }
  }
  clear(InstallmentForm) {
    var component =  this;
    if (!!InstallmentForm) {
      InstallmentForm.resetForm();
      this.loanID = undefined;

      
      setTimeout(() => {
        component.collectionDate = new Date();
      }, 2);
    } else {
      this.Clear();
      this.ClearLoan();
    }
  }
}

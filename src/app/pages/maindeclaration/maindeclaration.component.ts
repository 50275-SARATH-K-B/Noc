import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LoanSearchComponent } from '../../common/loan-search/loan-search.component';
import { CommonService } from '../../services/report/common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertMessageComponenent } from '../../commoncomponents/alertpopup/alertpopup.component';
import { Settings } from '../../app.settings.model';
import { RepaymentService } from '../../services/report/repayment.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { ReportService } from '../../services/report/report.service';
@Component({
  selector: 'app-maindeclaration',
  templateUrl: './maindeclaration.component.html',
  styleUrls: ['./maindeclaration.component.scss']
})
export class MaindeclarationComponent implements OnInit {
  public settings: Settings;
  @ViewChild('pdfTemplate') pdfTemplate: ElementRef;

  userData: any;
  date2: Date;
  funID: any;
  LoanId: any;
  waiverListDetail: any[];
  Active = false;
  LosLettterActive: boolean;
  name: any;
  addressline1: any;
  today = new Date()
  father: any;
  HouseName: any;
  AddressLine2: any;
  Pincode: any;
  loandate2:any;
  loanamount: any;
  custid: any;
  loanslist: any[] = [];
  paymentModeSearchType:any




  constructor( public Activatedroute:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private commonService: CommonService,public route: ActivatedRoute,public service:RepaymentService) { }

  ngOnInit() {
    this.userData = this.commonService.getCredentials();
 let res2 ="05/27/2019 00:00:00"
 let datee = this._rptdatePipe(res2)
 console.log(datee)
    this.date2 = new Date();
    debugger
    if(!!this.data['funid']){
      this.getSelectedLoanDetails(this.data['funid']);

    }
    this.Activatedroute.paramMap.subscribe(params => {
      console.log(params)
      console.log(this.Activatedroute.snapshot.queryParams['custid'])
      this.custid =this.Activatedroute.snapshot.params['custid']; 

      this.getloans(this.custid)

      // this.custid = '01023100000520'
      // this.router.navigate(['/maindeclaration', { custid:30850007577013  }]);


  });

    // this.displayLoanSearchPopup();
  }
  getloans(custid){
    debugger

    let params = {
      Cust_id:this.custid
    }

    this.commonService.getallloans(params).subscribe(res=>{
      if(res['loanIdList'].length>0){
        this.loanslist = res['loanIdList']

      }else{
      this.displayMessage('No Loans Available for Customer', "Alert");

      }
    })
  }
  loandetailssearch(){
    this.getSelectedLoanDetails(this.LoanId);
    

  }
  // displayLoanSearchPopup(){
  //   this.clearDataSource()
  //   const dialogRef = this.dialog.open(LoanSearchComponent, {
  //     height: "80%",
  //     width: '75%',
  //     // data: { settled: true,dataKey:"",loanID:""}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (!!result) {
  //       this.LoanId = result.loanItem.LoanId;
  //     }    });
  // }
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
  customerdata(LoanId){
    this.loanamount = ""
    this.name = ""
    this.father = ""
    this.HouseName = ""
    this.AddressLine2 = ""
    this.Pincode = ""
    const params = {
      FirmID: 1,
      LoanNo: LoanId
    }
    this.service.getCustDetail(params).subscribe(res =>{
      console.log(res)
      if(!!res['customerDtlsList'][0]){
        this.Active = true;
        this.loanamount = res['customerDtlsList'][0]["LoanAmount"]
        this.name = res['customerDtlsList'][0]['Name'];
        this.father = res['customerDtlsList'][0]['father'];
        this.HouseName = res['customerDtlsList'][0]['HouseName'];
        this.AddressLine2 = res['customerDtlsList'][0]['AddressLine2'];
        this.Pincode = res['customerDtlsList'][0]['Pincode'];
      }
     
      
    }
      )
       
  }
  getSelectedLoanDetails(LoanId:any ){
    debugger
    const params1 = {
      "LOAN_ID":LoanId
      }

this.service.nocdate(params1).subscribe(res =>{
if(!!res['value_dt']){

  this.loandate2 = this._rptdatePipe(res['value_dt'])
  this.customerdata(LoanId)
}else if(res['value_dt']==null){
  this.displayMessage("Please Enter a Settled Loan", "Alert");
this.clear()
this.Active = false;

}
})
   
      

  }
  displayMessage(message: string, type: string): any {
    const dialogRef = this.dialog.open(AlertMessageComponenent, {
      width: '30%',
      data: { message: message, type: type }
    });
  }
  clearDataSource(){
    
  }
  printLetter(letter): void {
    debugger
    let printContents, popupWin;
    printContents = document.getElementById(letter).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(printContents);
    popupWin.print();
    popupWin.document.close();
  }
//   printLetter(){
//     const content = this.pdfTemplate.nativeElement;
//     html2canvas(content).then(canvas => {        
//       var imgWidth = 250;   
//       var pageHeight = 250;    
//       var imgHeight = canvas.height * imgWidth / canvas.width;
//       var heightLeft = imgHeight; 
  
//       const contentDataURL = canvas.toDataURL('image/PNG');
//       let pdf = new jsPDF('p', 'mm', 'a4');
//       var position = 0;  
//       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
//       pdf.save('strreports.pdf');
//     });  
// //     let doc = new jsPDF();

// //     doc.setFontSize(100); 

// // // Create your table here (The dynamic table needs to be converted to canvas).
// // const element = this.pdfTemplate.nativeElement;

// // html2canvas(element)
// // .then((canvas: any) => {
// // doc.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 5, 80, 
// // doc.internal.pageSize.width, element.offsetHeight / 3 );
// // doc.save(`Report-${Date.now()}.pdf`);
// // })
//   }
  
  clear() {
    this.Active = false;
    this.LosLettterActive = false;
    this.resetDataProperty();
    this.LoanId = undefined;
    this.loandate2 = undefined
  }
  resetDataProperty(){

  }

}

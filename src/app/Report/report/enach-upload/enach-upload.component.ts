
import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { RepaymentService } from '../../../services/LMS/repayment.service';
import { CommonService } from '../../../services/common/common.service';
import { AlertMessageComponenent } from '../../../commoncomponents/alertpopup/alertpopup.component';
import { EnachService } from '../../../services/report/enach.service';

export interface enachElement {
  // "SlNo": any;
  "MandateID": any;
  "CustomerName": any;
  "LoanID": any;
  "InstallmentAmount": any;
  "InterestAmount": any;
  "TransactionType": any;
  "LateFee": any;
  "DueDate": any;
}

@Component({
  selector: 'app-enach-upload',
  templateUrl: './enach-upload.component.html',
  styleUrls: ['./enach-upload.component.scss']
})
export class EnachUploadComponent implements OnInit {
  @ViewChild('document')

  myInputVariable: ElementRef;

  datesdata: any = new Date();
  userData: any;
  date: any;
  value_date: Date;
  phonenoList: any;
  enachSource: any;
  file: any;
  arrayBuffer: any;
  filelist: any[];
  visible: boolean = false;
  public settings: Settings;
  public disabled: boolean = false;


  displayedColumns: string[] = ["SlNo","MandateID", "CustomerName", "LoanID","Customerid", "InstallmentAmount","TransactionType","DueDate","PresentationDate"];
  successlist: any[]=[];
  failedlist: any[]=[];

  constructor(private repaymentService: RepaymentService,
    private enachService: EnachService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private datepipe: DatePipe,
    public appSettings: AppSettings,) {
    this.settings = this.appSettings.settings;

  }

  ngOnInit() {
    this.userData = this.commonService.getCredentials();

  }
  exportexcel(id): void {
    /* table id is passed over here */
    let element = document.getElementById(id);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Enach_Upload' + new Date().toLocaleDateString() + ".xlsx");

  }
  getDatePipe(date) {
    let fullDate = new Date(date);
    let month = fullDate.getMonth() + 1;
    return (month > 9 ? month : ('0' + month)) + '-' + fullDate.getDate() + '-' + fullDate.getFullYear();
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
    return date.getDate() + '/' + months[date.getMonth() + 1] + '/' + date.getFullYear();
  }
 
  public clear(followupForm) {
    this.failedlist = []
    this.successlist = []
    this.disabled = false
    this.myInputVariable.nativeElement.value = "";
    followupForm.resetForm();
    this.phonenoList = [];
    this.enachSource = new MatTableDataSource<enachElement>(this.phonenoList);
    this.visible = false
  }
  public deleteTableItem(data): void {
    this.phonenoList.splice(data.index, 1);
    this.enachSource = new MatTableDataSource<enachElement>(this.phonenoList);
  }

  trandformDate(dateString) {
    var date = new Date(dateString);
    return new Date(date.setDate(date.getDate() + 1));
  }
  displayMessage(message: string, type: string): any {
    const dialogRef = this.dialog.open(AlertMessageComponenent, {
      width: '30%',
      data: { message: message, type: type }
    });
  }
  savedata(enachDataUploadForm) {

    this.phonenoList.forEach(s => {
      let InstAmount = s.installmentamount;
      let MandId = s.mandateid;
      console.log(InstAmount)
      console.log(MandId)
      console.log(this.phonenoList)
      const enachDataUploadFormData = {
        amount: InstAmount * 100,
        // mandate: 'MD00146HQE1NRH'
        mandate: MandId
      }
      this.settings.loadingSpinner = true;
      localStorage.setItem('isENACH', '1');
      this.enachService.submitNachPresentationExternal(enachDataUploadFormData)
        .subscribe(result => {
          if (!!result && result['status'] == 'SUCCESS') {
            let succcesslist = s;
  this.successlist.push(succcesslist)
            console.log(succcesslist)


          } else {
            let failedlist = s;
            this.failedlist.push(failedlist) 
            console.log(this.failedlist)
          }
        }, error => {
          let failedlist = s;
          this.failedlist.push(failedlist) 
        }
        )
    })
    this.disabled = true;
    debugger
let vard = this.phonenoList.length
let time = vard * 1000 
let onet = time/6
console.log(time)
    setTimeout(() => {
    
       
 this.dialog.open(EnachdialogReport, {
      width: "90%",
      height: "90%",
      disableClose: true,
      data: { success: this.successlist,failed:this.failedlist }
    })  
    this.settings.loadingSpinner = false;

      }, onet);



  }

  addfile(event) {
    debugger
    this.phonenoList = [];
    this.enachSource = new MatTableDataSource<enachElement>(this.phonenoList);
    this.file = event.target.files[0];
    let extension = this.file.name.split('.');
    extension = extension[extension['length'] - 1]
    console.log(extension)
    if (extension == 'xlsx') {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        console.log(bstr)
        console.log(arr)
        var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        //  console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        this.phonenoList = (XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        let stringArray = [];
        var i = 1;
        console.log(this.phonenoList)
        this.phonenoList.forEach(element => {

          let phObj = {

            "mandateid": element.MandateID,
            "customerName": element.CustomerName,
            "loanid": element.LoanID,
            "installmentamount": element.InstallmentAmount,
            "Customerid":element.CustomerId,
            "transactiontype": element.TransactionType,
            "duedate": this._rptdatePipe(this.trandformDate(element.DueDate)),
            "PresentationDate":this._rptdatePipe(this.trandformDate(element.PresentationDate))
          }

          stringArray.push(phObj);
          console.log(stringArray)
        });
        var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.filelist = [];
        //  console.log(this.filelist)    
        this.phonenoList = stringArray;
        this.enachSource = new MatTableDataSource<enachElement>(this.phonenoList);
        this.visible = true;

      }
    } else {
      this.displayMessage("Please Upload File in Excel Format", "Alert")
    }
  }


}
@Component({
  templateUrl: './StatusReport.html',
  styleUrls: ['./enach-upload.component.scss']
})


export class EnachdialogReport implements OnInit {
  CountSuccess: any;
  SuccessAmountTotal: number = 0;
  CountFailed: any;
  FailedAmountTotal: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,  private dialog:MatDialog) { }
  displayedColumnsSuccess = ["SlNo","MandateID", "CustomerName", "LoanID","Customerid", "InstallmentAmount","TransactionType","DueDate","PresentationDate"];

  // displayedColumnsFailed = ["CustId","LoanId","CollectionAmt","EnterBY","EnterDate","instrumentReference","RecieptNo","LoanAccNo","PaymentMode","RecieptPurpose","BounceCancelReason","BounceCancelDate","Remarks","DepositDate","TransactionDate","AccNo"];
  SuccessDataSource = new MatTableDataSource<any>();
  FailedDataSource = new MatTableDataSource<any>();
  successDataList: any = [];
  failedDataList: any = [];
  ngOnInit() {
    console.log(this.data['success'])
    if (!!this.data['success']) {
      debugger
      this.failedDataList = this.data['failed']
      this.successDataList = this.data['success']
      
      if (this.successDataList) {
        this.CountSuccess = this.successDataList.length;
       
        
        this.SuccessDataSource = new MatTableDataSource<any>(this.successDataList);

      }
      if (this.failedDataList) {
        debugger
        this.CountFailed = this.failedDataList.length;
       
        
        this.FailedDataSource = new MatTableDataSource<any>(this.failedDataList);
      }

    }
  }
  
  close(){
    this.dialog.closeAll()
  }
}



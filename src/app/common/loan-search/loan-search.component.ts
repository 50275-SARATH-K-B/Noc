import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonService } from '../../services/report/common.service';
import { MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AlertMessageComponenent } from '../../commoncomponents/alertpopup/alertpopup.component';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';



import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
export interface loanDataElement {
  CustID: any;
  LoanId: any;
  CustName: any;
  LoanAmount: any;
  LoanDate: any;
}



@Component({
  selector: 'app-loan-search',
  templateUrl: './loan-search.component.html',
  styleUrls: ['./loan-search.component.scss']
})
export class LoanSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public settings: Settings;
  settledloan: boolean;
  constructor(public appSettings: AppSettings, private commonService: CommonService, public dialogRef: MatDialogRef<LoanSearchComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.settings = this.appSettings.settings;
  }
  public LOAN_DATA: loanDataElement[] = [];
  userData: any;
  searchTypeList: any;
  LoanSearchType: any;
  searchText: any;
  @ViewChild('searchForm') form: NgForm;
  loanDataSource = new MatTableDataSource<loanDataElement>(this.LOAN_DATA);
  displayedColumnsLoanDetails: string[] = ["LoanId", "CustomerName","PrimaryPhone","LoanDate"];
  public highlightedRows: Array<object> = [];
  ngOnInit() {
    
    this.settledloan = false

    this.LOAN_DATA = [];
    this.loanDataSource = new MatTableDataSource<loanDataElement>(this.LOAN_DATA);
    this.userData = this.commonService.getCredentials();
    this.onLoad();
    console.log(this.data)
if(this.data == null){
  this.settledloan = false
}  else if(this.data.settled == true){
this.settledloan = true
} 
if (this.data != null && this.data != undefined && +this.data.dataKey != 0) {
      this.searchText = this.data.dataKey;
      this.searchText = this.data['loanID'];

      this.loanSearch(this.form);
    }

  }

  getLoanDetails(e) {
    e.LoanId;
    if (!!e) {
      this.highlightedRows = [];
      this.highlightedRows.push(e);
      // this.dialogRef.close({ loanItem: e });
    }
  }
  public close(): void {
    this.dialogRef.close({ loanItem: this.highlightedRows[0] });
  }
  public loanSearch(searchForm) {
    console.log(false)
    if (searchForm.valid) {
      this.settings.loadingSpinner = true;
      const searchType = {
       // SEARCH_VALUE: this.searchText,
        SEARCH_TYPE: this.LoanSearchType,
        SEARCH_DATA: this.searchText.toString(),
      };
      const searchTypeParam = {
        "SearchValue":1,// this.searchText,
        "SearchType": this.LoanSearchType,
        "SearchData":  this.searchText.toString(),
        "flag": 1
      }
    
      this.commonService.getLoanData(searchTypeParam)
        .subscribe(dt => {
          this.settings.loadingSpinner = false;
          if (dt.loanDataList != null) {
            this.LOAN_DATA = dt.loanDataList;
            this.loanDataSource = new MatTableDataSource<loanDataElement>(this.LOAN_DATA);
          }
          if (dt.loanDataList == "" || dt.loanDataList == null) {
            this.displayMessage("The requested customer/loan details not exist", "Alert")
          }
        }, error => {
          this.settings.loadingSpinner = false;
          console.log(error)
        });

    }
  }
  loanSearch2(searchForm){
console.log(true)
  }

  searchTextPattern:any;
  searchTextMaxLength:any;
  searchTextMinLength:any;
  onSearchTypeChange(){

    var searchTypeValues = {
      'CUSTOMER_ID':{
        pattern:"^[0-9]+$",
        maxLength:16,
        minLength:1
      },
      'CUSTOMER_NAME':{
        pattern:"^[a-zA-Z ]+$",
        maxLength:50,
        minLength:1
      },
      'LOAN_ID':{
        pattern:"^[0-9]+$",
        maxLength:16,
        minLength:1
      },
      'PHONE2':{
        pattern:"^[0-9]+$",
        maxLength:15,
        minLength:1
      }
    };

    if(this.LoanSearchType in searchTypeValues){
      var search_type = this.LoanSearchType;
      var search_type_obj = searchTypeValues[search_type];
      this.searchTextPattern = search_type_obj.pattern;
      this.searchTextMaxLength = search_type_obj.maxLength;
      this.searchTextMinLength = search_type_obj.minLength;
    }

  }
  // public loanSearchbyID(form) {
  //   this.LOAN_DATA = [];
  //   this.loanDataSource = new MatTableDataSource<loanDataElement>(this.LOAN_DATA);
  //     const searchType = {
  //       PRODUCT_ID: this.userData['productID'], FIRM_ID: this.userData['firmID'],
  //       SEARCH_TYPE: this.LoanSearchType, SEARCH_DATA: this.searchText
  //     };

  //     this.commonService.getLoanData(searchType)
  //       .subscribe(dt => {
  //         if (dt.loanDataList != null) {
  //           this.LOAN_DATA = dt.loanDataList;
  //           this.loanDataSource = new MatTableDataSource<loanDataElement>(this.LOAN_DATA);
  //           this.data = null;
  //         }
  //         if (dt.loanDataList == "" || dt.loanDataList == null) {
  //           this.displayMessage("The requested customer/loan details not exist", "Alert")
  //         }
  //       }, error =>
  //           console.log(error));


  // }
 
  onLoad(): any { 
    this.commonService.getLiveLoanSearchData(this.userData['firmID'])
      .subscribe(result => {
        if (result['status'].code == 1)
          this.searchTypeList = result['commonDataList'];
      },
        error => {
          console.log('There was an error: ')
        });
  }

  doubleClick(e) {
    //alert('double click');
    //debugger
    if (!!e) {
      this.highlightedRows = [];
      this.highlightedRows.push(e);
      // this.dialogRef.close({ loanItem: e });
    }
    this.close();
  }

  displayMessage(message: string, type: string) {
    const dialogRef = this.dialog.open(AlertMessageComponenent, {
      width: '30%',
      data: { message: message, type: type },
    });
  }
}

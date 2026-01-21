import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamReportComponent } from './cam-report/cam-report.component';
import { EligibleCustomerComponent } from './eligible-customer/eligible-customer.component';
import { CustomerLoanComponent } from './customer-loan/customer-loan.component';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { DisbursementDetailsComponent } from './disbursement-details/disbursement-details.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
// import { OutstandingComponent } from './outstanding/outstanding.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { ExportExcelComponent } from './export-excel/export-excel.component';
// import { DueListComponent } from './due-list/due-list.component';
// import { CustomerWiseComponent } from './customer-wise/customer-wise.component';
import { DisbursementReportComponent } from './disbursement-report/disbursement-report.component';
import { RbiReportComponent } from './rbi-report/rbi-report.component';
import {AppModule} from '../../app.module';
import { EnachresendComponent } from './enachresend/enachresend.component';
import { ChargeBulkUploadComponent } from './charge-bulk-upload/charge-bulk-upload.component';
import { LoanAgreementComponent } from './loan-agreement/loan-agreement.component';
import { RouterModule } from '@angular/router';
import { EnachpresComponent } from './enachpres/enachpres.component';
import { FileviewerComponent } from './fileviewer/fileviewer.component';
import { SanctionletterComponent } from './sanctionletter/sanctionletter.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    // AppModule,
    RouterModule,
    

  ],
  declarations: [
    CamReportComponent,
    EligibleCustomerComponent,
    CustomerLoanComponent,
    DisbursementComponent,
    DisbursementDetailsComponent,
    CollectionComponent,
    CollectionDetailsComponent,
    // OutstandingComponent,
    AccountStatementComponent,
    ExportExcelComponent,
    // DueListComponent,
    // CustomerWiseComponent,
    // DisbursementReportComponent,
    // RbiReportComponent,
    // CollectionUploadComponent,
    LoanAgreementComponent,
    SanctionletterComponent,
    // FileviewerComponent,
    
    // EnachpresComponent,
    
    
    

    // EnachresendComponent,

  ],
  exports: [CamReportComponent],
  providers: [CamReportComponent ]
})
export class ReportModule { }

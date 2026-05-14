import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { registerLocaleData } from '@angular/common'; 
// import localeFr from '@angular/common/locales/fr';  
// registerLocaleData(localeFr, 'fr');
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routes, routing } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';
import { AlertService } from './theme/services/alert.service';
import { AuthGuard } from './theme/guards/auth.guard';
import { ErrorInterceptor } from './theme/helpers/error.interceptor';
import { JwtInterceptor } from './theme/helpers/jwt.interceptor';
import { AuthenticationService } from './pages/login/authentication.service';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { NumberOnlyDirective } from '../app/utils/validation-utils/number.directives';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AlertMessageComponenent } from './commoncomponents/alertpopup/alertpopup.component';
import { SuccessMessageComponenent } from './commoncomponents/successpopup/successpopup.component';
import { DirectivesModule } from './directives/directive.module';
import { ApplicationDashboardComponent } from './pages/application-dashboard/application-dashboard.component';
import { LeadsDashboardComponent } from './pages/leads-dashboard/leads-dashboard.component';
import { CashrecieptComponent } from './autoprint/cashreciept/cashreciept.component';
import { NumberToWordsPipe } from './custome-pipes/numbertoword.pipe';
import { AccountStatementInstallmentScheduleComponent } from './pages/reports/account-statement-installment-schedule/account-statement-installment-schedule.component';
import { CollectionReportComponent } from './pages/reports/collection-report/collection-report.component';

import { MAT_DIALOG_DATA } from '@angular/material';
import { InstructionMessageComponenent } from './commoncomponents/instructionpopup/instructionpopup.component';
import { LoanSearchComponent } from './common/loan-search/loan-search.component';
import { EmiCalculatorComponent } from './common/emi-calculator/emi-calculator.component';
import { CustomerSearchComponent } from './common/customer-search/customer-search.component';
import { UserSearchComponent } from './common/user-search/user-search.component';
import { UserLinkSearchComponent } from './common/user-link-search/user-link-search.component';
import { LoanDashboardComponent } from './pages/loan-dashboard/loan-dashboard.component';
import { ApplicationStatusDashboardComponent } from './pages/application-status-dashboard/application-status-dashboard.component';
import { ApplicantDetailsModalComponent } from './common/applicant-details-modal/applicant-details-modal.component';
import { SMSVerificationComponent } from './common/sms-verification/sms-verification.component';
import { SharedComponentModule } from './shared-component/shared-component.module';
import { MannualEntryComponent } from './pages/mannual-entry/mannual-entry.component';
import { ReportTestComponent } from './personal-loan/report-test/report-test.component';
import { jqxDataTableModule }   from 'jqwidgets-ng/jqxdatatable';
import { ReportsSearchComponent } from './pages/report-search/reports-search/reports-search.component';
import { MISreportCheckComponent } from './personal-loan/report-details/misreport-check.component';
import { DataChildComponent } from './personal-loan/report-details/data-child/data-child.component';
import { DetailAccountStatementComponent } from './personal-loan/detail-account-statement/detail-account-statement.component';
import { InstallmentReceiptComponent } from './personal-loan/installment-receipt/installment-receipt.component';
import { SettlementComponent } from './personal-loan/settlement/settlement.component';
import { DetailedStatementAccountComponent } from './personal-loan/detailed-statement-account/detailed-statement-account.component';
import { ChartComponent } from './personal-loan/report-details/chart/chart.component';
import { ManualEntryComponent } from './LMS/repayment/manual-entry/manual-entry.component';
import { DisbursementCancelComponent } from './personal-loan/disbursement-cancel/disbursement-cancel.component';
import { DisbursementCancelApprovalComponent } from './personal-loan/disbursement-cancel-approval/disbursement-cancel-approval.component';
import { PayuUpdationComponent } from './personal-loan/payu-updation/payu-updation.component';
import { AgreementComponent } from './personal-loan/agreement/agreement.component';
import { DownloadAgreementComponent } from './personal-loan/download-agreement/download-agreement.component';
import { NoticeComponent } from './personal-loan/notice/notice.component';
import { EnachRealisationComponent } from './Report/report/enach-realisation/enach-realisation.component';
import { EnachPresentationComponent } from './Report/report/enach-presentation/enach-presentation.component';
import {  EnachApprovalComponent} from './Report/report/enach-approval/enach-approval.component';
import { ManualEntryApprovalComponent } from './LMS/repayment/manual-entry-approval/manual-entry-approval.component';
import { DeclarationComponent } from './personal-loan/declaration/declaration.component';
import { EligibilityUpdateComponent } from './Report/report/eligibility-update/eligibility-update.component';
import { EligibilityApprovalComponent } from './Report/report/eligibility-approval/eligibility-approval.component';
import { EnachresendComponent } from './Report/report/enachresend/enachresend.component';
import { ChargeBulkUploadComponent, UploadStatusReportCharge } from './Report/report/charge-bulk-upload/charge-bulk-upload.component';
import { CollectionPresentationComponent } from './Report/report/collection-presentation/collection-presentation.component';
import { CollectionUploadComponent, UploadStatusReport } from './pages/collection-upload/collection-upload.component';
import { WaiverEntryComponent } from './Report/report/waiver-entry/waiver-entry.component';
import { WaiverApprovalComponent } from './Report/report/waiver-approval/waiver-approval.component';
import { NOCComponent } from './Report/report/noc/noc.component';
import { OutstandingComponent } from './Report/report/outstanding/outstanding.component';
import { MaindeclarationComponent } from './pages/maindeclaration/maindeclaration.component';
import { InsuranceComponent } from './Report/report/insurance/insurance.component';
import { RouterModule } from '@angular/router';
// import { DueListComponent } from './Report/report/due-list/due-list.component';
import { CustomerWiseComponent } from './Report/report/customer-wise/customer-wise.component';
import { DisbursementReportComponent } from './Report/report/disbursement-report/disbursement-report.component';
import { RbiReportComponent } from './Report/report/rbi-report/rbi-report.component';
import { DueListComponent } from './Report/report/due-list/due-list.component';
import { EnachpresComponent } from './Report/report/enachpres/enachpres.component';
import { DashboardsecondComponent } from './Report/report/branchdashboard/dashboardsecond/dashboardsecond.component';
import { DashboardfirstComponent } from './Report/report/dashboardfirst/dashboardfirst.component';
import { EnachtestComponent } from './Report/report/enachtest/enachtest.component';
import { EnachlinkComponent } from './Report/report/enachlink/enachlink.component';
import { BranchusermenuComponent } from './theme/components/branchusermenu/branchusermenu.component';
import { Pages2Component } from './Report/report/branchdashboard/pages2/pages2.component';
import { CommonusermenuComponent } from './theme/components/commonusermenu/commonusermenu.component';
import { PagescommonComponent } from './Report/report/branchdashboard/pagescommon/pagescommon.component';
import { DisbursexcelComponent } from './Report/report/disbursexcel/disbursexcel.component';
import { FileviewComponent } from './commoncomponents/fileview/fileview.component';
import { FileviewerComponent } from './Report/report/fileviewer/fileviewer.component';
import { ImageViewerModule } from "ngx-image-viewer";
import { CommonalertComponent } from './commoncomponents/commonalert/commonalert.component';
import { PayuuploadComponent } from './Report/payuupload/payuupload.component';
import { LoginModule } from '../app/pages/login/login.module';
import { EncrDecrServiceService } from './services/encr-decr-service.service';
import { ReportModule } from './Report/report/report.module';
import { EnachUploadComponent,EnachdialogReport} from './Report/report/enach-upload/enach-upload.component';
import { KycupdationComponent } from './pages/kycupdation/kycupdation.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { PlVideoComponent } from './pl-video/pl-video.component';
import { NocforappComponent } from './nocforapp/nocforapp.component';
import { WelcomeLetterComponent } from './welcome-letter/welcome-letter.component';



@NgModule({
  imports: [
    ImageViewerModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    PdfViewerModule,
    jqxDataTableModule,
    DirectivesModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyB3HQ_Gk_XRt6KitPdiHQNGpVn0NDwQGMI' }),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedComponentModule,
    SharedModule,
    PipesModule,
    routing,
    HttpClientModule,
    RouterModule,
    LoginModule,
    ReportModule,
    RouterModule.forRoot(routes, { useHash: false }),

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    NotFoundComponent,
    ErrorComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    LeadsDashboardComponent,
    ApplicationDashboardComponent,
    NumberOnlyDirective,
    EmiCalculatorComponent,
    AlertMessageComponenent,
    InstructionMessageComponenent,
    SuccessMessageComponenent,
    CashrecieptComponent,
    NumberToWordsPipe,
    AccountStatementInstallmentScheduleComponent,
    CollectionReportComponent,
    CashrecieptComponent,
    NumberToWordsPipe,
    AccountStatementInstallmentScheduleComponent,
    CollectionReportComponent,
    FileviewComponent,
    LoanSearchComponent,
    CustomerSearchComponent,
    UserSearchComponent,
    UserLinkSearchComponent,
    LoanDashboardComponent,
    ApplicationStatusDashboardComponent,
    ApplicantDetailsModalComponent,
    SMSVerificationComponent,
    MannualEntryComponent,
    ReportTestComponent,
    ReportsSearchComponent,
    MISreportCheckComponent,
    DataChildComponent,
    DetailAccountStatementComponent,
    InstallmentReceiptComponent,
    SettlementComponent,
    DetailedStatementAccountComponent,
    ChartComponent,
    ManualEntryComponent,
    ManualEntryApprovalComponent,
    PayuUpdationComponent,
    DisbursementCancelComponent,
    DisbursementCancelApprovalComponent,
    AgreementComponent,
    DownloadAgreementComponent,
    NoticeComponent,
    EnachRealisationComponent,
    EnachPresentationComponent,
    EnachApprovalComponent,
    DeclarationComponent,
    EligibilityUpdateComponent,
    EligibilityApprovalComponent,
    EnachresendComponent,
    ChargeBulkUploadComponent ,
    UploadStatusReportCharge,
    CollectionPresentationComponent,
    CollectionUploadComponent,
    UploadStatusReport,
    WaiverEntryComponent,
    WaiverApprovalComponent,
    NOCComponent,
    OutstandingComponent,
    MaindeclarationComponent,
    InsuranceComponent,
    DueListComponent,
    CustomerWiseComponent,
    DisbursementReportComponent,
    RbiReportComponent,
    EnachpresComponent,
    EnachdialogReport,
    DashboardsecondComponent,
    DashboardfirstComponent,
    EnachtestComponent,
    EnachlinkComponent,
    BranchusermenuComponent,
    Pages2Component,
    CommonusermenuComponent,
    PagescommonComponent,
    DisbursexcelComponent,
    FileviewerComponent,
    CommonalertComponent,
    PayuuploadComponent,
    EnachUploadComponent,
    KycupdationComponent,
    PrivacypolicyComponent,
    TermsandconditionsComponent,
    PlVideoComponent,
    NocforappComponent,
    WelcomeLetterComponent,
    
  
  ],
  entryComponents: [
    VerticalMenuComponent,
    AlertMessageComponenent,
    SuccessMessageComponenent,
    FileviewComponent,
    UserSearchComponent,
    UserLinkSearchComponent,
    LoanSearchComponent,
    EmiCalculatorComponent,
    CustomerSearchComponent,
    ApplicantDetailsModalComponent,
    UploadStatusReport,
    EnachdialogReport,
    CommonalertComponent,
    MaindeclarationComponent

  ],
  exports:[
    SMSVerificationComponent,
    MaindeclarationComponent
  ],
  providers: [
    EncrDecrServiceService,
    AppSettings,
    DatePipe, 
    AlertService,
    AuthenticationService,
    AuthGuard,
    AlertMessageComponenent,
    ApplicantDetailsModalComponent,
    LoanSearchComponent,
    EmiCalculatorComponent,
    CustomerSearchComponent,
    SMSVerificationComponent,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
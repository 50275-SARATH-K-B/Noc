

import { Injectable } from '@angular/core';
import { environment, defaultValues } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private dataSource = new BehaviorSubject<any>('');
  private CustomerSource = new BehaviorSubject<any>('');
  selectedData = this.dataSource.asObservable();
  selectedCustomerData = this.CustomerSource.asObservable();
  base_url_lms: string = environment.baseUrl + environment.lms_per_gen_api;
  base_url_waiver:string = environment.baseUrl + environment.waiver_api
  base_url_los: string = environment.baseUrl + environment.los_api;
  base_url_lms_los: string = environment.baseUrl + environment.lms_los_api;
  base_url_Adhaar: string = environment.baseUrl + environment.aadhaar_api;
  baseURL: string = environment.baseUrl;
  apiVer: string = environment.apiVersion;
  keydata:any

  constructor(private httpClient: HttpClient) { }
  public PostWaiverDetails(params) {
    return this.httpClient.post(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/PostWaiverDetails', params);
  }
  getallloans(params){
    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/ClosedLoan/GetLoanId', { params });

  }
  public WaiverApprovals(params) {
    return this.httpClient.post(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/WaiverApproval', params);
  }
  public GetCommonReason(params) {
    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/GetCommonReason', { params });
  }
  public GetWaiverDetails(params) {
    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/GetWaiverDetails', { params });
  }
  Camreport(params){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(this.base_url_waiver + 'api/' + this.apiVer + '/CAMReport/getCAMReport',  params,httpOptions);

  }
  public agreementpl(params) {
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/AgreementSave/getLoanData', params);
  }
  vendordetails(){
    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/UpdateKYC/THIRDPARTYPLDATA');

  }
  public getCustLists(params) {
    // let temp_url = this.base_url_lms+'api/'+this.apiVer+'Waiver/GetCustomer';
    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/GetCustomer', { params });
  }

  public getBranchesList(params) {
    let temp_url = this.base_url_waiver+'api/'+this.apiVer+'/Waiver/GetBranch';
    return this.httpClient.get(temp_url, { params });
  }
  public reason(params): Observable<any> {
    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/GetCommonReason', { params })
    
  }
  public GetWaiverDetailsForEntry(params) {
   

    return this.httpClient.get(this.base_url_waiver + 'api/' + this.apiVer + '/Waiver/GetWaiverDetailsForEntry', { params });
  }
  public getCredentials(): any {
    var userData = JSON.parse(localStorage.getItem("currentUser"));
    if(userData==null){
      var userData = JSON.parse(localStorage.getItem("branchuser"));

    }
    return userData;
  }
 
  public getLoanDetails(params) {
    const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstallmentCollection/getLoanDetails', { params },httpOptions);
  }
    /**
   * 
   * @param searchType 
   * @summary get loan details for common component
   */

  public getLoanData(params: any) {
    const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })    };
    let url = "https://mac.mactech.net.in/plgen/api/"
    
      if(environment.baseUrl == 'https://mac.mactech.net.in/' ){
        return this.httpClient.post<any>(url+this.apiVer + '/InstCollection/getLoanData', params,httpOptions);

      }
    return this.httpClient.post<any>(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection/getLoanData', params,httpOptions);
  }
  public getLoanDatatest(params: any,token:any) {
    debugger
    const httpOptions = {
      headers:  new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': "Bearer "+token})
    };

    let url = "https://mac.mactech.net.in/plgen/api/"
    
        return this.httpClient.post<any>(url+this.apiVer + '/InstCollection/getLoanData', params,httpOptions);

  }
   //After Modularization
   public getLiveLoanSearchData(firmID: any) {
    const params = {
      flag : 1
    }
    const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection/getSearchData',  params , httpOptions);
  }
  
  public getManualTypeList(param) {
    const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Adhoc/getData',param,httpOptions);
  }

}

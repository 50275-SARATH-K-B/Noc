

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root' 
})
export class RepaymentService { 

  private dataSource = new BehaviorSubject<any>('');
  selectedData = this.dataSource.asObservable();
  private applicationData = new BehaviorSubject<any>('');
  data = this.applicationData.asObservable();
  base_url_lms: string = environment.baseUrl + environment.lms_per_gen_api;
  base_url_los: string = environment.baseUrl + environment.los_api;
  base_url_personal_gen:string = environment.baseUrl + environment.lmspersonalgen_api;
  base_url_esign = environment.baseUrl + environment.esign_api;
  apiVer: string = environment.apiVersion;
      base_url_pl_gen:string =  environment.baseUrl + environment.plgen_api;

  private pageNameSource = new BehaviorSubject("");
  pageNameHandler = this.pageNameSource.asObservable();

  private topUpValueSource = new BehaviorSubject("");
  topUpValuesHandler = this.topUpValueSource.asObservable();

  constructor(private httpClient: HttpClient) { }
  
  public getLoanData(params) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post<any>(this.base_url_lms + 'api/' + this.apiVer + '/InstallmentCollection/getLoanDetails', params ,httpOptions);
  }
  
  public saveInstallmentCollection(params: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstallmentCollection', params, httpOptions);

  }
  public GetPaymentModeDetails(param) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const params = new HttpParams()
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection/getPaymentModes',param,httpOptions);
  }
  public getLoanDetailsCollection(params) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection/getLoanDetails',params,httpOptions);
  }

  public getenachurl(params) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Nach/NACHResend',params,httpOptions);
  }

  public getCollectionDtls(params) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Disbursement/getCustomerDetails',params ,httpOptions);
  }
  public getSubAccountDetails(params: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection/getSubAccountDetails', params ,httpOptions);

  }
  public Collection(params) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    //return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection', params, httpOptions);
    //return this.httpClient.post('https://mac.mactech.net.in/lmspersonalgen/api/v1/InstCollection' , params, httpOptions);
    return this.httpClient.post(this.base_url_personal_gen + 'api/' + this.apiVer + '/InstCollection/InstCollectionBranch', params, httpOptions);
  }
    //New Api for settlement
    public getSettlementDetails(params) { 
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Disbursement/getLoanDetails', params,httpOptions);
    }
    public getCustomerDetails(param) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Disbursement/getCustomerDetails',param,httpOptions);
    }
    public saveSettlementDetails(params) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      //return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection', params, httpOptions);
      //return this.httpClient.post('https://mac.mactech.net.in/lmspersonalgen/api/v1/InstCollection' , params, httpOptions);
      
      return this.httpClient.post(this.base_url_personal_gen + 'api/' + this.apiVer + '/InstCollection', params, httpOptions);

    }
    public GetChargeTypesList(params) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Adhoc/ChargeDtls',params, httpOptions);
    }
    public saveAdhoc(params) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/Adhoc', params, httpOptions);
    }
    //New Api Added for PAYU
    public getPayuDetails(params) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/PayuUpdate', params, httpOptions);
     // return this.httpClient.post("http://mafiltest.mactech.net.in/plapi/" + 'api/' + this.apiVer + '/GetPayuDetails', params, httpOptions);
    }
    // Added for PAYU updation
    public updatePayUDetails(params) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_lms + 'api/' + this.apiVer + '/InstCollection', params, httpOptions);
    //  return this.httpClient.post("http://mafiltest.mactech.net.in/plapi/" + 'api/' + this.apiVer + 'payu', params, httpOptions);
    }

    public disbursementCancel(params){      
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_personal_gen + 'api/' + this.apiVer + '/Disbursement/LoanCancelRequest', params, httpOptions);

    }

    public disbursementCancelApproval(params){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_personal_gen + 'api/' + this.apiVer + '/Disbursement/LoanCancelApproval', params, httpOptions);

    }

    public getLoanCancelDetails(params) {
      return this.httpClient.get(this.base_url_personal_gen + 'api/' + this.apiVer + '/Disbursement/GetLoanCancelDetails', { params });
    }

    public esignDocSave(params){
      //changed
   // return this.httpClient.get(this.base_url_esign + 'api/' + this.apiVer + '/EsignDocSave', { params });
       return this.httpClient.get('https://gen.mactech.net.in/esign_public/api/' + this.apiVer + '/EsignDocSave', { params });
    }      

    getArbitrationReport(params){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_pl_gen + 'api/' + this.apiVer + '/Report/getArbitrationReport', params, httpOptions);

    }
    getCustDetail(params){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(this.base_url_pl_gen + 'api/' + this.apiVer + '/Report/getCustomerDetails', params, httpOptions);

    }
    getCustDetailbyCustid(params){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
      return this.httpClient.post(this.base_url_pl_gen + 'api/' + this.apiVer + '/Report/getCustomerDetailsByCustomerid', params, httpOptions);

    }
    public nocdate(params){
      //changed
   // return this.httpClient.get(this.base_url_esign + 'api/' + this.apiVer + '/EsignDocSave', { params });
       return this.httpClient.get(this.base_url_pl_gen + 'api/' + this.apiVer + '/Noc/GetNocDetails', { params });
    }  


}

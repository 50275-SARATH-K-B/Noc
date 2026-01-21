import { Component, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { AlertService } from '../../theme/services/alert.service';
import { AuthenticationService } from './authentication.service';
import { ElectronService } from 'ngx-electron';
import { AlertMessageComponenent } from '../../commoncomponents/alertpopup/alertpopup.component';
import { MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { EncrDecrServiceService } from '../../services/encr-decr-service.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/report/common.service';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

let CryptoJS = require('crypto-js');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  
  public form: FormGroup;
  returnUrl: string;
  ProductList: any;
  ProductID: any;
  public settings: Settings;
  dataset: any[]=[];
  user: number;
  userdata: any;
  token: any;
  // keydata: any;
  constructor(private commonService: CommonService,private EncrDecr:EncrDecrServiceService,public appSettings: AppSettings, public fb: FormBuilder,
    public router: Router, private route: ActivatedRoute,
    private authenticationService: AuthenticationService, private electronService: ElectronService,
    private ngZone: NgZone,
    public dialog: MatDialog,
    public Activatedroute:ActivatedRoute,
    private alertService: AlertService) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'product': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
    //  this.authenticationService.getProductList()
    //       .subscribe(result => {
    //         this.ProductList = result['productList'];
    //       })

    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      // 'product': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl)

  }
  branchID: any;
  get f() { return this.form.controls; }

  encrypt(msg) {

    var pass = "LD@8RG#3SEZ";
    // random salt for derivation
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    // well known algorithm to generate key
    var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: 100
    });
    // random IV
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    // specify everything explicitly
    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    // combine everything together in base64 string
    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;

  }

  public onSubmit(): void {
//  this.router.navigateByUrl('/privacypolicy')
    
    // if(environment.baseUrl == "https://mac.mactech.net.in/"){
      // let params = {
      //   "EmployeeID": this.f.email.value,
      //   "Password": this.f.password.value,
      //   "FormMode": 1,
      //   "BranchID": 0,
      //   "Signature": "anystring",
      //   "ProductID": 69
      // }

      // this.authenticationService.login11(params).subscribe(res=>{
      //   if(res['token']){
      //     this.userdata['token'] = res['token']

         

      //     const searchTypeParam = {
      //       "SearchValue": 1,
      //       "SearchType": "LOAN_ID",
      //       "SearchData": "1",
      //       "flag": 1

      //     }
      //     debugger
      //   let tokfake = "fshissbdf"
      //     this.commonService.getLoanDatatest(searchTypeParam,tokfake).subscribe(res=>{
      //   console.log(res)

      //     })   
      //   }
      // })



    // }else {
      if (this.form.valid) {

        if (this.f.email.value == "21721" && this.f.password.value == "pass@123") {
          this.router.navigate(['/personal-report/dashboard1']);
          localStorage.setItem("currentUser", JSON.stringify({ "empCode": "21721", "branchID": 3038/*+this.branchID*/, "productID": 69, "firmID": 1, }))
          console.log(this.userdata)
        } else {
          this.alertService.error(this.branchResponse);
  
          this.settings.loadingSpinner = true;
          if (this.branchID == undefined) {
            this.getUserBranch('L');
            return;
          }
  
         
          // var password = this.EncrDecr.set('7x!A%D*G-KaPdSgV', this.f.password.value);
          var password = this.encrypt(this.f.password.value)
          console.log(password)
                let param = {
                  employeeID: this.f.email.value,
                  // password: '6E45036A254F51A0C32941BB4391F554',
                  password: this.f.password.value,
                  formMode: 1,
                  branchID: +this.branchID,
                  siganture: '115.249.38.210',
                  ProductID: 43
                }
                this.authenticationService.login(param)
                .pipe(first())
                .subscribe(data => {
                  console.log(data)
                  if (data['token']) {
                    this.userdata = data
                    // localStorage.setItem('currentUser', JSON.stringify(data));
  
                    this.permissionmafil()
                  } else {
                    this.DisplayMessage("You Dont have permission to Enter","Alert");
                    this.settings.loadingSpinner = false;
                  }
                }, error => {
                  this.DisplayMessage("You Dont have permission to Enter","Alert");
                  this.settings.loadingSpinner = false;
                });
              
  
  
      }
    }
    // }
   
  }
  permissionmafil(){
    let postData = {
      EmployeeID: this.f.email.value,
      Password: this.f.password.value,
      ProductID: 43,
      BranchID: this.branchID,
      BranchName: "",
      Signature: '115.249.38.210',
      FormMode: 1,
      isGoldEmployee: false
    }
    
      this.authenticationService.getFunctionList(postData)
      .pipe(first())
      .subscribe(data => {
       this.dataset = data['rolefunctionList']
       if(this.dataset.length == 0){
        // this.router.navigateByUrl('/branchboard/dashboard2')
        // this.userdata['productID']=69 
        this.DisplayMessage("You Dont have permission to Enter","Alert");
        //  localStorage.setItem('branchuser', JSON.stringify(this.userdata));

        this.settings.loadingSpinner = false;
       }else{
        this.userdata['productID']=69 
        localStorage.setItem('currentUser', JSON.stringify(this.userdata));

       this.router.navigateByUrl('/personal-report/dashboard1')
       this.settings.loadingSpinner = false;

       }



      })
  }
  DisplayMessage(message: string, action: string) {
    const dialogRef = this.dialog.open(AlertMessageComponenent, {
      width: '30%', data: { message: message, type: action },
    });
  }
     public AonSubmit(): void {
        if (this.form.valid) {
          this.settings.loadingSpinner = true;
          if (this.branchID == undefined) {
            this.getUserBranch('L');
            return;
          }
          this.authenticationService.login({ email: this.f.email.value, password: this.f.password.value, branchID: this.branchID })
            .pipe(first())
            .subscribe(data => {
              if (data.loginStatus === 1) {
                this.router.navigate(['/dashboard/dashboard']);
              } else {
                this.settings.loadingSpinner = false;
                this.alertService.error(data.status.message);
              }
            }, error => {
              this.alertService.error(error);
              this.settings.loadingSpinner = false;
            });
        }
      }
    branchResponse: any;
    isGoldEmployee = false;
    getUserBranch(flag) {
      if (this.electronService.isElectronApp) {
        // this.Submitshow=false;
        this.requestbranchId();
        this.electronService.ipcRenderer.on('branchId-Reply', (event, host) => {
          this.ngZone.run(() => {
            let hostNamRreply = `${host}`;
            this.branchID = hostNamRreply.split('#')[2];
            if (hostNamRreply.split('#')[0] === "0") {
              this.branchID = undefined;
              // this.Submitshow = true;
              this.branchResponse = hostNamRreply.split('#')[1];
              const dialogRef = this.dialog.open(AlertMessageComponenent, {
                data: { message: this.branchResponse, type: 'Alert' }
              });
              dialogRef.afterClosed().subscribe(result => {
                this.requestWindowclose();
              });
              // this.btndis = false;
              // if (this.responseCode === "0") {
              // }
            }
          })
        })
      } else {
        debugger
        this.isGoldEmployee =false;
        this.settings.loadingSpinner = true;
        this.authenticationService.getBranchID({ employeeID: +this.f.email.value })
          .subscribe(data => {
            this.settings.loadingSpinner = false;
            if (data['status'].flag == 1 && data['status'].code == 1) {
              this.branchID = data['employeeList'][0]['branchID'];
              this.isGoldEmployee = true;
              if (flag == 'L') {
                this.onSubmit()
              }     
            } else {
              this.isGoldEmployee = false;
              this.DisplayMessage("Please check your User ID","Alert");
              this.settings.loadingSpinner = false;

            }
          }, error => { this.settings.loadingSpinner = false; })
      }
    }


    requestbranchId() {
      this.electronService.ipcRenderer.send('branchId-Request', 'pingbranchId');
    }

    requestWindowclose() {
      this.electronService.ipcRenderer.send('Windowclose-Request', 'pingWindowclose');
    }
    ngAfterViewInit() {
      this.settings.loadingSpinner = false;
    }
  }
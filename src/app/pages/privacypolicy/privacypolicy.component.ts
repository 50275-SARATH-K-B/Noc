import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../services/report/common.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {

  public settings: Settings;
  customerList: any[]=[];
  dataav: boolean;
  constructor(public appSettings:AppSettings,
    public router: Router,private commonService: CommonService){
      this.settings = this.appSettings.settings;
  } 
  public dataSource = new MatTableDataSource([]);

  displayedColumns: string[] = ["SlNo","Vendorname", "vendoraddress", "purpose"];
  ngOnInit() {
    // this.router.navigateByUrl('/privacypolicy')
    this.commonService.vendordetails().subscribe(res=>{

      this.customerList=res['pldatalist']
      this.dataSource=new MatTableDataSource(this.customerList)
    })
    if(this.customerList.length>0){
      this.dataav = false
    }else{
      this.dataav = true
    }
    
    

   }
  }



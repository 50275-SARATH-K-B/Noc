import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-commonusermenu',
  templateUrl: './commonusermenu.component.html',
  styleUrls: ['./commonusermenu.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CommonusermenuComponent implements OnInit {

  userData: any;
  public userImage = 'assets/img/profile/customer.png';
  userData1: any;
  constructor() { }

  ngOnInit() {
    if(!!localStorage.branchuser){
      this.userData1 = JSON.parse(localStorage.branchuser)

    }else if(!!localStorage.currentUser)
    this.userData1 = JSON.parse(localStorage.currentUser)

  }

}
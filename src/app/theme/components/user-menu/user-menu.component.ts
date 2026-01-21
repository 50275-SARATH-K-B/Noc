import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { defaultValues } from '../../../../environments/environment';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  userData: any;
  public userImage = 'assets/img/profile/customer.png';
  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.currentUser)
    
  }

}

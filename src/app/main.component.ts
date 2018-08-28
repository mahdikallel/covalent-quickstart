import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {CurentUserService} from "../data/services/curent-user.service";
import {GetUserByIdApi} from "../data/services/clients/settings/user/GetUserByIdApi";

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [GetUserByIdApi]
})
export class MainComponent {

  routes:Object[] = [{
    title: 'Dashboard',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Manage Users',
    route: '/users',
    icon: 'people',
  },
  ];
  currentUser : any;
  dataLoaded: Promise<boolean>;

  constructor(private _router:Router, private curentUserService:CurentUserService, private userByIdApi:GetUserByIdApi) {

    this.userByIdApi.getUserById(Number(localStorage.getItem('currentUser'))).subscribe(data => {
      this.currentUser = data;
      this.dataLoaded = Promise.resolve(true)
    });
  }

  // logout():void {
  //   this._router.navigate(['/login']);
  // }

  logout() {
    this.curentUserService.userDeconnexion();
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }


}

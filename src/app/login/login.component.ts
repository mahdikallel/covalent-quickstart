import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {TdLoadingService} from '@covalent/core/loading';


import {GetUsersApi} from "../../data/services/clients/settings/user/GetUsersApi";
import {GetUserByIdApi} from "../../data/services/clients/settings/user/GetUserByIdApi";
import {UserImpl} from "../classes/userRole";
import {CurentUserService} from "../../data/services/curent-user.service";
import {ViewContainerRef} from "@angular/core";
import {TdDialogService} from "@covalent/core";


@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [TdDialogService]
})
export class LoginComponent {

  username:string;
  password:string;
  timer:any;
  failedConnexion = false;
  disabled:boolean = false;
  numberOfFiled = {'email': '', 'number': '0'};


  user = new UserImpl('', '', '', '', '');

  constructor(private _router:Router,
              private _loadingService:TdLoadingService,
              private getUserById:GetUserByIdApi,
              private curentUserService:CurentUserService,
              private AuthentificationService:GetUsersApi,
              private _dialogService:TdDialogService,
              private _viewContainerRef:ViewContainerRef) {
  }

  openConnectionFailedAlert():void {
    this._loadingService.resolve();
    this._dialogService.openAlert({
      message: 'Connection failed : Please check your credentials',
      disableClose: false, //| false, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Connection failed', //OPTIONAL, hides if not provided
      closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
      width: '400px', //OPTIONAL, defaults to 400px
    });
  }

  openConnectionErrorAlert(error):void {
    this._loadingService.resolve();
    this._dialogService.openAlert({
      message: 'Connection error' + error,
      disableClose: false, //| false, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Error', //OPTIONAL, hides if not provided
      closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
      width: '400px', //OPTIONAL, defaults to 400px
    });
  }

  connexionUser() {
    this._loadingService.register();
    this.user.email = this.username;
    this.user.password = this.password;
    this.AuthentificationService.showUsersList()
      .subscribe(
        data => {
          let fetchedUser ;
          for (let user of data) {
            if ((user.email == this.user.email) && (user.password == this.user.password)) {
              fetchedUser = user;
              break;
            }
          }
            if (fetchedUser) {
              this.connexionSucces(fetchedUser);
            } else {
              this.connexionFailed();
            }
        },
        error => {
           this.connexionError(error);
        }
      );

    setTimeout(() => {
      this.getUserById.getUserById(Number(localStorage.getItem('currentUser'))).subscribe(data => {
        //this.roleGuard.roleCurrentUser = data;
      });
    }, 500);


  }

  connexionError(error) {
    this.openConnectionErrorAlert(error);
    this.failedConnexion = false;
  }

  connexionSucces(response) {
    if (response.length !== 0) {
      if (this.curentUserService.userConnexion(response)) {
        this.connexionSuccess();
      } else {
        this.connexionUserError();
      }
    }

    // else {
    //   this.connexionFailed();
    // }
  }

  connexionSuccess() {
    this.failedConnexion = false;
    this.timer = setTimeout(() => {
      this._router.navigate(['/']);
      this._loadingService.resolve();
    }, 2000);
  }

  connexionFailed() {
    if (this.numberOfFiled.email !== this.user.email) {
      this.numberOfFiled = {'email': '', 'number': '0'};
    }
    this.numberOfFiled.email = this.user.email;
    this.numberOfFiled.number = (Number(this.numberOfFiled.number) + 1).toString();
    this.failedConnexion = true;
    this.timer = setTimeout(() => {
      this.failedConnexion = false;
      this. openConnectionFailedAlert();
    }, 2000);
  }

  connexionUserError() {
    this.timer = setTimeout(() => {
    }, 3000);
    this.failedConnexion = false;
  }

}

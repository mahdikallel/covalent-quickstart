"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var userRole_1 = require("../classes/userRole");
var core_2 = require("@covalent/core");
var LoginComponent = (function () {
    function LoginComponent(_router, _loadingService, getUserById, curentUserService, AuthentificationService, _dialogService, _viewContainerRef) {
        this._router = _router;
        this._loadingService = _loadingService;
        this.getUserById = getUserById;
        this.curentUserService = curentUserService;
        this.AuthentificationService = AuthentificationService;
        this._dialogService = _dialogService;
        this._viewContainerRef = _viewContainerRef;
        this.failedConnexion = false;
        this.disabled = false;
        this.numberOfFiled = { 'email': '', 'number': '0' };
        this.user = new userRole_1.UserImpl('', '', '', '', '');
    }
    LoginComponent.prototype.openConnectionFailedAlert = function () {
        this._loadingService.resolve();
        this._dialogService.openAlert({
            message: 'Connection failed : Please check your credentials',
            disableClose: false,
            viewContainerRef: this._viewContainerRef,
            title: 'Connection failed',
            closeButton: 'Close',
            width: '400px'
        });
    };
    LoginComponent.prototype.openConnectionErrorAlert = function (error) {
        this._loadingService.resolve();
        this._dialogService.openAlert({
            message: 'Connection error' + error,
            disableClose: false,
            viewContainerRef: this._viewContainerRef,
            title: 'Error',
            closeButton: 'Close',
            width: '400px'
        });
    };
    LoginComponent.prototype.connexionUser = function () {
        var _this = this;
        this._loadingService.register();
        this.user.email = this.username;
        this.user.password = this.password;
        this.AuthentificationService.showUsersList()
            .subscribe(function (data) {
            var fetchedUser;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var user = data_1[_i];
                if ((user.email == _this.user.email) && (user.password == _this.user.password)) {
                    fetchedUser = user;
                    break;
                }
            }
            if (fetchedUser) {
                _this.connexionSucces(fetchedUser);
            }
            else {
                _this.connexionFailed();
            }
        }, function (error) {
            _this.connexionError(error);
        });
        setTimeout(function () {
            _this.getUserById.getUserById(Number(localStorage.getItem('currentUser'))).subscribe(function (data) {
                //this.roleGuard.roleCurrentUser = data;
            });
        }, 500);
    };
    LoginComponent.prototype.connexionError = function (error) {
        this.openConnectionErrorAlert(error);
        this.failedConnexion = false;
    };
    LoginComponent.prototype.connexionSucces = function (response) {
        if (response.length !== 0) {
            if (this.curentUserService.userConnexion(response)) {
                this.connexionSuccess();
            }
            else {
                this.connexionUserError();
            }
        }
        // else {
        //   this.connexionFailed();
        // }
    };
    LoginComponent.prototype.connexionSuccess = function () {
        var _this = this;
        this.failedConnexion = false;
        this.timer = setTimeout(function () {
            _this._router.navigate(['/']);
            _this._loadingService.resolve();
        }, 2000);
    };
    LoginComponent.prototype.connexionFailed = function () {
        var _this = this;
        if (this.numberOfFiled.email !== this.user.email) {
            this.numberOfFiled = { 'email': '', 'number': '0' };
        }
        this.numberOfFiled.email = this.user.email;
        this.numberOfFiled.number = (Number(this.numberOfFiled.number) + 1).toString();
        this.failedConnexion = true;
        this.timer = setTimeout(function () {
            _this.failedConnexion = false;
            _this.openConnectionFailedAlert();
        }, 2000);
    };
    LoginComponent.prototype.connexionUserError = function () {
        this.timer = setTimeout(function () {
        }, 3000);
        this.failedConnexion = false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'qs-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            providers: [core_2.TdDialogService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
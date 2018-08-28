"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var GetUserByIdApi_1 = require("../data/services/clients/settings/user/GetUserByIdApi");
var MainComponent = (function () {
    function MainComponent(_router, curentUserService, userByIdApi) {
        var _this = this;
        this._router = _router;
        this.curentUserService = curentUserService;
        this.userByIdApi = userByIdApi;
        this.routes = [{
                title: 'Dashboard',
                route: '/',
                icon: 'dashboard'
            }, {
                title: 'Manage Users',
                route: '/users',
                icon: 'people'
            },
        ];
        this.userByIdApi.getUserById(Number(localStorage.getItem('currentUser'))).subscribe(function (data) {
            _this.currentUser = data;
            _this.dataLoaded = Promise.resolve(true);
        });
    }
    // logout():void {
    //   this._router.navigate(['/login']);
    // }
    MainComponent.prototype.logout = function () {
        this.curentUserService.userDeconnexion();
        localStorage.removeItem('currentUser');
        this._router.navigate(['/login']);
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'qs-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.scss'],
            providers: [GetUserByIdApi_1.GetUserByIdApi]
        })
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map
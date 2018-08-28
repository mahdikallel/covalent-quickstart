"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var operators_1 = require('rxjs/operators');
var http_1 = require('@covalent/http');
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(_http, api) {
        _super.call(this, _http, {
            baseUrl: api,
            path: '/users'
        });
        this._http = _http;
    }
    UserService.prototype.staticQuery = function () {
        return this._http.get('data/users.json')
            .pipe(operators_1.map(function (res) {
            return res.json();
        }));
    };
    return UserService;
}(http_1.RESTService));
exports.UserService = UserService;
exports.USERS_API = new core_1.InjectionToken('USERS_API');
function USER_PROVIDER_FACTORY(parent, interceptorHttp, api) {
    return parent || new UserService(interceptorHttp, api);
}
exports.USER_PROVIDER_FACTORY = USER_PROVIDER_FACTORY;
exports.USER_PROVIDER = {
    // If there is already a service available, use that. Otherwise, provide a new one.
    provide: UserService,
    deps: [[new core_1.Optional(), new core_1.SkipSelf(), UserService], http_1.HttpInterceptorService, exports.USERS_API],
    useFactory: USER_PROVIDER_FACTORY
};
//# sourceMappingURL=user.service.js.map
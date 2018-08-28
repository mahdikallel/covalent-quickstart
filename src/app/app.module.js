"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var http_2 = require('@angular/common/http');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var animations_1 = require('@angular/platform-browser/animations');
var button_1 = require('@angular/material/button');
var card_1 = require('@angular/material/card');
var icon_1 = require('@angular/material/icon');
var list_1 = require('@angular/material/list');
var divider_1 = require('@angular/material/divider');
var input_1 = require('@angular/material/input');
var toolbar_1 = require('@angular/material/toolbar');
var common_2 = require('@covalent/core/common');
var layout_1 = require('@covalent/core/layout');
var media_1 = require('@covalent/core/media');
var loading_1 = require('@covalent/core/loading');
var http_3 = require('@covalent/http');
var ngx_charts_1 = require('@swimlane/ngx-charts');
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./app.component');
var request_interceptor_1 = require('../config/interceptors/request.interceptor');
var api_config_1 = require('../config/api.config');
var users_1 = require('./users');
var main_component_1 = require('./main.component');
var login_component_1 = require('./login/login.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var GetUsersApi_1 = require("../data/services/clients/settings/user/GetUsersApi");
var GetUserByIdApi_1 = require("../data/services/clients/settings/user/GetUserByIdApi");
var dynamic_forms_1 = require("@covalent/dynamic-forms");
var markdown_1 = require("@covalent/markdown");
var highlight_1 = require("@covalent/highlight");
var core_2 = require("@covalent/core");
var core_3 = require("@angular/core");
var curent_user_service_1 = require("../data/services/curent-user.service");
var core_4 = require("@covalent/core");
var httpInterceptorProviders = [
    request_interceptor_1.RequestInterceptor,
];
function getAPI() {
    return api_config_1.MOCK_API;
}
exports.getAPI = getAPI;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent
            ],
            imports: [
                // angular modules
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_2.HttpClientModule,
                http_1.HttpModule,
                // material modules
                button_1.MatButtonModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                list_1.MatListModule,
                divider_1.MatDividerModule,
                input_1.MatInputModule,
                toolbar_1.MatToolbarModule,
                // covalent modules
                common_2.CovalentCommonModule,
                layout_1.CovalentLayoutModule,
                media_1.CovalentMediaModule,
                loading_1.CovalentLoadingModule,
                core_2.CovalentStepsModule,
                // (optional) Additional Covalent Modules imports
                highlight_1.CovalentHighlightModule,
                markdown_1.CovalentMarkdownModule,
                dynamic_forms_1.CovalentDynamicFormsModule,
                core_4.CovalentDialogsModule,
                http_3.CovalentHttpModule.forRoot({
                    interceptors: [{
                            interceptor: request_interceptor_1.RequestInterceptor, paths: ['**']
                        }]
                }),
                // external modules
                ngx_charts_1.NgxChartsModule,
                // routes
                app_routes_1.appRoutes,
            ],
            providers: [
                httpInterceptorProviders,
                platform_browser_1.Title, {
                    provide: users_1.USERS_API, useFactory: getAPI
                }, users_1.USER_PROVIDER,
                GetUsersApi_1.GetUsersApi,
                GetUserByIdApi_1.GetUserByIdApi,
                curent_user_service_1.CurentUserService
            ],
            entryComponents: [],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_3.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
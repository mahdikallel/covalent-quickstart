"use strict";
var router_1 = require('@angular/router');
var main_component_1 = require('./main.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var login_component_1 = require('./login/login.component');
var routes = [{
        path: 'login',
        component: login_component_1.LoginComponent
    }, {
        path: '',
        component: main_component_1.MainComponent,
        children: [{
                component: dashboard_component_1.DashboardComponent,
                path: ''
            }, {
                path: '',
                loadChildren: './users/users.module#UsersModule'
            },
        ]
    },
];
exports.appRoutes = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map
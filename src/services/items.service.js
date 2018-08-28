"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@covalent/http');
var api_config_1 = require('../config/api.config');
var operators_1 = require('rxjs/operators');
var ItemsService = (function (_super) {
    __extends(ItemsService, _super);
    function ItemsService(_http) {
        _super.call(this, _http, {
            baseUrl: api_config_1.MOCK_API,
            path: '/items'
        });
        this._http = _http;
    }
    ItemsService.prototype.staticQuery = function () {
        return this._http.get('data/items.json').pipe(operators_1.map(function (res) {
            return res.json();
        }));
    };
    ItemsService.prototype.staticGet = function (id) {
        return this._http.get('data/items.json').pipe(operators_1.map(function (res) {
            var item;
            res.json().forEach(function (s) {
                if (s.item_id === id) {
                    item = s;
                }
            });
            return item;
        }));
    };
    ItemsService = __decorate([
        core_1.Injectable()
    ], ItemsService);
    return ItemsService;
}(http_1.RESTService));
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var operators_1 = require('rxjs/operators');
var ProductsService = (function () {
    function ProductsService(_http) {
        this._http = _http;
    }
    ProductsService.prototype.query = function () {
        return this._http.get('data/products.json').pipe(operators_1.map(function (res) {
            return res.json();
        }));
    };
    ProductsService.prototype.get = function (id) {
        return this._http.get('data/products.json').pipe(operators_1.map(function (res) {
            var item;
            res.json().forEach(function (s) {
                if (s.item_id === id) {
                    item = s;
                }
            });
            return item;
        }));
    };
    ProductsService = __decorate([
        core_1.Injectable()
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map
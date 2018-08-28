/**
 * Socle Symfony2 API
 * Documented API for Socle symfony2
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require('rxjs/add/operator/map');
var variables_1 = require('../../variables');
var configuration_1 = require('../../configuration');
var basePath_1 = require('../../basePath');
/* tslint:disable:no-unused-variable member-ordering */
var GetcurrentLogLevelByIdApi = (function () {
    function GetcurrentLogLevelByIdApi(http, basePath, configuration) {
        this.http = http;
        this.basePath = basePath_1.urlPath;
        this.defaultHeaders = new http_1.Headers();
        this.configuration = new configuration_1.Configuration();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }
    /**
     * Info for a specific currentLogLevel
     *
     * @param id The id of the currentLogLevel to retrieve
     */
    GetcurrentLogLevelByIdApi.prototype.getCurrentLogLevelById = function (id, extraHttpRequestParams) {
        return this.getCurrentLogLevelByIdWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Info for a specific currentLogLevel
     *
     * @param id The id of the currentLogLevel to retrieve
     */
    GetcurrentLogLevelByIdApi.prototype.getCurrentLogLevelByIdWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + ("/api/currentLogLevel/" + id);
        var queryParameters = new http_1.URLSearchParams();
        var headers = new http_1.Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getCurrentLogLevelById.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new http_2.RequestOptions({
            method: http_2.RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    GetcurrentLogLevelByIdApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(variables_1.BASE_PATH)),
        __param(2, core_1.Optional())
    ], GetcurrentLogLevelByIdApi);
    return GetcurrentLogLevelByIdApi;
}());
exports.GetcurrentLogLevelByIdApi = GetcurrentLogLevelByIdApi;

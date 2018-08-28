"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(_iconRegistry, _domSanitizer) {
        this._iconRegistry = _iconRegistry;
        this._domSanitizer = _domSanitizer;
        this._iconRegistry.addSvgIconInNamespace('assets', 'teradata', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'github', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'covalent', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'listener', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'sifast', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sifast.svg'));
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'qs-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
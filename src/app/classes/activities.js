/**
 * Created by Mahdi-Kallel on 16/05/2017.
 */
"use strict";
var Activity = (function () {
    function Activity() {
        this.userId = Number(localStorage.getItem('currentUser'));
        var currentdate = new Date();
        this.setTime = currentdate.getDate() + '/'
            + (currentdate.getMonth() + 1) + '/'
            + currentdate.getFullYear() + ' '
            + currentdate.getHours() + ':'
            + currentdate.getMinutes() + ':'
            + currentdate.getSeconds() + ':'
            + currentdate.getMilliseconds();
    }
    Object.defineProperty(Activity.prototype, "getOldObject", {
        get: function () {
            return this.oldObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setOldObject", {
        set: function (value) {
            this.oldObject = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "getNewObject", {
        get: function () {
            return this.newObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setNewObject", {
        set: function (value) {
            this.newObject = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setId", {
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "getUserId", {
        get: function () {
            return this.userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setUserId", {
        set: function (value) {
            this.userId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "getAction", {
        get: function () {
            return this.action;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setAction", {
        set: function (value) {
            this.action = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "getObjectName", {
        get: function () {
            return this.objectName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setObjectName", {
        set: function (value) {
            this.objectName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "getTime", {
        get: function () {
            return this.time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "setTime", {
        set: function (value) {
            this.time = value;
        },
        enumerable: true,
        configurable: true
    });
    return Activity;
}());
exports.Activity = Activity;

/**
 * Created by Mahdi-Kallel on 11/05/2017.
 */
"use strict";
var CurrentLog = (function () {
    function CurrentLog(id, logLevel, current) {
        this.id = id;
        this.logLevel = logLevel;
        this.current = current;
    }
    return CurrentLog;
}());
exports.CurrentLog = CurrentLog;

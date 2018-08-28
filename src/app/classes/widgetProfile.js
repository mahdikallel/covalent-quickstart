/**
 * Created by AhmedHt on 09/05/2017.
 */
"use strict";
var WidgetProfile = (function () {
    function WidgetProfile(id_user, id, name, position, parameters) {
        this.id_user = id_user;
        this.id = id;
        this.name = name;
        this.position = position;
        this.parameters = parameters;
    }
    return WidgetProfile;
}());
exports.WidgetProfile = WidgetProfile;

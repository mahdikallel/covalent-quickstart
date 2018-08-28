"use strict";
/**
 * Created by AhmedHt on 08/05/2017.
 */
(function (EtatEnum) {
    EtatEnum[EtatEnum["Open"] = 'open'] = "Open";
    EtatEnum[EtatEnum["Close"] = 'close'] = "Close";
})(exports.EtatEnum || (exports.EtatEnum = {}));
var EtatEnum = exports.EtatEnum;
var WidgetUsers = (function () {
    function WidgetUsers(idUser, id, name, position, etat, category, typeChart) {
        this.id_user = idUser;
        this.id = id;
        this.name = name;
        this.position = position;
        this.etat = etat;
        this.category = category;
        this.typeChart = typeChart;
    }
    return WidgetUsers;
}());
exports.WidgetUsers = WidgetUsers;

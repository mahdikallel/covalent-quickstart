"use strict";
var RoleImpl = (function () {
    function RoleImpl(designation, description, authorities, id) {
        this.description = description;
        this.designation = designation;
        this.authorities = authorities;
        this.id = id;
    }
    return RoleImpl;
}());
exports.RoleImpl = RoleImpl;
//# sourceMappingURL=role.js.map
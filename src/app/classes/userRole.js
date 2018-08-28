"use strict";
(function (GenderEnum) {
    GenderEnum[GenderEnum["Male"] = 'male'] = "Male";
    GenderEnum[GenderEnum["Female"] = 'female'] = "Female";
})(exports.GenderEnum || (exports.GenderEnum = {}));
var GenderEnum = exports.GenderEnum;
var UserImpl = (function () {
    function UserImpl(username, firstname, lastname, password, email, dateOfBirth, gender, phone, id, roles) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phone = phone;
        this.roles = roles;
    }
    return UserImpl;
}());
exports.UserImpl = UserImpl;
//# sourceMappingURL=userRole.js.map
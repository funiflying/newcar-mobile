"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var host = "http://localhost:3921";
var API_URL = {
    LOGIN: host + '/account/DirectLogin',
    DIRECT_STRUCT: host + "/oa/Direct/getDirectStuct",
    DIRECT_INFO: host + "/business/GetDirectBusinessStruct",
    UNION_ALL: host + "/oa/direct/getCurrentDirectAllance",
    UNION_AUDIT: host + "/alliance/alliance/ConfirmAllianceRegister"
};
exports.default = API_URL;
module.exports = exports['default'];

//# sourceMappingURL=constant-compiled.js.map
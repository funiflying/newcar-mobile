'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api2 = undefined;

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _api2.default({
  baseURI: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
var api2 = new _api2.default({
  baseURI: "http://192.168.0.198:108",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
exports.default = api;
exports.api2 = api2;

//# sourceMappingURL=index-compiled.js.map
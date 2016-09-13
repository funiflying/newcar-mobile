'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.isPromise = isPromise;
exports.getCookie = getCookie;
exports.checkUnoinStatus = checkUnoinStatus;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPromise(value) {
  if (value !== null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
function checkUnoinStatus(flag) {
  flag = parseInt(flag);
  var descr = "";
  switch (flag) {
    case 0:
      descr = "审核中";
      break;
    case 1:
      descr = "拒绝";
      break;
    case 2:
      descr = "已初审";
      break;
    case 3:
      descr = "拒绝";
      break;
    case 4:
      descr = "通过";
      break;
    default:
      descr = "未知状态" + flag;
      break;

  }
  return descr;
}

//# sourceMappingURL=index-compiled.js.map
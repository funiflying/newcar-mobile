'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = ['get', 'head', 'post', 'put', 'del', 'options', 'patch'];

var _Api = function _Api(opts) {
  var _this = this;

  (0, _classCallCheck3.default)(this, _Api);

  this.opts = opts || {};

  if (!this.opts.baseURI) throw new Error('baseURI option is required');

  methods.forEach(function (method) {
    return _this[method] = function (path) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var params = _ref.params;
      var data = _ref.data;
      return new _promise2.default(function (resolve, reject) {
        var request = _superagent2.default[method](_this.opts.baseURI + path);
        if (params) {
          request.query(params);
        }
        if (_this.opts.headers) {
          request.set(_this.opts.headers);
        }
        if (data) {
          request.send(data);
        }
        request.withCredentials();
        request.end(function (err, res) {
          console.log(res);
          if (err) {
            reject(res || err);
          } else {
            resolve(res);
          }
        });
        //request.end((err, { body } = {}) =>{console.log(body); err ? reject(body || err) : resolve(body)});
      });
    };
  });
};

var Api = _Api;

exports.default = Api;
module.exports = exports['default'];

//# sourceMappingURL=api-compiled.js.map
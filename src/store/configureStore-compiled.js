'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _promiseMiddleware = require('../middlewares/promiseMiddleware');

var _promiseMiddleware2 = _interopRequireDefault(_promiseMiddleware);

var _user = require('../reducers/user');

var _user2 = _interopRequireDefault(_user);

var _menu = require('../reducers/menu');

var _menu2 = _interopRequireDefault(_menu);

var _organize = require('../reducers/organize');

var _organize2 = _interopRequireDefault(_organize);

var _union = require('../reducers/union');

var _union2 = _interopRequireDefault(_union);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({ user: _user2.default, menu: _menu2.default, organize: _organize2.default, union: _union2.default });
var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _promiseMiddleware2.default)({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] }))(_redux.createStore);
function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
module.exports = exports['default'];

//# sourceMappingURL=configureStore-compiled.js.map
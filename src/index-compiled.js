'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _history = require('history');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _App = require('./views/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./views/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Login = require('./views/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Organization = require('./views/Organization');

var _Organization2 = _interopRequireDefault(_Organization);

var _Union = require('./views/Union');

var _Union2 = _interopRequireDefault(_Union);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _reactRouter.useRouterHistory)(_history.createHistory)({ basename: '' });
var store = (0, _configureStore2.default)();

var validate = function validate(next, replace, callback) {
  var isLoggedIn = !!(0, _utils.getCookie)('uid');
  if (!isLoggedIn && next.location.pathname != '/login') {
    //replace('/login')
  }
  callback();
};

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', onEnter: validate },
      _react2.default.createElement(_reactRouter.IndexRedirect, { to: 'home' }),
      _react2.default.createElement(
        _reactRouter.Route,
        { component: _App2.default },
        _react2.default.createElement(_reactRouter.Route, { path: 'home', component: _Home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'organize', component: _Organization2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'union-review', component: _Union2.default })
      ),
      _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default })
    )
  )
), document.getElementById('root'));

//# sourceMappingURL=index-compiled.js.map
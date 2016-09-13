'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _index = require('E:\\application\\react-antd-admin\\node_modules\\redbox-react\\lib\\index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('E:\\application\\react-antd-admin\\node_modules\\react-transform-catch-errors\\lib\\index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('E:\\application\\react-antd-admin\\node_modules\\react-transform-hmr\\lib\\index.js');

var _index6 = _interopRequireDefault(_index5);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _NavPath = require('../../components/NavPath');

var _NavPath2 = _interopRequireDefault(_NavPath);

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Sidebar = require('../../components/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Footer = require('../../components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _user = require('../../actions/user');

require('antd/style/index.less');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  App: {
    displayName: 'App'
  }
};

var _EApplicationReactAntdAdminNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'E:/application/react-antd-admin/src/views/App/index.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _EApplicationReactAntdAdminNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'E:/application/react-antd-admin/src/views/App/index.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _EApplicationReactAntdAdminNode_modulesReactTransformHmrLibIndexJs2(_EApplicationReactAntdAdminNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var App = _wrapComponent('App')(function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
  }

  (0, _createClass3.default)(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var actions = this.props.actions;

      actions.fetchProfile();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var user = _props.user;
      var actions = _props.actions;


      return _react3.default.createElement(
        'div',
        { className: 'ant-layout-aside' },
        _react3.default.createElement(_Sidebar2.default, null),
        _react3.default.createElement(
          'div',
          { className: 'ant-layout-main' },
          _react3.default.createElement(_Header2.default, { user: user }),
          _react3.default.createElement(_NavPath2.default, null),
          _react3.default.createElement(
            'div',
            { className: 'ant-layout-container' },
            _react3.default.createElement(
              'div',
              { className: 'ant-layout-content' },
              this.props.children
            )
          )
        )
      );
    }
  }]);
  return App;
}(_react3.default.Component));

App.propTypes = {
  user: _react2.PropTypes.object,
  children: _react2.PropTypes.node.isRequired
};

App.contextTypes = {
  history: _react2.PropTypes.object.isRequired,
  store: _react2.PropTypes.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  var user = state.user;

  return {
    user: user ? user : null
  };
};

function mapDispatchToProps(dispatch) {
  return { actions: (0, _redux.bindActionCreators)({ fetchProfile: _user.fetchProfile, logout: _user.logout }, dispatch) };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);
module.exports = exports['default'];

//# sourceMappingURL=index-compiled.js.map
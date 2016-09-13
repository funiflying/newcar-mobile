'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

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

var _reactRouter = require('react-router');

var _menu3 = require('../../actions/menu');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  Sidebar: {
    displayName: 'Sidebar'
  }
};

var _EApplicationReactAntdAdminNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'E:/application/react-antd-admin/src/components/Sidebar/index.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _EApplicationReactAntdAdminNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'E:/application/react-antd-admin/src/components/Sidebar/index.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _EApplicationReactAntdAdminNode_modulesReactTransformHmrLibIndexJs2(_EApplicationReactAntdAdminNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var SubMenu = _menu2.default.SubMenu;

var defaultProps = {
  items: [],
  currentIndex: 0
};

var propTypes = {
  items: _react2.PropTypes.array,
  currentIndex: _react2.PropTypes.number
};

var Sidebar = _wrapComponent('Sidebar')(function (_React$Component) {
  (0, _inherits3.default)(Sidebar, _React$Component);

  function Sidebar(props) {
    (0, _classCallCheck3.default)(this, Sidebar);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Sidebar).call(this, props));
    //this.menuClickHandle = this.menuClickHandle.bind(this);
  }

  (0, _createClass3.default)(Sidebar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //  this.props.getAllMenu()
    }
  }, {
    key: 'menuClickHandle',
    value: function menuClickHandle(item) {
      //this.props.updateNavPath(item.keyPath, item.key)
    }
  }, {
    key: 'render',
    value: function render() {
      //const { items } = this.props;
      var items = [{
        key: 1,
        name: '组织结构',
        icon: 'user',
        child: [{
          name: '直营公司',
          key: 101,
          url: 'organize'
        }, {
          name: '管辖设置',
          key: 102,
          url: 'precinct'
        }, {
          name: '成员管理',
          key: 103,
          url: 'employee'
        }]
      }, {
        key: 2,
        name: '联盟商家',
        icon: 'solution',
        child: [{
          name: '审核',
          key: 201,
          url: 'union-review'
        }, {
          name: '新增',
          key: 202,
          url: 'union-add'
        }]
      }];
      var openKey = [];
      var menu = items.map(function (item) {

        openKey.push('sub' + item.key);
        return _react3.default.createElement(
          SubMenu,
          {
            key: 'sub' + item.key,
            title: _react3.default.createElement(
              'span',
              null,
              _react3.default.createElement(_icon2.default, { type: item.icon }),
              item.name
            )
          },
          item.child.map(function (node) {
            return _react3.default.createElement(
              _menu2.default.Item,
              { key: 'menu' + node.key },
              _react3.default.createElement(
                _reactRouter.Link,
                { to: node.url },
                node.name
              ),
              ' '
            );
          })
        );
      });
      return _react3.default.createElement(
        'aside',
        { className: 'ant-layout-sider' },
        _react3.default.createElement(
          'div',
          { className: 'ant-layout-logo' },
          '车同享OA系统'
        ),
        _react3.default.createElement(
          _menu2.default,
          {
            mode: 'inline', theme: 'link', openKeys: openKey,
            onClick: this.menuClickHandle.bind(this)
          },
          menu
        )
      );
    }
  }]);
  return Sidebar;
}(_react3.default.Component));

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

  return {
    items: state.menu.items,
    currentIndex: state.menu.currentIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: (0, _redux.bindActionCreators)(_menu3.getAllMenu, dispatch),
    updateNavPath: (0, _redux.bindActionCreators)(_menu3.updateNavPath, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Sidebar);
module.exports = exports['default'];

//# sourceMappingURL=index-compiled.js.map
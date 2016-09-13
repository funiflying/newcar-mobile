import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'
import Nav from "../../utils/nav"
const SubMenu = Menu.SubMenu;
import './index.less'

const defaultProps = {
  items: [],
  currentIndex: 0
}
const propTypes = {
  items: PropTypes.array,
  currentIndex: PropTypes.number
};

let  Sidebar =React.createClass({
  getInitialState(){
    return {
      current: '1'
    }
  },
  componentDidMount () {
  //  this.props.getAllMenu()
  },
  menuClickHandle (item) {
    this.setState({
      current:item.key
    });
    this.props.updateNavPath(item.keyPath, item.key)
  },
  render () {
    //const { items } = this.props;
        let openKey = [];
    const menu = Nav.map((item) => {
     openKey.push('sub'+item.key);
      return (
        <SubMenu
          key={'sub'+item.key}
          title={<span><Icon type={item.icon} />{item.name}</span>}
        >
          {item.child.map((node) => {
            return (
              <Menu.Item key={'menu'+node.key}><Link to={node.url}>{node.name}</Link> </Menu.Item>
            )
          })}
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">
        </div>
        <Menu
          mode="inline"
          theme="link"
          onClick={this.menuClickHandle}
          defaultOpenKeys={openKey}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {menu}
        </Menu>
      </aside>
    )
  }
})

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

  return {
    items: state.menu.items,
    currentIndex: state.menu.currentIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

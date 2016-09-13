import React from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import './index.less'
import { Link } from 'react-router'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends React.Component {
  constructor () {
    super()
  }

  render () {
    const {user} = this.props;
    return (
      <div className='ant-layout-header clearfix'>
       <div className="weath-container">
         <iframe className="weath" src="http://tianqi.2345.com/plugin/widget/index.htm?s=3&z=1&t=0&v=0&d=3&bd=0&k=000000&f=808080&q=1&e=1&a=1&c=59134&h=25&align=left"></iframe>
       </div>
        <Menu className="header-menu"
        mode="horizontal">
          <SubMenu title={<span><Icon type="user" />{user&&user.Account}</span>}>
            <Menu.Item key="setting:1"><a href="#login"><Icon type="poweroff"/>注销</a></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

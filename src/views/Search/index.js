import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,Popover,SearchBar,Grid } from 'antd-mobile';
import {data}  from '../../utils/brand-index';
import {getItem,submitOrder} from '../../actions/item'
import './index.less'
const defaultProps = {
    item: {},
    message:null,
    result:null,
    loading:false
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Item=React.createClass({
    getInitialState() {
        return {
            loading: false,
            open:false,
            visible:false,
            items:[],
            key:1,
            label:"二手",
            placeholder:"品牌/车源号"
        };
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){

    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    handleOpenChange(open) {
        this.setState({
            open
        });
    },
    handleSearch(value){
      if(value){
          switch (this.state.key){
              case "2":
                  this.setState({
                      placeholder:"店铺名称"
                  });
                  break;
              case "1":
              case "3":
              case "4":
                  let arr= data.filter(function(d){
                      return d.label.indexOf(value)>-1||d.spell.indexOf(value.toUpperCase())>-1;
                  });
                  this.setState({
                      items:arr
                  });
                  break;
          }





      }else {
          this.setState({
              items:[]
          })
      }

    },
    handleSelect(event){
       this.setState({
           key:event.key,
           label:event.props.children,
           open:!this.state.open
       });
        switch (event.key){
            case "1":
                this.setState({
                    items:[],
                    placeholder:"品牌/车源号"
                });
                break;
            case "2":
                this.setState({
                    placeholder:"店铺名称"
                });
                break;
            case "3":
            case "4":
                this.setState({
                    placeholder:"品牌"
                });
                break;
        }
    },
    handleSearchSubmit(value){
        alert(value)
    },
    render()
    {
        const menu=<Popover
            visible={this.state.visible}
            placement="topLeft"
            overlay={[
            <Popover.Item key="1">
                <Link to="/home">网站首页</Link>
            </Popover.Item>,
            <Popover.Item key="0">
                <Link to="/auto">新车直销</Link>
            </Popover.Item>,
            <Popover.Item key="2">
                <Link to="/buy">平行进口</Link>
            </Popover.Item>,
            <Popover.Item key="3">
                <a href="http://wx.chetongxiang.com/index.html">精选二手</a>
            </Popover.Item>,
             <Popover.Item key="4">
                <Link to="/atobuy">一键帮买</Link>
            </Popover.Item>
          ]}
            popupAlign={{

          }}
            onVisibleChange={this.handleVisibleChange}
        >
            <span><Icon type="bars" /></span>
        </Popover>;
        return (
            <div>
                    {this.state.loading? <ActivityIndicator
                        toast
                        text={this.state.loaderText}
                    />:""}
                    <NavBar mode="light" iconName="left" leftContent={<Link  to="/home">返回</Link>}  rightContent={menu}>搜索</NavBar>
                    <div className="t-search-bar">
                        <div className="search-btn">
                            <Popover
                                visible={this.state.open}
                                placement="topLeft"
                                overlay={[
                                    <Popover.Item key="1">
                                        二手车
                                    </Popover.Item>,
                                    <Popover.Item key="2">
                                        店铺
                                    </Popover.Item>,
                                    <Popover.Item key="3">
                                        新车
                                    </Popover.Item>,
                                    <Popover.Item key="4">
                                        进口车
                                    </Popover.Item>

                                  ]}
                                popupAlign={{

                                  }}
                                onVisibleChange={this.handleOpenChange}
                                onSelect={this.handleSelect}
                            >
                                <span className="action">{this.state.label}<Icon type="down" /></span>
                            </Popover>
                        </div>
                        <div className="search-bar">
                            <SearchBar placeholder={this.state.placeholder} onChange={this.handleSearch} onSubmit={this.handleSearchSubmit}/>
                        </div>
                    </div>
                   {
                       this.state.items.length>0&&<List>
                           {
                               this.state.items.map((item)=>{
                                   return(<List.Item
                                       thumb={"/car/"+item.value+".png"}
                                       key={item.value}
                                   >{item.label}</List.Item>)
                               })
                           }
                       </List>
                   }

            </div>
        )
    }

});
Item.contextTypes = contextTypes;
function mapStateToProps(state) {
    return {
        item: state.item.item,
        message:state.item.message,
        result:state.item.result,
        loading:state.item.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getItem:bindActionCreators(getItem,dispatch),
        submitOrder:bindActionCreators(submitOrder,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)
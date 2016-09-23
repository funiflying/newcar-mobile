import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,SearchBar,Button,WingBlank,WhiteSpace,Flex,Dropdown,Drawer,List,Toast} from 'antd-mobile';
import  {getCount,getCityList} from '../../actions/home'
import  {Storage} from '../../utils/index'
import  {ChineseDistricts} from '../../utils/constant'
import './index.less'
const defaultProps = {
    items: [],
    message:null,
    result:null
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Home=React.createClass({
    getInitialState(){
        return{
            location:"定位中...",
            current:"定位中...",
            open: false,
            position: 'left',
            city_items:[],
            count:0
        }
    },
    handleGetLocation(){
        Toast.loading("正在定位",function(){
            navigator.geolocation.getCurrentPosition(function (position) {
             var lat = position.coords.latitude;
             var lon = position.coords.longitude;
             var point = new BMap.Point(lon, lat);  // 创建坐标点
             var myGeo = new BMap.Geocoder();
             myGeo.getLocation(point, function (result) {
             var city = result.addressComponents.city;
             var province=result.addressComponents.province;
             this.setState({
                location:city,
                 current:city,
                 open: !this.state.open
             });
             }.bind(this))
           }.bind(this));
        }.bind(this));
    },
    handleSearch(){
        this.context.router.replace("/search");
    },
    handleCityChange(record){
        if(record.CityID||record.ID){
            Storage.setStorage("LOCALTION",{
                CityID:record.CityID||record.ID,
                CityName:record.CityName||record.Name
            });
            this.setState({
                current: record.CityName||record.Name
            })
        }
       this.setState({
           open: !this.state.open
       })
    },
    componentDidMount(){
        this.props.getCityList();
        this.props.getCount();

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var point = new BMap.Point(lon, lat);  // 创建坐标点
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(point, function (result) {
                var city = result.addressComponents.city;
                var province=result.addressComponents.province;
                const Districts= ChineseDistricts["860"];
                let Area=null;
                for (let p in Districts){
                    if(Districts.hasOwnProperty(p)){
                        if(Districts[p]==province)
                        {
                            Area=ChineseDistricts[p];
                            console.log(Area)
                        }
                    }
                }
                for (let c in Area){
                    if(Area.hasOwnProperty(c)){
                        if(Area[c]===city)
                        {
                            Storage.setStorage("LOCALTION",{
                                CityID:c,
                                CityName:Area[c]
                            });
                        }
                    }
                }
                this.setState({
                    location:city,
                    current:city
                });
            }.bind(this))
        }.bind(this));
    },
    componentWillReceiveProps(nexProps){
        if(nexProps.items){
            this.setState({
                city_items:nexProps.items
            })
        }
        if(nexProps.result){
            this.setState({
                count:nexProps.result.count
            });
        }
    },
    handleLinkAtobuy(){
        this.context.router.replace("/atobuy");
    },
    handleSellCar(){
      window.location.href="http://wx.chetongxiang.com/index.html#/sell"
    },
    render(){
        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.handleCityChange,
            sidebarStyle:{width:"80%"},
            dragToggleDistance:50,
            touch:false
        };
        const sidebar = (<div>
            <List>
                <List.Header>定位</List.Header>
                <List.Body>
                    <List.Item key={1} onClick={this.handleGetLocation}>
                        <Icon type="environment-o" /> {this.state.location}
                    </List.Item>
                </List.Body>
            </List>
            {
                this.state.city_items.map((p)=>{
                   return (
                       <List key={p.ID}>
                           <List.Header key={p.AllProvincecode} style={{"paddingTop":"0"}} onClick={this.handleCityChange.bind(this,p)}>{p.PY} {p.Name}</List.Header>
                           <List.Body>
                               {
                                   p.City.map((c)=>{
                                   return <List.Item key={c.CityID} onClick={this.handleCityChange.bind(this,c)} >{c.CityName}</List.Item>
                               })}
                           </List.Body>

                       </List>
                   )

                })
            }
        </div>);
        return(
            <div>
                <NavBar mode="light" iconName={false} className="t-navbar">
                    首页
                </NavBar>
                <div className="drawer-container" >
                    <Drawer sidebar={sidebar}{...drawerProps}>
                        <section className="t-search">
                            <p className="locator" onClick={this.handleCityChange}>
                                <Icon type="environment-o" /> {this.state.current}&nbsp;<Icon type="down" />
                            </p>
                            <SearchBar
                                placeholder="搜索"
                                onFocus={this.handleSearch}
                                autofocus={false}
                            />
                        </section>
                        <section className="t-linkBtn">
                            <WhiteSpace />
                            <WingBlank size={4}>
                                <Button type="button">
                                    <a href="">
                             <span style={{"float":"left"}}>
                                <span style={{"fontSize":"20px"}}>
                                    {this.state.count}
                                </span>
                                <span style={{"fontSize":"14px"}}>
                                    &nbsp;辆二手好车
                                </span>

                            </span>
                            <span style={{"float":"right"}}>
                                  帮买广场
                                <Icon type="right" />
                            </span>
                                    </a>
                                </Button>
                            </WingBlank>
                            <WhiteSpace/>
                            <WingBlank size={4}>
                                <Flex>
                                    <Flex.Item>
                                        <Button type="button" onClick={this.handleLinkAtobuy}>
                                                <span style={{"float":"left"}}>
                                                   一键帮买
                                            </span>
                                            <span style={{"float":"right"}}>
                                                <Icon type="right" />&nbsp;
                                            </span>
                                        </Button>
                                    </Flex.Item>
                                    <Flex.Item>

                                        <Button type="button" onClick={this.handleSellCar}>
                                            <span style={{"float":"left"}}>
                                                   快速卖车
                                            </span>
                                            <span style={{"float":"right"}}>
                                                <Icon type="right" />&nbsp;
                                            </span>
                                        </Button>
                                    </Flex.Item>
                                </Flex>
                            </WingBlank>
                        </section>
                        <WhiteSpace />
                        <WingBlank size={4}>
                            <Flex>
                                <Flex.Item className="second-hand">
                                    <a href="http://wx.chetongxiang.com/index.html">
                                        <img src={require("./second-hand.png")} alt=""/>
                                    </a>
                                </Flex.Item>
                                <Flex.Item>
                                    <Flex direction="column" justif='between'>
                                        <Flex.Item className="new-car">
                                            <Link to="/auto">
                                                <img src={require("./new-car.png")} alt=""/>
                                            </Link>
                                        </Flex.Item>
                                        <Flex.Item className="import-car" style={{"marginLeft":"0","marginTop":"8px"}}>
                                            <Link to="/buy">
                                                <img src={require("./import-car.png")} alt=""/>
                                            </Link>
                                        </Flex.Item>
                                    </Flex>
                                </Flex.Item>
                            </Flex>
                        </WingBlank>
                        <WhiteSpace/>
                        <h2 className="t-access-h">
                            快速入口
                        </h2>
                        <WhiteSpace/>
                        <WingBlank>
                            <article>
                                <Flex>
                                    <Flex.Item className="t-join">
                                        <Link to="/join" style={{"color":"#20cfb2","display":"block","height":"100%"}}>
                                            诚邀
                                            <p>
                                                各大车商入驻
                                            </p>
                                        </Link>

                                    </Flex.Item>
                                    <Flex.Item className="t-assess">
                                        <p style={{"color":"#669ce4"}}>
                                            精选
                                        </p>
                                        <p>
                                            评估检测车辆
                                        </p>
                                    </Flex.Item>
                                </Flex>
                            </article>
                        </WingBlank>
                        <WhiteSpace/>
                    </Drawer>
                </div>
            </div>
        )
    }
});
Home.contextTypes = contextTypes;
function mapStateToProps(state) {
    return {
        items: state.home.items,
        message:state.home.message,
        result:state.home.result
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCount:bindActionCreators(getCount,dispatch),
        getCityList:bindActionCreators(getCityList,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
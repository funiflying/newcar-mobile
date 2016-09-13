import React,{PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavBar,Icon,SearchBar,Button,WingBlank,WhiteSpace,Flex,Popup,Drawer,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Popover} from 'antd-mobile';
import {Link} from 'react-router'
import BackTop from 'antd/lib/back-top'
import classNames from 'classnames'
import  {getCarList} from '../../actions/buy-new'
import brandData from '../../utils/brand-index'
import '../Buy/index.less'
import './index.less'
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const defaultProps = {
    items: [],
    message:null,
    result:null,
    loading:false
};
let count = 1;
let index =- 1;
const NUM_SECTIONS = 20;
let pageIndex = 1;
let ALL=[];
let PARAMS={
    PageNo:1
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
const Brand_Index = React.createClass({
    getInitialState() {
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.createDs = (ds, brand) => {
            const dataBlob = {};
            const sectionIDs = [];
            const rowIDs = [];
            Object.keys(brand).forEach((item, index) => {
                sectionIDs.push(item);
                dataBlob[item] = item;
                rowIDs[index] = [];

                brand[item].forEach(jj => {
                    rowIDs[index].push(jj.value);
                    dataBlob[jj.value] = jj;
                });
            });
            return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
        };
        return {
            inputValue: '',
            dataSource: this.createDs(dataSource, brandData),
            headerPressCount: 0,
            open:false,
            items:[],
            brandName:"车系列表",
            loading:true
        };
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.items&&nextProps.items!=this.props.items){
            if(nextProps.items.count==0){
                this.setState({
                    items:[{empty:true}],
                    loading:false
                })
            }else {
                this.setState({
                    items:nextProps.items.data,
                    loading:false
                })
            }
        }
    },
    onSearch(val) {
        const pd = { ...brandData };
        Object.keys(pd).forEach((item) => {
            pd[item] = pd[item].filter(jj => {
                return jj.QF==(val.toLocaleUpperCase())||jj.spell.toLocaleLowerCase()==(val.toLocaleLowerCase())||jj.label.indexOf(val)> -1
            });
        });
        this.setState({
            inputValue: val,
            dataSource: this.createDs(this.state.dataSource, pd)
        });
        return false;
    },
    handleBrand(value,name){
        if(value){
            this.props.getCarList({
                BrandID:value
            });
            this.setState({
                brandName:name
            })
        }
        this.setState({
            open:!this.state.open,
            loading:true
        })
    },
    handleCloseBrand(){
        this.context.router.replace("/auto");
    },
    render() {
        const row =((rowData) => {
            var thumb='./car/'+rowData.value+".png";
            return (<List.Item key={rowData.value} thumb={require(thumb)} onClick={this.handleBrand.bind(this,rowData.value,rowData.label)} >{rowData.label}</List.Item>)
        });
        const drawerProps = {
            open: this.state.open,
            position: "right",
            onOpenChange: this.handleBrand,
            dragToggleDistance: 50,
            touch: false,
            contentStyle:{},
            sidebarStyle:{zIndex:999,"width":"80%","top":"0","position":"fixed"}
        };
        const sidebar = (
            <List
                title={this.state.brandName}
            >
                <List.Body>
                    {
                        !this.state.loading&&this.state.items.map((item)=>{
                            if(item.empty){
                                return (<div className="subscribe-box" key="1">
                                    <p className="sube-no">
                                        没有相关信息，请重新搜索
                                    </p>
                                    <div className="sube-btn">
                                        <Link className="btn" to="/atobuy">一键帮买</Link>
                                    </div>
                                </div>)
                            }
                            return(
                                    <div className="buy-list-sidebar" key={item.SeriesNO}>
                                        <Link to={"/series/"+item.SeriesNO+"/"}>
                                            <div className="describe">
                                                <div className="pic">
                                                    <img src={item.CoverImgURL} />
                                                </div>
                                                <div className="text">
                                                    <Flex>
                                                        <h3 className="title">{item.SeriesName}</h3>
                                                    </Flex>
                                                    <Flex wrap="nowrap">
                                                        <Flex.Item>
                                                            优惠价：{item.Price_Max>item.Price_Min?<span>{item.Price_Min} 〜 {item.Price_Max}<small>万</small></span>:<span>{item.Price_Min}<small>万</small></span>}
                                                        </Flex.Item>
                                                    </Flex>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                            )
                        })
                    }
                </List.Body>
                {this.state.loading&&<ActivityIndicator size="large"  text="加载中..."/>}
            </List>
        );
        return (
           <div>
               <Drawer sidebar={sidebar}{...drawerProps} className="spe-drawer">
                   <div style={{"minHeight":window.screen.height,"height":"100%"}}>
                       <NavBar mode="light" iconName="cross" onLeftClick={this.handleCloseBrand}>品牌找车</NavBar>
                       <div>
                           <SearchBar
                               value={this.state.inputValue}
                               placeholder="名称/首字母"
                               onChange={this.onSearch}

                           />
                       </div>
                       <ListView.IndexedList
                           dataSource={this.state.dataSource}
                           renderSectionHeader={(sectionData) => (
                              <List.Item>{sectionData}</List.Item>
                            )}
                           renderRow={row}
                           pageSize={10}
                           scrollRenderAheadDistance={500}
                           scrollEventThrottle={20}
                           onEndReachedThreshold={10}
                           stickyHeader
                           useBodyScroll
                           stickyProps={{
                              stickyStyle: { zIndex: 100,"background":"#f5f5f5"}
                              // topOffset: -43,
                              // isActive: false, // 关闭 sticky 效果
                            }}
                           quickSearchBarStyle={{
                              top:"80px",
                              textAlign:"left",
                              zIndex:2
                            }}
                       />
                   </div>

               </Drawer>
               <BackTop />
           </div>

     );
    }
});
Brand_Index.contextTypes = contextTypes;
function mapStateToProps(state) {
    return {
        items: state.buy.items,
        message:state.buy.message,
        result:state.buy.result,
        loading:state.buy.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCarList:bindActionCreators(getCarList,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Brand_Index)
import React,{PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavBar,Icon,SearchBar,Button,WingBlank,WhiteSpace,Flex,Popup,Drawer,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Popover} from 'antd-mobile';
import {Link} from 'react-router'
import BackTop from 'antd/lib/back-top'
import classNames from 'classnames'
import brandData,{Series} from '../../utils/brand-index'
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
            brand:null,
            loading:true
        };
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
            this.setState({
                brandName:name,
                brand:value,
                items:Series[value]
            })
        }
        this.setState({
            open:!this.state.open,
            loading:true
        })
    },
    handleCloseBrand(){
        this.context.router.replace("/second");
    },
    handleSeriesClick(item){
        let label=this.state.brandName;
        if(item.label){
            label=this.state.brandName+"-"+item.label
        }
        this.context.router.push({
            pathname: '/second',
            state: {series:item.value,label:label,brand:this.state.brand}
        });
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
                        this.state.items.map((item)=>{

                            return(
                                <List.Item key={item.value} onClick={this.handleSeriesClick.bind(this,item)}>{item.label}</List.Item>
                            )
                        })
                    }
                </List.Body>
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Brand_Index)
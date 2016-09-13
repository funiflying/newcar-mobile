import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Carousel,Steps,Modal,InputItem,Picker,Drawer,Popover,Accordion} from 'antd-mobile';
import { createForm } from 'rc-form';
import {getSpecify,getSpecConf,getSpecPic,submitOrder} from '../../actions/specify'
import  {COLOR_NAME} from '../../utils/constant'
import './index.less'
const RadioItem = Radio.RadioItem;
const defaultProps = {
    items: {},
    message:null,
    result:null,
    loading:true,
    conf_list:null
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Item=React.createClass({
    getInitialState() {
        const getSectionData = (dataBlob,sectionID,rowID) => {
           return dataBlob[sectionID]
        };
        const getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.createDs = (ds, data) => {
            const dataBlob = {};
            const sectionIDs = [];
            const rowIDs = [];
            Object.keys(data).forEach((item, index) => {
                sectionIDs.push(item);
                dataBlob[item] =data[item]["SpecCatalog"];
                rowIDs[index] = [];
                data[item]["ParamRows"].forEach(jj => {
                    rowIDs[index].push(jj.ID);
                    dataBlob[jj.ID] = jj;
                });
            });
            return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
        };
        return {
            dataSource: this.createDs(this.dataSource, []),
            item:null,
            conf_list:[],
            loading: true,
            title:"",
            visible:false,
            open:"hidden",
            loaderText:"加载中..."
        };
    },
    componentDidMount(){
        if(this.props.routeParams.CarNo){
            this.props.getSpecify({CarNo:this.props.routeParams.CarNo});
            this.props.getSpecConf({CarNo:this.props.routeParams.CarNo});

        }else {
            Toast.fail("车辆信息不存在", ()=>{
                this.context.router.replace("/specify/"+this.props.routeParams.CarNo+"/")
            })
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.item&&nextProps.item!=this.props.item){
            this.setState({
                item:nextProps.item,
                title:nextProps.item.SpecName
            });
        }
        if(nextProps.conf_list&&nextProps.conf_list!=this.props.conf_list){
            this.setState({
                dataSource: this.createDs(this.dataSource, nextProps.conf_list),
                conf_list:nextProps.conf_list
            });
        }
        setTimeout(()=>{
            this.setState({
                loading:nextProps.loading
            });
        },1000);


    },
    handleOpenChange(){
        this.setState({
            open:this.state.open=="hidden"?"visible":"hidden"
        });
    },
    render()
    {
        const row = (rowData, sectionID, rowID) => {
            return (
                    <List.Item extra={rowData.SpecDetail} key={rowID}>
                        {
                            rowData.SpecName
                        }
                    </List.Item>
                )
        };
        return (
            <div className="t-catalog-container">
                    {this.state.loading? <ActivityIndicator
                        toast
                        text={this.state.loaderText}
                    />:""}
                    <NavBar mode="light" iconName="left" leftContent={<Link to={"/specify/"+this.props.routeParams.CarNo+"/"}>返回</Link>} className="t-pic-navbar">{this.state.title}</NavBar>
                    <ListView.IndexedList
                        dataSource={this.state.dataSource}
                        renderSectionHeader={(sectionData) => (
                              <List.Item >{sectionData} &nbsp;&nbsp;&nbsp;<span> ●标配 ○选配 -无</span></List.Item>
                            )}
                        renderRow={row}
                        pageSize={10}
                        scrollRenderAheadDistance={500}
                        scrollEventThrottle={20}
                        useBodyScroll
                        onEndReachedThreshold={10}
                        stickyHeader
                        stickyProps={{
                              stickyStyle: { zIndex: 100,"background":"#f5f5f5","top":"38px" }
                              // topOffset: -43,
                              // isActive: false, // 关闭 sticky 效果
                            }}
                        quickSearchBarStyle={{
                          visibility:this.state.open,
                          color:"#fff",
                          top:"inherit",
                          bottom:"65px",
                          left:"10px",
                          textAlign:"left",
                          zIndex:2,
                          background:"rgba(0,0,0,.5)",
                          width:"4rem"
                        }}
                        quickSearchBarTop={{
                          label:"回到顶部"

                        }}
                        onQuickSearch={this.handleOpenChange}
                    />
                <div className="t-catalog">
                    <span className="t-catalog-show" onClick={this.handleOpenChange}>目录</span>
                </div>
            </div>
        )
    }

});
Item.contextTypes = contextTypes;
Item = createForm()(Item);
function mapStateToProps(state) {
    return {
        item: state.specify.item,
        message:state.specify.message,
        result:state.specify.result,
        loading:state.specify.loading,
        conf_list:state.specify.conf_list
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSpecify:bindActionCreators(getSpecify,dispatch),
        getSpecConf:bindActionCreators(getSpecConf,dispatch),
        getSpecPic:bindActionCreators(getSpecPic,dispatch),
        submitOrder:bindActionCreators(submitOrder,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)

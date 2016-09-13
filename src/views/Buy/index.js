import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,SearchBar,Button,WingBlank,WhiteSpace,Flex,Popup,Drawer,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Popover} from 'antd-mobile';
import BackTop from 'antd/lib/back-top'
import classNames from 'classnames'
import  {getCarList} from '../../actions/buy'
import  {Storage} from '../../utils/index'
import  {ChineseDistricts} from '../../utils/constant'
import './index.less'
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;

const StaticBrand=[
    {
        value:17,
        label:"奔驰"
    },
    {
        value:150,
        label:"沃尔沃"
    },
    {
        value:103,
        label:"路虎"
    },
    {
        value:45,
        label:"丰田"
    },
    {
        value:5,
        label:"奥迪"
    },
    {
        value:48,
        label:"福特"
    }, {
        value:70,
        label:"Jeep"
    },
    {
        value:8,
        label:"宝马"
    },
    {
        value:108,
        label:"玛莎拉蒂"
    },
    {
        value:100,
        label:"铃木"
    },
    {
        value:10,
        label:"保时捷"
    },
    {
        value:126,
        label:"日产"
    },
    {
        value:34,
        label:"大众"
    },
    {
        value:19,
        label:"本田"
    },
    {
        value:155,
        label:"现代"
    }

];
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
    Sort:0,
    PageNo:1
};

let Buy=React.createClass({
    getInitialState() {
        const dataSource = new ListView.DataSource({
            rowHasChanged : (row1, row2) => row1 !== row2
        });
        return {
            items: [],
            data:[],
            dataSource:dataSource.cloneWithRows([]),
            loading: false,
            pageTotal:0,
            refresh:"点击加载更多",
            sort:0,
            pid:0,//价格
            ps:null,
            pe:null,
            cid:null,//车型
            cname:null,
            sid:null,//状态
            sname:null,
            agio:null,//特惠
            hot:null,//热门
            country:null,//城市
            country_name:null,
            brand:null,//品牌
            sort_text:"默认排序",
            open: false,
            open2:false,
            list_height:"auto",
            visible:false
        };
    },
    componentDidMount(){
        PARAMS={
            Sort:0,
            PageNo:1
        };
        this.props.getCarList(PARAMS);
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.items){
            ALL=ALL.concat(nextProps.items.data);
            if(ALL.length==0){
                ALL.push({empty:true});
            }
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(ALL),
                pageTotal:Math.ceil(nextProps.items.count/NUM_SECTIONS),
                refresh:Math.ceil(nextProps.items.count/NUM_SECTIONS)>1?"加载更多":"加载完毕"
            });
        }
        this.setState({
           loading:nextProps.loading
        });
    },
    onEndReached(event) {
        pageIndex++;
        if(pageIndex<this.state.pageTotal){
            this.setState({loading:true});
            PARAMS.PageNo=pageIndex;
            setTimeout(()=>{
                this.props.getCarList(PARAMS);
            },1500)

        }else if(pageIndex==this.state.pageTotal){
            this.setState({loading:true});
            PARAMS.PageNo=pageIndex;
            setTimeout(()=>{
                this.props.getCarList(PARAMS);
            },1500);
            this.setState({
                    refresh:"已全部加载"
                })
        }
    },
    loadingFunction() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.props.getCarList()
                if (true) {
                   /* ALL=[];
                    pageIndex=1;*/
                    resolve();
                } else {
                    reject();
                }
            }, 500);
        });
    },
    handleSort(){
        var Sort=document.getElementsByClassName("FILTER-SORT");
        var Price=document.getElementsByClassName("FILTER-PRICE");
        var content=(<List className="FILTER-SORT">
            <List.Body>
                <RadioItem checked={this.state.sort===0} onChange={this.handleSortChange.bind(null,0,"默认排序")} >
                    默认排序
                </RadioItem>
                <RadioItem checked={this.state.sort===1} onChange={this.handleSortChange.bind(null,1,"最新发布")} >
                    最新发布
                </RadioItem>
                <RadioItem checked={this.state.sort===2}  onChange={this.handleSortChange.bind(null,2,"价格最低")} >
                    价格最低
                </RadioItem>
                <RadioItem checked={this.state.sort===-2}  onChange={this.handleSortChange.bind(null,-2,"价格最高")}>
                    价格最高
                </RadioItem>
            </List.Body>
        </List>);
        if(Sort.length>0){
           Popup.hide();

        }else if(Price.length>0){
            Popup.hide();
            Popup.show(content);
        }
        else {

            Popup.show(content);
        }

    },
    handlePrice(){
        let _this=this;
        const slider={
            max:180,
            range:true,
            defaultValue:[PARAMS.Price_Start||0,PARAMS.Price_End||0],
            onChange:function(value){
                let e,s;
                if(!value||!value[1]){
                    return false;
                }
                s=value[0];
                e=value[1];
                _this.setState({
                    ps:s,
                    pe:e
                })
            },
            tipFormatter:(value)=>{if(value==180){return "不限"} return value+"万"},
            marks:{
                0: '0',
                30: '30',
                60: '60',
                90: '90',
                120:'120',
                150:"150",
                180: '不限'
            }
        };
        var Sort=document.getElementsByClassName("FILTER-SORT");
        var Price=document.getElementsByClassName("FILTER-PRICE");
        var content=(<div className="FILTER-PRICE">
            <ul className="lab-list clearfix">
                <li onClick={this.handlePriceChange.bind(this,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==1})} onClick={this.handlePriceChange.bind(null,10,30,1)}>
                    <a href="javascript:void(0)">
                        10-30万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==2})} onClick={this.handlePriceChange.bind(null,30,50,2)}>
                    <a href="javascript:void(0)">
                        30-50万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==3})} onClick={this.handlePriceChange.bind(null,50,80,3)}>
                    <a href="javascript:void(0)">
                        50-80万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==4})} onClick={this.handlePriceChange.bind(null,80,100,4)}>
                    <a href="javascript:void(0)">
                        80-100万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==5})} onClick={this.handlePriceChange.bind(null,100,120,5)}>
                    <a href="javascript:void(0)">
                        100-120万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==6})} onClick={this.handlePriceChange.bind(null,120,150,6)}>
                    <a href="javascript:void(0)">
                        120-150万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==7})} onClick={this.handlePriceChange.bind(null,150,180,7)}>
                    <a href="javascript:void(0)">
                        150-180万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==8})} onClick={this.handlePriceChange.bind(null,180,null,8)}>
                    <a href="javascript:void(0)">
                        180万以上
                    </a>
                </li>
            </ul>
            <div className="t-slider">
                <h4>自定义价格(单位:万)</h4>
                <Slider {...slider} />
                <p>
                    <Button type="primary" inline size="small" onClick={this.handlePriceFreeChange}>确定</Button>
                </p>
            </div>

        </div>);
        if(Price.length>0){
            Popup.hide();
        }else if(Sort.length>0){
            Popup.hide();
            Popup.show(content);
        }
        else {
            Popup.show(content);
        }
    },
    handleSortChange(v,t){
        this.setState({
            sort:v,
            sort_text:t
        });
        Popup.hide();
        PARAMS.Sort=v;
        PARAMS.PageNo=1;
        this.props.getCarList(PARAMS)
    },
    handlePriceChange(s,e,pid){
        Popup.hide();
        if(pid==8){
            PARAMS.Price_Start=s;
            PARAMS.Price_End=null;
            this.setState({
                pid:pid,
                ps:s,
                pe:"以上"
            });
        }else {
            PARAMS.Price_Start=s;
            PARAMS.Price_End=e;
            this.setState({
                pid:pid,
                ps:s,
                pe:e
            });
        }


        PARAMS.PageNo=1;
        pageIndex=1;
        ALL=[];
        this.props.getCarList(PARAMS)
    },
    handlePriceFreeChange(){
        Popup.hide();
        PARAMS.Price_Start=this.state.ps;
        if(this.state.pe==180){
            PARAMS.Price_End=null;
            this.setState({
                pid:100,
                pe:"不限"
            });
        }
        else {
            PARAMS.Price_End=this.state.pe;
            this.setState({
                pid:100
            });
        }
        PARAMS.PageNo=1;
        pageIndex=1;
        ALL=[];
        this.props.getCarList(PARAMS)
    },
    handleBrand(){
        var Sort=document.getElementsByClassName("FILTER-SORT");
        var Price=document.getElementsByClassName("FILTER-PRICE");
        if(Sort.length||Price.length){
            Popup.hide();
        }
        if(this.state.open){
            this.setState({
                list_height:"auto",
                open: !this.state.open
            })
        }else {
            this.setState({
                list_height:window.screen.height-200,
                open: !this.state.open
            })
        }

    },
    handleBrandChange(bid,bname){
        PARAMS.BrandID=bid;
        pageIndex=1;
        PARAMS.PageNo=1;
        ALL=[];
        this.props.getCarList(PARAMS);
        this.setState({
            open: !this.state.open,
            list_height:"auto",
            brand:bname
        })
    },
    handleOther(){
        this.setState({
            list_height:window.screen.height-200,
            open2: !this.state.open2
        })
    },
    handleStyleChange(cid,cname){
        PARAMS.StyleID=cid;
        this.setState({
            cid:cid,
            cname:cname
        })
    },
    handleStatusChange(sid,sname){
        PARAMS.CarFlag=sid;
        this.setState({
            sid:sid,
            sname:sname
        })
    },
    handleCountryChange(cid,cname){
      PARAMS.CountryID=cid;
      this.setState({
          country:cid,
          country_name:cname
      })
    },
    handleAgioChange(e){
        if(e.target.checked){
          PARAMS.AgioCar=1;
          this.setState({
              agio:1
          })
        }else {
            PARAMS.AgioCar=null;
            this.setState({
                agio:null
            })
        }
    },
    handleHotChange(e){
        if(e.target.checked){
            PARAMS.HotCar=1;
            this.setState({
                hot:1
            })
        }else {
            PARAMS.HotCar=null;
            this.setState({
                hot:null
            })
        }
    },
    handleCloseFilter(){
        PARAMS.StyleID=null;
        PARAMS.CarFlag=null;
        PARAMS.CountryID=null;
        PARAMS.AgioCar=null;
        PARAMS.HotCar=null;
        this.setState({
            list_height:"auto",
            open2: !this.state.open2
        })
    },
    handleFilterReset(){
        PARAMS.StyleID=null;
        PARAMS.CarFlag=null;
        PARAMS.CountryID=null;
        PARAMS.AgioCar=null;
        PARAMS.HotCar=null;
        pageIndex=1;
        PARAMS.PageNo=1;
        ALL=[];
        this.props.getCarList(PARAMS);
        this.setState({
            cid:null,
            cname:null,
            sid:null,
            sname:null,
            agio:null,
            hot:null,
            country:null,
            country_name:null
        })
    },
    handleFilterSubmit(){
        pageIndex=1;
        PARAMS.PageNo=1;
        ALL=[];
        this.props.getCarList(PARAMS);
        this.setState({
            list_height:"auto",
            open2: !this.state.open2
        })
    },
    handleFilterRemove(fid){
        PARAMS.PageNo=1;
        pageIndex=1;
        ALL=[];
        switch (fid){
            case "pid":
                 PARAMS.Price_Start=null;
                 PARAMS.Price_End=null;
                 this.setState({
                     pid:null,
                     ps:null,
                     pe:null
                 });
                break;
            case "cname":
                PARAMS.StyleID=null;
                this.setState({
                    cid:null,
                    cname:null
                });
                break;
            case "sname":
                PARAMS.CarFlag=null;
                this.setState({
                    sid:null,
                    sname:null
                });
                break;
            case "agio":
                PARAMS.AgioCar=null;
                this.setState({
                    agio:null
                });
                break;
            case "hot":
                PARAMS.HotCar=null;
                this.setState({
                    hot:null
                });
                break;
            case "country_name":
                PARAMS.CountryID=null;
                this.setState({
                    country:null,
                    country_name:null
                });
                break;
            case "brand":
                PARAMS.BrandID=null;
                this.setState({
                    brand:null
                });
                break;
        }
        this.props.getCarList(PARAMS)

    },
    handleFilterRemoveAll(){
       PARAMS={
           Sort:0,
           PageNo:1
       };
        pageIndex=1;
        this.setState({
            sort:0,
            pid:0,//价格
            ps:null,
            pe:null,
            cid:null,//车型
            cname:null,
            sid:null,//状态
            sname:null,
            agio:null,//特惠
            hot:null,//热门
            country:null,//城市
            country_name:null,
            brand:null,//品牌
            sort_text:"默认排序"
        });
        PARAMS.PageNo=1;
        pageIndex=1;
        ALL=[];
        this.props.getCarList(PARAMS);
    },
    loadingFunction(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(true) {
                    resolve();
                } else {
                    reject();
                }
            }, 500);
        });
    },
    handleVisibleChange(visible) {
        this.setState({
            visible,
        });
    },
    render(){
        const refreshProps={
           loadingFunction:this.loadingFunction,
            distanceToRefresh:40,
            progressViewOffset:10,
            resistance:10,
            hammerOptions:{
                touchAction: 'true',
                recognizers: {
                    pan: {
                        threshold: 10
                    }
                }
            }
        };
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} className="separator"></div>
        );
        const row =((rowData) => {
            let hot=null;
            let agio=null;
            if(rowData.empty){
              return (<div className="subscribe-box">
                        <p className="sube-no">
                            没有相关信息，请重新筛选或搜索
                        </p>
                  <div className="sube-btn">
                      <a className="btn" href="#atobuy">一键帮买</a>
                  </div>
                      </div>)
            }
            if(rowData.HotCar){
               hot=<i className="status-icon hot">&nbsp;</i>
            }
            if(rowData.AgioCar){
                agio=<i className="status-icon agio">&nbsp;</i>
            }
            return (
                <div>
                    <div className="buy-list">
                        <a href={"#item/"+rowData.CarNo+"/"}>
                            <h3 className="title">{rowData.FullName}{hot}{agio}</h3>
                            <div className="describe">
                                <div className="pic">
                                    <img src={rowData.CoverImgURL} />
                                </div>
                                <div className="text">
                                    <Flex wrap="nowrap">
                                        <Flex.Item>
                                            最低价：<span className="price">{rowData.Price}</span><small>万</small>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex wrap="nowrap">
                                        <Flex.Item>
                                            市价：<span className="market-price">{rowData.PriceMarket}</span><small>万</small>
                                        </Flex.Item>
                                        <Flex.Item>
                                            立省：<span className="save-price">{rowData.PriceAgioMax}</span><small>万</small>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex>
                                        <Flex.Item>
                                            外观：<span className={"out-color color-"+rowData.ColorOutID}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        </Flex.Item>
                                        <Flex.Item>
                                            内饰：<span className={"int-color color-"+rowData.ColorInID}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex>
                                        <Flex.Item>
                                            产地：{rowData.Country}
                                        </Flex.Item>
                                    </Flex>
                                    <Flex>
                                        <Flex.Item>
                                            状态：{rowData.Status}
                                        </Flex.Item>
                                    </Flex>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

            );
        });
        const drawerProps = {
                open: this.state.open,
                position: "right",
                onOpenChange: this.handleBrand,
                dragToggleDistance: 50,
                touch: false,
                contentStyle:{},
                sidebarStyle:{zIndex:105,top:"43px",width:"80%"},
                overlayStyle:{top:"43px"}
            };
        const drawerProps2 = {
            open: this.state.open2,
            position: "top",
            onOpenChange: this.handleOther,
            dragHandleStyle:{"display":"none"},
            dragToggleDistance:50,
            touch:false
        };
        const sidebar = (<div>
            <List>
                <List.Body>
                    <List.Item key={1} onClick={this.handleBrandChange.bind(null,null,null)}>
                        不限
                    </List.Item>
                    {
                        StaticBrand.map((brand)=>{
                            var thumb='./car/'+brand.value+".png";
                            return  <List.Item key={brand.value} thumb={require(thumb)} onClick={this.handleBrandChange.bind(null,brand.value,brand.label)}>{brand.label}</List.Item>
                        })
                    }
                </List.Body>
            </List>
        </div>);
        const sidebar2=(<div className="FILTER-OTHER">
            <NavBar style={{"backgroundColor":"#f5f5f5"}} mode="light" iconName="cross" onLeftClick={this.handleCloseFilter}  rightContent={<span onClick={this.handleFilterReset}>重置</span>}>筛选</NavBar>
            <h4>车型</h4>
            <ul className="lab-list clearfix t-filter-cartype">
                <li className={classNames({"active":this.state.cid==null})}  onClick={this.handleStyleChange.bind(null,null,null)}>
                    <section>
                        <img src={require('./shaixuan_mg_buxian.png')} alt=""/>
                        <p>
                            不限
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.cid==1})} onClick={this.handleStyleChange.bind(null,1,"轿车")}>
                    <section>
                        <img src={require('./shaixuan_mg_zhongxingche.png')} alt=""/>
                        <p>
                            轿车
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.cid==2})} onClick={this.handleStyleChange.bind(null,2,"SUV")}>
                    <section>
                        <img src={require('./shaixuan_mg_suv.png')} alt=""/>
                        <p>
                            SUV
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.cid==3})} onClick={this.handleStyleChange.bind(null,3,"MPV")}>
                    <section>
                        <img src={require('./shaixuan_mg_mpv.png')} alt=""/>
                        <p>
                            MPV
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.cid==4})} onClick={this.handleStyleChange.bind(null,4,"跑车")}>
                    <section>
                        <img src={require('./shaixuan_mg_paoche.png')} alt=""/>
                        <p>
                            跑车
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.cid==5})} onClick={this.handleStyleChange.bind(null,5,"其他车型")}>
                    <section>
                        <img src={require('./shaixuan_mg_mianbaoche.png')} alt=""/>
                        <p>
                            其他
                        </p>
                    </section>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>状态</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.sid==null})} onClick={this.handleStatusChange.bind(this,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.sid==1})} onClick={this.handleStatusChange.bind(this,1,"现车")}>
                    <a href="javascript:void(0)">
                        现车
                    </a>
                </li>
                <li className={classNames({"active":this.state.sid==2})} onClick={this.handleStatusChange.bind(this,2,"已到港")}>
                    <a href="javascript:void(0)">
                        已到港
                    </a>
                </li>
                <li className={classNames({"active":this.state.sid==3})} onClick={this.handleStatusChange.bind(this,3,"报关中")}>
                    <a href="javascript:void(0)">
                        报关中
                    </a>
                </li>
                <li className={classNames({"active":this.state.sid==4})} onClick={this.handleStatusChange.bind(this,4,"期货")}>
                    <a href="javascript:void(0)">
                        期货
                    </a>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>产地</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.country==null})} onClick={this.handleCountryChange.bind(null,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==1})} onClick={this.handleCountryChange.bind(null,1,"美规版")}>
                    <a href="javascript:void(0)">
                        美规版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==2})} onClick={this.handleCountryChange.bind(null,2,"欧规版")}>
                    <a href="javascript:void(0)">
                        欧规版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==3})} onClick={this.handleCountryChange.bind(null,3,"加规版")}>
                    <a href="javascript:void(0)">
                        加规版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==4})} onClick={this.handleCountryChange.bind(null,4,"中东版")}>
                    <a href="javascript:void(0)">
                        中东版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==5})} onClick={this.handleCountryChange.bind(null,5,"俄规版")}>
                    <a href="javascript:void(0)">
                        俄规版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==6})} onClick={this.handleCountryChange.bind(null,6,"墨西哥版")}>
                    <a href="javascript:void(0)">
                        墨西哥版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==7})} onClick={this.handleCountryChange.bind(null,7,"科威特版")}>
                    <a href="javascript:void(0)">
                        科威特版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==8})} onClick={this.handleCountryChange.bind(null,8,"阿曼版")}>
                    <a href="javascript:void(0)">
                        阿曼版
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==9})} onClick={this.handleCountryChange.bind(null,9,"其他产地")}>
                    <a href="javascript:void(0)">
                        其他
                    </a>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>特惠/热门</h4>
            <List>
                <List.Body>
                    <CheckboxItem onChange={this.handleAgioChange} checked={this.state.agio==1}>
                        特惠车型 <i className="status-icon agio">&nbsp;</i>
                    </CheckboxItem>
                    <CheckboxItem onChange={this.handleHotChange} checked={this.state.hot==1}>
                        热门车型 <i className="status-icon hot">&nbsp;</i>
                    </CheckboxItem>
                </List.Body>
            </List>
            <div className="separator"></div>
            <div className="t-filter-btn">
                <Button type="primary" onClick={this.handleFilterSubmit}>确定</Button>
            </div>
        </div>);
        let result_container=null;
        let result=[];
        for(let key in this.state){
            if(this.state.hasOwnProperty(key)){
                let value=this.state[key];
                if((key=="brand"||key=="sname"||key=="cname"||key=="country_name")&&value){
                    result.push(
                        <li key={key} onClick={this.handleFilterRemove.bind(null,key)}>{value}
                            <i className="icon-close" >&times;</i>
                        </li>
                    )
                }
                if(key=="pid"&&value>0){
                    result.push(
                        <li key={key} onClick={this.handleFilterRemove.bind(null,"pid")}>{ this.state.ps+"-"+ this.state.pe}
                            <i className="icon-close">&times;</i>
                        </li>
                    )
                }
                if(key=="agio"&&value){
                    result.push(
                        <li key={key} onClick={this.handleFilterRemove.bind(null,"agio")}>特惠
                            <i className="icon-close">&times;</i>
                        </li>
                    )
                }
                if(key=="hot"&&value){
                    result.push(
                        <li key={key} onClick={this.handleFilterRemove.bind(null,"hot")}>热门
                            <i className="icon-close">&times;</i>
                        </li>
                    )
                }
                if(result.length>0){
                    result_container= (<div className="filter-result">
                        <ul>
                            {result}
                        </ul>
                        <div className="btn-reset-container" onClick={this.handleFilterRemoveAll}>
                            <button className="btn-reset" type="button" >重置</button>
                        </div>
                    </div>)
                }
            }
        }
        const menu=<Popover
            visible={this.state.visible}
            placement="topLeft"
            overlay={[
            <Popover.Item key="2">
                <Link to="/home">网站首页</Link>
            </Popover.Item>,
            <Popover.Item key="3">
                <Link to="/auto">新车直销</Link>
            </Popover.Item>,
            <Popover.Item key="1">
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
                    <div className="drawer-container">
                        <Drawer sidebar={sidebar}{...drawerProps} className="spe-drawer">
                            <Drawer sidebar={sidebar2}{...drawerProps2} className="spe-drawer">
                                <div style={{height:window.screen.height}}>
                                    <NavBar mode="light" iconName="left" leftContent={<a  style={{"color":"#4c4c4c"}} href="#home">首页</a>} rightContent={menu}>平行进口</NavBar>
                                    <div  className="t-list">
                                        <div className="separator"></div>
                                        <Flex className="t-filter-bar" justify="center" align="center">
                                            <Flex.Item onClick={this.handleSort}>
                                                {this.state.sort_text} <Icon type="down" />
                                            </Flex.Item>
                                            <Flex.Item onClick={this.handleBrand}>
                                                品牌 <Icon type="down" />
                                            </Flex.Item>
                                            <Flex.Item onClick={this.handlePrice}>
                                                价格 <Icon type="down" />
                                            </Flex.Item>
                                            <Flex.Item onClick={this.handleOther}>
                                                筛选 <Icon type="down" />
                                            </Flex.Item>
                                        </Flex>
                                    </div>
                                    {result_container}
                                    <ListView
                                        dataSource={this.state.dataSource}
                                        renderFooter={() =>  <div style={{ "display": "flex", textAlign: 'center',justifyContent:"center" }}>
                                                {this.state.loading? <ActivityIndicator  text="加载中..."/> : <span onClick={this.onEndReached}>{this.state.refresh}</span>}
                                            </div>}
                                        renderRow={row}
                                        pageSize={20}
                                        scrollRenderAheadDistance={10}
                                        scrollEventThrottle={20}
                                        useBodyScroll
                                        onEndReachedThreshold={10}
                                        onEndReached={this.onEndReached}
                                        stickyProps={{
                              // topOffset: -43,
                               isActive: false // 关闭 sticky 效果
                            }}

                                    />
                                    <BackTop/>
                                </div>

                            </Drawer>
                        </Drawer>
                    </div>

                </div>
                )
    }
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Buy)
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,SearchBar,Button,WingBlank,WhiteSpace,Flex,Popup,Drawer,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Popover,Pagination} from 'antd-mobile';
import BackTop from 'antd/lib/back-top'
import classNames from 'classnames'
import  {getCarList} from '../../actions/second'
import  {getCityList} from '../../actions/home'
import  {COLOR} from '../../utils/constant'
import {Storage} from '../../utils/index'
import  {ChineseDistricts} from '../../utils/constant'
import '../Buy/index.less'
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const contextTypes = {
    router: PropTypes.object.isRequired
};
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
let PARAMS={
    PageNo:1
};
let Buy=React.createClass({
    getInitialState() {
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.data=[];
        return {
            dataSource: dataSource.cloneWithRows([]),
            data:[],
            city_items:[],
            loading: false,
            pageTotal:0,
            refresh:"加载更多",
            sort:0,
            text:this.props.location.state&&this.props.location.state.text,
            brand:null,
            brand_name:this.props.location.state&&this.props.location.state.label,
            price:null,//价格,
            price_name:null,
            price_start:null,
            price_end:null,
            style:null,//车型
            style_name:null,
            color:null,
            color_name:null,
            opv:null,
            opv_name:null,
            discs:null,
            discs_name:null,
            country:null,
            country_name:null,
            gearbox:null,
            gearbox_name:null,
            agio:null,
            hot:null,
            mileage:null,
            mileage_name:null,
            sort_text:"默认排序",
            open: false,
            open2:false,
            visible:false,
            city:Storage.getStorage("LOCALTION")||{}
        };
    },
    componentDidMount(){
        let City=Storage.getStorage("LOCALTION")||{};
        PARAMS.Brand=this.props.location.state&&this.props.location.state.brand;
        PARAMS.Series=this.props.location.state&&this.props.location.state.series;
        this.props.getCarList({
            PageNo:1,
            Brand:this.props.location.state&&this.props.location.state.brand,
            Series:this.props.location.state&&this.props.location.state.series,
            CityID:City.CityID
        });
        this.props.getCityList();
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
    componentWillReceiveProps(nextProps){
        if(nextProps.items&&nextProps.items!=this.props.items){
            if(nextProps.items.count>0){
                this.data=this.data.concat(nextProps.items.data[0].value);
            }
            if(this.data.length==0){
                this.data=[{
                    empty:true
                }];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.data),
                    pageTotal:0,
                    refresh:""
                });
            }else {
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.data),
                    pageTotal:Math.ceil(nextProps.items.count/NUM_SECTIONS),
                    refresh:Math.ceil(nextProps.items.count/NUM_SECTIONS)>1?"加载更多":"加载完毕"
                });
            }

        }
        if(nextProps.city_items&&nextProps.city_items!=this.props.city_items){
           this.setState({
               city_items:nextProps.city_items
           })
        }
        this.setState({
            loading:nextProps.loading
        });
    },
    onEndReached(event) {
        if(pageIndex<this.state.pageTotal){
            pageIndex++;
            this.setState({loading:true});
            PARAMS.PageNo=pageIndex;
            setTimeout(()=>{
                this.props.getCarList(PARAMS);
            },1500)

        }else{
            this.setState({
                refresh:"已全部加载"
            })
        }
    },
    handleSort(){
        var Sort=document.getElementsByClassName("FILTER-SORT");
        var Price=document.getElementsByClassName("FILTER-PRICE");
        var content=(<List className="FILTER-SORT">
            <List.Body>
                <RadioItem checked={this.state.sort===0} onChange={this.handleSortChange.bind(null,0,"默认排序")} >
                    默认排序
                </RadioItem>
                <RadioItem checked={this.state.sort===1}  onChange={this.handleSortChange.bind(null,1,"价格最低")} >
                    价格最低
                </RadioItem>
                <RadioItem checked={this.state.sort===-1}  onChange={this.handleSortChange.bind(null,-1,"价格最高")}>
                    价格最高
                </RadioItem>
                <RadioItem checked={this.state.sort===2} onChange={this.handleSortChange.bind(null,2,"车龄最少")} >
                    车龄最少
                </RadioItem>
                <RadioItem checked={this.state.sort===3} onChange={this.handleSortChange.bind(null,3,"里程最少")} >
                    里程最少
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
        var Sort=document.getElementsByClassName("FILTER-SORT");
        var Price=document.getElementsByClassName("FILTER-PRICE");
        const slider={
            max:60,
            range:true,
            defaultValue:[this.state.price_start||0,this.state.price_end||0],
            onChange:(value)=>{
                if(value&&value[1]){
                    this.setState({
                        price_start:value[0],
                        price_end:value[1],
                        price_name:null,
                        price:null
                    })
                }
            },
            tipFormatter:(value)=>{if(value==60){return "不限"} return value},
            marks:{
                0: '0',
                10: '10',
                20: '20',
                30: '30',
                40: '40',
                50: '50',
                60: '不限'
            }
        };
        var content=(<div className="FILTER-PRICE">
            <ul className="lab-list clearfix">
                <li onClick={this.handlePriceChange.bind(this,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==1})} onClick={this.handlePriceChange.bind(null,1,'5万以内')}>
                    <a href="javascript:void(0)">
                        5万以内
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==1})} onClick={this.handlePriceChange.bind(null,2,'5-10万')}>
                    <a href="javascript:void(0)">
                        5-10万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==2})} onClick={this.handlePriceChange.bind(null,3,'10-15万')}>
                    <a href="javascript:void(0)">
                        10-15万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==3})} onClick={this.handlePriceChange.bind(null,4,'15-20万')}>
                    <a href="javascript:void(0)">
                        15-20万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==4})} onClick={this.handlePriceChange.bind(null,5,'20-30万')}>
                    <a href="javascript:void(0)">
                        20-30万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==5})} onClick={this.handlePriceChange.bind(null,6,' 30-40万')}>
                    <a href="javascript:void(0)">
                        30-40万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==6})} onClick={this.handlePriceChange.bind(null,7,'40-50万')}>
                    <a href="javascript:void(0)">
                        40-50万
                    </a>
                </li>
                <li className={classNames({"active":this.state.pid==7})} onClick={this.handlePriceChange.bind(null,8,'50万以上')}>
                    <a href="javascript:void(0)">
                        50万以上
                    </a>
                </li>
            </ul>
            <div className="t-slider">
                <h4>自定义价格(单位:万)</h4>
                <Slider {...slider}/>
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
        this.data=[];
        this.setState({
            sort:v,
            sort_text:t
        });
        Popup.hide();
        PARAMS.Sort=v;
        PARAMS.PageNo=1;
        pageIndex=1;
        this.props.getCarList(PARAMS)
    },
    handlePriceChange(pid,pname){
        this.data=[];
        Popup.hide();
        this.setState({
            price:pid,
            price_name:pname
        });
        pageIndex=1;
        PARAMS.PageNo=1;
        pageIndex=1;
        PARAMS.PriceID=pid;
        this.props.getCarList(PARAMS)
    },
    handlePriceFreeChange(){
        this.data=[];
        Popup.hide();
        PARAMS.Price_Start=this.state.price_start;
        PARAMS.Price_End=this.state.price_end;
        if(this.state.price_end==60){
            PARAMS.Price_End=null;
        }
        PARAMS.PageNo=1;
        pageIndex=1;
        this.props.getCarList(PARAMS)
    },
    handleBrand(){
        this.context.router.replace("/second-brand");
    },
    handleOther(){
        var Sort=document.getElementsByClassName("FILTER-SORT");
        var Price=document.getElementsByClassName("FILTER-PRICE");
        if(Sort.length||Price.length){
            Popup.hide();
        }
        this.setState({
            open2: !this.state.open2
        })
    },
    handleStyleChange(cid,cname){
        this.setState({
            style:cid,
            style_name:cname
        })
    },
    handleColorChange(cid,cname){

        this.setState({
            color:cid,
            color_name:cname
        })
    },
    handleMileageChange(cid,cname){
        this.setState({
            mileage:cid,
            mileage_name:cname
        })
    },
    handleCountryChange(cid,cname){
        this.setState({
            country:cid,
            country_name:cname
        })
    },
    handleOptVolChange(cid,cname){
        this.setState({
            opv:cid,
            opv_name:cname
        })
    },
    handleDisStdChange(cid,cname){
        this.setState({
            discs:cid,
            discs_name:cname
        })
    },
    handleGearBoxChange(cid,cname){
        this.setState({
            gearbox:cid,
            gearbox_name:cname
        })
    },
    handleAgioChange(e){
        if(e.target.checked){
            this.setState({
                agio:1
            })
        }else {
            this.setState({
                agio:1
            })
        }
    },
    handleHotChange(e){
        if(e.target.checked){
            this.setState({
                hot:1
            })
        }else {
            this.setState({
                hot:0
            })
        }
    },
    handleCloseFilter(){
        this.setState({
            open2: !this.state.open2
        })
    },
    handleFilterReset(){
        this.setState({
            style:null,
            style_name:null,
            color:null,
            color_name:null,
            opv:null,
            opv_name:null,
            discs:null,
            discs_name:null,
            country:null,
            country_name:null,
            gearbox:null,
            gearbox_name:null,
            agio:null,
            hot:null,
            mileage:null,
            mileage_name:null
        })
    },
    handleFilterSubmit(){
        this.data=[];
        pageIndex=1;
        PARAMS.PageNo=1;
        Object.keys(this.state).map((key)=>{
            let value=this.state[key];
            if(value){
                switch (key){
                    case "style":
                        PARAMS.Style=value;
                        break;
                    case "color":
                        PARAMS.Color=value;
                        break;
                    case "opv":
                        PARAMS.OutputVolume=value;
                        break;
                    case "discs":
                        PARAMS.DischargeStandard=value;
                        break;
                    case "country":
                        PARAMS.Country=value;
                        break;
                    case "gearbox":
                        PARAMS.GearBox=value;
                        break;
                    case "agio":
                        PARAMS.QuasiNewCar=value;
                        break;
                    case "hot":
                        PARAMS.IsUrgent=value;
                        break;
                    case "mileage":
                        PARAMS.MileageID=value;
                        break;
                }
            }
        })

        this.props.getCarList(PARAMS);
        this.setState({
            open2: !this.state.open2
        })
    },
    handleFilterRemove(fid){
        PARAMS.PageNo=1;
        pageIndex=1;
        this.data=[];
        switch (fid){
            case "brand_name":
            case "series":
                PARAMS.Brand=null;
                PARAMS.Series=null;
                this.setState({
                    brand_name:null,
                    brand:null,
                    series:null
                });
                this.context.router.replace("/second");
                break;
            case "price_name":
                PARAMS.PriceID=null;
                this.setState({
                    price_name:null,
                    price:null
                });
                break;
            case "style_name":
                PARAMS.Style=null;
                this.setState({
                    style_name:null,
                    style:null
                });
                break;
            case "color_name":
                PARAMS.Color=null;
                this.setState({
                    color:null,
                    color_name:null
                });
                break;
            case "opv_name":
                PARAMS.OutputVolume=null;
                this.setState({
                    opv_name:null,
                    opv:null
                });
                break;
            case "discs_name":
                PARAMS.DischargeStandard=null;
                this.setState({
                    discs_name:null,
                    discs:null
                });
                break;
            case "country_name":
                PARAMS.Country=null;
                this.setState({
                    country_name:null,
                    country:null
                });
                break;
            case "gearbox_name":
                PARAMS.GearBox=null;
                this.setState({
                    gearbox_name:null,
                    gearbox:null
                });
                break;
            case "mileage_name":
                PARAMS.MileageID=null;
                this.setState({
                    mileage_name:null,
                    mileage:null
                });
                break;
            case "agio":
                PARAMS.QuasiNewCar=null;
                this.setState({
                    agio:null
                });
                break;
            case "hot":
                PARAMS.IsUrgent=null;
                this.setState({
                    hot:null
                });
                break;
            case "price_end":
                PARAMS.Price_Start=null;
                PARAMS.Price_End=null;
                this.setState({
                    price_end:null,
                    price_start:null
                });
                break;
        }
        this.props.getCarList(PARAMS);
    },
    handleFilterRemoveAll(){
        PARAMS={
            Sort:null,
            PageNo:1
        };
        pageIndex=1;
        this.setState({
            sort:0,
            series:null,
            price:null,//价格,
            price_name:null,
            price_start:null,
            price_end:null,
            style:null,//车型
            style_name:null,
            color:null,
            color_name:null,
            opv:null,
            opv_name:null,
            discs:null,
            discs_name:null,
            country:null,
            country_name:null,
            gearbox:null,
            gearbox_name:null,
            agio:null,
            hot:null,
            sort_text:"默认排序",
            brand_name:null,
            brand:null,
            current:"定位中..."
        });

        PARAMS.PageNo=1;
        pageIndex=1;
        this.data=[];
        this.context.router.replace("/second");
        this.props.getCarList(PARAMS);

    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    handleCityChange(city){
        if(city){
            this.data=[];
            PARAMS.CityID=city.CityID;
            this.props.getCarList(PARAMS);
        }
        this.setState({
            open: !this.state.open,
            city:city
        })
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
    render(){
        const drawerProps = {
            open: this.state.open2,
            position: "top",
            onOpenChange: this.handleOther,
            dragHandleStyle:{"display":"none"},
            dragToggleDistance:50,
            touch:false
        };
        const sidebar=(<div className="FILTER-OTHER">
            <NavBar style={{"backgroundColor":"#f5f5f5"}} mode="light" iconName="cross" onLeftClick={this.handleCloseFilter}  rightContent={<span onClick={this.handleFilterReset}>重置</span>}>筛选</NavBar>
            <h4>车型</h4>
            <ul className="lab-list clearfix t-filter-cartype">
                <li className={classNames({"active":this.state.style==null})}  onClick={this.handleStyleChange.bind(null,null,null)}>
                    <section>
                        <img src={require('./shaixuan_mg_buxian.png')} alt=""/>
                        <p>
                            不限
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.style==1})} onClick={this.handleStyleChange.bind(null,1,"轿车")}>
                    <section>
                        <img src={require('./shaixuan_mg_zhongxingche.png')} alt=""/>
                        <p>
                            轿车
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.style==2})} onClick={this.handleStyleChange.bind(null,2,"SUV")}>
                    <section>
                        <img src={require('./shaixuan_mg_suv.png')} alt=""/>
                        <p>
                            SUV
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.style==3})} onClick={this.handleStyleChange.bind(null,3,"MPV")}>
                    <section>
                        <img src={require('./shaixuan_mg_mpv.png')} alt=""/>
                        <p>
                            MPV
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.style==4})} onClick={this.handleStyleChange.bind(null,4,"跑车")}>
                    <section>
                        <img src={require('./shaixuan_mg_paoche.png')} alt=""/>
                        <p>
                            跑车
                        </p>
                    </section>
                </li>
                <li className={classNames({"active":this.state.style==5})} onClick={this.handleStyleChange.bind(null,5,"其他车型")}>
                    <section>
                        <img src={require('./shaixuan_mg_mianbaoche.png')} alt=""/>
                        <p>
                            其他
                        </p>
                    </section>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>颜色</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.color==null})} onClick={this.handleColorChange.bind(this,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                {
                    COLOR.map((color)=>{
                        return (
                            <li className={classNames({"active":this.state.color==color.value})} onClick={this.handleColorChange.bind(null,color.value,color.label)} key={color.value+`@$`}>
                                <a href="javascript:void(0)">
                                    {
                                        color.label
                                    }
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="separator"></div>
            <h4>行驶里程</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.mileage==null})} onClick={this.handleMileageChange.bind(null,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.mileage==1})} onClick={this.handleMileageChange.bind(null,1,"1万公里以内")}>
                    <a href="javascript:void(0)">
                        1万公里以内
                    </a>
                </li>
                <li className={classNames({"active":this.state.mileage==2})} onClick={this.handleMileageChange.bind(null,2,"3万公里以内")}>
                    <a href="javascript:void(0)">
                        3万公里以内
                    </a>
                </li>
                <li className={classNames({"active":this.state.mileage==3})} onClick={this.handleMileageChange.bind(null,3,"5万公里以内")}>
                    <a href="javascript:void(0)">
                        5万公里以内
                    </a>
                </li>
                <li className={classNames({"active":this.state.mileage==4})} onClick={this.handleMileageChange.bind(null,4,"5万公里以上")}>
                    <a href="javascript:void(0)">
                        5万公里以上
                    </a>
                </li>
            </ul>
            <h4>排量</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.opv==null})} onClick={this.handleOptVolChange.bind(null,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.opv==1})} onClick={this.handleOptVolChange.bind(null,1,"1.0L以下")}>
                    <a href="javascript:void(0)">
                        1.0L以下
                    </a>
                </li>
                <li className={classNames({"active":this.state.opv==2})} onClick={this.handleOptVolChange.bind(null,2,"1.0-1.6L")}>
                    <a href="javascript:void(0)">
                        1.0-1.6L
                    </a>
                </li>
                <li className={classNames({"active":this.state.opv==3})} onClick={this.handleOptVolChange.bind(null,3,"1.6-2.0L")}>
                    <a href="javascript:void(0)">
                        1.6-2.0L
                    </a>
                </li>
                <li className={classNames({"active":this.state.opv==4})} onClick={this.handleOptVolChange.bind(null,4,"2.0-3.0L")}>
                    <a href="javascript:void(0)">
                        2.0-3.0L
                    </a>
                </li>
                <li className={classNames({"active":this.state.opv==5})} onClick={this.handleOptVolChange.bind(null,5,"3.0L以上")}>
                    <a href="javascript:void(0)">
                        3.0L以上
                    </a>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>排放标准</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.discs==null})} onClick={this.handleDisStdChange.bind(null,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.discs==1})} onClick={this.handleDisStdChange.bind(null,1,"国二及以上")}>
                    <a href="javascript:void(0)">
                        国二及以上
                    </a>
                </li>
                <li className={classNames({"active":this.state.discs==2})} onClick={this.handleDisStdChange.bind(null,2,"国三及以上")}>
                    <a href="javascript:void(0)">
                        国三及以上
                    </a>
                </li>
                <li className={classNames({"active":this.state.discs==3})} onClick={this.handleDisStdChange.bind(null,3,"国四及以上")}>
                    <a href="javascript:void(0)">
                        国四及以上
                    </a>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>国别</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.country==null})} onClick={this.handleCountryChange.bind(null,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==1})} onClick={this.handleCountryChange.bind(null,1,"德系")}>
                    <a href="javascript:void(0)">
                        德系
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==2})} onClick={this.handleCountryChange.bind(null,2,"日系")}>
                    <a href="javascript:void(0)">
                        日系
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==3})} onClick={this.handleCountryChange.bind(null,3,"美系")}>
                    <a href="javascript:void(0)">
                        美系
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==4})} onClick={this.handleCountryChange.bind(null,4,"法系")}>
                    <a href="javascript:void(0)">
                        法系
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==5})} onClick={this.handleCountryChange.bind(null,5,"韩系")}>
                    <a href="javascript:void(0)">
                        韩系
                    </a>
                </li>
                <li className={classNames({"active":this.state.country==6})} onClick={this.handleCountryChange.bind(null,6,"自主")}>
                    <a href="javascript:void(0)">
                        自主
                    </a>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>变速箱</h4>
            <ul className="lab-list clearfix">
                <li className={classNames({"active":this.state.gearbox==null})} onClick={this.handleGearBoxChange.bind(null,null,null)}>
                    <a href="javascript:void(0)">
                        不限
                    </a>
                </li>
                <li className={classNames({"active":this.state.gearbox==1})} onClick={this.handleGearBoxChange.bind(null,1,"手动")}>
                    <a href="javascript:void(0)">
                        手动
                    </a>
                </li>
                <li className={classNames({"active":this.state.gearbox==2})} onClick={this.handleGearBoxChange.bind(null,2,"自动")}>
                    <a href="javascript:void(0)">
                        自动
                    </a>
                </li>
            </ul>
            <div className="separator"></div>
            <h4>特惠/热门</h4>
            <List>
                <List.Body>
                    <CheckboxItem onChange={this.handleAgioChange} checked={this.state.agio==1}>
                        准新车
                    </CheckboxItem>
                    <CheckboxItem onChange={this.handleHotChange} checked={this.state.hot==1}>
                        降价急售
                    </CheckboxItem>
                </List.Body>
            </List>
            <div className="separator"></div>
            <div className="t-filter-btn">
                <Button type="primary" onClick={this.handleFilterSubmit}>确定</Button>
            </div>
        </div>);
        const drawerProps2 = {
            open: this.state.open,
            position: "left",
            onOpenChange: this.handleCityChange,
            sidebarStyle:{width:"80%"},
            dragToggleDistance:50,
            touch:false
        };
        const sidebar2 = (<div>
            <List>
                <List.Header>定位</List.Header>
                <List.Body>
                    <List.Item key={1} onClick={this.handleGetLocation}>
                        <Icon type="environment-o" /> {this.state.current}
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
        const menu=<Popover
            visible={this.state.visible}
            placement="topLeft"
            overlay={[
            <Popover.Item key="1">
                <Link to="/home">网站首页</Link>
            </Popover.Item>,
             <Popover.Item key="3">
                <Link to="/auto">新车直销</Link>
            </Popover.Item>,
            <Popover.Item key="2">
                <Link to="/buy">平行进口</Link>
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
        let children=[];
        Object.keys(this.state).map((key)=>{
            let value=this.state[key];
            if(value){
                switch (key){
                    case "price_name":
                    case "style_name":
                    case "color_name":
                    case "opv_name":
                    case "discs_name":
                    case "country_name":
                    case "gearbox_name":
                    case "brand_name":
                    case "series":
                    case "mileage_name":
                        children.push (
                            <li onClick={this.handleFilterRemove.bind(null,key)} key={key}>{value}
                                <i className="icon-close" >&times;</i>
                            </li>);
                        break;
                    case "agio":
                        children.push (
                            <li onClick={this.handleFilterRemove.bind(null,key)} key={key}>准新车
                                <i className="icon-close" >&times;</i>
                            </li>);
                        break;
                    case "hot":
                        children.push (
                            <li  onClick={this.handleFilterRemove.bind(null,key)} key={key}>降价急售
                                <i className="icon-close" >&times;</i>
                            </li>);
                        break;
                    case "price_end":
                        if(value==60){
                            children.push (
                                <li onClick={this.handleFilterRemove.bind(null,key)} key={key}>{this.state["price_start"]}-不限
                                    <i className="icon-close" >&times;</i>
                                </li>);
                        }else {
                            children.push(
                                <li  onClick={this.handleFilterRemove.bind(null,key)} key={key}>{this.state["price_start"]}-{value}万
                                    <i className="icon-close" >&times;</i>
                                </li>);
                        }
                        break;
                }
            }
        });
        let row=(rowData,sectionID, rowID)=>{
            let urgent=null;
            let newcar=null;
            if(rowData.empty){
                return (<div className="subscribe-box" key={1}>
                    <p className="sube-no">
                        没有相关信息，请重新筛选或搜索
                    </p>
                    <div className="sube-btn">
                        <a className="btn" href="#atobuy">一键帮买</a>
                    </div>
                </div>)
            }
            let price= <span><span className="price">{rowData.Price/10000}</span><small>万</small></span>;
            if(rowData.CarFlag==1){
                price= <span className="price">交易中...</span>
            }
            return (
                <div key={rowData.SeriesNO+`$$$`}>
                    <div className="buy-list" >
                        <Link to={"/series/"+rowData.SeriesNO+"/"}>
                            <h3 className="title">{rowData.SpecName}</h3>
                            <div className="describe">
                                <div className="pic">
                                    <img src={rowData.HomePicID} />
                                </div>
                                <div className="text">
                                    <Flex wrap="nowrap">
                                        <Flex.Item>
                                            {price}
                                        </Flex.Item>
                                    </Flex>
                                    <Flex>
                                            {rowData.Buyyear}上牌
                                    </Flex>
                                    <Flex>
                                            行驶{rowData.Mileage}万公里
                                    </Flex>
                                    <Flex>
                                            {rowData.CityName}
                                    </Flex>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            );
        };
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} className="separator"></div>
        );
        return (
            <div>
                <div className="drawer-container">
                    <Drawer sidebar={sidebar}{...drawerProps} className="spe-drawer">
                        <Drawer sidebar={sidebar2}{...drawerProps2} className="spe-drawer">
                            <div style={{"minHeight":window.screen.height}}>
                                <NavBar mode="light" iconName="environment-o" leftContent={this.state.city.CityName} rightContent={menu} onLeftClick={this.handleCityChange}>精品二手</NavBar>
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
                                {children[0]&&(<div className="filter-result">
                                    <ul>
                                        {
                                            children
                                        }
                                    </ul>
                                    <div className="btn-reset-container" onClick={this.handleFilterRemoveAll}>
                                        <button className="btn-reset" type="button" >重置</button>
                                    </div>
                                </div>)}
                                <ListView
                                    dataSource={this.state.dataSource}
                                    renderFooter={() =>  <div style={{ "display": "flex", textAlign: 'center',justifyContent:"center" }}>
                                                {this.state.loading? <ActivityIndicator  text="加载中..."/> : <span onClick={this.onEndReached}>{this.state.refresh}
                                           </span>}
                                            </div>}
                                    renderRow={row}
                                    pageSize={20}
                                    scrollRenderAheadDistance={10}
                                    scrollEventThrottle={20}
                                    useBodyScroll
                                    onEndReachedThreshold={10}
                                    onEndReached={this.onEndReached}
                                    renderSeparator={separator}
                                    stickyProps={{

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
Buy.contextTypes = contextTypes;
function mapStateToProps(state) {
    return {
        items: state.second.items,
        message:state.second.message,
        result:state.second.result,
        loading:state.second.loading,
        city_items:state.home.items
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCarList:bindActionCreators(getCarList,dispatch),
        getCityList:bindActionCreators(getCityList,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buy)
import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,RefreshControl,ListView,Tooltip,Radio,Slider,Checkbox,Carousel,Steps,Modal,InputItem,Picker,Drawer,Popover} from 'antd-mobile';
import { createForm } from 'rc-form';
import {PhotoSwipe,PhotoSwipeGallery} from 'react-photoswipe';
import {getItem,submitOrder} from '../../actions/item'
import district from '../../utils/district'
import  {ChineseDistricts} from '../../utils/constant'
import './index.less'
const defaultProps = {
    item: {},
    message:null,
    result:null,
    loading:true
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Item=React.createClass({
    getInitialState() {
        return {
            item: {},
            Price:null,
            OfferID:null,
            PriceAgioMax:null,
            pic_list:[],
            loading: true,
            title:"平行进口",
            visible:false,
            open:false,
            province:null,
            city:null,
            loaderText:"加载中...",
            isSubmit:false,
            current_pic:1,
            items:[],
            isOpen:false
        };
    },
    componentDidMount(){
        this.props.getItem({CarNo:this.props.routeParams.CarNo});
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.item){
            this.setState({
                item:nextProps.item,
                Price:nextProps.item.Price,
                PriceAgioMax:nextProps.item.PriceAgioMax,
                title:nextProps.item.FullName,
                pic_list:[{
                    SerialNO: 0,
                    PicAddr: nextProps.item.CoverImgURL

                }].concat(nextProps.item.CarPics)
            });
        }
        setTimeout(()=>{
            this.setState({
                loading:nextProps.loading
            });
        },1000);
        setTimeout(()=>{
            if(nextProps.message){
                Toast.fail("车辆信息不存在", ()=>{
                    this.context.router.replace("/buy")
                })
            }
            if(this.state.isSubmit&&nextProps.result&&nextProps.result.status==1){
                Toast.success("提交成功",()=>{
                    this.setState({
                        open:!this.state.open,
                        province:null,
                        city:null,
                        loaderText:"加载中...",
                        isSubmit:false
                    });
                    this.props.form.resetFields();
                });

            }if(this.state.isSubmit&&nextProps.result&&nextProps.result.status==0){
                Toast.fail("提交失败，请重试")
            }
        },1000);

    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    handleOfferChange(record){
        this.setState({
            Price:record.Price,
            OfferID:record.OfferID,
            PriceAgioMax:record.PriceAgioMax
        });
    },
    handleOrderSubmit(){
      this.setState({
          open:!this.state.open
      })
    },
    handleCityChange(e){
        if(e.length<1){
            return false
        }
        this.setState({
            province:ChineseDistricts["860"][e[0]],
            city:ChineseDistricts[e[0]][e[1]]
        });
    },
    handleSubmit(){
      let params=this.props.form.getFieldsValue();
      if(!params.ContactName||!params.ContactPhone||!params.district||!params.district.length>1){
          Toast.info("请填写完整信息");
          return false
      }else {
          params.Province=this.state.province;
          params.City=this.state.city;
          params.CarNo=this.state.item.CarNo;
          delete  params.district;
          this.setState({
              loading:true,
              isSubmit:true,
              loaderText:"正在提交"
          });
          this.props.submitOrder(params)
      }
    },
    handleAfterChange(current){
        current=current+2;
        if(current<=this.state.pic_list.length){
            this.setState({
                current_pic: current
            })
        }else {
            this.setState({
                current_pic: 1
            })
        }

    },
    render()
    {
        const { getFieldProps } = this.props.form;
        const Step = Steps.Step;
        const style={
            1:"轿车",
            2:"SUV",
            3:"MPV",
            4:"跑车",
            5:"其他"

        };
        const sidebar=(<div>
            <NavBar style={{"backgroundColor":"#f5f5f5"}} mode="light" iconName="left" leftContent="返回" onLeftClick={this.handleOrderSubmit} >{this.state.title}</NavBar>
            <List>
                <List.Header className="t-list-header">
                    <h3>{this.state.title}</h3>
                </List.Header>
                <List.Body>
                    <InputItem
                        {...getFieldProps('ContactName')}
                        clear
                    >姓名</InputItem>
                    <InputItem
                        {...getFieldProps('ContactPhone')}
                        clear
                        format="phone"
                    >电话</InputItem>
                    <Picker data={district} cols={2} {...getFieldProps('district',{onChange:this.handleCityChange})} format={(values) => { return values.join('-'); }} >
                        <List.Item arrow="horizontal" style={{"height":"40px"}}>城市</List.Item>
                    </Picker>
                </List.Body>
            </List>
            <WhiteSpace />
            <WingBlank>
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
            </WingBlank>
            <WhiteSpace />
        </div>);
        const drawerProps = {
            open: this.state.open,
            position: "top",
            onOpenChange: this.handleOrderSubmit,
            dragToggleDistance: 50,
            touch: false,
            contentStyle:{},
            sidebarStyle:{zIndex:105,height:"100%"}
        };
        let offer_btn=this.state.item.CarOffers&&this.state.item.CarOffers.map((offer,index)=>{
            if(offer.OfferID==this.state.OfferID||this.state.item.CarOffers.length==1||offer.Price==this.state.Price){
                return (
                    <Button type="primary" size="small" inline  key={offer.OfferID} onClick={this.handleOfferChange.bind(this,offer)}>{offer.City}</Button>
                )
            }
            return (
                <Button type="ghost" size="small" inline  key={offer.OfferID} onClick={this.handleOfferChange.bind(this,offer)}>{offer.City}</Button>
            )
        });
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
                <Drawer {...drawerProps} sidebar={sidebar}>
                    <div className="t-item">
                        {this.state.loading? <ActivityIndicator
                            toast
                            text={this.state.loaderText}
                        />:""}
                        <NavBar mode="light" iconName="left" leftContent={<Link  to="/buy">返回</Link>}  rightContent={menu}>{this.state.title}
                        </NavBar>
                        <div className="t-carousel">
                            <Carousel dots={false} afterChange={this.handleAfterChange}>
                                {
                                    this.state.pic_list.map((pic)=>{
                                        return (<Link to={this.props.routeParams.CarNo&&"/view/"+this.props.routeParams.CarNo+"/"} key={pic.CarPicID}>
                                            <img src={pic.PicAddr.substr(0,pic.PicAddr.lastIndexOf('.'))+"_Big"+pic.PicAddr.substr(pic.PicAddr.lastIndexOf('.'))} alt="" />
                                        </Link>)
                                    })
                                }
                            </Carousel>
                            <div className="t-pic-dot">
                                <span>
                                    {this.state.title}
                                </span>
                                <span style={{"textAlign":"right"}}>
                                    {this.state.current_pic}/{this.state.pic_list.length}
                                </span>
                            </div>
                        </div>

                        <List>
                            <List.Body>
                                <List.Item
                                    //thumb={require(this.state.item.BrandID&&"./car/"+this.state.item.BrandID+".png")}
                                    className="t-item-name"
                                >
                                    <h4>
                                        {this.state.item.FullName}
                                        {
                                            this.state.item.HotCar&&<i className="status-icon hot">&nbsp;</i>
                                        }
                                        {
                                            this.state.item.AgioCar&&<i className="status-icon agio">&nbsp;</i>
                                        }

                                    </h4>
                                </List.Item>
                                <List.Item>
                                    <Flex>
                                        <Flex.Item>
                                            <strong style={{"fontSize":"24px","color":"#df2626"}}>
                                                {this.state.Price}
                                            </strong>
                                            <small style={{"fontSize":"12px","color":"#df2626"}}>
                                                万
                                            </small>
                                   <span style={{"fontSize":"12px","marginLeft":"20px"}}>
                                       立省:{this.state.PriceAgioMax} 万
                                   </span>
                                        </Flex.Item>
                                        <Flex.Item style={{"textAlign":"right","fontSize":"12px"}}>
                                            市场价:{this.state.item.PriceMarket}
                                            <small>
                                                万
                                            </small>
                                        </Flex.Item>
                                    </Flex>

                                </List.Item>
                            </List.Body>
                        </List>
                        <List>
                            <List.Header className="t-list-header">
                                <Flex>
                                    <Flex.Item>
                                        提车地
                                    </Flex.Item>
                                    <Flex.Item style={{"textAlign":"right"}}>
                                        <small style={{"fontSize":"12px"}}>
                                            (提车地不同价格有所波动)
                                        </small>
                                    </Flex.Item>
                                </Flex>

                            </List.Header>
                            <List.Body>
                                <div className="t-offer-group" >
                                    {
                                        offer_btn
                                    }
                                </div>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Header className="t-list-header">
                                基本信息
                            </List.Header>
                            <List.Body>
                                <List.Item
                                    extra={
                             <span title={this.state.item.ColorOutMemo}>{this.state.item.ColorOutMemo}&nbsp;&nbsp;<span className={"color-icon color-"+this.state.item.ColorOutID}>&nbsp;&nbsp;&nbsp;</span></span>
                            }
                                >外观</List.Item>
                                <List.Item
                                    extra={
                             <span  title={this.state.item.ColorInMemo}>{this.state.item.ColorInMemo}&nbsp;&nbsp;<span className={"color-icon color-"+this.state.item.ColorInID}>&nbsp;&nbsp;&nbsp;</span></span>
                            }
                                >内饰</List.Item>
                                <List.Item
                                    extra={style[this.state.item.StyleID]}
                                >类别</List.Item>
                                <List.Item
                                    extra={this.state.item.Country}
                                >产地</List.Item>
                                <List.Item
                                    extra={this.state.item.Status}
                                >状态</List.Item>
                                <List.Item
                                    extra={this.state.item.CarCount}
                                >数量</List.Item>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Header className="t-list-header">
                                配置情况
                            </List.Header>
                            <List.Body>
                                <div className="t-item-readme" dangerouslySetInnerHTML={{__html: this.state.item.Readme}}>
                                </div>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Header className="t-list-header">
                                上牌服务
                            </List.Header>
                            <List.Body>
                                <div className="t-shangpai">
                                    <img src={require("./config.png")} alt=""/>
                                </div>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Header className="t-list-header">
                                交易流程
                            </List.Header>
                            <List.Body>
                                <div className="t-shangpai">
                                    <Steps size="small" current={4}>
                                        <Step title="线上选择心仪的爱车" />
                                        <Step title="专业购车顾问为您服务"/>
                                        <Step title="线下体验店支付定金"/>
                                        <Step title="爱车出库、验车、走物流"/>
                                        <Step title="支付尾款、上牌走手续"/>
                                    </Steps>
                                </div>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                    </div>
                </Drawer>
                <div className="t-item-btn">
                <div className="t-btn-group">
                    <div className="t-bt-l">
                        <a href="tel:4000732777">
                            拨打电话
                        </a>
                    </div>
                    <div className="t-bt-r" onClick={this.handleOrderSubmit}>
                        预约
                    </div>
                </div>
            </div>

                <div id="overlay"></div>
            </div>
            )
    }

});
Item.contextTypes = contextTypes;
Item = createForm()(Item);
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
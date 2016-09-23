import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Carousel,Steps,Modal,InputItem,Picker,Drawer,Popover,Tabs} from 'antd-mobile';
import { createForm } from 'rc-form';
import {getSpecify,getSpecConf,getSpecPic,submitOrder,getSpecVideo} from '../../actions/specify'
import district from '../../utils/district'
import  {ChineseDistricts} from '../../utils/constant'
import './index.less'
const Brief = List.Item.Brief;
const defaultProps = {
    items: {},
    message:null,
    result:null,
    loading:true,
    pic_list:null,
    conf_list:null,
    video:null
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Item=React.createClass({
    getInitialState() {
        return {
            item: {},
            pic_list:[],
            loading: true,
            title:"",
            visible:false,
            open:false,
            loaderText:"加载中...",
            conf_list:{},
            current_pic:1,
            video:[]
        };
    },
    componentDidMount(){
        if(this.props.routeParams.CarNo){
            this.props.getSpecify({CarNo:this.props.routeParams.CarNo});
            this.props.getSpecPic({CarNo:this.props.routeParams.CarNo});
            this.props.getSpecVideo({CarNo:this.props.routeParams.CarNo});
        }else {
            Toast.fail("车辆信息不存在", ()=>{
                this.context.router.goBack()
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
        if(nextProps.video&&nextProps.item!=this.props.video){
            this.setState({
                video:nextProps.video.data
            });
        }
        if(nextProps.pic_list&&nextProps.pic_list!=this.props.pic_list){
            let pic_list=[];
            nextProps.pic_list.map((pic)=>{
              if(pic.Groups){
                  pic.Groups.map((row)=>{
                      pic_list= pic_list.concat(row.Rows)
                  })
              }
            });
            pic_list.sort((a,b)=>a.SerialNO> b.SerialNO);
            this.setState({
                pic_list:pic_list
            });
        }
        if(nextProps.conf_list&&nextProps.detail!=this.props.conf_list){
            this.setState({
                conf_list:nextProps.conf_list
            });
        }
        if(nextProps.result&&nextProps.result!=this.props.result){
            setTimeout(()=>{
                if(nextProps.result.status==1){
                    Toast.success("预约成功",()=>{
                        this.setState({
                            open:!this.state.open,
                            province:null,
                            city:null,
                            loaderText:"加载中..."
                        });
                        this.props.form.resetFields();
                    })
                }else {
                    Toast.fail("提交失败请重试")
                }
            },1500)

        }
        setTimeout(()=>{
            this.setState({
                loading:nextProps.loading
            });
        },1000);


    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    handleOrderSubmit(){
        this.setState({
            open:!this.state.open
        })
    },
    handleCityChange(e){
        if(e[1]){
            this.setState({
                city:e[1]
            });
        }

    },
    handleSubmit(){
        let params=this.props.form.getFieldsValue();
        if(!params.ContactName||!params.ContactPhone||!params.district||!params.district.length>1){
            Toast.info("请填写完整信息");
            return false
        }else {
            params.CityID=this.state.city;
            params.CarNo=this.state.item.CarNo;
            delete  params.district;
            this.setState({
                loading:true,
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
        const Step = Steps.Step;
        const TabPane = Tabs.TabPane;
        const { getFieldProps } = this.props.form;
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
                    <h3>{this.state.item.BrandName+this.state.title}</h3>
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
                        <NavBar mode="light" iconName="left" leftContent={<a href={this.state.item.SeriesNO&&"#/series/"+this.state.item.SeriesNO+"/"}>返回</a>} rightContent={menu}>{this.state.title}
                        </NavBar>
                        <div className="t-carousel">
                            <Carousel dots={false} afterChange={this.handleAfterChange} selectedIndex={1} autoplay>
                                {
                                    this.state.pic_list.map((pic)=>{
                                        return (<Link to={this.state.item.CarNo&&"/gallery/"+this.state.item.CarNo+"/"} key={pic.CarPicID}><img src={pic.PicAddr.substr(0,pic.PicAddr.lastIndexOf('.'))+"_Big"+pic.PicAddr.substr(pic.PicAddr.lastIndexOf('.'))} alt=""  /></Link>)
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
                                <List.Item thumb={this.state.item.BrandID&&require("./car/"+this.state.item.BrandID+".png")}>
                                    <h4>
                                        {this.state.title}
                                    </h4>
                                </List.Item>
                                <List.Item>
                                    <Flex>
                                        <Flex.Item>
                                            <strong style={{"fontSize":"20px","color":"#f60"}}>
                                                {this.state.item.Price}
                                            </strong>
                                            <small style={{"fontSize":"12px","color":"#f60"}}>
                                                万
                                            </small>
                                        </Flex.Item>
                                        <Flex.Item style={{"textAlign":"right","fontSize":"12px"}}>
                                            厂商指导价:{this.state.item.PriceMarket}万
                                        </Flex.Item>
                                    </Flex>

                                </List.Item>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Header className="t-list-header">
                                基本信息
                            </List.Header>
                            <List.Body>
                                <List.Item className="t-series-detail">
                                    <p>
                                        变速箱：{this.state.item.GearBox}
                                    </p>
                                    <p>
                                        排&nbsp;&nbsp; 量：{this.state.item.OutputVolumeDetail}
                                    </p>
                                    <p>
                                        外&nbsp;&nbsp; 观：{this.state.item.ColorIDs_Out&&this.state.item.ColorIDs_Out.split(',').map((color)=>{
                                        if(color){
                                            return (<span className={"color-icon color-"+color} key={color}>&nbsp;</span>)
                                        }
                                    })}
                                    </p>
                                    <p>
                                        内&nbsp;&nbsp; 饰：{this.state.item.ColorIDs_In&&this.state.item.ColorIDs_In.split(',').map((color)=>{
                                        if(color){
                                            return (<span className={"color-icon color-"+color} key={color}>&nbsp;</span>)
                                        }
                                    })}
                                    </p>
                                </List.Item>
                                <List.Item extra="" arrow="horizontal" >
                                   <Link to={"/config/"+this.props.routeParams.CarNo+"/"}>
                                       详细参数配置
                                   </Link>
                                </List.Item>

                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Body>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="车辆图片" key="1">
                                        <Flex wrap="wrap" className="t-pic-list">
                                            {
                                                this.state.pic_list.slice(0,9).map((pic)=>{
                                                    return   (<div key={pic.CarPicID} className="t-pic-list-item">
                                                               <img src={pic.PicAddr} alt=""  />
                                                             </div>)
                                                })
                                            }
                                        </Flex>
                                        <List.Item extra="" arrow="horizontal" >
                                            <Link to={"/gallery/"+this.props.routeParams.CarNo+"/"}>
                                                查看更多车辆图片
                                            </Link>
                                        </List.Item>
                                    </TabPane>
                                    <TabPane tab="车辆视频" key="2">
                                        <Flex wrap="wrap" className="t-pic-list">
                                            {
                                                this.state.video.map((v)=>{
                                                    return   (<div key={v.VideoID} className="t-pic-list-item">
                                                        <video src={v.VideoURL} controls="controls" style={{"width":"100%"}}>
                                                        </video>
                                                    </div>)
                                                })
                                            }
                                        </Flex>

                                    </TabPane>
                                </Tabs>
                            </List.Body>
                        </List>
                        <div className="separator"></div>
                        <List>
                            <List.Header className="t-list-header">
                                交易流程
                            </List.Header>
                            <List.Body>
                                <div className="t-steps">

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
        pic_list:state.specify.pic_list,
        conf_list:state.specify.conf_list,
        video:state.specify.video
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSpecify:bindActionCreators(getSpecify,dispatch),
        getSpecConf:bindActionCreators(getSpecConf,dispatch),
        getSpecPic:bindActionCreators(getSpecPic,dispatch),
        submitOrder:bindActionCreators(submitOrder,dispatch),
        getSpecVideo:bindActionCreators(getSpecVideo,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)
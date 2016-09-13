import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,RefreshControl,ListView,Tooltip,Radio,Slider,Checkbox,Carousel,Steps,Modal,InputItem,Picker,Drawer,Popover} from 'antd-mobile';
import BackTop from 'antd/lib/back-top'
import {getSpecsList,getRecommendList,getSeriesDetail} from '../../actions/series'

import './index.less'
const Brief = List.Item.Brief;
const defaultProps = {
    items: null,
    message:null,
    result:null,
    loading:true,
    recommend:null,
    detail:null
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Item=React.createClass({
    getInitialState() {
        return {
            items: [],
            pic_list:[],
            loading: true,
            title:"",
            visible:false,
            open:false,
            loaderText:"加载中...",
            recommend:null,
            detail:{}
        };
    },
    componentDidMount(){
        if(this.props.routeParams.SeriesNo){
            this.props.getSeriesDetail({SeriesNo:this.props.routeParams.SeriesNo})
            this.props.getSpecsList({SeriesNo:this.props.routeParams.SeriesNo});
            this.props.getRecommendList({SeriesNo:this.props.routeParams.SeriesNo});

        }else {
            Toast.fail("车辆信息不存在", ()=>{
                this.context.router.replace("/auto")
            })
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.items&&nextProps.items!=this.props.items){
            this.setState({
                items:nextProps.items
            });
        }
        if(nextProps.recommend&&nextProps.recommend!=this.props.recommend){
            this.setState({
                recommend:nextProps.recommend
            });
        }
        if(nextProps.detail&&nextProps.detail!=this.props.detail){
            this.setState({
                detail:nextProps.detail,
                title:nextProps.detail.SeriesName
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
                    this.context.router.replace("/auto")
                })
            }

        },1000);

    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    handleClick(){
       window.location.reload()
    },
    render()
    {
        const style={
            1:"轿车",
            2:"SUV",
            3:"MPV",
            4:"跑车",
            5:"其他车型"

        };
        const menu=<Popover
            visible={this.state.visible}
            placement="topLeft"
            overlay={[
            <Popover.Item key="1">
                <Link to="/home">网站首页</Link>
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
                <div>
                    {this.state.loading? <ActivityIndicator
                        toast
                        text={this.state.loaderText}
                    />:""}
                    <NavBar mode="light" iconName="left" leftContent={<Link to="/auto">返回</Link>} rightContent={menu}>{this.state.title}
                    </NavBar>
                    <div className="t-carousel">
                        <Carousel dots={false}>
                            <img src={this.state.detail.CoverImgURL&&this.state.detail.CoverImgURL.substr(0,this.state.detail.CoverImgURL.lastIndexOf('.'))+"_Big"+this.state.detail.CoverImgURL.substr(this.state.detail.CoverImgURL.lastIndexOf('.'))} alt="" key={this.state.detail.CoverImgURL}/>
                        </Carousel>
                    </div>

                    <List>
                        <List.Body>
                            <List.Item>
                                <h4>
                                    {this.state.title}
                                </h4>
                            </List.Item>
                            <List.Item>
                                <Flex>
                                    <Flex.Item>
                                        <strong style={{"fontSize":"20px","color":"#f60"}}>
                                            {
                                                this.state.detail.Price_Max>this.state.detail.Price_Min?this.state.detail.Price_Min+"-"+this.state.detail.Price_Max:this.state.detail.Price_Min
                                            }
                                        </strong>
                                        <small style={{"fontSize":"12px","color":"#f60"}}>
                                            万
                                        </small>
                                    </Flex.Item>
                                    <Flex.Item style={{"textAlign":"right","fontSize":"12px"}}>
                                        厂商指导价:{this.state.detail.PriceMarket_Max>this.state.detail.PriceMarket_Min?<span><span className="market-price">{this.state.detail.PriceMarket_Min}</span> - <span className="market-price">{this.state.detail.PriceMarket_Max}万</span></span>:<span className="market-price">{this.state.detail.PriceMarket_Min}万</span>}

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
                                    变速箱：{this.state.detail.GearBox}
                                </p>
                                <p>
                                    排&nbsp;&nbsp; 量：{this.state.detail.OutputVolume}
                                </p>

                                <p>
                                    类&nbsp;&nbsp; 别：{style[this.state.detail.StyleID]}
                                </p>
                                <p>
                                    颜&nbsp;&nbsp; 色：{this.state.detail.ColorIDs_Out&&this.state.detail.ColorIDs_Out.split(',').map((color)=>{
                                    if(color){
                                        return (<span className={"color-icon color-"+color} key={color}>&nbsp;</span>)
                                    }
                                })}
                                </p>
                            </List.Item>

                        </List.Body>
                    </List>
                    <div className="separator"></div>
                    <List>
                        <List.Header className="t-list-header">
                            在售车型
                        </List.Header>
                        <List.Body>
                            {
                                this.state.items.map((item)=>{
                                    return (
                                        <div className="t-series-list" key={item.CarNo}>
                                            <Link to={"/specify/"+item.CarNo+"/"} >
                                                <List.Item
                                                    arrow="horizontal"
                                                    align="bottom"
                                                    multipleLine
                                                >{item.SpecName}{item.HasHot&&<i className="status-icon hot">&nbsp;</i>} {item.HasAgio&&<i className="status-icon agio">&nbsp;</i>}
                                                    <Brief>
                                                        <Flex>
                                                            <Flex.Item>
                                                                优惠价: <span>
                                                               <strong style={{"fontSize":".3rem","color":"#f60"}}>{item.Price}</strong>
                                                               <small style={{"fontSize":"12px","color":"#f60"}}>
                                                                   万
                                                               </small>
                                                           </span>
                                                            </Flex.Item>
                                                            <Flex.Item>
                                                                指导价:{item.PriceMarket}<small>万</small>
                                                            </Flex.Item>
                                                        </Flex>
                                                    </Brief>
                                                </List.Item>
                                            </Link>
                                        </div>

                                    )
                                })
                            }
                        </List.Body>
                    </List>
                    {
                        this.state.recommend&&(
                            <List>
                                <div className="separator"></div>
                                <List.Header className="t-list-header">
                                    推荐车型
                                </List.Header>
                                <List.Body>
                                    {
                                        this.state.recommend.map((rowData)=>{
                                            let hot=null;
                                            let agio=null;
                                            if(rowData.HasHot){
                                                hot=<i className="status-icon hot">&nbsp;</i>
                                            }
                                            if(rowData.HasAgio){
                                                agio=<i className="status-icon agio">&nbsp;</i>
                                            }
                                            return (
                                                   <div>
                                                       <div className="buy-list" onClick={this.handleClick}>
                                                           <h3 className="title">{rowData.SeriesName}{hot}{agio}</h3>
                                                           <Link key={rowData.SeriesNO} to={"/series/"+rowData.SeriesNO+"/"} >
                                                               <div className="describe">
                                                                   <div className="pic">
                                                                       <img src={rowData.CoverImgURL} />
                                                                   </div>
                                                                   <div className="text">
                                                                       <Flex wrap="nowrap">
                                                                           <Flex.Item>
                                                                               优惠价：{rowData.Price_Max>rowData.Price_Min?<span><span className="price">{rowData.Price_Min}</span>  -  <span className="price">{rowData.Price_Max}</span><small>万</small></span>:<span><span className="price">{rowData.Price_Min}</span><small>万</small></span>}
                                                                           </Flex.Item>
                                                                       </Flex>
                                                                       <Flex wrap="nowrap">
                                                                           <Flex.Item>
                                                                               指导价：{rowData.PriceMarket_Max>rowData.PriceMarket_Min?<span><span className="market-price">{rowData.PriceMarket_Min}</span> - <span className="market-price">{rowData.PriceMarket_Max}万</span></span>:<span className="market-price">{rowData.PriceMarket_Min}万</span>}
                                                                           </Flex.Item>
                                                                       </Flex>
                                                                       <Flex>
                                                                           <Flex.Item>
                                                                               外 &nbsp; 观：{rowData.ColorIDs_Out.split(',').map((color)=>{
                                                                               if(color){
                                                                                   return (<span className={"color-icon color-"+color} key={color}>&nbsp;</span>)
                                                                               }
                                                                           })}
                                                                           </Flex.Item>

                                                                       </Flex>
                                                                       <Flex>
                                                                           <Flex.Item>
                                                                               变速箱：{rowData.GearBox}
                                                                           </Flex.Item>
                                                                       </Flex>
                                                                   </div>
                                                               </div>
                                                           </Link>
                                                       </div>
                                                       <div className="separator"></div>
                                                   </div>

                                            )

                                        })
                                    }
                                </List.Body>
                            </List>)
                    }
                </div>
                <BackTop />
            </div>
        )
    }

});
Item.contextTypes = contextTypes;
function mapStateToProps(state) {
    return {
        items: state.series.items,
        message:state.series.message,
        result:state.series.result,
        loading:state.series.loading,
        recommend:state.series.recommend,
        detail:state.series.detail
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSpecsList:bindActionCreators(getSpecsList,dispatch),
        getRecommendList:bindActionCreators(getRecommendList,dispatch),
        getSeriesDetail:bindActionCreators(getSeriesDetail,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)
import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { createForm } from 'rc-form';
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,Popover,SearchBar,SwipeAction,InputItem,Picker,Drawer   } from 'antd-mobile';
import district from '../../utils/district'
import {orderSubmit} from '../../actions/join'
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
let Join=React.createClass({
    getInitialState() {
        return {
            visible:false,
            open:false
        };
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){
        if(nextProps.result&&nextProps.result!=this.props.result){
            setTimeout(()=>{
                if(nextProps.result.status==1){
                    Toast.success("提交成功",()=>{
                        this.setState({
                            open:!this.state.open
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
    handleSubmit(){
        let params=this.props.form.getFieldsValue();
        if(!params.Contact||!params.ContactPhone){
            Toast.info("请填写完整信息");
            return false
        }else {
            params.EventFlag=1;
            this.setState({
                loading:true,
                loaderText:"正在提交"
            });
            this.props.submitOrder(params)
        }
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
        const { getFieldProps } = this.props.form;
        const sidebar=(<div>
            <NavBar style={{"backgroundColor":"#f5f5f5"}} mode="light" iconName="left" leftContent="返回" onLeftClick={this.handleOrderSubmit} >招商</NavBar>
            <List>
                <List.Header className="t-list-header">
                    <h6>请填写下表信息，车同享招商人员将在第一时间联系您。</h6>
                </List.Header>
                <List.Body>
                    <InputItem
                        {...getFieldProps('Contact')}
                        clear
                    >姓名</InputItem>
                    <InputItem
                        {...getFieldProps('ContactPhone')}
                        clear
                        format="phone"
                    >电话</InputItem>
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
        return (
            <div>
                <Drawer {...drawerProps} sidebar={sidebar}>
                    <div className="t-item">
                        {this.state.loading? <ActivityIndicator
                            toast
                            text={this.state.loaderText}
                        />:""}
                        <NavBar mode="light" iconName="left" leftContent={<Link  to="/home">返回</Link>}  rightContent={menu}>招商说明</NavBar>
                        <div className="separator"></div>
                        <div className="invest">
                            <header className="header">
                                车同享招商详细说明
                            </header>
                            <h3 className="title">
                                一、 绪言
                            </h3>
                            <section className="invest-content">
                                <p>
                                    汽车产业、移动互联网、金融，当前任何与其中之一相关的项目多是炙手可热，而车同享以汽车产业为载体，移动互联网为工具，金融为杠杆，有机融合三者为一体，打造全新的汽车产业生态！加入车同享可谓商机无限，前途无量！
                                </p>
                            </section>
                            <h3 className="title">
                                二、 车同享的实力与优势
                            </h3>
                            <section className="invest-content">
                                <ul>
                                    <li>
                                        中国汽车流通协会理事单位
                                    </li>
                                    <li>
                                        中国汽车在线服务标志性品牌
                                    </li>
                                    <li>中国二手车行业十大品牌</li>
                                    <li>与金融机构、品牌车商、平行进口车、品牌物流公司、汽车修理厂家等形成战略合作伙伴，有效整合资源为车商及终端用户提供优质的资源和服务</li>
                                    <li>一群来自知名互联网的专业产品开发团队与运营团队。平台有PC端与移动端，移动端Andriod已公测上线，ISO端将在近期上线。</li>
                                    <li>通过资源整合车同享即是汽车综合服务平台，是汽车服务“超市”，为客户提供“平价消费”。</li>

                                </ul>
                            </section>
                            <h3 className="title">
                                三、 车同享的渠道布局
                            </h3>
                            <section className="invest-content">
                                <ul>
                                    <li>
                                        渠道分为三级包括市级、区/县级、乡/镇级
                                    </li>
                                    <li>
                                        加盟方式：市级以合伙建立子公司的运营方式；县级与镇以合作加盟运营的方式。
                                    </li>
                                    <li>每个区域实行独家代理。</li>
                                    <li>在各级渠道实行统一价格管理来保障整体营销秩序以及各级加盟商的利益。</li>
                                    <li>通过在全国发展市级、区县级及乡镇加盟商，再由各级加盟商发展当地的联盟车商，构建一张完整的营销网络，每家联盟车商都是“超市”的出口，在这里客户可以享受“一站式服务”。</li>

                                </ul>
                            </section>
                            <h3 className="title">
                                四、 加盟资格要求
                            </h3>
                            <div className="invest-content">
                                <ul>
                                    <li>
                                        理念：热爱汽车产业，致力于打造方便、快捷、和谐、幸福的人车生活，构建汽车产业新生态。
                                    </li>
                                    <li>
                                        资金：经济实力雄厚
                                    </li>
                                    <li>店面要求：二手车或汽车交易集市，市级子公司要求面积在200-500平米。县、镇级不少于50平</li>
                                    <li>团队：市级子公司最低人员配置要求5人；县级最低人员配置要求3人；镇级最低人员配置要求2人。</li>
                                    <li>运营经验：有汽车行业背景，如二手车商、汽车维修、汽车美容等，有特殊社会资源的，均可。</li>

                                </ul>
                            </div>
                            <h3 className="title">
                                五、 联系方式
                            </h3>
                            <section className="invest-content">
                                <ul>
                                    <li>
                                        总部：厦门市思明区观音山园际运营中心9号楼20层
                                    </li>
                                    <li>
                                        网址：www.chetongxiang.com
                                    </li>
                                    <li>合作热线：400-0732-777</li>

                                </ul>
                            </section>
                        </div>
                    </div>
                </Drawer>

                <div className="t-item-btn">
                    <div className="t-btn-group">
                        <div className="t-bt-l">
                            <a href="tel:4000732777">
                                客服电话
                            </a>
                        </div>
                        <div className="t-bt-r" onClick={this.handleOrderSubmit}>
                            快速加盟
                        </div>
                    </div>
                </div>
            </div>
        )
    }

});
Join = createForm()(Join);
Join.contextTypes = contextTypes;
function mapStateToProps(state) {
    return {
        message:state.join.message,
        result:state.join.result,
        loading:state.join.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        submitOrder:bindActionCreators(orderSubmit,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Join)
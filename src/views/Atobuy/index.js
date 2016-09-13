
import  React ,{PropTypes} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { Carousel,List,InputItem,Picker,Drawer,Button,Popup,ListView,SearchBar,WhiteSpace,WingBlank,TextareaItem,Toast,Modal,Radio,NavBar,Popover,Icon  } from 'antd-mobile';
import { createForm } from 'rc-form';
import  './index.less'
import district from '../../utils/district'
import brand_series from '../../utils/brand';
import { getCount,setToken,submitAtoBuy,getSign} from '../../actions/atobuy'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RadioItem = Radio.RadioItem;
const alert = Modal.alert;
const { Item } = List;
const defaultProps = {
    items: [],
    loading:true,
    message:null,
    result:null
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let AtoBuy = React.createClass({
    getInitialState() {
        return {
            PuregCarFlag:0,
            show:"none",
            info:"留下您的联系方式后，最新的实惠好车我们将第一时间告知您",
            isSubmit:false,
            count:0,
            visible:false
        }
    },
    componentDidMount(){
        this.props.getCount();
        if(this.props.params&&this.props.params.token){
           this.props.setToken({
               PageTag:"wxPureg",
               token:this.props.params.token
           })
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.items){
            this.setState({
                count:nextProps.items
            })
        }
        if(nextProps.loading){
            Toast.loading("正在提交");
            this.setState({
                info:"提交成功，工作人员将为您比价推送好车，敬请查收通知"
            })
        }
        if(this.state.isSubmit&&nextProps.result&&nextProps.result.status==1){
            Toast.hide();
            let c=this.state.count+1;
            alert('', '提交成功，工作人员将为您比价推送好车，敬请查收通知', [
                { text: '确定'}
            ]);
            this.setState({
                isSubmit:false,
                count:c
            });
            this.props.form.resetFields();
           /* Toast.success("提交成功",()=>{
                this.setState({
                    isSubmit:false,
                    count:c
                });
                this.props.form.resetFields();
            });*/
        }else if(this.state.isSubmit&&nextProps.result&&nextProps.result.status==0) {
            Toast.fail("提交失败");
            this.setState({
                isSubmit:false
            })
        }
    },
    handleRadioChange(e){
        let tpl="none";
        if(parseInt(e.target.name)==1){
            tpl="block"
        }
        this.setState({
            show:tpl,
            PuregCarFlag:parseInt(e.target.name)
        });
    },
    handleSubmit(){
        const {getFieldsValue}= this.props.form;
        let params=getFieldsValue();
        if(!params.UserName||!params.Phone){
           Toast.info("姓名和电话是必填的");
            return false;
        }
        if(params.Series){
            params.BrandID=params.Series[0];
            params.SeriesID=params.Series[0];
        }
        if(params.district){
            params.CityID=params.district[1]
        }
        if(params.StyleID){
            params.StyleID=params.StyleID[0]
        }
        if(params.Price){
            params.Price=parseInt(params.Price*10000)
        }
        params.Phone=params.Phone&&params.Phone.replace(/\s+/g,"");
        params.UserID_Tuiguang=this.props.routeParams.token||"wechat";
        params.PuregCarFlag=this.state.PuregCarFlag;
        delete params.Series;
        delete params.district;
        this.setState({
            isSubmit:true
        });
       this.props.submitAtoBuy(params);

    },
    handleBack(){
        this.context.router.goBack()
    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    render() {
        const { getFieldProps } = this.props.form;
        const  carProps=[
            {
                value:0,
                label:"不限"
            },
            {
                value:1,
                label:"轿车"
            },
            {
                value:2,
                label:"SUV"
            },
            {
                value:3,
                label:"MPV"
            },
            {
                value:4,
                label:"跑车"
            },
            {
                value:5,
                label:"其他"
            }
        ];
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
            </Popover.Item>

          ]}
            popupAlign={{

          }}
            onVisibleChange={this.handleVisibleChange}
        >
            <span><Icon type="bars" /></span>
        </Popover>;
        return (
            <div style={{"background":"#eee"}}>
                <NavBar mode="light" iconName="left" onLeftClick={this.handleBack} rightContent={menu}>一键帮买</NavBar>
                <img src={require('./wechat-icon.png')} alt="" style={{"display":"none"}}/>
                <Carousel mode="banner" dots="false">
                    <img src={require("./banner.png")} alt=""/>
                </Carousel>
                <div className="tip">
                    <div className="tip-content">
                        <p>
                           <span style={{"color":"#0080ff"}}>温馨提示:</span>
                            最优惠的新车；性价比最高的二手车。您只需一键提出需求，其他的事情由我们来搞定。快来试试吧！车同享让您买车不花冤枉钱！
                        </p>
                        <p>
                            当前已累计为 <strong style={{"color":"#df2626","fontSize":"16px"}}>{this.state.count}</strong> 人找到好车
                        </p>
                    </div>
                </div>
                <List>
                    <List.Body >
                        <Picker data={brand_series} cols={2} {...getFieldProps('Series')} format={(values) => { return values.join('-'); }}>
                            <List.Item arrow="horizontal">品牌</List.Item>
                        </Picker>
                        <InputItem
                            {...getFieldProps('Price')}
                            clear
                            extra="万"
                            style={{"paddingBottom":"2px","paddingTop":"2px"}}
                        >价格</InputItem>
                    </List.Body>
                </List>
                <List>
                    <List.Body>
                        <RadioItem
                            checked={this.state.PuregCarFlag === 0}
                            onChange={this.handleRadioChange}
                            name="0"
                        >
                            不限
                        </RadioItem>
                        <RadioItem
                            checked={this.state.PuregCarFlag === 1}
                            onChange={this.handleRadioChange}
                            name="1"
                        >
                            二手车
                        </RadioItem>
                        <RadioItem
                            checked={this.state.PuregCarFlag === 2}
                            onChange={this.handleRadioChange}
                            name="2"
                        >
                            新车
                        </RadioItem>
                        <RadioItem
                            checked={this.state.PuregCarFlag === 3}
                            onChange={this.handleRadioChange}
                            name="3"
                        >
                            进口车
                        </RadioItem>
                        <div style={{"display":this.state.show}}>
                            <InputItem
                                {...getFieldProps('CarYear')}
                                clear
                                extra="年"
                                style={{"paddingBottom":"2px","paddingTop":"2px"}}
                            >车龄</InputItem>
                           </div>
                    </List.Body>
                </List>
                <List>
                    <List.Body>
                        <InputItem
                            {...getFieldProps('UserName')}
                            clear
                            placeholder=""
                        ><i style={{"color":"red"}}>*</i> 姓名</InputItem>
                        <InputItem
                            {...getFieldProps('Phone')}
                            clear
                            format="phone"
                            required
                        ><i style={{"color":"red"}}>*</i> 电话</InputItem>
                        <Picker data={district} cols={2} {...getFieldProps('district')} format={(values) => { return values.join('-'); }} >
                            <List.Item arrow="horizontal" style={{"height":"40px"}}>&nbsp;&nbsp;城市</List.Item>
                        </Picker>
                        <TextareaItem
                            {...getFieldProps('Readme')}
                            rows={3}
                            placeholder="如需购买异地车或有其它需求，请在此填写"
                            clear
                        />
                    </List.Body>
                </List>
                <WingBlank style={{"color":"#037AFD","marginBottom":"15px"}}>
                    {this.state.info}
                </WingBlank>
                <WhiteSpace />
                <WingBlank>
                    <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                </WingBlank>
                <WhiteSpace />
            </div>
        );
    }
});
AtoBuy.contextTypes = contextTypes;
AtoBuy = createForm()(AtoBuy);
function mapStateToProps(state) {
    return {
        items: state.atobuy.items,
        loading:state.atobuy.loading,
        message:state.atobuy.message,
        result:state.atobuy.result,
        sign:state.atobuy.sign
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCount:bindActionCreators(getCount,dispatch),
        setToken:bindActionCreators(setToken,dispatch),
        submitAtoBuy:bindActionCreators(submitAtoBuy,dispatch),
        getSign:bindActionCreators(getSign,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AtoBuy)

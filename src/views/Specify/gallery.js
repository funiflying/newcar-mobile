import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Carousel,Steps,Modal,InputItem,Picker,Drawer,Popover,Tabs} from 'antd-mobile';
import { createForm } from 'rc-form';
import {PhotoSwipe,PhotoSwipeGallery} from 'react-photoswipe';
import {getSpecify,getSpecConf,getSpecPic,submitOrder} from '../../actions/specify'
import  {COLOR_NAME} from '../../utils/constant'
import './index.less'
const RadioItem = Radio.RadioItem;
const defaultProps = {
    items: {},
    message:null,
    result:null,
    loading:true,
    pic_list:null,
    conf_list:null
};
const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
let Item=React.createClass({
    getInitialState() {
        return {
            item:null,
            pic_list:[],
            loading: true,
            title:"",
            visible:false,
            open:false,
            loaderText:"加载中...",
            filter_title:"",
            content:null,
            color:null,
            color_title:"选择颜色",
            type:null,
            type_title:"选类别"
        };
    },
    componentDidMount(){
        if(this.props.routeParams.CarNo){
            this.props.getSpecify({CarNo:this.props.routeParams.CarNo});
            this.props.getSpecPic({CarNo:this.props.routeParams.CarNo});

        }else {
            Toast.fail("车辆信息不存在", ()=>{
                //this.context.router.replace("/auto")
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
        if(nextProps.pic_list&&nextProps.pic_list!=this.props.pic_list){
            let pic_list=[];
            nextProps.pic_list.map((pic)=>{
                if(pic.Groups){
                    pic.Groups.map((row)=>{
                        pic_list= pic_list.concat(row.Rows)
                    })
                }
            });
            let items=[];
            pic_list.map((pic)=>{
                items.push(
                    {
                    src: pic.PicAddr.substr(0,pic.PicAddr.lastIndexOf('.'))+"_Big"+pic.PicAddr.substr(pic.PicAddr.lastIndexOf('.')),
                    thumbnail: pic.PicAddr,
                    title: pic.title,
                    w:window.screen.width,
                    h:(window.screen.width/1280)*854
                })
            })
            this.setState({
                pic_list:items
            });
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
    handleColorChange(value,title,event){
        if(event.target.checked){
            this.setState({
                color:value
            })
        }
        this.setState({
            open:!this.state.open,
            color_title:title
        });
        this.props.getSpecPic({CarNo:this.props.routeParams.CarNo,ColorId:value,TypeId:this.state.type});
    },
    handleTypeChange(value,title,event){
        if(event.target.checked){
            this.setState({
                type:value
            })
        }
        this.setState({
            open:!this.state.open,
            type_title:title
        });
        this.props.getSpecPic({CarNo:this.props.routeParams.CarNo,ColorId:this.state.color,TypeId:value});
    },

    handleOpenChange(sid){
        let  title="";
        let content=null;
        switch (sid){
            case 1:
                title="选择车型";
                break;
            case 2:
                title="选择颜色";
                    content=(
                        <div>
                            <RadioItem checked={this.state.color==null} onChange={this.handleColorChange.bind(this,null,"全部颜色")}>
                                <span className="color-icon color-all" >&nbsp;</span>全部颜色
                            </RadioItem>
                            {
                                this.state.item&&this.state.item.ColorIDs_Out&&this.state.item.ColorIDs_Out.split(',').map((color)=>{
                                    if(color){
                                        return (
                                            <RadioItem checked={this.state.color==color} key={color} onChange={this.handleColorChange.bind(this,color,COLOR_NAME[color])}>
                                                <span className={"color-icon color-"+color} >&nbsp;</span>{COLOR_NAME[color]}
                                            </RadioItem>
                                        )
                                    }
                                })
                            }
                        </div>);
                break;
            case 3:
                title="选择类型";
                content=(<div>
                    <RadioItem checked={this.state.type==null} onChange={this.handleTypeChange.bind(this,null,'全部类型')}>
                        全部类型
                    </RadioItem>
                    <RadioItem checked={this.state.type==1} onChange={this.handleTypeChange.bind(this,1,'车身外观')}>
                        车身外观
                    </RadioItem>
                    <RadioItem checked={this.state.type==2} onChange={this.handleTypeChange.bind(this,2,'内饰')}>
                        内饰
                    </RadioItem>
                    <RadioItem checked={this.state.type==3} onChange={this.handleTypeChange.bind(this,3,'其他')}>
                        其他
                    </RadioItem>
                </div>);
                break;
        }
        this.setState({
            open:!this.state.open,
            filter_title:title,
            content:content
        });
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
            <NavBar style={{"backgroundColor":"#f5f5f5"}} mode="light" iconName={false} rightContent={<span onClick={this.handleOpenChange}>关闭</span>}>{this.state.title}</NavBar>
            <List>
                <List.Header className="t-list-header">
                    <h3>{this.state.filter_title}</h3>
                </List.Header>
                <List.Body>
                    {this.state.content}
                </List.Body>
            </List>
        </div>);
        const drawerProps = {
            open: this.state.open,
            position: "right",
            onOpenChange: this.handleOpenChange,
            dragToggleDistance: 50,
            touch: false,
            contentStyle:{},
            sidebarStyle:{zIndex:106,width:"80%"}
        };
        let getThumbnailContent = (item) => {
            return (
            <div key={item.thumbnail} className="t-pic-list-item" >
                <img src={item.thumbnail}/>
            </div>
            );
        }
        let options = {
            shareEl:false
        };

        return (
            <div>
                <Drawer {...drawerProps} sidebar={sidebar} className="spe-drawer">
                    <div style={{"paddingTop":"77px","minHeight":window.screen.height}}>
                        {this.state.loading? <ActivityIndicator
                            toast
                            text={this.state.loaderText}
                        />:""}
                        <NavBar mode="light" iconName="left" leftContent={<Link to={"/specify/"+this.props.routeParams.CarNo+"/"}>返回</Link>} className="t-pic-navbar">{this.state.title}</NavBar>
                        <Flex className="t-pic-toolbar" align="center">
                            <Flex.Item onClick={this.handleOpenChange.bind(this,2)}>
                                {this.state.color_title} <Icon type="circle-right" />
                            </Flex.Item>
                            <Flex.Item onClick={this.handleOpenChange.bind(this,3)}>
                                {this.state.type_title} <Icon type="circle-right" />
                            </Flex.Item>
                        </Flex>
                        <div className="separator"></div>
                        <PhotoSwipeGallery items={this.state.pic_list} options={options} thumbnailContent={getThumbnailContent} className="t-pic-list"/>
                    </div>
                </Drawer>

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

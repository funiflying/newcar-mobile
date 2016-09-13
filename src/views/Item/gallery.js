import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,RefreshControl,ListView,Radio,Slider,Checkbox,Carousel,Steps,Modal,InputItem,Picker,Drawer,Popover,Tabs} from 'antd-mobile';
import { createForm } from 'rc-form';
import {PhotoSwipe,PhotoSwipeGallery} from 'react-photoswipe';
import {getItem} from '../../actions/item'
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
            title:""
        };
    },
    componentDidMount(){
        if(this.props.routeParams.CarNo){
            this.props.getItem({CarNo:this.props.routeParams.CarNo});

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
                title:nextProps.item.FullName,
            });
            let pic_list=[];
            nextProps.item.CarPics.map((pic)=>{
                pic_list.push(
                    {
                        src: pic.PicAddr.substr(0,pic.PicAddr.lastIndexOf('.'))+"_Big"+pic.PicAddr.substr(pic.PicAddr.lastIndexOf('.')),
                        thumbnail: pic.PicAddr,
                        title: pic.title,
                        w:window.screen.width,
                        h:(window.screen.width/1280)*854
                    })
            });
            this.setState({
                pic_list:pic_list
            });
        }
        setTimeout(()=>{
            this.setState({
                loading:nextProps.loading
            });
        },1000);


    },

    render()
    {

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
                <div style={{"paddingTop":"40px","minHeight":window.screen.height}}>
                    {this.state.loading? <ActivityIndicator
                        toast
                        text={this.state.loaderText}
                    />:""}
                    <NavBar mode="light" iconName="left" leftContent={<Link to={"/item/"+this.props.routeParams.CarNo+"/"}>返回</Link>} className="t-pic-navbar">{this.state.title}</NavBar>
                    <div className="separator"></div>
                    <PhotoSwipeGallery items={this.state.pic_list} options={options} thumbnailContent={getThumbnailContent} className="t-pic-list"/>
                </div>

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
        loading:state.item.loading,
        pic_list:state.item.pic_list,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getItem:bindActionCreators(getItem,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)

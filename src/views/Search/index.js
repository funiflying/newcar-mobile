import  React,{ PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { NavBar,Icon,Button,WingBlank,WhiteSpace,Flex,List,Toast,ActivityIndicator,Popover,SearchBar,SwipeAction } from 'antd-mobile';
import {data}  from '../../utils/brand-index';
import {Storage} from '../../utils/index'
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
let Item=React.createClass({
    getInitialState() {
        return {
            loading: false,
            open:false,
            visible:false,
            items:[],
            key:"3",
            label:"新车",
            search:Storage.getStorage("GUIISEARCH")
        };
    },
    componentDidMount(){

    },
    componentWillReceiveProps(nextProps){

    },
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    },
    handleOpenChange(open) {
        this.setState({
            open
        });
    },
    handleSearch(value){
      if(value){
          switch (this.state.key){
              case "2":
                  this.setState({
                      placeholder:"店铺名称"
                  });
                  break;
              case "1":
              case "3":
              case "4":
                  let arr= data.filter(function(d){
                      return d.label.indexOf(value)>-1||d.spell.indexOf(value.toUpperCase())>-1;
                  });
                  this.setState({
                      items:arr
                  });
                  break;
          }
      }else {
          this.setState({
              items:[]
          })
      }

    },
    handleSelect(event){
       this.setState({
           key:event.key,
           label:event.props.children,
           open:!this.state.open
       });
        switch (event.key){
            case "1":
            case "2":
                window.location.href="http://wx.chetongxiang.com/index.html#/searchcar";
                break;
        }
    },
    handleSearchSubmit(value){
        switch (this.state.key){
            case "1":
                break;
            case "2":
                this.setState({
                    placeholder:"店铺名称"
                });
                break;
            case "3":
                this.context.router.push({
                    pathname: '/auto',
                    state: {text:value}
                });
                break;
            case "4":
                this.context.router.push({
                    pathname: '/buy',
                    state: {text:value}
                });
                break;
        }
        let result=Storage.getStorage("GUIISEARCH")||{};
        let text= result["text"]||[];
        text.push(value);
        result["text"]=text;
        Storage.setStorage("GUIISEARCH",result);
    },
    handleClick(item){
        switch (this.state.key){
            case "1":
                break;
            case "2":
                this.setState({
                    placeholder:"店铺名称"
                });
                break;
            case "3":
                this.context.router.push({
                    pathname: '/auto',
                    state: {value:item.value,label:item.label}
                });
                break;
            case "4":
                this.context.router.push({
                    pathname: '/buy',
                    state: {value:item.value,label:item.label}
                });
                break;
        }
        let result=Storage.getStorage("GUIISEARCH")||{};
        result[item.value]=item.label;
        Storage.setStorage("GUIISEARCH",result);


    },
    handleClear(key){
        let result = Storage.getStorage("GUIISEARCH");
        if(!isNaN(key)){
            delete result[key]
        }else {
            let text=[];
            result["text"].map((txt)=>{
                if(txt!=key){
                    text.push(txt)
                }
            });
            text.length>0?result["text"]=text:delete result["text"];
        }
       var keys=Object.keys(result);
       if(keys.length>0){
           Storage.setStorage("GUIISEARCH",result);
           this.setState({
               search:result
           })
       }else {
           Storage.removeStorage("GUIISEARCH");
           this.setState({
               search:null
           })
       }



    },
    handleClearAll(){
        Storage.removeStorage("GUIISEARCH");
        this.setState({
            search:null
        })
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
        return (
            <div>
                    {this.state.loading? <ActivityIndicator
                        toast
                        text={this.state.loaderText}
                    />:""}
                    <NavBar mode="light" iconName="left" leftContent={<Link  to="/home">返回</Link>}  rightContent={menu}>搜索</NavBar>
                    <div className="t-search-bar">
                        <div className="search-btn">
                            <Popover
                                visible={this.state.open}
                                placement="topLeft"
                                overlay={[
                                    <Popover.Item key="1">
                                        二手车
                                    </Popover.Item>,
                                    <Popover.Item key="2">
                                        店铺
                                    </Popover.Item>,
                                    <Popover.Item key="3">
                                        新车
                                    </Popover.Item>,
                                    <Popover.Item key="4">
                                        进口车
                                    </Popover.Item>

                                  ]}
                                popupAlign={{

                                  }}
                                onVisibleChange={this.handleOpenChange}
                                onSelect={this.handleSelect}
                            >
                                <span className="action">{this.state.label}<Icon type="down" /></span>
                            </Popover>
                        </div>
                        <div className="search-bar">
                            <SearchBar placeholder="搜索" onChange={this.handleSearch} onSubmit={this.handleSearchSubmit}/>
                        </div>
                    </div>
                   {
                       this.state.items.length>0&&<List>
                           {
                               this.state.items.map((item)=>{
                                   return(<List.Item
                                       key={item.value}
                                       onClick={this.handleClick.bind(this,item)}
                                   >{item.label}</List.Item>)
                               })
                           }
                       </List>
                   }
                {
                    this.state.search&& <List title="搜索记录">
                        {
                            Object.keys(this.state.search).map((key)=>{
                                if(key=="text"){
                                   return this.state.search[key].map((txt)=>{
                                       return( <SwipeAction
                                           key={txt}
                                           autoClose
                                           right={[
                                              {
                                                text: '删除',
                                                onPress: this.handleClear.bind(this,txt),
                                                style: { backgroundColor: '#FE7A38', color: 'white' }
                                              },
                                              {
                                                text: '取消',
                                                style: { backgroundColor: '#ccc', color: 'white' }
                                              }
                                            ]}
                                       >
                                           <List.Item
                                               key={txt}
                                               onClick={this.handleSearchSubmit.bind(this,txt)}
                                           >{txt}</List.Item>
                                       </SwipeAction>);
                                    })
                                }else {
                                  return( <SwipeAction
                                        key={key}
                                        autoClose
                                        right={[
                                              {
                                                text: '删除',
                                                onPress: this.handleClear.bind(this,key),
                                                style: { backgroundColor: '#FE7A38', color: 'white' }
                                              },
                                              {
                                                text: '取消',
                                                style: { backgroundColor: '#ccc', color: 'white' }
                                              }
                                            ]}
                                    >
                                      <List.Item
                                          key={key}
                                          onClick={this.handleClick.bind(this,{label:this.state.search[key],value:key})}
                                      >{this.state.search[key]}</List.Item>
                                    </SwipeAction>);
                                }

                            })

                        }
                        <List.Item arrow="horizontal" onClick={this.handleClearAll}>清空搜索记录</List.Item>
                    </List>
                }

            </div>
        )
    }

});
Item.contextTypes = contextTypes;
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)
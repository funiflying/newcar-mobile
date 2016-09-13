import {CAR_SPECS_ITEM_CONF_NEW,CAR_SPECS_ITEM_CONF_NEW_ERROR,CAR_SPECS_ITEM_CONF_NEW_PENDING,CAR_SPECS_ITEM_CONF_NEW_SUCCESS,CAR_SPECS_ITEM_NEW,CAR_SPECS_ITEM_NEW_ERROR,CAR_SPECS_ITEM_NEW_PENDING,CAR_SPECS_ITEM_NEW_SUCCESS,
CAR_SPECS_ITEM_PIC_NEW,CAR_SPECS_ITEM_PIC_NEW_ERROR,CAR_SPECS_ITEM_PIC_NEW_PENDING,CAR_SPECS_ITEM_PIC_NEW_SUCCESS,CAR_SPECS_ITEM_VIDEO_NEW,CAR_SPECS_ITEM_VIDEO_NEW_ERROR,CAR_SPECS_ITEM_VIDEO_NEW_PENDING,CAR_SPECS_ITEM_VIDEO_NEW_SUCCESS,CAR_SUBMIT_NEW,CAR_SUBMIT_NEW_ERROR,CAR_SUBMIT_NEW_PENDING,CAR_SUBMIT_NEW_SUCCESS
} from  '../actions/specify'

const initialState = {
    item: null,
    pic_list:null,
    conf_list:null,
    message:null,
    result:null,
    loading:false,
    recommend:null,
    detail:null,
    video:null
};

export default function Specify(state=initialState,action={}){
    switch (action.type) {
        case CAR_SPECS_ITEM_CONF_NEW_PENDING:
            return Object.assign({},initialState,{ loading:true});
            break;
        case CAR_SPECS_ITEM_CONF_NEW_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_SPECS_ITEM_CONF_NEW_SUCCESS:
            return Object.assign({}, initialState,{conf_list:action.payload.data,loading:false});
            break;
        case CAR_SPECS_ITEM_PIC_NEW_PENDING:
            return Object.assign({}, initialState, {loading:true});
            break;
        case CAR_SPECS_ITEM_PIC_NEW_ERROR:
            return Object.assign({}, initialState, { message:{message:action.payload.statusText},loading:false});
            break;
        case CAR_SPECS_ITEM_PIC_NEW_SUCCESS:
            if(action.payload.status==0||action.payload.count==0){
                return Object.assign({}, initialState,{pic_list:null,loading:false});
            }
            return Object.assign({}, initialState,{pic_list:action.payload.data,loading:false});
            break;
        case CAR_SPECS_ITEM_VIDEO_NEW_PENDING:
            return Object.assign({},initialState,{ loading:true});
            break;
        case CAR_SPECS_ITEM_VIDEO_NEW_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_SPECS_ITEM_VIDEO_NEW_SUCCESS:
            if(action.payload.data){
                return Object.assign({}, initialState,{video:action.payload.data,loading:false});
            }
            return Object.assign({}, initialState,{message:"视频信息不存在",loading:false});
            break;
        case CAR_SPECS_ITEM_NEW_PENDING:
            return Object.assign({},initialState,{ loading:true});
            break;
        case CAR_SPECS_ITEM_NEW_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_SPECS_ITEM_NEW_SUCCESS:
            if(action.payload.data){
                return Object.assign({}, initialState,{item:action.payload.data,loading:false});
            }
            return Object.assign({}, initialState,{message:"车辆信息不存在",loading:false});
            break;
        case CAR_SUBMIT_NEW_PENDING:
            return Object.assign({}, initialState, { loading:true});
            break;
        case CAR_SUBMIT_NEW_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_SUBMIT_NEW_SUCCESS:
            return Object.assign({}, initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
    }
}
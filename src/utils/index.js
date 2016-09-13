export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}

export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
export function getSession(){
  return JSON.parse(decodeURI(sessionStorage.getItem('UUID')));
}
export  const Storage={
  setStorage:function(name,val){
    localStorage.setItem(name,JSON.stringify(val))
  },
  getStorage:function(name){
    return JSON.parse(localStorage.getItem(name));
  },
  removeStorage:function(name){
    localStorage.removeItem(name)
  }



};

export function  checkUnoinStatus(flag){
  flag = parseInt(flag);
  var descr = "";
  switch (flag) {
    case 0:
      descr = "审核中";
      break;
    case 1:
      descr = "拒绝";
      break;
    case 2:
      descr = "已初审";
      break;
    case 3:
      descr = "拒绝";
      break;
    case 4:
      descr = "通过";
      break;
    default:
      descr = "未知状态"+flag;
      break;

  }
  return descr;
}
export function  checkCarStatus(flag){
  flag = parseInt(flag);
  var descr = "";
  switch (flag) {
    case 0:
      descr = "待审核";
      break;
    case 1:
      descr = "初审未通过";
      break;
    case 2:
      descr = "初审通过";
      break;
    case 3:
      descr = "未通过";
      break;
    case 4:
      descr = "审核通过";
      break;
    default:
      descr = "未知" + status;
      break;

  }
  return descr;
}
export function  checkOrderStatus(flag){
  flag = parseInt(flag);
  var descr = "";
  switch (flag) {
    case 0:
      descr = "待审核";
      break;
    case 1:
      descr = "初审未通过";
      break;
    case 2:
      descr = "初审通过";
      break;
    case 3:
      descr = "未通过";
      break;
    case 4:
      descr = "审核通过";
      break;
    default:
      descr = "未知" + status;
      break;

  }
  return descr;
}
export function currency (number,places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "￥";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var  negative = number < 0 ? "-" : "",
      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}
import Api from './api';

const api = new Api({
  baseURI: 'http://www.chetongxiang.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
const api_import = new Api({
  baseURI: '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
export {api_import};



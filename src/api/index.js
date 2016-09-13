import Api from './api';

const api = new Api({
  baseURI: 'http://192.168.0.218:8080',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
const api_import = new Api({
  baseURI: 'http://192.168.0.198:100',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
export {api_import};



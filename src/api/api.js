import superagent from 'superagent';
//const proxy=require('superagent-proxy')(superagent);
const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {

  constructor(opts) {
    this.opts = opts || {};

    if (!this.opts.baseURI){
        // throw new Error('baseURI option is required');
    }
    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);
        if (params) {
          request.query(params);
        }
        if (this.opts.headers) {
          request.set(this.opts.headers);
        }
        if (data) {
          request.send(data);
        }
       //request.withCredentials("true");
       request.end(function(err,res){
          if(err){
            reject(res || err)
          }else{
              try {
                  var data={};
                  if( typeof res.text=="object"){
                       data=res.text;
                  }else {
                      data=JSON.parse(res.text);
                  }
                  resolve(data)

              }catch (err){
                  resolve({
                      message:"系统错误",
                      status:0
                  })
              }
          }
       });
      //request.end((err, { body } = {}) =>{console.log(body); err ? reject(body || err) : resolve(body)});
      })
    );

  }

}

const Api = _Api;

export default Api;

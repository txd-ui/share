const GET = 'GET';
const POST = 'POST';

const baseURL = 'https://179l13s642.51mypc.cn';

function request(method, url, data) {

  return new Promise(function (resolve, reject) {
    let header = {
      'content-type': 'application/json',
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? data : data,
      header: header,
      success(res) {
      
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.errMsg === "request:ok") {
          resolve(res);
        } else {
          //其他异常
          reject('运行时错误,请稍后再试');
        }
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}


module.exports = {
  request: request
};

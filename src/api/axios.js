import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'https://bi-api.txguu.cn/';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'https://bi-api.txguu.cn/';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://bi-api.txguu.cn/';
}
//请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
//添加请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      resolve(response.data);
    } else if(response.status === 401){
      localStorage.clear();
      window.location.reload();
    }else{
      reject({
        state: "0",
        message: "网络异常"
      });
    }
  });
}

export default {
  post(url, params) {
    return axios({
      method: "post",
      url,
      data: params
    }).then(response => {
      return checkStatus(response);
    });
  },
  get(url, params) {
    params = qs.stringify(params);
    return axios({
      method: "get",
      url,
      params
    }).then(response => {
      return checkStatus(response);
    });
  }
}

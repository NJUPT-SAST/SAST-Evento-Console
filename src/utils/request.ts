//请在此封装通用请求实例
import axios from "axios";
const api = axios.create({
  baseURL: "", //这边填后端的baseUrl
  timeout: 3000,
});
api.interceptors.request.use(
  (config) => {
    //记得存储token到localstorage里
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    // 检查响应状态码，处理成功响应中的错误状态码
    if (res.status === 200) {
      // 请求成功，返回响应数据
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (err) => {
    // 处理响应错误
    if (err.response) {
      // 请求已发出，但服务器响应状态码不在2xx范围内
      switch (err.response.status) {
        case 401:
          console.error("未授权或授权已过期，请重新登录");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        default:
          console.error("响应错误", err.response.status);
      }
    } else {
      // 请求未发出或其他错误
      console.error("请求错误", err);
    }
    return Promise.reject(err);
  }
);

export default api;

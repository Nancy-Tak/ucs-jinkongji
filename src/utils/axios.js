import {Toast} from 'antd-mobile';
import {browserHistory} from 'react-router';
import axios from 'axios';
import session from '../utils/session';

// default axios config
axios.default.withCredentials = true;
axios.default.timeout = 5000;

// 后端接口状态码
// (5000,"业务规则校验错误。")
// (5001,"系统内部错误。")
// (5002,"通用查询授权失败。")
// (5003,"不具备此操作权限。")
// (5004,"登录超时。")
// (-1, "未开始。")
// (0, "失败。")
// (1, "成功。")
// (2,"处理中。")

axios.interceptors.response.use(
  response => {
    const { data = {} } = response;
    switch (data.status) {
      case 1: {
        return data;
      }
      case 0: {
        Toast.fail(data.message, 3);
        return Promise.reject(data);
      }
      case 5004: {
        Toast.fail(data.message, 3);
        session.clearUserInfo();
        browserHistory.push('/login');
        return Promise.reject(data);
      }
      default: {
        return Promise.reject(data);
      }
    }
  },
  error => {
    if (process.env.IS_DEV) {
      console.log('axios error', error);
    }
    return Promise.reject(error);
  },
);

export default axios;

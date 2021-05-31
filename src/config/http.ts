import axios from 'axios';
import config, {Config} from 'react-native-config';

axios.defaults.baseURL = Config.API_URL_LINK;


/**
 * 添加请求拦截器
 */
axios.interceptors.request.use(
  function (config) {
    config.headers = {
        icode:'A799F87053F18AF6',
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

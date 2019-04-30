import axios from 'axios';

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  console.info(`request: ${config.url}\nrequest body: `, config.data || config.params);
  return config;
});

axios.interceptors.response.use(({ data: res }) => {
  console.info('response: ', res);
  if (res.code === 999) {
    alert('登录已经过期，请重新登录。');
    document.location.href = '/#/login';
  }
  if (res.code === 0) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
}, () => Promise.reject({ code: -1, msg: 'error!' }));

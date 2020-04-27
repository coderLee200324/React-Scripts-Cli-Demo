const axios = require("axios");

const service = axios.create({
  baseURL: "",
  timeout: 6000,
});

service.interceptors.request.use(
  config => config,
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => response,
  error => {
    console.log(`Error:${error}`);
    return Promise.reject(error);
  }
);

module.exports = {
  // jsonPost(url, data, { headers = {}, ...options } = {}) {
  //   addHeaders(headers);
  //   return net.jsonPost(url, data, { ...options, headers });
  // },
  // jsonGet(url, { headers = {}, ...options } = {}) {
  //   addHeaders(headers);
  //   return net.jsonGet(url, { ...options, headers });
  // }
  jsonPost() {
    return "111";
  },
  jsonGet() {
    return "222";
  },
};

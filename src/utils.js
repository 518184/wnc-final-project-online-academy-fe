import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
  headers: { 'x-access-token': localStorage.account_accessToken }
});

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export function refreshToken() {
  if (Date.now() >= localStorage.account_expToken * 1000) {
    const data = {
      "accessToken": localStorage.account_accessToken,
      "refreshToken": localStorage.account_refreshToken
    };
    const res = axiosInstance.post('/auth/refresh', data);
    localStorage.account_accessToken = res;
    localStorage.account_expToken = parseJwt(res).exp;
    return res;
  }
  return localStorage.account_accessToken;
};
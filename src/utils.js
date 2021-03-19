import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

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
	// if (Date.now() >= localStorage.account_expToken * 1000) {
	// 	const data = {
	// 		"accessToken": localStorage.account_accessToken,
	// 		"refreshToken": localStorage.account_refreshToken
	// 	};
	// 	const res = axiosInstance.post('/auth/refresh', data);
	// 	if (res.status === 200) {
	// 		localStorage.account_accessToken = res.accessToken;
	// 		localStorage.account_expToken = parseJwt(res.accessToken).exp;
	// 		return res.accessToken;
	// 	}
	// }
	const data = {
		"accessToken": localStorage.account_accessToken,
		"refreshToken": localStorage.account_refreshToken
	};
	const res = axiosInstance.post('/auth/refresh', data);
	if (res.status === 200) {
		localStorage.account_accessToken = res.accessToken;
		localStorage.account_expToken = parseJwt(res.accessToken).exp;
		return res.accessToken;
	}
	return Promise.resolve();
};

// Function that will be called to refresh authorization
const data = {
	"accessToken": localStorage.account_accessToken,
	"refreshToken": localStorage.account_refreshToken
};
const refreshAuthLogic = failedRequest => axiosInstance.post('/auth/refresh', data).then(res => {
	localStorage.account_accessToken = res.accessToken;
	localStorage.account_expToken = parseJwt(res.accessToken).exp;
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + res.accessToken;
    return Promise.resolve();
});

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

// axiosInstance.interceptors.response.use((response) => {
// 	return response
//   }, async function (error) {
// 	const originalRequest = error.config;
// 	if (error.response.status === 401 && !originalRequest._retry) {
// 	  originalRequest._retry = true;
// 	  const access_token = await refreshToken();            
// 	  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
// 	  return axiosInstance(originalRequest);
// 	}
// 	return Promise.reject(error);
//   });

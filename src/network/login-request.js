import axios from 'axios'

//
export default function loginRequest(config) {
	const instance = axios.create({
		//基本配置
		baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
		method: 'POST',
		// timeout: 500
	});

//请求拦截
	instance.interceptors.request.use(config => {
		//添加请求头
		config.headers.Authorization = window.sessionStorage.getItem('token');
		console.log(config);
		// 1.比如config中的一些信息不符合服务器的要求

		// 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标

		// 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
		return config;
	},error => {
		console.log(error);
	});

	//响应拦截
	instance.interceptors.response.use(res => {
		// return res.data;  //返回请求响应的数据部分
		return res;  //返回所有响应数据
	},error => {
		console.log(error);
	});

	//发送真正的网络请求
	return instance(config);
}
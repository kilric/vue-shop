import axios from 'axios'

export default function request(config) {
	const instance = axios.create({
		baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
	});

	instance.interceptors.request.use(config => {
		//添加请求头
		config.headers.Authorization = window.sessionStorage.getItem('token');
		// console.log(window.sessionStorage.getItem('token') + "请求头");
		return config;
	},error => {
		console.log(error);
	});
	// 真正的网络请求
	// 返回一个Promise
	return instance(config)
}
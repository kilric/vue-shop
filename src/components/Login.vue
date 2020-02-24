<template>
	<div class="login-container">
		<div class="login-box">
			<div class="avatar-box">
				<img src="../assets/logo.png" alt="">
			</div>
<!--登陆表单-->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login-form">
<!--				用户名 prop是绑定验证规则-->
				<el-form-item label="" prop="username">
					<el-input ref="userInput" v-model="loginForm.username" prefix-icon="iconfont icon-user"
					          placeholder="请输入用户名" clearable/>
				</el-form-item>
<!--				密码-->
				<el-form-item label="" prop="password">
					<el-input ref="pwdInput" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
					          type="password" placeholder="请输入密码" clearable />
				</el-form-item>
<!--				按钮-->
				<div class="btns">
					<el-button type="primary" @click="login">登录</el-button>
<!--					<el-button type="info" @click="resetLoginForm('loginForm')">清空</el-button>-->
					<el-button type="info" @click="resetLoginForm">清空</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import loginRequest from "../network/login-request";
	export default {
		name: "Login",
		data(){
			return {
				//绑定数据
				loginForm: {
					username:'admin',
					password:'123456'
				},
				//验证规则
				loginRules: {
					username: [
						{required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						{min: 6, max:16,message:'长度在6到16个字符',trigger: 'blur'}
					]
				}
			}
		},
		methods:{
			resetLoginForm(){
				// 两种方法
				// resetLoginForm(formName){
				// this.$refs[formName].resetField();
				// console.log(this);
				this.$refs.loginFormRef.resetFields();
			},
			//登录之前做表单预验证
			login(){
				this.$refs.loginFormRef.validate(async valid => {
					if (valid) {
						// console.log('有效');

						//解构出响应data中的data,重命名为res
						// 第一种
						const {data:res} = await loginRequest({
							url: '/login',
							data: this.loginForm
						});

						if (res.meta.status !== 200){

							// this.$message({
							// 	showClose: true,
							// 	message: '登录失败，请重新登录',
							// 	type: 'error',
							// 	duration: 1500
							// });

							// 方式二调用
							this.$message.error('登录失败！');

						}else{
							this.$message({
								showClose: true,
								message: '登录成功',
								type: 'success',
								// 文字是否居中
								center: true,
								// 显示时长1500ms
								duration: 1500
							});

							window.sessionStorage.setItem('token',res.data.token);
							await this.$router.push('/home');
						}

						//第二种
						// loginRequest({
						// 	url:'login',
						// 	data:this.loginForm
						// }).then(res => {
						// 	console.log(res);
						// }).then(data => {
						//
						// 	console.log(data);
						// }).catch(err => {
						// 	console.log(err);
						// })
						// console.log(res);
					}else{
						console.log('无效');
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
.login-container{
	height: 100%;
	background-color: #2b4b6b;

	.login-box {
		width: 450px;
		height: 300px;
		border-radius: 3px;
		background-color: #fff;

		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);

		.login-form {
			position: absolute;
			bottom: 18px;
			width: 100%;
			padding: 0 30px;
			box-sizing: border-box;
		}
		.btns {
			display: flex;
			justify-content: flex-end;
		}

	}
	.avatar-box {
		width: 120px;
		height: 120px;
		border: #eee 1px solid;
		background-color: #fff;
		border-radius: 50%;

		position: absolute;
		left: 50%;
		transform: translate(-50%,-50%);
		box-shadow: 0 0 10px #dddddd;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}


}
</style>
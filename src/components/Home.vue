<template>
	<el-container>
		<!--		页面头部区域-->
		<el-header>
			<div class="logo">
				<img src="../assets/img/logo.png" alt="logo">
				<span>电商后台管理系统</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>

		<el-container>
			<!--			侧边栏-->
			<el-aside :width="isCollapsed ? '65px' : '200px'">
<!--				折叠菜单按钮   -->
				<div class="toggle-button" @click="collapseMenu">|||</div>
				<el-menu
					:unique-opened="true"
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409eff"
					:collapse="isCollapsed"
					:collapse-transition="false"
				>
					<!--					导航   -->
					<el-submenu v-for="menuItem in menuList"  :index="menuItem.id +''" :key="menuItem.id">
						<template slot="title">
							<i :class="iconObj[menuItem.id]"/>
							<span>{{menuItem.authName}}</span>
						</template>
					<!--  菜单项  -->
						<el-menu-item v-for="item in menuItem.children" :index="item.id +''" :key="item.id">
							<template slot="title">
								<i class="el-icon-menu"/>
								<span>{{item.authName}}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<!--			内容区域       -->
			<el-main>

			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import request from "../network/other-request";

	export default {
		name: "Home",
		//定义生命周期函数，加载的时候就请求菜单数据
		async created() {
			this.getMenuList();
		},
		data() {
			return {
				menuList: [],
				iconObj:{
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao'
				},
				isCollapsed: false
			}
		},
		methods: {
			logout() {
				window.sessionStorage.clear();
				this.$router.replace('/');
			},
			async getMenuList(){
				//解构赋值，将响应结果中的data抽出来并重命名为res
				const {data: res} = await request({
					url: '/menus',
					method: 'GET'
				});
				if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
				console.log(res.data);
				this.menuList = res.data;
			},
			collapseMenu(){
				this.isCollapsed = !this.isCollapsed;
			}
		}
	}
</script>

<style scoped lang="less">

	.el-container {
		height: 100%;

		.el-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #373d41;
			padding-left: 2px;

			.logo {
				display: flex;
				justify-content: left;
				align-items: center;

				> img {
					width: 21%;
					height: 21%;
					border-radius: 50%;
				}

				> span {
					margin-left: 8px;
					font-size: 22px;
					font-weight: 400;
					color: #fff;
				}
			}

		}

		.el-aside {
			background-color: #333744;
			.toggle-button {
				background-color: #4a5064;
				font-size: 14px;
				color: #dddddd;
				text-align: center;
				line-height: 28px;
				cursor: pointer;
			}
			//取消右边的边框，不让其突出
			.el-menu {
				border: none;
			}
		}

		.el-main {
			background-color: #eaedf1;
		}
	}
</style>
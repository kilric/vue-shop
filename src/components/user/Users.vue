<template>
	<div>
		<!--		面包屑导航    -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!--		卡片视图  -->
		<el-card>
			<!--  搜索框部分  -->
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input placeholder="请输入内容" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"/>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary">添加用户</el-button>
				</el-col>
			</el-row>
			<el-table
				:data="users"
				stripe
				border
				style="width: 100%">
				<el-table-column type="index" label="编号" width="50"/>
				<el-table-column prop="username" label="用户名" width="180"/>
				<el-table-column label="角色" prop="role_name" width="180"/>
				<el-table-column prop="email" label="邮箱" width="180"/>
				<el-table-column prop="mobile" label="手机号码" width="180"/>
				<el-table-column prop="mg_state" label="状态" width="180">
					<!--					作用域插槽   -->
					<!--					<template slot-scope="scope">-->
					<!--						<el-switch-->
					<!--							v-model="scope.row.mg_state"-->
					<!--							active-color="#13ce66"-->
					<!--							inactive-color="#ff4949">-->
					<!--						</el-switch>-->
					<!--					</template>-->
					<template v-slot="slotProps">
						<el-switch v-model="slotProps.row.mg_state"
						           @change="switchChange(slotProps.row)"
						           :active-value="true"
						           :inactive-value="false"
						           active-color="#13ce66"
						           inactive-color="#ff4949"/>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<el-button type="primary" icon="el-icon-edit" size="mini"/>
					<el-button type="danger" icon="el-icon-delete" size="mini"/>
					<el-tooltip effect="dark" content="设置角色" placement="top-start" :enterable="false">
						<el-button type="warning " icon="el-icon-setting" size="mini"/>
					</el-tooltip>
				</el-table-column>
			</el-table>

			<!--			分页    -->
			<div class="page">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="queryParams.pagenum"
					:page-sizes="[5, 10, 15, 20]"
					:page-size="queryParams.pagesize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</div>
		</el-card>

	</div>
</template>

<script>
	import request from "../../network/other-request";

	export default {
		name: "Users",
		data() {
			return {
				users: [],
				queryParams: {
					'query': '',
					// 页数
					'pagenum': 1,
					// 每页展示的条数
					'pagesize': 5
				},
				total: 0,
			}
		},
		// 生命周期函数
		created() {
			// 创建的时候获取用户列表
			this.getUserList();
		},
		methods: {
			async getUserList() {
				const {data: res} = await request({
					url: 'users',
					method: 'GET',
					params: this.queryParams
				});
				if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
				// 将数据保存到组件
				this.users = res.data.users;
				this.total = res.data.total;
				console.log(res);
			},
			// 每页展示的数据发生变化时
			handleSizeChange(newSize){
				this.queryParams.pagesize = newSize;
				//获取新的数据
				this.getUserList();
			},
			// 页数发生改变时
			handleCurrentChange(newPage){
				this.queryParams.pagenum = newPage;
				// 获取新的数据
				this.getUserList();
			},
			// 开关改变的时候
			async switchChange(rowInfo){
				// console.log(rowInfo);
				const {data : res} = await request({
					url: 'users/' + rowInfo.id + '/state/' + rowInfo.mg_state,
					method: 'PUT',
				});
				console.log(res);
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-breadcrumb {
		margin-bottom: 15px;
		font-size: 16px;
	}

	.el-card {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;

		.el-table {
			margin-top: 15px;
		}
		.page {
			margin-top: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

</style>
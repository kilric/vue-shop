<template>
	<div>
		<el-button type="info" @click="logout" plain>退出</el-button>
	</div>
</template>

<script>
	export default {
		name: "Home",
		methods: {
			logout(){
				window.sessionStorage.clear();
				this.$router.replace('/');
			}
		}
	}
</script>

<style scoped>

</style>
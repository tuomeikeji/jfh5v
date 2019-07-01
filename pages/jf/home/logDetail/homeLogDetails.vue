<!-- 首页积分列表::日志详情 -->
<template>
	<detail :options="options" />
</template>

<script>
	import detail from '@/components/details/details.vue'
	 export default {
		components: {
			detail
		},
		 data() {
		    return {
				options: {}
			}
		},
		onLoad(options) {
			console.log('首页积分列表::日志详情',options)
			this.options = options
		}
	}
</script>

<style>
</style>

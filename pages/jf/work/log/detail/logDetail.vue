<!--工作台::申请日志::日志详情 --> 
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
			console.log('工作台::申请日志::日志详情',options)
			this.options = options
		}
	}
</script>

<style>
</style>

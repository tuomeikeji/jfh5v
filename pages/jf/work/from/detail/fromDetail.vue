<!--工作台::我发起的::日志详情  可以撤销 --> 
<template>
	<detail :options="options" :from="true" />
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
			console.log('工作台::待我审批::日志详情',options)
			this.options = options
		}
	}
</script>

<style>
</style>

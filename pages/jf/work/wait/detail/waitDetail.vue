<!--工作台::待我审批::日志详情  可以审批通过，不通过--> 
<template>
	<detail :options="options" :showSteps="false"/>
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

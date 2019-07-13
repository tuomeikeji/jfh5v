<template>
	<view class="page">
		<view class="item">
		  <view class="item-title">抢单任务(限制人数)</view>
		  <view class="item-content">抢单任务需要设置限制人数和任务分值，设置成功后会从您当前的可用积分中扣除人数×分值的积分</view>
		  <view class="item-button">
			<button size="mini" type="warn" @click="publish(0)">发布</button>
		  </view>
		</view>
		<view class="item">
		  <view class="item-title">挑战任务(限制人数和截止时间)</view>
		  <view class="item-content">挑战任务需要设置限制截止时间、人数和任务分值，设置成功后会从您当前的可用积分中扣除人数×分值的积分</view>
		  <view class="item-button">
			<button size="mini" type="warn" @click="publish(1)">发布</button>
		  </view>
		</view>
		<view class="item">
		  <view class="item-title">日常任务(无限制)</view>
		  <view class="item-content">日常任务需要设置任务分值，设置成功后会从您当前的可用积分中扣除人数×分值的积分</view>
		  <view class="item-button">
			<button size="mini" type="warn" @click="publish(2)">发布</button>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			publish(i){
				switch (i){
					case 0:
						uni.navigateTo({url: '/pages/jf/publish/rush/rush'})
					break;
					case 1:
						uni.navigateTo({url: '/pages/jf/publish/time/time'})
					break;
					case 2:
						uni.navigateTo({url: '/pages/jf/publish/daily/daily'})
					break;
				}
			}
		}
	}
</script>

<style>
	.page{padding: 24upx;}
	.item{
	  padding: 24upx;
	  height: 280upx;
	  background: #5dceba;
	  color: #f6fdff;
	  border-radius: 8upx;
	  margin-bottom: 28upx;
	  position: relative;
	}
	.item-title{
		font-size: 32upx;
		margin-bottom: 24upx;
	}
	.item-button{
		position: absolute;
		bottom: 24upx;
		right: 24upx;
	}
</style>

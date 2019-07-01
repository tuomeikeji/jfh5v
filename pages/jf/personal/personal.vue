<!-- 个人中心 -->
<template>
	<view class="uni-page-body">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image v-if="showImg" :src="userData.avatar ? userData.avatar : '/static/img/default_user_icon.png'"></image>
					</view>
					<view class="uni-media-list-body" style="position: relative;">
						<view>
							<view class="uni-title">{{userData.name}}</view> 
							<view class="uni-text" style="padding-bottom: 10upx;">{{userData.deptName}}·{{userData.postName}}</view>
							<view class="uni-text-small"><text style="padding-right: 80upx;">积分：{{userData.amount}} 分</text><text>基础积分：{{userData.base}} 分</text></view>
						</view>
						<view class="editIcon">
							<uni-icon type="compose" color="#8f8f94" size="35" @click="gotoEdit" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<button @click="logout" type="primary" class="button-form">退出登录</button>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data(){
			return {
				showImg:true,
				userData:{}
			}
		},
		onShow(){
			this.getUserData();
		},
		methods:{
			getUserData(){
				uni.showLoading({title: '加载中...'});
				uni.request({
				  url: this.GLOBAL.domain + '/personal/indexHead',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  success: (res) => {
					console.log('success_/personal/indexHead----', res);
					this.GLOBAL.successHttp(res);
					this.userData = res.data.data;
					
				  },
				  fail: (res) => {
					console.log('fail/personal/indexHead---', res)
					this.GLOBAL.failHttp(res);
				  },
				  complete: () => {
					uni.hideLoading();
				  }
				});
			},
			drawEchart(){
				// /personal/indexEcharts
			},
			logout(){
				uni.showLoading({title: '退出中...'});
				uni.removeStorage({
					key: 'USERS_KEY',
					success: function (res) {
						console.log('logout===');
						uni.hideLoading();
						uni.reLaunch({
						  url: '/pages/jf/login/login'
						})
					}
				});
			},
			gotoEdit(){
				uni.navigateTo({
					url:"/pages/jf/personal/changeAvatar/changeAvatar"
				})
			}
		}
	}
</script>

<style>
	.editIcon{
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
<!-- 
*1、/user/logout 没有了？
* 2、/personal/indexHeadBaseIntegral 个人基础积分 在 /personal/indexHead接口中就有
* 
*   -->
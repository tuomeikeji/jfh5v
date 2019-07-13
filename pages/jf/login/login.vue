<template>
    <view class="content" :style="'height:'+winH+'px;'">
		<h2>积分平台</h2>
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input class="m-input" type="tel" clearable focus v-model="phone" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row">
                <text class="title">密码：</text>
                <m-input type="password" displayable clearable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>
    </view>
</template>

<script>
    import mInput from '@/components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                phone: '', 
                password: '',
				winH:''
            }
        },
		onShow(){
			this.autoLogin();
			this.getSystemInfoPage()
		},
        methods: {
            bindLogin() {
				var that = this;
				uni.showLoading({
					mask:true,
					title:"登陆中..."
				})
                that.axios({
					url:that.GLOBAL.domain+'/user/login',
					method:'POST',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:that.$qs.stringify({
						phone:that.phone,
						password:that.password
					})
				})
				.then((res)=>{
					 console.log('success_/user/login===',res);
					 that.GLOBAL.successHttp(res);
					 if (res.data.code == 0) {
						var level = res.data.msg.split('=')[0]; 
						var id = res.data.msg.split('=')[1]; 
						
						that.GLOBAL.setUserLevel(level);
						that.GLOBAL.setUserId(id);
						
						uni.setStorage({
							key:'USERS_KEY',
							data:{
								phone:that.phone,
								password:that.password,
								level:level,
								id:id
							},
							success() {
								uni.switchTab({
									url: '/pages/jf/home/home'
								});
							}
						})
					 } else {
					   uni.showModal({
						content: res.data.msg,
						showCancel: false,
						confirmText: '确定',
					   })
					 }
					 
					uni.hideLoading();
				})
				.catch((res)=>{
					 console.log('fail_/user/login===',res)
					 that.GLOBAL.failHttp(res); 
				})
            },
			autoLogin(){
				const _this = this;
				uni.getStorage({
					key:'USERS_KEY',
					success(res) {
						console.log("getStorage----", res);
						if(res.data){
							_this.phone = res.data.phone;
							_this.password = res.data.password;
							
							uni.showLoading({
								mask:true,
								title:"登陆中..."
							})
							_this.axios({
								url:_this.GLOBAL.domain+'/user/login',
								method:'POST',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:_this.$qs.stringify({
									phone:_this.phone,
									password:_this.password
								})
							})
							.then((res)=>{
								 console.log('success_/user/login===',res);
								 _this.GLOBAL.successHttp(res);
								 if (res.data.code == 0) {
									var level = res.data.msg.split('=')[0]; 
									var id = res.data.msg.split('=')[1]; 
									
									_this.GLOBAL.setUserLevel(level);
									_this.GLOBAL.setUserId(id);
									
									uni.setStorage({
										key:'USERS_KEY',
										data:{
											phone:_this.phone,
											password:_this.password,
											level:level,
											id:id
										},
										success() {
											uni.switchTab({
												url: '/pages/jf/home/home'
											});
										}
									})
								 } else {
								   uni.showModal({
									content: res.data.msg,
									showCancel: false,
									confirmText: '确定',
								   })
								 }
								 
								uni.hideLoading();
							})
							.catch((res)=>{
								 console.log('fail_/user/login===',res)
								 _this.GLOBAL.failHttp(res); 
							})
						}
					},
					fail(res){
						//没有找到storage
					}
				})
			},
            getSystemInfoPage() {
            	uni.getSystemInfo({
            	  success: (res) => {
            		this.winH=res.windowHeight
            	  }
            	})
            }
        }
    }
</script>

<style>
	h2{
		font-size: 75upx;
		text-align: center;
		/* font-weight:500; */
		color:#4D96F5;
		/* color:#333; */
		padding-top:120upx;
	}
    /* .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    } */

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
		padding:20upx 30upx;
	}
	.input-group {
		background-color: #ffffff;
		margin-top: 100upx;
		position: relative;
	}
	
	
	
	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}
	
	.input-row .title {
		width: 20%;
		/* height: 50upx; */
		/* min-height: 50upx; */
		padding: 30upx 0;
		padding-left: 30upx;
		font-size: 30upx;
		/* line-height: 50upx; */
	}
	
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}
	
	button.primary {
		margin-top: 30upx;
		background-color: #4D96F5;
	}
</style>
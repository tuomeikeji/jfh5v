<!-- 商城详情 -->
<template>
	<view class="page">
		<uni-swiper-dot :info="info" :current='current' :dots-styles="dotsStyles" mode="default">
			<swiper class="swiper-box">
				<swiper-item v-for="(item ,index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="pro_desc">
			<view class="uni-title">{{details.goodName}}</view>
			<view class="flex-space-between"><text class="uni-text" style="color:#DD4F43;">{{details.dhIntegral}}分</text><text class="uni-text">剩余{{details.goodKc}}件</text><text class="uni-text">已兑换{{details.ydhNum ? details.ydhNum : 0}}件</text></view>
		</view>
		<view class="numberBox">
			<text style="font-size: 32upx;">兑换数量：</text><text><uni-number-box :min="1" @change="change"/></text>
		</view>
		<view style="padding: 24upx 30upx;">
			<view class="uni-title">商品详情</view>
			<view style="height: 300px;">{{details.goodDetails}}</view>
		</view>
		<button type="primary" @click="confirmFun" class="dhBtn" :loading="loading" :disabled="disabled">确认兑换</button>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default{
		components: {
			uniSwiperDot,
			uniNumberBox
		},
		data(){
			return{
				details:{},
				number:0,//兑换数量
				//轮播图配置
				info:[],
				current:0,
				dotsStyles:{
					backgroundColor: 'rgba(255, 90, 95,0.3)',
					border: '1px rgba(255, 90, 95,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
					selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
				},
				
				loading:false,//提交按钮
				disabled:false,
				
				userScore:''
			}
		},
		onLoad(options) {
			console.log("上一页数据:",options);
			
			this.userScore = options.userScore;
			
			this.axios({
				//获取商品详情数据
			  url: this.GLOBAL.domain + '/integralGoods/selectIntegralGoodsDetail/'+options.goodId,
			  method: 'GET',
			  dataType: 'json',
			  header:{
			  	'content-type':'application/x-www-form-urlencoded'
			  }
			})
			
			.then((res)=>{
				console.log('success_商品详情----', res);
				this.GLOBAL.successHttp(res);
				
				this.details = res.data.data;
				
				var goodLbImgArr = this.details.goodLbImg.split(",");
				for(var i=0; i<goodLbImgArr.length;i++){
					this.info.push({'url':goodLbImgArr[i]})
				}
				console.log("轮播图info--",this.info) 
			})
			.catch((res)=>{
				console.log('fail_商品详情---', res)
				this.GLOBAL.failHttp(res);  
			})
		},
		methods:{
			change(value){
				//数字输入框发生变化时
				console.log("数字输入框:",value);
				this.number = value;
			},
			confirmFun(){
				let that = this;
				//确认兑换
				if(that.details.goodKc <= 0 || that.details.goodKc < that.number){
					//库存不足
					uni.showModal({
						content:"此商品库存不足",
						showCancel:false,
					});
					return false;
				}
				if(that.details.dhIntegral * that.number > that.userScore){
					//积分不足
					uni.showModal({
						content:"您的积分不足",
						showCancel:false,
					});
					return false;
				}
				
				uni.showModal({
					content:"确定要兑换"+that.number+"件"+that.details.goodName+"吗？",
					success(res) {
						if (res.confirm) {
							uni.showLoading({title: '加载中...',mask:true});
							that.disabled = true;
							that.loading = true;
							
							that.axios({
								//兑换商品成功
							  url: that.GLOBAL.domain + '/integralGoods/selectIntegralAddGoods/'+that.number,
							  method: 'POST',
							  dataType: 'json',
							  header:{
								'content-type':'application/x-www-form-urlencoded'
							  },
							  data: that.$qs.stringify({
								goodId: that.details.goodId
							  })
							})
							.then((res)=>{
								console.log('success_兑换商品----', res)
								uni.showModal({
									content:"兑换成功",
									showCancel:false,
									success() {
										uni.navigateBack(); 
									}
								});
								
								that.disabled = false;
								that.loading = false;
								uni.hideLoading();
							})
							.catch((res)=>{
								console.log('fail_兑换商品---', res);
								that.GLOBAL.failHttp(res); 
								 
								that.disabled = false;
								that.loading = false;
								uni.hideLoading();
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	.swiper-box {
		height: 400upx;
	}
	
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	.active {
		border: 1px #000 solid;
	}
	
	slider {
		width: 100%;
	}
	
	.numberBox{
		padding: 24upx 30upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.dhBtn{
		position: fixed;
		bottom: 0upx;
		width: 100%;
		border-radius: 0;
		-webkit-border-radius: 0;
	}
	.pro_desc{
		padding: 0 30upx 24upx 30upx;
		border-bottom: 1px solid #EEEEEE;
	}
		
</style>

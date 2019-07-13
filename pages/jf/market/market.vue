<!-- 积分商城 -->
<template>
	<view class="page">
		<view class="topImage" v-show="topImage.length>0">
			<image :src="topImage" mode="aspectFill"/>
		</view>
		<uni-list>
			<uni-list-item :show-badge="true" badge-text="兑换记录" :title="'可用积分：'+userScore+'分'" @click="toLogs"/>
		</uni-list>
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-product-list" v-if="productList.length>0">
				<block v-for="(product,index) in productList" :key="index">
					<view class="uni-product" @click="toDetail(product)">
						<view class="image-view">
							<image class="uni-product-image" :src="product.goodImg" mode="aspectFit"></image>
						</view>
						<view class="uni-product-title">{{product.goodName}}</view>
						<view class="uni-product-price">
							<text class="uni-product-price-original">{{product.dhIntegral}}积分</text>
							<text class="uni-product-tip">兑换</text>
						</view>
					</view>
				</block>
			</view>
			<view v-else class="uni-noData-txt">暂无数据</view>
			<view class="uni-noMore-txt" v-if="productList.length>0 && !hasNextPage">无更多数据</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
	    data() {
	        return {
				productList: [],
				
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				winH:'',
				topImage: '', //顶部banner图
				
				userScore:0 //用户可用积分
	        };
	    },
		onShow() {
			this.pullDown();
			
			this.getTopImage();
			this.getUserScore();
		},
		onLoad() {
			this.getSystemInfoPage()
		},
		onPullDownRefresh() {
			this.pullDown();
		},
	    methods: {
	        loadProductList() {
	            uni.showLoading({title: '加载中...'});
	            this.axios({
	              url: this.GLOBAL.domain + '/integralGoods/selectIntegralGoodsList',
	              method: 'POST',
	              dataType: 'json',
	              header:{
	            	'content-type':'application/x-www-form-urlencoded'
	              },
	              data: this.$qs.stringify({
	            	pageSize: this.pageSize,
	            	pageNum: this.currentPage,
	              })
				})
				
				.then((res)=>{
					console.log('success_GoodsList----', res);
	            	this.GLOBAL.successHttp(res);
					
	            	if (res.data.code == 0) {
	            		console.log("load page 第" + (this.currentPage) +"页");
	            		let list = res.data.data.list;
	            		this.productList = this.isFirstPage ? list : this.productList.concat(list);
	            		this.isFirstPage = false;
	            		this.currentPage += 1;
	            		this.hasNextPage = res.data.data.hasNextPage
	            	} 
					
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
				.catch((res)=>{
					console.log('fail_GoodsList---', res);
					this.GLOBAL.failHttp(res); 
					 
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
			},
			lower(){
				 //滑到底端触发的函数
				 this.loadProductList()
			},
			pullDown(){
				 //下拉刷新触发的函数
				 this.currentPage = 1;
				 this.productList=[];
				 this.loadProductList();
			},
			getSystemInfoPage() {
				
				uni.getSystemInfo({
				  success: (res) => {
					this.winH= res.windowHeight
				  }
				})
			},
			getTopImage(){
				//获取顶部banner图
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/home/picture',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					location: 2//location 0:首页，1:工作台，2：积分商城
				  })
				})
				
				.then((res)=>{
					console.log('success_TopImage----', res);
					this.GLOBAL.successHttp(res);
					if(res.data.data.list.length > 0){
						this.topImage = res.data.data.list[0].picUrl
					} 
					
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log('failTopImage---', res);
					this.GLOBAL.failHttp(res);  
					
					uni.hideLoading();
				})
			},
			getUserScore(){
				//获取用户可用积分
				this.axios({
				  url: this.GLOBAL.domain + '/integralGoods/selectIntegralGoodsKYIntegral',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_用户可用积分----', res);
					this.GLOBAL.successHttp(res);
					this.userScore = res.data.data; 
				})
				.catch((res)=>{
					console.log('fail_用户可用积分---', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			toDetail(item){
				//跳转到详情页
				var goodId = item.goodId;
				var userScore = this.userScore;
				uni.navigateTo({
					url:'/pages/jf/market/detail/marketDetail?goodId='+goodId+'&userScore='+userScore+''
				})
				
			},
			toLogs(){
				uni.navigateTo({
					url:'/pages/jf/market/log/log'
				})
			}
		}
	}
</script>

<style>
	.uni-badge{
		font-size: 48upx;
	}
</style>

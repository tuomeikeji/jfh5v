<!-- 首页 -->
<template>
	<view class="uni-page-body" style="padding-bottom: 0;">
	  <view class="topImage" v-show="topImage.length>0">
		<image :src="topImage" mode="aspectFill"/>
	  </view>
	  <!-- 跳转到点赞详情 -->
	  <!-- <uni-list style="margin-top: 20upx;">
	  	<uni-list-item @click="likeTo" title="查看点赞详情" thumb='../../../static/img/likeIcon.png'/>
	  </uni-list> -->
	   <!-- 今日积分排名 -->
	  	<uni-card title="今日积分排名" thumbnail='/static/img/homeRank.png'>
			<view class="content-main">
			  <view class="number">
				<text class="number-amount">{{rank.rank == null ? '0' : rank.rank}}</text>
				<text class="number-text">排名</text>
			  </view>
			  <view class="number">
				<text class="number-amount">{{rank.amount == null ? '0' : rank.amount}}</text>
				<text class="number-text">今日积分</text>
			  </view>
			</view>
			
			<uni-list>
				<uni-list-item @click="rankTo" :title="first.userName ? first.userName+'获得今日积分冠军' : '暂无人获得今日积分冠军'" :thumb="first.userImg ? first.userImg : '/static/img/default_user_icon.png'" />
			</uni-list>
	  	</uni-card>
		
		<!-- 积分动态列表 -->
		<uni-card title="积分动态" thumbnail='/static/img/menu.png'>
			<scroll-view scroll-y="true" @scrolltolower="lower" style="height:960upx;">
				<view class="uni-list" v-if="listData.length>0">
				    <block v-for="(item,index) in listData" :key="index">
				        <view class="uni-list-cell">
							<view class="uni-media-list" @click="onItemClick(item,index)">
								<view class="uni-media-list-logo">
									<image :src="item.userImg ? item.userImg : '/static/img/default_user_icon.png'"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-title">{{item.userName}}
										<view v-if="item.sqIntegral > 0" class="uni-text-blue">
											+{{item.sqIntegral}}    {{item.integralTypeId == '1' ? '品德A分' : (item.integralTypeId == '2' ? '业绩B分' : (item.integralTypeId == '3' ? '行为C分' : (item.integralTypeId == '4' ? '管理奖扣分' : (item.integralTypeId == '5' ? '自由奖励扣分' : (item.integralTypeId == '6' ? '点赞分' : (item.integralTypeId == '7' ? '悬赏任务分' :(item.integralTypeId == '8' ? '积分支票' :(item.integralTypeId == '9' ? '水平考核' :''))))))))}}
										</view>
										<view v-else class="uni-text-blue">
											-{{item.kIntegral}}    {{item.integralTypeId == '1' ? '品德A分' : (item.integralTypeId == '2' ? '业绩B分' : (item.integralTypeId == '3' ? '行为C分' : (item.integralTypeId == '4' ? '管理奖扣分' : (item.integralTypeId == '5' ? '自由奖励扣分' : (item.integralTypeId == '6' ? '点赞分' : (item.integralTypeId == '7' ? '悬赏任务分' : (item.integralTypeId == '8' ? '积分支票' :(item.integralTypeId == '9' ? '水平考核' :''))))))))}}
										</view>
									</view> 
									<view class="uni-text">{{item.approvalTitle}}</view>
									<!-- <view class="uni-text-small">{{item.approvalContent}}</view> -->
									<view class="uni-text-small">{{item.spTime}}</view>
								</view>
							</view>
				        </view>
				    </block>
				</view>
				<view v-else class="uni-noData-txt">暂无数据</view>
				<view class="uni-noMore-txt" v-if="listData.length>0 && !hasNextPage">无更多数据</view>
			</scroll-view>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	 export default {
		 components: {
		 	uniCard,
			uniList,
			uniListItem,
		 },
		 data() {
		     return {
		         topImage: '', //顶部banner图
				 rank:{}, //积分排名获取的参数 /home/index接口 
				 first:{} ,//同上
				 
				 listData: [], //首页积分动态列表 /home/list接口
				 pageSize:10,
				 currentPage:1,
				 isFirstPage: true,
				 hasNextPage:true
		     }
		 },
		 onPullDownRefresh() {
		 	this.pullDown();
		 },
		 onShow(){
			this.getTopImage();
			this.getRank();
			this.getList();
		 },
		 methods:{
			getTopImage(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain +'/home/picture',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  data:this.$qs.stringify({
					location: 0 //location 0:首页，1:工作台，2：积分商城
				  })
				})
				.then((res)=>{
					console.log('success_HomeTopImage----', res);
					this.GLOBAL.successHttp(res);
					if(res.data.data.list.length > 0){
						this.topImage = res.data.data.list[0].picUrl
					}
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log('failHomeTopImage---', res)
					this.GLOBAL.failHttp(res);
				})
			},
			getRank(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/home/index',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
				  console.log('success_/home/index----', res);
				  this.GLOBAL.successHttp(res);
				  
				  this.rank = res.data.data;
				  this.first = res.data.data;
				  
				  uni.hideLoading();
				})
				.catch((res)=>{
				  console.log('fail_/home/index---', res)
				  this.GLOBAL.failHttp(res);
				})
			},
			
			getList(){
				uni.showLoading({title: '加载中...'});
				
				this.axios({
					  url: this.GLOBAL.domain + '/home/list',
					  method: 'POST',
					  dataType: 'json',
					  header:{
						'content-type':'application/x-www-form-urlencoded'
					  },
					  data: this.$qs.stringify({
						pageSize: this.pageSize,
						pageNum: this.currentPage,
						userId: ''//如果为空 同部门全员日志;不为空 个人排名日志
					  })
				})
				 .then((res)=>{
					  console.log('success_/home/list----', res);
					  this.GLOBAL.successHttp(res);
					  
					  console.log("load page 第" + (this.currentPage) +"页");
					  let list = res.data.data.list;
					  this.listData = this.isFirstPage ? list : this.listData.concat(list);
					  this.isFirstPage = false;
					  this.currentPage += 1;
					  this.hasNextPage = res.data.data.hasNextPage;
					  console.log("数据list:" + (this.listData.length) +"条");
					  
					  uni.hideLoading();
				  })
				  .catch((res)=>{
					  console.log('fail_/home/list----', res);
					  this.GLOBAL.failHttp(res);
				  })
			},
			
			lower(){
				this.getList();
			},
			pullDown(){
				 //下拉刷新触发的函数
				 this.currentPage = 1;
				 this.listData=[];
				 this.getList();
			},
			// likeTo(){
			// 	uni.navigateTo({
			// 		url: '/pages/jf/like/like'
			// 	});
			// },
			onItemClick(item,index){
				var approvalId = this.listData[index].approvalId
				console.log('list点击', approvalId)
				uni.navigateTo({ url: 'logDetail/homeLogDetails?approvalId='+approvalId+'' })
			},
			rankTo(){
				uni.switchTab({
					url: '/pages/jf/rank/rank'
				});
			}
		 }
	 }
</script>

<style>
	/* 今日积分排名card 自写样式*/
	.content-main {
	  display: flex;
	  height: 180upx;
	  position: relative;
	}

	.content-main .number {
	  flex: 1;
	}
	.content-main .number .number-amount, .content-main .number .number-text {
	  display: inline-block;
	  width: 100%;
	  text-align: center;
	}

	.content-main .number .number-amount {
	  line-height: 120upx;
	  font-size: 60upx;
	  color: #4d96f5;
	}

	.content-main .number .number-text {
	  color: #999;
	}
	
	/* 积分动态card 覆盖uni.css*/
	.uni-media-list{
		align-items: center;
	}
	.uni-title{
		width: 100%; display: flex; justify-content:space-between;
	}
</style>
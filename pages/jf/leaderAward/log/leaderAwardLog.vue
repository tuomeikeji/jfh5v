<!--管理奖扣日志-->
<template>
	<view class="uni-page-body">
		<mSearch @search="search($event)" button="inside" placeholder="请输入您想搜索的人名"></mSearch>
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="listData.length>0">
				<block v-for="(item,index) in listData" :key="index">
					<view class="uni-list-cell">
						<view class="uni-media-list" @click="onItemClick(item,index)">
							<view class="uni-media-list-logo">
								<image :src="item.userImg ? item.userImg : '/static/img/default_user_icon.png'"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="flex-space-between">
									<text class="uni-title">{{item.userName}}</text>
									<text class="uni-title" style="color: #4d96f5;">{{item.sqIntegral>0 ? '+' : '-'}}  {{item.sqIntegral>0?item.sqIntegral:item.kIntegral}}管理奖扣分</text>
								</view> 
								<view class="uni-text">{{item.approvalTitle}}</view>
								<!-- <view class="uni-text">{{item.approvalContent}}</view> -->
								<text class="uni-text-small">{{item.spTime}}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-else class="uni-noData-txt">暂无数据</view>
			<view class="uni-noMore-txt" v-if="listData.length>0 && !hasNextPage">无更多数据</view>
		</scroll-view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue'

	export default {
		components: {
			mSearch
		},
		data() {
		    return {
				listData: [], 
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				
				searchString:''
			}
		},
		onShow(){
			this.pullDown();
		},
		onLoad() {
			this.getSystemInfoPage();
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			 getList(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/Award/AwardController',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					userName:this.searchString
				  })
				})
				
				.then((res)=>{
					console.log('success_/work/AwardController_奖扣日志列表----', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						console.log("load page 第" + (this.currentPage) +"页");
						let list = res.data.data.list;
						this.listData = this.isFirstPage ? list : this.listData.concat(list);
						this.isFirstPage = false;
						this.currentPage += 1;
						this.hasNextPage = res.data.data.hasNextPage
					} 
					
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
				.catch((res)=>{
					console.log('fail_/work/AwardController_奖扣日志列表---', res)
					this.GLOBAL.failHttp(res);  
					
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
			 },
			 lower(){
				 //滑到底端触发的函数
				 this.getList()
			 },
			pullDown(){
				 //下拉刷新触发的函数
				 this.currentPage = 1;
				 this.listData=[];
				 this.getList();
			 },
			getSystemInfoPage() {
				uni.getSystemInfo({
				  success: (res) => {
					this.winH=res.windowHeight
				  }
				})
			},
			onItemClick(item,index){
				  var approvalId = this.listData[index].approvalId
				  uni.navigateTo({ url: '/pages/jf/leaderAward/detail/leaderAwardLogDetail?approvalId='+approvalId+'' })
			},
			search(e) {
				this.searchString = e;
				this.pullDown();
			}
		 }
	}
</script>

<style>
	.uni-media-list{
		-webkit-box-align: center;
		align-items: center;
	}
	.uni-media-list-body{
		height: auto;
	}
	.list-body-top,.list-body-bottom{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
</style>

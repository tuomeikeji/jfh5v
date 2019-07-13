<!--工作台::申请日志 -->
<template>
	<view class="page">
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
									<text class="uni-title" style="color: #4d96f5;">{{item.sqIntegral>0 ? '+' : ''}}{{item.sqIntegral}}    {{item.type == '1' ? '品德A分' : (item.type == '2' ? '业绩B分' : (item.type == '3' ? '行为C分': (item.type == '4' ? '管理奖扣分':(item.type == '5' ? '自由奖扣分':(item.type == '6' ? '点赞分':(item.type == '7' ? '悬赏任务分': (item.type == '8' ? '积分支票':(item.type == '9' ? '水平考核分':''))))))))}}</text>
								</view> 
								<view class="uni-text">{{item.approvalTitle}}</view>
								<view class="flex-space-between">
									<text class="uni-text-small">{{item.sqTime}}</text>
									<text class="uni-text-small" style="color: #FDDA00;">审批中</text>
								</view>
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
	export default {
		components: {
		},
		data() {
		    return {
				listData: [], 
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true
			}
		},
		onLoad(){
			this.getList();
			this.getSystemInfoPage();
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			 getList(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/work/approverLog',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data:this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
				  })
				})
				.then((res)=>{
					console.log('success_/work/approverLog----', res);
					this.GLOBAL.successHttp(res)
					
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
					console.log('fail_/work/approverLog---', res);
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
				  uni.navigateTo({ url: '/pages/jf/work/log/detail/logDetail?approvalId='+approvalId+'' })
			  }
		 }
	}
</script>

<style>
	
</style>
<!-- 
*我申请的肯定都是“审核中啊” 
*  -->
<!--工作台::待我审批 -->
<template>
	<view class="page">
		<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickTabItem" />
		<mSearch @search="search($event)" button="inside" placeholder="请输入您想搜索的人名"></mSearch>
		<view class="content">
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
										<text class="uni-title" style="color: #4d96f5;">{{item.sqIntegral>0 ? '+' : '-'}}{{item.sqIntegral>0 ? item.sqIntegral:item.kIntegral}}    {{item.integralTypeId == '1' ? '品德A分' : (item.integralTypeId == '2' ? '业绩B分' : (item.integralTypeId == '3' ? '行为C分': (item.integralTypeId == '4' ? '管理奖扣分':(item.integralTypeId == '5' ? '自由奖扣分':(item.integralTypeId == '6' ? '点赞分':(item.integralTypeId == '7' ? '悬赏任务分':(item.integralTypeId == '8' ? '积分支票':(item.integralTypeId == '9' ? '水平考核分':''))))))))}}</text>
									</view> 
									<view class="uni-text">{{item.approvalTitle}}</view>
									<view class="flex-space-between">
										<text class="uni-text-small">{{status='0'?item.sqTime:item.spTime}}</text>
										<text class="uni-text-small" :style="item.status == '0' ? 'color:#FFCC33':(item.status == '1' ? 'color:#1AA034' : 'color:#e74958')">{{item.status == '0' ? '审批中' : (item.status == '1' ? '审批通过' : '审批不过')}}</text>
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
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue'
	export default {
		components: {
			uniSegmentedControl,
			mSearch
		},
		data() {
		    return {
				//tab选项卡设置
				current:0,
				items: ['待审批','已审批'],
				activeColor: '#007aff',
				styleType: 'text',
				
				listData: [], 
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				
				spstatus:0,
				searchString:'',
			}
		},
		onShow(){
			this.pullDown();
		},
		onLoad(){
			this.getSystemInfoPage();
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			 getList(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/approversPel/selectApproversList',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					status: this.spstatus, // tab栏审批未审批
					search: this.searchString
				  }),
				})
				.then((res)=>{
					console.log('success_待我审批列表----', res);
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
					console.log('fail_待我审批列表---', res);  
					this.GLOBAL.failHttp(res)
					
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
				  var approvalId = this.listData[index].approvalId;
				  var status = this.listData[index].status;
				  uni.navigateTo({ url: '/pages/jf/work/wait/detail/waitDetail?approvalId='+approvalId+'&status='+status+'' })
			 },
			 onClickTabItem(index){
				this.current = index;
				this.spstatus = index;
				this.pullDown();
			 },
			 search(e) {
				console.log(e);
				this.searchString = e;
				this.pullDown();
			}
		 }
	}
</script>

<style>
	
</style>

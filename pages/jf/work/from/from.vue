<!--工作台::我发起的 -->
<template>
	<view class="uni-page-body" style="padding-bottom: 0;">
		<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickTabItem" />
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
									<view class="list-body-top">
										<text class="uni-title">{{item.userName}}</text>
										<text class="uni-title uni-text-blue">{{item.sqIntegral>0 ? '+' : ''}}{{item.sqIntegral}}    {{item.type == '1' ? '品德A分' : (item.type == '2' ? '业绩B分' : (item.type == '3' ? '行为C分': (item.type == '4' ? '管理奖扣分':(item.type == '5' ? '自由奖扣分':(item.type == '6' ? '点赞分':(item.type == '7' ? '悬赏任务分':(item.type == '8' ? '积分支票':(item.type == '9' ? '水平考核分':''))))))))}}</text>
									</view> 
									<view class="uni-text">{{item.approvalTitle}}</view>
									<view class="list-body-bottom">
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
	export default {
		components: {
			uniSegmentedControl,
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
				search:''
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
				  url: this.GLOBAL.domain + '/work/selectMyFq',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					status: this.spstatus, // tab栏审批未审批
					search: this.search
				  })
				})
				.then((res)=>{
					console.log('success_我发起的列表----', res);
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
					console.log('fail_我发起的列表---', res);
					this.GLOBAL.failHttp(res); 
					 
					 uni.hideLoading();
					 uni.stopPullDownRefresh();
				})
			 },
			 lower(){
				 //滑到底端触发的函数
				 this.getList();
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
				  uni.navigateTo({ url: '/pages/jf/work/from/detail/fromDetail?approvalId='+approvalId+'&status='+status+'' })
			 },
			 onClickTabItem(index){
				 this.current = index ;
				 this.spstatus = index;
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
<!-- 
*我申请的肯定都是“审核中啊” 
*  -->
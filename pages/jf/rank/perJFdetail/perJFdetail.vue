<!-- 个人积分列表详情 -->
<template>
	<view class="uni-page-body" :style="'height:'+winH+'px;'" style="padding-bottom: 0;">
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="listData.length>0">
				<block v-for="(item,index) in listData" :key="index">
					<view class="uni-list-cell" style="align-items: flex-start;">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="item.userImg ? item.userImg : '/static/img/default_user_icon.png'"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="flex-space-between">
									<text class="uni-title">{{item.userName}}</text>
									<text class="uni-title uni-text-blue">{{item.sqIntegral>0 ? '+' : ''}}{{item.sqIntegral}}    {{item.type == '1' ? '品德A分' : (item.type == '2' ? '业绩B分' : (item.type == '3' ? '行为C分': (item.type == '4' ? '管理奖扣分':(item.type == '5' ? '自由奖扣分':(item.type == '6' ? '点赞分':(item.type == '7' ? '悬赏任务分':(item.type == '8' ? '积分支票':(item.type == '9' ? '水平考核分':''))))))))}}</text>
								</view> 
								<!-- 标题，内容 -->
								<view class="uni-text" style="font-size: 30upx;font-weight: bold;">{{item.approvalTitle}}</view>
								<view class="uni-text">{{item.approvalContent}}</view>
								<!-- 图片-->
								<view v-if="item.approvalImg1 !=''">
									<view class="imagePre" v-for="(imgItem,imgIndex) in item.approvalImg1" :key="imgIndex" @click="preview(index,imgIndex)">
										<image :src="imgItem" @click="preview(imgIndex)" mode="aspectFill" />
									</view>
								</view>
								<view class="flex-space-between">
									<text class="uni-text-small">{{item.spTime}}</text>
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
	
</template>

<script>
	export default {
		data() {
		    return {
				options:{},
				listData: [], 
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				
				imgArr:[]
			}
		},
		onShow(){
			this.pullDown();
		},
		onLoad(options) {
			this.getSystemInfoPage();
			this.options = options
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			getList(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/rank/selectPersonalList',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					userId:this.options.userId
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
						this.hasNextPage = res.data.data.hasNextPage;
						
						this.listData.forEach((item) => {
							if(item.approvalImg1 != ''){
								if(item.approvalImg1.indexOf(".") != -1){
									item.approvalImg1 = item.approvalImg1.split(',')
								}
							}
						})
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
			preview(index,imgIndex){
				console.log('图片',imgIndex);
				uni.previewImage({
					current:imgIndex,
					urls:this.listData[index].approvalImg1
				})
			},
		}
	}
</script>

<style>
	.imagePre {
	  height: 200upx;
	  width:200upx;
	  background: #eee;
	  display: inline-block;
	  margin-right:30upx;
	  margin-top: 20upx;
	  margin-bottom: 20upx;
	}
	.imagePre image{
		width: 100%;
		height: 100%;
	}
</style>

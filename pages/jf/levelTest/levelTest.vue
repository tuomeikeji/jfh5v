<!-- 水平考核 -->
<template> 
	<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
		<view class="uni-list" v-if="listData.length>0">
			<block v-for="(item,index) in listData" :key="index">
				<view class="uni-list-cell">
					<view class="uni-list-item" @click="onItemClick(index)">
						<view><text class="uni-title">{{index+1}}、{{item.assName}}</text></view> 
						<view class="flex-space-between" style="padding-top: 20upx;">
							<text class="uni-text-small" style="color: #4d96f5;">{{item.shenQingFangShi == "0"?"每天一次":item.shenQingFangShi == "1"?"每月一次":"无限制"}}</text>
							<text class="uni-text-small" :style="item.state == '0'?'color:#FDDA00':'color:#1AA034'">{{item.state == '0'?"未考核":"已考核"}}</text>
						</view>
					</view>
					<view class="list-mask" v-show="item.disabled"></view>
				</view>
			</block>
		</view>
		<view v-else class="uni-noData-txt">暂无数据</view>
		<view class="uni-noMore-txt" v-if="listData.length>0 && !hasNextPage">无更多数据</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return{
				menuIds:{},
				listData:[],
				
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true
			}
		},
		onShow() {
			this.pullDown();
			this.getMenuIds()
		},
		onLoad(){
			this.getSystemInfoPage();
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods: {
			getMenuIds(){
				//获取已考核题目集合
				this.axios({
				  url: this.GLOBAL.domain +'/AssessmentState/AssessmentStateController', //已考核题目集合
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_禁用题目===', res);
					this.GLOBAL.successHttp(res);
					
					this.menuIds = res.data.data.list 
				})
				.catch((res)=>{
					console.log('fail_禁用题目', res)
					this.GLOBAL.failHttp(res);
				})
			},
			getList(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain +'/Levelass/LevelAssController',
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
				  	console.log('success_LevelAssController_考核题目', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						console.log("load page 第" + (this.currentPage) +"页");
						let list = res.data.data.list;
						
						list.forEach((item) => {
						  if (this.menuIds.some((toItem) => toItem.levelId == item.levelId)) {
							item.disabled = true;
							item.state = 1
						  } else {
							item.disabled = false
							item.state = 0
						  }
						})
						
						this.listData = this.isFirstPage ? list : this.listData.concat(list);
						this.isFirstPage = false;
						this.currentPage += 1;
						this.hasNextPage = res.data.data.hasNextPage;
						console.log("数据列表：" + (this.listData.length) +"条");
						 
						uni.hideLoading();
						uni.stopPullDownRefresh()
					}
				})
				.catch((res)=>{
				  	console.log('fail__LevelAssController_考核题目', res)
					this.GLOBAL.failHttp(res);  
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
			onItemClick(index){
				var testStatus = this.listData[index].state //是否考核过
				var shenQingFangShi = this.listData[index].shenQingFangShi //申请方式
				var assName = this.listData[index].assName //题目
				var levelId = this.listData[index].levelId //題id
				
				var url = '/pages/jf/levelTest/levelTestDetail/levelTestDetail?levelId='+levelId+'&assName='+assName+'&shenQingFangShi='+shenQingFangShi+'&testStatus='+testStatus+''
				
				uni.navigateTo({
				  url: url
				})
			},
			getSystemInfoPage() {
				uni.getSystemInfo({
				  success: (res) => {
					this.winH=res.windowHeight
				  }
				})
			},
		}
	}
</script>

<style>
	.uni-list-item{
		width: 100%;
		padding: 24upx 30upx 10upx 30upx;
	}
</style>

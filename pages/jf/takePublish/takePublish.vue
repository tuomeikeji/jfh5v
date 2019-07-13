<!-- 工作台::悬赏任务 -->
<template>
	<view class="uni-page-body" style="padding-bottom: 0;">
		<uni-segmented-control :current="tabCurrent" :values="tabItems" style-type="text" active-color="#007aff" @clickItem="onClickTabItem" />
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="listData.length>0">
				<block v-for="(item,index) in listData" :key="index">
					<view class="list-item" style="position: relative;">
						<view class="flex-space-between">
							<text class="uni-title" style="flex: 8;">{{item.title}}</text>
							<text class="uni-title" style="color: #4d96f5;flex: 1.5;">{{item.taskIntegral>0 ? '+' : ''}}{{item.taskIntegral}}分</text>
						</view>
						<view class="uni-text" style="padding: 10upx 0;">{{item.content}}</view>
						<view class="form-line"></view>
						<view class="flex-space-between">
							<view class="uni-text">
								<view v-if="item.peopleNum!= null">剩余名额：{{item.peopleNum}}人</view>
								<view v-else>限制人数：无</view>
								<!-- <view>剩余名额：{{item.peopleNum != null ? item.peopleNum + '人' : '无'}}</view> -->
								<view>截止时间：{{item.endTime ? item.endTime : "无"}}</view>
							</view>
							<text class="uni-text" :style="item.userState == '0'? 'color:#FDDA00' :(item.userState == '1' ? 'color:#4d96f5' :(item.userState == '2' ? 'color:#F77500' :(item.userState == '3' ? 'color:#1AA034' : 'color:#DD4F43')))">{{item.userState == '0' ? '发布中' : (item.userState == '1' ? '已领取' : (item.userState == '2' ? '审批中' : (item.userState == '3' ? '已完成' : '已拒绝')))}}</text>
						</view>
						<view class="people" style="padding:10upx 0">
						  <text class="uni-text-small">已接受此任务人员：</text>
						  <text  class="uni-text-small" v-if="!item.taskAndUserList">暂无</text>
						  <text v-else class="uni-text-small" v-for="(pItem,pIndex) in item.taskAndUserList" :key="pIndex">{{pItem.userName}}，</text>
						</view>
						<view class="change_btn" @click="change(item,index)" v-if="item.userState == 0" >
							<button class="button-form" type="primary" :loading='loading' :disabled="disabled">选择接受这项任务</button>
						</view>
						<view class="change_btn" @click="commit(item ,index)" v-if="item.userState == 1">
							<button class="button-form" type="warn">提交完成这项任务</button>
						</view>
						<view class="list-mask" v-show="item.userState != 0 && item.userState != 1"></view>
					</view>
				</block>
			</view>
			<view v-else class="uni-noData-txt">暂无数据</view>
			<view class="uni-noMore-txt" v-if="listData.length>0 && !hasNextPage">无更多数据</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				//tab选项卡设置
				tabCurrent:0,
				status:2,
				tabItems: ['抢单任务','挑战任务','日常任务'],
				listData:[],
				
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				
				disabled:false,
				loading:false,
				
				loginId:''
			}
		},
		onShow() {
			this.pullDown();
		},
		onLoad(){
			this.getSystemInfoPage();
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			onClickTabItem(index){
				switch (index){
					case 0 :
						this.status = 2;
						this.pullDown();
					break;
					case 1 :
						this.status = 3;
						this.pullDown();
					break;
					case 2 :
						this.status = 1;
						this.pullDown();
					break;
				}
				this.tabCurrent = index
			},
			showList(){
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/task/allTask',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					times: this.status
				  })
				})
				
				.then((res)=>{
					var that = this;
					
					console.log('success_/task/allTask_悬赏任务列表', res);
					that.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						console.log("load page 第" + (that.currentPage) +"页");
						let list = res.data.data.list;
						that.listData = that.isFirstPage ? list : that.listData.concat(list);
						that.isFirstPage = false;
						that.currentPage += 1;
						that.hasNextPage = res.data.data.hasNextPage;
						console.log("数据列表：" + (that.listData.length) +"条");
						
						
						uni.getStorage({
							key:'USERS_KEY',
							success(res) {
								that.listData.forEach((item) => {
								  if (item.taskAndUserList) {
									item.taskAndUserList.forEach((task) => {
									  if (task.userId == res.data.id) {
										item.userState = task.state
									  }
									})
								  }
								})
							}
						})
					} 
					
					uni.hideLoading();
					uni.stopPullDownRefresh();
				  })
				  .catch((res)=>{
					console.log('fail_/task/allTask_悬赏任务列表', res)
					this.GLOBAL.failHttp(res); 
					 
					 uni.hideLoading();
					 uni.stopPullDownRefresh();
				  })
			},
			change(item){
				console.log(item);
				
				
				uni.showLoading({title: '加载中...'});
				this.loading = true;
				this.disabled = true;
				this.axios({
				  url: this.GLOBAL.domain + '/task/updateUserAndTaskStatus/'+ item.rtId + '/' + item.userState,
				  method: 'GET',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_接受任务', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						uni.showModal({
							content:"接受任务成功，请尽快完成",
							showCancel:false
						});
						
						this.pullDown();
					}else{
						uni.showModal({
							content:res.data.msg,
							showCancel:false
						});
					}
					
					uni.hideLoading();
					this.loading = false;
					this.disabled = false;
				})
				.catch((res)=>{
					console.log('fail__接受任务', res)
					this.GLOBAL.failHttp(res);
					  
					uni.hideLoading();
					this.loading = false;
					this.disabled = false;
				})
				
			},
			commit(item){
				var title = item.title;
				var content = item.content
				var points = item.taskIntegral
				var rtId = item.rtId
				var taskTypeId = item.taskTypeId //日常任务id == 1，挑战任务==2，限时任务==3
				
				console.log('跳转：','title:',title,',points:',points,',rtId:',rtId,',taskTypeId:',taskTypeId)
				
				 var url = '/pages/jf/takePublish/commit/publishCommit?title='+title +'&content='+content+'&points='+points+'&rtId='+rtId+'&taskTypeId='+taskTypeId+''
				 uni.navigateTo({
				 	url:url
				 })
			},
			lower(){
				 //滑到底端触发的函数
				 this.showList()
			},
			pullDown(){
				 //下拉刷新触发的函数
				 this.currentPage = 1;
				 this.listData=[];
				 this.showList();
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
	.list-item{
		background-color: #fff;
		padding: 24upx;
		border-bottom: 20upx solid #DDDDDD;
	}
</style>

<!-- 工作台::悬赏任务 -->
<template>
	<view class="uni-page-body">
		<uni-segmented-control :current="tabCurrent" :values="tabItems" style-type="text" active-color="#007aff" @clickItem="onClickTabItem" />
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="listData.length>0">
				<block v-for="(item,index) in listData" :key="index">
					<view class="list-item">
						<view class="flex-space-between">
							<text class="uni-title" style="flex: 8;">{{item.title}}</text>
							<text class="uni-title" style="color: #4d96f5;flex: 1.5;">{{item.taskIntegral>0 ? '+' : ''}}{{item.taskIntegral}}分</text>
						</view>
						<view class="uni-text" style="padding: 10upx 0;">{{item.content}}</view>
						<view class="flex-space-between">
							<view class="uni-text">
								<view>限制人数：{{item.peopleNum ? item.peopleNum + '人': '无'}}</view>
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
				status:0,
				tabItems: ['抢单任务','限时任务','日常任务'],
				listData:[],
				
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				
				disabled:false,
				loading:false
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
				uni.request({
				  url: this.GLOBAL.domain + '/task/allTask',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: {
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					times: this.status
				  },
				  success: (res) => {
					console.log('success_/task/allTask_悬赏任务列表', res);
					this.GLOBAL.successHttp(res);
					
					if (res.statusCode == 200) {
						console.log("load page 第" + (this.currentPage) +"页");
						let list = res.data.data.list;
						this.listData = this.isFirstPage ? list : this.listData.concat(list);
						this.isFirstPage = false;
						this.currentPage += 1;
						this.hasNextPage = res.data.data.hasNextPage;
						console.log("数据列表：" + (this.listData.length) +"条");
					}
				  },
				  fail: (res) => {
					console.log('fail_/task/allTask_悬赏任务列表', res)
					this.GLOBAL.failHttp(res);
				
				  },
				  complete: () => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				  }
				});
			},
			change(item){
				console.log(item);
				if(false){
					uni.showModal({
						content:"此项任务名额已抢完",
						showCancel:false
					});
					return false;
				}
				
				uni.showLoading({title: '加载中...'});
				this.loading = true;
				this.disabled = true;
				uni.request({
				  url: this.GLOBAL.domain + '/task/updateUserAndTaskStatus/'+ item.rtId + '/' + item.userState,
				  method: 'GET',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  success: (res) => {
					console.log('success_接受任务', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						uni.showModal({
							content:"申请成功",
							showCancel:false
						});
						
						this.pullDown();
					}
				  },
				  fail: (res) => {
					console.log('fail__接受任务', res)
					this.GLOBAL.failHttp(res);
				
				  },
				  complete: () => {
					uni.hideLoading();
					this.loading = false;
					this.disabled = false;
				  }
				});
				
			},
			commit(item){
				var title = item.title;
				var content = item.content
				var points = item.taskIntegral
				var id = item.rtId
				var taskTypeId = item.taskTypeId //日常任务id == 1
				
				console.log('跳转：','title:',title,',points:',points,',id:',id,',taskTypeId:',taskTypeId)
				
				 var url = '/pages/jf/takePublish/commit/publishCommit?title='+title +'&content='+content+'&points='+points+'&id='+id+'&taskTypeId='+taskTypeId+''
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
	}
</style>

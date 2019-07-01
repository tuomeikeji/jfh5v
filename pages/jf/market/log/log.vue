<!-- 兑换记录  -->
<template>
	<view class="page">
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="uni-list-cell">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image :src="item.goodImg"></image>
							</view>
							<view class="uni-media-list-body" style="height: auto;">
								<view class="uni-media-list-text-top uni-media-list-text">
									<text>{{item.goodName}}（2件）</text>
									<text>消耗积分:{{item.dhIntegral}}</text>
								</view>
								<view class="uni-media-list-text-bottom uni-media-list-text">
									<text>兑换时间:{{item.createTime}}</text>
									<text>{{item.status=='0'?"审核中":item.status=="1"?"审核通过":"审核不通过"}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-else class="uni-noData-txt">暂无数据</view>
			<view class="uni-noMore-txt" v-if="list.length>0 && !hasNextPage">无更多数据</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				winH:'',
				
				list:[]
			}
		},
		onLoad() {
			this.getList()
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			getList() {
			    uni.showLoading({title: '加载中...'});
			    uni.request({
			      url: this.GLOBAL.domain + '/integralGoods/selectIntegralGoodsList',
			      method: 'POST',
			      dataType: 'json',
			      header:{
			    	'content-type':'application/x-www-form-urlencoded'
			      },
			      data: {
			    	pageSize: this.pageSize,
			    	pageNum: this.currentPage,
			      },
			      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) {uni.showToast({ title: res.data.msg, duration: 3000,icon:'none' });uni.reLaunch({ url: '/pages/jf/login/login' }); return}
			    	console.log('success_兑换记录----', res);
			    	
			    	if (res.statusCode == 200) {
			    		console.log("load page 第" + (this.currentPage) +"页");
			    		let list = res.data.data.list;
			    		this.list = this.isFirstPage ? list : this.list.concat(list);
			    		this.isFirstPage = false;
			    		this.currentPage += 1;
			    		this.hasNextPage = res.data.data.hasNextPage
			    	}
			      },
			      fail: (res) => {
			    	console.log('fail_兑换记录---', res)
			    	var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } 
			    	uni.showModal({content: content, confirmText: '确定',showCancel: false,success() {uni.reLaunch({ url: '/pages/jf/login/login' });}});
			      },
			      complete: () => {
			    	uni.hideLoading();
			    	uni.stopPullDownRefresh();
			      }
			    });
			},
			lower(){
				 //滑到底端触发的函数
				 this.getList()
			},
			pullDown(){
				 //下拉刷新触发的函数
				 this.currentPage = 1;
				 this.list=[];
				 this.getList();
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
	.uni-media-list-text{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}
</style>

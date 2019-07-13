<template>
	<view class="page">
		<mSearch @search="search($event)" button="inside"></mSearch>
		<uni-notice-bar :single="true" :show-icon="true" :text="has? '每周有 1 次点赞的机会，您目前剩余 1 次机会' : '每周有 1 次点赞的机会，您目前剩余 0 次机会'" />
		<view style="margin-bottom: 40upx;">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image v-if="showImg" :src="user.avatar ? user.avatar : '/static/img/default_user_icon.png'"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="flex-space-between">
								<text class="uni-title">{{user.userName}}</text>
								<text class="uni-title" style="color: #DD4F43;">+ {{user.count * user.loveIntegral}}</text>
							</view>
							<view class="uni-text">{{user.remark ? "已被 " + user.remark + " 点赞" : "你现在还没有被人点赞"}}</view>
							<view class="uni-text-small">(这里是你自己的被点赞记录。)</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in list" :key="index">
				<view class="uni-list">
					<view class="uni-list-cell" @click="onItemClick(item)">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image v-if="showImg" :src="item.avatar ? item.avatar : '/static/img/default_user_icon.png'"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="flex-space-between">
									<text class="uni-title">{{item.userName}}</text> 
									<text class="uni-title" style="color: #DD4F43;">+ {{item.count * loveIntegral}}</text>
								</view>
								<view class="uni-text">{{item.remark ? "已被 " + item.remark + " 点赞" : "现在还没有被人点赞"}}</view>
								<view class="uni-text-small">(点击右边的大拇指给她/他点赞！)</view>
							</view>
							<view class="likeIcon"><image :src="item.liked ? '/static/img/like-active.png' : '/static/img/like.png'"></image></view>
						</view>
					</view>
				</view>
			</block>
			<view class="uni-noMore-txt">无更多数据</view>
		</view>
	</view>
</template>

<script>
import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
 export default {
    components: {
        mSearch,
		uniNoticeBar
    },
    data() {
        return {
		   showImg:true,
           searchString:'',
		   has:true,//是否有剩余的点赞机会，true 1次，false:0次
		   list:[], //可点赞人员列表
		   user:{} ,//登陆人信息
		   loveUser:'', //登录人已赞人员的id
		   loveIntegral:20 //点赞一次多少分
        }
    },
	onShow() {
		this.getLikeList();
	},
	onPullDownRefresh() {
		this.getLikeList();
	},
    methods: {
        search(e) {
        	this.searchString = e;
        	this.getLikeList();
        },
		getLikeList(){
			// let that = this;
			uni.showLoading({title: '加载中...'});
			this.list = [];
			this.axios({
			  url: this.GLOBAL.domain + '/lovePraise/lovePraiseList',
			  method: 'POST',
			  dataType: 'json',
			  header:{
				'content-type':'application/x-www-form-urlencoded'
			  },
			  data: this.$qs.stringify({
				userName:this.searchString
			  })
			})
			.then((res)=>{
				console.log('success_/lovePraiseList----', res);
				this.GLOBAL.successHttp(res);
				
				var user = res.data.data.user; //登录人信息
				var list = res.data.data.userList;
				var loveUser = res.data.data.loveUser//登录人已点赞人员id
				if (user.remark != null) {
				  user.count = user.remark.split(',').length
				} else {
				  user.count = 0
				}
				if (loveUser != null) {
				  this.has = false
				}
				list.forEach((item) => {
				  if (item.remark!= null) {
					item.count = item.remark.split(',').length
				  } else {
					item.count = 0
				  }

				  if (item.userId == loveUser) {
					item.liked = true
				  } else {
					item.liked = false
				  }
				})
				this.user = user; 
				this.loveUser = loveUser; 
				this.list = list;
				 
				uni.hideLoading();
				uni.stopPullDownRefresh()
			})
			.catch((res)=>{
				console.log('fail_/lovePraiseList---', res);
				this.GLOBAL.failHttp(res);
				
				uni.hideLoading();  
				uni.stopPullDownRefresh()  
			})
		},
		onItemClick(item){
			let that = this;
			if (!that.has) {
			  uni.showModal({
				content: '您的点赞机会已经用完了，请等待下周点赞',
				showCancel: false,
			  })
			  return false;
			}
			console.log('赞userId：----',item.userId)
			that.axios({
			  url: that.GLOBAL.domain + '/lovePraise/updataUser',
			  method: 'POST',
			  dataType: 'json',
			  header:{
				'content-type':'application/x-www-form-urlencoded'
			  },
			  data: that.$qs.stringify({
				userId:item.userId
			  })
			})
			.then((res)=>{
				console.log('success_/lovePraise/updataUser----', res);
				that.GLOBAL.successHttp(res);
				
				if(res.status == 200){
					uni.showModal({
						content: '点赞成功',
						showCancel: false,
						success(){
							that.getLikeList();
						}
					})
				} 
				
				uni.hideLoading();
			})
			.catch((res)=>{
				console.log('fail_/lovePraise/updataUser---', res);
				this.GLOBAL.failHttp(res);  
				
				uni.hideLoading();
			})
		}
    }
 };
</script>

<style>
	
	
	.likeIcon {
		width: 70upx;
		height:70upx;
		position: absolute;
		bottom: 40upx;
		right: 30upx;
	}
	.likeIcon image{
		width:100%;
		height:100%;
	}
</style>
<!-- 
*1、list的非分页的
* 2、点赞后 /lovePraise/updataUser返回的 list loveUser 依旧为null
* 3、search不管用
*  -->
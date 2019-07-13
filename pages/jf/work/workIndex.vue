<!-- 动作台::首页 -->
<template>
	<view class="page">
		<view class="topImage" v-show="topImage.length>0">
			<image :src="topImage" mode="aspectFill" />
		</view>
		
		<view class="content">
			<!-- 管理日志 -->
			<view class="content-title">管理日志</view>
				<view class="content-list">
				  <view class="number" @click="logs">
						<text class="number-amount" >{{CountLogData.counNum ? CountLogData.counNum : '0'}}</text>
						<text class="number-text">申请日志</text>
				  </view>
				  <view class="number" @click="wait">
					<text class="number-amount">{{CountLogData.dwsp ? CountLogData.dwsp : '0'}}</text>
					<text class="number-text">待我审批</text>
				  </view>
				  <view class="number" @click="initiate">
					<text class="number-amount">{{CountLogData.counNum1 ? CountLogData.counNum1 : '0'}}</text>
					<text class="number-text">我发起的</text>
				  </view>
				  <view class="number" @click="copy">
					<text class="number-amount">{{CountLogData.csrs ? CountLogData.csrs : '0'}}</text>
					<text class="number-text">抄送我的</text>
				  </view>
				</view>
			</view>
			<!-- 管理应用 只有管理者账号能显示 -->
			<view v-show="show">
				<view class="content-title">管理应用</view>
				<uni-grid :options="gridListContent_1" :column-num="4" :show-out-border="false" @click="onGridItemClick"/>
			</view>
			<view>
				<view class="content-title">日常积分</view>
				<uni-grid :options="gridListContent_0" :show-out-border="false" :column-num="4" @click="onGridItemClick"/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				topImage:'',
				CountLogData:{}, //管理日志模块的数据
				show:false, //是否显示管理应用
				gridListContent_0:[],//日常应用模块的数据
				gridListContent_1:[],//管理应用的数据
			}
		},
		onShow(){
			this.getTopImage();
			this.getCountLogNum();
			this.getGridContent(0);
			this.showManagerGrid(1); //管理者账号登陆显示 管理应用
		},
		methods:{
			showManagerGrid(type){
				var that = this;
				var type = type;
				uni.getStorage({
					key:'USERS_KEY',
					success(res) {
						var level = res.data.level;
						console.log('工作台userLevel===',level)
						if(level == 'superAdmin' || level == 'manager' || level == 'competentLevel'){
							//管理者登陆 还需要请求管理应用的数据 type=1
							that.show = true;
							that.getGridContent(type);
						}
					}
				})
			},
			getTopImage(){
				// 获取顶部banner图
				this.axios({
				  url: this.GLOBAL.domain + '/home/picture',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					  location: 1 //location 0:首页，1:工作台，2：积分商城
				  })
				})
				.then((res)=>{
					console.log('success_workindexTopImage----', res)
					this.GLOBAL.successHttp(res);
					if(res.data.data.list.length > 0){
						this.topImage = res.data.data.list[0].picUrl
					} 
				})
				.catch((res)=>{
					console.log('failworkindexTopImage---', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			getCountLogNum(){
				//获取管理日志模块'我申请的'/'待我审批'/'我发起的'/'我抄送的' 各多少条数量
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/work/countLogNun',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				
				.then((res)=>{
					console.log('success_/work/管理日志----', res);
					this.GLOBAL.successHttp(res);
					
					this.CountLogData = res.data.data; 
					
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log('fail_/work/管理日志---', res)
					this.GLOBAL.failHttp(res); 
					uni.hideLoading();
				})
			},
			getGridContent(type){
				// 日常积分项 type=0;管理应用 type=1;
				var type = type;
				this.axios({
				  url: this.GLOBAL.domain + '/deskIcon/find',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data:this.$qs.stringify({
					  type: type, //type:0 普通员工,type:1 管理者
				  })
				})
				.then((res)=>{
					console.log('success_/deskIcon/find----', res);
					this.GLOBAL.successHttp(res);
					 
					var listMain = [];
					var lists = res.data.data;
					
					for (var i = 0; i < lists.length; i++) {
						var image = lists[i].yyImg;
						var text = lists[i].yyTitle;
						listMain.push({'image':image,'text':text})
					}
					if(type == "0"){
						this.gridListContent_0 = listMain;
					}else if(type == "1"){
						this.gridListContent_1 = listMain;
					} 
				})
				.catch((res)=>{
					console.log('fail_/deskIcon/find---', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			
			onGridItemClick(e){
				console.log('点击grid:' , e);
				
				switch (e.item.text) {
				  case '申报积分':
					uni.navigateTo({url: '/pages/jf/declare/declare'})
					break;
				  case '积分商城':
					uni.navigateTo({url: '/pages/jf/market/market'})
					break;
				  case '自由奖励':
					uni.navigateTo({ url: '/pages/jf/award/award' })
					break;
				  case '积分抽奖':
					uni.navigateTo({ url: '/pages/jf/luckyDraw/luckyDraw' })
					break;
				  case '爱心点赞':
					uni.navigateTo({ url: '/pages/jf/like/like' })
					break;
				  case '悬赏任务':
					uni.navigateTo({ url: '/pages/jf/takePublish/takePublish' })
					break;
				  case '积分申诉':
					uni.navigateTo({ url: '/pages/jf/complaint/complaint' })
					break;
				  case '水平考核':
				  // /pages/jf/levelTest/levelTest
					uni.navigateTo({ url: '/pages/jf/luckyDraw/luckyDraw' })
					break;
				  case '发布任务':
					uni.navigateTo({ url: '/pages/jf/publish/publish' })
					break;
				  case '管理奖扣':
					uni.navigateTo({ url: '/pages/jf/leaderAward/leaderAward' })
					break;
				  case '奖扣日志':
					uni.navigateTo({ url: '/pages/jf/leaderAward/log/leaderAwardLog' })
					break;
				}
			},
			logs() {
				//“申请日志”
				uni.navigateTo({ url: '/pages/jf/work/log/log' })
			},
			wait() {
				//'待我审批'
				uni.navigateTo({ url: '/pages/jf/work/wait/wait' })
			},
			initiate() {
				// '我发起的'
				uni.navigateTo({ url: '/pages/jf/work/from/from' })
			},
			copy() {
				//'我抄送的'
				uni.navigateTo({ url: 'to/to' })
			}
		}
	}
</script>

<style>
	/* content部分 */
	.content {
	  /* box-shadow: 0 0 2px #ccc; */
	  font-family: "microsoft yahei";
	  margin: 0 20upx 0;
	}

	.content-title {
	  line-height: 3.5;
	  color: #666;
	  font-size: 30upx;
	  padding-left: 20upx;
	}

	.content-list {
	  background: #fff;
	  display: flex;
	}
	
	.content-list .number {
	  flex: 1;
	  position: relative;
	}

	.content-list .number::after{
	  content: "";
	  height: 100%;
	  position: absolute;
	  right: 0;
	  top: 0;
	  left:0;
	  bottom:0;
	  border: 2upx solid #ddd;
	  border-left: 0px;
	}
	
	.content-list .number:last-child::after{
		 border-right: 0px;
	}
	
	.content-list .number .number-amount, .content-list .number .number-text {
	  display: inline-block;
	  width: 100%;
	  text-align: center;
	  font-size: 30upx;
	}

	.content-list .number .number-amount {
	  line-height: 130upx;
	}

	.content-list .number .number-text {
	  padding-bottom: 14upx;
	}
</style>

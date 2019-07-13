<!-- 兑换记录  -->
<template>
	<view class="page">
		<!-- @scrolltolower="lower" -->
		<scroll-view scroll-y="true"  :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="uni-list-cell">
						<view class="uni-list-item flex-space-between">
							<view><text class="uni-title">{{item.name}}</text></view> 
							<view><text class="uni-text">{{item.createTime}}</text></view> 
						</view>
					</view>
				</block>
				<view class="uni-noMore-txt">无更多数据</view>
			</view>
			<view v-else class="uni-noData-txt">暂无数据</view>
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
		onShow() {
			this.getList()
		},
		onLoad() {
			this.getSystemInfoPage()
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		methods:{
			getList() {
			    uni.showLoading({title: '加载中...'});
			    this.axios({
			      url: this.GLOBAL.domain + '/integralDraw/Record',
			      method: 'POST',
			      dataType: 'json',
			      header:{
			    	'content-type':'application/x-www-form-urlencoded'
			      }
				})
				.then((res)=>{
					console.log('success_中奖记录----', res);
			    	this.GLOBAL.successHttp(res)
					let list = res.data.data;
					
					list.forEach((item) => {
					  item.createTime = this.format(item.createTime,'yyyy-MM-dd hh:mm:ss')
					})
					this.list = list;
					uni.hideLoading();
					uni.stopPullDownRefresh();
					
					
			   //  	if (res.data.code == 0) {
			   //  		console.log("load page 第" + (this.currentPage) +"页");
			   //  		let list = res.data.data.list;
			   //  		this.list = this.isFirstPage ? list : this.list.concat(list);
			   //  		this.isFirstPage = false;
			   //  		this.currentPage += 1;
			   //  		this.hasNextPage = res.data.data.hasNextPage;
						// 
						// this.list.forEach((item) => {
						//   item.createtime = format(createtime)
						// })
			   //  	} 
					
					
				})
				.catch((res)=>{
					console.log('fail_中奖记录---', res);
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
				 // this.currentPage = 1;
				 this.list=[];
				 this.getList();
			},
			getSystemInfoPage() {
				uni.getSystemInfo({
				  success: (res) => {
					this.winH=res.windowHeight
				  }
				})
			},
			format(time, fmt) {
			  // 时间格式
				var date = new Date(time)
				var o = {
				  "M+": date.getMonth() + 1, //月份
				  "d+": date.getDate(), //日
				  "h+": date.getHours(), //小时
				  "m+": date.getMinutes(), //分
				  "s+": date.getSeconds(), //秒
				  "q+": Math.floor((date.getMonth() + 3) / 3), //季度
				  "S": date.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
				  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
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
	.uni-list-item{
		padding: 20upx 24upx;
	}
</style>

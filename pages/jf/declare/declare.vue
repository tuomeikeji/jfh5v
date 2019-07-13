<!-- 工作台::日常积分项：积分申报 -->
<template>
	<view class="page">
		<uni-segmented-control :current="tabCurrent" :values="tabItems" style-type="text" active-color="#007aff" @clickItem="onClickTabItem" />
		<mSearch @search="search($event)" button="inside" placeholder="请输入要申报的标题"></mSearch>
		<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
			<view class="uni-list" v-if="listData.length>0">
				<block v-for="(item,index) in listData" :key="index">
					<view class="uni-list-cell">
						<view class="uni-list-item" @click="onItemClick(index)">
							<view><text class="uni-title">{{item.behaviorTitle}}</text></view> 
							<view><text class="uni-text">{{item.behaviorContent}}</text></view> 
							<view class="flex-space-between" style="padding-top: 20upx;">
								<text class="uni-text-small" style="color: #4d96f5;">积分奖励：{{item.zuiShaoIntegral ? item.zuiShaoIntegral : '0'}}-{{item.zuiDuoIntegral}}分</text>
								<text class="uni-text-small" style="color: #4d96f5;">{{item.shenQingFangShi == '0' ? '每天一次' : '无限制'}}</text>
							</view>
						</view>
						<view class="list-mask" v-show="item.disabled"></view>
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
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {
			uniSegmentedControl,
			mSearch
		},
		data() {
			return {
				menuIds: '', // 禁用标题id
				
				//tab选项卡设置
				tabCurrent:0,
				tabItems: ['行为分','品德分','业绩分'],
				//请求数据的地址
				url:'/work/declareBehavior',
				listData:[],
				searchString:'',
				
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true
			}
		},
		onShow() {
			this.getMenuId()
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
				this.currentPage = 1;
				this.listData=[];
				switch (index){
					case 0 :
						this.url = "/work/declareBehavior"
						this.pullDown();
					break;
					case 1 :
						this.url = "/work/declareMoral"
						this.pullDown();
					break;
					case 2 :
						this.url = "/work/declareResults"
						this.pullDown();
					break;
				}
				
			},
			getMenuId(){
				//获取禁用标题（已申请项）
				this.axios({
				  url: this.GLOBAL.domain +'/userMenu/selectUserIdAndMenuId',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_selectUserIdAndMenuId禁用题目===', res);
					this.GLOBAL.successHttp(res);
					if(res.data.data){
						this.menuIds = res.data.data.split(',');
					}  
				})
				.catch((res)=>{
					console.log('fail_selectUserIdAndMenuId禁用题目', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			showList(){
				uni.showLoading({title: '加载中...'});
				
				this.axios({
				  url: this.GLOBAL.domain + this.url,
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data:this.$qs.stringify({pageSize: this.pageSize,pageNum: this.currentPage,behaviorTitle: this.searchString})
				})
				.then((res)=>{
					console.log('success_积分申报_'+this.url+'----', res);
					this.GLOBAL.successHttp(res);
					if (res.data.code == 0) {
						console.log("load page 第" + (this.currentPage) +"页");
						let list = res.data.data.list;
						this.listData = this.isFirstPage ? list : this.listData.concat(list);
						this.isFirstPage = false;
						this.currentPage += 1;
						this.hasNextPage = res.data.data.hasNextPage;
						console.log("数据列表：" + (this.listData.length) +"条");
						
						this.listData.forEach((item) => {
						  if (this.menuIds.some((toItem) => toItem == item.behaviorId)) {
							item.disabled = true
						  } else {
							item.disabled = false
						  }
						})
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
				.catch((res)=>{
					console.log('fail_积分申报_'+this.url+'===', res)
					this.GLOBAL.failHttp(res); 
					uni.hideLoading();
					uni.stopPullDownRefresh();
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
			},
			onItemClick( index ) {
				console.log('list点击', index)

				var title = this.listData[index].behaviorTitle
				var content = this.listData[index].behaviorContent
				var type = this.listData[index].typeId
				var max = this.listData[index].zuiDuoIntegral
				var min = this.listData[index].zuiShaoIntegral
				var id = this.listData[index].behaviorId
				var url = '/pages/jf/declare/approve/approve?title='+title+'&content='+content+'&type='+type+'&max='+max+'&min='+min+'&id='+id+''

				uni.navigateTo({
				  url: url
				})
			},
			search(e) {
				this.searchString = e;
				this.pullDown();
			}
		}
	}
</script>

<style>
	.uni-list-item{
		padding:24upx 26upx;
	}
	.uni-list-cell{
		position:relative;
	}
</style>

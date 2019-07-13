<!-- tab栏::积分榜 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;padding-bottom: 0;">
		<uni-nav-bar right-text="筛选" title="积分榜" @click-right="showDrawer" :backgroundColor="navBackgroundColor""/>
		<mSearch @search="search($event)" button="inside" placeholder="请输入要搜索的人名"></mSearch>
		<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickTabItem" />
		<view class="title">
			<text class="title-col">排名</text>
			<text class="title-col"></text>
			<text class="title-col">姓名</text>
			<text class="title-col" style="color: #46adf4">加分</text>
			<text class="title-col">扣分</text>
			<text class="title-col">总分</text>
		</view>
		<view class="content">
			<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
				<view v-if="rankList.length>0">
					<view class="list" v-for="(item,index) in rankList" :key="index">
						<view class="list-item" @click="onClickList(item)">
							<view class="brief">
							  <text :class="'brief-col number number_'+index">{{index>2 ? index+1 : ""}}</text>
							  <text class="brief-col"><image class="avatar" :src="item.userImg ? item.userImg : '/static/img/default_user_icon.png'"></image></text>
							  <text class="brief-col">{{item.userName}}</text>
							  <text class="brief-col" style="color: #46adf4">{{item.sqIntegral}}</text>
							  <text class="brief-col">{{item.deduce}}</text>
							  <text class="brief-col amount">{{item.amount}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="uni-noData-txt">暂无数据</view>
				<view class="uni-noMore-txt" v-if="rankList.length>0 && !hasNextPage">无更多数据</view>
			</scroll-view>
		</view>
		<!-- 筛选部分 -->
		<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer">
			<view>
				<form @submit="formSubmit">
					<uni-segmented-control :current="current_filter" :values="items_filter" :style-type="styleType" :active-color="activeColor" @clickItem="onClickTabItem_filter" />
					<view v-show="current_filter === 0">
						<radio-group name='radio0'>
							<label class="page-section-lable" v-for="(item, index) in radioG_Dept" :key="item.id">
								<radio :value="item.id" :checked="item.checked" />
								<text>{{item.name}}</text>
							</label>
						</radio-group>
					</view>
					<view v-show="current_filter === 1">
						<radio-group name='radio1'>
							<label class="page-section-lable" v-for="(item, index) in radioG_Post" :key="item.id">
								<radio :value="item.id" :checked="item.checked"/>
								<text>{{item.name}}</text>
							</label>
						</radio-group>
					</view>
					<view v-show="current_filter === 2">
						<radio-group name='radio2'>
							<label class="page-section-lable " v-for="(item, index) in radioG_type" :key="item.id">
								<radio :value="item.id" :checked="item.checked" />
								<text>{{item.name}}</text>
							</label>
						</radio-group>
					</view>
					<view class="page-section-btns flex-space-between">
						<view class="page-section-btns-cell"><button @click="closeDrawer">返回</button></view>
						<view class="page-section-btns-cell"><button form-type="submit" type='primary' >确定</button></view>
					</view>
				</form>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {
			uniSegmentedControl,
			uniDrawer,
			uniNavBar,
			mSearch
		},
		data() {
			return {
				//tab选项卡设置
				current:0,
				current_filter: 0,
				items: ['按日','按月','按季','按年'],
				items_filter:['部门','职位','积分类型'],
				activeColor: '#007aff',
				styleType: 'text',
				// 侧滑栏配置
				showLeft: false,
				
				searchString: '',
				
				deptId: '', //筛选条件之 部门
				postId: '',//筛选条件之 职位
				typeId: '', //筛选条件之 积分类型
				times:1, //筛选条件之 按日/月/季/年
				rankList:[],
				//筛选页 radio组，radioG_Dept:部门、radioG_Post:职位、radioG_type:积分类型
				radioG_Dept:[],
				radioG_Post:[],
				radioG_type:[],
				
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				winH:'',
				navBackgroundColor:"#4D96F5"
			}
		},
		onShow() {
			this.pullDown();
		},
		onLoad() {
			this.getRadioG_dept();
			this.getRadioG_post();
			this.getRadioG_type();
			this.getSystemInfoPage();
		},
		onPullDownRefresh() {
			this.pullDown();
		},
		
		methods:{
			onClickTabItem(index){
				this.times = index + 1;
				console.log('times===',this.times);
				this.pullDown();
			},
			onClickTabItem_filter(index) {
				if (this.current_filter !== index) {
					this.current_filter = index
				}
			},
			search(e) {
				this.searchString = e;
				this.pullDown();
			},
			showRankList(){
				console.log('部门：',this.deptId,'，职位：',this.postId,',类型：',this.typeId,',times:',this.times)

				//获取排名列表
				uni.showLoading({title: '加载中...'});
				this.axios({
				  url: this.GLOBAL.domain + '/rank/index',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					deptId: this.deptId,
					postId: this.postId,
					typeId: this.typeId,
					times: this.times,
					spTime1: '',
					spTime2: '',
					search: this.searchString
				  })
				})
				.then((res)=>{
					console.log('success_/rank/index_排行榜----', res);
					this.GLOBAL.successHttp(res);
					
					console.log("load page 第" + (this.currentPage) +"页");
					let list = res.data.data.list;
					this.rankList = this.isFirstPage ? list : this.rankList.concat(list);
					this.isFirstPage = false;
					this.currentPage += 1;
					this.hasNextPage = res.data.data.hasNextPage;
					console.log("数据列表：" + (this.rankList.length) +"条");
					 
					 uni.hideLoading();
					 uni.stopPullDownRefresh()
				})
				.catch((res)=>{
					console.log('fail/rank/index---', res)
					this.GLOBAL.failHttp(res); 
					 
					uni.hideLoading();
					uni.stopPullDownRefresh()
				})
			},
			getRadioG_dept(){
				//筛选页 radio组之radioG_Dept:部门
				this.axios({
				  url: this.GLOBAL.domain + '/rank/selectDept',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_/rank/selectDept----', res);
					this.GLOBAL.successHttp(res);
					
					var data = res.data.data;
					//radio的value类型必须为string，所以需要转换
					var newData = [];
					for (var i = 0; i < data.length; i++) {
						newData[i] = {"id":String(data[i].id), "name":data[i].name};
					}
					newData.unshift({
					  id: '',
					  name: '默认',
					  checked: 'true'
					})
					this.radioG_Dept = newData 
				})
				.catch((res)=>{
					console.log('fail_/rank/selectDept---', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			getRadioG_post(){
				//筛选页 radio组之radioG_Dept:职位
				this.axios({
				  url: this.GLOBAL.domain + '/rank/selectPost',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_/rank/selectPost', res);
					this.GLOBAL.successHttp(res);
					
					var data = res.data.data;
					var newData = [];
					for (var i = 0; i < data.length; i++) {
						newData[i] = {"id":String(data[i].id), "name":data[i].name};
					}
					newData.unshift({
					  id: '',
					  name: '默认',
					  checked: 'true'
					})
					this.radioG_Post = newData; 
				})
				.catch((res)=>{
					console.log('fail_/rank/selectPost', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			getRadioG_type(){
				//筛选页 radio组之radioG_Dept:积分类型
				this.axios({
				  url: this.GLOBAL.domain + '/rank/selectType',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_/rank/selectType', res);
					this.GLOBAL.successHttp(res);
					
					var data = res.data.data;
					var newData = [];
					for (var i = 0; i < data.length; i++) {
						newData[i] = {"id":String(data[i].id), "name":data[i].name};
					}
					newData.unshift({
					  id: '',
					  name: '默认',
					  checked: 'true'
					});
					this.radioG_type = newData; 
				})
				.catch((res)=>{
					console.log('fail_/rank/selectType', res)
					this.GLOBAL.failHttp(res);  
				})
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				for (var prop in e.detail.value) {
				  switch (prop) {
					case 'radio0':
					  this.deptId = e.detail.value[prop];
					  
					  this.radioG_Dept.forEach((item) => {
					    if (this.deptId == item.id) {
							item.checked = true
					    } else {
							item.checked = false
					    }
					  })
					  
					  break;
					case 'radio1':
					  this.postId = e.detail.value[prop];
					  
					  this.radioG_Post.forEach((item) => {
					    if (this.postId == item.id) {
					  		item.checked = true
					    } else {
					  		item.checked = false
					    }
					  })
					  
					  break;
					case 'radio2':
					  this.typeId = e.detail.value[prop];
					  
					  this.radioG_type.forEach((item) => {
					    if (this.typeId == item.id) {
					  		item.checked = true
					    } else {
					  		item.checked = false
					    }
					  });
					  
					  break;
				  }
				}
				this.showLeft = false;
				this.pullDown();
			},
			lower(){
				 //滑到底端触发的函数
				 this.showRankList()
			},
			pullDown(){
				 //下拉刷新触发的函数
				 this.currentPage = 1;
				 this.rankList=[];
				 this.showRankList();
			},
			getSystemInfoPage() {
				uni.getSystemInfo({
				  success: (res) => {
					this.winH=res.windowHeight-120
				  }
				})
			},
			showDrawer(){
				this.showLeft = true;
			},
			closeDrawer(){
				this.showLeft = false;
			},
			onClickList(item){
				var userId = item.userId
				uni.navigateTo({
					url:'/pages/jf/rank/perJFdetail/perJFdetail?userId='+userId
				})
			}
		}
	}
</script>

<style>
	
	/* title部分 */
	.title {
	  height: 80upx;
	  line-height: 80upx;
	  display: flex;
	  border-bottom: 1px solid #EEEEEE;
	}

	.title .title-col {
	  flex: 1;
	  text-align: center;
	  font-family: "SimHei";
	  font-size: 28upx;
	  font-weight: bold;
	  color: #999;
	}
	/* list部分 */
	.list {
	  background-color: red;
	}

	.list-item {
	  background-color: #fff;
	  position: relative;
	  height: 100upx;
	  /* margin-bottom: 20upx; */
	}
	.list-item .brief .number_0 {
	  background: url(../../../static/img/number.png) no-repeat;
	  background-size: 80upx;
	  background-position: center;
	}

	.list-item .brief .number_1 {
	 background: url(../../../static/img/number2.png) no-repeat;
	 background-size: 80upx;
	  background-position: center;
	}

	.list-item .brief .number_2 {
	  background: url(../../../static/img/number3.png) no-repeat;
	  background-size: 80upx;
	  background-position: center;
	}

	.list-item::after {
	  content: "";
	  width: 100%;
	  position: absolute;
	  left: 0;
	  bottom: 0;
	  border-bottom: 1px solid #ddd;
	}
	.list .brief {
	  display: flex;
	  font-family: "SimHei";
	  font-size: 28upx;
	  line-height: 100upx;
	  color: #444;
	}

	.list .brief .brief-col {
	  flex: 1;
	  text-align: center;
	}

	.list .brief .avatar {
	  height: 70upx;
	  width: 70upx;
	  vertical-align: middle;
	  border-radius: 50%;
	}

	.list .brief .number {
	  font-style: italic;
	}
	
	
	.page-section-btns{
		position:fixed;
		bottom:0;
		
	}
	.page-section-btns-cell{
		flex:1;
	}
	.page-section-btns-cell button{
		border-radius:0;
		-webkit-border-radius:0;
	}
	
	.page-section-lable{
		font-weight:normal;
	}
</style>
<!-- 
*重置问题
*  -->
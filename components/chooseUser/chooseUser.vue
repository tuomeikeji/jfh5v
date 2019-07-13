<!-- 选择员工/抄送人 通用模板 -->
<template>
	<uni-drawer :visible="showDrawerFlag" mode="left">
		<!-- <mSearch @search="search($event)" button="inside" placeholder="请输入您想搜索的人名"></mSearch> -->
		<form @submit="formSubmit" @reset="formReset">
			<scroll-view scroll-y="true" @scrolltolower="lower" :style="'height:'+winH+'px;'">
				<view v-if="users.length>0">
					<checkbox-group name="userCheckBox">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in users" :key="item.userId">
							<view class="checkbox">
								<image :src="item.avatar ? item.avatar : '/static/img/default_user_icon.png'" />
								<text class="checkbox-text">{{item.userName}}</text>
								<text class="checkbox-details">{{item.deptName}}</text>
							</view>
							<view>
								<checkbox :value="JSON.stringify(item)" :checked="item.checked" />
							</view>
						</label>
					</checkbox-group>
				</view>
				<view v-else class="uni-noData-txt">暂无数据</view>
				<view class="uni-noMore-txt" v-if="users.length>0 && !hasNextPage">无更多数据</view>
			</scroll-view>
			
			<view class="page-section-btns">
			  <view>
			    <button size="mini" @click="closeDrawer">取消</button>
			  </view>
			  <view v-if="reset"><button size="mini" type="warn" formType="reset">重置</button></view>
			  <view v-else><button size="mini" type="warn" @click="checkAll">选择全部</button></view>
			  <view>
			    <button size="mini" formType="submit" type="primary">确定</button>
			  </view>
			</view>
		</form>
	</uni-drawer>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue'
	export default {
		components: {
			uniDrawer,
			mSearch
		},
		props: {
			showDrawerFlag: {
				type:Boolean,
				default:false
			},
			getUsersUrl:{
				type:String,
				default:''
			},
			checkedUserItem:{
				type:Array,
				default:() => {
					return []
				}
			}
		},
		components: {
			uniDrawer,
		},
		data(){
			return {
				reset:false,
				users:[],
				
				search:'',
				pageSize:10,
				currentPage:1,
				isFirstPage: true,
				hasNextPage:true,
				
				winH:''
			}
		},
		created(){
			this.getUsers();
			this.getSystemInfoPage();
		},
		watch:{
			checkedUserItem(value){
				console.log('父组件中已选择的抄送人：===',value);
				this.users.forEach((item) => {
					if (value.some((toItem) => toItem.userId == item.userId)) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
			}
		},
		methods:{
			getUsers(){
				//获取所有下属员工/同部门的人
				this.axios({
				  url: this.GLOBAL.domain + this.getUsersUrl,
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					search: this.search
				  })
				})
				.then((res)=>{
					
					this.GLOBAL.successHttp(res);
					console.log('success_所有下属员工/同部门的人---', res)
					if (res.data.code == 0) {
						
						console.log("load page 第" + (this.currentPage) +"页");
						let list = res.data.data.list;
						this.users = this.isFirstPage ? list : this.users.concat(list);
						this.isFirstPage = false;
						this.currentPage += 1;
						this.hasNextPage = res.data.data.hasNextPage; 
					}
				})
				.catch((res)=>{
					console.log('fail_所有下属员工/同部门的人', res);
					this.GLOBAL.failHttp(res);  
				})
			},
			lower(){
				 //滑到底端触发的函数
				 this.getUsers()
			},
			getSystemInfoPage() {
				uni.getSystemInfo({
				  success: (res) => {
					this.winH=res.windowHeight
				  }
				})
			 },
			closeDrawer(){
				this.$emit('toggleUserDrawer');
			},
			checkAll(){
				this.users.forEach((item) => {
					item.checked = true
				})
				this.reset =true;
			},
			formReset(){
				this.users.forEach((item) => {
					item.checked = false
				})
				this.reset =false;
			},
			formSubmit(e){
				console.log('chooseUser_submit，携带值为', e.detail.value);
				this.$emit('getUsers',e.detail.value.userCheckBox);
				
				this.closeDrawer();
			}
		}
	}
</script>

<style>
	.page-section-btns {
		position: fixed;
		z-index: 10;
		bottom: 0;
		width: 100%;
		border-top:2upx solid #EEEEEE;
		display: flex;
		justify-content: space-between;
		height: 100upx;
		padding: 20upx 24upx 0 24upx;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
	/* 用户列表样式 */
	.checkbox-wrapper {
	  overflow: auto;
	}

	.checkbox {
	  display: block;
	  position: relative;
	  height: 96upx;
	  line-height: 96upx;
	  display: flex;
	  justify-content: center;
	  vertical-align: middle;
	}

	.checkbox image {
	  height: 80upx;
	  width: 80upx;
	  border-radius: 50%;
	  display: inline-block;
	  vertical-align: middle;
	  margin-left: 30upx;
	  margin-right: 30upx;
	  margin-top: 8upx;
	}

	.checkbox-text {
	  font-size: 28px;
	}

	.checkbox-details {
	  font-size: 24upx;
	  margin-left: 28upx;
	  color: #999;
	}
</style>
<!-- 未完成：
* 1、已选的 再返回choose模板中 标识为已选状态
* 2、全选功能
*  -->
<!-- 接受发布任务 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;">
		<form @submit="formSubmit" class="page-section">
			<view class="page-section-title">审批标题:</view>
			<view class="page-section-demo">
			  <textarea name="title" auto-height="true" maxlength="-1" :value="options.title" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">审批内容:</view>
			<view class="page-section-demo">
			  <textarea name="content" auto-height="true" maxlength="-1" :value="options.content" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="clear">
				<label class="page-section-lable">积分类型：</label>
				<input class="page-section-input" name="type" disabled="true" value="悬赏任务分"/> <!-- typeid = 7 -->
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">备注:</view>
			<view class="page-section-demo">
			  <textarea auto-height="true" placeholder="输入备注信息" name="remark" />
			</view>
			<view class="form-line"></view>
			<view>
				<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :server-url="serverUrl"></robby-image-upload>
			</view>
			<view class="form-line"></view>
			<picker @change="changePoints" :value="arrIndexPoints" :range="pointsArray" name="points">
			  <view class="row">
					<view class="row-title">申请积分</view>
					<view class="row-extra">当前选择：{{pointsArray[arrIndexPoints]}}</view>
					<image class="row-arrow" src="/static/img/arrowright.png" mode="aspectFill" />
			  </view>
			</picker>
			<view class="form-line"></view>
			<picker @change="changeApply" :value="arrIndexApply" :range="apply" range-key="userName" name="apply">
			  <view class="row">
				<view class="row-title">申请人</view>
				<view class="row-extra">当前选择：{{apply[arrIndexApply].userName}}</view>
				<image class="row-arrow" src="/static/img/arrowright.png" mode="aspectFill" />
			  </view>
			</picker>
			<view class="form-line"></view>
			<picker @change="changeApprover" :value="arrIndexApprover" :range="approver" range-key="userName" name="approver">
			  <view class="row">
				<view class="row-title">审批人</view>
				<view class="row-extra">当前选择：{{approver[arrIndexApprover].userName}}</view>
				<image class="row-arrow" src="/static/img/arrowright.png" mode="aspectFill" />
			  </view>
			</picker>
			<view class="form-line"></view>
			<view class="select-section">
			  <view class="title">抄送<text class="details">审批通过后，通知抄送人</text></view>
			  <view class="add-wrapper">
					<text class="addIcon" @click="showDrawer">+</text>
			  </view>
				 <view class="add-wrapper" v-for="(item,index) in checkedUserInfo">
					<image class="addIcon" :src="item.avatar ? item.avatar : '/static/img/default_user_icon.png'"></image>
					<text class="name">{{item.userName}}</text>
				</view>
			</view>
			<chooseUser :showDrawerFlag="showUserDrawer" @toggleUserDrawer="toggleDrawer" @getUsers="getUsers" :getUsersUrl="getUsersUrl" :checkedUserItem="checkedUserItem"></chooseUser>
			<button form-type="submit" type="primary" :loading="loading" :disabled="disabled" class="button-form">提交</button>
		</form>
	</view>
</template>

<script>
	import robbyImageUpload  from '@/components/robby-image-upload/robby-image-upload.vue';
	import chooseUser from '@/components/chooseUser/chooseUser.vue'
	export default {
		components: {
			robbyImageUpload,
			chooseUser
		},
		data() {
			return {
				options:{} ,//上一页带过来的参数
				
				arrIndexPoints:0,
				arrIndexApprover:0,
				arrIndexApply:0,
				pointsArray:[],//分数
				approver:[],//审批人信息
				apply:[],//申请人信息
				
				loading:false,//提交按钮
				disabled:false,
				
				// 侧滑栏配置
				showUserDrawer: false,
				checkedUserInfo:[],//抄送人信息
				getUsersUrl:'/work/declareBehaviorDetail/selectAllDeptUser', //获取同部门可抄送人
				checkedUserItem:[],//传回给chooseUsers组件中的值
				
				//tempImgFiles:[],//图片本地路径
				upLoadImgFile:[],//上传到图片服务器后返回的图片地址
				
				//图片选中器配置
				enableDel : false,
				enableAdd : false,
				limitNumber: 9,
				imageData : [],
				serverUrl: this.GLOBAL.domain+'/upload/uploadFile',
			}
		},
		onLoad(options) {
			console.log(options);
			this.options = options;
			
			//设置分数数组
			this.pointsArray = [options.points];
			
			this.getApply();
			this.getApprover();
			
			
			// this.axios({
			// 	//根据id获取此项目详情
			//   url: this.GLOBAL.domain + '/task/selectDetails/'+ options.id,
			//   method: 'GET',
			//   dataType: 'json',
			//   header:{
			// 	'content-type':'application/x-www-form-urlencoded'
			//   },
			//   success: (res) => { 
			// 	  console.log('success_selectDetails', res);
			// 	this.GLOBAL.successHttp(res);
			// 		
			//   },
			//   fail: (res) => {
			// 		console.log('fail_获取审批人', res);
			// 		this.GLOBAL.failHttp(res);
			//   }
			// });
		},
		methods:{
			showDrawer(){
				this.showUserDrawer = true
			},
			toggleDrawer(){
				this.showUserDrawer = !this.showUserDrawer
			},
			getUsers(e){
				//与 抄送人 公共组件交互
				this.checkedUserInfo = [];
				this.checkedUserItem = [];
				
				let checkedusers = e;
				checkedusers.forEach((item) => {
				  item = JSON.parse(item);
				  this.checkedUserInfo.push(item);
				  this.checkedUserItem.push(item)
				});
			},
			deleteImage: function(e){
					console.log(e)
			},
			addImage: function(e){
				console.log('addImage==',e);
				var uploadUrls = [];
				for (var i = 0; i < e.allImages.length; i++) {
					uploadUrls.push(JSON.parse(e.allImages[i]).data) 
				}
				this.upLoadImgFile = uploadUrls;
				console.log('页面upLoadImgFiles',this.upLoadImgFile);
			},
			getApprover(){
				//获取审批人
				this.axios({
				  url: this.GLOBAL.domain + '/work/declareBehaviorDetail/approverPel',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				
				.then((res)=>{
					console.log('success_获取审批人', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						this.approver.push(res.data.data) 
					} 
				})
				.catch((res)=>{
					console.log('fail_获取审批人', res);
						this.GLOBAL.failHttp(res);  
				})
			},
			getApply(){
				//获取申请人
				this.axios({
				  url: this.GLOBAL.domain + '/work/selectSysUser',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_获取申请人', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						this.apply.push(res.data.data);
					} 
				})
				.catch((res)=>{
					console.log('fail_获取申请人', res);
					this.GLOBAL.failHttp(res);  
				})
			},
			changePoints(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value);
				this.arrIndexPoints = e.detail.value
			},
			changeApply(e) {
			 	console.log('picker发送选择改变，携带值为', e.detail.value);
			 	this.arrIndexApply = e.detail.value
			},
			changeApprover(e) {
			  	console.log('picker发送选择改变，携带值为', e.detail.value);
			  	this.arrIndexApprover = e.detail.value
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var that = this;
				uni.showLoading({
					mask:true,
					title:"提交中..."
				})
				that.loading = true;
				that.disabled = true;
				
				var remark = e.detail.value.remark //备注
				
				var apply = [];
				apply.push(that.apply[e.detail.value.apply].userId)//申请人
				
				var copy = [] //抄送人
				that.checkedUserInfo.forEach((item) => {
				  copy.push(item.userId)
				}) 
				
				var approver = [];
				approver.push(that.approver[e.detail.value.approver].userId)  //审核人
				
				var approvalTitle = that.options.title //标题
				var approvalContent = that.options.content //内容
				var taskId = that.options.rtId //id
				
				console.log('提交携带数据：：'+'approvalImg:'+that.upLoadImgFile+',spRemark:'+remark+',from:'+apply+',to:'+copy+',apps:'+approver)
				
				that.loading = true;
				that.disabled = true;
				
				that.axios({
				  url: that.GLOBAL.domain + '/task/addTask',
				  method: 'POST',
				  dataType: 'json',
				  header:{
						'content-type':'application/x-www-form-urlencoded'
				  },
				  data: that.$qs.stringify({
						pic: that.upLoadImgFile,
						remark: remark,
						taskTypeId: that.options.taskTypeId,
						to: copy,
						releaseUserId:approver,
						taskId: taskId,
						integralTypeId: 7
				  },{arrayFormat: 'repeat'})
				})
				.then((res)=>{
					console.log('success_申请成功----', res);
					that.GLOBAL.successHttp(res);
					uni.showModal({
						content:'申请成功',confirmText:"确定",showCancel: false,
						success() {
							uni.navigateBack();
						}
					}) 
					
					that.loading = false;
					that.disabled = false;
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log('fail_申请失败', res)
					this.GLOBAL.failHttp(res);  
					
					that.loading = false;
					that.disabled = false;
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	
</style>
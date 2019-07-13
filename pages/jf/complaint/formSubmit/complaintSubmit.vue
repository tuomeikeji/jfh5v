<!-- 积分申诉::重新提交申请 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;">
		<form @submit="formSubmit" class="page-section">
			<view class="page-section-title">标题：</view>
			<view class="page-section-demo">
			  <textarea name="title" auto-height="true" maxlength="-1" :value="options.title" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">内容：</view>
			<view class="page-section-demo">
			  <textarea name="content" auto-height="true" maxlength="-1" :value="options.content" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="clear">
				<label class="page-section-lable">积分类型：</label>
				<input class="page-section-input" name="type" disabled="true" :value="options.type == '1' ? '品德A分' : (options.type == '2' ? '业绩B分' : (options.type == '3' ? '行为C分': (options.type == '4' ? '管理奖扣分':(options.type == '5' ? '自由奖扣分':(options.type == '6' ? '点赞分':(options.type == '7' ? '悬赏任务分':(options.type == '8' ? '积分支票':(options.type == '9' ? '水平考核分':''))))))))" />
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">备注：</view>
			<view class="page-section-demo">
			  <textarea auto-height="true" disabled="true" name="remark" vlaue="options.remark ? options.remark: '无'"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title"><text class="uni-text-red">*</text>申诉理由：</view>
			<view class="page-section-demo">
			  <textarea auto-height placeholder="输入申诉理由" name="reason" />
			</view>
			<view class="form-line"></view>
			<view class="select-section">
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
			<picker onChange="changeTo" :value="arrIndexTo " :range="ssuser"  range-key="userName" name="ssuser">
			  <view class="row">
					<view class="row-title">申诉人</view>
					<view class="row-extra">当前选择：{{ssuser[arrIndexTo].userName}} </view>
					<image class="row-arrow" src="/static/img/arrowright.png" mode="aspectFill" />
			  </view>
			</picker>
			<view class="form-line"></view>
			<view class="select-section" style="padding-top: 20upx;">
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
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import chooseUser from '@/components/chooseUser/chooseUser.vue'
	export default {
		components: {
			robbyImageUpload,
			uniDrawer,
			chooseUser
		},
		data() {
			return {
				options:{} ,//上一页带过来的参数
				
				arrIndexPoints:0,
				arrIndexApprover:0,
				arrIndexApply:0,
				arrIndexTo:0,
				
				pointsArray:[],//分数
				approver:[],//审批人信息
				apply:[],//申请人信息
				copy:[],//抄送人信息
				ssuser:[],//申诉人信息
				
				loading:false,//提交按钮
				disabled:false,
				
				// 侧滑栏配置
				showUserDrawer: false,
				checkedUserInfo:[] ,//已选员工信息
				getUsersUrl:'/work/declareBehaviorDetail/selectAllDeptUser',
				checkedUserItem:[],//传回给组件的已选人员
				
				//tempImgFiles:[],//图片本地路径
				upLoadImgFile:[],//上传到图片服务器后返回的图片地址
				
				
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
			this.getssUser();
		},
		methods:{
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
			getssUser(){
				//获取申诉人
				this.axios({
				  url: this.GLOBAL.domain + '/complaint/selectComplaintPel',
				  method: 'GET',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_selectComplaintPel_获取申诉人', res);
					
					if (res.data.code == 0) {
						this.ssuser.push(res.data.data.user) 
					} 
				})
				.catch((res)=>{
					console.log('fail__selectComplaintPel_获取申诉人', res);
					this.GLOBAL.failHttp(res);  
				})
				
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
					this.GLOBAL.failHttp(res)  
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
			changeSsUser(e) {
			  	console.log('picker发送选择改变，携带值为', e.detail.value);
			  	this.arrIndexTo = e.detail.value
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var that = this;
				
				var usersId = [] //抄送人
				that.checkedUserInfo.forEach((item) => {
				  usersId.push(item.userId)
				}) 
				var appPelId = that.ssuser[e.detail.value.ssuser].userId //申诉人
				var approvalId = that.options.approvalId //id
				var appReason = e.detail.value.reason //申诉理由
				
				console.log('appPelId:'+appPelId+',approvalId:'+approvalId+',appReason:'+appReason+',pic:'+[that.upLoadImgFile]+',usersId'+usersId)
				
				if(!appReason){
					uni.showModal({
						content:"请您填写关键内容",
						showCancel:false
					})
					return false;
				}
				
				uni.showLoading({
					mask:true,
					title:"提交中..."
				})
				that.loading = true;
				that.disabled = true;
				
				that.axios({
				  url: that.GLOBAL.domain + '/complaint/addComplaint',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: this.$qs.stringify({
					approvalId: approvalId,
					pic: that.upLoadImgFile,
					appReason: appReason,
					appPelId: appPelId,
					to: usersId
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
					that.GLOBAL.failHttp(res);  
					
					that.loading = false;
					that.disabled = false;
					uni.hideLoading();
				})
			},
			showChooseImgDrawer(){
				this.ChooseImgDrawer = true
			},
			closeDrawer(){
				this.ChooseImgDrawer = false
			},
			showDrawer(){
				this.showUserDrawer = true
			},
			toggleDrawer(){
				this.showUserDrawer = !this.showUserDrawer
			},
			getUsers(e){
				this.checkedUserInfo = [];
				this.checkedUserItem = [];
				
				let checkedusers = e;
				checkedusers.forEach((item) => {
				  item = JSON.parse(item);
				  this.checkedUserInfo.push(item);
				  this.checkedUserItem.push(item)
				});
			}
		}
	}
</script>

<style>
	
</style>

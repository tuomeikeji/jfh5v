<!-- 工作台::自由奖励 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;">
		<form @submit="formSubmit" class="page-section">
			<view class="page-section-title"><text class="uni-text-red">*</text>标题：<text class="uni-text-small">(标题最多50字)</text></view>
			<view class="page-section-demo">
			  <textarea name="title" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title"><text class="uni-text-red">*</text>内容：</view>
			<view class="page-section-demo">
			  <textarea name="content" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<view class="clear">
				<label class="page-section-lable">积分类型：</label>
				<input class="page-section-input" type="text" :value="types[arrIndexType].name" name="type" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="clear" style="padding: 30upx;">
				<label class="page-section-lable" style="padding: 0;"><text class="uni-text-red">*</text>输入分数：</label>
				<input class="page-section-input" type="text" name="points" style="border: 1px solid #EEEEEE;padding: 0;width: 60%;"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">备注：</view>
			<view class="page-section-demo">
			  <textarea auto-height="true" name="remark" style="font-size: 28upx"/>
			</view>
			<view class="form-line"></view>
			<view class="select-section">
				<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :server-url="serverUrl"></robby-image-upload>
			</view>
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
				arrIndexApprover:0,
				arrIndexApply:0,
				arrIndexType:4,
				
				approver:[],//审批人信息
				apply:[],//申请人信息
				copy:[],//抄送人信息
				types:[],//积分类型
				
				loading:false,//提交按钮
				disabled:false,
				
				// 侧滑栏配置
				showUserDrawer: false,
				checkedUserInfo:[] ,//已选员工信息
				getUsersUrl:'/work/declareBehaviorDetail/selectAllDeptUser',
				checkedUserItem:[], //传回给组件的已选人员
				
				//upload图片设置
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
			this.getApply();
			this.getApprover();
			this.getType();
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
			getType(){
				//获取积分类型
				this.axios({
				  url: this.GLOBAL.domain + '/rank/selectType',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_selectType_获取积分类型', res);
					
					if (res.data.code == 0) {
						this.types = res.data.data
					} 
				})
				.catch((res)=>{
					console.log('fail_selectType_获取积分类型', res);
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
					this.GLOBAL.failHttp(res);  
				})
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
				var usersId = [] //抄送人
				that.checkedUserInfo.forEach((item) => {
				  usersId.push(item.userId)
				}) 
				
				var apply = []//申请人
				apply.push(that.apply[e.detail.value.apply].userId);
				
				var approver = [];//审核人
				approver.push(that.approver[e.detail.value.approver].userId);
				
				  
				var points = e.detail.value.points //分数
				var remark = e.detail.value.remark //备注
				var title = e.detail.value.title //标题
				var content = e.detail.value.content //内容
				var typeId = that.types[that.arrIndexType].id;//积分id
				console.log("表单最后提交数据",'from:'+[apply]+',apps:'+[approver]+',points:'+points+',pic:'+[that.upLoadImgFile]+',to:'+usersId+',typeId:'+typeId)
				
				if(!title || !content || !points){
					uni.showModal({
						content:"请您填写关键内容",
						showCancel:false
					})
					return false;
				}
				
				if(title.length > 50){
					uni.showModal({
						content:"标题不得超多50字",
						showCancel:false
					})
					return false;
				}
				
				let reg = /^[0-9]\d*$/;
				if(!reg.test(points)) {
					uni.showModal({
						content:"分数项请输入正整数",
						showCancel:false
					});
					return false;
				}
				
				
				uni.showLoading({
					mask:true,
					title:"提交中..."
				})
				that.loading = true;
				that.disabled = true;
				
				that.axios({
				  url: that.GLOBAL.domain + '/free/freeIntegralApprover',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data: that.$qs.stringify({
					addIntegral: points,
					approvalImg: that.upLoadImgFile,
					spRemark: remark,
					typeId: typeId,
					from: apply,
					to: usersId,
					apps: approver,
					approvalTitle: title,
					approvalContent: content
				  },{arrayFormat: 'repeat'})
				})
				
				.then((res)=>{
					console.log('success_申请成功----', res);
					that.GLOBAL.successHttp(res);
					uni.showModal({
						content:'申请成功',showCancel: false,
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
				//与 抄送人 公共组件交互
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
	.page-section-input2{width: 70%;}
</style>


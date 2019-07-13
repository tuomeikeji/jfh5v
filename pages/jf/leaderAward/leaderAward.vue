<!-- 工作台::自由奖励 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;">
		<form @submit="formSubmit" class="page-section">
			<view class="page-section-title"><text class="uni-text-red">*</text>  奖扣标题：<text class="uni-text-small">(标题小于50字)</text></view>
			<view class="page-section-demo">
			  <textarea name="title" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title"><text class="uni-text-red">*</text>  奖扣内容：</view>
			<view class="page-section-demo">
			  <textarea name="content" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<view class="clear">
				<label class="page-section-lable">积分类型：</label>
				<input class="page-section-input" type="text" :value="types[arrIndexType].name" name="type" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">备注：</view>
			<view class="page-section-demo">
			  <textarea auto-height="true" name="remark" style="font-size: 28upx"/>
			</view>
			<view class="form-line"></view>
			<view style="padding: 0 30upx;">
				<view class="uni-title">可用积分:<text style="color: #007AFF;font-size: 32upx;">  {{allPoints}}  </text>分</view>
				<radio-group name='radioPoints' @change="radioPointsChange" style="margin-bottom: 20upx;">
					<label class="" v-for="(item, index) in radioG_points" :key="item.value">
						<radio :value="item.value" :checked="item.checked" />
						<text>{{item.name}}</text>
					</label>
				</radio-group>
				<view>
					<label for="addIntegral" v-show="radioPointCurr == 0" class="page-section-lable2">奖励积分：<input type="tel" id="addIntegral" name="addIntegral" class="page-section-input2" placeholder='请填写正整数'/></label>
					<label for="delIntegral" v-show="radioPointCurr == 1" class="page-section-lable2">扣除积分：<input type="tel" id="delIntegral" name="delIntegral" class="page-section-input2" placeholder='请填写正整数'/></label>
				</view>
			</view>
			<view class="form-line"></view>
			<view class="select-section" style="padding-top: 30upx;">
			  <view class="title"><text class="uni-text-red">*</text>选择员工<text class="details">可选择多人</text></view>
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
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import chooseUser from '@/components/chooseUser/chooseUser.vue'
	export default {
		components: {
			uniDrawer,
			chooseUser
		},
		data() {
			return {
				radioG_points:[{
					value: 'addIntegral',
                    name: '奖励积分',
					checked: 'true'
				},
				{
					value: 'delIntegral',
				    name: '扣除积分'
				}
				],
				radioPointCurr:0,
				allPoints:0,
				arrIndexType:3,
				
				copy:[],//所有下属员工信息
				types:[],//积分类型
				
				loading:false,//提交按钮
				disabled:false,
				
				// 侧滑栏配置
				showUserDrawer: false,
			    checkedUserInfo:[] ,//已选员工信息
				checkedUserItem:[], //返回给chooseUser组件的已选人员
				getUsersUrl:'/leader/selectLeaderdepts'
			}
		},
		onLoad(options) {
			this.getType();
			this.getAllPoints();
		},
		methods:{
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
			getAllPoints(){
				//获取管理员可用积分
				this.axios({
				  url: this.GLOBAL.domain + '/leader/leaderManageIntegral',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_leaderManageIntegral_管理者可用积分', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						this.allPoints = res.data.data;
					} 
				})
				.catch((res)=>{
					console.log('fail_获取审批人', res)  
					this.GLOBAL.failHttp(res);
				})
			},
			radioPointsChange(e) {
			 	switch (e.detail.value){
			 		case 'addIntegral':
						this.radioPointCurr = 0;
			 		break;
					case 'delIntegral':
						this.radioPointCurr = 1;
					break;	
			 	}
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var that = this;
				var usersId = [] //抄送人
				that.checkedUserInfo.forEach((item) => {
				  usersId.push(item.userId)
				}) 
				
				var addPoints = e.detail.value.addIntegral ? e.detail.value.addIntegral: 0 //奖励分数
				var delPoints = e.detail.value.delIntegral ? e.detail.value.delIntegral: 0//扣除分数
				var remark = e.detail.value.remark //备注
				var title = e.detail.value.title //标题
				var content = e.detail.value.content //内容
				var typeId = that.types[that.arrIndexType].id;//积分类型id
				
				console.log("最终提交数据:",'addIntegral:'+addPoints+',delIntegral:'+delPoints+',typeId:'+typeId+',from:'+usersId)
				
				if(!title || !content){
					uni.showModal({
						content:"请填写关键内容",
						showCancel:false
					});
					return false;
				}
				
				if(title>50){
					uni.showModal({
						content:"标题大于50字，请重新填写",
						showCancel:false
					});
					return false;
				}
				
				let reg = /^[0-9]\d*$/;
				if(!reg.test(addPoints)&&delPoints==0 || !reg.test(delPoints)&&addPoints==0) {
					console.log(reg.test(addPoints),reg.test(delPoints))
					uni.showModal({
						content:"奖扣分请输入正整数",
						showCancel:false
					});
					return false;
				}
				
				if(addPoints * usersId.length > that.allPoints){
					uni.showModal({
						content:"您的可用积分不足",
						showCancel:false
					});
					return false;
				}
				
				if(usersId.length <= 0){
					uni.showModal({
						content:"请选择需要奖扣的员工",
						showCancel:false
					});
					return false;
				}
				//======================================
				uni.showLoading({
					mask:true,
					title:"提交中..."
				})
				that.loading = true;
				that.disabled = true;
				
				that.axios({
				  url: that.GLOBAL.domain + '/free/freeIntegral',
				  method: 'POST',
				  dataType: 'json',
				  header:{
						'content-type':'application/x-www-form-urlencoded'
				  },
				  data: that.$qs.stringify({
					addIntegral: addPoints,
					delIntegral: delPoints,
					spRemark: remark,
					typeId: typeId,
					from: usersId,
					approvalTitle: title,
					approvalContent: content,
					// dateTime:'',
					approvalImg:[]
				  },{arrayFormat: 'repeat'})
				})
				.then((res)=>{
					console.log('success_申请成功----', res);
					that.GLOBAL.successHttp(res);
					if(res.data.code == 0){
						uni.showModal({
							content:'提交成功',showCancel: false,
							success() {
								uni.navigateBack();
							}
						})
					}else{
						uni.showModal({
							content:res.data.msg,showCancel: false,
						})
					} 
					
					
					that.loading = false;
					that.disabled = false;
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log('fail_申请失败', res)
					that.GLOBAL.failHttp(res);
					uni.showModal({
						content:'提交失败，请稍后再试',showCancel: false,
						success() {
							uni.navigateBack();
						}
					})
					
					
					that.loading = false;
					that.disabled = false;
					uni.hideLoading();
				})
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
		}}
</script>

<style>
	.page-section-input2{
		display: inline-block;
		border: 1px solid #EEEEEE;
		vertical-align: top;
		width: 400upx;
		margin-left: 20upx;
		margin-bottom: 24upx;
	}
</style>



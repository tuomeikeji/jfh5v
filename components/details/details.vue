<!-- 日志详情模板 -->
<template>
	<view class="uni-page-body" style="background-color: #fff;">
		<view class="top">
			<image class="avatar" :src="data.userImg ? data.userImg : '/static/img/default_user_icon.png'" />
			<text class="name">{{data.userName}}</text>
			<view class="form-line" />
		</view>
		<view class="main">
			<view class="item">
			  <text class="item-left">审批编号：</text>
			  <text class="item-right">{{data.approvalNum}}</text>
			</view>
			<view class="item">
			  <text class="item-left">所在部门：</text>
			  <text class="item-right">{{data.userDept}}</text>
			</view>
			<view class="item">
			  <text class="item-left">审批标题：</text>
			  <text class="item-right">{{data.approvalTitle}}</text>
			</view>
			<view class="item">
			  <text class="item-left">审批内容：</text>
			  <text class="item-right">{{data.approvalContent}}</text>
			</view>
			<view class="item">
			  <text class="item-left">申请时间：</text>
			  <text class="item-right">{{data.sqTime}}</text>
			</view>
			<view class="item">
			  <text class="item-left">积分类型：</text>
			  <text class="item-right">{{data.integralTypeId == '1' ? '品德A分' : (data.integralTypeId == '2' ? '业绩B分' : (data.integralTypeId == '3' ? '行为C分': (data.integralTypeId == '4' ? '管理奖扣分':(data.integralTypeId == '5' ? '自由奖扣分':(data.integralTypeId == '6' ? '点赞分':(data.integralTypeId == '7' ? '悬赏任务分':(data.integralTypeId == '8' ? '积分支票':(data.integralTypeId == '9' ? '水平考核分':''))))))))}}
			  </text>
			</view>
			<view class="item" v-if="!data.kIntegral">
			  <text class="item-left">申请积分：</text>
			  <text class="item-right">+{{data.addIntegral}}分</text>
			</view>
			<view class="item" v-else>
			  <text class="item-left" style="color: #DD4F43;">扣除积分：</text>
			  <text class="item-right" style="color: #DD4F43;">-{{data.kIntegral}}分</text>
			</view>
			<view class="item">
			  <text class="item-left">备注：</text>
			  <text class="item-right">{{data.SpRemark == null?'无':data.SpRemark}}</text>
			</view>
			<!-- 申诉理由 -->
			<view class="item" v-if="data.appReason">
			  <text class="item-left">申诉理由：</text>
			  <text class="item-right" style="color: #4d96f5">{{data.appReason}}</text>
			</view>
			<view class="item" v-if="status == 2">
			  <text class="item-left">不过原因：</text>
			  <text class="item-right" style="color: #DD4F43;">{{data.disapproveUndo ? data.disapproveUndo : '无'}}</text>
			</view>
			<!-- 图片-->
			<view v-if="data.approvalImg !=''">
				<view class="imagePre" v-for="(item,index) in data.approvalImg" :key="index">
					<image :src="item" @click="preview(index)" mode="aspectFill" />
				</view>
			</view>
		</view>
		<!-- btn -->
		<view class="page-section-btns" v-if="status == 0 && !showSteps">
			<!-- '待我审批'入口 日志详情 -->
			<view>
			  <button size="mini"  @click="todoBack">返回</button>
			</view>
			<view>
			  <button size="mini" type="warn" @click="todoStop" :disabled="disabled">审批不过</button>
			</view>
			<view>
			  <button size="mini" type="primary" @click="todoPass" :disabled="disabled">审批通过</button>
			</view>
		</view>
		<view class="page-section-btns" v-else-if="status == 0 && from">
			<!-- '我发起的'入口 日志详情 -->
			<view>
			  <button size="mini"  @click="todoBack">返回</button>
			</view>
			<view>
			  <button size="mini" type="warn" @click="fromBack" :disabled="disabled">撤销申请</button>
			</view>
		</view>	
		<uni-steps v-else :options="step" :active="active" direction="column" :fail="failIconShow" :activeColor='activeColor'/>
		
		<uni-popup :show="showRejectBox" position="middle" mode="fixed" @hidePopup="togglePopup">
			<form @submit="formSubmit">
				<view class="page-section-title">填写拒绝理由:</view>
				<view class="page-section-demo">
					<textarea name="rejectTxt" maxlength="-1" focus="true"/>
				</view>
				<view class="page-section-btn">
					<view>
					  <button size="mini" @click="togglePopup">返 回</button>
					</view>
					<view>
					  <button formType="submit" type="primary" size="mini">确 定</button>
					</view>
				</view>
			</form>
		</uni-popup>
	</view>
	
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		props: {
			options: {},
			showSteps: {
				type: Boolean,
				default: true
			},
			from: {
				type: Boolean,
				default: false
			}
		},
		components: {
			uniSteps,
			uniPopup
		},
		data() {
		    return {
					data:{}, //日志详情数据
					status: 0,//审批状态 0审批中，1审批通过，2审批拒绝
					active:0,//步骤条哪步处于激活状态
					step:[],//步骤条列表
					failIconShow:false ,//步骤条中审批拒绝标识是否显示
					activeColor:'#1aad19',
					
					failString: '', // 拒绝理由(审批人填写/选择的)
					appReason: '', // 申诉理由（日志详情数据中带过来的）
					passStatus: 0, // 传递状态 1.审核通过。2.审核拒绝
					showRejectBox: false, // 填写拒绝理由框弹出标识
					reasons: [], // 拒绝理由数组(供审批人选择用)
					
					disabled:false, //按钮是否可用
			}
		},
		created() {
			if (this.options.status) {
				this.status = this.options.status
			}
			
			this.getList();
		},
		methods:{
			getList(){
				let that = this;
				uni.showLoading({title: '加载中...'});
				let approvalId = this.options.approvalId;
				this.axios({
				  url: that.GLOBAL.domain + '/approversPel/selectApproversDetail/' + approvalId,
				  method: 'GET',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					this.GLOBAL.successHttp(res);
					console.log('success_/ApproversDetail/_日志详情', res);
					 var step = []
					if (res.data.data.integralTypeId == 4) {
							step.push({
								title: `${res.data.data.appName}  管理奖扣`,
								desc: `${res.data.data.appDept}  ${res.data.data.sqTime}`
							});
						
					} else if (res.data.data.integralTypeId == 6) {
							step.push({
								title: `${res.data.data.appName}  点赞`,
								desc: `${res.data.data.appDept}  ${res.data.data.sqTime}`
							});
					} else {
							step.push({
								title: `${res.data.data.userName}  提交审批`,
								desc: `${res.data.data.userDept}  ${res.data.data.sqTime}`
							})
						
							if (res.data.data.status == 1) {
								step.push({
								title: `${res.data.data.appName}  审批通过`,
								desc: `${res.data.data.appDept}  ${res.data.data.spTime}`
								})
								this.active = 1;
								
							} else if (res.data.data.status == 0) {
								step.push({
									title: `${res.data.data.appName}  审批中`,
									desc: `${res.data.data.appDept}`
								});
								
							} else if (res.data.data.status == 2) {
								step.push({
									title: `${res.data.data.appName}  审批不过`,
									desc: `${res.data.data.appDept}  ${res.data.data.spTime}`
								});
								this.active = 1;
								this.failIconShow = true;
								this.activeColor='#ff0000';
							}
					}
					console.log('iiiiii===',res.data.data.approvalImg)
					var imgs = res.data.data.approvalImg;
					imgs.forEach((item) => {
					  if(item.indexOf("[") != -1){
						  //"申报积分"模块中与后台传输数据 对数组做了特殊处理 所以"申报积分"传过来的图片有问题
						  console.log('特殊图片====');
						  item = JSON.parse(item)[0]
					  }
					})
					console.log('kkkkkk转换后===',res.data.data.approvalImg)
					
					this.step = step;
					this.data = res.data.data; 
					this.appReason = res.data.data.appReason; 
					
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log('fail_/ApproversDetail_日志详情---', res);
					this.GLOBAL.failHttp(res);
					  
					uni.hideLoading();
				})
			},
			preview(index){
				console.log('图片',index);
				uni.previewImage({
					current:index,
					urls:this.data.approvalImg
				})
			},
			todoBack(){
				uni.navigateBack()
			},
			todo(){
				//提交审批 返回是否通过
				var approvalId = this.options.approvalId;
				var passStatus = this.passStatus;
				var failString = this.failString;
				var appReason = this.appReason;
				//var failString = encodeURI(encodeURI(this.data.failString)) ????
				//var appReason = encodeURI(encodeURI(this.data.appReason))
				console.log('最后提交数据：','failString:',this.failString,'appReason:',this.appReason,'passStatus:',passStatus)
				
				this.disabled = true;
				uni.showLoading({
					title: '审批中...',
					mask:true
				});
				var url = this.GLOBAL.domain + '/approversPel/approversYesNo/' + approvalId + '/' + passStatus 
				this.axios({
				  url: url,
				  method: 'GET',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  data:this.$qs.stringify({
					  approvalId:approvalId,
					  status:passStatus,
					  disapproveUndo:failString,
					  appReason:appReason
				  })
				})
				.then((res)=>{
				  	this.GLOBAL.successHttp(res);
					console.log('success_approversYesNo_审核通过/拒绝----', res);
					if(res.data.code == 0){
						uni.showModal({
							content: '审批成功',
							showCancel:false,
							success(){
								uni.navigateBack();
							}
						});
					} 
					
					uni.hideLoading();
					this.showRejectBox = false;
					this.disabled = false;
				})
				.catch((res)=>{
				  	console.log('fail_approversYesNo_审核通过/拒绝---', res);
					this.GLOBAL.failHttp(res);  
					
					uni.hideLoading();
					this.showRejectBox = false;
					this.disabled = false;
				})
			},
			todoPass(){
				//审核人 同意普通员工的申请
				this.passStatus = 1;
				this.todo();
			},
			todoStop(){
				//审核人 拒绝普通员工的申请
				var _this = this;
				_this.axios({
					//获取拒绝理由数据
				  url: _this.GLOBAL.domain + '/complaint/groundsRefusal',
				  method: 'GET',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log("success_groundsRefusal_拒绝理由",res);
				  	_this.GLOBAL.successHttp(res);
					
					var actionItem = [];
					var reasons = res.data.data;
					reasons.forEach((item) => {
						actionItem.push(item.configName)
					});
					actionItem.push('填写其他拒绝理由')
					
					uni.showActionSheet({
						itemList:actionItem,
						success(e) {
							if (e.tapIndex < 0) {
								return
							} else if (e.tapIndex < reasons.length) {
								_this.failString = actionItem[e.tapIndex];
								_this.passStatus = 2;
								_this.todo();
							} else {
								_this.showRejectBox = true;
							}
						}
					}) 
				})
				.catch((res)=>{
					console.log("fail_groundsRefusal_拒绝理由",res)
					_this.GLOBAL.failHttp(res);  
				})
			},
			fromBack(){
				//申请撤销
				var that = this;
				uni.showModal({
					content:"确定撤销吗？",
					success(res){
						if(res.confirm){
							let appId = that.options.approvalId;
							
							uni.showLoading({
								title: '撤销中...',
								mask:true
							});
							that.loading = true;
							that.disabled = true;
							
							// console.log('==========',appId)
							that.axios({
							  url: that.GLOBAL.domain + '/userMenu/selectDelMenu/' + appId,
							  method: 'GET',
							  dataType: 'json',
							  header:{
								'content-type':'application/x-www-form-urlencoded'
							  },
							  data:that.$qs.stringify({
								approvalId:appId  
							  })
							})
							.then((res)=>{
								that.GLOBAL.successHttp(res);
								console.log('success_/userMenu/selectDelMenu/申请撤销----', res);
								
								uni.showModal({
									content:"撤销成功",
									success(){
										uni.navigateBack()
									}
								}) 
								
								uni.hideLoading();
								that.disabled = false;
							})
							.catch((res)=>{
								console.log('fail_/userMenu/selectDelMenu/申请撤销---', res);
								that.GLOBAL.failHttp(res); 
								 
								uni.hideLoading();
								that.disabled = false;
							})
						}
					}
				})
			},
			togglePopup() {
				this.showRejectBox = false;
			},
			formSubmit(e) {
			  console.log('formSubmit----', e.detail.value);
			  this.passStatus = 2;
			  this.failString = e.detail.value.rejectTxt;
			  this.todo()
			},
			
		}
	}
</script>

<style>
	.page {
	  min-height: 100%;
	  padding-bottom: 100upx;
	}

	.top {
	  height: 140upx;
	  line-height: 140upx;
	  padding: 0 24upx;
	  background-color: #fff;
	}

	.top .avatar {
	  width: 80upx;
	  height:80upx;
	  border-radius: 50%;
	  -webkit-border-radius: 50%;
	  vertical-align: middle;
	}

	.top .name {
	  font-size: 28upx;
	  margin-left: 28upx;
	}

	
	.main {
	  padding: 40upx 24upx 120upx 24upx;
	  font-size: 28upx;
	  font-family: "SimHei";
	}

	.main .item {
		display: flex;
		justify-content: flex-start;
	    padding-bottom: 40upx;
	    line-height: 1.5;
	}

	.main .item-left {
		flex:0.4;
	    color: #999;
	}

	.main .item-right {
		flex: 1;
	  color: #333333;
	  text-align: left;
	}

	.main .imagePre {
	  height: 200upx;
	  width:200upx;
	  background: #eee;
	  display: inline-block;
	  margin-right:30upx;
	}
    .imagePre image{
		width: 100%;
		height: 100%;
	}

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

	.page-section-title {
	  border-bottom: 1px solid #EEEEEE;
	  color: #333;
	}
	.page-section-demo{
		height: 300upx;
		padding: 24upx;
	}
	.page-section-btn{
		width: 100%;
		border-top:2upx solid #EEEEEE;
		display: flex;
		justify-content: space-between;
		height: 80upx;
		padding: 20upx 24upx 0 24upx;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		background-color: #FFFFFF;
	}
</style>

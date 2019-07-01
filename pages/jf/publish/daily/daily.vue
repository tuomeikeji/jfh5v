<!-- 悬赏任务::日常任务 -->
<template>
	<view class="uni-page-body">
		<form @submit="formSubmit" class="page-section">
			<view class="page-section-title"><text class="uni-text-red">*</text>任务目标：</view>
			<view class="page-section-demo">
			  <textarea name="title" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title"><text class="uni-text-red">*</text>任务内容：</view>
			<view class="page-section-demo">
			  <textarea name="content" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<view class="clear">
				<label class="page-section-lable">积分类型：</label>
				<input class="page-section-input" type="text" :value="types[arrIndexType].typeName" name="type" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<view class="page-section-title">备注：</view>
			<view class="page-section-demo">
			  <textarea auto-height="true" name="remark" style="font-size: 28upx"/>
			</view>
			<view class="form-line"></view>
			<view style="padding: 0 30upx 24upx 30upx;">
				<view class="uni-title">可用积分:{{allPoints}}分</view>
				<view class="clear">
					<label for="addIntegral" class="page-section-lable" style="padding: 0;">奖励积分：</label>
					<input type="text" id="addIntegral" name="addIntegral" class="page-section-input" style="border: 1px solid #EEEEEE;padding: 0;"/>
				</view>
			</view>
			<view class="form-line"></view>
			<view class="select-section" style="padding-bottom: 20upx;">
			  <view class="right-arrow" @click="showDrawerFun" style="color: #4d96f5;font-size: 32upx;padding: 20upx 0;"><text class="uni-text-red">*</text>选择范围</view>
				<view style="padding-bottom: 20upx;">
					<text>所选部门：</text>
					<block v-for="item in checkedDeptItem" :key="item.deptId">
						<text>{{item.deptName}}，</text>
					</block>
				</view>
				<view>
					<text>所选职位：</text>
					<block v-for="item in checkedRoleItem" :key="item.postId">
						<text>{{item.postName}}，</text>
					</block>
				</view>
			</view>
			<view class="form-line"></view>
			<uni-drawer :visible="showDrawer" mode="left" @close="closeDrawer">
					<uni-segmented-control :current="tabCurrent" :values="tabItems" style-type="text" active-color="#007aff" @clickItem="onClickTabItem" />
					<view v-show="tabCurrent === 0">
						<checkbox-group name="dept" @change="deptChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkbox_Dept" :key="item.deptId">
									<view>{{item.deptName}}</view>
									<view>
										<checkbox :value="JSON.stringify(item)" />
									</view>
							</label>
						</checkbox-group>
					</view>
					<view v-show="tabCurrent === 1">
						<checkbox-group name="sysRoles" @change="rolesChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkbox_sysRoles" :key="item.postId">
									<view>{{item.postName}}</view>
									<view>
										<checkbox :value="JSON.stringify(item)" />
									</view>
							</label>
						</checkbox-group>
					</view>
					<view class="page-section-btns">
						<view class="page-section-btns-cell"><button @click="closeDrawer">返回</button></view>
						<view class="page-section-btns-cell"><button @click="closeDrawer" type="primary">确定</button></view>
					</view>
			</uni-drawer>
			<button form-type="submit" type="primary" :loading="loading" :disabled="disabled" class="button-form">提交</button>
		</form>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniDrawer,
			uniSegmentedControl
		},
		data() {
			return {
				allPoints:0,
				arrIndexType:6,
				types:[],//积分类型
				checkedUserInfo:[] ,//已选员工信息
				
				loading:false,//提交按钮
				disabled:false,
				
				// 侧滑栏配置
				showDrawer: false,
				
				tabCurrent:0,
				tabItems:['部门','职位'],
				checkbox_Dept:[],//承载获取过来的所有部门
				checkbox_sysRoles:[],//承载获取过来的所有职位
				
				checkedDeptItem:[], //选中的部门
				checkedRoleItem:[] ,//选中的职位
				checkedDeptIds:[], //选中的部门id
				checkedRoleIds:[] //选中的职位id
			}
		},
		onLoad(options) {
			this.getAllPoints();
			this.getDept();
		},
		methods:{
			getAllPoints(){
				//获取管理员可用积分
				uni.request({
				  url: this.GLOBAL.domain + '/leader/leaderManageIntegral',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  success: (res) => { 
					console.log('success_leaderManageIntegral_管理者可用积分', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						this.allPoints = res.data.data;
					}
				  },
				  fail: (res) => {
					console.log('fail_获取审批人', res);
					this.GLOBAL.failHttp(res);
				  }
				});
			},
			getDept(){
				//获取职位，部门，积分类型
				uni.request({
				  url: this.GLOBAL.domain + '/releaseTask/releaseTaskPage',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  },
				  success: (res) => { 
					console.log('success_releaseTaskPage_部门职位', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						this.types = res.data.data.its; //积分类型
						this.checkbox_sysRoles = res.data.data.posts; //职位名称
						this.checkbox_Dept = res.data.data.depts; //部门
					}
				  },
				  fail: (res) => {
						console.log('fail_releaseTaskPage_部门职位', res);
						this.GLOBAL.failHttp(res);
				  }
				});
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var that = this;
				var addPoints = e.detail.value.addIntegral //奖励分数
				var remark = e.detail.value.remark //备注
				var title = e.detail.value.title //标题
				var content = e.detail.value.content //内容
				var typeId = that.types[that.arrIndexType].typeId;//积分类型id
				
				if(!title || !content || !addPoints){
					uni.showModal({
						content:"请输入必填项",
						showCancel:false
					});
					return false;
				}
				
				
				let reg = /^[0-9]\d*$/;
				if(!reg.test(addPoints)) {
					uni.showModal({
						content:"分数项请输入正整数",
						showCancel:false
					});
					return false;
				}
				
				if(addPoints > that.allPoints){
					uni.showModal({
						content:"您的积分不足",
						showCancel:false
					});
					return false;
				}
				
				if(that.checkedDeptIds.length < 0 && that.checkedRoleIds.length < 0){
					uni.showModal({
						content:"请选择接受此项任务的部门及职位",
						showCancel:false
					});
					return false;
				}
				
				console.log('表单提交数据:','addPoints:',addPoints,that.allPoints,',title:',title,',typeId:',typeId,',deptId:',that.checkedDeptIds,',postId',that.checkedRoleIds)
				
				uni.showLoading({
					mask:true,
					title:"提交中..."
				})
				that.loading = true;
				that.disabled = true;
				
				uni.request({
				  url: that.GLOBAL.domain + '/releaseTask/saveReleTask',
				  method: 'POST',
				  dataType: 'json',
				  header:{
						'content-type':'application/x-www-form-urlencoded'
				  },
				  data: {
						taskIntegral: addPoints,
						remark:remark,
						integralTypeId: typeId,
						title: title,
						content: content,
						taskTypeId: 1, // 任务类型
						// sort: this.data.date1,
						// status: this.data.date2,
						deptId: [that.checkedDeptIds],
						postId: [that.checkedRoleIds]
				  },
				  success: (res) => {
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
								content:'提交发生错误，请重新提交',showCancel: false,
							})
						}
				  },
				  fail: (res) => {
						console.log('fail_申请失败', res)
						that.GLOBAL.failHttp(res);
				  },
				  complete: () => {
						that.loading = false;
						that.disabled = false;
						uni.hideLoading();
				  }
				})
				
			},
			showDrawerFun(){
				this.showDrawer = true;
			},
			closeDrawer(){
				this.showDrawer = false
			},
			onClickTabItem(index) {
				if (this.tabCurrent !== index) {
					this.tabCurrent = index
				}
			},
			deptChange(e){
				console.log('dept发生变化,选职位',e.detail.value);
				let deptValue = e.detail.value;
				let checkedArr = [];
				let ids = [];
				deptValue.forEach((item) => {
					checkedArr.push(JSON.parse(item));
					ids.push(JSON.parse(item).deptId);
				});
				this.checkedDeptItem = checkedArr;
				this.checkedDeptIds = ids;
				
				console.log('部门id',ids)
			},
			rolesChange(e){
				console.log('roles发生变化,选职位',e.detail.value);
				let rolesValue = e.detail.value;
				let checkedArr = [];
				let ids = [];
				rolesValue.forEach((item) => {
					checkedArr.push(JSON.parse(item));
					ids.push(JSON.parse(item).postId);
				});
				this.checkedRoleItem = checkedArr;
				this.checkedRoleIds = ids;
				console.log('职位id',ids)
			},
		}}
</script>

<style>
	.page-section-btns{
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
	}
	.page-section-btns-cell{
		flex: 1;
	}
		
	.page-section-btns-cell button{
		border-radius: 0;
		-webkit-border-radius: 0;
	}
</style>


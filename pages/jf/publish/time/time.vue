<!-- 悬赏任务::挑战任务 限时+限人数 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;">
		<form @submit="formSubmit" class="page-section">
			<!-- 任务目标 -->
			<view class="page-section-title"><text class="uni-text-red">*</text>任务目标：<text class="uni-text-small">(标题不得超过50字)</text></view>
			<view class="page-section-demo">
			  <textarea name="title" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<!-- 任务内容 -->
			<view class="page-section-title"><text class="uni-text-red">*</text>任务内容：</view>
			<view class="page-section-demo">
			  <textarea name="content" auto-height="true" maxlength="-1"/>
			</view>
			<view class="form-line"></view>
			<!-- 积分类型 -->
			<view class="clear">
				<label class="page-section-lable">积分类型：</label>
				<input class="page-section-input" type="text" :value="types[arrIndexType].typeName" name="type" disabled="true"/>
			</view>
			<view class="form-line"></view>
			<!-- 备注 -->
			<view class="page-section-title">备注：</view>
			<view class="page-section-demo">
			  <textarea auto-height="true" name="remark" style="font-size: 28upx"/>
			</view>
			<view class="form-line"></view>
			<!-- 时间 -->
			<view class="timeBox" @click="openCalendar">
				<text class="uni-title" style="padding-right: 20upx;"><i class="uni-text-red" style='padding-right: 10upx;'>*</i>选择截止时间：</text><text class="uni-title" style="color: #4d96f5;">{{ date.fulldate ? date.fulldate :'-：-：-' }}</text>	
			</view>
			<view v-if="calendarShow" class="calendar-mask" @click="closeMask">
				<view class="calendar-box" @click.stop="">
					<uni-calendar slide="horizontal" :disable-before="true" @change="changeCalendar" @to-click="toClick" />
					<view class="calendar-button-groups">
						<button class="calendar-button-confirm" @click="closeMask">取消</button>
						<button class="calendar-button-confirm" @click="closeMask">确认</button>
					</view>
				</view>
			</view>
			<view class="form-line"></view>
			<!-- 限制人数 -->
			<view class="clear" style="padding: 24upx 22upx;">
				<label for="personNum" class="page-section-lable" style="padding: 0;"><text class="uni-text-red">*</text>输入限制人数：</label>
				<input type="text" id="personNum" name="personNum" class="page-section-input" style="border: 1px solid #EEEEEE;padding: 0;"/>
			</view>
			<view class="form-line"></view>
			<!-- 可用积分 -->
			<view style="padding: 0 30upx 24upx 30upx;">
				<view class="uni-title">可用积分:{{allPoints}}分</view>
				<view class="clear">
					<label for="addIntegral" class="page-section-lable" style="padding: 0;"><text class="uni-text-red">*</text>奖励积分：</label>
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
			<button form-type="submit" type="primary" :loading="loading" :disabled="disabled" class="button-form">提交</button>
		</form>
		<uni-drawer :visible="showDrawer" mode="left" @close="closeDrawer">
			<uni-segmented-control :current="tabCurrent" :values="tabItems" style-type="text" active-color="#007aff" @clickItem="onClickTabItem" />
			<form @submit="formSubmitCheckbox" @reset="formResetCheckbox">	
				<view v-show="tabCurrent === 0">
					<checkbox-group name="dept">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkbox_Dept" :key="item.deptId">
							<view>{{item.deptName}}</view>
							<view>
								<checkbox :value="JSON.stringify(item)" :checked="item.checked"/>
							</view>
						</label>
					</checkbox-group>
				</view>
				<view v-show="tabCurrent === 1">
					<checkbox-group name="sysRoles">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkbox_sysRoles" :key="item.postId">
								<view>{{item.postName}}</view>
								<view>
									<checkbox :value="JSON.stringify(item)" :checked="item.checked"/>
								</view>
						</label>
					</checkbox-group>
				</view>
				<view class="page-section-btns flex-space-between">
					<view><button @click="closeDrawer" size="mini">返回</button></view>
					<view><button  type="primary" size="mini" formType='submit'>确定</button></view>
				</view>
			</form>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniDrawer,
			uniSegmentedControl,
			uniCalendar
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
				checkedRoleIds:[],//选中的职位id
				
				calendarShow:false,
				date:{}
				
			}
		},
		onShow(options) {
			this.getAllPoints();
			this.getDept();
		},
		methods:{
			openCalendar() {
				this.calendarShow = true
			},
			closeMask() {
				this.calendarShow = false
			},
			changeCalendar(e) {
				console.log('日历 change 返回:', e.fulldate)
				this.date = e
			},
			toClick(e) {
				console.log('日历 点击事件', e.fulldate)
				this.date = e
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
					console.log('fail_获取审批人', res);
					this.GLOBAL.failHttp(res);  
				})
			},
			getDept(){
				//获取职位，部门，积分类型
				this.axios({
				  url: this.GLOBAL.domain + '/releaseTask/releaseTaskPage',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/x-www-form-urlencoded'
				  }
				})
				.then((res)=>{
					console.log('success_releaseTaskPage_部门职位', res);
					this.GLOBAL.successHttp(res);
					
					if (res.data.code == 0) {
						this.types = res.data.data.its; //积分类型
						this.checkbox_sysRoles = res.data.data.posts; //职位名称
						this.checkbox_Dept = res.data.data.depts; //部门
					} 
				})
				.catch((res)=>{
					console.log('fail_releaseTaskPage_部门职位', res);
						this.GLOBAL.failHttp(res);  
				})
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var that = this;
				var addPoints = e.detail.value.addIntegral //奖励分数
				var remark = e.detail.value.remark //备注
				var title = e.detail.value.title //标题
				var content = e.detail.value.content //内容
				var typeId = that.types[that.arrIndexType].typeId;//积分类型id
				var time = that.date.fulldate; //截止时间
				var personNum = e.detail.value.personNum; //人数
				
				if(!title || !content || !addPoints || !time || !personNum){
					uni.showModal({
						content:"请输入必填项",
						showCancel:false
					});
					return false;
				}
				
				if(that.checkedDeptIds.length<=0 || that.checkedRoleIds.length<=0){
					uni.showModal({
						content:"请选择接受此项任务的部门及职位",
						showCancel:false
					});
					return false;
				}
				
				
				if(title.length > 50){
					uni.showModal({
						content:"标题超过50字",
						showCancel:false
					});
					return false;
				}
				
				 let reg = /^[0-9]\d*$/;
				 if(!reg.test(addPoints) || !reg.test(personNum)) {
				 	uni.showModal({
				 		content:"分数项请输入正整数",
				 		showCancel:false
				 	});
				 	return false;
				 }
				
				 if(addPoints * personNum > that.allPoints){
				 	uni.showModal({
				 		content:"您的积分不足",
				 		showCancel:false
				 	});
				 	return false;
				 }
				
				console.log('表单提交数据:','addPoints:',addPoints,that.allPoints,',title:',title,',typeId:',typeId,',deptId:',that.checkedDeptIds,',postId',that.checkedRoleIds,',人数:',personNum,',时间:',time)
				
				uni.showLoading({
					mask:true,
					title:"提交中..."
				})
				that.loading = true;
				that.disabled = true;
				
				that.axios({
				  url: that.GLOBAL.domain + '/releaseTask/saveReleTask',
				  method: 'POST',
				  dataType: 'json',
				  header:{
						'content-type':'application/x-www-form-urlencoded'
				  },
				  data: that.$qs.stringify({
						taskIntegral: addPoints,
						remark:remark,
						integralTypeId: typeId,
						title: title,
						content: content,
						taskTypeId: 3, // 任务类型--限时任务
						// sort: time,
						status: time,
						peopleNum:personNum,
						deptId: that.checkedDeptIds,
						postId: that.checkedRoleIds
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
							content:'提交发生错误，请重新提交',showCancel: false,
						})
					} 
					
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
			formSubmitCheckbox(e){
				console.log('formSubmitCheckbox选择部门，职位 携带值为:',e.detail.value);
				
				let deptCheckedArr = []; //已选部门组合
				let deptIds = [];
				let rolesCheckedArr = []; //已选职位组合
				let rolesIds = [];
				
				e.detail.value.dept.forEach((item) => {
					deptCheckedArr.push(JSON.parse(item));
					deptIds.push(JSON.parse(item).deptId);
				});
				
				e.detail.value.sysRoles.forEach((item) => {
					rolesCheckedArr.push(JSON.parse(item));
					rolesIds.push(JSON.parse(item).postId);
				});
				
				this.checkedDeptItem = deptCheckedArr;
				this.checkedDeptIds = deptIds;
				this.checkedRoleItem = rolesCheckedArr;
				this.checkedRoleIds = rolesIds;
				
				//提交表单后，保持选中状态
				this.checkbox_Dept.forEach((item) => {
					if (this.checkedDeptIds.some((toItem) => toItem == item.deptId)) {
						item.checked = true
					} else {
						item.checked = false
					}	
				});
				this.checkbox_sysRoles.forEach((item) => {
					if (this.checkedRoleIds.some((toItem) => toItem == item.postId)) {
						item.checked = true
					} else {
						item.checked = false
					}	
				});
				
				this.showDrawer = false
			},
		}}
</script>

<style>
	.page-section-btns{
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		border-top: 1px solid #DDDDDD;
		padding: 20upx 24upx;
	}
	.page-section-btns-cell{
		flex: 1;
	}
		
	.page-section-btns-cell button{
		border-radius: 0;
		-webkit-border-radius: 0;
	}
	
	
	.timeBox{
		padding: 24upx 22upx;
	}
	
	/* 日历相关 */
	.calendar-content {
		padding: 20upx 0;
		padding-bottom: 60upx;
		font-size: 26upx;
	}
	
	.calendar-content>.calendar-title {
		line-height: 80upx;
		/* font-weight: bold; */
		color: #666;
		font-size: 32upx;
		/* border-left: 2px #0d9ebb solid; */
		/* padding-left: 20upx; */
		margin: 0 20upx;
	}
	
	.calendar-tags-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 10upx;
	}
	
	.calendar-tags {
		width: 50%;
		box-sizing: border-box;
	}
	
	.calendar-tags-item {
		padding: 10upx 20upx;
		border: 1px rgba(0, 0, 0, 0.2) solid;
		color: #333;
		border-radius: 10upx;
		text-align: center;
		margin: 10upx;
		background: #f8f8f8;
	}
	
	.calendar-tags-item:active {
		background: #f8f8f8;
	}
	
	.checked .calendar-tags-item {
		background: rgb(0, 122, 255);
		color: #fff;
		border: 1px rgba(0, 0, 0, 0.1) solid;
	}
	
	.calendar-button {
		margin: 10upx 20upx;
	}
	
	.calendar-info {
		padding: 0 20upx;
	}
	
	.calendar-mask {
		position: fixed;
		z-index: 100;
		/* #ifdef H5 */
		top: 90upx;
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		background: #FFFFFF;
	}
	
	.calendar-box {
		/* margin: 20upx; */
		border: 1px #f5f5f5 solid;
		/* border-radius: 10upx; */
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}
	
	.calendar-button-groups {
		position: absolute;
		width: 100%;
		bottom: 0;
		display: flex;
	}
	
	.calendar-button-confirm {
		width: 50%;
		margin: 10upx;
		border: 1px #eee solid;
		font-size: 32upx;
	}
	
	.calendar-button-confirm:after {
		border: none;
	}
</style>

